"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Mail, ArrowRight, Twitter, Linkedin } from "lucide-react"
import { AgendaSection } from "@/components/agenda/AgendaSection"
import { FirstEditionJsonLd } from "@/components/first-edition-json-ld"

function AgendaNav() {
  return (
    <nav className="nav-container">
      <div className="nav-pill">
        <a href="/" className="nav-link">
          Home
        </a>

        <a href="/#about" className="nav-link">
          Speakers
        </a>

        <a href="/first-edition/agenda" className="nav-link nav-agenda active nav-mobile-only">
          First Edition Agenda
        </a>

        <a href="/#notify" className="nav-cta nav-mobile-only">
          Get Tickets
        </a>

        <div className="nav-links-desktop">
          <a href="/agenda" className="nav-link">
            Agenda
          </a>
          <a href="/#faqs" className="nav-link">
            FAQs
          </a>
          <a href="/first-edition/agenda" className="nav-link nav-agenda active">
            First Edition Agenda
          </a>

          <a href="/#notify" className="nav-cta">
            Get Tickets
          </a>
        </div>
      </div>
    </nav>
  )
}

export default function AgendaPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const totalLoadingTime = 800

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, totalLoadingTime)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <FirstEditionJsonLd />
      <AgendaNav />
      {isLoading && (
        <div className="loading-container">
          <div className="loading-content">
            <svg
              className="loading-logo"
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
            </svg>
          </div>
        </div>
      )}
      <div className="main-content">
        <div className="archive-banner" role="note">
          <p className="archive-banner-label">Archive</p>
          <h1 className="archive-banner-title">First Edition Agenda</h1>
          <p className="archive-banner-body">
            This is the programme from the first edition of Agentic Zero, held on{" "}
            <time dateTime="2025-11-20">November 20, 2025</time> at La Rural in Buenos Aires,
            Argentina. It is kept here as a record of a past event.
          </p>
          <p className="archive-banner-body">
            The second edition takes place on <time dateTime="2026-10-07">October 7, 2026</time> at
            The Avalon in San Francisco.{" "}
            <a href="/agenda" className="archive-banner-link">
              See the current agenda
            </a>
            .
          </p>
        </div>
        <AgendaSection />

        {/* Footer */}
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
                      href="https://x.com/AgenticZero"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      aria-label="X"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16" fill="currentColor">
                        <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/agentic-zero-ai"
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
                    <a href="/" className="footer-link">
                      Home
                    </a>
                    <a href="/#faqs" className="footer-link">
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
                    <a href="/#notify" className="footer-cta-button">
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
