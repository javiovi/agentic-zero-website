import type { Metadata } from 'next'
import { IBM_Plex_Sans, Share_Tech_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import './apple-improvements.css'
import './faqs.css'
import './navigation.css'
import './footer-redesign.css'
import './agenda.css'

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

export const metadata: Metadata = {
  // TODO: set to the production domain so the og:image resolves to an absolute URL
  metadataBase: new URL('https://agenticzero.xyz'),
  title: 'Agentic Zero',
  description: 'The one-day summit on agentic systems returns for its second edition during SF Tech Week 2026. The people building the agentic stack, in one room.',
  generator: 'Agentic Zero',
  icons: {
    icon: '/images/logo.svg',
    shortcut: '/images/logo.svg',
    apple: '/images/logo.svg',
  },
  openGraph: {
    title: 'Agentic Zero',
    description: 'The one-day summit on agentic systems returns for its second edition during SF Tech Week 2026. The people building the agentic stack, in one room.',
    images: ['/Card.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentic Zero',
    description: 'The one-day summit on agentic systems returns for its second edition during SF Tech Week 2026. The people building the agentic stack, in one room.',
    images: ['/Card.png'],
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
