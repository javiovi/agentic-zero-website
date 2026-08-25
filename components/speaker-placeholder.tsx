// Visual teaser only. It is deliberately not represented in speaker data or
// structured metadata until a name is publicly announced.
export function SpeakerSilhouette({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 250"
      role="img"
      aria-label="Speaker to be announced"
      focusable="false"
    >
      <rect width="200" height="250" fill="#0f0f10" />
      <g fill="rgba(249, 115, 22, 0.32)">
        <circle cx="100" cy="94" r="34" />
        <path d="M100 138c-31 0-56 21-60 49a4 4 0 0 0 4 5h112a4 4 0 0 0 4-5c-4-28-29-49-60-49Z" />
      </g>
    </svg>
  )
}
