import { speakerEntities } from '@/lib/speaker-json-ld'
import { SPONSORS_2026, MEDIA_PARTNERS_2026 } from '@/lib/partners'

// Schema.org Event markup for the second edition.
//
// Every field below is sourced from content already published on the site.
// Deliberately omitted because the site does not state them:
//   endDate    — the site says "one-day summit" but publishes no start/end times
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
  startDate: "2026-10-07",
  isAccessibleForFree: true,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
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
}

function safeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

export function EventJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(secondEdition) }}
    />
  )
}
