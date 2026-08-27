import { getPost } from '@/lib/blog'
import { blogPostToMarkdown } from '@/lib/blog-markdown'

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params
  const post = getPost(slug)

  if (!post) {
    return new Response('# 404 — Blog post not found\n', {
      status: 404,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    })
  }

  const contentLocation = `/blog/${post.slug}`
  const canonical = `https://agenticzero.xyz${contentLocation}`

  return new Response(blogPostToMarkdown(post), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
      'Vary': 'Accept, Accept-Encoding',
      'Access-Control-Allow-Origin': '*',
      'Content-Language': 'en',
      'Content-Location': contentLocation,
      'Link': `<${canonical}>; rel="canonical"; type="text/html"`,
    },
  })
}
