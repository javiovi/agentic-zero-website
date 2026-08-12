// Blog posts, hand-written and stored as structured blocks rather than MDX.
//
// The same shape as lib/sessions.ts on purpose: the index page, the [slug]
// page and app/sitemap.ts all read from this one array, so adding a post means
// adding an entry here and nothing else.
//
// Copy conventions (see CLAUDE.md): "agentic finance" is the primary term,
// "summit" not "conference", no specific protocols, standards or chains named,
// and the first edition is always described in the past tense.

export type BlogBlock =
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'paragraph'; text: string }

export type BlogPost = {
  slug: string
  title: string
  /** Used for <meta name="description"> and the index list. */
  description: string
  /** ISO date. Drives ordering and the <time> element. */
  date: string
  readingTime: string
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
    slug: 'what-is-agentic-finance',
    title: 'What is agentic finance?',
    description:
      'Agents route assets, make financial decisions, and execute transactions. Understand the concept at the core of Agentic Zero.',
    date: '2026-08-03',
    readingTime: '3 min read',
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
