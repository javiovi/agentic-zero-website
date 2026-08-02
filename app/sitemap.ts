import { readdirSync } from 'fs'
import { join } from 'path'
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://agenticzero.xyz'
const APP_DIR = join(process.cwd(), 'app')

// Route segments never published in the sitemap.
// api      — not a page, and disallowed in robots.ts
// confirm  — post-signup landing, reached by link from an email, not by search
const EXCLUDED_SEGMENTS = new Set(['api', 'confirm'])

// Public files that are not App Router routes and so cannot be discovered by
// walking the app directory.
const STATIC_EXTRAS = ['/llms.txt']

// Walks the app directory and returns a route path for every page.tsx found.
// Skips private folders (_foo), parallel/intercepted routes (@foo, (.)foo),
// dynamic segments ([id]), and anything under EXCLUDED_SEGMENTS.
// Route groups ((marketing)) are traversed but contribute no path segment.
function collectRoutes(dir: string, segments: string[] = []): string[] {
  const routes: string[] = []
  const entries = readdirSync(dir, { withFileTypes: true })

  if (entries.some((entry) => entry.isFile() && entry.name === 'page.tsx')) {
    routes.push('/' + segments.join('/'))
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const name = entry.name
    if (EXCLUDED_SEGMENTS.has(name)) continue
    if (name.startsWith('_') || name.startsWith('@')) continue
    if (name.startsWith('[')) continue
    if (name.startsWith('(') && !name.endsWith(')')) continue

    const isRouteGroup = name.startsWith('(') && name.endsWith(')')
    routes.push(
      ...collectRoutes(join(dir, name), isRouteGroup ? segments : [...segments, name])
    )
  }

  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...new Set([...collectRoutes(APP_DIR), ...STATIC_EXTRAS])].sort()

  return routes.map((route) => ({
    url: route === '/' ? `${BASE_URL}/` : `${BASE_URL}${route}`,
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.7,
  }))
}
