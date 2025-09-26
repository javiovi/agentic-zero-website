"use client"

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

// Enhanced Speaker Modal
function SpeakerModal({
  speaker,
  isOpen,
  onClose,
}: {
  speaker: any
  isOpen: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.body.style.overflow = "unset"
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div className="modal-body">
          <div className="modal-header">
            <img src={speaker.image || "/placeholder.svg"} alt={speaker.name} className="modal-avatar" />
            <div className="modal-info">
              <h3 className="modal-name">{speaker.name}</h3>
              <p className="modal-title">{speaker.title}</p>
              <p className="modal-company">{speaker.company}</p>
            </div>
          </div>

          <div className="modal-bio">
            <p>{speaker.bio}</p>
          </div>

          <div className="modal-social">
            <a
              href={`https://twitter.com/${speaker.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={`${speaker.name} on Twitter`}
            >
              <Twitter size={20} />
              <span>Twitter</span>
            </a>
            <a
              href={`https://linkedin.com/in/${speaker.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={`${speaker.name} on LinkedIn`}
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}



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
      const sections = ['hero', 'location', 'faqs']
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
          href="https://ticketh.xyz/agentic/zero/"
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
  const [selectedSpeaker, setSelectedSpeaker] = useState<any>(null)
  const [heroRef, heroVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [speakersRef, speakersVisible] = useIntersectionObserver({ threshold: 0.1 })

  useEffect(() => {
    const animationEndTime = 2500
    const fadeOutDuration = 500
    const totalLoadingTime = animationEndTime + fadeOutDuration

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, totalLoadingTime)
    return () => clearTimeout(timer)
  }, [])

  const speakers = [
    {
      name: "Dr. Sarah Chen",
      title: "AI Safety Researcher",
      company: "Anthropic",
      image: "/placeholder.svg?height=400&width=400&text=Dr.+Sarah+Chen",
      bio: "Dr. Chen leads groundbreaking research in AI alignment and safety protocols. Her work focuses on ensuring artificial intelligence systems remain beneficial and controllable as they become more capable. She has published extensively on value learning and corrigibility in advanced AI systems.",
      twitter: "sarahchen_ai",
      linkedin: "sarah-chen-ai",
    },
    {
      name: "Marcus Rodriguez",
      title: "Head of AI Research",
      company: "DeepMind",
      image: "/placeholder.svg?height=400&width=400&text=Marcus+Rodriguez",
      bio: "Marcus spearheads DeepMind's efforts in developing artificial general intelligence. His research spans reinforcement learning, neural architecture search, and emergent behaviors in large-scale AI systems. He previously led breakthrough projects in game-playing AI and protein folding prediction.",
      twitter: "marcusrod_ai",
      linkedin: "marcus-rodriguez-ai",
    },
    {
      name: "Dr. Aisha Patel",
      title: "Founder & CEO",
      company: "Nexus AI",
      image: "/placeholder.svg?height=400&width=400&text=Dr.+Aisha+Patel",
      bio: "Dr. Patel founded Nexus AI to bridge the gap between cutting-edge AI research and real-world applications. Her expertise lies in multi-agent systems and distributed AI architectures. She holds multiple patents in autonomous decision-making systems and has advised governments on AI policy.",
      twitter: "aisha_nexus",
      linkedin: "aisha-patel-nexus",
    },
    {
      name: "Prof. James Liu",
      title: "Director of AI Ethics",
      company: "Stanford HAI",
      image: "/placeholder.svg?height=400&width=400&text=Prof.+James+Liu",
      bio: "Professor Liu directs Stanford's Human-Centered AI Institute's ethics research division. His work examines the societal implications of AI systems and develops frameworks for responsible AI development. He has testified before Congress on AI regulation and co-authored influential papers on algorithmic fairness.",
      twitter: "jamesliu_ethics",
      linkedin: "james-liu-stanford",
    },
    {
      name: "Dr. Elena Vasquez",
      title: "Quantum AI Researcher",
      company: "IBM Research",
      image: "/placeholder.svg?height=400&width=400&text=Dr.+Elena+Vasquez",
      bio: "Dr. Vasquez pioneers the intersection of quantum computing and artificial intelligence. Her research focuses on quantum machine learning algorithms and their applications in solving complex optimization problems that are intractable for classical computers.",
      twitter: "elena_quantum",
      linkedin: "elena-vasquez-quantum",
    },
    {
      name: "Alex Thompson",
      title: "VP of AI Products",
      company: "Microsoft",
      image: "/placeholder.svg?height=400&width=400&text=Alex+Thompson",
      bio: "Alex leads Microsoft's AI product strategy, overseeing the development of AI-powered tools that enhance productivity for millions of users worldwide. His team focuses on making AI accessible and beneficial for businesses of all sizes.",
      twitter: "alexthompson_ai",
      linkedin: "alex-thompson-microsoft",
    },
  ]

  const sponsors = [
    {
      name: "OpenAI",
      logo: "/placeholder.svg?height=80&width=160&text=OpenAI",
      reason: "Pioneering the future of artificial general intelligence",
    },
    {
      name: "Anthropic",
      logo: "/placeholder.svg?height=80&width=160&text=Anthropic",
      reason: "Building AI systems that are safe, beneficial, and understandable",
    },
    {
      name: "Google DeepMind",
      logo: "/placeholder.svg?height=80&width=160&text=DeepMind",
      reason: "Advancing scientific discovery through AI research",
    },
    {
      name: "Microsoft Research",
      logo: "/placeholder.svg?height=80&width=160&text=Microsoft",
      reason: "Empowering every person and organization with AI",
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
                  <span className="title-main">AGENTIC</span>
                  <span className="title-accent">ZERO</span>
                </h1>
                <p className="hero-subtitle">
                  AI is racing ahead. Crypto already rewrote the rules of trust. AGENTIC Zero brings the two together on
                  neutral, permissionless infrastructure designed for people, not gatekeepers.
                </p>
                <div className="hero-actions">
                  <Button
                    className="cta-primary"
                    onClick={() => window.open("https://ticketh.xyz/agentic/zero/", "_blank")}
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
                Why <span className="gradient-text">AGENTIC Zero</span>?
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

        {/* Enhanced Sponsors Section - HIDDEN */}
        <section id="sponsors" className="sponsors" style={{ display: 'none' }}>
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Sponsors</h2>
              <p className="section-subtitle">Backing AGENTIC Zero</p>
            </div>

            <div className="sponsors-grid">
              {sponsors.map((sponsor, index) => (
                <div key={sponsor.name} className="sponsor-card" style={{ animationDelay: `${index * 100}ms` }}>
                  <img src={sponsor.logo || "/placeholder.svg"} alt={sponsor.name} loading="lazy" />
                  <div className="sponsor-tooltip">
                    <p>{sponsor.reason}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="sponsor-cta">
              <Button 
                className="sponsor-cta-button"
                onClick={() => window.location.href = "mailto:info@agenticzero.xyz?subject=Sponsorship%20Inquiry%20-%20AGENTIC%20Zero"}
              >
                Become a Sponsor
              </Button>
            </div>
          </div>
        </section>

        {/* Enhanced Speakers Section - HIDDEN */}
        <section ref={speakersRef} id="speakers" className="speakers" style={{ display: 'none' }}>
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Visionary <span className="gradient-text">Speakers</span>
              </h2>
              <p className="section-subtitle">Learn from the minds shaping the future of AI</p>
            </div>

            <div className="speakers-grid">
              {speakers.map((speaker, index) => (
                <div
                  key={speaker.name}
                  className={`speaker-card ${speakersVisible ? "animate-in" : ""}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedSpeaker(speaker)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setSelectedSpeaker(speaker)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${speaker.name}`}
                >
                  <div className="speaker-image-container">
                    <img
                      src={speaker.image || "/placeholder.svg"}
                      alt={speaker.name}
                      loading="lazy"
                      className="speaker-image"
                    />
                    <div className="speaker-overlay">
                      <span>View Profile</span>
                    </div>
                  </div>
                  <div className="speaker-info">
                    <h3 className="speaker-name">{speaker.name}</h3>
                    <p className="speaker-title">{speaker.title}</p>
                    <p className="speaker-company">{speaker.company}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="speaker-cta">
              <Button 
                className="speaker-apply-button"
                onClick={() => window.open("https://forms.gle/Dnj9tqHttkEcEJWs7", "_blank")}
              >
                Apply to Speak
              </Button>
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
                  question="What is AGENTIC Zero & where is the event happening?"
                  answer="AGENTIC Zero is a one-day conference about the intersection of AI and web3, focused on open, permissionless rails for autonomous systems. The event will hapen on November 20th, 2025 at La Rural (Palermo), Buenos Aires (same venue than Devconnect)."
                />
                <FAQItem 
                  question="Do I need a Devconnect ticket to enter?"
                  answer={
                    <p>
                      Yes, to be able to attend AGENTIC Zero, you should purchase a{' '}
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
                      We welcome sponsors who want to back AGENTIC Zero's mission of building open, permissionless infrastructure for AI. To discuss sponsorship opportunities, please{' '}
                      <a 
                        href="mailto:info@agenticzero.xyz?subject=Sponsorship%20Inquiry%20-%20AGENTIC%20Zero"
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
                    <span>AGENTIC</span> <span>ZERO</span>
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
                    <a href="mailto:info@agenticzero.xyz" className="footer-link">
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
                      href="https://ticketh.xyz/agentic/zero/"
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

        <SpeakerModal speaker={selectedSpeaker} isOpen={!!selectedSpeaker} onClose={() => setSelectedSpeaker(null)} />
      </div>
    </>
  )
}
