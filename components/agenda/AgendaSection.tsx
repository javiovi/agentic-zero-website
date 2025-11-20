"use client"

import { Calendar } from "lucide-react"
import { useRef, useEffect, useState } from "react"

interface AgendaSession {
  time: string
  startTime: string
  endTime: string
  speakers: Array<{
    name: string
    image?: string
    organization?: string
  }>
  type: "panel" | "keynote" | "break" | "demo"
  title?: string
  organizations: string[]
  description?: string
  moderator?: {
    name: string
    organization?: string
  }
}

// Speaker images mapping from the main speakers list
const speakersImageMap: Record<string, string> = {
  "Rahul Kothari": "/images/speakers/Rahul_Kothari_AZTEC.jpg",
  "Nader Dabit": "/images/speakers/Nader.jpg",
  "Ken Ng": "/images/speakers/Ken.jpg",
  "Juan Irungaray": "/images/speakers/juan.jpeg",
  "Nick Emmons": "/images/speakers/nick-allora.jpg",
  "Sam Green": "/images/speakers/sam.jpg",
  "Gauthier Vila": "/images/speakers/gauthier.jpg",
  "Renç Korzay": "/images/speakers/Renc.jpg",
  "E.G. Galano": "/images/speakers/eg.jpg",
  "Quintus Kilbourn": "/images/speakers/quintus.jpg",
  "Shaw Walters": "/images/speakers/shaw.jpg",
  "Mooly Sagiv": "/images/speakers/mooly.jpg",
  "Nicolás Montone": "/images/speakers/nicolas.jpeg",
  "Marco De Rossi": "/images/speakers/Marco-de-Rossi.jpg",
  "Shafu": "/images/speakers/sharif.jpg",

  "Sumeet Chougule": "/images/speakers/sumeet.jpg",
  "Jessy EF": "/images/speakers/jessy.jpg",
  "Ricky Esclapon": "/images/speakers/Ricky.jpg",
  "Sandi Fatic": "/images/speakers/Chef Sale.jpg",
}

const rawAgendaData = [
  {
    time: "10:00 - 10:40",
    startTime: "2025-11-20T10:00:00-03:00",
    endTime: "2025-11-20T10:40:00-03:00",
    type: "panel",
    speakers: ["Marco De Rossi", "Sumeet Chougule", "Davide Crapis", "Quintus Kilbourn"],
    organizations: ["MetaMask", "Cha0s & Nethermind", "Ethereum Foundation" , "Flashbots"],
    title: "The Trust Layer in the Agentic Stack: ERC-8004",
    moderator: {
      name: "Simon Emanuel Schmid",
      organization: "Developer Relations at ENS"
    }
  },
  {
    time: "10:45 - 11:05",
    startTime: "2025-11-20T10:45:00-03:00",
    endTime: "2025-11-20T11:05:00-03:00",
    type: "keynote",
    speakers: ["Shafu"],
    organizations: ["Merit Systems"],
    title: "x402scan: The discovery layer for x402"
  },
  {
    time: "11:10 - 11:30",
    startTime: "2025-11-20T11:10:00-03:00",
    endTime: "2025-11-20T11:30:00-03:00",
    type: "keynote",
    speakers: ["Rahul Kothari"],
    organizations: ["Aztec"],
    title: "Privacy for x402"
  },
  {
    time: "11:35 - 11:55",
    startTime: "2025-11-20T11:35:00-03:00",
    endTime: "2025-11-20T11:55:00-03:00",
    type: "keynote",
    speakers: ["Nick Emmons"],
    organizations: ["Allora Labs"],
    title: "Intelligence as a Public Good"
  },
  {
    time: "12:00 - 12:25",
    startTime: "2025-11-20T12:00:00-03:00",
    endTime: "2025-11-20T12:25:00-03:00",
    type: "keynote",
    speakers: ["E.G. Galano"],
    organizations: ["Infura & DIN"],
    title: "Trust, Discovery & Autonomy in the Age of Agentic AI"
  },
  {
    time: "12:30 - 12:50",
    startTime: "2025-11-20T12:30:00-03:00",
    endTime: "2025-11-20T12:50:00-03:00",
    type: "keynote",
    speakers: ["Sam Green"],
    organizations: ["Cambrian Network"],
    title: "Agents are the future of finance - Enter the Agentic Revolution"
  },
  {
    time: "12:55 - 13:20",
    startTime: "2025-11-20T12:50:00-03:00",
    endTime: "2025-11-20T13:20:00-03:00",
    type: "panel",
    speakers: ["Nicolás Montone", "Juan Irungaray", "Nader Dabit", "Clemens"],
    organizations: ["Vercel (v0)", "Google", "Eigen Labs", "Infura/DIN"],
    title: "Agents Under the Hood: Building the Agentic Stack",
    moderator: {
      name: "Chris Wessels",
      organization: "The Graph council and founder of GraphOps and Summerstone"
    }
  },{
    time: "13:00 - 14:00",
    startTime: "2025-11-20T13:00:00-03:00",
    endTime: "2025-11-20T14:00:00-03:00",
    type: "break",
    speakers: [],
    organizations: [],
    title: "Lunch Break"
  },
  {
    time: "13:25 - 13:55",
    startTime: "2025-11-20T13:25:00-03:00",
    endTime: "2025-11-20T13:55:00-03:00",
    type: "keynote",
    speakers: ["Artem Kotelskiy"],
    organizations: ["cyber•Fund"],
    title: "The role oF AI in Cybereconomy"
  },
  {
    time: "13:45 - 13:55",
    startTime: "2025-11-20T13:45:00-03:00",
    endTime: "2025-11-20T13:55:00-03:00",
    type: "demo",
    speakers: ["Ricky Esclapon"],
    organizations: ["Cambrian Network"],
    title: "Demo: Cambrian ERC-8004 Data Agent"
  },

  {
    time: "14:00 - 14:20",
    startTime: "2025-11-20T14:00:00-03:00",
    endTime: "2025-11-20T14:20:00-03:00",
    type: "keynote",
    speakers: ["Shaw Walters"],
    organizations: ["ElizaOS (Eliza Labs)"],
    title: "Babylon - In a world where everything is predicted, what really matters?"
  },
  {
    time: "14:25 - 14:45",
    startTime: "2025-11-20T14:25:00-03:00",
    endTime: "2025-11-20T14:45:00-03:00",
    type: "keynote",
    speakers: ["Renç Korzay"],
    organizations: ["Giza"],
    title: "Intelligent Compression for Finance"
  },
  {
    time: "14:50 - 15:20",
    startTime: "2025-11-20T14:50:00-03:00",
    endTime: "2025-11-20T15:20:00-03:00",
    type: "panel",
    speakers: ["Ken Ng", "Lukasz Stoczynski", "Gauthier Vila", "Stefano Bury"],
    organizations: ["Uniswap Foundation", "Mimic", "ZyFAI", "Virtuals"],
    title: "DeFi as an Agent Playground",
    moderator: {
      name: "Valentin Mihov",
      organization: "Co-Founder, Daedalus Angels and Finexify"
    }
  },
  {
    time: "15:25 - 15:45",
    startTime: "2025-11-20T15:25:00-03:00",
    endTime: "2025-11-20T15:45:00-03:00",
    type: "keynote",
    speakers: ["Michael Sena"],
    organizations: ["Recall"],
    title: "How Open Arenas Bring Trust to AI Selection"
  },
  {
    time: "15:50 - 16:10",
    startTime: "2025-11-20T15:50:00-03:00",
    endTime: "2025-11-20T16:10:00-03:00",
    type: "keynote",
    speakers: ["Mooly Sagiv"],
    organizations: ["Certora"],
    title: "VeriSafe: Spec-Driven Smart Contract Development Technology"
  },
  {
    time: "16:15 - 16:35",
    startTime: "2025-11-20T16:15:00-03:00",
    endTime: "2025-11-20T16:35:00-03:00",
    type: "keynote",
    speakers: ["Jessy EF"],
    organizations: ["Ethereum Foundation"],
    title: "The Game of Genius, x402 and ERC-8004"
  },
  {
    time: "16:40 - 17:00",
    startTime: "2025-11-20T16:40:00-03:00",
    endTime: "2025-11-20T17:00:00-03:00",
    type: "keynote",
    speakers: ["Sandi Fatic"],
    organizations: ["Calimero Network"],
    title: "The Cyberpunk Rebellion: Forging Private Agentic AI"
  }
] as const

// Transform raw agenda data to include speaker images
const agendaData: AgendaSession[] = rawAgendaData.map(session => ({
  ...session,
  speakers: session.speakers.map(name => ({
    name,
    image: speakersImageMap[name]
  })),
  organizations: [...session.organizations]
}))

function addToCalendar(session: AgendaSession) {
  const eventTitle = session.title || session.speakers.map(s => s.name).join(", ")
  const startTime = new Date(session.startTime)
  const endTime = new Date(session.endTime)

  const startISO = startTime.toISOString().replace(/[-:]/g, "").split(".")[0]
  const endISO = endTime.toISOString().replace(/[-:]/g, "").split(".")[0]

  const details = `${session.type === "panel" ? "Panel" : "Keynote"} at Agentic Zero Conference`
  const location = "La Rural, Av. Sarmiento 2704, C1425 Cdad. Autónoma de Buenos Aires, Argentina"

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startISO}Z/${endISO}Z&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`

  window.open(googleCalendarUrl, "_blank")
}

// Individual Agenda Card Component with Intersection Observer
function AgendaCard({ session, index }: { session: AgendaSession; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`agenda-card agenda-card--${session.type} ${isVisible ? 'agenda-card-visible' : 'agenda-card-hidden'}`}
    >
      <div className="agenda-card-time">
        <span className="agenda-time-badge">{session.time}</span>
        <span className="agenda-type-badge">
          {session.type === "break" ? "Break" : session.type === "panel" ? "Panel" : session.type === "demo" ? "Demo" : "Keynote"}
        </span>
      </div>

      <div className="agenda-card-content">
        <div className="agenda-card-header">
          <div className="agenda-card-main">
            {session.title && (
              <h3 className="agenda-title">{session.title}</h3>
            )}
          </div>

          {session.type !== "break" && (
            <button
              onClick={() => addToCalendar(session)}
              className="agenda-calendar-btn"
              aria-label={`Add ${session.title || session.speakers.map(s => s.name).join(", ")} to calendar`}
            >
              <Calendar size={16} />
              <span>Add to Calendar</span>
            </button>
          )}
        </div>

        {session.speakers.length > 0 && (
          <div className="agenda-speakers-container">
            {session.speakers.map((speaker, idx) => (
              <div key={idx} className="agenda-speaker-entry">
                <span className="agenda-speaker-name">{speaker.name}</span>
                {session.organizations[idx] && (
                  <span className="agenda-org-badge">{session.organizations[idx]}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {session.moderator && (
          <div className="agenda-moderator-container">
            <span className="agenda-moderator-label">Moderator:</span>
            <span className="agenda-moderator-name">{session.moderator.name}</span>
            {session.moderator.organization && (
              <span className="agenda-moderator-org">{session.moderator.organization}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function AgendaSection() {
  const talks = agendaData

  return (
    <section id="agenda" className="agenda-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Agentic Zero <span className="gradient-text">Agenda</span>
          </h2>
          <p className="section-subtitle">November 20th, 2025 - La Rural, Yellow Pavilion</p>
        </div>

        <div className="agenda-container">
          {talks.map((session, index) => (
            <AgendaCard key={index} session={session} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
