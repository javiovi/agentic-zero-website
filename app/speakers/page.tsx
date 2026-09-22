import type { Metadata } from "next"
import { SpeakersJsonLd } from "@/components/speakers-json-ld"
import { EventJsonLd } from "@/components/event-json-ld"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { SpeakerGrid } from "@/components/speaker-grid"

const title = "Speakers | Agentic Zero"
const description =
  "Meet the seventeen announced speakers for Agentic Zero, including Manuel Beaudroit of Belo. October 7, 2026, at The Avalon during SF Tech Week."
const socialImage = {
  url: "/agentic-zero-sf-tech-week-2026.png",
  width: 5760,
  height: 3240,
  alt: "Agentic Zero — Second Edition · SF Tech Week 2026",
}

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/speakers",
    types: { "text/plain": "/llms.txt" },
  },
  openGraph: {
    title,
    description,
    url: "/speakers",
    siteName: "Agentic Zero",
    type: "website",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
}

export default function SpeakersPage() {
  return (
    <>
      <EventJsonLd />
      <SpeakersJsonLd />
      <SiteNav />
      <div className="page-container az-v2-page az-v2-inner-page">
        <main className="az-v2-speakers-page-content">
          <header className="az-v2-inner-header">
            <div className="az-v2-section-heading">
              <span>Second edition</span>
              <h1>Speakers</h1>
            </div>
            <p>More speakers to be announced soon.</p>
          </header>
          <SpeakerGrid />
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
