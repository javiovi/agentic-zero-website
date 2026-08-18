import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Agenda | Agentic Zero",
  description:
    "The programme for the second edition of Agentic Zero, October 7 2026 at The Avalon in San Francisco, during SF Tech Week by a16z.",
  alternates: { canonical: "/agenda" },
}

export default function AgendaPage() {
  return (
    <>
      <SiteNav />
      <div className="page-container az-v2-page az-v2-inner-page">
        <header className="az-v2-inner-header">
          <div className="az-v2-section-heading">
            <span>Second edition</span>
            <h2>Agenda</h2>
          </div>
          <p>
            The programme for our second edition is coming soon. The event is{" "}
            <time dateTime="2026-10-07">October 7, 2026</time>, at The Avalon on Sutter Street, San
            Francisco, during SF Tech Week by a16z.
          </p>
          <p>Early Bird tickets are live now, with Advance and General to follow.</p>
          <a href="/tickets" className="az-v2-inline-cta">
            VIEW TICKETS
          </a>
        </header>
        <SiteFooter />
      </div>
    </>
  )
}
