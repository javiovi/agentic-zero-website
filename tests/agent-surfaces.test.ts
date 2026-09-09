import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import { agenticZeroOrganization } from '@/components/organization-json-ld'
import { GET as getNotFound, NOT_FOUND_MARKDOWN } from '@/app/[...notFound]/route'
import { GET as getMarkdown } from '@/app/api/markdown/route'
import { GET as getBlogMarkdown } from '@/app/api/markdown/[slug]/route'
import {
  CONTACT_PARAGRAPHS,
  PRIVACY_PARAGRAPHS,
} from '@/lib/trust-content'
import AboutPage from '@/app/about/page'
import { PUBLIC_SPEAKERS_2026, SPEAKERS_2026, speakerDisplayRole } from '@/lib/speakers'
import { SPONSORS_2026, MEDIA_PARTNER_2026 } from '@/lib/partners'

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

  it('serves complete blog articles as negotiated Markdown', async () => {
    const response = await getBlogMarkdown(
      new Request('https://agenticzero.xyz/api/markdown/mpp'),
      {
        params: Promise.resolve({
          slug: 'mpp-what-machine-payments-look-like-before-they-become-a-market',
        }),
      }
    )
    const body = await response.text()

    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8')
    expect(response.headers.get('Content-Location')).toBe(
      '/blog/mpp-what-machine-payments-look-like-before-they-become-a-market'
    )
    expect(body).toContain('# MPP: What Early Machine Payments Look Like')
    expect(body).toContain('| Asset | Session transfers | Native payee value | Share of session transfers |')
    expect(body).toContain('Why this matters for agentic finance')
    expect(body).not.toMatch(/\blegs?\b/i)
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
    expect(privacy).toContain('September 8, 2026')
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
    expect(body).toContain('MPP: What Early Machine Payments Look Like')
    expect(body).toContain('Accept: text/markdown')
    expect(body).not.toContain('Early Bird')
    expect(body).not.toContain('General Admission')
    expect(body).not.toContain('Final Release')
    expect(body).not.toContain('$49')
  })

  it('keeps the LLM lineup aligned with the published speakers and hides unpublished records', async () => {
    const response = await getMarkdown()
    const body = await response.text()
    const section = body.split('## Announced 2026 Speakers')[1].split('## 2026 Partners')[0]
    const links = [...section.matchAll(/^- \[([^\]]+)\]\(([^)]+)\)/gm)]

    expect(links.map((match) => [match[1], match[2]])).toEqual(
      PUBLIC_SPEAKERS_2026.map((speaker) => [speaker.name, speaker.profileUrl])
    )
    for (const speaker of PUBLIC_SPEAKERS_2026) {
      expect(section).toContain(speakerDisplayRole(speaker))
    }
    for (const speaker of SPEAKERS_2026.filter((speaker) => speaker.published === false)) {
      expect(body).not.toContain(speaker.name)
      expect(body).not.toContain(speaker.profileUrl)
    }
  })

  it('lists sponsors and the media partner separately with their current destinations', async () => {
    const body = await (await getMarkdown()).text()
    const partners = body.split('## 2026 Partners')[1].split('## Positioning')[0]
    const [sponsors, media] = partners.split('### Media Partner')

    for (const sponsor of SPONSORS_2026) {
      expect(sponsors).toContain(`[${sponsor.name}](${sponsor.website})`)
    }
    expect(sponsors).not.toContain(MEDIA_PARTNER_2026.name)
    expect(media).toContain(`[${MEDIA_PARTNER_2026.name}](${MEDIA_PARTNER_2026.website})`)
    expect(body).toContain('https://agenticzero.xyz/speakers')
    expect(body).toContain('https://agenticzero.xyz/#partners')
  })

  it('marks admission as free without introducing ticket offers', async () => {
    const ticketSource = await readFile('lib/tickets.ts', 'utf8')
    const eventJsonLd = await readFile('components/event-json-ld.tsx', 'utf8')

    expect(ticketSource).toContain('partiful.com')
    expect(ticketSource).not.toContain('price')
    expect(eventJsonLd).not.toContain('offers')
    expect(eventJsonLd).toContain('isAccessibleForFree: true')
  })

  it('restores Vary: Accept at Vercel after Next renders the HTML page', async () => {
    const config = JSON.parse(await readFile('vercel.json', 'utf8'))
    const root = config.headers.find((entry: { source: string }) => entry.source === '/')
    const vary = root.headers.find((header: { key: string }) => header.key === 'Vary')
    const blog = config.headers.find(
      (entry: { source: string }) => entry.source === '/blog/(.*)'
    )
    const blogVary = blog.headers.find((header: { key: string }) => header.key === 'Vary')

    expect(vary.value).toContain('Accept')
    expect(vary.value).toContain('Accept-Encoding')
    expect(blogVary.value).toContain('Accept')
    expect(blogVary.value).toContain('Accept-Encoding')
  })
})
