import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import {
  ARTICLES,
  getPost,
  type BlogInline,
  type BlogListItem,
  type BlogPost,
} from '@/lib/blog'
import { blogPostWordCount } from '@/lib/blog-markdown'

const SITE_URL = 'https://agenticzero.xyz'
const ARTICLE_IMAGE = `${SITE_URL}/agentic-zero-sf-tech-week-2026-sponsors.png`
const ARTICLE_IMAGE_ALT =
  'Agentic Zero — Second Edition · SF Tech Week 2026, supported by Solana, Calimero, Cambrian Network, and QuickNode'

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
    keywords: post.keywords,
    alternates: {
      canonical,
      types: { 'text/markdown': canonical },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      siteName: 'Agentic Zero',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      section: post.section,
      tags: post.keywords,
      images: [
        {
          url: ARTICLE_IMAGE,
          width: 5760,
          height: 3240,
          alt: ARTICLE_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [{ url: ARTICLE_IMAGE, alt: ARTICLE_IMAGE_ALT }],
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

function inlineContent(content: BlogInline[], accentStrong = false) {
  return content.map((part, index) => {
    if (typeof part === 'string') return part
    if ('strong' in part) {
      return accentStrong ? <strong key={index}>{part.text}</strong> : part.text
    }
    if ('code' in part) return <code key={index}>{part.text}</code>
    if ('emphasis' in part) return <em key={index}>{part.text}</em>

    return (
      <a
        href={part.href}
        key={`${part.href}-${index}`}
        {...(part.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {part.strongLink ? <strong>{part.text}</strong> : part.text}
      </a>
    )
  })
}

function listItem(item: BlogListItem, key: number, accentStrong: boolean) {
  const content = Array.isArray(item) ? item : item.content
  const children = Array.isArray(item) ? undefined : item.children

  return (
    <li key={key}>
      {inlineContent(content, accentStrong)}
      {children ? (
        <ul>{children.map((child, childIndex) => listItem(child, childIndex, accentStrong))}</ul>
      ) : null}
    </li>
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
    dateModified: post.updated ?? post.date,
    inLanguage: 'en',
    articleSection: post.section,
    keywords: post.keywords,
    wordCount: blogPostWordCount(post),
    url: canonical,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    image: ARTICLE_IMAGE,
    isPartOf: {
      '@type': 'Blog',
      name: 'Agentic Zero Blog',
      url: `${SITE_URL}/blog`,
    },
    about: post.about?.map((topic) => ({
      '@type': 'Thing',
      name: topic.name,
      ...(topic.url ? { url: topic.url } : {}),
    })),
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
          </p>

          {post.body.map((block, i) => {
            if (block.type === 'heading') {
              return <h2 key={i}>{block.text}</h2>
            }
            if (block.type === 'subheading') return <h3 key={i}>{block.text}</h3>
            if (block.type === 'minorHeading') return <h4 key={i}>{block.text}</h4>
            if (block.type === 'list') {
              return (
                <ul className="post-list" key={i}>
                  {block.items.map((item, itemIndex) =>
                    listItem(item, itemIndex, Boolean(block.accentStrong))
                  )}
                </ul>
              )
            }
            if (block.type === 'code') {
              return (
                <pre className="post-code" key={i}>
                  <code>{block.content}</code>
                </pre>
              )
            }
            if (block.type === 'table') {
              return (
                <div className="post-table-wrap" key={i}>
                  <table className="post-table">
                    <thead>
                      <tr>
                        {block.headers.map((header, cellIndex) => (
                          <th key={cellIndex}>
                            {inlineContent(header, Boolean(block.accentStrong))}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>
                              {inlineContent(cell, Boolean(block.accentStrong))}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            }
            if (block.type === 'divider') return <hr className="post-divider" key={i} />
            if (block.type === 'cta') {
              return (
                <aside className="post-cta az-v2-description-card" key={i}>
                  <h2>{block.title}</h2>
                  <p>{block.text}</p>
                  <a
                    href={block.href}
                    className="az-v2-inline-cta"
                    {...(block.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {block.label}
                  </a>
                </aside>
              )
            }
            return <p key={i}>{inlineContent(block.content, block.accentStrong)}</p>
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
