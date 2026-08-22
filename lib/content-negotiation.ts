export type Representation = 'text/html' | 'text/markdown'

type AcceptEntry = {
  type: string
  q: number
  specificity: number
  position: number
}

const REPRESENTATIONS: Representation[] = ['text/html', 'text/markdown']

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(',')
    .map((raw, position) => {
      const parts = raw.trim().split(';').map((part) => part.trim())
      const type = parts[0].toLowerCase()
      let q = 1

      for (const parameter of parts.slice(1)) {
        const [name, value] = parameter.split('=').map((part) => part.trim())
        if (name.toLowerCase() !== 'q') continue

        const parsed = Number(value)
        if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed))
      }

      return {
        type,
        q,
        specificity: type === '*/*' ? 0 : type.endsWith('/*') ? 1 : 2,
        position,
      }
    })
    .filter((entry) => entry.type.length > 0)
}

function matches(entry: AcceptEntry, candidate: Representation): boolean {
  if (entry.type === '*/*') return true
  if (entry.type.endsWith('/*')) return candidate.startsWith(entry.type.slice(0, -1))
  return entry.type === candidate
}

/**
 * Selects the representation according to RFC 9110 specificity and q-values.
 * HTML is the default for an absent header, an empty header, and a wildcard.
 */
export function preferredRepresentation(header: string | null): Representation | null {
  if (!header) return 'text/html'

  const entries = parseAccept(header)
  if (entries.length === 0) return 'text/html'

  let bestType: Representation | null = null
  let bestQ = -1
  let bestPosition = Number.POSITIVE_INFINITY

  for (const candidate of REPRESENTATIONS) {
    let match: AcceptEntry | null = null

    for (const entry of entries) {
      if (!matches(entry, candidate)) continue
      if (
        match === null ||
        entry.specificity > match.specificity ||
        (entry.specificity === match.specificity && entry.position < match.position)
      ) {
        match = entry
      }
    }

    if (!match || match.q <= 0) continue
    if (
      match.q > bestQ ||
      (match.q === bestQ && match.position < bestPosition)
    ) {
      bestType = candidate
      bestQ = match.q
      bestPosition = match.position
    }
  }

  return bestType
}

export function appendNegotiationVary(headers: Headers): void {
  const existing = headers.get('Vary')
  const values = existing
    ? existing.split(',').map((value) => value.trim()).filter(Boolean)
    : []
  const lowercase = new Set(values.map((value) => value.toLowerCase()))

  for (const required of ['Accept', 'Accept-Encoding']) {
    if (!lowercase.has(required.toLowerCase())) values.push(required)
  }

  headers.set('Vary', values.join(', '))
}
