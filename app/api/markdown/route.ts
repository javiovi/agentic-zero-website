import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export async function GET() {
  const body = await readFile(join(process.cwd(), 'public', 'llms.txt'), 'utf8')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
      'Vary': 'Accept, Accept-Encoding',
      'Access-Control-Allow-Origin': '*',
      'Content-Language': 'en',
      'Content-Location': '/',
      'Link': '<https://agenticzero.xyz/llms.txt>; rel="alternate"; type="text/plain"',
    },
  })
}
