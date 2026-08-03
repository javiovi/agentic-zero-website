import { FAQS, faqAnswerText } from "@/lib/faq"

// FAQPage markup for the homepage, built from the same array the visible
// accordion renders. Nothing here restates an answer, so the schema cannot
// describe content a visitor does not see.
const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faqAnswerText(faq.answer),
    },
  })),
}

export function FaqJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
    />
  )
}
