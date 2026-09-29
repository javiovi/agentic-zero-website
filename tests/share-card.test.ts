import { afterEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from '../app/api/share-profile/route'
import { normalizeHandle, photoBounds, PHOTO } from '../lib/share-card'

afterEach(() => vi.unstubAllGlobals())
const request = (handle: string) => new NextRequest(`https://agenticzero.xyz/api/share-profile?handle=${encodeURIComponent(handle)}`)
const profile = (avatar = 'https://pbs.twimg.com/profile_images/123/avatar_normal.jpg', handle = 'AgenticZero') => Response.json({ code: 200, user: { name: 'Agentic Zero', screen_name: handle, avatar_url: avatar } })

describe('X profile lookup', () => {
  it('accepts handles and profile links, but rejects paths and unrelated URLs', () => {
    for (const value of [' @AgenticZero ', 'https://x.com/AgenticZero/', 'https://twitter.com/AgenticZero']) expect(normalizeHandle(value)).toBe('AgenticZero')
    for (const value of ['', 'a'.repeat(16), '../foo', 'https://example.com/a', 'x.com/name/status/123']) expect(normalizeHandle(value)).toBeNull()
  })
  it('rejects invalid input without fetching', async () => {
    const fetch = vi.fn(); vi.stubGlobal('fetch', fetch)
    expect((await GET(request('../bad'))).status).toBe(400)
    expect(fetch).not.toHaveBeenCalled()
  })
  it('returns a same-origin-safe photo and upgrades its resolution', async () => {
    const fetch = vi.fn().mockResolvedValueOnce(profile()).mockResolvedValueOnce(new Response(new Uint8Array([255,216,255]), { headers: { 'Content-Type': 'image/jpeg' } }))
    vi.stubGlobal('fetch', fetch)
    const response = await GET(request('@AgenticZero'))
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ handle: 'AgenticZero', photo: 'data:image/jpeg;base64,/9j/' })
    expect(String(fetch.mock.calls[1][0])).toBe('https://pbs.twimg.com/profile_images/123/avatar_400x400.jpg')
    expect(fetch.mock.calls[1][1].redirect).toBe('error')
  })
  it.each(['http://pbs.twimg.com/profile_images/a.jpg', 'https://evil.test/a.jpg', 'https://pbs.twimg.com.evil.test/profile_images/a.jpg', 'https://user@pbs.twimg.com/profile_images/a.jpg', 'https://pbs.twimg.com:8443/profile_images/a.jpg'])('rejects untrusted avatar URLs: %s', async avatar => {
    const fetch = vi.fn().mockResolvedValueOnce(profile(avatar)); vi.stubGlobal('fetch', fetch)
    expect((await GET(request('AgenticZero'))).status).toBe(502)
    expect(fetch).toHaveBeenCalledTimes(1)
  })
  it('does not silently use a different account', async () => {
    const fetch = vi.fn().mockResolvedValueOnce(profile(undefined, 'DifferentUser')); vi.stubGlobal('fetch', fetch)
    expect((await GET(request('AgenticZero'))).status).toBe(502)
    expect(fetch).toHaveBeenCalledTimes(1)
  })
  it.each(['image/svg+xml', 'text/html'])('rejects unsupported image content: %s', async contentType => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(profile()).mockResolvedValueOnce(new Response('bad', { headers: { 'Content-Type': contentType } })))
    expect((await GET(request('AgenticZero'))).status).toBe(502)
  })
  it('enforces the size limit even when Content-Length is absent', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(profile()).mockResolvedValueOnce(new Response(new Uint8Array(5 * 1024 * 1024 + 1), { headers: { 'Content-Type': 'image/jpeg' } })))
    expect((await GET(request('AgenticZero'))).status).toBe(502)
  })
  it('offers upload fallback on upstream failures', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('unavailable')))
    const response = await GET(request('AgenticZero'))
    expect(response.status).toBe(502)
    expect((await response.json()).error).toContain('upload a photo')
  })
})

describe('photo crop', () => {
  it('covers the frame at every crop position for portrait and landscape photos', () => {
    for (const [width, height] of [[600, 1200], [1400, 800], [500, 500]]) {
      for (const zoom of [1, 2, 3]) for (const x of [0, .5, 1]) for (const y of [0, .5, 1]) {
        const crop = photoBounds(width, height, zoom, x, y)
        // Allow sub-pixel floating-point rounding at the frame boundary.
        const epsilon = 1e-8
        expect(crop.x).toBeLessThanOrEqual(PHOTO.x + epsilon)
        expect(crop.y).toBeLessThanOrEqual(PHOTO.y + epsilon)
        expect(crop.x + crop.w).toBeGreaterThanOrEqual(PHOTO.x + PHOTO.size - epsilon)
        expect(crop.y + crop.h).toBeGreaterThanOrEqual(PHOTO.y + PHOTO.size - epsilon)
      }
    }
  })
})
