import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { CONTACT_PARAGRAPHS } from '@/lib/trust-content'
import { TICKET_URL } from '@/lib/tickets'

export const metadata: Metadata = {
  title: 'Contact | Agentic Zero',
  description: 'Official contact information for Agentic Zero.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  const partifulLabel = 'Partiful page'

  return (
    <>
      <SiteNav />
      <div className="page-container az-v2-page az-v2-inner-page">
        <article className="az-v2-inner-header az-v2-prose">
          <div className="az-v2-section-heading"><h1>Contact Agentic Zero</h1></div>
          {CONTACT_PARAGRAPHS.map((paragraph) => {
            const linkStart = paragraph.indexOf(partifulLabel)

            if (linkStart === -1) return <p key={paragraph}>{paragraph}</p>

            return (
              <p key={paragraph}>
                {paragraph.slice(0, linkStart)}
                <a href={TICKET_URL} target="_blank" rel="noopener noreferrer">
                  {partifulLabel}
                </a>
                {paragraph.slice(linkStart + partifulLabel.length)}
              </p>
            )
          })}
          <a className="az-v2-inline-cta" href="mailto:contact@agenticzero.xyz">
            Email Agentic Zero
          </a>
        </article>
        <SiteFooter />
      </div>
    </>
  )
}
