import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { ARTICLES, getPost, type BlogInline, type BlogPost } from '@/lib/blog'

const SITE_URL = 'https://agenticzero.xyz'
const ARTICLE_IMAGE = `${SITE_URL}/agentic-zero-sf-tech-week-2026.png`

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

  const canonical = `/blog/${post.slug}`

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      siteName: 'Agentic Zero',
      type: 'article',
      publishedTime: post.date,
      images: [
        {
          url: ARTICLE_IMAGE,
          width: 5760,
          height: 3240,
          alt: 'Agentic Zero — Second Edition · SF Tech Week 2026',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ARTICLE_IMAGE],
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

function inlineContent(content: BlogInline[]) {
  return content.map((part, index) =>
    typeof part === 'string' ? (
      part
    ) : (
      <a href={part.href} key={`${part.href}-${index}`}>
        {part.text}
      </a>
    )
  )
}

function blogPosting(post: BlogPost) {
  const canonical = `${SITE_URL}/blog/${post.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: canonical,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    image: ARTICLE_IMAGE,
    author: {
      '@type': 'Organization',
      name: 'Agentic Zero',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Agentic Zero',
      url: SITE_URL,
    },
  }
}

function safeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(blogPosting(post)) }}
      />
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
            if (block.type === 'cta') {
              return (
                <aside className="post-cta" key={i}>
                  <p>{block.text}</p>
                  <a href={block.href} className="az-v2-inline-cta">
                    {block.label}
                  </a>
                </aside>
              )
            }
            return <p key={i}>{inlineContent(block.content)}</p>
          })}

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
