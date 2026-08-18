import type { Metadata } from 'next'
import { EventJsonLd } from '@/components/event-json-ld'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { TICKET_RELEASES, TICKET_URL } from '@/lib/tickets'

const title = 'Agentic Zero tickets | Early Bird tickets are live'
const description =
  'Early Bird tickets are live at $49 for Agentic Zero on October 7, 2026, at The Avalon in San Francisco during SF Tech Week by a16z. General Admission is $69 and Final Release is $99.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/tickets' },
  openGraph: {
    title,
    description,
    url: '/tickets',
    siteName: 'Agentic Zero',
    type: 'website',
    images: [
      {
        url: '/agentic-zero-sf-tech-week-2026.png',
        width: 5760,
        height: 3240,
        alt: 'Agentic Zero — Second Edition · SF Tech Week 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/agentic-zero-sf-tech-week-2026.png'],
  },
}

export default function TicketsPage() {
  return (
    <>
      <EventJsonLd />
      <SiteNav />
      <div className="page-container az-v2-page az-v2-inner-page tickets-page">
        <main className="az-v2-inner-header tickets-main">
          <header className="tickets-header">
            <div className="az-v2-section-heading">
              <h1>Agentic Zero tickets</h1>
            </div>
            <p>Second edition · October 7, 2026</p>
          </header>

          <section className="tickets-releases" aria-labelledby="ticket-releases-title">
            <div className="tickets-section-heading">
              <h2 id="ticket-releases-title">Tickets are live</h2>
              <p>
                Use Partiful to purchase your Agentic Zero ticket. Tickets will be released in
                three stages through our{' '}
                <a href={TICKET_URL} target="_blank" rel="noopener noreferrer">
                  official Partiful page
                </a>
                .
              </p>
            </div>

            <ol className="ticket-release-grid">
              {TICKET_RELEASES.map((release) => (
                <li
                  className={`ticket-release-card ${
                    release.status === 'on-sale' ? 'ticket-release-current' : ''
                  }`}
                  key={release.id}
                >
                  <div className="ticket-release-topline">
                    <span className="ticket-release-status">{release.statusLabel}</span>
                    {release.price !== undefined ? (
                      <span className="ticket-release-price">${release.price}</span>
                    ) : null}
                  </div>
                  <h3>{release.name}</h3>
                  <p>{release.description}</p>
                  <p className="ticket-release-availability">{release.availabilityNote}</p>
                  {release.href ? (
                    <a href={release.href} target="_blank" rel="noopener noreferrer">
                      GET TICKETS
                    </a>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>

          <section className="tickets-practical az-v2-prose" aria-labelledby="ticket-details-title">
            <h2 id="ticket-details-title">Ticket details</h2>

            <div className="tickets-practical-grid">
              <div>
                <h3>What your ticket includes</h3>
                <p>
                  Admission to the one-day, in-person Agentic Zero summit at The Avalon. The full
                  programme and schedule will be published on the{' '}
                  <a href="/agenda">2026 agenda</a>.
                </p>
              </div>
              <div>
                <h3>Who should attend</h3>
                <p>
                  Founders, AI builders, agent-infrastructure teams, payment and financial
                  infrastructure teams, researchers, institutional operators, and investors
                  working on agentic finance.
                </p>
              </div>
              <div>
                <h3>How to get tickets</h3>
                <p>
                  Use the official Partiful page to reserve a ticket. Early Bird is the current
                  release; General Admission and Final Release follow after earlier allocations close.
                </p>
              </div>
              <div>
                <h3>About the summit</h3>
                <p>
                  Agentic Zero is a one-day summit on agentic finance, AI agents, payment
                  infrastructure, and onchain transactions.{' '}
                  <a href="/blog/what-is-agentic-zero">Learn about the second edition</a>.
                </p>
              </div>
            </div>
          </section>

          <aside className="tickets-final-cta az-v2-description-card">
            <h2>Early Bird tickets are live</h2>
            <p>Book through the official Partiful page while the first allocation is available.</p>
            <a
              href={TICKET_URL}
              className="az-v2-inline-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              GET TICKETS
            </a>
          </aside>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
