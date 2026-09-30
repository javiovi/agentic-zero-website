import { PUBLIC_SPEAKERS_2026, speakerDisplayRole } from "@/lib/speakers"

export function SpeakerGrid() {
  return (
    <div className="az-v2-speaker-grid" aria-label="Speakers at Agentic Zero 2026">
      {PUBLIC_SPEAKERS_2026.map((speaker) => {
        const Card = speaker.profileUrl ? "a" : "div"
        return (
        <Card
          id={speaker.slug}
          className="az-v2-speaker-card"
          href={speaker.profileUrl}
          key={speaker.slug}
          target={speaker.profileUrl ? "_blank" : undefined}
          rel={speaker.profileUrl ? "noopener noreferrer" : undefined}
          aria-label={speaker.profileUrl ? `View ${speaker.name}'s profile` : speaker.name}
        >
          <span className="az-v2-speaker-portrait">
            <img
              src={speaker.image}
              alt={speaker.alt}
              loading="lazy"
              style={speaker.slug === "adan-yu" ? { objectPosition: "50% 30%", transform: "scale(1.08)", transformOrigin: "50% 50%" } : speaker.slug === "brad-holden" ? { objectPosition: "50% 20%" } : speaker.slug === "mac" ? { objectPosition: "50% 0%" } : speaker.slug === "ian-dilick" ? { objectPosition: "58% 50%", transform: "scale(1.1)", transformOrigin: "50% 75%" } : speaker.slug === "ken-priyadarshi" ? { transform: "scale(1.5)", transformOrigin: "50% 35%" } : undefined}
            />
          </span>
          <div>
            <h4>{speaker.name}</h4>
            <p>{speakerDisplayRole(speaker)}</p>
          </div>
        </Card>
        )
      })}
    </div>
  )
}
