import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { SessionJsonLd } from '@/components/session-json-ld'
import { SESSIONS, getSession } from '@/lib/sessions'

// All 16 slugs are known at build time, so every session page is static.
export function generateStaticParams() {
  return SESSIONS.map((session) => ({ slug: session.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const session = getSession(params.slug)
  if (!session) return {}

  const speakers = session.speakers.map((s) => s.name).join(', ')
  const summary = session.body.find((block) => block.type === 'paragraph')?.text ?? ''

  return {
    title: `${session.title} | Agentic Zero first edition`,
    description: summary.slice(0, 200),
    alternates: { canonical: `/first-edition/agenda/${session.slug}` },
    openGraph: {
      title: session.title,
      description: `${session.format} with ${speakers}. Agentic Zero first edition, Buenos Aires, 20 November 2025.`,
      type: 'article',
    },
  }
}

const FORMAT_LABEL: Record<string, string> = {
  keynote: 'Keynote',
  panel: 'Panel',
  demo: 'Demo',
  talk: 'Talk',
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00-03:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Argentina/Buenos_Aires',
  })
}

export default function SessionPage({ params }: { params: { slug: string } }) {
  const session = getSession(params.slug)
  if (!session) notFound()

  const speakers = session.speakers.filter((s) => !s.isModerator)
  const moderators = session.speakers.filter((s) => s.isModerator)

  return (
    <>
      <SessionJsonLd session={session} />
      <SiteNav />
      <div className="page-container az-v2-page az-v2-inner-page">
        <article className="az-v2-inner-header az-v2-prose session-page">
          <p className="session-eyebrow">
            <span>Archive</span>
            <span>First edition</span>
          </p>

          <h1 className="session-title">{session.title}</h1>

          <dl className="session-meta">
            <div>
              <dt>Format</dt>
              <dd>{FORMAT_LABEL[session.format] ?? session.format}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>
                <time dateTime={session.date}>{formatDate(session.date)}</time>
              </dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>
                {session.startTime} to {session.endTime}
                {session.duration ? ` · ${session.duration}` : ''}
              </dd>
            </div>
          </dl>

          <section className="session-speakers" aria-labelledby="session-speakers-heading">
            <h2 id="session-speakers-heading">{speakers.length === 1 ? 'Speaker' : 'Speakers'}</h2>
            <ul>
              {speakers.map((speaker) => (
                <li key={speaker.name}>
                  <span className="session-speaker-name">{speaker.name}</span>
                  {speaker.organisation ? (
                    <span className="session-speaker-org">{speaker.organisation}</span>
                  ) : null}
                </li>
              ))}
            </ul>

            {moderators.length > 0 ? (
              <>
                <h2>{moderators.length === 1 ? 'Moderator' : 'Moderators'}</h2>
                <ul>
                  {moderators.map((speaker) => (
                    <li key={speaker.name}>
                      <span className="session-speaker-name">{speaker.name}</span>
                      {speaker.organisation ? (
                        <span className="session-speaker-org">{speaker.organisation}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>

          {/* One slot was not recorded. Render no player rather than an empty frame. */}
          {session.videoId ? (
            <section className="session-video" aria-labelledby="session-recording-heading">
              <h2 id="session-recording-heading">Recording</h2>
              <div className="session-video-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${session.videoId}`}
                  title={`${session.title} — Agentic Zero first edition`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </section>
          ) : null}

          <section className="session-body" aria-labelledby="session-about-heading">
            <h2 id="session-about-heading">About this session</h2>
            {session.body.map((block, i) =>
              block.type === 'heading' ? (
                <h2 key={i}>{block.text}</h2>
              ) : (
                <p key={i}>{block.text}</p>
              )
            )}
          </section>

          {session.topics.length > 0 ? (
            <section className="session-topics" aria-labelledby="session-topics-heading">
              <h2 id="session-topics-heading">Topics</h2>
              <ul>
                {session.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </section>
          ) : null}

          <nav className="session-links" aria-label="First edition">
            <a href="/first-edition/agenda">Back to the First Edition Agenda</a>
          </nav>
        </article>
        <SiteFooter />
      </div>
    </>
  )
}
