"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"

// One-click signup landing for email campaigns. The subscribe happens here,
// after the page loads, so link-prefetching scanners never create a row.
export default function ConfirmClient() {
  const params = useSearchParams()
  const email = (params.get("email") ?? "").trim()
  const source = params.get("source") ?? "mailing"
  const [status, setStatus] = useState<"loading" | "success" | "invalid" | "error">("loading")
  const submittedRef = useRef(false)

  useEffect(() => {
    if (submittedRef.current) return
    submittedRef.current = true

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("invalid")
      return
    }
    fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, company: "", source }),
    })
      .then((res) => setStatus(res.ok ? "success" : "error"))
      .catch(() => setStatus("error"))
  }, [email, source])

  return (
    <section
      className="az-v2-notify-section"
      style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}
    >
      <div className="az-v2-notify-frame">
        <div className="az-v2-description-card">
          <h2>Programme updates</h2>
          {status === "loading" && (
            <p className="az-v2-notify-success">Adding you to the list...</p>
          )}
          {status === "success" && (
            <p className="az-v2-notify-success">
              You're on the list. We'll send you Agentic Zero programme updates.
            </p>
          )}
          {(status === "invalid" || status === "error") && (
            <>
              <p className="az-v2-notify-error" style={{ fontSize: 16 }}>
                {status === "invalid"
                  ? "This link is missing a valid email."
                  : "Could not save your spot."}
              </p>
              <p>
                <a href="/#notify" style={{ color: "#f97316" }}>
                  Join the list at agenticzero.xyz
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
