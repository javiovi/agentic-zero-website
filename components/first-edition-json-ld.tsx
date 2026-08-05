// Schema.org Event markup for the first edition (archive page).
//
// Times are the first and last session of the day, from the session data in
// lib/sessions.ts, which is generated from the az-growth authoring repo. The
// venue address came from the original agenda component's add-to-calendar
// links; that component has since been removed, so this block is now the only
// record of the street address in this repo.
//
// Compound affiliation strings are split into arrays of real organizations,
// because a combined string asserts an organization that does not exist:
//   "Cha0s & Nethermind"     -> ChaosChain, Nethermind
//   "Infura & DIN"           -> Infura, DIN
//   "Infura/DIN"             -> Infura, DIN
//   "Vercel (v0)"            -> Vercel
//   "ElizaOS (Eliza Labs)"   -> Eliza Labs
//   "Daedalus Angels"        -> Daedalus Angels, Finexify
//     (this moderator entry originally read "Co-Founder, Daedalus Angels and Finexify")
//
// Deliberately omitted because the site does not state them:
//   offers      — the first edition ticket vendor is gone, no archived price data
//   postalCode  — the published address has no separate postal code field
const firstEdition = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Agentic Zero, first edition",
  "description": "The first edition of Agentic Zero, a one-day summit on agentic systems, held in Buenos Aires. 28 speakers across DeFi agents, infrastructure, verifiability, security, agent trust, discovery, agent payments, and the agentic stack.",
  "url": "https://agenticzero.xyz/first-edition/agenda",
  "startDate": "2025-11-20T10:00:00-03:00",
  "endDate": "2025-11-20T17:00:00-03:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "La Rural",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Sarmiento 2704",
      "addressLocality": "Ciudad Autónoma de Buenos Aires",
      "addressCountry": "AR"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Agentic Zero",
    "url": "https://agenticzero.xyz",
    "email": "contact@agenticzero.xyz",
    "sameAs": [
      "https://x.com/AgenticZero",
      "https://www.linkedin.com/company/agentic-zero-ai",
      "https://www.youtube.com/@agenticzeroxyz"
    ]
  },
  "performer": [
    {
      "@type": "Person",
      "name": "Marco De Rossi",
      "affiliation": {
        "@type": "Organization",
        "name": "MetaMask"
      }
    },
    {
      "@type": "Person",
      "name": "Sumeet Chougule",
      "affiliation": [
        {
          "@type": "Organization",
          "name": "ChaosChain"
        },
        {
          "@type": "Organization",
          "name": "Nethermind"
        }
      ]
    },
    {
      "@type": "Person",
      "name": "Davide Crapis",
      "affiliation": {
        "@type": "Organization",
        "name": "Ethereum Foundation"
      }
    },
    {
      "@type": "Person",
      "name": "Quintus Kilbourn",
      "affiliation": {
        "@type": "Organization",
        "name": "Flashbots"
      }
    },
    {
      "@type": "Person",
      "name": "Simon Emanuel Schmid",
      "affiliation": {
        "@type": "Organization",
        "name": "ENS"
      }
    },
    {
      "@type": "Person",
      "name": "Shafu",
      "affiliation": {
        "@type": "Organization",
        "name": "Merit Systems"
      }
    },
    {
      "@type": "Person",
      "name": "Rahul Kothari",
      "affiliation": {
        "@type": "Organization",
        "name": "Aztec"
      }
    },
    {
      "@type": "Person",
      "name": "Nick Emmons",
      "affiliation": {
        "@type": "Organization",
        "name": "Allora Labs"
      }
    },
    {
      "@type": "Person",
      "name": "E.G. Galano",
      "affiliation": [
        {
          "@type": "Organization",
          "name": "Infura"
        },
        {
          "@type": "Organization",
          "name": "DIN"
        }
      ]
    },
    {
      "@type": "Person",
      "name": "Sam Green",
      "affiliation": {
        "@type": "Organization",
        "name": "Cambrian Network"
      }
    },
    {
      "@type": "Person",
      "name": "Nicolás Montone",
      "affiliation": {
        "@type": "Organization",
        "name": "Vercel"
      }
    },
    {
      "@type": "Person",
      "name": "Juan Irungaray",
      "affiliation": {
        "@type": "Organization",
        "name": "Google"
      }
    },
    {
      "@type": "Person",
      "name": "Nader Dabit",
      "affiliation": {
        "@type": "Organization",
        "name": "Eigen Labs"
      }
    },
    {
      "@type": "Person",
      "name": "Clemens",
      "affiliation": [
        {
          "@type": "Organization",
          "name": "Infura"
        },
        {
          "@type": "Organization",
          "name": "DIN"
        }
      ]
    },
    {
      "@type": "Person",
      "name": "Chris Wessels",
      "affiliation": {
        "@type": "Organization",
        "name": "GraphOps"
      }
    },
    {
      "@type": "Person",
      "name": "Artem Kotelskiy",
      "affiliation": {
        "@type": "Organization",
        "name": "cyber•Fund"
      }
    },
    {
      "@type": "Person",
      "name": "Ricky Esclapon",
      "affiliation": {
        "@type": "Organization",
        "name": "Cambrian Network"
      }
    },
    {
      "@type": "Person",
      "name": "Shaw Walters",
      "affiliation": {
        "@type": "Organization",
        "name": "Eliza Labs"
      }
    },
    {
      "@type": "Person",
      "name": "Renç Korzay",
      "affiliation": {
        "@type": "Organization",
        "name": "Giza"
      }
    },
    {
      "@type": "Person",
      "name": "Ken Ng",
      "affiliation": {
        "@type": "Organization",
        "name": "Uniswap Foundation"
      }
    },
    {
      "@type": "Person",
      "name": "Lukasz Stoczynski",
      "affiliation": {
        "@type": "Organization",
        "name": "Mimic"
      }
    },
    {
      "@type": "Person",
      "name": "Gauthier Vila",
      "affiliation": {
        "@type": "Organization",
        "name": "ZyFAI"
      }
    },
    {
      "@type": "Person",
      "name": "Stefano Bury",
      "affiliation": {
        "@type": "Organization",
        "name": "Virtuals"
      }
    },
    {
      "@type": "Person",
      "name": "Valentin Mihov",
      "affiliation": [
        {
          "@type": "Organization",
          "name": "Daedalus Angels"
        },
        {
          "@type": "Organization",
          "name": "Finexify"
        }
      ]
    },
    {
      "@type": "Person",
      "name": "Michael Sena",
      "affiliation": {
        "@type": "Organization",
        "name": "Recall"
      }
    },
    {
      "@type": "Person",
      "name": "Mooly Sagiv",
      "affiliation": {
        "@type": "Organization",
        "name": "Certora"
      }
    },
    {
      "@type": "Person",
      "name": "Jessy EF",
      "affiliation": {
        "@type": "Organization",
        "name": "Ethereum Foundation"
      }
    },
    {
      "@type": "Person",
      "name": "Sandi Fatic",
      "affiliation": {
        "@type": "Organization",
        "name": "Calimero Network"
      }
    }
  ]
}

export function FirstEditionJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(firstEdition) }}
    />
  )
}
