// Schema.org Event markup for the second edition (homepage).
//
// Every field below is sourced from content already published on the site.
// Deliberately omitted because the site does not state them:
//   endDate    — the site says "one-day summit" but publishes no start/end times
//   offers     — tickets are "coming soon", no price or purchase URL exists
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
    "@type": "Organization",
    name: "Agentic Zero",
    url: "https://agenticzero.xyz",
    email: "contact@agenticzero.xyz",
    // agenticzero.com is deliberately absent: it is not under our control.
    sameAs: [
      "https://x.com/AgenticZero",
      "https://www.linkedin.com/company/agentic-zero-ai",
      "https://www.youtube.com/@agenticzeroxyz",
    ],
  },
  superEvent: {
    "@type": "Event",
    name: "San Francisco Tech Week by a16z",
    url: "https://www.tech-week.com/",
  },
}

export function EventJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(secondEdition) }}
    />
  )
}
