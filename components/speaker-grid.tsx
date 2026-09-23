import { PUBLIC_SPEAKERS_2026, speakerDisplayRole } from "@/lib/speakers"

export function SpeakerGrid() {
  return (
    <div className="az-v2-speaker-grid" aria-label="Speakers at Agentic Zero 2026">
      {PUBLIC_SPEAKERS_2026.map((speaker) => (
        <a
          className="az-v2-speaker-card"
          href={speaker.profileUrl}
          key={speaker.slug}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${speaker.name}'s profile`}
        >
          <span className="az-v2-speaker-portrait">
            <img
              src={speaker.image}
              alt={speaker.alt}
              loading="lazy"
              style={speaker.slug === "brad-holden" ? { objectPosition: "50% 20%" } : speaker.slug === "mac" ? { objectPosition: "50% 0%" } : speaker.slug === "ken-priyadarshi" ? { transform: "scale(1.5)", transformOrigin: "50% 35%" } : undefined}
            />
          </span>
          <div>
            <h4>{speaker.name}</h4>
            <p>{speakerDisplayRole(speaker)}</p>
          </div>
        </a>
      ))}
    </div>
  )
}
