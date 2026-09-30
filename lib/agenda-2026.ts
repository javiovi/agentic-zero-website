import { SPEAKERS_2026, type Speaker2026 } from './speakers'

// Agenda tab, read September 29, 2026. Session copy and running order are
// preserved; private operational columns are intentionally not copied.
// https://docs.google.com/spreadsheets/d/12vQesnwnj6WfO-s5ywcqSLi0sksctkvuY43nXZtkJiY/edit#gid=1418131223
export type AgendaParticipant = {
  speaker: Pick<Speaker2026, 'slug' | 'name' | 'role' | 'company'> & Partial<Pick<Speaker2026, 'image' | 'profileUrl'>>
  moderator?: boolean
}
export type AgendaSession = {
  id: string
  start: string
  end?: string
  format: string
  title: string
  description?: string
  participants: AgendaParticipant[]
  break?: boolean
}

function participant(slug: string, moderator = false): AgendaParticipant {
  const speaker = SPEAKERS_2026.find((entry) => entry.slug === slug)
  if (!speaker) throw new Error(`Missing agenda speaker: ${slug}`)
  return { speaker, moderator }
}

export const AGENDA_2026: AgendaSession[] = [
  { id: 'registration', start: '09:00', format: 'Arrival', title: 'Registration & Snacks', participants: [], break: true },
  {
    id: 'onchain-economy', start: '10:00', end: '10:30', format: 'Panel',
    title: 'The Evolution of Digital Assets & The Onchain Economy',
    description: 'As AI agents become fundamental economic actors, digital assets like RWAs, stablecoins, and tokenized stocks are playing a crucial role. In this panel, we will discuss how the onchain economy is evolving and how agentic systems are shaping capital management.',
    participants: [participant('mickey-negus'), participant('brad-holden'), participant('danny-organ'), participant('adam-zion', true)],
  },
  {
    id: 'autonomous-capital', start: '10:35', end: '11:05', format: 'Panel',
    title: 'Building for Autonomous Capital',
    description: 'What does infrastructure look like when capital can move, allocate, and act on its own? This panel explores the systems, protocols, and primitives being built for a world of autonomous capital.',
    participants: [participant('chris-johnson'), participant('adan-yu'), participant('michael-dressler'), participant('manuel-alzuru', true)],
  },
  {
    id: 'agentic-finance', start: '11:10', end: '11:45', format: 'Panel',
    title: 'The Rise of Agentic Finance',
    description: 'This panel explores how agents are starting to transact, invest, manage risk & interact with financial markets, plus what this means for the future of finance.',
    participants: [participant('julian-love'), participant('sam-green'), participant('rishin-sharma'), participant('ken-priyadarshi'), participant('kevin-jones', true)],
  },
  {
    id: 'rails-of-money', start: '11:50', end: '12:20', format: 'Panel',
    title: 'Rebuilding the Rails of Money',
    description: 'Agentic commerce is projected to reach $3–$5 trillion by 2030. But today’s financial infrastructure was built for humans, not machines. This panel explores the new payment rails, stablecoins, and financial primitives being built for an agent-driven economy.',
    participants: [participant('gianluca-minoprio'), participant('sarthak-basak'), participant('manuel-beaudroit'), participant('francesco-renzi', true)],
  },
  {
    id: 'agent-infrastructure', start: '12:25', end: '12:55', format: 'Panel',
    title: 'Next generation infrastructure for agents',
    description: 'What infrastructure do agents need to operate reliably at scale? From deployment and developer tools to identity, trust, and payments, this panel explores the foundations that enable agents to interact with people, services, and each other.',
    participants: [participant('nicolas-montone'), participant('chandler-fang'), participant('ian-dilick'), participant('edwin-rager', true)],
  },
  { id: 'lunch', start: '13:00', end: '14:00', format: 'Break', title: 'Lunch', participants: [], break: true },
  {
    id: 'agentic-operating-systems', start: '14:00', end: '14:20', format: 'Keynote',
    title: 'The future of agentic operating systems',
    description: 'Shaw will talk about the qualities and properties of a future agent OS, why you would want it and what the world looks like in a post-Apple world.',
    participants: [participant('shaw-walters')],
  },
  {
    id: 'agentic-banking', start: '14:25', end: '14:45', format: 'Keynote + demo',
    title: 'Building the Agentic Banking Layer for Latin America',
    description: 'After five years building crypto-powered financial products for 3.58M registered users and US$7.1B in total flows, belo is unveiling the agentic banking layer for Latin America’s 600M+ people that will enable humans and AI agents to operate accounts, payments, cards, treasury and crypto through one programmable financial layer.',
    participants: [participant('manuel-beaudroit')],
  },
  {
    id: 'calimero-keynote', start: '14:50', end: '15:10', format: 'Keynote',
    title: "The Cloud Knows Everything. Let's Build One That Can't.",
    description: "Calimero is unveiling a cloud that can't look: an open-source platform that lets humans and AI agents share data, run apps and act on each other's behalf, on their own devices and on sealed hardware that even its operator can't read.",
    participants: [participant('sandi-fatic')],
  },
  {
    id: 'vapi-demo', start: '15:10', end: '15:30', format: 'Demo',
    title: 'vAPI demo',
    description: 'vAPI Network is an onchain marketplace where agents and humans buy and sell work, with agreed task terms and funds held in escrow until review.',
    participants: [participant('mac')],
  },
  {
    id: '1claw-demo', start: '15:35', end: '15:55', format: 'Demo',
    title: '1Claw demo',
    description: '1Claw lets AI agents use credentials, sign transactions and call APIs without holding the underlying keys.',
    participants: [participant('kevin-jones')],
  },
]

export function agendaTime(value: string) {
  const [hour, minute] = value.split(':')
  const hours = Number(hour)
  return `${String(hours % 12 || 12).padStart(2, '0')}:${minute} ${hours < 12 ? 'AM' : 'PM'}`
}
