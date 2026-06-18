import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  let email: unknown
  let company: unknown
  try {
    ;({ email, company } = await req.json())
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: hidden field real users never fill. Pretend success for bots.
  if (typeof company === 'string' && company.length > 0) {
    return NextResponse.json({ ok: true })
  }

  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
  }

  const webhookUrl = process.env.SHEETS_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('[subscribe] SHEETS_WEBHOOK_URL not set')
    return NextResponse.json({ error: 'Subscription service is not configured.' }, { status: 503 })
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source: 'website',
        submittedAt: new Date().toISOString(),
      }),
    })
    const text = await res.text()
    if (!res.ok) {
      throw new Error(`Sheets webhook responded ${res.status}: ${text.slice(0, 500)}`)
    }
    try {
      const result = JSON.parse(text)
      if (result?.ok === false) {
        throw new Error(`Sheets webhook rejected request: ${text.slice(0, 500)}`)
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.warn('[subscribe] Sheets webhook returned non-JSON response:', text.slice(0, 500))
      } else {
        throw error
      }
    }
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[subscribe] forward failed:', error)
    return NextResponse.json({ error: 'Could not save. Try again.' }, { status: 502 })
  }
}
