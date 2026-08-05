import type { Session } from '@/lib/sessions'

// Schema.org Event markup for a single first-edition session.
//
// Every value is derived from the session's own front matter. Times are the
// header start_time and end_time on the session's date, at -03:00, which is the
// zone the first edition ran in. superEvent points at the first edition itself,
// so a session is never mistaken for a standalone event.
//
// Deliberately absent: no offers, no eventAttendanceMode beyond offline, and no
// video object, because the front matter carries a YouTube id but no duration,
// upload date or thumbnail that could be asserted for a VideoObject.
export function SessionJsonLd({ session }: { session: Session }) {
  const performers = session.speakers.map((speaker) => ({
    '@type': 'Person',
    name: speaker.name,
    ...(speaker.organisation
      ? { affiliation: { '@type': 'Organization', name: speaker.organisation } }
      : {}),
  }))

  const event = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: session.title,
    url: `https://agenticzero.xyz/first-edition/agenda/${session.slug}`,
    startDate: `${session.date}T${session.startTime}:00-03:00`,
    endDate: `${session.date}T${session.endTime}:00-03:00`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'La Rural',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Sarmiento 2704',
        addressLocality: 'Ciudad Autónoma de Buenos Aires',
        addressCountry: 'AR',
      },
    },
    performer: performers,
    superEvent: {
      '@type': 'Event',
      name: 'Agentic Zero, first edition',
      url: 'https://agenticzero.xyz/first-edition/agenda',
      startDate: '2025-11-20T10:00:00-03:00',
      endDate: '2025-11-20T17:00:00-03:00',
    },
    organizer: {
      '@type': 'Organization',
      name: 'Agentic Zero',
      url: 'https://agenticzero.xyz',
      email: 'contact@agenticzero.xyz',
      sameAs: [
        'https://x.com/AgenticZero',
        'https://www.linkedin.com/company/agentic-zero-ai',
        'https://www.youtube.com/@agenticzeroxyz',
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(event) }}
    />
  )
}
