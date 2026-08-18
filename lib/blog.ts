// Blog posts, hand-written and stored as structured blocks rather than MDX.
//
// The same shape as lib/sessions.ts on purpose: the index page, the [slug]
// page and app/sitemap.ts all read from this one array, so adding a post means
// adding an entry here and nothing else.
//
// Copy conventions (see CLAUDE.md): "agentic finance" is the primary term,
// "summit" not "conference", no specific protocols, standards or chains named,
// and the first edition is always described in the past tense.

export type BlogInline = string | { text: string; href: string }

export type BlogBlock =
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'paragraph'; content: BlogInline[] }
  | { type: 'cta'; text: string; label: string; href: string }

export type BlogPost = {
  slug: string
  title: string
  /** Used for <meta name="description"> and the index list. */
  description: string
  /** ISO date. Drives ordering and the <time> element. */
  date: string
  /**
   * Set only for entries that live elsewhere on the site. The index links
   * straight there and no /blog/<slug> page is generated, so the page keeps a
   * single canonical URL instead of being duplicated under /blog.
   */
  href?: string
  body: BlogBlock[]
}

export const POSTS: BlogPost[] = [
  {
    slug: 'what-is-agentic-zero',
    title: 'What is Agentic Zero? The agentic finance summit returns',
    description:
      'Agentic Zero is a one-day agentic finance summit on AI agents transacting onchain, payment infrastructure, and real financial markets at SF Tech Week 2026.',
    date: '2026-08-17',
    body: [
      {
        type: 'paragraph',
        content: [
          'Agentic Zero is a one-day summit on agentic finance, AI agents, payment infrastructure, and onchain transactions. The second edition takes place during SF Tech Week 2026 in San Francisco.',
        ],
      },
      { type: 'heading', text: 'What is Agentic Zero?' },
      {
        type: 'paragraph',
        content: [
          'It is a focused gathering for the people designing, financing, operating, and evaluating systems in which AI agents can hold or direct value. The event connects technical questions on identity, permissions, security, settlement, and accountability with real financial markets and institutional questions that determine whether those systems can work at scale.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          "The summit returns on October 7, 2026, at The Avalon, 1244 Sutter Street. This edition's scope focuses on how agents make financial decisions and execute transactions, what infrastructure they need, and how people and institutions remain in control. Learn more about this on ",
          { text: 'agentic finance', href: '/what-is-agentic-finance' },
          '.',
        ],
      },
      { type: 'heading', text: 'Why AI agents and finance need their own summit' },
      {
        type: 'paragraph',
        content: [
          'The intersection of AI agents and finance surfaces problems that do not fit neatly inside a general AI event or a traditional finance gathering. An agent that recommends an action is one thing. An agent that can initiate a payment, rebalance assets, or act within a treasury policy introduces questions about authority, limits, auditability, and recourse.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'A dedicated agentic finance summit gives builders and decision-makers a shared room for those questions. It lets infrastructure teams hear what institutions require, gives institutions a clearer view of what is technically possible, and lets researchers test ideas against operational constraints.',
        ],
      },
      { type: 'heading', text: 'Agentic payments and onchain AI agents' },
      {
        type: 'paragraph',
        content: [
          'Building agentic payments is one part of a wider stack. AI agents transacting onchain need ways to receive instructions, authenticate, work within permissions, access financial rails, settle transactions, and leave evidence of what they did. Each layer affects whether an agent can participate reliably in a real market.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'Onchain transactions might be programmable, but onchain execution does not remove the need for policy, risk management, or human responsibility. Agentic Zero brings the payment, infrastructure, security, research, and institutional perspectives together.',
        ],
      },
      { type: 'heading', text: 'What happens at Agentic Zero' },
      {
        type: 'paragraph',
        content: [
          'Agentic Zero is built as a one-day program of talks, panels, technical discussions, and practical examples. The 2026 agenda will focus on financial rails for machine users, real-world assets and tokenisation, risk and compliance, and research and security. These themes cover both the systems agents use and the rules under which they can use them.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'The ',
          { text: 'current agenda', href: '/agenda' },
          ' carries the event framework and will be updated as sessions are announced. Its program explored agent identity, discovery, payments, verifiability, infrastructure, and security. The San Francisco edition builds on that foundation while moving the conversation toward real markets and institutional adoption.',
        ],
      },
      { type: 'heading', text: 'Agentic Zero at SF Tech Week 2026' },
      {
        type: 'paragraph',
        content: [
          'The second edition takes place during SF Tech Week 2026 on Wednesday, October 7, at The Avalon in San Francisco. For anyone searching for a San Francisco agentic finance event, Agentic Zero is the summit focused specifically on the financial infrastructure and operating questions behind agents that can transact.',
        ],
      },
      { type: 'heading', text: 'Who Agentic Zero is for' },
      {
        type: 'paragraph',
        content: [
          'The summit is for founders and AI builders, agent-infrastructure teams, payment and financial-infrastructure teams, researchers, institutional operators, and investors following the development of agentic finance. It is also relevant to people working in risk, compliance, security, and policy who need to understand how agent systems translate technical permissions into real financial consequences.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'Attendees do not need to share one forecast about adoption. The useful common ground is a need to understand what is already possible, what remains unresolved, and what responsible deployment demands.',
        ],
      },
    ],
  },
  {
    slug: 'what-is-agentic-finance',
    title: 'What is agentic finance?',
    description:
      'Agents route assets, make financial decisions, and execute transactions. Understand the concept at the core of Agentic Zero.',
    date: '2026-08-03',
    href: '/what-is-agentic-finance',
    // Lives at /what-is-agentic-finance. Kept empty here on purpose: that page
    // is the source of truth for this copy.
    body: [],
  },
]

/** Newest first. Drives the order of the index list. */
export const POSTS_BY_DATE = [...POSTS].sort((a, b) => b.date.localeCompare(a.date))

/**
 * Posts that actually own a /blog/<slug> page. Entries pointing elsewhere via
 * `href` are listed on the index but are not routes, so they are excluded here
 * and from the sitemap, where their real URL is already covered.
 */
export const ARTICLES = POSTS.filter((post) => !post.href)

export function getPost(slug: string): BlogPost | undefined {
  return ARTICLES.find((post) => post.slug === slug)
}
