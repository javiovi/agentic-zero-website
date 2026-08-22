import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { CONTACT_PARAGRAPHS } from '@/lib/trust-content'

export const metadata: Metadata = {
  title: 'Contact | Agentic Zero',
  description: 'Official contact information for Agentic Zero.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <div className="page-container az-v2-page az-v2-inner-page">
        <article className="az-v2-inner-header az-v2-prose">
          <div className="az-v2-section-heading"><h1>Contact Agentic Zero</h1></div>
          {CONTACT_PARAGRAPHS.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <a className="az-v2-inline-cta" href="mailto:contact@agenticzero.xyz">
            Email Agentic Zero
          </a>
        </article>
        <SiteFooter />
      </div>
    </>
  )
}
