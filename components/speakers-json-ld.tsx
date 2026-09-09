import { speakerEntities } from '@/lib/speaker-json-ld'

const speakersPage = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://agenticzero.xyz/speakers#webpage',
  url: 'https://agenticzero.xyz/speakers',
  name: 'Agentic Zero second edition speakers',
  description: 'Meet the announced speakers for the second edition of Agentic Zero. More speakers to be announced soon.',
  about: { '@id': 'https://agenticzero.xyz/#event-2026' },
  mainEntity: {
    '@type': 'ItemList',
    '@id': 'https://agenticzero.xyz/speakers#list',
    name: 'Announced 2026 speakers',
    numberOfItems: speakerEntities.length,
    itemListElement: speakerEntities.map((speaker, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: speaker,
    })),
  },
}

export function SpeakersJsonLd() {
  const json = JSON.stringify(speakersPage)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
