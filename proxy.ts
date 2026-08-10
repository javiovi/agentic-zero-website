import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server'
import dns from 'node:dns'

/**
 * Logs AI crawler hits so we can tell training crawls apart from live,
 * user-triggered fetches. A live fetch means a real person asked an answer
 * engine a question and it chose one of our URLs.
 *
 * Human traffic is never logged. No IP address and no cookies are recorded.
 *
 * This posts to CRAWLER_LOG_WEBHOOK_URL, which is a separate Apps Script from
 * the ticket mailing list in app/api/subscribe/route.ts. The two must not share
 * a webhook: crawler volume would flood the mailing list sheet.
 */

// Tokens are lowercase because the user-agent is lowercased before matching.
// No token here is a substring of a user-agent in another bucket, so a hit
// cannot be classified twice. ClaudeBot does not match Claude-User or
// Claude-SearchBot, and GPTBot does not match ChatGPT-User.

/** Bulk crawls that gather text for model training. */
const TRAINING = [
  'gptbot',
  'claudebot',
  'google-extended',
  'ccbot',
  'bytespider',
  'applebot-extended',
  'meta-externalagent',
]

/** Crawlers that build an answer-engine index, ahead of any specific question. */
const INDEX = ['oai-searchbot', 'perplexitybot', 'amazonbot', 'duckassistbot']

/** Fetches triggered right now by a person asking a question. The valuable one. */
const LIVE = [
  'chatgpt-user',
  'claude-user',
  'claude-searchbot',
  'perplexity-user',
  'gemini-user',
]

type Bucket = 'training' | 'index' | 'live'

/**
 * Returns the bucket for a user-agent, or null for everything else.
 * Null means do not log: we are not recording human traffic.
 */
export function classify(userAgent: string): Bucket | null {
  const ua = userAgent.toLowerCase()

  // Most specific intent first. The lists do not overlap, so this ordering is
  // defensive rather than load-bearing.
  if (LIVE.some((token) => ua.includes(token))) return 'live'
  if (INDEX.some((token) => ua.includes(token))) return 'index'
  if (TRAINING.some((token) => ua.includes(token))) return 'training'

  return null
}

/**
 * A user-agent token alone proves nothing: any scanner can send
 * "GPTBot" while probing for exposed secrets. Verification below confirms the
 * request came from the IP range the claimed company actually publishes.
 *
 * verified   reverse DNS lands on the company's domain and forward-resolves
 *            back to the same IP
 * spoofed    reverse DNS is available for this family and it does not match
 * unverified we could not tell: no publishable DNS for this family, a DNS
 *            failure, or a timeout. Never treated as an accusation.
 */
type Verification = 'verified' | 'spoofed' | 'unverified'

type Family = {
  tokens: string[]
  /** Suffixes the reverse-DNS hostname is allowed to end with. */
  domains: string[]
  /**
   * False for families that publish no verifiable range. A mismatch there
   * means our expectation is wrong, not that the caller is lying, so it
   * degrades to "unverified" instead of "spoofed".
   */
  rejectOnMismatch: boolean
}

/**
 * Checked in order, first match wins. Tokens are lowercase to match the
 * lowercased user-agent, same as the bucket lists above.
 *
 * Families absent from this table fall through to "unverified": we log the hit
 * but make no claim about it. That currently covers meta-externalagent,
 * duckassistbot and gemini-user.
 */
const FAMILIES: Family[] = [
  {
    tokens: ['gptbot', 'chatgpt-user', 'oai-searchbot'],
    domains: ['openai.com'],
    rejectOnMismatch: true,
  },
  {
    tokens: ['claudebot', 'claude-user', 'claude-searchbot'],
    domains: ['anthropic.com', 'crawl.claude.com'],
    rejectOnMismatch: true,
  },
  {
    tokens: ['google-extended'],
    domains: ['google.com', 'googlebot.com'],
    rejectOnMismatch: true,
  },
  {
    tokens: ['applebot-extended'],
    domains: ['apple.com'],
    rejectOnMismatch: true,
  },
  {
    tokens: ['amazonbot', 'amzn-searchbot'],
    domains: ['amazonaws.com', 'crawl.amazon.com'],
    rejectOnMismatch: true,
  },
  {
    // Perplexity does not publish a verifiable range today, so a mismatch
    // cannot be called spoofing.
    tokens: ['perplexitybot', 'perplexity-user'],
    domains: ['perplexity.ai'],
    rejectOnMismatch: false,
  },
  {
    // No reliable reverse DNS at all. Nothing to check, so nothing to claim.
    tokens: ['bytespider', 'ccbot'],
    domains: [],
    rejectOnMismatch: false,
  },
]

/** Total DNS budget for one request, covering both lookups. */
const DNS_BUDGET_MS = 450

/** Rejects once the shared budget is gone, so two lookups cannot stack up. */
function withDeadline<T>(work: Promise<T>, deadline: number): Promise<T> {
  const remaining = deadline - Date.now()
  if (remaining <= 0) return Promise.reject(new Error('dns budget exhausted'))

  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('dns timeout')), remaining)
    work.then(
      (value) => {
        clearTimeout(timer)
        resolve(value)
      },
      (error) => {
        clearTimeout(timer)
        reject(error)
      }
    )
  })
}

function matchesDomain(hostname: string, domains: string[]): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, '')
  return domains.some((domain) => host === domain || host.endsWith(`.${domain}`))
}

/**
 * Confirms a claimed crawler really is one. Only ever called for a user-agent
 * that already landed in a bucket; anything unclassified is not logged at all,
 * so there is nothing to verify.
 *
 * Always resolves. Any DNS failure or timeout is "unverified", never an error:
 * logging must not be able to break the site.
 */
export async function verifyCrawler(
  ip: string,
  userAgent: string
): Promise<Verification> {
  if (!classify(userAgent)) return 'unverified'
  if (!ip) return 'unverified'

  const ua = userAgent.toLowerCase()
  const family = FAMILIES.find((candidate) =>
    candidate.tokens.some((token) => ua.includes(token))
  )

  // Unknown family, or a family with no reverse DNS worth checking.
  if (!family || family.domains.length === 0) return 'unverified'

  const mismatch: Verification = family.rejectOnMismatch
    ? 'spoofed'
    : 'unverified'
  const deadline = Date.now() + DNS_BUDGET_MS

  try {
    const hostnames = await withDeadline(dns.promises.reverse(ip), deadline)
    const hostname = hostnames.find((candidate) =>
      matchesDomain(candidate, family.domains)
    )
    if (!hostname) return mismatch

    // The forward lookup is the step that stops a spoofed hostname: anyone can
    // point a PTR record at crawl.claude.com, but only the owner of that name
    // can make it resolve back to the connecting IP.
    const forward = await withDeadline(
      dns.promises.lookup(hostname, { all: true }),
      deadline
    )
    return forward.some((entry) => entry.address === ip) ? 'verified' : mismatch
  } catch {
    return 'unverified'
  }
}

/**
 * Vercel does not expose a socket IP in middleware, so the forwarded header is
 * the only source. It can carry a proxy chain; the first entry is the client.
 */
function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for') ?? ''
  return forwarded.split(',')[0].trim()
}

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const response = NextResponse.next()

  const userAgent = request.headers.get('user-agent') ?? ''
  const bucket = classify(userAgent)

  // Not an AI crawler. Nothing to record.
  if (!bucket) return response

  const webhook = process.env.CRAWLER_LOG_WEBHOOK_URL
  if (!webhook) return response

  const ip = clientIp(request)

  // Everything below, DNS included, runs after the response has been handed
  // back. waitUntil keeps both the lookups and the POST off the response path,
  // so neither a slow resolver nor a failing webhook can delay a page load.
  // Errors are swallowed on purpose: logging must never break the site.
  event.waitUntil(
    (async () => {
      const verification = await verifyCrawler(ip, userAgent)

      const payload = {
        timestamp: new Date().toISOString(),
        path: request.nextUrl.pathname,
        // Spoofed hits keep their bucket as a suffix but move under their own
        // prefix, so the sheet can filter them out while still showing scan
        // volume. Dropping them would hide exactly what we want to measure.
        bucket: verification === 'spoofed' ? `spoofed-${bucket}` : bucket,
        verification,
        userAgent,
        referer: request.headers.get('referer') ?? '',
      }

      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    })().then(
      () => undefined,
      () => undefined
    )
  )

  return response
}

export const config = {
  // No runtime key: a proxy file always runs on the Node.js runtime, so the dns
  // module is available and declaring a runtime is rejected as invalid.
  matcher: [
    // Two public files we care about. Both have extensions, so the page-route
    // pattern below excludes them and they have to be named.
    '/llms.txt',
    '/robots.txt',
    /*
     * Page routes only. Excludes, in order:
     *   api/        the subscribe and tweet routes
     *   _next/      build output and image optimisation
     *   images/     static imagery
     *   favicon.ico
     *   anything with a file extension, which covers every other static asset
     *
     * Page routes have no extension, so the final clause is what keeps
     * middleware off assets without listing every file type.
     */
    '/((?!api/|_next/|images/|favicon\\.ico|.*\\.[^/]+$).*)',
  ],
}
