import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { FirstEditionJsonLd } from '@/components/first-edition-json-ld'
import { SESSIONS } from '@/lib/sessions'

export const metadata: Metadata = {
  title: 'First Edition Agenda | Agentic Zero',
  description:
    'The full programme from the first edition of Agentic Zero, held on 20 November 2025 at La Rural in Buenos Aires. 16 talks, panels and demos, each with its own page.',
  alternates: { canonical: '/first-edition/agenda' },
}

const FORMAT_LABEL: Record<string, string> = {
  keynote: 'Keynote',
  panel: 'Panel',
  demo: 'Demo',
  talk: 'Talk',
}

export default function FirstEditionAgendaPage() {
  // Already ordered by start time when lib/sessions.ts is generated.
  const sessions = SESSIONS

  return (
    <>
      <FirstEditionJsonLd />
      <SiteNav />
      <div className="page-container az-v2-page az-v2-inner-page">
        <div className="az-v2-inner-header az-v2-prose">
          <div className="az-v2-section-heading">
            <span>Archive</span>
            <h1>First Edition Agenda</h1>
          </div>

          <p>
            This is the programme from the first edition of Agentic Zero, held on{' '}
            <time dateTime="2025-11-20">November 20, 2025</time> at La Rural in Buenos Aires,
            Argentina. It is kept here as a record of a past event.
          </p>
          <p>
            The second edition takes place on <time dateTime="2026-10-07">October 7, 2026</time> at
            The Avalon in San Francisco.
            <br />
            <a href="/agenda">See the current agenda</a>.
          </p>

          <ol className="session-index" aria-label="First edition programme in running order">
            {sessions.map((session) => (
              <li key={session.slug}>
                <a href={`/first-edition/agenda/${session.slug}`}>
                  <span className="session-index-time">
                    <time dateTime={`${session.date}T${session.startTime}:00-03:00`}>
                      {session.startTime}
                    </time>
                    <span aria-hidden="true"> to </span>
                    <time dateTime={`${session.date}T${session.endTime}:00-03:00`}>
                      {session.endTime}
                    </time>
                  </span>
                  <span className="session-index-main">
                    <span className="session-index-title">{session.title}</span>
                    <span className="session-index-speakers">
                      {session.speakers.map((s) => s.name).join(', ')}
                    </span>
                  </span>
                  <span className={`session-index-format session-index-format--${session.format}`}>
                    {FORMAT_LABEL[session.format] ?? session.format}
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
