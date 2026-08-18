// Shared site footer. Used by the homepage and /agenda.
// The archive page at /first-edition/agenda keeps its own period footer on purpose.
export function SiteFooter() {
  return (
    <footer className="az-v2-footer">
      <div className="az-v2-footer-inner">
        <div className="az-v2-footer-top">
          <div className="az-v2-footer-brand">
            <h2>
              <span>Agentic</span> <span>Zero</span>
            </h2>
          </div>

          <div className="az-v2-footer-follow">
            <span>Follow Our Socials</span>
            <div className="az-v2-footer-social" aria-label="Social links">
              <a href="https://x.com/AgenticZero" target="_blank" rel="noopener noreferrer" aria-label="Agentic Zero on X">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true">
                  <path d="M453.2 112H523.8L369.6 288.2L551 528H409L297.7 382.6L170.5 528H99.8L264.7 339.5L90.8 112H236.4L336.9 244.9L453.2 112ZM428.4 485.8H467.5L215.1 152H173.1L428.4 485.8Z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/agentic-zero-ai" target="_blank" rel="noopener noreferrer" aria-label="Agentic Zero on LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04c-1.85 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85c3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12a2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V9H7.1v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@agenticzeroxyz" target="_blank" rel="noopener noreferrer" aria-label="Agentic Zero on YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <p className="az-v2-footer-links">
          <a href="/blog/what-is-agentic-zero">What is Agentic Zero?</a>
          <a href="/agenda">Agenda 2026</a>
          <a href="/first-edition/agenda">Agenda 2025</a>
        </p>

        <p className="az-v2-footer-questions">
          Questions? Email us at <a href="mailto:contact@agenticzero.xyz">contact@agenticzero.xyz</a>
        </p>
      </div>
      <p className="az-v2-footer-bottom">2026 Agentic Zero. All rights reserved.</p>
    </footer>
  )
}
