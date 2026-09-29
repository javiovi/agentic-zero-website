export const CARD_SIZE = 1080
export const PHOTO = { x: 293, y: 360, size: 410 }

export function normalizeHandle(value: string): string | null {
  const handle = value.trim().replace(/^https?:\/\/(?:www\.)?(?:x|twitter)\.com\//i, '').replace(/^@/, '').replace(/\/$/, '')
  return /^[A-Za-z0-9_]{1,15}$/.test(handle) ? handle : null
}

export function photoBounds(width: number, height: number, zoom: number, x: number, y: number) {
  const scale = Math.max(PHOTO.size / width, PHOTO.size / height) * zoom
  const w = width * scale
  const h = height * scale
  return { x: PHOTO.x - (w - PHOTO.size) * x, y: PHOTO.y - (h - PHOTO.size) * y, w, h }
}
