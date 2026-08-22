export const agenticZeroOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://agenticzero.xyz/#organization',
  name: 'Agentic Zero',
  description:
    'Agentic Zero is a one-day summit on agentic finance for the people building AI agents, payment and financial infrastructure, and the institutions adapting to them.',
  url: 'https://agenticzero.xyz/',
  logo: 'https://agenticzero.xyz/images/logo.svg',
  email: 'contact@agenticzero.xyz',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'general and sponsorship enquiries',
    email: 'contact@agenticzero.xyz',
  },
  sameAs: [
    'https://x.com/AgenticZero',
    'https://www.linkedin.com/company/agentic-zero-ai',
    'https://www.youtube.com/@agenticzeroxyz',
  ],
}

function safeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(agenticZeroOrganization) }}
    />
  )
}
