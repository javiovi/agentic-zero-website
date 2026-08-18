export const TICKET_URL = 'https://partiful.com/e/6vkA8cTvPI7tTb3NtV2F'

export type TicketReleaseStatus = 'on-sale' | 'upcoming'

export type TicketRelease = {
  id: string
  name: string
  order: string
  status: TicketReleaseStatus
  statusLabel: string
  description: string
  availabilityNote: string
  href?: string
  /** Added only when the public ticket page confirms both values. */
  price?: number
  currency?: string
  validFrom?: string
}

/**
 * Ticket copy, CTAs, and Event structured data read from this shared list.
 * Prices and release dates are intentionally absent until they are public.
 */
export const TICKET_RELEASES: TicketRelease[] = [
  {
    id: 'early-bird',
    name: 'Early Bird',
    order: 'First release',
    status: 'on-sale',
    statusLabel: 'On sale now',
    description: 'Most limited ticket release.',
    availabilityNote: 'Available while its allocation lasts.',
    href: TICKET_URL,
  },
  {
    id: 'advance',
    name: 'Advance',
    order: 'Second release',
    status: 'upcoming',
    statusLabel: 'Opens next',
    description: 'Limited ticket release.',
    availabilityNote: 'Available while its allocation lasts.',
  },
  {
    id: 'general',
    name: 'General',
    order: 'Final release',
    status: 'upcoming',
    statusLabel: 'Final window',
    description: 'The final ticket release.',
    availabilityNote: 'Available while its allocation lasts.',
  },
]

/**
 * Google Event offers require public price data. Until Partiful exposes it,
 * the Event JSON-LD stays free of incomplete offers rather than guessing.
 */
export function ticketOffers() {
  return TICKET_RELEASES.filter(
    (release) => release.href && release.price !== undefined && release.currency
  ).map((release) => ({
    '@type': 'Offer',
    name: `${release.name} ticket`,
    url: release.href,
    price: release.price,
    priceCurrency: release.currency,
    availability:
      release.status === 'on-sale'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
    ...(release.validFrom ? { validFrom: release.validFrom } : {}),
  }))
}
