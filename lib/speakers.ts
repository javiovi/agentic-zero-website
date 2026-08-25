export type Speaker2026 = {
  slug: string
  name: string
  role: string
  company: string
  image: string
  alt: string
  profileUrl: string
}

export type FirstEditionSpeaker = {
  name: string
  role: string
  image: string
  profileUrl?: string
}

// Source of truth for the homepage, Event JSON-LD, and AI-readable event facts.
// Company affiliations are not treated as confirmed session topics.
export const SPEAKERS_2026: Speaker2026[] = [
  {
    slug: 'shaw-walters',
    name: 'Shaw Walters',
    role: 'Founder',
    company: 'Eliza Labs',
    image: '/images/speakers/shaw.jpg',
    alt: 'Shaw Walters',
    profileUrl: 'https://x.com/shawmakesmagic',
  },
  {
    slug: 'sam-green',
    name: 'Sam Green',
    role: 'Founder & CEO',
    company: 'Cambrian Network',
    image: '/images/speakers/sam.jpg',
    alt: 'Sam Green',
    profileUrl: 'https://x.com/0xsamgreen',
  },
  {
    slug: 'kevin-leffew',
    name: 'Kevin Leffew',
    role: 'AI GTM',
    company: 'Coinbase Developer Platform',
    image: '/images/speakers/kevin-leffew.jpg',
    alt: 'Kevin Leffew',
    profileUrl: 'https://x.com/kleffew94',
  },
]

// Anonymous teaser cards are visual only and never emitted as Person metadata.
export const UNANNOUNCED_SPEAKER_SLOTS = 2

export const FIRST_EDITION_SPEAKERS: FirstEditionSpeaker[] = [
  {
    name: 'Nader Dabit',
    role: 'Cognition, prev. Eigen Labs',
    image: '/images/speakers/Nader.jpg',
    profileUrl: 'https://x.com/dabit3',
  },
  {
    name: 'Sam Green',
    role: 'Founder & CEO, Cambrian Network',
    image: '/images/speakers/sam.jpg',
    profileUrl: 'https://x.com/0xsamgreen',
  },
  {
    name: 'Ken Ng',
    role: 'Head of Research & Co-Founder, Uniswap Foundation',
    image: '/images/speakers/Ken.jpg',
    profileUrl: 'https://x.com/nkennethk',
  },
  {
    name: 'Marco De Rossi',
    role: 'AI Lead, MetaMask',
    image: '/images/speakers/Marco-de-Rossi.jpg',
    profileUrl: 'https://x.com/marco_derossi',
  },
  {
    name: 'Shaw Walters',
    role: 'Founder, Eliza Labs',
    image: '/images/speakers/shaw.jpg',
    profileUrl: 'https://x.com/shawmakesmagic',
  },
  {
    name: 'Nicolás Montone',
    role: 'Software Engineer, Vercel',
    image: '/images/speakers/nicolas.jpeg',
    profileUrl: 'https://x.com/montonenico',
  },
  {
    name: 'E. G.',
    role: 'Co-founder, Infura & DIN (Consensys)',
    image: '/images/speakers/eg.jpg',
    profileUrl: 'https://x.com/egalano',
  },
  {
    name: 'Juan Irungaray',
    role: 'Google Cloud Architect',
    image: '/images/speakers/juan.jpg',
    profileUrl: 'https://x.com/jirungaray',
  },
  {
    name: 'Nick Emmons',
    role: 'Founder & CEO, Allora Labs',
    image: '/images/speakers/nick-allora.jpg',
    profileUrl: 'https://x.com/nickemmons',
  },
  {
    name: 'Gauthier Vila',
    role: 'Core Contributor & Founder, ZyFAI',
    image: '/images/speakers/gauthier.jpg',
    profileUrl: 'https://x.com/goatv_bk',
  },
  {
    name: 'Stefano Bury',
    role: 'Head of US, Virtuals Protocol',
    image: '/images/speakers/stefano.jpg',
    profileUrl: 'https://x.com/0xbury',
  },
  {
    name: 'Renç Korzay',
    role: 'CEO, Giza',
    image: '/images/speakers/Renc.jpg',
    profileUrl: 'https://x.com/renckorzay',
  },
  {
    name: 'Jessy',
    role: 'Fast, prev. Ethereum Foundation dAI',
    image: '/images/speakers/jessy-eth.jpg',
    profileUrl: 'https://x.com/13yearoldvc',
  },
  {
    name: 'Mooly Sagiv',
    role: 'Chief Scientist, Certora',
    image: '/images/speakers/mooly.jpg',
    profileUrl: 'https://x.com/SagivMooly',
  },
  {
    name: 'Rahul Kothari',
    role: 'Ethereum Foundation, prev. Aztec',
    image: '/images/speakers/Rahul_Kothari_AZTEC.jpg',
    profileUrl: 'https://x.com/omw_to_the_moon',
  },
  {
    name: 'Valentin Mihov',
    role: 'Co-founder, Daedalus Angels & Finexify',
    image: '/images/speakers/valentin.jpg',
    profileUrl: 'https://x.com/valentinmihov',
  },
  {
    name: 'Davide Crapis',
    role: 'AI Lead, Ethereum Foundation (dAI Team)',
    image: '/images/speakers/davide.jpg',
    profileUrl: 'https://x.com/DavideCrapis',
  },
  {
    name: 'Artem Kotelskiy',
    role: 'Head of Blockchain Research, cyber•Fund',
    image: '/images/speakers/artem.jpg',
    profileUrl: 'https://x.com/artofkot',
  },
  {
    name: 'Shafu',
    role: 'Smart Contract Engineer, Merit Systems',
    image: '/images/speakers/sharif.jpg',
    profileUrl: 'https://x.com/shafu0x',
  },
  {
    name: 'Lukasz Stoczynski',
    role: 'Head of GTM, Mimic',
    image: '/images/speakers/Lukaz.jpg',
    profileUrl: 'https://x.com/stoczek_eth',
  },
  {
    name: 'Chris Wessels',
    role: 'Founder, GraphOps & Summerstone',
    image: '/images/speakers/chris.jpg',
    profileUrl: 'https://x.com/undefinedza',
  },
  {
    name: 'Sandi Fatic',
    role: 'CEO, Calimero Network',
    image: '/images/speakers/Chef Sale.jpg',
    profileUrl: 'https://x.com/chefsale',
  },
  {
    name: 'Ricky Esclapon',
    role: 'Data Agent Architect, Cambrian Network',
    image: '/images/speakers/Ricky.jpg',
    profileUrl: 'https://x.com/rickydata42',
  },
  {
    name: 'Quintus Kilbourn',
    role: 'Cryptoeconomics Researcher, Flashbots',
    image: '/images/speakers/quintus.jpg',
    profileUrl: 'https://x.com/0xQuintus',
  },
  {
    name: 'Michael Sena',
    role: 'Co-founder, Recall Labs',
    image: '/images/speakers/sena-recall.jpg',
    profileUrl: 'https://x.com/dataliquidity',
  },
  {
    name: 'Sumeet Chougule',
    role: 'Team Lead, ChaosChain (Nethermind)',
    image: '/images/speakers/sumeet.jpg',
    profileUrl: 'https://x.com/_sumeetc',
  },
  {
    name: 'Simon Emanuel Schmid',
    role: 'Developer Relations, ENS',
    image: '/images/speakers/simon.png',
    profileUrl: 'https://x.com/schmidsi',
  },
  {
    name: 'Clemens',
    role: 'Head of Marketing & AI, DIN',
    image: '/images/speakers/clemens.jpg',
    profileUrl: 'https://x.com/imseelemons',
  },
]

export function speakerDisplayRole(speaker: Speaker2026) {
  return `${speaker.role}, ${speaker.company}`
}
