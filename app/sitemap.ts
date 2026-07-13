import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://agenticzero.xyz/',
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://agenticzero.xyz/llms.txt',
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]
}
