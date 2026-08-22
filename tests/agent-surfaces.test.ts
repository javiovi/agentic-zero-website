import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import { agenticZeroOrganization } from '@/components/organization-json-ld'
import { GET as getNotFound, NOT_FOUND_MARKDOWN } from '@/app/[...notFound]/route'
import { GET as getMarkdown } from '@/app/api/markdown/route'
import {
  CONTACT_PARAGRAPHS,
  PRIVACY_PARAGRAPHS,
} from '@/lib/trust-content'
import AboutPage from '@/app/about/page'

describe('agent-facing content', () => {
  it('keeps homepage structure and the H1 in a Server Component', async () => {
    const homepage = await readFile('components/agentic-zero-landing.tsx', 'utf8')
    const interactions = await readFile('components/homepage-interactions.tsx', 'utf8')

    expect(homepage).not.toMatch(/^['"]use client['"]/)
    expect(homepage).toContain('<h1 className="hero-title">')
    expect(interactions).toMatch(/^['"]use client['"]/)
  })

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
    ['contact', CONTACT_PARAGRAPHS],
    ['privacy', PRIVACY_PARAGRAPHS],
  ])('gives the %s trust page at least 500 characters of prose', (_name, paragraphs) => {
    expect(paragraphs.join(' ').length).toBeGreaterThanOrEqual(500)
  })

  it('uses the What is Agentic Zero article as the about page', () => {
    try {
      AboutPage()
      throw new Error('AboutPage did not redirect')
    } catch (error) {
      expect((error as { digest?: string }).digest).toBe(
        'NEXT_REDIRECT;replace;/blog/what-is-agentic-zero;308;'
      )
    }
  })

  it('keeps the contact page specific and safe to act on', () => {
    const contact = CONTACT_PARAGRAPHS.join(' ')

    expect(contact).toContain('contact@agenticzero.xyz')
    expect(contact).toContain('October 7, 2026')
    expect(contact).toContain('November 20, 2025')
    expect(contact).toContain('Partiful')
    expect(contact).toContain('FAQ')
    expect(CONTACT_PARAGRAPHS.at(-1)).toBe(
      'If the published pages do not answer your question, email us.'
    )
  })

  it('keeps the privacy page specific about the data it processes', () => {
    const privacy = PRIVACY_PARAGRAPHS.join(' ')

    expect(privacy).toContain('Umami analytics')
    expect(privacy).toContain('DNS verification')
    expect(privacy).toContain('does not sell personal information')
    expect(privacy).toContain('August 21, 2026')
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
