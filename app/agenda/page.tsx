import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Agenda | Agentic Zero",
  description:
    "The programme for the second edition of Agentic Zero, October 7 2026 at The Avalon in San Francisco, during SF Tech Week by a16z.",
  alternates: { canonical: "/agenda" },
}

function AgendaNav() {
  return (
    <nav className="nav-container">
      <div className="nav-pill">
        <a href="/" className="nav-link">
          Home
        </a>

        <a href="/agenda" className="nav-link nav-agenda active nav-mobile-only">
          Agenda
        </a>

        <a href="/#notify" className="nav-cta nav-mobile-only">
          Get Tickets
        </a>

        <div className="nav-links-desktop">
          <a href="/#about" className="nav-link">
            About
          </a>
          <a href="/#faqs" className="nav-link">
            FAQs
          </a>
          <a href="/agenda" className="nav-link nav-agenda active">
            Agenda
          </a>

          <a href="/#notify" className="nav-cta">
            Get Tickets
          </a>
        </div>
      </div>
    </nav>
  )
}

export default function AgendaPage() {
  return (
    <>
      <AgendaNav />
      <div className="main-content">
        <div className="agenda-pending">
          <h1 className="agenda-pending-title">Agenda</h1>

          <p className="agenda-pending-lead">
            The programme for our second edition is coming soon. The event is{" "}
            <time dateTime="2026-10-07">October 7, 2026</time>, at The Avalon on Sutter Street, San
            Francisco, during SF Tech Week by a16z.
          </p>

          <div className="agenda-pending-notify">
            <h2>Be the first to know</h2>
            <p>Tickets are coming soon. Join the list for first access and program updates.</p>
            <a href="/#notify" className="agenda-pending-cta">
              Join the list
            </a>
          </div>

          <div className="agenda-pending-block">
            <h2>What this edition is about</h2>
            <p>
              Agents are already transacting, but today&apos;s payment rails were not built for
              them. Agentic Zero is where agentic finance meets real markets, bringing together
              builders of the agentic stack, the systems adapting to it, and the institutions
              figuring out what comes next.
            </p>
          </div>

          <div className="agenda-pending-block">
            <h2>Looking for the last programme?</h2>
            <p>
              <a href="/first-edition/agenda" className="agenda-pending-link">
                First Edition Agenda
              </a>
            </p>
            <p className="agenda-pending-meta">Buenos Aires, November 2025 · 28 speakers</p>
          </div>
        </div>
        <SiteFooter />
      </div>
    </>
  )
}
