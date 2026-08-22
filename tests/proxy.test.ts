import { getRewrittenUrl, isRewrite } from 'next/experimental/testing/server'
import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'
import { proxy } from '@/proxy'

const event = {
  waitUntil() {},
} as never

describe('homepage content negotiation', () => {
  it('rewrites a Markdown request to the Markdown representation', () => {
    const request = new NextRequest('https://agenticzero.xyz/', {
      headers: { Accept: 'text/markdown' },
    })
    const response = proxy(request, event)

    expect(isRewrite(response)).toBe(true)
    expect(getRewrittenUrl(response)).toBe('https://agenticzero.xyz/api/markdown')
    expect(response.headers.get('Vary')).toContain('Accept')
    expect(response.headers.get('Vary')).toContain('Accept-Encoding')
  })

  it('keeps browser requests on the HTML page and varies the proxy response', () => {
    const request = new NextRequest('https://agenticzero.xyz/', {
      headers: { Accept: 'text/html,application/xhtml+xml,*/*;q=0.8' },
    })
    const response = proxy(request, event)

    expect(isRewrite(response)).toBe(false)
    expect(response.headers.get('x-middleware-next')).toBe('1')
    expect(response.headers.get('Vary')).toContain('Accept')
  })

  it('returns 406 when no available representation is acceptable', async () => {
    const request = new NextRequest('https://agenticzero.xyz/', {
      headers: { Accept: 'application/pdf' },
    })
    const response = proxy(request, event)

    expect(response.status).toBe(406)
    expect(response.headers.get('Content-Type')).toContain('text/plain')
    expect(await response.text()).toContain('text/markdown')
  })
})
