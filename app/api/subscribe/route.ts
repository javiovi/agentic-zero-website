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
    console.log('[subscribe] SHEETS_WEBHOOK_URL not set, received:', email)
    return NextResponse.json({ ok: true })
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'website' }),
    })
    if (!res.ok) throw new Error(`Sheets webhook responded ${res.status}`)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[subscribe] forward failed:', error)
    return NextResponse.json({ error: 'Could not save. Try again.' }, { status: 502 })
  }
}
