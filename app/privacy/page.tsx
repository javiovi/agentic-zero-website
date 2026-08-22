import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { PRIVACY_PARAGRAPHS } from '@/lib/trust-content'

export const metadata: Metadata = {
  title: 'Privacy | Agentic Zero',
  description: 'How the Agentic Zero website handles email signups, analytics, and crawler logs.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <>
      <SiteNav />
      <div className="page-container az-v2-page az-v2-inner-page">
        <article className="az-v2-inner-header az-v2-prose">
          <div className="az-v2-section-heading"><h1>Privacy</h1></div>
          {PRIVACY_PARAGRAPHS.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </article>
        <SiteFooter />
      </div>
    </>
  )
}
