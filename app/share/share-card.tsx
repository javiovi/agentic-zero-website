'use client'

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type PointerEvent } from 'react'
import { ArrowDownToLine, ArrowRight, ImagePlus, LoaderCircle, RotateCcw } from 'lucide-react'
import { CARD_SIZE, PHOTO, normalizeHandle, photoBounds } from '@/lib/share-card'
import styles from './share.module.css'

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Image could not be loaded.'))
    image.src = src
  })
}

function fittedText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, size: number, family: string) {
  ctx.font = `400 ${size}px ${family}`
  while (ctx.measureText(text).width > maxWidth && size > 16) ctx.font = `400 ${--size}px ${family}`
  while (ctx.measureText(text).width > maxWidth && text.length > 1) text = text.slice(0, -2).trimEnd() + "…"
  ctx.fillText(text, x, y)
}

export default function ShareCard() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const operation = useRef(0)
  const controller = useRef<AbortController | null>(null)
  const drag = useRef<{ x: number; y: number; cropX: number; cropY: number } | null>(null)
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null)
  const [logo, setLogo] = useState<HTMLImageElement | null>(null)
  const [techWeekLogo, setTechWeekLogo] = useState<HTMLImageElement | null>(null)
  const [fonts, setFonts] = useState<{ sans: string; mono: string } | null>(null)
  const [handleInput, setHandleInput] = useState('')
  const [handle, setHandle] = useState('')
  const [name, setName] = useState('')
  const [zoom, setZoom] = useState(1)
  const [cropX, setCropX] = useState(0.5)
  const [cropY, setCropY] = useState(0.5)
  const [busy, setBusy] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let active = true
    async function prepare() {
      try {
        const css = getComputedStyle(document.documentElement)
        const sans = css.getPropertyValue('--font-sans').trim() || 'sans-serif'
        const mono = css.getPropertyValue('--font-mono').trim() || 'monospace'
        const [brand, techWeek] = await Promise.all([
          loadImage('/images/logo.svg'), loadImage('/images/logos/techweek-sf-white.png'), document.fonts.load(`40px ${sans}`), document.fonts.load(`40px ${mono}`),
        ])
        if (active) { setLogo(brand); setTechWeekLogo(techWeek); setFonts({ sans, mono }) }
      } catch { if (active) setError('The card couldn’t load. Refresh the page to try again.') }
    }
    void prepare()
    return () => { active = false; operation.current++; controller.current?.abort() }
  }, [])

  useEffect(() => {
    const ctx = canvas.current?.getContext('2d')
    if (!ctx || !fonts || !logo || !techWeekLogo) return
    const background = ctx.createLinearGradient(0, 0, 0, CARD_SIZE)
    background.addColorStop(0, '#0a0b0f')
    background.addColorStop(1, '#191a22')
    ctx.fillStyle = background
    ctx.fillRect(0, 0, CARD_SIZE, CARD_SIZE)

    ctx.fillStyle = '#ff750d'
    ctx.font = `400 38px ${fonts.mono}`
    ctx.fillText('I’m attending', 90, 108)
    ctx.drawImage(techWeekLogo, 811.8, 90, 178.2, 90)

    ctx.fillStyle = '#ff750d'
    ctx.font = `400 88px ${fonts.mono}`
    ctx.textAlign = 'left'
    ctx.fillText('Agentic Zero', 90, 208)

    // Three offset outlines recreate the layered portrait treatment in the speaker cards.
    ctx.strokeStyle = '#ff750d'
    ctx.lineWidth = 6
    for (let layer = 3; layer >= 1; layer--) {
      const offset = layer * 28
      ctx.beginPath()
      ctx.roundRect(PHOTO.x + offset, PHOTO.y - offset, PHOTO.size, PHOTO.size, 10)
      ctx.stroke()
    }
    ctx.save()
    ctx.beginPath(); ctx.roundRect(PHOTO.x, PHOTO.y, PHOTO.size, PHOTO.size, 10); ctx.clip()
    if (photo) {
      const bounds = photoBounds(photo.naturalWidth, photo.naturalHeight, zoom, cropX, cropY)
      ctx.drawImage(photo, bounds.x, bounds.y, bounds.w, bounds.h)
    } else {
      ctx.fillStyle = '#242237'; ctx.fillRect(PHOTO.x, PHOTO.y, PHOTO.size, PHOTO.size)
      ctx.fillStyle = '#9f98ff'
      ctx.beginPath(); ctx.arc(PHOTO.x + PHOTO.size / 2, PHOTO.y + PHOTO.size * 0.358, PHOTO.size * 0.171, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(PHOTO.x + PHOTO.size / 2, PHOTO.y + PHOTO.size * 0.956, PHOTO.size * 0.404, Math.PI, 0); ctx.fill()
    }
    ctx.restore()
    ctx.strokeStyle = '#ff750d'; ctx.lineWidth = 6
    ctx.beginPath(); ctx.roundRect(PHOTO.x, PHOTO.y, PHOTO.size, PHOTO.size, 10); ctx.stroke()

    ctx.fillStyle = '#ff750d'
    ctx.textAlign = 'center'
    fittedText(ctx, name.trim() || 'Your name', PHOTO.x + PHOTO.size / 2, 841, 600, 40, fonts.mono)
    if (handle) {
      ctx.fillStyle = '#9f98ff'
      fittedText(ctx, `@${handle}`, PHOTO.x + PHOTO.size / 2, 900, 810, 27, fonts.mono)
    }
    ctx.textAlign = 'left'
    ctx.fillStyle = '#9f98ff'; ctx.font = `400 46px ${fonts.mono}`
    ctx.fillText('October 7', 90, 938)
    ctx.font = `400 36px ${fonts.mono}`
    ctx.fillText('The Avalon, San Francisco', 90, 988)
    ctx.drawImage(logo, 837, 896.4, 153, 93.6)
    setReady(true)
  }, [photo, logo, techWeekLogo, fonts, name, handle, zoom, cropX, cropY])

  function resetCrop() { setZoom(1); setCropX(0.5); setCropY(0.5) }
  function startOperation() {
    controller.current?.abort()
    const id = ++operation.current
    setBusy(true); setError(''); setNotice('')
    return id
  }

  async function fetchProfile(event: FormEvent) {
    event.preventDefault()
    const normalized = normalizeHandle(handleInput)
    if (!normalized) { setError('Enter a valid X handle, such as @AgenticZero.'); return }
    const id = startOperation()
    const requestController = new AbortController()
    controller.current = requestController
    const timer = window.setTimeout(() => requestController.abort(), 20000)
    try {
      const response = await fetch(`/api/share-profile?handle=${encodeURIComponent(normalized)}`, { signal: requestController.signal })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'We couldn’t load that profile. Upload a photo instead.')
      const image = await loadImage(result.photo)
      if (id !== operation.current) return
      setPhoto(image); setName(result.name); setHandle(result.handle); resetCrop()
      setNotice('Profile loaded. Your card is ready to export.')
    } catch (error) {
      if (id === operation.current) setError(error instanceof Error && error.name !== 'AbortError' ? error.message : 'X is taking too long. Try again or upload a photo.')
    } finally {
      clearTimeout(timer)
      if (id === operation.current) setBusy(false)
    }
  }

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { setError('Choose a JPG, PNG, or WebP photo.'); return }
    if (file.size > 10 * 1024 * 1024) { setError('Choose a photo smaller than 10 MB.'); return }
    const id = startOperation()
    const url = URL.createObjectURL(file)
    try {
      const image = await loadImage(url)
      if (id !== operation.current) return
      setPhoto(image); resetCrop(); setNotice('Photo added. Your card is ready to export.')
    } catch { if (id === operation.current) setError('That photo couldn’t be opened. Try another JPG or PNG.') }
    finally { URL.revokeObjectURL(url); if (id === operation.current) setBusy(false) }
  }

  async function exportCard() {
    if (!canvas.current || !photo || !ready || busy || exporting) return
    setExporting(true); setError(''); setNotice('')
    try {
      const blob = await new Promise<Blob>((resolve, reject) => canvas.current!.toBlob(value => value ? resolve(value) : reject(new Error()), 'image/jpeg', 0.95))
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url; link.download = `agentic-zero-${handle || 'attending'}.jpg`
      document.body.appendChild(link); link.click(); link.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 60000)
      setNotice('Your JPG is ready. See you at Agentic Zero!')
    } catch { setError('The JPG couldn’t be exported. Please try again.') }
    finally { setExporting(false) }
  }

  function startDrag(event: PointerEvent<HTMLCanvasElement>) {
    if (!photo || busy) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) * CARD_SIZE / rect.width
    const y = (event.clientY - rect.top) * CARD_SIZE / rect.height
    if (x < PHOTO.x || x > PHOTO.x + PHOTO.size || y < PHOTO.y || y > PHOTO.y + PHOTO.size) return
    drag.current = { x: event.clientX, y: event.clientY, cropX, cropY }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function moveDrag(event: PointerEvent<HTMLCanvasElement>) {
    if (!drag.current || !photo) return
    const factor = CARD_SIZE / event.currentTarget.getBoundingClientRect().width
    const { w, h } = photoBounds(photo.naturalWidth, photo.naturalHeight, zoom, cropX, cropY)
    const clamp = (value: number) => Math.max(0, Math.min(1, value))
    if (w > PHOTO.size) setCropX(clamp(drag.current.cropX - (event.clientX - drag.current.x) * factor / (w - PHOTO.size)))
    if (h > PHOTO.size) setCropY(clamp(drag.current.cropY - (event.clientY - drag.current.y) * factor / (h - PHOTO.size)))
  }

  const loading = busy || (!ready && !error)
  return <section className={styles.editor} aria-label="Attendee card generator">
    <div className={styles.previewColumn}>
      <div className={styles.previewLabel}><span>YOUR ATTENDEE CARD</span><span>1080 × 1080 · JPG</span></div>
      <div className={styles.preview} aria-busy={loading}>
        <canvas ref={canvas} width={CARD_SIZE} height={CARD_SIZE} role="img" aria-label={`I’m attending Agentic Zero. ${name || 'Your name'}${handle ? `, @${handle}` : ''}. October 7, 2026, The Avalon, San Francisco.`}
          onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }} />
        {loading && <div className={styles.loading} role="status"><LoaderCircle className={styles.spin} size={24} /> Generating…</div>}
      </div>
      <p className={styles.previewHint}>{photo ? 'Drag your photo to reposition it, or use the controls.' : 'Your photo goes here. Make it yours →'}</p>
    </div>
    <div className={styles.controls}>
      <h2>Make it yours.</h2>
      <p>Add your X handle to use your profile photo, or upload one you like.</p>
      <form onSubmit={fetchProfile} className={styles.profileForm}>
        <label htmlFor="x-handle">X / Twitter handle</label>
        <div className={styles.handleRow}>
          <input id="x-handle" value={handleInput} onChange={e => setHandleInput(e.target.value)} placeholder="@yourhandle" autoComplete="off" spellCheck={false} maxLength={80} disabled={busy} />
          <button type="submit" disabled={busy || !handleInput.trim()} aria-label="Use X profile">{busy ? <LoaderCircle className={styles.spin} size={20} /> : <ArrowRight size={21} />}</button>
        </div>
      </form>
      <div className={styles.or}><span />or<span /></div>
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} hidden aria-label="Choose a photo" />
      <button className={styles.upload} type="button" onClick={() => input.current?.click()} disabled={busy}><ImagePlus size={20} />{photo ? 'Upload a different photo' : 'Upload a photo'}</button>
      <p className={styles.fileHint}>JPG, PNG or WebP · up to 10 MB<br />Uploaded photos stay in your browser.</p>
      <div className={styles.details}>
        <label htmlFor="card-name">Your name</label>
        <input id="card-name" placeholder="Your name" value={name} maxLength={60} onChange={e => setName(e.target.value)} disabled={busy} />
        <label htmlFor="card-handle">Handle on card <span>(optional)</span></label>
        <input id="card-handle" placeholder="@yourhandle" value={handle ? `@${handle}` : ''} maxLength={16} onChange={e => setHandle(e.target.value.replace(/^@/, '').replace(/[^A-Za-z0-9_]/g, '').slice(0, 15))} disabled={busy} />
      </div>
      {photo && <fieldset className={styles.crop} disabled={busy}>
        <legend>Adjust photo</legend>
        <label>Zoom<input aria-label="Photo zoom" type="range" min="1" max="3" step="0.01" value={zoom} onChange={e => setZoom(Number(e.target.value))} /></label>
        <label>Left / right<input aria-label="Photo horizontal position" type="range" min="0" max="1" step="0.01" value={cropX} onChange={e => setCropX(Number(e.target.value))} /></label>
        <label>Up / down<input aria-label="Photo vertical position" type="range" min="0" max="1" step="0.01" value={cropY} onChange={e => setCropY(Number(e.target.value))} /></label>
        <button type="button" onClick={resetCrop}><RotateCcw size={13} />Reset crop</button>
      </fieldset>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      <button className={styles.export} type="button" onClick={exportCard} disabled={!photo || !ready || busy || exporting}>
        {busy || exporting ? <LoaderCircle className={styles.spin} size={19} /> : <ArrowDownToLine size={19} />}
        {busy ? 'Generating…' : exporting ? 'Exporting…' : 'Export JPG'}
      </button>
      <p className={styles.notice} role="status">{notice || 'Ready for X, LinkedIn and Instagram.'}</p>
    </div>
  </section>
}
