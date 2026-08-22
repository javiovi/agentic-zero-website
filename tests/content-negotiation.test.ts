import { describe, expect, it } from 'vitest'
import {
  appendNegotiationVary,
  preferredRepresentation,
} from '@/lib/content-negotiation'

describe('preferredRepresentation', () => {
  it.each([
    [null, 'text/html'],
    ['', 'text/html'],
    ['*/*', 'text/html'],
    ['text/html', 'text/html'],
    ['text/markdown', 'text/markdown'],
    ['text/markdown, text/html;q=0.8', 'text/markdown'],
    ['text/html, text/markdown;q=0.8', 'text/html'],
    ['text/markdown;q=0, text/html', 'text/html'],
    ['text/html;q=0, */*;q=1', 'text/markdown'],
    ['application/pdf', null],
  ])('selects %s as %s', (accept, expected) => {
    expect(preferredRepresentation(accept)).toBe(expected)
  })
})

describe('appendNegotiationVary', () => {
  it('preserves framework variation and adds the negotiated headers once', () => {
    const headers = new Headers({ Vary: 'rsc, next-router-state-tree' })
    appendNegotiationVary(headers)
    appendNegotiationVary(headers)

    expect(headers.get('Vary')).toBe(
      'rsc, next-router-state-tree, Accept, Accept-Encoding'
    )
  })
})
