import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { POSTS_BY_DATE } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog | Agentic Zero',
  description:
    'The latest on Agentic Zero, the one-day summit where agentic finance meets real markets. Read about our upcoming event and why we are making it.',
  alternates: { canonical: '/blog' },
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function BlogIndexPage() {
  return (
    <>
      <SiteNav />
      <div className="page-container az-v2-page az-v2-inner-page">
        <div className="az-v2-inner-header az-v2-prose">
          <div className="az-v2-section-heading">
            <h1>Blog</h1>
          </div>

          <p>
            The latest on Agentic Zero, the one-day summit where agentic finance meets real markets.
            Read about our upcoming event and why we are making it.
          </p>

          <ol className="post-index" aria-label="Blog posts, newest first">
            {POSTS_BY_DATE.map((post) => (
              <li key={post.slug}>
                <a href={post.href ?? `/blog/${post.slug}`}>
                  <span className="post-index-date">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </span>
                  <span className="post-index-main">
                    <span className="post-index-title">{post.title}</span>
                    <span className="post-index-excerpt">{post.description}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
        <SiteFooter />
      </div>
    </>
  )
}
