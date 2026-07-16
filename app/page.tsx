"use client"

// Main landing page component for Agentic Zero conference
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Tweet } from "react-tweet"

// Custom hook for intersection observer
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [options])

  return [ref, isIntersecting] as const
}

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


// FAQ Item Component with Toggle
function FAQItem({ question, answer }: { question: string; answer: string | React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`faq-item ${isOpen ? 'faq-open' : ''}`}>
      <button
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <div className="faq-icon">
          <span className="faq-icon-horizontal"></span>
          <span className="faq-icon-vertical"></span>
        </div>
      </button>
      <div className="faq-answer-wrapper">
        <div className="faq-answer">
          {typeof answer === 'string' ? <p>{answer}</p> : answer}
        </div>
      </div>
    </div>
  )
}

// Email capture form (provider wiring pending; posts to /api/subscribe)
function NotifyForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const honeypotRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error")
      return
    }
    setStatus("loading")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company: honeypotRef.current?.value ?? "" }),
      })
      setStatus(res.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return <p className="az-v2-notify-success">You're on the list. We'll email you when tickets go live.</p>
  }

  return (
    <form className="az-v2-notify-form" onSubmit={handleSubmit}>
      <input
        ref={honeypotRef}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (status === "error") setStatus("idle")
        }}
        placeholder="your@mail.com"
        aria-label="Email address"
        required
      />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "..." : "Notify me"}
      </button>
      {status === "error" && <p className="az-v2-notify-error">Please enter a valid email.</p>}
    </form>
  )
}

// Floating Navigation Component
function FloatingNav() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isHidden, setIsHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'tech-week', 'notify', 'faqs']
      const scrollPosition = window.scrollY + 200

      const badge = document.querySelector('.hero-badge')
      if (badge) {
        setIsHidden(badge.getBoundingClientRect().top <= 120)
      } else {
        setIsHidden(window.scrollY > 200)
      }

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <nav className={`nav-container ${isHidden ? 'nav-hidden' : ''}`}>
      <div className="nav-pill">
        <a href="/" className="nav-link">
          Home
        </a>

        <button
          className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
          onClick={() => scrollToSection('about')}
        >
          About
        </button>

        <div className="nav-links-desktop">
          <button
            className={`nav-link nav-last-edition ${activeSection === 'tech-week' ? 'active' : ''}`}
            onClick={() => scrollToSection('tech-week')}
          >
            Last Edition
          </button>
          <button
            className={`nav-link ${activeSection === 'faqs' ? 'active' : ''}`}
            onClick={() => scrollToSection('faqs')}
          >
            FAQs
          </button>
          <button
            className={`nav-link nav-tickets ${activeSection === 'notify' ? 'active' : ''}`}
            onClick={() => scrollToSection('notify')}
          >
            Tickets
          </button>
        </div>
      </div>

      <button
        className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
        aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {menuOpen && (
        <div className="nav-mobile-menu">
          <button className="nav-link" onClick={() => scrollToSection('hero')}>
            Home
          </button>
          <button
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => scrollToSection('about')}
          >
            About
          </button>
          <button
            className={`nav-link ${activeSection === 'faqs' ? 'active' : ''}`}
            onClick={() => scrollToSection('faqs')}
          >
            FAQs
          </button>
          <button
            className={`nav-link nav-tickets ${activeSection === 'notify' ? 'active' : ''}`}
            onClick={() => scrollToSection('notify')}
          >
            Tickets
          </button>
        </div>
      )}
    </nav>
  )
}

export default function AgenticZeroLanding() {
  const [heroRef, heroVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [logoHidden, setLogoHidden] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const badge = document.querySelector('.hero-badge')
      if (badge) {
        setLogoHidden(badge.getBoundingClientRect().top <= 64)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const speakers = [
    {
      name: "Nader Dabit",
      role: "Cognition, prev. Eigen Labs",
      image: "/images/speakers/Nader.jpg",
      link: "https://x.com/dabit3",
    },
    {
      name: "Sam Green",
      role: "Founder & CEO, Cambrian Network",
      image: "/images/speakers/sam.jpg",
      link: "https://x.com/0xsamgreen",
    },
    {
      name: "Ken Ng",
      role: "Head of Research & Co-Founder, Uniswap Foundation",
      image: "/images/speakers/Ken.jpg",
      link: "https://x.com/nkennethk",
    },
    {
      name: "Marco De Rossi",
      role: "AI Lead, MetaMask",
      image: "/images/speakers/Marco-de-Rossi.jpg",
      link: "https://x.com/marco_derossi",
    },
    {
      name: "Shaw Walters",
      role: "Founder, Eliza Labs",
      image: "/images/speakers/shaw.jpg",
      link: "",
    },
    {
      name: "Nicolás Montone",
      role: "Software Engineer, Vercel",
      image: "/images/speakers/nicolas.jpeg",
      link: "https://x.com/montonenico",
    },
    {
      name: "E. G.",
      role: "Co-founder, Infura & DIN (Consensys)",
      image: "/images/speakers/eg.jpg",
      link: "https://x.com/egalano",
    },
    {
      name: "Juan Irungaray",
      role: "Google Cloud Architect",
      image: "/images/speakers/juan.jpg",
      link: "https://x.com/jirungaray",
    },
    {
      name: "Nick Emmons",
      role: "Founder & CEO, Allora Labs",
      image: "/images/speakers/nick-allora.jpg",
      link: "https://x.com/nickemmons",
    },
    {
      name: "Gauthier Vila",
      role: "Core Contributor & Founder, ZyFAI",
      image: "/images/speakers/gauthier.jpg",
      link: "https://x.com/goatv_bk",
    },
    {
      name: "Stefano Bury",
      role: "Head of US, Virtuals Protocol",
      image: "/images/speakers/stefano.jpg",
      link: "https://x.com/0xbury",
    },
    {
      name: "Renç Korzay",
      role: "CEO, Giza",
      image: "/images/speakers/Renc.jpg",
      link: "https://x.com/renckorzay",
    },
    {
      name: "Jessy",
      role: "Fast, prev. Ethereum Foundation dAI",
      image: "/images/speakers/jessy-eth.jpg",
      link: "https://x.com/13yearoldvc",
    },
    {
      name: "Mooly Sagiv",
      role: "Chief Scientist, Certora",
      image: "/images/speakers/mooly.jpg",
      link: "https://x.com/SagivMooly",
    },
    {
      name: "Rahul Kothari",
      role: "Ethereum Foundation, prev. Aztec",
      image: "/images/speakers/Rahul_Kothari_AZTEC.jpg",
      link: "https://x.com/omw_to_the_moon",
    },
    {
      name: "Valentin Mihov",
      role: "Co-founder, Daedalus Angels & Finexify",
      image: "/images/speakers/valentin.jpg",
      link: "https://x.com/valentinmihov",
    },
    {
      name: "Davide Crapis",
      role: "AI Lead, Ethereum Foundation (dAI Team)",
      image: "/images/speakers/davide.jpg",
      link: "https://x.com/DavideCrapis",
    },
    {
      name: "Artem Kotelskiy",
      role: "Head of Blockchain Research, cyber•Fund",
      image: "/images/speakers/artem.jpg",
      link: "https://x.com/artofkot",
    },
    {
      name: "Shafu",
      role: "Smart Contract Engineer, Merit Systems",
      image: "/images/speakers/sharif.jpg",
      link: "https://x.com/shafu0x",
    },
    {
      name: "Lukasz Stoczynski",
      role: "Head of GTM, Mimic",
      image: "/images/speakers/Lukaz.jpg",
      link: "http://x.com/stoczek_eth",
    },
    {
      name: "Chris Wessels",
      role: "Founder, GraphOps & Summerstone",
      image: "/images/speakers/chris.jpg",
      link: "https://x.com/undefinedza",
    },
    {
      name: "Sandi Fatic",
      role: "CEO, Calimero Network",
      image: "/images/speakers/Chef Sale.jpg",
      link: "https://x.com/chefsale",
    },
    {
      name: "Ricky Esclapon",
      role: "Data Agent Architect, Cambrian Network",
      image: "/images/speakers/Ricky.jpg",
      link: "https://x.com/rickydata42",
    },
    {
      name: "Quintus Kilbourn",
      role: "Cryptoeconomics Researcher, Flashbots",
      image: "/images/speakers/quintus.jpg",
      link: "https://x.com/0xQuintus",
    },
    {
      name: "Michael Sena",
      role: "Co-founder, Recall Labs",
      image: "/images/speakers/sena-recall.jpg",
      link: "https://x.com/dataliquidity?s=21&t=DBEiT8IBjsf5cMwtjj8hpw",
    },
    {
      name: "Sumeet Chougule",
      role: "Team Lead, ChaosChain (Nethermind)",
      image: "/images/speakers/sumeet.jpg",
      link: "https://x.com/_sumeetc",
    },
    {
      name: "Simon Emanuel",
      role: "Developer Relations, ENS",
      image: "/images/speakers/simon.png",
      link: "https://x.com/schmidsi",
    },
    {
      name: "Clemens",
      role: "Head of Marketing & AI, DIN",
      image: "/images/speakers/clemens.jpg",
      link: "https://x.com/imseelemons",
    },
  ]

  const sponsors = {
    platinum: [
        {
        name: "Allora",
        logo: "/images/logos/allora-white.svg",
        website: "https://allora.network",
      },
      {
        name: "Cambrian",
        logo: "/images/logos/cambria-verde.svg",
        website: "https://www.cambrian.org/",
      },
      {
        name: "DIN",
        logo: "/images/logos/DIN_Wordmark_Light.svg",
        website: "https://www.infura.io/solutions/decentralized-infrastructure-service",
      },

    ],
    gold: [
      {
        name: "Giza",
        logo: "/images/logos/giza-logo-white.svg",
        website: "https://gizatech.xyz",
      },
       {
        name: "Recall",
        logo: "/images/logos/recall-white.svg",
        website: "https://recall.network",
      },
      {
        name: "Zyfai",
        logo: "/images/logos/zyfai-white.svg",
        website: "https://www.zyf.ai/",
      },
      {
        name: "AdEx",
        logo: "/images/logos/AdEx.svg",
        website: "https://x.com/AdEx_Network",
      },
        {
        name: "CyberFund",
        logo: "/images/logos/cyber_logo_transparent_white.svg",
        website: "https://x.com/cyberfund_?s=21",
      }, 
    ],
    silver: [
       {
        name: "Mimic",
        logo: "/images/logos/mimic-white.svg",
        website: "https://mimic.fi",
      },
      {
        name: "v0",
        logo: "/images/logos/v0-white.svg",
        website: "https://v0.dev",
      },
      {
        name: "Daedalus",
        logo: "/images/logos/daedalus.svg",
        website: "https://daedalus.gg",
      },
      {
        name: "Calimero",
        logo: "/images/logos/calimero_white.png",
        website: "https://calimero.network",
      },
    ],
  }

  const allSponsors = [...sponsors.platinum, ...sponsors.gold, ...sponsors.silver]
  const sponsorLoop = [...allSponsors, ...allSponsors]
  const featuredSpeakers = speakers
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
      name: "satsbased",
      handle: "@satsbased",
      url: "https://x.com/satsbased/status/1991982776149536890",
      text: "Notes from a day of AI x crypto sessions, where agents were treated as systems that need permissionless rails.",
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
      <div className="page-container az-v2-page fade-in-site">
        <FloatingNav />

        <header ref={heroRef} id="hero" className="hero az-v2-viewport">
          <div className="hero-background">
            <div className="hero-gradient"></div>
          </div>

          <div className="hero-content">
            <div className="hero-layout">
              <div className={`hero-text ${heroVisible ? "animate-in" : ""}`}>
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
                  Agents are already transacting, but today's rails weren't built for them. This edition brings together the people building the agentic stack, the systems adapting to it, and the institutions figuring out what comes next.
                </p>
                <p className="hero-subtitle hero-subtitle-short">
                  Agents are already transacting, but today's rails weren't built for them. This edition brings together the people building the agentic stack and the systems and institutions around them.
                </p>
                <NotifyForm />
              </div>
              <div className={`hero-logo ${heroVisible ? "animate-in" : ""} ${logoHidden ? "logo-hidden" : ""}`}>
                <img src="/images/logo.svg" alt="Agentic Zero Logo" className="logo-image" />
              </div>
            </div>

            <div className="az-v2-sponsor-marquee" aria-label="2025 supported by">
              <div className="az-v2-marquee-label">2025 supported by</div>
              <div className="az-v2-marquee-window">
                <div className="az-v2-marquee-track">
                  {sponsorLoop.map((sponsor, index) => (
                    <span className="az-v2-marquee-logo" key={`${sponsor.name}-${index}`}>
                      <img src={sponsor.logo} alt={sponsor.name} loading="lazy" />
                    </span>
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
                The summit on agentic finance lands at SF Tech Week. Our previous edition in
                Buenos Aires drew 1,000+ attendees and 28 speakers
                across DeFi agents, infrastructure, verifiability, and security, with 13k
                more watching live.
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
                  <time className="az-v2-event-date" dateTime="2026-10-07">
                    October 7
                    <span>2026</span>
                  </time>
                  <p className="az-v2-event-meta">
                    <a href="https://www.tech-week.com/" target="_blank" rel="noopener noreferrer">
                      San Francisco Tech Week by a16z
                    </a>
                  </p>
                </div>
              </div>

              <div className="az-v2-event-panel">
                <span className="az-v2-event-label">Where</span>
                <div className="az-v2-event-panel-content">
                  <a
                    className="az-v2-event-venue"
                    href="https://maps.app.goo.gl/qbvyVkT2y282uRNV8"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    The Avalon <span aria-hidden="true">↗</span>
                  </a>
                  <address className="az-v2-event-meta">
                    San Francisco, California
                  </address>
                </div>
              </div>
            </div>

            <div className="az-v2-speaker-section">
              <div className="az-v2-section-heading">
                <span>First edition</span>
                <h3>Featured Speakers</h3>
              </div>
              <div className="az-v2-speaker-rail" aria-label="Featured speakers from the first edition">
                {featuredSpeakers.map((speaker) => (
                  <article className="az-v2-speaker-card" key={speaker.name}>
                    <img src={speaker.image || "/placeholder.svg"} alt={speaker.name} loading="lazy" />
                    <div>
                      <h4>{speaker.name}</h4>
                      <p>{speaker.role}</p>
                    </div>
                  </article>
                ))}
              </div>
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
              <h2>Be the first to know</h2>
              <p>
                <strong>October 7 · The Avalon · SF Tech Week</strong>
                <br />
                Tickets are coming soon. Join the list for first access and program updates.
              </p>
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
                <FAQItem
                  question="What is Agentic Zero?"
                  answer="Agentic Zero is a one-day conference about the intersection of AI, financial and payment institutions and crypto, focused on autonomous systems."
                />
                <FAQItem
                  question="When is the event happening?"
                  answer="Agentic Zero takes place on October 7 during San Francisco Tech Week."
                />
                <FAQItem
                  question="Where is the venue?"
                  answer={
                    <p>
                      Agentic Zero will be hosted at The Avalon.{' '}
                      <a
                        href="https://maps.app.goo.gl/qbvyVkT2y282uRNV8"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#f97316', textDecoration: 'underline' }}
                      >
                        See the venue on Google Maps
                      </a>
                      .
                    </p>
                  }
                />
                <FAQItem
                  question="How can I get tickets?"
                  answer={
                    <p>
                      Tickets will be on sale very soon. Sign up with your email to be notified{' '}
                      <a
                        href="#notify"
                        style={{ color: '#f97316', textDecoration: 'underline' }}
                      >
                        here
                      </a>
                      .
                    </p>
                  }
                />
                <FAQItem
                  question="Who should attend?"
                  answer="Founders, AI builders, researchers, investors interested in the intersection between AI and crypto."
                />
                <FAQItem
                  question="How can I become a sponsor?"
                  answer={
                    <p>
                      We welcome sponsors who want to back Agentic Zero's mission of building open, permissionless infrastructure for AI. To discuss sponsorship opportunities, please{' '}
                      <a 
                        href="mailto:contact@agenticzero.xyz?subject=Sponsorship%20Inquiry%20-%20AGENTIC%20Zero"
                        style={{ color: '#f97316', textDecoration: 'underline' }}
                      >
                        email us
                      </a>{' '}
                      with your company details and sponsorship interests.
                    </p>
                  }
                />
                <FAQItem 
                  question="Will talks be recorded?"
                  answer="Yes, all main stage talks will be recorded and published on our YouTube channel after the event."
                />
              </div>
            </div>
          </div>
        </section>

        <footer className="az-v2-footer">
          <div className="az-v2-footer-inner">
            <div className="az-v2-footer-top">
              <div className="az-v2-footer-brand">
                <h2>
                  <span>Agentic</span>{" "}
                  <span>Zero</span>
                </h2>
              </div>

              <div className="az-v2-footer-follow">
                <span>Follow Our Socials</span>
                <div className="az-v2-footer-social" aria-label="Social links">
                <a href="https://x.com/AgenticZero" target="_blank" rel="noopener noreferrer" aria-label="Agentic Zero on X">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true">
                    <path d="M453.2 112H523.8L369.6 288.2L551 528H409L297.7 382.6L170.5 528H99.8L264.7 339.5L90.8 112H236.4L336.9 244.9L453.2 112ZM428.4 485.8H467.5L215.1 152H173.1L428.4 485.8Z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/agentic-zero-ai" target="_blank" rel="noopener noreferrer" aria-label="Agentic Zero on LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04c-1.85 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85c3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12a2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V9H7.1v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                  </svg>
                </a>
                <a href="https://www.youtube.com/@agenticzeroxyz" target="_blank" rel="noopener noreferrer" aria-label="Agentic Zero on YouTube">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
                  </svg>
                </a>
              </div>
              </div>
            </div>

            <p className="az-v2-footer-questions">
              Questions? Email us at <a href="mailto:contact@agenticzero.xyz">contact@agenticzero.xyz</a>
            </p>
          </div>
          <p className="az-v2-footer-bottom">2026 Agentic Zero. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}
