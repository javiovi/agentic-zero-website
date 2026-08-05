#!/usr/bin/env node
/**
 * Builds lib/sessions.ts from the session markdown in the authoring repo.
 *
 * Authoring lives in az-growth. Deploying lives here. Vercel clones only this
 * repo, so the site must never read the source path at build or request time:
 * it reads the committed lib/sessions.ts that this script produces.
 *
 * Run it whenever the source markdown changes, then commit the regenerated file:
 *
 *     node scripts/build-sessions.mjs
 *     git diff lib/sessions.ts
 *
 * Source defaults to ~/az-growth/content/sessions and can be overridden:
 *
 *     node scripts/build-sessions.mjs --source /path/to/sessions
 *     AZ_SESSIONS_SOURCE=/path/to/sessions node scripts/build-sessions.mjs
 *
 * This script is a local authoring tool. It is never run by `next build`.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, resolve, basename } from 'node:path'
import { homedir } from 'node:os'
import { parse as parseYaml } from 'yaml'

const DEFAULT_SOURCE = join(homedir(), 'az-growth', 'content', 'sessions')
const OUTPUT = resolve(process.cwd(), 'lib', 'sessions.ts')

// README.md documents the authoring rules; it is not a session.
const IGNORE = new Set(['README.md'])

function sourceDir() {
  const flagIndex = process.argv.indexOf('--source')
  if (flagIndex !== -1 && process.argv[flagIndex + 1]) return resolve(process.argv[flagIndex + 1])
  if (process.env.AZ_SESSIONS_SOURCE) return resolve(process.env.AZ_SESSIONS_SOURCE)
  return DEFAULT_SOURCE
}

/** Splits a file into its YAML front matter and its markdown body. */
function splitFrontMatter(raw, file) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) throw new Error(`${file}: no YAML front matter found`)
  return { frontMatter: match[1], body: match[2].trim() }
}

/**
 * Bodies are plain prose: paragraphs separated by blank lines, with hard
 * wrapping inside a paragraph that must be unwrapped. A `## ` line becomes a
 * heading. No body currently uses one, but the shape is supported so a future
 * page does not have to change the renderer.
 */
function parseBody(body) {
  return body
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const heading = block.match(/^##\s+(.*)$/)
      if (heading) return { type: 'heading', text: heading[1].trim() }
      return { type: 'paragraph', text: block.replace(/\s*\r?\n\s*/g, ' ') }
    })
}

function required(value, field, file) {
  if (value === undefined || value === null || value === '') {
    throw new Error(`${file}: missing required field "${field}"`)
  }
  return value
}

function parseSession(file, raw) {
  const { frontMatter, body } = splitFrontMatter(raw, file)
  const meta = parseYaml(frontMatter)

  const slug = required(meta.slug, 'slug', file)
  if (slug !== basename(file, '.md')) {
    throw new Error(`${file}: slug "${slug}" does not match the filename`)
  }

  const speakers = (meta.speakers ?? []).map((speaker) => ({
    name: required(speaker.name, 'speakers[].name', file),
    organisation: speaker.organisation ?? null,
    // Only moderators carry a role. Everyone else is a speaker.
    isModerator: speaker.role === 'moderator',
  }))

  return {
    slug,
    title: required(meta.title, 'title', file),
    format: required(meta.format, 'format', file),
    date: String(required(meta.date, 'date', file)),
    edition: required(meta.edition, 'edition', file),
    speakers,
    // Absent for the one slot that was not recorded.
    videoId: meta.video_id ?? null,
    duration: meta.duration ?? null,
    topics: meta.topics ?? [],
    startTime: required(meta.start_time, 'start_time', file),
    endTime: required(meta.end_time, 'end_time', file),
    body: parseBody(body),
  }
}

function main() {
  const dir = sourceDir()
  if (!existsSync(dir)) {
    console.error(`Source not found: ${dir}`)
    console.error('Pass --source <path> or set AZ_SESSIONS_SOURCE.')
    process.exit(1)
  }

  const files = readdirSync(dir)
    .filter((f) => f.endsWith('.md') && !IGNORE.has(f))
    .sort()

  if (files.length === 0) {
    console.error(`No session markdown found in ${dir}`)
    process.exit(1)
  }

  const sessions = files
    .map((file) => parseSession(file, readFileSync(join(dir, file), 'utf8')))
    .sort((a, b) => a.startTime.localeCompare(b.startTime))

  const editions = [...new Set(sessions.map((s) => s.edition))]
  const dates = [...new Set(sessions.map((s) => s.date))]

  const uniqueSpeakers = new Set(sessions.flatMap((s) => s.speakers.map((p) => p.name))).size

  const header = `// GENERATED FILE - DO NOT EDIT BY HAND.
//
// Source: session markdown in the az-growth authoring repo.
// Regenerate with:  node scripts/build-sessions.mjs
//
// This file is committed so the site builds from this repo alone. Vercel never
// sees the authoring repo.
//
// ${sessions.length} sessions, edition${editions.length === 1 ? '' : 's'}: ${editions.join(', ')}, date${dates.length === 1 ? '' : 's'}: ${dates.join(', ')}.
//
// SPEAKER COUNT: this file contains ${uniqueSpeakers} unique names. The rest of the site
// says 28 speakers. Both are correct and the difference is deliberate.
//
//   28 is the published programme figure. It counts the people billed on the
//   first-edition agenda, and it is the number used on the homepage, on
//   /what-is-agentic-finance, in llms.txt and in external material about the
//   event. Changing it would put the site out of step with what has already
//   been published elsewhere.
//
//   ${uniqueSpeakers} is how many people actually appeared. John Toman (Certora) presented
//   alongside Mooly Sagiv on the VeriSafe session but was not billed on the
//   agenda. He is named on that session page and in its JSON-LD because he was
//   there, which is what a session page records.
//
// So: do not "fix" 28 to ${uniqueSpeakers} sitewide, and do not remove the extra speaker from
// the source markdown to make the totals agree. They count different things.

export interface SessionSpeaker {
  name: string
  organisation: string | null
  isModerator: boolean
}

export type SessionBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }

export interface Session {
  slug: string
  title: string
  format: string
  date: string
  edition: string
  speakers: SessionSpeaker[]
  videoId: string | null
  duration: string | null
  topics: string[]
  startTime: string
  endTime: string
  body: SessionBlock[]
}

export const SESSIONS: Session[] = ${JSON.stringify(sessions, null, 2)}

export function getSession(slug: string): Session | undefined {
  return SESSIONS.find((session) => session.slug === slug)
}

/** Slug for the programme slot starting at "HH:MM", if a session page exists. */
export function sessionSlugByStartTime(startTime: string): string | undefined {
  return SESSIONS.find((session) => session.startTime === startTime)?.slug
}
`

  writeFileSync(OUTPUT, header)

  const withVideo = sessions.filter((s) => s.videoId).length
  console.log(`Wrote ${OUTPUT}`)
  console.log(`  source     ${dir}`)
  console.log(`  sessions   ${sessions.length}`)
  console.log(`  recordings ${withVideo} with video, ${sessions.length - withVideo} without`)
  console.log(`  formats    ${[...new Set(sessions.map((s) => s.format))].sort().join(', ')}`)
  console.log(`  speakers   ${new Set(sessions.flatMap((s) => s.speakers.map((p) => p.name))).size} unique`)
}

main()
