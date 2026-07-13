import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://agenticzero.xyz/sitemap.xml',
    host: 'https://agenticzero.xyz',
  }
}
