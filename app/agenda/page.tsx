import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import { EventJsonLd } from '@/components/event-json-ld'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { AGENDA_2026, agendaTime, type AgendaParticipant } from '@/lib/agenda-2026'
import styles from './agenda.module.css'

export const metadata: Metadata = pageMetadata({
  title: 'Agenda | Agentic Zero',
  description: 'Explore the panels, keynotes, and demos at Agentic Zero on October 7, 2026, at The Avalon in San Francisco during SF Tech Week by a16z.',
  path: '/agenda',
})

function Participant({ speaker, moderator }: AgendaParticipant) {
  const content = <>
    <span className={styles.portraitStack}>
      <span className={styles.portraitLayer} aria-hidden="true" />
      <span className={styles.portraitLayer} aria-hidden="true" />
      <span className={styles.portraitLayer} aria-hidden="true" />
      <span className={styles.portrait}>
      {speaker.image ? <img src={speaker.image} alt="" width={240} height={300} loading="lazy"
        style={speaker.slug === 'brad-holden' ? { objectPosition: '50% 20%' } : speaker.slug === 'mac' ? { objectPosition: '50% 0%' } : speaker.slug === 'ken-priyadarshi' ? { transform: 'scale(1.5)', transformOrigin: '50% 35%' } : undefined} />
        : <span className={styles.initials} aria-label="Headshot to be announced">{speaker.name.split(' ').map(word => word[0]).join('')}</span>}
      {moderator && <span className={styles.moderator}>Moderator</span>}
      </span>
    </span>
    <span className={styles.personDetails}>
      <span className={styles.personName}>{speaker.name}</span>
      <span className={styles.personCompany}>{speaker.company}</span>
      <span className={styles.personRole}>{speaker.role}</span>
    </span>
  </>
  return <li className={`${styles.person} ${moderator ? styles.moderatorPerson : ''}`}>
    {speaker.profileUrl ? <a href={speaker.profileUrl} target="_blank" rel="noopener noreferrer" aria-label={`${speaker.name}, ${moderator ? 'moderator, ' : ''}${speaker.company} — view profile`}>{content}</a> : <div>{content}</div>}
  </li>
}

export default function AgendaPage() {
  return <>
    <EventJsonLd />
    <SiteNav />
    <div className="page-container az-v2-page az-v2-inner-page">
      <main className={styles.main}>
        <header className={styles.header}>
          <div className="az-v2-section-heading">
            <span>Second edition · SF Tech Week 2026</span>
            <h1>Agenda</h1>
          </div>
          <div className={styles.eventDetails}>
            <p><time dateTime="2026-10-07">October 7, 2026</time><br />The Avalon · San Francisco</p>
            <a className={styles.ticketLink} href="/tickets">REGISTER HERE <span aria-hidden="true">↗</span></a>
          </div>
        </header>
        <div className={styles.scheduleHeader}>
          <p>All times Pacific Time (PT)</p>
        </div>
        <ol className={styles.schedule} aria-label="October 7 programme">
          {AGENDA_2026.map(session => <li key={session.id}>
            <article id={session.id} className={`${styles.session} ${session.break ? styles.break : ''}`} aria-labelledby={`${session.id}-title`}>
              <div className={styles.sessionCopy}>
                <div className={styles.sessionMeta}>
                  <span className={styles.timeRange}><time dateTime={`2026-10-07T${session.start}:00-07:00`}>{agendaTime(session.start)}</time>{session.end && <> – <time dateTime={`2026-10-07T${session.end}:00-07:00`}>{agendaTime(session.end)}</time></>}</span>
                  <span className={styles.format}>{session.format}</span>
                </div>
                <h2 id={`${session.id}-title`}>{session.title}</h2>
                {session.description && <p className={styles.description}>{session.description}</p>}
              </div>
              {session.participants.length > 0 && <div>
                <ul className={`${styles.people} ${session.participants.length === 4 ? styles.fourPeople : ''}`} aria-label={`Speakers for ${session.title}`}>
                  {session.participants.map(person => <Participant key={person.speaker.slug} {...person} />)}
                </ul>
              </div>}
            </article>
          </li>)}
        </ol>
      </main>
      <SiteFooter />
    </div>
  </>
}
