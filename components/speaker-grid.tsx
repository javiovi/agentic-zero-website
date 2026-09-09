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
          <img
            src={speaker.image}
            alt={speaker.alt}
            loading="lazy"
            style={speaker.slug === "brad-holden" ? { objectPosition: "50% 20%" } : undefined}
          />
          <div>
            <h4>{speaker.name}</h4>
            <p>{speakerDisplayRole(speaker)}</p>
          </div>
        </a>
      ))}
    </div>
  )
}
