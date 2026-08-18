"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { TICKET_URL } from "@/lib/tickets"

// The single navigation for the whole site.
//
// Section links (About and FAQs) live on the homepage only. On the
// homepage they smooth-scroll and track the active section. On any other page
// they are plain links back to the homepage anchor, because those IDs do not
// exist there.
//
// There is deliberately no "mobile only" variant. Below 768px navigation.css
// hides .nav-pill entirely and the hamburger menu takes over, so a second set
// of links inside the pill would only ever render on desktop.
const SCROLL_SECTIONS = ["hero", "about", "tech-week", "faqs"]

type SectionLink = { id: string; label: string; className?: string }
type PageLink = { href: string; label: string; className?: string; external?: boolean }

const ABOUT: SectionLink = { id: "about", label: "About" }
const FAQS: SectionLink = { id: "faqs", label: "FAQs" }

// /first-edition/agenda is deliberately not in the nav. It is reachable from
// the footer and from the homepage speaker rail, both labelled
// "First Edition Agenda".
const AGENDA: PageLink = { href: "/agenda", label: "Agenda" }
const BLOG: PageLink = { href: "/blog", label: "Blog" }
const TICKETS: PageLink = {
  href: TICKET_URL,
  label: "Tickets",
  className: "nav-tickets",
  external: true,
}

export function SiteNav() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  const [activeSection, setActiveSection] = useState("hero")
  const [isHidden, setIsHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Inner pages: hide once the page title has scrolled past, so the fixed
      // nav never sits on top of the body copy.
      if (!isHome) {
        const heading = document.querySelector(".az-v2-inner-header .az-v2-section-heading")
        setIsHidden(
          heading ? heading.getBoundingClientRect().bottom <= 120 : window.scrollY > 200
        )
        return
      }

      const scrollPosition = window.scrollY + 200

      const badge = document.querySelector(".hero-badge")
      if (badge) {
        setIsHidden(badge.getBoundingClientRect().top <= 120)
      } else {
        setIsHidden(window.scrollY > 200)
      }

      for (const section of SCROLL_SECTIONS) {
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

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHome])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMenuOpen(false)
  }

  // On the homepage these scroll. Everywhere else they navigate home first.
  const sectionLink = ({ id, label, className }: SectionLink) => {
    const classes = `nav-link ${className ?? ""}`.trim()

    if (!isHome) {
      return (
        <a key={id} href={`/#${id}`} className={classes} onClick={() => setMenuOpen(false)}>
          {label}
        </a>
      )
    }

    return (
      <button
        key={id}
        className={`${classes} ${activeSection === id ? "active" : ""}`}
        onClick={() => scrollToSection(id)}
      >
        {label}
      </button>
    )
  }

  // Child pages count as active too, so a post at /blog/<slug> keeps Blog lit.
  const pageLink = ({ href, label, className, external }: PageLink) => (
    <a
      key={href}
      href={href}
      className={`nav-link ${className ?? ""} ${
        !external && (pathname === href || pathname.startsWith(`${href}/`)) ? "active" : ""
      }`.trim()}
      onClick={() => setMenuOpen(false)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </a>
  )

  return (
    <nav className={`nav-container ${isHidden ? "nav-hidden" : ""}`}>
      <div className="nav-pill">
        <a href="/" className="nav-link">
          Home
        </a>

        {sectionLink(ABOUT)}

        <div className="nav-links-desktop">
          {pageLink(AGENDA)}
          {pageLink(BLOG)}
          {sectionLink(FAQS)}
          {pageLink(TICKETS)}
        </div>
      </div>

      <button
        className={`nav-hamburger ${menuOpen ? "open" : ""}`}
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
          <a href="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          {sectionLink(ABOUT)}
          {pageLink(AGENDA)}
          {pageLink(BLOG)}
          {sectionLink(FAQS)}
          {pageLink(TICKETS)}
        </div>
      )}
    </nav>
  )
}
