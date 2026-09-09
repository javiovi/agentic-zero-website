import { PUBLIC_SPEAKERS_2026 } from '@/lib/speakers'

export const speakerEntities = PUBLIC_SPEAKERS_2026.map((speaker) => ({
    "@type": "Person",
    "@id": speaker.profileUrl,
    name: speaker.name,
    url: speaker.profileUrl,
    image: new URL(speaker.image, "https://agenticzero.xyz").href,
    jobTitle: speaker.role,
    affiliation: {
      "@type": "Organization",
      name: speaker.company,
    },
    sameAs: [speaker.profileUrl],
  }))
