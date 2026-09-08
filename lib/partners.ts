// Keep the marquee order separate from the Partners section presentation order.
export const SPONSORS_2026 = [
  {
    name: "Calimero",
    logo: "/images/logos/calimero_white.png",
    website: "https://calimero.network/",
  },
  {
    name: "Solana",
    logo: "/images/logos/solana.png",
    website: "https://solana.com/",
  },
  {
    name: "QuickNode",
    logo: "/images/logos/quicknode-logo-white.svg",
    website: "https://www.quicknode.com/",
  },
  {
    name: "Cambrian Network",
    logo: "/images/logos/cambrian_green.png",
    website: "https://cambrian.org/",
  },
  {
    name: "Belo",
    logo: "/images/logos/belo-color.png",
    website: "https://www.belo.app/",
  },
]

export const PARTNERS_2026 = ["Solana", "Belo", "Calimero", "QuickNode", "Cambrian Network"].map(
  (name) => SPONSORS_2026.find((sponsor) => sponsor.name === name)!
)

export const MEDIA_PARTNER_2026 = {
  name: 'ETH Daily',
  website: 'https://ethdaily.io',
  logo: '/images/logos/ethdaily_logo_bw.png',
  profileUrl: 'https://x.com/ethdaily',
}
