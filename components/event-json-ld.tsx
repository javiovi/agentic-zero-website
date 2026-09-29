import { AGENDA_2026 } from '@/lib/agenda-2026'
import { speakerEntities } from '@/lib/speaker-json-ld'
import { OrganizationJsonLd } from '@/components/organization-json-ld'
import { SPONSORS_2026, MEDIA_PARTNERS_2026 } from '@/lib/partners'

// Schema.org Event markup for the second edition.
//
// Every field below is sourced from content already published on the site.
// Deliberately omitted because the site does not state them:
//   endDate    — the last session has an end time, but event closing is not stated
//   postalCode — the published address stops at "1244 Sutter Street, San Francisco"
const secondEdition = {
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": "https://agenticzero.xyz/#event-2026",
  name: "Agentic Zero",
  description:
    "The summit on agentic finance returns for its second edition on October 7 during SF Tech Week 2026. The people building the agentic stack, in one room.",
  url: "https://agenticzero.xyz/",
  image: "https://agenticzero.xyz/agentic-zero-sf-tech-week-2026.png",
  subjectOf: {
    "@type": "CollectionPage",
    "@id": "https://agenticzero.xyz/speakers#webpage",
    url: "https://agenticzero.xyz/speakers",
    name: "Agentic Zero second edition speakers",
  },
  startDate: `2026-10-07T${AGENDA_2026[0].start}:00-07:00`,
  isAccessibleForFree: true,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    "@id": "https://agenticzero.xyz/#venue-2026",
    name: "The Avalon",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1244 Sutter Street",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
  },
  organizer: {
    "@id": "https://agenticzero.xyz/#organization",
  },
  sponsor: SPONSORS_2026.map((sponsor) => ({
    "@type": "Organization",
    name: sponsor.name,
    url: sponsor.website,
    logo: `https://agenticzero.xyz${sponsor.logo}`,
  })),
  contributor: MEDIA_PARTNERS_2026.map((partner) => ({
    "@type": "Role",
    roleName: "Media Partner",
    contributor: {
      "@type": "Organization",
      name: partner.name,
      url: partner.website,
      logo: `https://agenticzero.xyz${partner.logo}`,
      ...('profileUrl' in partner ? { sameAs: [partner.profileUrl] } : {}),
    },
  })),
  superEvent: {
    "@type": "Event",
    name: "San Francisco Tech Week by a16z",
    url: "https://www.tech-week.com/",
  },
  performer: speakerEntities,
  subEvent: AGENDA_2026.map((session) => ({
    '@type': 'Event',
    '@id': `https://agenticzero.xyz/agenda#${session.id}`,
    url: `https://agenticzero.xyz/agenda#${session.id}`,
    name: session.title,
    ...(session.description ? { description: session.description } : {}),
    startDate: `2026-10-07T${session.start}:00-07:00`,
    ...(session.end ? { endDate: `2026-10-07T${session.end}:00-07:00` } : {}),
    superEvent: { '@id': 'https://agenticzero.xyz/#event-2026' },
    location: { '@id': 'https://agenticzero.xyz/#venue-2026' },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    performer: session.participants.map(({ speaker, moderator }) => {
      const person = speakerEntities.find((entry) => entry.name === speaker.name) ?? {
        '@type': 'Person',
        '@id': `https://agenticzero.xyz/agenda#speaker-${speaker.slug}`,
        name: speaker.name,
        jobTitle: speaker.role,
        affiliation: { '@type': 'Organization', name: speaker.company },
      }
      return moderator
        ? { '@type': 'Role', roleName: 'Moderator', performer: person }
        : person
    }),
  })),
}

function safeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

export function EventJsonLd() {
  return (
    <>
      <OrganizationJsonLd />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(secondEdition) }}
      />
    </>
  )
}
