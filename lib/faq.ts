// Single source of truth for the homepage FAQ.
//
// The visible accordion and the FAQPage JSON-LD both read this array, so an
// edit to an answer changes both at once and the two cannot drift apart.
// Marking up content that differs from what a visitor sees is a policy
// violation, which is why the schema is never hand-written alongside it.
//
// Answers are segments rather than plain strings so a link can be rendered as
// an anchor in the accordion and as its own text in the schema, with no second
// copy of the wording anywhere.

import { TICKET_URL } from "@/lib/tickets"

export type FaqAnswerSegment = string | { text: string; href: string; external?: boolean }

export interface Faq {
  question: string
  answer: FaqAnswerSegment[]
}

export const FAQS: Faq[] = [
  {
    question: "What is Agentic Zero?",
    answer: [
      "Agentic Zero is a one-day summit on ",
      { text: "agentic finance", href: "/what-is-agentic-finance" },
      ". It brings together the people building AI agents, the payment and financial infrastructure they run on, and the institutions adapting to them.",
    ],
  },
  {
    question: "When is the event happening?",
    answer: [
      "Agentic Zero takes place on 7 October 2026 at The Avalon in San Francisco, during SF Tech Week by a16z.",
    ],
  },
  {
    question: "Where is the venue?",
    answer: [
      "Agentic Zero will be hosted at The Avalon. ",
      {
        text: "See the venue on Google Maps",
        href: "https://maps.app.goo.gl/qbvyVkT2y282uRNV8",
        external: true,
      },
      ".",
    ],
  },
  {
    question: "How can I get tickets?",
    answer: [
      "Early Bird tickets are on sale now through the ",
      { text: "official Partiful page", href: TICKET_URL, external: true },
      ". See the ",
      { text: "ticket details", href: "/tickets" },
      ".",
    ],
  },
  {
    question: "Who should attend?",
    answer: [
      "Founders and AI builders, agent infrastructure teams, financial and payment infrastructure teams, researchers, institutional operators, and investors following agentic finance.",
    ],
  },
  {
    question: "How can I become a sponsor?",
    answer: [
      "We welcome sponsors who want to back Agentic Zero's mission of pushing forward discussions at the intersection of AI and finance. To join our 2026 sponsors, including Solana Foundation, ",
      {
        text: "email us",
        href: "mailto:contact@agenticzero.xyz?subject=Sponsorship%20Inquiry%20-%20AGENTIC%20Zero",
      },
      " with your sponsorship interests.",
    ],
  },
  {
    question: "Will talks be recorded?",
    answer: [
      "Yes, all main stage talks will be recorded and published on our YouTube channel after the event.",
    ],
  },
]

// Plain-text form of an answer, for the schema. Drops the anchors and keeps
// every word, collapsing whitespace the way a browser does when rendering.
export function faqAnswerText(answer: FaqAnswerSegment[]): string {
  return answer
    .map((segment) => (typeof segment === "string" ? segment : segment.text))
    .join("")
    .replace(/\s+/g, " ")
    .trim()
}
