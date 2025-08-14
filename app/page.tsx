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

// Enhanced Email Form
function EmailCaptureForm() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address")
      setIsSubmitting(false)
      return
    }

    setEmailError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Email submitted:", email)
    setEmail("")
    setIsSubmitting(false)
    setIsSubmitted(true)

    setTimeout(() => setIsSubmitted(false), 3000)
  }

  if (isSubmitted) {
    return (
      <div className="email-success">
        <div className="success-icon">✓</div>
        <h3>You're on the list!</h3>
        <p>We'll notify you when tickets become available.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleEmailSubmit} className="email-form">
      <div className="email-input-group">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`email-input ${emailError ? "error" : ""}`}
          required
          disabled={isSubmitting}
        />
        <Button type="submit" className="email-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="loading-spinner" />
          ) : (
            <>
              Get Updates
              <ArrowRight size={16} />
            </>
          )}
        </Button>
      </div>
      {emailError && <p className="email-error">{emailError}</p>}
    </form>
  )
}

// Speaker Application Form
function SpeakerApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    title: "",
    topic: "",
    bio: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Speaker application submitted:", formData)
    setIsSubmitting(false)
    setIsSubmitted(true)

    setTimeout(() => setIsSubmitted(false), 4000)
  }

  if (isSubmitted) {
    return (
      <div className="form-success">
        <div className="success-icon">✓</div>
        <h3>Application Submitted!</h3>
        <p>We'll review your application and get back to you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="speaker-form">
      <div className="form-grid">
        <div className="form-group">
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <Input
            type="text"
            name="company"
            placeholder="Company/Organization"
            value={formData.company}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <Input
            type="text"
            name="title"
            placeholder="Your Title"
            value={formData.title}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>
      <div className="form-group">
        <Input
          type="text"
          name="topic"
          placeholder="Proposed Talk Topic"
          value={formData.topic}
          onChange={handleInputChange}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <textarea
          name="bio"
          placeholder="Brief bio and talk description (max 500 characters)"
          value={formData.bio}
          onChange={handleInputChange}
          maxLength={500}
          rows={4}
          required
          disabled={isSubmitting}
          className="form-textarea"
        />
      </div>
      <Button type="submit" className="form-submit-btn" disabled={isSubmitting}>
        {isSubmitting ? (
          <div className="loading-spinner" />
        ) : (
          <>
            Submit Application
            <ArrowRight size={16} />
          </>
        )}
      </Button>
    </form>
  )
}

// FAQ Item Component with Toggle
function FAQItem({ question, answer }: { question: string; answer: string }) {
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
          <p>{answer}</p>
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
      const sections = ['hero', 'sponsors', 'speakers', 'location', 'faqs']
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
          className={`nav-link ${activeSection === 'sponsors' ? 'active' : ''}`}
          onClick={() => scrollToSection('sponsors')}
        >
          Sponsors
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
          href="mailto:info@agenticzero.xyz"
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
                    onClick={() => (window.location.href = "mailto:info@agenticzero.xyz")}
                  >
                    Get Early Access
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

        {/* Enhanced Sponsors Section */}
        <section id="sponsors" className="sponsors">
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

        {/* Enhanced Speakers Section */}
        <section ref={speakersRef} id="speakers" className="speakers">
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
                  question="Sample Question 1 - Waiting for your content"
                  answer="Sample answer - I'll replace this with your actual FAQ content when you provide it."
                />
                <FAQItem 
                  question="Sample Question 2 - Waiting for your content"
                  answer="Sample answer - I'll replace this with your actual FAQ content when you provide it."
                />
                <FAQItem 
                  question="Sample Question 3 - Waiting for your content"
                  answer="Sample answer - I'll replace this with your actual FAQ content when you provide it."
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
                    Where AI meets Web3. A community-owned event bringing together visionaries shaping the decentralized future.
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
                    <a href="#sponsors" className="footer-link">
                      Sponsors
                    </a>
                    <a href="#speakers" className="footer-link">
                      Speakers
                    </a>
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
                      href="mailto:info@agenticzero.xyz?subject=Ticket%20Inquiry"
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
