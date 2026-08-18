import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "What is agentic finance? | Agentic Zero",
  description:
    "In agentic finance, AI agents hold or direct value, make financial decisions, and execute transactions under defined permissions.",
  alternates: { canonical: "/what-is-agentic-finance" },
}

export default function AgenticFinancePage() {
  return (
    <>
      <SiteNav />
      <div className="page-container az-v2-page az-v2-inner-page">
        <article className="az-v2-inner-header az-v2-prose">
          <div className="az-v2-section-heading">
            <h1>What is agentic finance?</h1>
          </div>

          {/* Written to be extractable on its own: no pronouns pointing outside
              this paragraph, no dependence on the heading above it. */}
          <p>
            In agentic finance, AI agents hold or direct value, make financial decisions, and
            execute transactions under defined permissions. Agentic finance spans
            payment and authorisation protocols, identity and trust standards, agent wallets and
            custody, settlement infrastructure, and the guardrails governing what an agent may do.
          </p>

          <h2>Why this is happening now</h2>

          <p>
            After two years of agents as collaborators, the volume of decisions has outgrown the
            current infrastructure. An agent acting without a human in the loop needs a way to pay,
            to be identified, and to be held accountable.
          </p>

          <h2>What we are focused on</h2>

          <p>
            The second edition of Agentic Zero shifts towards institutions and focuses on four
            questions within agentic finance.
          </p>

          <h3>Next-generation financial rails</h3>
          <p>
            Financial infrastructure for machines as a consumer: stablecoins alongside traditional
            rails, agent wallets, and standards that let agents transact.
          </p>

          <h3>Real-world assets (RWAs) and tokenisation</h3>
          <p>
            What institutions need in order to hold these assets on programmable rails, and what
            changes when software can act on them.
          </p>

          <h3>Risk and compliance</h3>
          <p>
            How regulation and institutional risk management apply when an agent acts: who is
            accountable, what is auditable, and what the rules can enable.
          </p>

          <h3>Research and security</h3>
          <p>
            How to prove what an agent did, and how to decide whether it should be trusted with
            money. Formal verification, trusted execution environments, and evaluation methods.
          </p>

          <h2>Where we have been</h2>

          <p>
            The first edition of Agentic Zero took place in Buenos Aires in{" "}
            <time dateTime="2025-11">November 2025</time> and brought together 28 speakers on agent
            identity, discovery, trust, and payment standards. Speakers came from the Ethereum
            Foundation, Uniswap Foundation, MetaMask, Flashbots,
            Google Cloud, and Vercel.
          </p>

          <p>Early Bird tickets for the second edition are live now.</p>

          <a href="/tickets" className="az-v2-inline-cta">
            View tickets
          </a>
        </article>
        <SiteFooter />
      </div>
    </>
  )
}
