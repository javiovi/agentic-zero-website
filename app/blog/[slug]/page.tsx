import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { ARTICLES, getPost } from '@/lib/blog'

// Every slug is known at build time, so each post page is static.
export function generateStaticParams() {
  return ARTICLES.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const post = getPost(params.slug)
  if (!post) return {}

  return {
    title: `${post.title} | Agentic Zero`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const post = getPost(params.slug)
  if (!post) notFound()

  // Newest first, so the neighbour below is the post published before this one.
  const byDate = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date))
  const older = byDate[byDate.findIndex((p) => p.slug === post.slug) + 1]

  return (
    <>
      <SiteNav />
      <div className="page-container az-v2-page az-v2-inner-page">
        <article className="az-v2-inner-header az-v2-prose post-page">
          <div className="az-v2-section-heading">
            <h1>{post.title}</h1>
          </div>

          <p className="post-meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true"> · </span>
            <span>{post.readingTime}</span>
          </p>

          {post.body.map((block, i) => {
            if (block.type === 'heading') return <h2 key={i}>{block.text}</h2>
            if (block.type === 'subheading') return <h3 key={i}>{block.text}</h3>
            return <p key={i}>{block.text}</p>
          })}

          <a href="/#notify" className="az-v2-inline-cta">
            Join the list
          </a>

          <nav className="post-links" aria-label="More writing">
            <a href="/blog">Back to the blog</a>
            {older ? <a href={`/blog/${older.slug}`}>{older.title}</a> : null}
          </nav>
        </article>
        <SiteFooter />
      </div>
    </>
  )
}
