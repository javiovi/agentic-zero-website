// GENERATED FILE - DO NOT EDIT BY HAND.
//
// Source: session markdown in the az-growth authoring repo.
// Regenerate with:  node scripts/build-sessions.mjs
//
// This file is committed so the site builds from this repo alone. Vercel never
// sees the authoring repo.
//
// 16 sessions, edition: first, date: 2025-11-20.
//
// SPEAKER COUNT: this file contains 29 unique names. The rest of the site
// says 28 speakers. Both are correct and the difference is deliberate.
//
//   28 is the published programme figure. It counts the people billed on the
//   first-edition agenda, and it is the number used on the homepage, on
//   /what-is-agentic-finance, in llms.txt and in external material about the
//   event. Changing it would put the site out of step with what has already
//   been published elsewhere.
//
//   29 is how many people actually appeared. John Toman (Certora) presented
//   alongside Mooly Sagiv on the VeriSafe session but was not billed on the
//   agenda. He is named on that session page and in its JSON-LD because he was
//   there, which is what a session page records.
//
// So: do not "fix" 28 to 29 sitewide, and do not remove the extra speaker from
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

export const SESSIONS: Session[] = [
  {
    "slug": "the-trust-layer-in-the-agentic-stack-erc-8004",
    "title": "The Trust Layer in the Agentic Stack: ERC-8004",
    "format": "panel",
    "date": "2025-11-20",
    "edition": "first",
    "speakers": [
      {
        "name": "Marco De Rossi",
        "organisation": "MetaMask",
        "isModerator": false
      },
      {
        "name": "Sumeet Chougule",
        "organisation": "Cha0s & Nethermind",
        "isModerator": false
      },
      {
        "name": "Davide Crapis",
        "organisation": "Ethereum Foundation",
        "isModerator": false
      },
      {
        "name": "Quintus Kilbourn",
        "organisation": "Flashbots",
        "isModerator": false
      },
      {
        "name": "Simon Emanuel Schmid",
        "organisation": "ENS",
        "isModerator": true
      }
    ],
    "videoId": "FWT9AVaN9NU",
    "duration": "44:26",
    "topics": [
      "ERC-8004",
      "x402",
      "A2A",
      "MCP",
      "TEE",
      "multi-agent systems"
    ],
    "startTime": "10:00",
    "endTime": "10:40",
    "body": [
      {
        "type": "paragraph",
        "text": "ERC-8004 puts an agent registry and a reputation system into one standard. The panel used it to get at a bigger question: what has to exist before agents can find each other, trust each other and pay each other, without a central party deciding who counts as legitimate. Their answer was a thin base layer, with the hard parts built on top rather than written into the standard."
      },
      {
        "type": "paragraph",
        "text": "Marco De Rossi explained why identity and reputation sit in one standard despite being separate contracts. Identity and payments have obvious demand, because agents need to be addressable and to hold money. Reputation is the harder bet. People have never had a working distributed version of it, and the wager is that agents aggregate signals better than people do. The signals stay public so that no single authority ends up doing the scoring."
      },
      {
        "type": "paragraph",
        "text": "Sumeet Chougule described building an accountability protocol on that base, using ERC-8004 as a trust primitive and x402 for payments. He split verification in two: proving the model ran as claimed, and proving what an agent says about itself, such as which data or tools it used. Trusted execution environments cover the first. The second needs attestation, and he expected those methods to change as cheaper approaches mature."
      },
      {
        "type": "paragraph",
        "text": "Quintus Kilbourn was wary of those environments. They add only a few percent overhead by his account, which makes them practical, but the assumptions underneath are easy to forget. There is no physical protection, the firmware is closed source, and you end up depending on the cloud provider and the chip vendors. His worry was that wide adoption would quietly turn a hardware manufacturer into a dependency of the whole agent economy. He wanted the chain to govern which software may run inside them, so an operator cannot change a system's privacy properties without anyone noticing."
      },
      {
        "type": "paragraph",
        "text": "Asked whether the work was early, Davide Crapis pointed to standards converging in the AI world, to MCP and A2A gaining traction, and to more than a hundred projects around the registry, his own unverified figure. He expected the first uses to be unglamorous: register an endpoint, record whether it responds. Kilbourn made the economic case. When dealing with someone else's agent is expensive, firms build everything in-house, so lowering that cost decides whether the agent economy ends up distributed at all. De Rossi's closing advice was to build more agents and fewer agent platforms."
      }
    ]
  },
  {
    "slug": "x402scan-the-discovery-layer-for-x402",
    "title": "x402scan: The discovery layer for x402",
    "format": "keynote",
    "date": "2025-11-20",
    "edition": "first",
    "speakers": [
      {
        "name": "Shafu",
        "organisation": "Merit Systems",
        "isModerator": false
      }
    ],
    "videoId": "KQG-ouMf-ho",
    "duration": "20:37",
    "topics": [
      "x402"
    ],
    "startTime": "10:45",
    "endTime": "11:05",
    "body": [
      {
        "type": "paragraph",
        "text": "x402 had working payment plumbing and no way to see what was running on it. Shafu presented x402scan as the explorer for it. A permissionless payments standard creates two problems at once, finding what exists and knowing whether it works, and agents cannot spend money unsupervised until both are handled."
      },
      {
        "type": "paragraph",
        "text": "There was not much to look at when his team started. A few weeks earlier the protocol had around fifty thousand transactions, roughly half of which he believed were the issuing team's own integration tests, both his own unverified figures. Nowhere to try a resource, and one community dashboard. x402scan indexes the transactions, the servers exposing paid resources, and the facilitators. A facilitator takes the client's signature and does the on-chain work, so a developer exposing a paid endpoint never touches wallets, gas or nonces. New facilitators arrive by community pull request, after which their resources are indexed automatically."
      },
      {
        "type": "paragraph",
        "text": "Resources can also be used from inside the explorer, with either a wallet it provides or your own. The comparison he drew was Etherscan, with the difference that all of this is open source: the front end, the indexer, the syncer and the proxy. He counted more than thirty contributors, only seven of them from his own team."
      },
      {
        "type": "paragraph",
        "text": "Then there is the cost of letting anyone publish. Plenty of paid endpoints do not work and some are malicious. Calls made through the explorer pass through its proxy, so each resource can be scored on uptime, latency, request volume and success rate. The point is not that people browse those scores. An agent holding its own funds can be told to ignore anything below a chosen threshold. He demonstrated a chat interface where an agent paid a few cents for an endpoint mid-conversation and used the response in its next answer. An agent that meets a paywall today just stops."
      },
      {
        "type": "paragraph",
        "text": "He was blunt about what had driven attention so far. A memecoin launched around the protocol, which he called unsustainable and set against the need for resources that are actually useful. His wider argument was that paying a few cents for an article or a video is a plausible alternative to advertising."
      }
    ]
  },
  {
    "slug": "privacy-for-x402",
    "title": "Privacy for x402",
    "format": "keynote",
    "date": "2025-11-20",
    "edition": "first",
    "speakers": [
      {
        "name": "Rahul Kothari",
        "organisation": "Aztec",
        "isModerator": false
      }
    ],
    "videoId": "MwZXCjcv8no",
    "duration": "17:32",
    "topics": [
      "x402",
      "privacy"
    ],
    "startTime": "11:10",
    "endTime": "11:30",
    "body": [
      {
        "type": "paragraph",
        "text": "Rahul Kothari of Aztec argued that calls for private x402 skip the real work of privacy design: deciding precisely what to hide and from whom. He expected x402 traffic to run agent-to-company and company-to-agent, with no human wallet ever in the loop, and built the talk around what that setup exposes and what ought to stay hidden."
      },
      {
        "type": "paragraph",
        "text": "He named four things a transaction can reveal: the resource being paid, the agent doing the paying, metadata such as token type and amount, and the facilitator that settles it. He judged the resource and the facilitator safe to keep visible, since exposing them supports analytics and lets a reputation system judge facilitators by their behavior. The agent and the metadata were the two he wanted hidden. An agent's identity can expose the user behind it, and metadata like the amount transferred gives outside observers nothing useful. He then split the question by audience: the resource being paid needs to know who it is dealing with just to accept the payment, so hiding the agent from the resource defeats the purpose, while a facilitator, in his view, only needs to verify and settle, not see who is involved."
      },
      {
        "type": "paragraph",
        "text": "To frame the trade-offs, he laid out a spectrum: fully transparent, then anonymity (amounts visible, parties hidden), then confidentiality (parties visible, amounts hidden), then a default-private model with selective disclosure. He used Aztec, where he works, to show what default-private with optional public calls could look like, then spent more time on approximating that on a public chain like Base, which he said is where most actual x402 activity already happens. His suggestions there included routing many agents through one shared entry point to obscure which user triggered a payment, stealth addresses (which he flagged as weak at scale because of address proliferation), and depositing into privacy pools such as Railgun or 0xbow, or wrapping funds in an FHE token from Zama to hide a recipient or an amount. Each option had its own cost: privacy pools require pre-funded balances, stealth addresses require a constant supply of new addresses, and holding funds still to gain privacy runs into the latency that fast payments cannot tolerate."
      }
    ]
  },
  {
    "slug": "intelligence-as-a-public-good",
    "title": "Intelligence as a Public Good",
    "format": "keynote",
    "date": "2025-11-20",
    "edition": "first",
    "speakers": [
      {
        "name": "Nick Emmons",
        "organisation": "Allora Labs",
        "isModerator": false
      }
    ],
    "videoId": "1JqShmFIpKQ",
    "duration": "21:02",
    "topics": [
      "prediction markets",
      "public goods"
    ],
    "startTime": "11:35",
    "endTime": "11:55",
    "body": [
      {
        "type": "paragraph",
        "text": "Nick Emmons argued that machine intelligence had become a private utility owned by a handful of companies, and that this was both a risk to society and an inefficient way to run a market. His answer was a network that aggregates many independent models into a single output that performs better than any one of them, which he framed as the mechanism by which intelligence could become a public good rather than a product a few firms sell."
      },
      {
        "type": "paragraph",
        "text": "His diagnosis was structural rather than moral. Models sit in isolated silos, and there is no way to take three of them and merge the parts each does best. Organisations holding the most compute and data compound their advantage by default, while models published on open platforms, models built by small teams and idle compute on edge devices stay locked out. He described inefficiency at both ends: contributing is expensive, and consuming means surveying the whole field and committing to one model despite constantly changing conditions."
      },
      {
        "type": "paragraph",
        "text": "Allora splits the problem into topics, each defined by an objective and a loss function, such as predicting an asset's price hours ahead. Base workers run models against that objective. Forecasting workers do something different: rather than predicting the target, they predict which base worker will perform best under which conditions, learning that one model is stronger in volatile markets and another in calm ones. A third group evaluates results each epoch and reweights accordingly. Emmons showed a topic where the best individual worker reached a log loss of about 3.337, his own unverified figure, and said the aggregate, once forecasting was introduced, beat it consistently."
      },
      {
        "type": "paragraph",
        "text": "His figures, all self-reported and unverified, were more than 700 million inferences, around 300,000 workers and over 55 topics, with mainnet recently launched. He closed on a case study: an agent drawing on ten to twenty US presidential election models, trading on Polymarket with a broadly hedged strategy, which he said returned about 68% annualised over three months, another unverified figure."
      },
      {
        "type": "paragraph",
        "text": "Emmons argued the case mattered because prediction markets are inherently thin and event-specific, and that DeFi has generally lacked participants able to trade them accurately without automation. He framed agents drawing on aggregated models as the kind of participant that could operate in markets too narrow to attract dedicated human traders."
      }
    ]
  },
  {
    "slug": "trust-discovery-and-autonomy-in-the-age-of-agentic-ai",
    "title": "Trust, Discovery & Autonomy in the Age of Agentic AI",
    "format": "keynote",
    "date": "2025-11-20",
    "edition": "first",
    "speakers": [
      {
        "name": "E.G. Galano",
        "organisation": "Infura & DIN",
        "isModerator": false
      }
    ],
    "videoId": "eHMMB0zripw",
    "duration": "24:02",
    "topics": [
      "ERC-8004",
      "x402",
      "A2A",
      "MCP",
      "EigenLayer"
    ],
    "startTime": "12:00",
    "endTime": "12:25",
    "body": [
      {
        "type": "paragraph",
        "text": "E.G. Galano argued that agents trying to discover and pay for MCP APIs were running into a problem web2 had already solved twice: search and curated marketplaces settled who to trust for content and goods, and reputable couriers settled delivery without anyone needing to trust the brand on the van. His claim was that Infura's RPC-scoring experience, roughly a decade of it by his own account, carried over directly to scoring agents and services, and that this unglamorous work was what stood between agents and reliable transacting."
      },
      {
        "type": "paragraph",
        "text": "He traced Infura's path from a centralized RPC provider, once flagged as a single point of failure that reputable providers such as Alchemy helped mitigate, toward a decentralized marketplace protocol he called DIN, the Decentralized Infrastructure Network. DIN routed requests to independent infrastructure operators, and a watchtower-style network continuously checked each one for latency, regional hosting, and data consistency. Once his team pointed that same scoring approach at MCP APIs, Galano said it extended easily, since a custom check could cover any service trait a consumer cared about."
      },
      {
        "type": "paragraph",
        "text": "Payment ran through x402, letting a caller pay per request in crypto rather than managing separate accounts across every RPC or API provider. Staking ran through an EigenLayer AVS using restaked ETH, comparable to Lido's staked ETH by his description, so operators secured the network without Infura issuing its own token. On top of that sat an onchain SLA, a bond guaranteeing a provider's price and availability for a set window."
      },
      {
        "type": "paragraph",
        "text": "Galano linked this to ERC-8004, the onchain agent registry effort, saying DIN's service registry and an agent registry were converging on the same underlying problem: how reputation gets attested onchain. In the Q&A, an attendee noted that crypto wallets, unlike credit cards, don't expire but can run dry. Galano agreed x402's per-request design handled subscription-style usage poorly, and floated unresolved ideas such as time-bound access tokens or a stake-and-slash model in place of prepayment."
      }
    ]
  },
  {
    "slug": "agents-are-the-future-of-finance",
    "title": "Agents are the future of finance - Enter the Agentic Revolution",
    "format": "keynote",
    "date": "2025-11-20",
    "edition": "first",
    "speakers": [
      {
        "name": "Sam Green",
        "organisation": "Cambrian Network",
        "isModerator": false
      }
    ],
    "videoId": "56WOVnaYPl8",
    "duration": "21:00",
    "topics": [
      "stablecoins",
      "agentic economy",
      "agentic finance"
    ],
    "startTime": "12:30",
    "endTime": "12:50",
    "body": [
      {
        "type": "paragraph",
        "text": "Sam Green argued that the real fix for crypto's UX was not AI in the abstract but agents specifically, defining an agent as a program that decided and acted on a user's behalf through a continuous loop of sensing its environment, reasoning, and acting. He framed a coming shift he called the agentic revolution as the moment AI stopped only advising and started executing directly, and treated crypto as the natural setting, since programmable money paired with autonomous decision-making was what agentic finance required. He backed this with a taxonomy of live products, not just a speculative pitch."
      },
      {
        "type": "paragraph",
        "text": "He built the case historically. Steam power launched the industrial revolution roughly three hundred years ago by his account, centralised electricity started a second revolution about 120 years later, and the transistor opened the information age some 75 years ago; each, he argued, laid the infrastructure for the next. He placed a coming agent era as the fourth in that sequence and claimed, without elaborating, that it would have more impact than the three before it combined. He tied its timing to two compounding trends: computing power under Moore's law, and what he described as a yearly doubling in AI model performance since GPT-3.5, which he said reached mass adoption faster than Instagram had, his own comparison."
      },
      {
        "type": "paragraph",
        "text": "Green named this market segment AgentFi and mapped its products on two axes, autonomy (advice versus direct on-chain action) and intelligence (rule-based logic versus AI-driven decisions), then walked through five categories: agents trading on prediction and betting markets, agents managing trading and portfolio decisions, information agents acting as co-pilots rather than executors, agents provisioning liquidity across exchanges, and lending agents that reallocate a user's collateral to chase yield. He named lending as the segment with the strongest product fit and, by his account, the largest share of assets under management so far."
      },
      {
        "type": "paragraph",
        "text": "On numbers, all self-reported and unverified, Green said assets under management in agentic finance were near zero at the start of 2025, reached roughly $20 million by October, and stood around $500 million by the day of the talk, a jump he did not explain further. He also cited stablecoin holdings growing from roughly $20 billion to $300 billion over five years, stablecoin transaction volume overtaking Visa's, and an Ernst & Young survey putting institutional interest in DeFi at 24 percent at the time, projected to pass 75 percent within two years."
      }
    ]
  },
  {
    "slug": "agents-under-the-hood-building-the-agentic-stack",
    "title": "Agents Under the Hood: Building the Agentic Stack",
    "format": "panel",
    "date": "2025-11-20",
    "edition": "first",
    "speakers": [
      {
        "name": "Nicolás Montone",
        "organisation": "Vercel (v0)",
        "isModerator": false
      },
      {
        "name": "Juan Irungaray",
        "organisation": "Google Developer Expert",
        "isModerator": false
      },
      {
        "name": "Nader Dabit",
        "organisation": "Eigen Labs",
        "isModerator": false
      },
      {
        "name": "Clemens Wan",
        "organisation": "Infura/DIN",
        "isModerator": false
      },
      {
        "name": "Chris Wessels",
        "organisation": "GraphOps",
        "isModerator": true
      }
    ],
    "videoId": "UvpnPMhtnGc",
    "duration": "30:35",
    "topics": [
      "ERC-8004",
      "x402",
      "A2A",
      "MCP",
      "TEE",
      "infrastructure"
    ],
    "startTime": "12:55",
    "endTime": "13:20",
    "body": [
      {
        "type": "paragraph",
        "text": "Five panelists agreed a basic call-the-model loop does not make an agentic system, and layered in memory, durable data storage and enough autonomy to act without constant human sign-off, but split over how much of that stack needs to be decentralised. Nicolás Montone argued agents mainly need to trust whichever model provider sits behind them, the same trust any app already asks for, and that decentralisation earns its place mostly around agent-to-agent payments, where he pointed to x402 as the protocol drawing the most investment. Nader Dabit and Juan Irungaray leaned the other way, expecting agents built by separate teams to eventually need something resembling blockchain-level trust between them."
      },
      {
        "type": "paragraph",
        "text": "Montone broke his own stack into four layers: an environment layer where his team ran agents on Vercel's fluid compute, serverless billing that only charges for CPU time actually spent rather than time waiting on a model; a context layer of cacheable, injectable system prompts; an actions layer of tools and MCP; and an application layer where a failed build gets fed back to the agent so it can self-correct."
      },
      {
        "type": "paragraph",
        "text": "Dabit argued a smart contract cannot host an agent, since contracts are action-based while agents run continuously and call external APIs. His answer was Eigen's own compute product, a trusted execution environment that generates a wallet key inside the runtime itself, so funds sent to an agent can only be spent by the running agent, not its operator. He described a companion product built for deterministic, re-executable inference, so a given prompt and model could be shown to reproduce an output, and called ERC-8004 useful for reputation."
      },
      {
        "type": "paragraph",
        "text": "Clemens Wan focused on limits: an agent with wallet or RPC access needs hard caps on trade size, plus an abstraction like a phone user never picking a GPS satellite, just setting a preference for cheaper, faster or greener. He wanted approval flows that check with a human until a workflow proves itself and gets remembered, rather than an intrusive prompt every time, alongside attested identity so an agent can prove who it acts for."
      },
      {
        "type": "paragraph",
        "text": "Irungaray described Google's Agent Engine as infrastructure for hosting agents built on LangGraph, Hugging Face or Google's own ADK, handling memory and session management for developers. He placed ADK's level of abstraction between LangGraph and n8n."
      }
    ]
  },
  {
    "slug": "the-role-of-ai-in-cybereconomy",
    "title": "The Role of AI in Cybereconomy",
    "format": "keynote",
    "date": "2025-11-20",
    "edition": "first",
    "speakers": [
      {
        "name": "Artem Kotelskiy",
        "organisation": "cyber•Fund",
        "isModerator": false
      }
    ],
    "videoId": "RMXyko13r0U",
    "duration": "18:31",
    "topics": [
      "agentic economy"
    ],
    "startTime": "13:25",
    "endTime": "13:55",
    "body": [
      {
        "type": "paragraph",
        "text": "Artem Kotelskiy, speaking for cyber•Fund, argued that AI and crypto were pushing capitalism toward what the fund internally calls a cybernetic economy: a resource allocation system that is self-regulating and, unlike the one we have now, hyperefficient. His case was that human limits, not the market mechanism itself, produce capitalism's failures, and that AI removes those limits while crypto supplies the infrastructure for the resulting activity to take place."
      },
      {
        "type": "paragraph",
        "text": "He opened with the fund's own record: more than two hundred startups backed across Ethereum, Solana and other networks, by his account. He then built the argument in two steps. First, prices work as a signal that adjusts supply and demand, but the people executing on that signal are bounded, limited in how much they can research, process, coordinate and act on, which he tied to asset bubbles and principal-agent problems. AI, in his framing, extends those bounded capacities directly, so plugging AI into the existing market mechanism just makes the invisible hand work harder."
      },
      {
        "type": "paragraph",
        "text": "The second step was less conventional. He distinguished markets already programmatically accessible, like public stock exchanges, from markets that are not, such as government procurement or task-based gig work, and used a personal anecdote about ordering party balloons through a chatbot to illustrate the second kind: the agent completed the task but picked poorly, because the underlying market had no structured way to be queried or bid into. His claim was that AI's real function is to instrument these markets: reading a request, extracting the actual intent and constraints, spinning up a temporary auction, finding counterparties, and settling into a contract. He named the missing piece mechanism-aware AI, agents that understand they are negotiating economically and know what to disclose, and said this does not yet exist. He also argued that agents transacting this way erode the ad-supported attention economy, since agents do not look at banners, and gestured at a machine-to-machine payment rail as the kind of infrastructure this favors, without detailing it further. Blockchains, he said, are a plausible but not guaranteed substrate for the coordination itself."
      },
      {
        "type": "paragraph",
        "text": "He closed on a values point: the cybernetic economy is coming regardless, but the path there is not fixed, and a passive path risks concentrating data and control rather than distributing it."
      }
    ]
  },
  {
    "slug": "demo-cambrian-erc-8004-data-agent",
    "title": "Demo: Cambrian ERC-8004 Data Agent",
    "format": "demo",
    "date": "2025-11-20",
    "edition": "first",
    "speakers": [
      {
        "name": "Ricky Esclapon",
        "organisation": "Cambrian Network",
        "isModerator": false
      }
    ],
    "videoId": "dhNl_RFD4pw",
    "duration": "11:15",
    "topics": [
      "ERC-8004",
      "A2A",
      "MCP",
      "TEE"
    ],
    "startTime": "13:45",
    "endTime": "13:55",
    "body": [
      {
        "type": "paragraph",
        "text": "Ricky Esclapon walked through a string of experiments Cambrian had run on top of its data agent, Deep 42, which links on-chain contracts to off-chain sources such as GitHub and social data. Each step, wrapping the agent in ERC-8004, testing trusted execution, building a discovery layer, was a working prototype rather than a finished product. Esclapon was candid about what still did not hold together."
      },
      {
        "type": "paragraph",
        "text": "The first step was making Deep 42 an ERC-8004 agent. That depended more on getting the A2A agent card right, he said, than on the ERC-8004 wrapping itself, and he credited an SDK built by Marco De Rossi, which Cambrian had been contributing to, for making it easier. From there Cambrian tried trusted execution environments, running one TE for the agent and one for its MCP server, with a UI to surface the proofs between them. He was upfront that this removed only some trust assumptions, not all of them. He pointed people toward their open-sourced repo, and toward a managed cloud compute service he rated highly for standing up TEEs, if a pricier one."
      },
      {
        "type": "paragraph",
        "text": "The bulk of the demo covered agent discovery. An API took a question, matched it to an agent's A2A skills through a knowledge graph, and returned a ranked, sourced answer with a confidence score on each source, plus an execution plan for which agent to call. He showed it running against a query about which agents know about movies, backed by a Google Spanner database chosen for combining Cypher and SQL in one place. Spanner is not permissionless and carries no attestation model, so Cambrian built its own graph-SQL database instead, one anyone could provision, pay for on-chain, and query with attestations attached. He showed data being written into it live."
      },
      {
        "type": "paragraph",
        "text": "Esclapon was direct that none of this composed cleanly yet: discovery, verifiable data and permissionless payment were, by his account, three separate problems Cambrian was stitching together rather than a single finished stack."
      }
    ]
  },
  {
    "slug": "babylon",
    "title": "Babylon - In a world where everything is predicted, what really matters?",
    "format": "keynote",
    "date": "2025-11-20",
    "edition": "first",
    "speakers": [
      {
        "name": "Shaw Walters",
        "organisation": "ElizaOS (Eliza Labs)",
        "isModerator": false
      }
    ],
    "videoId": "t7cx6oBWzbQ",
    "duration": "23:15",
    "topics": [
      "ERC-8004",
      "TEE",
      "prediction markets"
    ],
    "startTime": "14:00",
    "endTime": "14:20",
    "body": [
      {
        "type": "paragraph",
        "text": "Shaw Walters presented Babylon, a prediction-market game built on ElizaOS, as a working demonstration of ERC-8004. He used it to argue a narrower point: by his account most LLM trading agents lose money, so agents should prove themselves in closed simulations before they touch real capital."
      },
      {
        "type": "paragraph",
        "text": "By his account, he had been banned from X over open-source code tied to Eliza that the platform objected to. He said he responded by building his own version of X populated with AI likenesses of public figures, adding a betting layer, and calling the result Babylon. He described ERC-8004 as three things combined, identity, a discoverable registry of agents and services, and reputation, comparing it to a merger of Yelp-style reviews and Fiverr-style hiring that agents populate and query instead of people. He said Near, Hedera and Olas had each been building toward the same kind of registry, which was why his team chose a shared standard with the Ethereum Foundation over a separate house version. Babylon registers each user onto that registry at sign-up. He also described early, thin work on a still-immature standard for agent-to-agent payments."
      },
      {
        "type": "paragraph",
        "text": "Walters argued that wiring an LLM to an action-caller is not a strategy. By his own account, every trading agent he had seen had lost money except one that broke even, and simply holding Bitcoin had outperformed all of them. His alternative was reinforcement learning inside a closed simulation: Babylon logs each agent's reasoning and actions as a trajectory, and a separate judge model ranks batches of those trajectories from best to worst by profit and success rate, a method he called group ranked policy optimization. He said the reward signal this produces is noisy but workable when the underlying data is clean, and that agents should show they can turn a profit in simulation before being trusted with real funds."
      },
      {
        "type": "paragraph",
        "text": "On infrastructure, he argued against running model inference on-chain, since replicating LLM compute across every validator does not scale, and described running inference off-chain inside trusted execution environments instead. He said large language models are seedable and therefore semi-deterministic: identical seeds and matching hardware should reproduce the same output, though floating-point variation can still introduce small errors across machines. On that basis, he said a result generated on one machine could be checked by re-running it on another with matching hardware, so only a sample of traffic needs verifying rather than every request."
      }
    ]
  },
  {
    "slug": "intelligent-compression-for-finance",
    "title": "Intelligent Compression for Finance",
    "format": "keynote",
    "date": "2025-11-20",
    "edition": "first",
    "speakers": [
      {
        "name": "Renç Korzay",
        "organisation": "Giza",
        "isModerator": false
      }
    ],
    "videoId": "nEncioW9fRs",
    "duration": "14:49",
    "topics": [
      "stablecoins",
      "DeFi"
    ],
    "startTime": "14:25",
    "endTime": "14:45",
    "body": [
      {
        "type": "paragraph",
        "text": "Renç Korzay of Giza argued that decentralized finance had drifted from its founding promise of open access and was now dominated by people who knew how to read collateral positions and calculate yields. Real democratization of finance, he said, meant giving everyone access to opportunity, not simply handing out a wallet. His proposed fix was the financial agent: persistent software that manages a user's capital continuously against policies the user sets. Giza builds these agents specifically for stablecoins, which he framed as the asset class most in need of the treatment."
      },
      {
        "type": "paragraph",
        "text": "He described a financial agent as running deterministic, auditable logic rather than opaque models, constantly evaluating and reallocating rather than executing a single script once. To illustrate the problem, he showed how crowded the stablecoin market had become and argued that no person could track that many tokens and protocols while making fast, high-stakes decisions. Giza's answer folds all of that into one interface: a user deposits capital once, sets preferences such as which collateral or curator to trust, and the agent then acts on those preferences around the clock."
      },
      {
        "type": "paragraph",
        "text": "He gave several figures for Giza's own deployment, all self-reported and unverified: agents had been live for roughly eight months, had moved more than three billion dollars in what he called real, fee-bearing volume on Base rather than incentivized test activity, and had executed close to a million financial decisions. He said, again by his own account, that more than 65 percent of users customized their agent's policies rather than accepting the defaults. He also claimed, without detailing how it was measured, that users on Giza earned roughly double the yield of what he called a static or manually managed position. Separately he cited, self-reported, close to two hundred billion dollars in stablecoins sitting idle industry-wide, a gap he attributed to infrastructure lagging behind the automation now available."
      },
      {
        "type": "paragraph",
        "text": "He closed by naming Ethereum's security, composability and deep liquidity, along with falling L2 costs and latency, as his reasons for building there. He described Giza as already serving funds, treasuries, retail users, neobanks and wallet providers, and pointed the audience to Giza's own site to try an agent for themselves."
      }
    ]
  },
  {
    "slug": "defi-as-an-agent-playground",
    "title": "DeFi as an Agent Playground",
    "format": "panel",
    "date": "2025-11-20",
    "edition": "first",
    "speakers": [
      {
        "name": "Ken Ng",
        "organisation": "Uniswap Foundation",
        "isModerator": false
      },
      {
        "name": "Lukasz Stoczynski",
        "organisation": "Mimic",
        "isModerator": false
      },
      {
        "name": "Gauthier Vila",
        "organisation": "ZyFAI",
        "isModerator": false
      },
      {
        "name": "Stefano Bury",
        "organisation": "Virtuals",
        "isModerator": false
      },
      {
        "name": "Valentin Mihov",
        "organisation": "Daedalus Angels",
        "isModerator": true
      }
    ],
    "videoId": "E56JizZYzNc",
    "duration": "29:59",
    "topics": [
      "ERC-8004",
      "multi-agent systems",
      "DeFi"
    ],
    "startTime": "14:50",
    "endTime": "15:20",
    "body": [
      {
        "type": "paragraph",
        "text": "Four builders were asked how much control over capital AI agents should be given in DeFi, and largely talked each other out of the optimistic answer. All four saw agents as a real efficiency gain in monitoring, execution and interface design, and none would hand them unsupervised control of funds. Instead they converged on agents that work inside narrow limits, on data checked before they act, with a person still accountable if something goes wrong."
      },
      {
        "type": "paragraph",
        "text": "Ken Ng framed the opportunity around who currently holds the edge. Sophisticated liquidity management, the kind that matters for minimising MEV and loss-versus-rebalancing, is practised by market makers and funds with dedicated teams rather than by individuals adjusting positions by hand, and agents level that field. He was less comfortable on risk, noting that writing a risk ceiling into a system whose purpose is to make money is hard because nobody sets out to earn less."
      },
      {
        "type": "paragraph",
        "text": "Gauthier Vila offered the clearest evidence against the optimistic case. His team built an LLM-based system for generating yield, found it underperformed expectations, and replaced it with a rule-based agent, concluding that models were useful for surfacing data and too risky to trust with execution. Lukasz Stoczynski described a boundary drawn deliberately: Mimic has the protocol itself verify on-chain and off-chain data before a task executes, so agents trigger work without owning it. He did not expect risk or vault curation to move to agents soon, for legal rather than technical reasons. Funds under management carry liability, and if an agent lost ten million dollars of someone else's money, who answers for it is unsettled."
      },
      {
        "type": "paragraph",
        "text": "Stefano Bury argued the nearest-term win was interface rather than autonomy, pointing to an agentic front end from the Moonwell team that reads like consumer fintech and barely mentions crypto or AI. He reported, on his own unverified figures, that value flowing through multi-agent systems on Virtuals' commerce protocol had reached roughly $130 million within six weeks and was growing about $10 million a day, while conceding orchestration was still human. His longer-term picture had specialised agents competing for each step, with ERC-8004 supplying the trust scores an orchestrator would use to choose between them."
      }
    ]
  },
  {
    "slug": "how-open-arenas-bring-trust-to-ai-selection",
    "title": "How Open Arenas Bring Trust to AI Selection",
    "format": "keynote",
    "date": "2025-11-20",
    "edition": "first",
    "speakers": [
      {
        "name": "Michael Sena",
        "organisation": "Recall",
        "isModerator": false
      }
    ],
    "videoId": "LR-JEKNeRWw",
    "duration": "20:49",
    "topics": [
      "ERC-8004",
      "EigenLayer",
      "prediction markets"
    ],
    "startTime": "15:25",
    "endTime": "15:45",
    "body": [
      {
        "type": "paragraph",
        "text": "Michael Sena of Recall argued that benchmarks, the industry's standard way of picking which AI model or agent to trust, had stopped working, and pitched open, funded arenas where any model or agent could prove itself under real conditions instead of a fixed test."
      },
      {
        "type": "paragraph",
        "text": "His case against benchmarks had three parts. Large labs, he said, increasingly trained their models on the same questions the benchmarks used, so a model could top a leaderboard and still disappoint once deployed, an issue he illustrated with Grok 4. Benchmarks were also run by a handful of operators covering only the most prominent large models, leaving specialized agents, such as the crypto trading tools built by individual developers, without any reputation system at all. And the format could not keep pace, he argued, as the number of agents and the range of tasks they attempted kept multiplying."
      },
      {
        "type": "paragraph",
        "text": "Recall's alternative let anyone fund an arena, define what success meant for a chosen skill, and open it to competing models and agents. For an objective skill like trading, results were read on-chain against metrics such as Sharpe, Sortino or Calmar ratios rather than raw returns alone. Arenas ran across multiple rounds so a win could be told apart from luck, with users adding forward-looking curation before statistical significance was reached. Rankings updated continuously and published on-chain, meant to feed registries such as ERC-8004 with a separate score per skill rather than one master number."
      },
      {
        "type": "paragraph",
        "text": "Sena said, by his own unverified account, that Recall had run fifteen arenas so far, mostly DeFi contests such as spot trading on Aerodrome and perpetuals trading on Hyperliquid, testing more than fifty models and upward of a hundred fifty community-built agents across more than a hundred fifty thousand trades. He described arenas expanding beyond DeFi: an NFL play-calling contest predicting coaching decisions, an internal coding arena scored on reviewer comments before a pull request merged, and new arenas running agent execution on Eigen's infrastructure so both the outcome and the execution itself could be verified independently of Recall's own on-chain results. Asked in Q&A how rankings avoided rewarding a lucky streak, he described an Elo-style score paired with a separate confidence measure that only grew with repeated competition, so a lower score built over many rounds would outrank a higher one earned in a single appearance."
      }
    ]
  },
  {
    "slug": "harnessing-llms-to-generate-secure-code",
    "title": "Harnessing LLMs to generate secure code",
    "format": "keynote",
    "date": "2025-11-20",
    "edition": "first",
    "speakers": [
      {
        "name": "Mooly Sagiv",
        "organisation": "Certora",
        "isModerator": false
      },
      {
        "name": "John Toman",
        "organisation": "Certora",
        "isModerator": false
      }
    ],
    "videoId": "t5Ynv5fWrqM",
    "duration": "21:53",
    "topics": [
      "security",
      "formal verification"
    ],
    "startTime": "15:50",
    "endTime": "16:10",
    "body": [
      {
        "type": "paragraph",
        "text": "Mooly Sagiv opened by challenging a common assumption: that large language models make smart contract code less secure. He argued the opposite could hold if a model's output was checked against a formal specification rather than trusted on its own. Presenting with his Certora colleague John Toman, he introduced an internal tool, previously called VeriSafe and now called Composer, that generated a contract implementation from a spec and used a formal-verification prover to check it, feeding failures back to the model until the code satisfied that spec."
      },
      {
        "type": "paragraph",
        "text": "Sagiv framed the problem first. Contract security already leans on skilled developers plus auditing, fuzzing and formal verification, and bugs still get through. The common prediction was that models would make this worse by producing more buggy code, faster. His counter drew on an older idea, starting from a specification rather than from code, paired with a model: the model proposed implementations, and formal verification caught the ones that were wrong."
      },
      {
        "type": "paragraph",
        "text": "Toman walked through the mechanism on a contrived liquidity pool where withdrawal fees rose with size. A design document and a formal specification went in alongside an interface, and before generating code the model first scanned the documents for requirements the formal rules didn't cover. It produced an implementation, checked by Certora's prover at the bytecode level; a failure returned a counterexample, fed back to the model for another pass. The model could also flag the spec as wrong when a counterexample conflicted with the design intent, and it would then propose a change that a human had to approve."
      },
      {
        "type": "paragraph",
        "text": "Their demo's first implementation blocked one large withdrawal but not the same amount split into many small ones, a gap in the spec rather than a prover failure. Instead of restarting, the team added a rule and fed the prior implementation back in to keep the fix minimal. That gap also marked the edge of what the tool actually proved: the final code was checked against the current formal specification, not against every possible flaw, so an incomplete spec could still let a bug through. In the Q&A, the team said the loop itself carried no formal guarantee of converging, only a model prompted to ask for help when stuck, with a person able to interrupt it. They placed the technique inside an older synthesis idea, generate and check until it holds, with a language model as the proposer."
      }
    ]
  },
  {
    "slug": "the-game-of-genius-x402-and-erc-8004",
    "title": "The Game of Genius, x402 and ERC-8004",
    "format": "keynote",
    "date": "2025-11-20",
    "edition": "first",
    "speakers": [
      {
        "name": "Jessy EF",
        "organisation": "Ethereum Foundation",
        "isModerator": false
      }
    ],
    "videoId": null,
    "duration": null,
    "topics": [],
    "startTime": "16:15",
    "endTime": "16:35",
    "body": [
      {
        "type": "paragraph",
        "text": "This session was part of the first edition programme and talked about agentic payments and standards. It was not recorded, so no transcript exists and no detailed account of what was said can be given here."
      }
    ]
  },
  {
    "slug": "the-cyberpunk-rebellion-forging-private-agentic-ai",
    "title": "The Cyberpunk Rebellion: Forging Private Agentic AI",
    "format": "keynote",
    "date": "2025-11-20",
    "edition": "first",
    "speakers": [
      {
        "name": "Sandi Fatic",
        "organisation": "Calimero Network",
        "isModerator": false
      }
    ],
    "videoId": "F8Pr_I5SmI8",
    "duration": "20:04",
    "topics": [
      "x402",
      "privacy"
    ],
    "startTime": "16:40",
    "endTime": "17:00",
    "body": [
      {
        "type": "paragraph",
        "text": "Sandi Fatic argued that AI was repeating a pattern he traced through earlier technologies: a system starts decentralized, gets captured by centralized operators, and eventually has to be won back by people willing to build alternatives. He cited email's shift from an open protocol to one defended by encryption, and Bitcoin's origin after the 2008 financial crisis, as earlier rounds of the same fight. He introduced the cypherpunk movement, recommending the novel Neuromancer as a portrait of a future where corporations control both data and thought, and argued that corporate-controlled AI was now the target for the same kind of rebellion. He presented Calimero Network's peer-to-peer, local-first infrastructure as one attempt at a counter-system."
      },
      {
        "type": "paragraph",
        "text": "He grounded that argument in his own career at Facebook, Google, and NEAR Protocol, recalling that he was told early on to bring his true self to work, and that a colleague warned him doing so honestly would get him fired. He used a panopticon, a prison design where a single guard tower can observe every cell but inmates never know when they are being watched, to argue that the uncertainty alone is enough to make people self-censor. He extended that into what he called corporate AI surveillance, pointing to the gap between the data a user can export from a centralized service and the far larger volume it actually holds, and to European proposals to scan private messages, as signs that any standing capability to monitor communication eventually gets used."
      },
      {
        "type": "paragraph",
        "text": "On Calimero itself, he described a peer-to-peer network rather than a blockchain: data lives on a user's own device, and nodes use a conflict-free replicated data type instead of blockchain consensus, so local changes broadcast to peers who verify and merge them without a central server. He cited a hackathon project built on this where medical institutions trained a model by exchanging only weight updates, never patient data. On payments, he pointed to the HTTP 402 status code, revived for agent-to-agent micropayments, as a useful building block undermined by running on public, traceable rails, and argued it needed private, encrypted settlement using stablecoins or tokens instead."
      },
      {
        "type": "paragraph",
        "text": "He closed by saying the talk was about values rather than product, urging the audience to rejoin the cypherpunk movement and build systems that protect user data instead of selling it."
      }
    ]
  }
]

export function getSession(slug: string): Session | undefined {
  return SESSIONS.find((session) => session.slug === slug)
}

/** Slug for the programme slot starting at "HH:MM", if a session page exists. */
export function sessionSlugByStartTime(startTime: string): string | undefined {
  return SESSIONS.find((session) => session.startTime === startTime)?.slug
}
