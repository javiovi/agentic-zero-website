import { SPEAKERS_2026 } from '@/lib/speakers'

// Schema.org Event markup for the second edition.
//
// Every field below is sourced from content already published on the site.
// Deliberately omitted because the site does not state them:
//   endDate    — the site says "one-day summit" but publishes no start/end times
//   postalCode — the published address stops at "1244 Sutter Street, San Francisco"
const secondEdition = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Agentic Zero",
  description:
    "The summit on agentic finance returns for its second edition on October 7 during SF Tech Week 2026. The people building the agentic stack, in one room.",
  url: "https://agenticzero.xyz/",
  image: "https://agenticzero.xyz/agentic-zero-sf-tech-week-2026.png",
  startDate: "2026-10-07",
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
  sponsor: [
    {
      "@type": "Organization",
      name: "Cambrian",
      url: "https://www.cambrian.org/",
    },
    {
      "@type": "Organization",
      name: "Calimero",
      url: "https://calimero.network/",
    },
    {
      "@type": "Organization",
      name: "Solana Foundation",
      url: "https://solana.org/",
    },
    {
      "@type": "Organization",
      name: "Franklin Templeton",
      url: "https://www.franklintempleton.com/",
    },
    {
      "@type": "Organization",
      name: "Sentient",
      url: "https://www.sentient.xyz/",
    },
  ],
  superEvent: {
    "@type": "Event",
    name: "San Francisco Tech Week by a16z",
    url: "https://www.tech-week.com/",
  },
  performer: SPEAKERS_2026.map((speaker) => ({
    "@type": "Person",
    "@id": speaker.profileUrl,
    name: speaker.name,
    url: speaker.profileUrl,
    image: `https://agenticzero.xyz${speaker.image}`,
    jobTitle: speaker.role,
    affiliation: {
      "@type": "Organization",
      name: speaker.company,
    },
    sameAs: [speaker.profileUrl],
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(secondEdition) }}
    />
  )
}
