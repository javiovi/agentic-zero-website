import type { Metadata } from "next"
import { SpeakersJsonLd } from "@/components/speakers-json-ld"
import { EventJsonLd } from "@/components/event-json-ld"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { SpeakerGrid } from "@/components/speaker-grid"

export const metadata: Metadata = {
  title: "Speakers | Agentic Zero",
  description:
    "Meet the speakers for the second edition of Agentic Zero, October 7, 2026, at The Avalon in San Francisco. More speakers to be announced soon.",
  alternates: { canonical: "/speakers" },
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
