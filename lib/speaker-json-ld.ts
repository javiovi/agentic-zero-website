import { PUBLIC_SPEAKERS_2026, speakerUrl } from '@/lib/speakers'

export const speakerEntities = PUBLIC_SPEAKERS_2026.map((speaker) => ({
    "@type": "Person",
    "@id": speakerUrl(speaker),
    name: speaker.name,
    url: speakerUrl(speaker),
    image: new URL(speaker.image, "https://agenticzero.xyz").href,
    ...(speaker.role ? { jobTitle: speaker.role } : {}),
    affiliation: speaker.organizations
      ? speaker.organizations.map((name) => ({ "@type": "Organization", name }))
      : { "@type": "Organization", name: speaker.company },
    ...(speaker.profileUrl ? { sameAs: [speaker.profileUrl] } : {}),
  }))
