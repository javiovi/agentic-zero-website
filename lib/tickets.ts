export const TICKET_URL = 'https://partiful.com/e/6vkA8cTvPI7tTb3NtV2F'

export type TicketReleaseStatus = 'on-sale' | 'upcoming'

export type TicketRelease = {
  id: string
  name: string
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
 * Release dates are intentionally absent until they are public.
 */
export const TICKET_RELEASES: TicketRelease[] = [
  {
    id: 'early-bird',
    name: 'Early Bird',
    status: 'on-sale',
    statusLabel: 'On sale now',
    description: 'Most limited ticket release.',
    availabilityNote: 'Available while its allocation lasts.',
    price: 49,
    currency: 'USD',
    href: TICKET_URL,
  },
  {
    id: 'general-admission',
    name: 'General Admission',
    status: 'upcoming',
    statusLabel: 'Opens next',
    description: 'Limited ticket release.',
    availabilityNote: 'Available while its allocation lasts.',
    price: 69,
    currency: 'USD',
  },
  {
    id: 'final-release',
    name: 'Final Release',
    status: 'upcoming',
    statusLabel: 'Final window',
    description: 'The final ticket release.',
    availabilityNote: 'Available while its allocation lasts.',
    price: 99,
    currency: 'USD',
  },
]

/**
 * Google Event offers require public price data. Releases that are not on sale
 * yet have no CTA of their own, so their offer points at the Partiful page.
 */
export function ticketOffers() {
  return TICKET_RELEASES.filter(
    (release) => release.price !== undefined && release.currency
  ).map((release) => ({
    '@type': 'Offer',
    name: `${release.name} ticket`,
    url: release.href ?? TICKET_URL,
    price: release.price,
    priceCurrency: release.currency,
    availability:
      release.status === 'on-sale'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
    ...(release.validFrom ? { validFrom: release.validFrom } : {}),
  }))
}
