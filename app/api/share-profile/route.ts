import { NextRequest, NextResponse } from 'next/server'
import { normalizeHandle } from '@/lib/share-card'

export const runtime = 'nodejs'
const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const unavailable = () => NextResponse.json(
  { error: 'We couldn’t load that X profile. Check the handle or upload a photo instead.' },
  { status: 502, headers: { 'Cache-Control': 'no-store' } },
)

export async function GET(request: NextRequest) {
  const handle = normalizeHandle(request.nextUrl.searchParams.get('handle') ?? '')
  if (!handle) return NextResponse.json({ error: 'Enter a valid X handle, such as @AgenticZero.' }, { status: 400 })

  try {
    // Fetch public profile data only. No user-provided URL is fetched by this route.
    const profile = await fetch(`https://api.fxtwitter.com/${handle}`, {
      signal: AbortSignal.timeout(8000), redirect: 'error', next: { revalidate: 3600 },
    })
    if (!profile.ok) return unavailable()
    const data = await profile.json()
    const user = data.user
    if (data.code !== 200 || !user || typeof user.avatar_url !== 'string' ||
        typeof user.screen_name !== 'string' || user.screen_name.toLowerCase() !== handle.toLowerCase()) return unavailable()

    const avatar = new URL(user.avatar_url)
    if (avatar.protocol !== 'https:' || avatar.hostname !== 'pbs.twimg.com' ||
        avatar.port || avatar.username || avatar.password || !avatar.pathname.startsWith('/profile_images/')) return unavailable()
    avatar.pathname = avatar.pathname.replace(/_normal(?=\.[^.]+$)/, '_400x400')
    const response = await fetch(avatar, {
      signal: AbortSignal.timeout(8000), redirect: 'error', next: { revalidate: 3600 },
    })
    const contentType = response.headers.get('content-type')?.split(';')[0]
    if (!response.ok || !contentType || !['image/jpeg', 'image/png', 'image/webp'].includes(contentType) ||
        Number(response.headers.get('content-length')) > MAX_IMAGE_BYTES || !response.body) return unavailable()

    const reader = response.body.getReader()
    const chunks: Uint8Array[] = []
    let size = 0
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_IMAGE_BYTES) { await reader.cancel(); return unavailable() }
      chunks.push(value)
    }
    if (!size) return unavailable()
    // A data URL keeps the export canvas origin-clean and avoids an open image proxy.
    return NextResponse.json({
      name: typeof user.name === 'string' ? user.name.slice(0, 60) : handle,
      handle: user.screen_name,
      photo: `data:${contentType};base64,${Buffer.concat(chunks).toString('base64')}`,
    }, { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600' } })
  } catch { return unavailable() }
}
