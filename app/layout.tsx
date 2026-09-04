import type { Metadata } from 'next'
import { IBM_Plex_Sans, Share_Tech_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import './apple-improvements.css'
import './faqs.css'
import './navigation.css'
import './footer-redesign.css'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-sans',
})

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
})

const siteDescription = 'The summit on agentic finance returns for its second edition on October 7 during SF Tech Week 2026. The people building the agentic stack, in one room.'
const socialCard = {
  url: '/agentic-zero-sf-tech-week-2026-sponsors.png',
  width: 5760,
  height: 3240,
  alt: 'Agentic Zero — Second Edition · SF Tech Week 2026, supported by Solana Foundation, Calimero, Cambrian Network, and QuickNode',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://agenticzero.xyz'),
  title: 'Agentic Zero',
  description: siteDescription,
  generator: 'Agentic Zero',
  alternates: {
    canonical: '/',
    types: {
      'text/plain': '/llms.txt',
    },
  },
  icons: {
    icon: '/images/logo.svg',
    shortcut: '/images/logo.svg',
    apple: '/images/logo.svg',
  },
  openGraph: {
    title: 'Agentic Zero',
    description: siteDescription,
    url: '/',
    siteName: 'Agentic Zero',
    images: [socialCard],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentic Zero',
    description: siteDescription,
    images: [{ url: socialCard.url, alt: socialCard.alt }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${shareTechMono.variable}`}>
      <body>
        {children}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="deee2625-4bf0-4c2d-844b-7ee29bd0db7b"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
