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
        <a href="/agenda" className="nav-link nav-agenda">
          Agenda
        </a>
         <a
          href="https://devconnect.org/calendar?event=agenticzero"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
        >
          Get Tickets
        </a>
        <button
          className={`nav-link ${activeSection === 'speakers' ? 'active' : ''}`}
          onClick={() => scrollToSection('speakers')}
        >
          Speakers
        </button>
      
        <div className="nav-links-desktop">
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
        </div>
        
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
      image: "/images/speakers/juan.jpg",
      link: "https://www.linkedin.com/in/juanirungaray/",
    },

      {
      name: "Nick Emmons",
      role: "Founder & CEO, Allora Labs",
      image: "/images/speakers/nick-allora.jpg",
      link: "https://x.com/nick_emmons",
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
 {
      name: "Michael Sena",
      role: "Co-founder, Recall Labs",
    image: "/images/speakers/sena-recall.jpg",
      link: "",
   },
 {
      name: "Jessy",
      role: "Advisor & Coordinator, Ethereum Foundation dAI",
    image: "/images/speakers/jessy-eth.jpg",
      link: "https://x.com/13yearoldvc",
   },
 {
      name: "Stefano Bury",
      role: "Head of US, Virtuals Protocol",
    image: "/images/speakers/stefano.jpg",
      link: "https://x.com/0xbury",
   },
    {
      name: "Artem Kotelskiy",
      role: "Head of Blockchain Research, cyber•Fund",
    image: "/images/speakers/artem.jpg",
      link: "",
   },
  {
      name: "Davide Crapis",
      role: "AI Lead at Ethereum Foundation · dAI Team",
    image: "/images/speakers/davide.jpg",
      link: "https://x.com/DavideCrapis",
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
                  Artificial intelligence (AI) is racing ahead. Crypto already rewrote the rules of trust. Agentic Zero is a one-day AI x crypto summit focused on open, permissionless rails for agentic systems.
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
                  <strong>Agentic Zero is the meeting point for everyone working on the future of AI and crypto.</strong>
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
                    className={`sponsor-card sponsor-gold ${sponsor.name === 'Giza' ? 'sponsor-giza' : ''} ${sponsor.name === 'AdEx' ? 'sponsor-adex' : ''} ${sponsor.name === 'CyberFund' ? 'sponsor-cyberfund' : ''} ${sponsorsVisible ? 'sponsor-animate' : ''}`}
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
                          ? { transform: 'scale(1.2)', transformOrigin: 'center 30%' }
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
                  answer="Agentic Zero is a one-day conference about the intersection of AI and crypto, focused on open, permissionless rails for autonomous systems. The event will hapen on November 20th, 2025 at La Rural (Palermo), Buenos Aires (same venue than Devconnect)."
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
                  answer="Builders, researchers, founders, and everyone interested in the intersection between AI and crypto."
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
                    <span>Agentic</span> <span>Zero</span>
                  </h3>
                  <p className="footer-tagline">
                    Where AI meets crypto. A community-owned event bringing together visionaries shaping the decentralized future.
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
