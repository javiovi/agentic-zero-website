import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import './apple-improvements.css'
import './why-icons.css'
import './faqs.css'
import './navigation.css'
import './location-redesign.css'
import './footer-redesign.css'
import './agenda.css'

export const metadata: Metadata = {
  title: 'AGENTIC Zero',
  description: 'Where AI meets web3. A community-owned event bringing together visionaries shaping the decentralized future.',
  generator: 'AGENTIC Zero',
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
