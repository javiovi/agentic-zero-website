export const NOT_FOUND_MARKDOWN = `# 404 — Page not found

The requested Agentic Zero page does not exist.

Try one of these machine-readable starting points:

- [Homepage](https://agenticzero.xyz/)
- [Sitemap](https://agenticzero.xyz/sitemap.xml)
- [Agent instructions](https://agenticzero.xyz/llms.txt)
- [Blog index](https://agenticzero.xyz/blog)
- [Contact](https://agenticzero.xyz/contact)
`

export async function GET() {
  return new Response(NOT_FOUND_MARKDOWN, {
    status: 404,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'no-store',
      'Vary': 'Accept, Accept-Encoding',
    },
  })
}
