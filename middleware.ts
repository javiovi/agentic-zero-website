import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server'

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

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const response = NextResponse.next()

  const userAgent = request.headers.get('user-agent') ?? ''
  const bucket = classify(userAgent)

  // Not an AI crawler. Nothing to record.
  if (!bucket) return response

  const webhook = process.env.CRAWLER_LOG_WEBHOOK_URL
  if (!webhook) return response

  const payload = {
    timestamp: new Date().toISOString(),
    path: request.nextUrl.pathname,
    bucket,
    userAgent,
    referer: request.headers.get('referer') ?? '',
  }

  // waitUntil keeps the POST off the response path, so a slow or failing
  // webhook cannot delay a page load. Errors are swallowed on purpose:
  // logging must never be able to break the site.
  event.waitUntil(
    fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(
      () => undefined,
      () => undefined
    )
  )

  return response
}

export const config = {
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
