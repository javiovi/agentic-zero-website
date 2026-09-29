import { OrganizationJsonLd } from '@/components/organization-json-ld'

const sharePage = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://agenticzero.xyz/share#webpage',
  url: 'https://agenticzero.xyz/share',
  name: 'Agentic Zero attendee card',
  description: 'Make an “I’m attending Agentic Zero” card with your photo or public X profile and export a 1080 × 1080 JPG.',
  inLanguage: 'en',
  isAccessibleForFree: true,
  isPartOf: {
    '@type': 'WebSite',
    '@id': 'https://agenticzero.xyz/#website',
    url: 'https://agenticzero.xyz/',
    name: 'Agentic Zero',
  },
  about: { '@id': 'https://agenticzero.xyz/#event-2026' },
  publisher: { '@id': 'https://agenticzero.xyz/#organization' },
  mainEntity: {
    '@type': 'WebApplication',
    '@id': 'https://agenticzero.xyz/share#generator',
    url: 'https://agenticzero.xyz/share',
    name: 'Agentic Zero attendee card generator',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript and HTML Canvas support.',
    isAccessibleForFree: true,
    publisher: { '@id': 'https://agenticzero.xyz/#organization' },
    featureList: [
      'Upload a JPG, PNG or WebP photo',
      'Import a public X profile photo',
      'Edit your name and optional handle',
      'Adjust photo crop and zoom',
      'Export a 1080 × 1080 JPG',
    ],
  },
}

export function ShareJsonLd() {
  const json = JSON.stringify(sharePage)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

  return <>
    <OrganizationJsonLd />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  </>
}
