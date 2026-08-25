// Server-rendered structure and content for the Agentic Zero homepage.
import { Tweet } from "react-tweet"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { EventJsonLd } from "@/components/event-json-ld"
import { FaqJsonLd } from "@/components/faq-json-ld"
import { OrganizationJsonLd } from "@/components/organization-json-ld"
import { FAQS } from "@/lib/faq"
import { TICKET_URL } from "@/lib/tickets"
import { FAQItem, HeroLogo, NotifyForm } from "@/components/homepage-interactions"
import { SpeakerSilhouette } from "@/components/speaker-placeholder"
import {
  SPEAKERS_2026,
  UNANNOUNCED_SPEAKER_SLOTS,
  speakerDisplayRole,
} from "@/lib/speakers"

// Loading screen logo component (unchanged as requested)
const LoadingScreenLogoSVG = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Agentic Zero Logo Loading"
  >
    <path
      d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm0 416c-106 0-192-86-192-192S150 64 256 64s192 86 192 192-86 192-192 192z"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 96 256 96zm0 288c-70.7 0-128-57.3-128-128s57.3-128 128-128 128 57.3 128 128-57.3 128-128 128z"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M256 128c-70.7 0-128 57.3-128 128s57.3 128 128 128 128-57.3 128-128-57.3-128-128-128zm0 224c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M256 160c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 160c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M256 192c-35.3 0-64 28.7-64 64s28.7 64 64 64 64-28.7 64-64-28.7-64-64-64zm0 96c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="256" cy="256" r="16" fill="#F97316" />
    <line x1="256" y1="64" x2="256" y2="96" strokeWidth="2" />
    <line x1="256" y1="416" x2="256" y2="448" strokeWidth="2" />
    <line x1="64" y1="256" x2="96" y2="256" strokeWidth="2" />
    <line x1="416" y1="256" x2="448" y2="256" strokeWidth="2" />
    <line x1="120" y1="120" x2="140" y2="140" strokeWidth="2" />
    <line x1="372" y1="372" x2="392" y2="392" strokeWidth="2" />
    <line x1="392" y1="120" x2="372" y2="140" strokeWidth="2" />
    <line x1="140" y1="372" x2="120" y2="392" strokeWidth="2" />
    <circle cx="256" cy="64" r="4" fill="#9F98FF" />
    <circle cx="256" cy="448" r="4" fill="#9F98FF" />
    <circle cx="64" cy="256" r="4" fill="#9F98FF" />
    <circle cx="448" cy="256" r="4" fill="#9F98FF" />
    <circle cx="120" cy="120" r="4" fill="#9F98FF" />
    <circle cx="392" cy="392" r="4" fill="#9F98FF" />
    <circle cx="392" cy="120" r="4" fill="#9F98FF" />
    <circle cx="120" cy="392" r="4" fill="#9F98FF" />
  </svg>
)


export default function AgenticZeroLanding() {
  const sponsors = [
    {
      name: "Cambrian",
      logo: "/images/logos/cambrian-primary.svg",
      website: "https://www.cambrian.org/",
    },
    {
      name: "Calimero",
      logo: "/images/logos/calimero_white.png",
      website: "https://calimero.network/",
    },
    {
      name: "Solana Foundation",
      logo: "/images/logos/solana-foundation-primary.svg",
      website: "https://solana.org/",
    },
    {
      name: "Franklin Templeton",
      logo: "/images/logos/franklin-templeton-neg-0119.png",
      website: "https://www.franklintempleton.com/",
    },
    {
      name: "Sentient",
      logo: "/images/logos/sentient-product-primary.svg",
      website: "https://www.sentient.xyz/",
      className: "az-v2-logo-sentient",
    },
  ]

  const featuredSpeakers = SPEAKERS_2026
  const featuredTweets = [
    {
      name: "Zyfai",
      handle: "@Zyfai_",
      url: "https://x.com/Zyfai_/status/2001013112049459238",
      text: "Great question from @valentinmihov at @AgenticZero: how do you balance verifiable execution with privacy, so Agents stay protected from manipulation and front-running? At Zyfai, we've solved this by combining ZK proofs with ERC-8004. We call it Verifiable Agents.",
    },
    {
      name: "ETH Belgrade",
      handle: "@ethbelgrade",
      url: "https://x.com/ethbelgrade/status/1989692953690853728",
      text: "Hola! At Devconnect and interested in AI and Ethereum's future? Don't miss the Agentic Zero conference. Tickets in the comment section of the original post below. Grab yours now.",
    },
    {
      name: "Devcon",
      handle: "@EFDevcon",
      url: "https://x.com/EFDevcon/status/1991501993500897566",
      text: "\"We are trying to create some infrastructure that's gonna grow as it comes. The first cases would be about tooling and we'll move on to automation.\" A note from the ERC-8004 panel at AGENTIC Zero.",
    },
    {
      name: "ancestral_alien",
      handle: "@ancestral_alien",
      url: "https://x.com/ancestral_alien/status/1991553478012072049",
      text: "Builders, researchers, and AI x crypto people came together for a first edition centered on agentic systems, verification, and open coordination.",
    },
    {
      name: "Locastic",
      handle: "@Locastic",
      url: "https://x.com/Locastic/status/1992933400827564165",
      text: "A packed room for conversations at the edge of AI, Ethereum, infrastructure, and what agents need from open networks.",
    },
    {
      name: "Lazar Velev",
      handle: "@lvelev",
      url: "https://x.com/lvelev/status/1991507819091435814",
      text: "Agentic Zero brought together the people thinking about how AI systems will transact, coordinate, and prove what they do.",
    },
    {
      name: "Sam Green",
      handle: "@0xsamgreen",
      url: "https://x.com/0xsamgreen/status/1991621809943507139",
      text: "The first edition made the agent layer feel concrete: standards, tooling, trust, privacy, and infrastructure in one room.",
    },
    {
      name: "defirmware",
      handle: "@defirmware",
      url: "https://x.com/defirmware/status/1991555213476655554",
      text: "A first edition focused on where agentic systems meet verifiable execution, autonomous infrastructure, and Ethereum.",
    },
    {
      name: "Aura",
      handle: "@heyaura",
      url: "https://x.com/heyaura/status/1991521309734629700",
      text: "",
    },
    {
      name: "Allora Network",
      handle: "@AlloraNetwork",
      url: "https://x.com/AlloraNetwork/status/1991879327701680405",
      text: "",
    },
    {
      name: "maxminted",
      handle: "@maxminted",
      url: "https://x.com/maxminted/status/1991645106299105601",
      text: "Agentic Zero put AI agents, crypto rails, and the next coordination layer into one live conversation.",
    },
    {
      name: "Certora",
      handle: "@Certora",
      url: "https://x.com/Certora/status/1991600240286425153",
      text: "Security, verification, and formal reasoning were part of the first edition's core discussion around autonomous systems.",
    },
    {
      name: "ox_shaman",
      handle: "@ox_shaman",
      url: "https://x.com/ox_shaman/status/1980601002332954641",
      text: "Agentic Zero showed up as a meeting point for builders working on the trust layer for AI.",
    },
    {
      name: "Derrek",
      handle: "@thederrek",
      url: "https://x.com/thederrek/status/1991574744391639365",
      text: "Takeaways from a day where AI agents, crypto primitives, and open infrastructure were discussed as one stack.",
    },
    {
      name: "Allora Network",
      handle: "@AlloraNetwork",
      url: "https://x.com/AlloraNetwork/status/1992244718076567842",
      text: "Agentic Zero gathered people building around intelligence networks, agent systems, and decentralized coordination.",
    },
    {
      name: "Lis",
      handle: "@____Lis__",
      url: "https://x.com/____Lis__/status/1991852447246016591",
      text: "A first edition full of conversations about how agents will need open infrastructure to act in the world.",
    },
    {
      name: "DIN",
      handle: "@DINBuild",
      url: "https://x.com/DINBuild/status/1991844286665839003",
      text: "Infrastructure for the agent layer was a recurring theme across the first Agentic Zero edition.",
    },
    {
      name: "agentic zero",
      handle: "@AgenticZero",
      url: "https://x.com/AgenticZero/status/1992677341567602762",
      text: "",
    },
    {
      name: "Devcon",
      handle: "@EFDevcon",
      url: "https://x.com/EFDevcon/status/1991504818003910790",
      text: "",
    },
  ]

  return (
    <>
      <EventJsonLd />
      <FaqJsonLd />
      <OrganizationJsonLd />
      <div className="page-container az-v2-page fade-in-site">
        <SiteNav />

        <header id="hero" className="hero az-v2-viewport">
          <div className="hero-background">
            <div className="hero-gradient"></div>
          </div>

          <div className="hero-content">
            <div className="hero-layout">
              <div className="hero-text">
                <div className="hero-badge-container">
                  <span className="hero-badge">
                    <span className="hero-badge-full">Second edition · SF Tech Week 2026</span>
                    <span className="hero-badge-short">SF Tech Week 2026</span>
                  </span>
                </div>
                <h1 className="hero-title">
                  <span className="title-main">Agentic</span>
                  {" "}
                  <span className="title-accent">Zero</span>
                </h1>
                <p className="hero-subtitle hero-subtitle-full">
                  Agents are already transacting, but today's payment rails were not built for them. Agentic Zero is where agentic finance meets real markets.
                </p>
                <p className="hero-subtitle hero-subtitle-short">
                  Agents are already transacting, but today's payment rails were not built for them. Agentic Zero is where agentic finance meets real markets.
                </p>
                <div className="az-v2-hero-ticket-actions">
                  <a
                    href={TICKET_URL}
                    className="az-v2-inline-cta az-v2-hero-ticket-cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GET TICKETS
                  </a>
                  <a href="/tickets" className="az-v2-hero-ticket-details">
                    Ticket details
                  </a>
                </div>
              </div>
              <HeroLogo />
            </div>

            <div className="az-v2-sponsor-marquee" aria-label="2026 supported by">
              <div className="az-v2-marquee-label">2026 supported by</div>
              <div className="az-v2-marquee-window">
                <div className="az-v2-marquee-track">
                  {[0, 1, 2].map((groupIndex) => (
                    <div
                      className="az-v2-marquee-group"
                      aria-hidden={groupIndex > 0 ? true : undefined}
                      key={groupIndex}
                    >
                      {sponsors.map((sponsor) => (
                        <a
                          className="az-v2-marquee-logo"
                          href={sponsor.website}
                          target="_blank"
                          rel="noreferrer"
                          tabIndex={groupIndex > 0 ? -1 : undefined}
                          key={`${groupIndex}-${sponsor.name}`}
                          aria-label={`Visit ${sponsor.name}`}
                        >
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className={sponsor.className}
                            loading="eager"
                          />
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section id="about" className="az-v2-viewport az-v2-about-section">
          <div className="az-v2-frame">
            <div className="az-v2-description-card">
              <h2>
                Agentic Zero returns,
                <br />
                this time in San Francisco.
              </h2>
              <p>
                The summit on agentic finance lands at SF Tech Week, bringing together builders
                of the agentic stack and the institutions figuring out what comes next. Our
                previous edition in Buenos Aires drew 1,000+ attendees and 28 speakers
                across DeFi, infrastructure, and security, with 13k
                more watching live.{' '}
                <a href="/blog/what-is-agentic-zero">
                  Learn more about the second edition.
                </a>
              </p>
            </div>

            <div className="az-v2-event-announcement" aria-labelledby="event-details-title">
              <div className="az-v2-event-panel az-v2-event-panel-edition">
                <span className="az-v2-event-label">Second edition</span>
                <h3 id="event-details-title">San Francisco</h3>
              </div>

              <div className="az-v2-event-panel">
                <span className="az-v2-event-label">When</span>
                <div className="az-v2-event-panel-content">
                  <p className="az-v2-event-meta">
                    <a href="https://www.tech-week.com/" target="_blank" rel="noopener noreferrer">
                      San Francisco Tech Week by a16z
                    </a>
                  </p>
                  <time className="az-v2-event-date" dateTime="2026-10-07">
                    October 7
                    <span>2026</span>
                  </time>
                </div>
              </div>

              <div className="az-v2-event-panel">
                <span className="az-v2-event-label">Where</span>
                <a
                  className="az-v2-event-panel-content az-v2-event-location"
                  href="https://maps.app.goo.gl/qbvyVkT2y282uRNV8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <address className="az-v2-event-meta">
                    1244 Sutter Street, San Francisco
                  </address>
                  <span className="az-v2-event-venue">
                    The
                    <br />
                    Avalon <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </div>
            </div>

            <div id="speakers" className="az-v2-speaker-section">
              <div className="az-v2-section-heading">
                <span>Second edition</span>
                <h3>Speakers</h3>
              </div>
              <div className="az-v2-speaker-rail" aria-label="Speakers at Agentic Zero 2026">
                {featuredSpeakers.map((speaker) => (
                  <a
                    className="az-v2-speaker-card"
                    href={speaker.profileUrl}
                    key={speaker.slug}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${speaker.name} on X`}
                  >
                    <img src={speaker.image} alt={speaker.alt} loading="lazy" />
                    <div>
                      <h4>{speaker.name}</h4>
                      <p>{speakerDisplayRole(speaker)}</p>
                    </div>
                  </a>
                ))}

                {Array.from({ length: UNANNOUNCED_SPEAKER_SLOTS }).map((_, index) => (
                  <div
                    className="az-v2-speaker-card az-v2-speaker-card-pending"
                    key={`pending-${index}`}
                  >
                    <SpeakerSilhouette className="az-v2-speaker-silhouette" />
                    <div>
                      <h4>To be announced</h4>
                      <p>Coming soon</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="az-v2-speaker-rail-link">
                <span>More speakers will be announced soon</span>
              </p>
            </div>
          </div>
        </section>

        <section id="tech-week" className="az-v2-viewport az-v2-tech-week-section">
          <div className="az-v2-frame">
            <div className="az-v2-section-heading az-v2-section-heading-center">
              <h2>Agentic Zero in Social Media</h2>
              <p className="az-v2-section-subtitle">
                1.8k+ registrations, 13k+ livestream views, 98k+ social media views
              </p>
            </div>
            <div className="az-v2-tweet-mobile dark" data-theme="dark">
              <Tweet id="1991480192737366497" apiUrl="/api/tweet/1991480192737366497" />
            </div>
            <div className="az-v2-tweet-rail" aria-label="Agentic Zero in social media">
              {Array.from({ length: Math.ceil(featuredTweets.length / 2) }, (_, i) =>
                featuredTweets.slice(i * 2, i * 2 + 2)
              ).map((pair, i) => (
                <div className="az-v2-tweet-col" key={i}>
                  {pair.map((tweet) => (
                    <div className="az-v2-tweet-embed dark" data-theme="dark" key={tweet.url}>
                      <Tweet
                        id={tweet.url.split('/status/')[1]}
                        apiUrl={`/api/tweet/${tweet.url.split('/status/')[1]}`}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="notify" className="az-v2-notify-section">
          <div className="az-v2-notify-frame">
            <div className="az-v2-description-card">
              <h2>Stay updated on Agentic Zero</h2>
              <NotifyForm />
            </div>
          </div>
        </section>

        <section id="faqs" className="az-v2-viewport faqs-section az-v2-faq-section">
          <div className="container az-v2-faq-container">
            <div className="faqs-content">
              <div className="az-v2-section-heading az-v2-section-heading-center">
                <h2>
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="faqs-list">
                {FAQS.map((faq) => (
                  <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  )
}
