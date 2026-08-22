"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import type { Faq } from "@/lib/faq"

export function HeroLogo() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const badge = document.querySelector('.hero-badge')
      if (badge) setHidden(badge.getBoundingClientRect().top <= 64)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`hero-logo ${hidden ? "logo-hidden" : ""}`}>
      <img src="/images/logo.svg" alt="Agentic Zero Logo" className="logo-image" />
    </div>
  )
}

export function FAQItem({ question, answer }: Faq) {
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
          <p>
            {answer.map((segment, i) =>
              typeof segment === 'string' ? (
                segment
              ) : (
                <a
                  key={i}
                  href={segment.href}
                  {...(segment.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  style={{ color: '#f97316', textDecoration: 'underline' }}
                >
                  {segment.text}
                </a>
              )
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export function NotifyForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const honeypotRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error")
      return
    }

    setStatus("loading")
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company: honeypotRef.current?.value ?? "" }),
      })
      setStatus(response.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return <p className="az-v2-notify-success">You're on the list. We'll send you Agentic Zero programme updates.</p>
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
        onChange={(event) => {
          setEmail(event.target.value)
          if (status === "error") setStatus("idle")
        }}
        placeholder="your@mail.com"
        aria-label="Email address"
        required
      />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "..." : "GET UPDATES"}
      </button>
      {status === "error" && <p className="az-v2-notify-error">Please enter a valid email.</p>}
    </form>
  )
}
