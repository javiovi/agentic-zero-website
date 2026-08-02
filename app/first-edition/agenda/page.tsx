"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { AgendaSection } from "@/components/agenda/AgendaSection"
import { FirstEditionJsonLd } from "@/components/first-edition-json-ld"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"

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
      <SiteNav />
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
      <div className="page-container az-v2-page az-v2-inner-page">
        <header className="az-v2-inner-header">
          <div className="az-v2-section-heading">
            <span>Archive</span>
            <h2>First Edition Agenda</h2>
          </div>
          <p>
            This is the programme from the first edition of Agentic Zero, held on{" "}
            <time dateTime="2025-11-20">November 20, 2025</time> at La Rural in Buenos Aires,
            Argentina. It is kept here as a record of a past event.
          </p>
          <p>
            The second edition takes place on <time dateTime="2026-10-07">October 7, 2026</time> at
            The Avalon in San Francisco.
            <br />
            <a href="/agenda">See the current agenda</a>.
          </p>
        </header>
        <AgendaSection />
        <SiteFooter />
      </div>
    </>
  )
}
