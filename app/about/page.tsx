import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { ABOUT_PARAGRAPHS } from '@/lib/trust-content'

export const metadata: Metadata = {
  title: 'About | Agentic Zero',
  description: 'About Agentic Zero, the one-day summit on agentic finance.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <div className="page-container az-v2-page az-v2-inner-page">
        <article className="az-v2-inner-header az-v2-prose">
          <div className="az-v2-section-heading"><h1>About Agentic Zero</h1></div>
          {ABOUT_PARAGRAPHS.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <h2>Explore Agentic Zero</h2>
          <p>
            Read <a href="/what-is-agentic-finance">what agentic finance means</a>, see the{' '}
            <a href="/agenda">2026 agenda status</a>, or browse the{' '}
            <a href="/first-edition/agenda">first-edition programme</a>.
          </p>
        </article>
        <SiteFooter />
      </div>
    </>
  )
}
