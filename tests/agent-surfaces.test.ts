import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import { agenticZeroOrganization } from '@/components/organization-json-ld'
import { GET as getNotFound, NOT_FOUND_MARKDOWN } from '@/app/[...notFound]/route'
import { GET as getMarkdown } from '@/app/api/markdown/route'
import {
  ABOUT_PARAGRAPHS,
  CONTACT_PARAGRAPHS,
  PRIVACY_PARAGRAPHS,
} from '@/lib/trust-content'

describe('agent-facing content', () => {
  it('serves the canonical site summary as Markdown', async () => {
    const response = await getMarkdown()
    const body = await response.text()

    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8')
    expect(response.headers.get('Vary')).toContain('Accept')
    expect(body).toContain('## When to use Agentic Zero')
    expect(body).toContain('Accept: text/markdown')
  })

  it('returns a real Markdown 404 with recovery links', async () => {
    const response = await getNotFound()

    expect(response.status).toBe(404)
    expect(response.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8')
    expect(NOT_FOUND_MARKDOWN).toContain('sitemap.xml')
    expect(NOT_FOUND_MARKDOWN).toContain('llms.txt')
  })

  it.each([
    ['about', ABOUT_PARAGRAPHS],
    ['contact', CONTACT_PARAGRAPHS],
    ['privacy', PRIVACY_PARAGRAPHS],
  ])('gives the %s trust page at least 500 characters of prose', (_name, paragraphs) => {
    expect(paragraphs.join(' ').length).toBeGreaterThanOrEqual(500)
  })

  it('publishes a canonical, contactable Organization identity', () => {
    expect(agenticZeroOrganization).toMatchObject({
      '@type': 'Organization',
      name: 'Agentic Zero',
      url: 'https://agenticzero.xyz/',
      logo: 'https://agenticzero.xyz/images/logo.svg',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: expect.any(String),
        email: 'contact@agenticzero.xyz',
      },
    })
    expect(agenticZeroOrganization.sameAs).toHaveLength(3)
  })

  it('keeps llms.txt as the same when-to-use source tested by the route', async () => {
    const body = await readFile('public/llms.txt', 'utf8')
    expect(body).toContain('## When to use Agentic Zero')
  })

  it('restores Vary: Accept at Vercel after Next renders the HTML page', async () => {
    const config = JSON.parse(await readFile('vercel.json', 'utf8'))
    const root = config.headers.find((entry: { source: string }) => entry.source === '/')
    const vary = root.headers.find((header: { key: string }) => header.key === 'Vary')

    expect(vary.value).toContain('Accept')
    expect(vary.value).toContain('Accept-Encoding')
  })
})
