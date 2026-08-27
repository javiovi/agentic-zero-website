import assert from 'node:assert/strict'

const baseUrl = process.env.AGENT_READINESS_BASE_URL ?? 'http://127.0.0.1:3000'
const isLocalBase = ['localhost', '127.0.0.1', '::1'].includes(new URL(baseUrl).hostname)
const mppArticlePath =
  '/blog/mpp-what-machine-payments-look-like-before-they-become-a-market'

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|amp|quot|#39);/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function request(path, accept) {
  return fetch(`${baseUrl}${path}`, {
    headers: accept ? { Accept: accept } : undefined,
    redirect: 'manual',
  })
}

const htmlResponse = await request('/', 'text/html')
const html = await htmlResponse.text()
assert.equal(htmlResponse.status, 200)
assert.match(htmlResponse.headers.get('content-type') ?? '', /^text\/html/)
const htmlVary = htmlResponse.headers.get('vary') ?? ''
const htmlCacheControl = htmlResponse.headers.get('cache-control') ?? ''
assert.ok(
  /(?:^|,)\s*Accept(?:,|$)/i.test(htmlVary) || /(?:no-store|private)/i.test(htmlCacheControl),
  'HTML must vary on Accept or be excluded from shared caches'
)
assert.match(html, /<h1\b[^>]*>[\s\S]*?Agentic[\s\S]*?Zero[\s\S]*?<\/h1>/i)
assert.ok(visibleText(html).length >= 500, 'homepage raw HTML has under 500 text characters')

const markdownResponse = await request('/', 'text/markdown')
const markdown = await markdownResponse.text()
assert.equal(markdownResponse.status, 200)
assert.match(markdownResponse.headers.get('content-type') ?? '', /^text\/markdown/)
assert.match(markdownResponse.headers.get('vary') ?? '', /(?:^|,)\s*Accept(?:,|$)/i)
assert.match(markdown, /## When to use Agentic Zero/)

const unacceptable = await request('/', 'application/pdf')
assert.equal(unacceptable.status, 406)

const missing = await request('/this-path-does-not-exist-agent-readiness')
const missingBody = await missing.text()
assert.equal(missing.status, 404)
assert.match(missing.headers.get('content-type') ?? '', /^text\/markdown/)
assert.match(missingBody, /sitemap\.xml/)
assert.match(missingBody, /llms\.txt/)

const about = await request('/about', 'text/html')
assert.equal(about.status, 308)
assert.equal(about.headers.get('location'), '/blog/what-is-agentic-zero')

const mppArticle = await request(mppArticlePath, 'text/html')
const mppArticleHtml = await mppArticle.text()
assert.equal(mppArticle.status, 200)
assert.match(mppArticle.headers.get('content-type') ?? '', /^text\/html/)
if (!isLocalBase) {
  assert.match(mppArticle.headers.get('vary') ?? '', /(?:^|,)\s*Accept(?:,|$)/i)
}
assert.match(mppArticleHtml, /<title>MPP: What Early Machine Payments Look Like<\/title>/)
assert.match(
  mppArticleHtml,
  /<link rel="canonical" href="https:\/\/agenticzero\.xyz\/blog\/mpp-what-machine-payments-look-like-before-they-become-a-market"\/>/
)
assert.match(
  mppArticleHtml,
  /<link rel="alternate" type="text\/markdown" href="https:\/\/agenticzero\.xyz\/blog\/mpp-what-machine-payments-look-like-before-they-become-a-market"\/>/
)
assert.match(mppArticleHtml, /Machine Payments Protocol \(MPP\)/)
assert.match(mppArticleHtml, /Share of session transfers/)
assert.doesNotMatch(visibleText(mppArticleHtml), /\blegs?\b/i)

const mppMarkdown = await request(mppArticlePath, 'text/markdown')
const mppMarkdownBody = await mppMarkdown.text()
assert.equal(mppMarkdown.status, 200)
assert.match(mppMarkdown.headers.get('content-type') ?? '', /^text\/markdown/)
assert.match(mppMarkdown.headers.get('vary') ?? '', /(?:^|,)\s*Accept(?:,|$)/i)
assert.equal(mppMarkdown.headers.get('content-location'), mppArticlePath)
assert.match(mppMarkdownBody, /^# MPP: What Early Machine Payments Look Like/m)
assert.match(
  mppMarkdownBody,
  /\| Asset \| Session transfers \| Native payee value \| Share of session transfers \|/
)
assert.match(mppMarkdownBody, /Why this matters for agentic finance/)

for (const path of ['/contact', '/privacy']) {
  const response = await request(path, 'text/html')
  const body = await response.text()
  assert.equal(response.status, 200, `${path} did not return 200`)
  assert.ok(visibleText(body).length >= 500, `${path} has under 500 text characters`)
}

const contact = await request('/contact', 'text/html')
const contactBody = await contact.text()
assert.match(contactBody, /href="https:\/\/partiful\.com\/e\/6vkA8cTvPI7tTb3NtV2F"/)
assert.match(contactBody, /homepage, tickets page, agenda, FAQ, and llms\.txt/)
assert.match(contactBody, /<p>If the published pages do not answer your question, email us\.<\/p>/)

const privacy = await request('/privacy', 'text/html')
const privacyBody = await privacy.text()
assert.match(privacyBody, /Umami analytics/)
assert.match(privacyBody, /DNS verification/)
assert.match(privacyBody, /does not sell personal information/)
assert.match(privacyBody, /August 21, 2026/)

const llms = await request('/llms.txt')
assert.equal(llms.status, 200)
const llmsBody = await llms.text()
assert.match(llmsBody, /## When to use Agentic Zero/)
assert.match(llmsBody, /MPP: What Early Machine Payments Look Like/)
assert.match(llmsBody, new RegExp(mppArticlePath))

const llmsMarkdown = await request('/llms.md')
assert.equal(llmsMarkdown.status, 200)
assert.match(llmsMarkdown.headers.get('content-type') ?? '', /^text\/markdown/)
assert.equal(await llmsMarkdown.text(), llmsBody)

const robots = await request('/robots.txt')
assert.equal(robots.status, 200)
assert.match(await robots.text(), /Sitemap: https:\/\/agenticzero\.xyz\/sitemap\.xml/)

const sitemap = await request('/sitemap.xml')
const sitemapBody = await sitemap.text()
assert.equal(sitemap.status, 200)
for (const path of ['/contact', '/privacy', '/llms.txt', mppArticlePath]) {
  assert.match(sitemapBody, new RegExp(`<loc>https://agenticzero\\.xyz${path.replace('.', '\\.')}<\\/loc>`))
}
assert.doesNotMatch(sitemapBody, /<loc>https:\/\/agenticzero\.xyz\/about<\/loc>/)
assert.match(sitemapBody, /<loc>https:\/\/agenticzero\.xyz\/blog\/what-is-agentic-zero<\/loc>/)

const publicUrls = [...sitemapBody.matchAll(/<loc>https:\/\/agenticzero\.xyz(.*?)<\/loc>/g)]
  .map((match) => match[1] || '/')
for (const path of publicUrls) {
  const response = await request(path)
  assert.equal(response.status, 200, `sitemap endpoint ${path} did not return 200`)
}

const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .map((match) => JSON.parse(match[1]))
const organization = jsonLdBlocks.find((block) => block['@type'] === 'Organization')
assert.equal(organization?.url, 'https://agenticzero.xyz/')
assert.equal(organization?.contactPoint?.email, 'contact@agenticzero.xyz')
assert.ok(Array.isArray(organization?.sameAs) && organization.sameAs.length >= 3)

const articleJsonLdBlocks = [
  ...mppArticleHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
].map((match) => JSON.parse(match[1]))
const blogPosting = articleJsonLdBlocks.find((block) => block['@type'] === 'BlogPosting')
assert.equal(blogPosting?.headline, 'MPP: What Early Machine Payments Look Like')
assert.equal(blogPosting?.datePublished, '2026-08-27')
assert.equal(blogPosting?.dateModified, '2026-08-27')
assert.equal(blogPosting?.inLanguage, 'en')
assert.equal(blogPosting?.articleSection, 'Agentic payments')
assert.ok(blogPosting?.wordCount > 1000)
assert.ok(blogPosting?.keywords.includes('Machine Payments Protocol'))
assert.ok(blogPosting?.about.some((topic) => topic.name === 'agentic finance'))

console.log('Agent-readiness endpoint verification passed.')
