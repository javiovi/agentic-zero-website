"use client"

// Main landing page component for Agentic Zero conference
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Mail, Twitter, Linkedin, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

// Floating Navigation Component
function FloatingNav() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'speakers', 'location', 'faqs']
      const scrollPosition = window.scrollY + 200

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
  }

  return (
    <nav className="nav-container">
      <div className="nav-pill">
        <button
          className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
          onClick={() => scrollToSection('hero')}
        >
          Home
        </button>
        <button
          className={`nav-link ${activeSection === 'speakers' ? 'active' : ''}`}
          onClick={() => scrollToSection('speakers')}
        >
          Speakers
        </button>
        <button
          className={`nav-link ${activeSection === 'location' ? 'active' : ''}`}
          onClick={() => scrollToSection('location')}
        >
          Location
        </button>
        <button
          className={`nav-link ${activeSection === 'faqs' ? 'active' : ''}`}
          onClick={() => scrollToSection('faqs')}
        >
          FAQs
        </button>
        <a
          href="https://devconnect.org/calendar?event=agenticzero"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
        >
          Get Tickets
        </a>
      </div>
    </nav>
  )
}

export default function AgenticZeroLanding() {
  const [isLoading, setIsLoading] = useState(true)
  const [heroRef, heroVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [speakersRef, speakersVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [sponsorsRef, sponsorsVisible] = useIntersectionObserver({ threshold: 0.05 })

  useEffect(() => {
    const animationEndTime = 2500
    const fadeOutDuration = 500
    const totalLoadingTime = animationEndTime + fadeOutDuration

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, totalLoadingTime)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    console.log('Sponsors visible:', sponsorsVisible)
  }, [sponsorsVisible])

  const speakers = [
    {
      name: "Rahul Kothari",
      role: "Sr Product at Aztec",
      image: "/images/speakers/Rahul_Kothari_AZTEC.jpg",
      link: "https://x.com/omw_to_the_moon",
    },
    
     {
      name: "Nader Dabit",
      role: "Dir. of Developer Relations at Eigen Labs",
      image: "/images/speakers/Nader.jpg",
      link: "https://x.com/dabit3",
    }, 
    
    {
      name: "Ken Ng",
      role: "Head of Research & Co-Founder, Uniswap Foundation",
      image: "/images/speakers/Ken.jpg",
      link: "https://x.com/nkennethk",
    },
    {
      name: "Juan Irungaray",
      role: "Google Cloud Architect",
      image: "/images/speakers/juan.jpeg",
      link: "https://x.com/nick_emmons",
    },

      {
      name: "Nick Emmons",
      role: "Founder & CEO, Allora Labs",
      image: "/images/speakers/nick-allora.jpg",
      link: "https://www.linkedin.com/in/juanirungaray/",
    },
    
      {
      name: "Sam Green",
      role: "Founder & CEO, Cambrian Network",
      image: "/images/speakers/sam.jpg",
      link: "https://x.com/0xsamgreen",
    },
       {
      name: "Gauthier Vila",
      role: "Core Contributor & Founder, ZyFAI",
      image: "/images/speakers/gauthier.jpg",
      link: "https://x.com/goatv_bk",
    },
        {
      name: "Renç Korzay",
      role: "CEO, Giza",
      image: "/images/speakers/Renc.jpg",
      link: "https://x.com/renckorzay",
    },
         {
      name: "E. G.",
      role: "Cofounder of Infura & DIN, Consensys",
      image: "/images/speakers/eg.jpg",
      link: "https://x.com/egalano",
    },
           {
      name: "Quintus Kilbourn",
      role: "Cryptoeconomics researcher, Flashbots",
      image: "/images/speakers/quintus.jpg",
      link: "https://x.com/0xQuintus",
    },
             {
      name: "Shaw Walters",
      role: "Founder, Eliza Labs",
      image: "/images/speakers/shaw.jpg",
      link: "",
    }, 
    
             {
      name: "Mooly Sagiv",
      role: "Chief Scientist, Certora",
      image: "/images/speakers/mooly.jpg",
      link: "https://x.com/SagivMooly",
    }, 
     
    
     {
      name: "Nicolás Montone",
     role: "Software Engineer at Vercel",
     image: "/images/speakers/nicolas.jpeg",
      link: "https://x.com/montonenico",
    },
    {
      name: "Marco De Rossi",
      role: "AI Lead, MetaMask",
    image: "/images/speakers/Marco-de-Rossi.jpg",
      link: "https://x.com/marco_derossi",
   },
   {
      name: "Sharif Elfouly",
      role: "Smart Contract Engineer, Merit Systems",
    image: "/images/speakers/sharif.jpg",
      link: "https://x.com/shafu0x",
   },

     {
      name: "Sumeet Chougule",
      role: "Team Lead, ChaosChain at Nethermind",
    image: "/images/speakers/sumeet.jpg",
      link: "https://x.com/_sumeetc",
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
    ],
  }

  const partners = [
    {
      name: "ETH Daily",
      logo: "/images/logos/ethdaily_logo_bw.png",
      twitter: "https://x.com/ethdaily?s=21",
    },
    {
      name: "The Rollup",
      logo: "/images/logos/pfp_transparent.png",
      twitter: "https://x.com/therollupco?s=21",
    },
    {
      name: "O(n) Club",
      logo: "/images/logos/O(n) Club-1.svg",
      twitter: "https://x.com/theonclub?s=21",
    },
  ]

  return (
    <>
      {isLoading && (
        <div className="loading-screen">
          <LoadingScreenLogoSVG className="loading-logo-svg" />
        </div>
      )}

      <div className={`page-container ${isLoading ? "page-hidden" : "fade-in-site"}`}>
        <FloatingNav />
        
        {/* Enhanced Hero Section */}
        <header ref={heroRef} id="hero" className="hero">
          <div className="hero-background">
            <div className="hero-gradient"></div>
            <div className="hero-grid"></div>
          </div>

          <div className="hero-content">
            <div className="hero-layout">
              <div className={`hero-text ${heroVisible ? "animate-in" : ""}`}>
                <a 
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=AGENTIC+Zero+at+La+Rural&dates=20251120T130000Z/20251120T200000Z&details=Join+us+for+AGENTIC+Zero%2C+where+AI+meets+Web3.+A+full+day+event+bringing+together+visionaries+shaping+the+future.&location=La+Rural%2C+Buenos+Aires%2C+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-badge"
                  title="Add to Google Calendar"
                >
                  <span>📅</span>
                  <span>November 20th, 2025</span>
                </a>
                <h1 className="hero-title">
                  <span className="title-main">Agentic</span>
                  <span className="title-accent">Zero</span>
                </h1>
                <p className="hero-subtitle">
                  Artificial intelligence (AI) is racing ahead. Web3 already rewrote the rules of trust. Agentic Zero is a one-day AI x web3 summit focused on open, permissionless rails for agentic systems.
                </p>
                <div className="hero-actions">
                  <Button
                    className="cta-primary"
                    onClick={() => window.open("https://devconnect.org/calendar?event=agenticzero", "_blank")}
                  >
                    Get Tickets
                  </Button>
                </div>
              </div>
              <div className={`hero-logo ${heroVisible ? "animate-in" : ""}`}>
                <img src="/images/logo.svg" alt="Agentic Zero Logo" className="logo-image" />
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Why AGENTIC Zero Section */}
        <section className="why-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Why <span className="gradient-text">Agentic Zero</span>?
              </h2>
            </div>
            <div className="why-content">
              <div className="why-card">
                <div className="why-number">01</div>
                <div className="why-icon">
                  <span className="orbit-dot"></span>
                </div>
                <p className="why-text">
                  AI will soon steer value, data, and decision-making at planetary scale. If those systems sit on
                  centralized stacks, we hand the steering wheel to a handful of corporations.
                </p>
              </div>
              <div className="why-card">
                <div className="why-number">02</div>
                <div className="why-icon">
                  <div className="wave-container">
                    <span className="wave"></span>
                    <span className="wave"></span>
                    <span className="wave"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <p className="why-text">
                  Crypto gives us another route: verifiable compute, public-good data, and incentives aligned with the
                  many, not the few.
                </p>
              </div>
              <div className="why-card featured">
                <div className="why-number">03</div>
                <div className="why-icon">
                  <span className="circle-left"></span>
                  <span className="circle-right"></span>
                </div>
                <p className="why-text">
                  <strong>AGENTIC Zero is the meeting point for everyone working on the future of AI and web3.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Sponsors Section */}
        <section ref={sponsorsRef} id="sponsors" className="sponsors">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Backing Agentic Zero</h2>
            </div>

            {/* Platinum Sponsors */}
            <div className="sponsors-tier">
              <div className="sponsors-tier-grid platinum-grid">
                {sponsors.platinum.map((sponsor, index) => (
                  <a
                    key={sponsor.name}
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`sponsor-card sponsor-platinum ${sponsor.name === 'Cambrian' ? 'sponsor-cambrian' : ''} ${sponsor.name === 'DIN' ? 'sponsor-din' : ''} ${sponsorsVisible ? 'sponsor-animate' : ''}`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      loading="lazy"
                      style={{
                        height: sponsor.name === 'DIN' ? '50px' : '45px',
                        width: 'auto',
                        maxWidth: 'none',
                        maxHeight: 'none',
                        minWidth: 'auto',
                        minHeight: 'auto'
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Gold Sponsors */}
            <div className="sponsors-tier">
              <div className="sponsors-tier-grid gold-grid">
                {sponsors.gold.map((sponsor, index) => (
                  <a
                    key={sponsor.name}
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`sponsor-card sponsor-gold ${sponsor.name === 'Giza' ? 'sponsor-giza' : ''} ${sponsorsVisible ? 'sponsor-animate' : ''}`}
                    style={{ animationDelay: `${(sponsors.platinum.length + index) * 200}ms` }}
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      loading="lazy"
                      style={{
                        height: '35px',
                        width: 'auto',
                        maxWidth: 'none',
                        maxHeight: 'none',
                        minWidth: 'auto',
                        minHeight: 'auto'
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Silver Sponsors */}
            <div className="sponsors-tier">
              <div className="sponsors-tier-grid silver-grid">
                {sponsors.silver.map((sponsor, index) => (
                  <a
                    key={sponsor.name}
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`sponsor-card sponsor-silver ${sponsor.name === 'v0' ? 'sponsor-v0' : ''} ${sponsorsVisible ? 'sponsor-animate' : ''}`}
                    style={{ animationDelay: `${(sponsors.platinum.length + sponsors.gold.length + index) * 200}ms` }}
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      loading="lazy"
                      style={{
                        height: '28px',
                        width: 'auto',
                        maxWidth: 'none',
                        maxHeight: 'none',
                        minWidth: 'auto',
                        minHeight: 'auto'
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section id="partners" className="partners">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our <span className="gradient-text">Partners</span></h2>
            </div>

            <div className="partners-grid">
              {partners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-card"
                  title={`Follow ${partner.name} on X`}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    className={`partner-logo ${partner.name === "ETH Daily" ? "partner-logo-invert" : ""} ${partner.name === "O(n) Club" ? "partner-logo-large" : ""}`}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Speakers Section */}
        <section ref={speakersRef} id="speakers" className="speakers">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Meet Our <span className="gradient-text">Speakers</span>
              </h2>
            </div>

            <div className="speakers-grid">
              {speakers.map((speaker, index) => (
                <div
                  key={speaker.name}
                  className={`speaker-card ${speakersVisible ? "animate-in" : ""}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="speaker-image-container">
                    <img
                      src={speaker.image || "/placeholder.svg"}
                      alt={speaker.name}
                      loading="lazy"
                      className="speaker-image"
                      style={
                        speaker.name === "Nicolás Montone"
                          ? { transform: 'scale(1.8)', transformOrigin: 'center 95%' }
                          : speaker.name === "Nader Dabit"
                          ? { transform: 'scale(0.9)', transformOrigin: 'center 20%' }
                          : {}
                      }
                    />
                  </div>
                  <div className="speaker-info">
                    <a
                      href={speaker.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="speaker-name-link"
                    >
                      {speaker.name}
                    </a>
                    <p className="speaker-role">{speaker.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Agenda Section - COMMENTED OUT */}
        {/* <section id="agenda" className="agenda-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Event <span className="gradient-text">Agenda</span>
              </h2>
              <p className="section-subtitle">November 20th, 2025 - La Rural, Buenos Aires</p>
            </div>

            <div className="agenda-timeline">
              <div className="agenda-item">
                <div className="agenda-time">10:00 - 10:30</div>
                <div className="agenda-content">
                  <h4 className="agenda-speaker">Marco De Rossi</h4>
                  <p className="agenda-type">Panel</p>
                  <p className="agenda-title">ERC-8004 panel</p>
                  <div className="agenda-participants">
                    <span className="participant">MetaMask</span>
                    <span className="participant">Sumeet Chougule (Cha0s, Nethermind)</span>
                    <span className="participant">Davide Crapis (Ethereum Foundation)</span>
                  </div>
                  <a href="#" className="agenda-add-calendar" onClick={(e) => {
                    e.preventDefault()
                    const startTime = new Date('2025-11-20T10:00:00-03:00')
                    const endTime = new Date('2025-11-20T10:30:00-03:00')
                    const eventTitle = 'ERC-8004 panel - Agentic Zero'
                    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=Panel%20by%20Marco%20De%20Rossi&location=La%20Rural,%20Buenos%20Aires`
                    window.open(googleCalendarUrl, '_blank')
                  }}>+ Add to Calendar</a>
                </div>
              </div>

              <div className="agenda-item">
                <div className="agenda-time">10:35 - 10:55</div>
                <div className="agenda-content">
                  <h4 className="agenda-speaker">Sam Green</h4>
                  <p className="agenda-type">Keynote</p>
                  <div className="agenda-participants">
                    <span className="participant">Cambrian Network</span>
                  </div>
                  <a href="#" className="agenda-add-calendar" onClick={(e) => {
                    e.preventDefault()
                    const startTime = new Date('2025-11-20T10:35:00-03:00')
                    const endTime = new Date('2025-11-20T10:55:00-03:00')
                    const eventTitle = 'Keynote - Sam Green - Agentic Zero'
                    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=By%20Sam%20Green%20from%20Cambrian%20Network&location=La%20Rural,%20Buenos%20Aires`
                    window.open(googleCalendarUrl, '_blank')
                  }}>+ Add to Calendar</a>
                </div>
              </div>

              <div className="agenda-item">
                <div className="agenda-time">11:00 - 11:20</div>
                <div className="agenda-content">
                  <h4 className="agenda-speaker">Rahul Kothari</h4>
                  <p className="agenda-type">Session</p>
                  <p className="agenda-title">Privacy & AI</p>
                  <div className="agenda-participants">
                    <span className="participant">Aztec</span>
                  </div>
                  <a href="#" className="agenda-add-calendar" onClick={(e) => {
                    e.preventDefault()
                    const startTime = new Date('2025-11-20T11:00:00-03:00')
                    const endTime = new Date('2025-11-20T11:20:00-03:00')
                    const eventTitle = 'Privacy & AI - Rahul Kothari - Agentic Zero'
                    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=By%20Rahul%20Kothari%20from%20Aztec&location=La%20Rural,%20Buenos%20Aires`
                    window.open(googleCalendarUrl, '_blank')
                  }}>+ Add to Calendar</a>
                </div>
              </div>

              <div className="agenda-item">
                <div className="agenda-time">11:25 - 11:45</div>
                <div className="agenda-content">
                  <p className="agenda-type">Session</p>
                  <div className="agenda-participants">
                    <span className="participant">Recall</span>
                  </div>
                  <a href="#" className="agenda-add-calendar" onClick={(e) => {
                    e.preventDefault()
                    const startTime = new Date('2025-11-20T11:25:00-03:00')
                    const endTime = new Date('2025-11-20T11:45:00-03:00')
                    const eventTitle = 'Recall - Agentic Zero'
                    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=Recall%20Session&location=La%20Rural,%20Buenos%20Aires`
                    window.open(googleCalendarUrl, '_blank')
                  }}>+ Add to Calendar</a>
                </div>
              </div>

              <div className="agenda-item">
                <div className="agenda-time">11:50 - 12:10</div>
                <div className="agenda-content">
                  <h4 className="agenda-speaker">Nick Emmons</h4>
                  <p className="agenda-type">Keynote</p>
                  <div className="agenda-participants">
                    <span className="participant">Allora Network</span>
                  </div>
                  <a href="#" className="agenda-add-calendar" onClick={(e) => {
                    e.preventDefault()
                    const startTime = new Date('2025-11-20T11:50:00-03:00')
                    const endTime = new Date('2025-11-20T12:10:00-03:00')
                    const eventTitle = 'Keynote - Nick Emmons - Agentic Zero'
                    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=By%20Nick%20Emmons%20from%20Allora%20Network&location=La%20Rural,%20Buenos%20Aires`
                    window.open(googleCalendarUrl, '_blank')
                  }}>+ Add to Calendar</a>
                </div>
              </div>

              <div className="agenda-item">
                <div className="agenda-time">12:15 - 12:35</div>
                <div className="agenda-content">
                  <h4 className="agenda-speaker">Infura</h4>
                  <p className="agenda-type">Keynote</p>
                  <div className="agenda-participants">
                    <span className="participant">Infura</span>
                  </div>
                  <a href="#" className="agenda-add-calendar" onClick={(e) => {
                    e.preventDefault()
                    const startTime = new Date('2025-11-20T12:15:00-03:00')
                    const endTime = new Date('2025-11-20T12:35:00-03:00')
                    const eventTitle = 'Keynote - Infura - Agentic Zero'
                    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=Infura%20Keynote&location=La%20Rural,%20Buenos%20Aires`
                    window.open(googleCalendarUrl, '_blank')
                  }}>+ Add to Calendar</a>
                </div>
              </div>

              <div className="agenda-item">
                <div className="agenda-time">12:40 - 13:00</div>
                <div className="agenda-content">
                  <h4 className="agenda-speaker">Nicolás Montone</h4>
                  <p className="agenda-type">Panel</p>
                  <p className="agenda-title">Beyond Crypto: Web2, Cloud, Web3 & AI</p>
                  <div className="agenda-participants">
                    <span className="participant">Vercel (V0)</span>
                    <span className="participant">Romain Huet (OpenAI)</span>
                    <span className="participant">Juan Irungaray (Google)</span>
                    <span className="participant">Nader Dabit (EigenCloud)</span>
                  </div>
                  <a href="#" className="agenda-add-calendar" onClick={(e) => {
                    e.preventDefault()
                    const startTime = new Date('2025-11-20T12:40:00-03:00')
                    const endTime = new Date('2025-11-20T13:00:00-03:00')
                    const eventTitle = 'Panel: Beyond Crypto - Nicolás Montone - Agentic Zero'
                    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=Panel%20with%20OpenAI,%20Google,%20Vercel,%20Eigen&location=La%20Rural,%20Buenos%20Aires`
                    window.open(googleCalendarUrl, '_blank')
                  }}>+ Add to Calendar</a>
                </div>
              </div>

              <div className="agenda-break">
                <div className="agenda-time">13:00 - 14:00</div>
                <div className="agenda-content">
                  <p className="agenda-type">Lunch Break</p>
                </div>
              </div>

              <div className="agenda-item">
                <div className="agenda-time">14:00 - 14:20</div>
                <div className="agenda-content">
                  <h4 className="agenda-speaker">Renç</h4>
                  <p className="agenda-type">Keynote</p>
                  <div className="agenda-participants">
                    <span className="participant">Giza</span>
                  </div>
                  <a href="#" className="agenda-add-calendar" onClick={(e) => {
                    e.preventDefault()
                    const startTime = new Date('2025-11-20T14:00:00-03:00')
                    const endTime = new Date('2025-11-20T14:20:00-03:00')
                    const eventTitle = 'Keynote - Renç - Agentic Zero'
                    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=By%20Renç%20from%20Giza&location=La%20Rural,%20Buenos%20Aires`
                    window.open(googleCalendarUrl, '_blank')
                  }}>+ Add to Calendar</a>
                </div>
              </div>

              <div className="agenda-item">
                <div className="agenda-time">14:25 - 14:45</div>
                <div className="agenda-content">
                  <h4 className="agenda-speaker">Evin</h4>
                  <p className="agenda-type">Keynote</p>
                  <p className="agenda-title">How Blockchain Solves AI's Identity Crisis</p>
                  <div className="agenda-participants">
                    <span className="participant">Billions Network</span>
                  </div>
                  <a href="#" className="agenda-add-calendar" onClick={(e) => {
                    e.preventDefault()
                    const startTime = new Date('2025-11-20T14:25:00-03:00')
                    const endTime = new Date('2025-11-20T14:45:00-03:00')
                    const eventTitle = 'Keynote: AI Identity Crisis - Evin - Agentic Zero'
                    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=By%20Evin%20from%20Billions%20Network&location=La%20Rural,%20Buenos%20Aires`
                    window.open(googleCalendarUrl, '_blank')
                  }}>+ Add to Calendar</a>
                </div>
              </div>

              <div className="agenda-item">
                <div className="agenda-time">14:50 - 15:10</div>
                <div className="agenda-content">
                  <h4 className="agenda-speaker">Ken</h4>
                  <p className="agenda-type">Panel</p>
                  <p className="agenda-title">DeFi as an Agent Playground</p>
                  <div className="agenda-participants">
                    <span className="participant">Uniswap Foundation</span>
                    <span className="participant">Euler</span>
                    <span className="participant">ZyFAI</span>
                    <span className="participant">Merlin (Morpho)</span>
                  </div>
                  <a href="#" className="agenda-add-calendar" onClick={(e) => {
                    e.preventDefault()
                    const startTime = new Date('2025-11-20T14:50:00-03:00')
                    const endTime = new Date('2025-11-20T15:10:00-03:00')
                    const eventTitle = 'Panel: DeFi as an Agent Playground - Agentic Zero'
                    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=Panel%20with%20Uniswap,%20Euler,%20ZyFAI,%20Morpho&location=La%20Rural,%20Buenos%20Aires`
                    window.open(googleCalendarUrl, '_blank')
                  }}>+ Add to Calendar</a>
                </div>
              </div>

              <div className="agenda-item">
                <div className="agenda-time">15:15 - 15:35</div>
                <div className="agenda-content">
                  <p className="agenda-type">Session</p>
                  <p className="agenda-title">Agentic Frameworks</p>
                  <div className="agenda-participants">
                    <span className="participant">ElizaOS</span>
                  </div>
                  <a href="#" className="agenda-add-calendar" onClick={(e) => {
                    e.preventDefault()
                    const startTime = new Date('2025-11-20T15:15:00-03:00')
                    const endTime = new Date('2025-11-20T15:35:00-03:00')
                    const eventTitle = 'Agentic Frameworks - Agentic Zero'
                    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=ElizaOS%20Framework%20Session&location=La%20Rural,%20Buenos%20Aires`
                    window.open(googleCalendarUrl, '_blank')
                  }}>+ Add to Calendar</a>
                </div>
              </div>

              <div className="agenda-item">
                <div className="agenda-time">15:40 - 16:00</div>
                <div className="agenda-content">
                  <h4 className="agenda-speaker">Mooly Sagiv</h4>
                  <p className="agenda-type">Keynote</p>
                  <p className="agenda-title">Security Keynote</p>
                  <div className="agenda-participants">
                    <span className="participant">Certora</span>
                  </div>
                  <a href="#" className="agenda-add-calendar" onClick={(e) => {
                    e.preventDefault()
                    const startTime = new Date('2025-11-20T15:40:00-03:00')
                    const endTime = new Date('2025-11-20T16:00:00-03:00')
                    const eventTitle = 'Security Keynote - Mooly Sagiv - Agentic Zero'
                    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=By%20Mooly%20Sagiv%20from%20Certora&location=La%20Rural,%20Buenos%20Aires`
                    window.open(googleCalendarUrl, '_blank')
                  }}>+ Add to Calendar</a>
                </div>
              </div>

              <div className="agenda-item">
                <div className="agenda-time">16:10 - 16:30</div>
                <div className="agenda-content">
                  <p className="agenda-type">Closing Remarks</p>
                  <a href="#" className="agenda-add-calendar" onClick={(e) => {
                    e.preventDefault()
                    const startTime = new Date('2025-11-20T16:10:00-03:00')
                    const endTime = new Date('2025-11-20T16:30:00-03:00')
                    const eventTitle = 'Closing Remarks - Agentic Zero'
                    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=Event%20Closing&location=La%20Rural,%20Buenos%20Aires`
                    window.open(googleCalendarUrl, '_blank')
                  }}>+ Add to Calendar</a>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Event Location Section */}
        <section id="location" className="location-section">
          <div className="container">
            <div className="location-content">
              <div className="location-card">
                <div className="location-visual-side">
                  <img 
                    src="/la-rural-venue.png" 
                    alt="La Rural" 
                  />
                </div>
                <div className="location-info-side">
                  <span className="location-label">Event Location</span>
                  <h3 className="location-title">La Rural, Buenos Aires</h3>
                  <p className="location-description">
                    Argentina's premier exhibition center in Palermo
                  </p>
                  <div className="location-points">
                    <div className="location-point">Devconnect venue</div>
                    <div className="location-point">Metro Line D</div>
                    <div className="location-point">Palermo district</div>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/NKqKSiteNnPwbmTs9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="location-map-link"
                  >
                    View on Maps
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="faqs-section">
          <div className="container">
            <div className="faqs-content">
              <div className="section-header">
                <h2 className="section-title">
                  Frequently Asked <span className="gradient-text">Questions</span>
                </h2>
                <p className="section-subtitle">Everything you need to know about AGENTIC Zero</p>
              </div>

              <div className="faqs-list">
                <FAQItem 
                  question="What is Agentic Zero & where is the event happening?"
                  answer="Agentic Zero is a one-day conference about the intersection of AI and web3, focused on open, permissionless rails for autonomous systems. The event will hapen on November 20th, 2025 at La Rural (Palermo), Buenos Aires (same venue than Devconnect)."
                />
                <FAQItem 
                  question="Do I need a Devconnect ticket to enter?"
                  answer={
                    <p>
                      Yes, to be able to attend Agentic Zero, you should purchase a{' '}
                      <a 
                        href="https://devconnect.org/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#f97316', textDecoration: 'underline' }}
                      >
                        Devconnect ticket
                      </a>{' '}
                      first.
                    </p>
                  }
                />
                <FAQItem 
                  question="Who should attend?"
                  answer="Builders, researchers, founders, and everyone interested in the intersection between AI and web3."
                />
                <FAQItem 
                  question="How do I apply to speak?"
                  answer={
                    <p>
                      If you want to be a speaker, please complete the following{' '}
                      <a 
                        href="https://forms.gle/Dnj9tqHttkEcEJWs7"
                        style={{ color: '#f97316', textDecoration: 'underline' }}
                      >
                         speaker form.
                      </a>
                    </p>
                  }
                />
                <FAQItem 
                  question="How do I apply to be a volunteer?"
                  answer={
                    <p>
                      If you want to be a volunteer, please apply at the following{' '}
                      <a 
                        href="https://forms.gle/Z3wEcKC35oei1ypaA"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#f97316', textDecoration: 'underline' }}
                      >
                        volunteer form
                      </a>.
                    </p>
                  }
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

        {/* Redesigned Footer */}
        <footer id="contact" className="footer">
          <div className="container">
            <div className="footer-card">
              <div className="footer-content">
                {/* Brand Column */}
                <div className="footer-brand">
                  <h3 className="footer-logo">
                    <span>Agentic</span> <span>ZERO</span>
                  </h3>
                  <p className="footer-tagline">
                    Where AI meets web3. A community-owned event bringing together visionaries shaping the decentralized future.
                  </p>
                  <div className="footer-social">
                    <a
                      href="https://twitter.com/agenticzero"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      aria-label="Twitter"
                    >
                      <Twitter />
                    </a>
                    <a
                      href="https://linkedin.com/company/agenticzero"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      aria-label="LinkedIn"
                    >
                      <Linkedin />
                    </a>
                  </div>
                </div>

                {/* Quick Links Column */}
                <div className="footer-column">
                  <h4>Quick Links</h4>
                  <div className="footer-links">
                    <a href="#location" className="footer-link">
                      Venue
                    </a>
                    <a href="#faqs" className="footer-link">
                      FAQs
                    </a>
                  </div>
                </div>

                {/* Contact Column */}
                <div className="footer-column">
                  <h4>Get in Touch</h4>
                  <div className="footer-links">
                    <a href="mailto:contact@agenticzero.xyz" className="footer-link">
                      <Mail size={14} />
                      Email Us
                    </a>
                    <a
                      href="https://maps.app.goo.gl/NKqKSiteNnPwbmTs9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link"
                    >
                      <ArrowRight size={14} />
                      La Rural, Buenos Aires
                    </a>
                  </div>
                  <div className="footer-cta">
                    <a
                      href="https://devconnect.org/calendar?event=agenticzero"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-cta-button"
                    >
                      Get Tickets
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="footer-bottom">
                <p>&copy; 2025 Agentic Zero. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
