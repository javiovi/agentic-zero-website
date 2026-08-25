import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { FIRST_EDITION_SPEAKERS } from '@/lib/speakers'

const SITE_URL = 'https://agenticzero.xyz'
const SOCIAL_IMAGE = `${SITE_URL}/Card.png`

export const metadata: Metadata = {
  title: 'First Edition Speakers | Agentic Zero',
  description:
    'The complete 28-speaker lineup from the first edition of Agentic Zero in Buenos Aires.',
  alternates: { canonical: '/speakers/2025' },
  openGraph: {
    title: 'First Edition Speakers | Agentic Zero',
    description:
      'The complete 28-speaker lineup from the first edition of Agentic Zero in Buenos Aires.',
    url: '/speakers/2025',
    siteName: 'Agentic Zero',
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 2400,
        height: 1350,
        alt: 'Agentic Zero first edition',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'First Edition Speakers | Agentic Zero',
    description:
      'The complete 28-speaker lineup from the first edition of Agentic Zero in Buenos Aires.',
    images: [SOCIAL_IMAGE],
  },
}

const firstEditionSpeakersJsonLd = {
  '@context': 'https://schema.org',
  '@graph': FIRST_EDITION_SPEAKERS.map((speaker) => ({
    '@type': 'Person',
    name: speaker.name,
    image: `${SITE_URL}${speaker.image}`,
    ...(speaker.profileUrl ? { sameAs: [speaker.profileUrl] } : {}),
    performerIn: {
      '@type': 'Event',
      name: 'Agentic Zero, first edition',
      url: `${SITE_URL}/first-edition/agenda`,
      startDate: '2025-11-20',
    },
  })),
}

function safeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

export default function FirstEditionSpeakersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(firstEditionSpeakersJsonLd) }}
      />
      <SiteNav />
      <div className="page-container az-v2-page az-v2-inner-page">
        <main className="az-v2-inner-header az-v2-prose">
          <div className="az-v2-section-heading">
            <span>Archive · 28 speakers</span>
            <h1>First edition speakers</h1>
          </div>

          <p>
            The complete speaker lineup from the first edition of Agentic Zero in Buenos Aires.
          </p>

          <div className="first-edition-speaker-grid">
            {FIRST_EDITION_SPEAKERS.map((speaker) => {
              const card = (
                <>
                  <img src={speaker.image} alt={speaker.name} loading="lazy" />
                  <div>
                    <h3>{speaker.name}</h3>
                    <p>{speaker.role}</p>
                  </div>
                </>
              )

              return speaker.profileUrl ? (
                <a
                  className="first-edition-speaker-card"
                  href={speaker.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={speaker.name}
                >
                  {card}
                </a>
              ) : (
                <article className="first-edition-speaker-card" key={speaker.name}>
                  {card}
                </article>
              )
            })}
          </div>

          <nav className="post-links" aria-label="First edition archive">
            <a href="/first-edition/agenda">View the 2025 agenda</a>
            <a href="/#speakers">Meet the 2026 speakers</a>
          </nav>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
