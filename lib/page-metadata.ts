import type { Metadata } from 'next'

export const FIRST_EDITION_SOCIAL_IMAGE = {
  url: '/Card.png',
  width: 2400,
  height: 1350,
  alt: 'Agentic Zero first edition',
}

const CURRENT_SOCIAL_IMAGE = {
  url: '/agentic-zero-sf-tech-week-2026.png',
  width: 5760,
  height: 3240,
  alt: 'Agentic Zero — Second Edition · SF Tech Week 2026',
}

export function pageMetadata({
  title,
  description,
  path,
  image = CURRENT_SOCIAL_IMAGE,
}: {
  title: string
  description: string
  path: string
  image?: typeof CURRENT_SOCIAL_IMAGE
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: { 'text/plain': '/llms.txt' },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'Agentic Zero',
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
