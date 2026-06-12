import type { Metadata } from 'next'
import { IBM_Plex_Sans, Share_Tech_Mono } from 'next/font/google'
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
  title: 'Agentic Zero',
  description: 'Where AI meets crypto. A community-owned event bringing together visionaries shaping the decentralized future.',
  generator: 'Agentic Zero',
  icons: {
    icon: '/images/logo.svg',
    shortcut: '/images/logo.svg',
    apple: '/images/logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${shareTechMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
