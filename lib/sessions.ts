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
        "text": "Rahul Kothari argued that calls for \"private x402\" skip the actual work of privacy design, which is deciding precisely what to hide and from whom. He expected x402 traffic to run agent-to-company and company-to-agent, with no human wallet involved, and built the talk around what that exposes and what should stay hidden."
      },
      {
        "type": "paragraph",
        "text": "He named four things a transaction reveals: the resource being paid, the agent paying, metadata such as token and amount, and the facilitator settling it. He judged the resource and facilitator worth keeping visible, since exposing them supports analytics and lets a reputation system judge facilitators by behaviour. The agent and the metadata were the pieces he wanted hidden, since an agent's identity can expose the user behind it, and metadata such as amount tells outside observers nothing useful. He then split the question by audience: the resource being paid needs to know who it's dealing with to accept payment at all, so hiding the agent from the resource defeats the purpose, while a facilitator arguably only needs to verify and settle, not see who is involved."
      },
      {
        "type": "paragraph",
        "text": "To structure the trade-offs he offered a spectrum from fully transparent, through anonymity (amounts visible, parties hidden) and confidentiality (parties visible, amounts hidden), to a default-private model with selective disclosure. He used Aztec, where he works, to illustrate default-private with optional public calls, then spent more time on approximating that on a public chain like Base, where he said actual x402 volume already sits. His suggestions there included routing many agents through one shared entry point to blur which user initiated a payment, stealth addresses (which he flagged as weak at scale because of address proliferation), and depositing into privacy pools such as Railgun or an FHE-wrapped token from Zama to obscure a recipient or an amount. Each traded something specific: privacy pools need pre-funded balances, stealth addresses need constant new addresses, and hiding by keeping funds still runs into the latency that fast payments don't want."
      },
      {
        "type": "paragraph",
        "text": "The value here was refusing the easy version of the question. x402 only works at agent scale if agents can transact without every counterparty and internal strategy becoming public by default, but hiding everything loses the transparency the space was built on. Treating privacy as a per-field, per-audience choice, not a single switch, is the more useful frame for anyone building payment infrastructure for agents now."
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
        "text": "Nick Emmons argued that machine intelligence had become a private utility owned by a handful of companies, and that this was both a risk to society and an inefficient way to run a market. His answer was a network that aggregates many independent models into a single output performing better than any one of them, which he presented as the mechanism by which intelligence could become a public good rather than a product a few firms sell."
      },
      {
        "type": "paragraph",
        "text": "His diagnosis was structural rather than moral. Models sit in isolated silos, and there is no way to take three of them and merge the parts each does best. Organisations holding the most compute and data therefore compound their advantage by default, while models published on open platforms, models built by small teams and idle compute on edge devices stay locked out. He described inefficiency at both ends: contributing is expensive, and consuming means surveying the whole field and committing to one model despite constantly changing conditions."
      },
      {
        "type": "paragraph",
        "text": "Allora splits the problem into topics, each defined by an objective and a loss function, such as predicting an asset's price hours ahead. Base workers run models against that objective. Forecasting workers do something different: rather than predicting the target, they predict which base worker will perform best under which conditions, learning that one model is stronger in volatile markets and another in calm ones. A third group evaluates results each epoch and reweights accordingly. Emmons showed a topic where the best individual worker reached a log loss of roughly 3.34, his own unverified figure, and said the aggregate, once forecasting was introduced, beat it consistently. That result, not the network, was the claim the talk rested on."
      },
      {
        "type": "paragraph",
        "text": "His figures, all self-reported and unverified, were more than 700 million inferences, around 300,000 workers and over 55 topics, with mainnet newly launched. The example he closed on was an agent aggregating ten to twenty US presidential election models, traded on Polymarket with a broadly hedged strategy, returning around 68% annualised over three months."
      },
      {
        "type": "paragraph",
        "text": "That example is the one worth sitting with. Thin, event-specific markets are exactly where automated settlement already works and informed participants do not show up in sufficient numbers. An agent drawing on aggregated models can be present in a market too small for anyone to staff by hand, which is less about better forecasting than about which markets can exist at all."
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
        "text": "E.G. Galano argued that agents discovering and paying for MCP APIs are running into a problem web2 already solved twice over: search and curated marketplaces sorted out who to trust for content and goods, and reputable couriers sorted out delivery without anyone needing to trust the brand on the van. His claim was that Infura's decade of scoring RPC endpoint quality translates directly into scoring agents and services, and that this is the near-term, unglamorous work standing between agents and being able to reliably transact."
      },
      {
        "type": "paragraph",
        "text": "He traced Infura's own path from a centralized RPC provider, a single point of failure that rivals like Alchemy existed partly to hedge against, toward a decentralized marketplace protocol called Den (Decentralized Infrastructure Network). Den routes requests to independent infrastructure operators, and a watchtower system continuously checks each one for latency, regional hosting and data consistency. Galano said that once his team pointed the same scoring logic at MCP APIs, it extended cleanly, since a custom test can check any service characteristic a consumer cares about."
      },
      {
        "type": "paragraph",
        "text": "Payment runs through x402, letting a caller pay per request in crypto instead of juggling separate credit-card accounts across every RPC or API provider. Staking is handled through an EigenLayer AVS using restaked ETH, so operators secure the network without Infura needing to issue its own token. On top of that sits an onchain SLA: a bond that guarantees a provider's price and availability for a set window, so a consumer isn't just checking that a service exists today but locking in that it stays put."
      },
      {
        "type": "paragraph",
        "text": "Galano connected this to ERC-8004, the onchain registry effort for agents, noting that Den's service registry and an agent registry were converging on the same problem: how reputation gets attested onchain. In the Q&A, an attendee raised a real gap, crypto wallets don't expire like credit cards but they do run dry, and Galano admitted x402's per-request model handles usage poorly for subscription-style billing, floating unresolved ideas like time-bound access tokens or stake-and-slash instead of prepayment."
      },
      {
        "type": "paragraph",
        "text": "The underlying case is unglamorous but load-bearing: agentic commerce won't hinge on smarter models so much as on unremarkable infrastructure, discovery, payment, reputation, being solved for machines the way it already was for people."
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
        "text": "Sam Green argued that the real fix for crypto was not AI in the abstract but agents specifically, and that a wider shift he called the agentic revolution would move AI from giving financial advice to actually executing on a user's behalf. He treated crypto as the natural setting for that shift, since programmable money paired with autonomous decision-making is what agentic finance requires, and he backed the claim with a taxonomy of products already live rather than a purely speculative pitch."
      },
      {
        "type": "paragraph",
        "text": "He built the case historically. Steam power, centralised electricity and the transistor each opened a prior revolution, and each one compounded productivity before laying the ground for the next. He placed the coming agentic era as the fourth in that sequence, and tied its timeline to two compounding curves, Moore's law for compute and a claimed yearly doubling in AI model performance since GPT 3.5 reached mass adoption faster than any consumer product before it."
      },
      {
        "type": "paragraph",
        "text": "Green defined an agent by a sense, think, act loop and mapped existing crypto agent products on two axes, autonomy (advice versus direct on-chain action) and intelligence (simple rule-based logic versus AI-driven decisions). Within that map he walked through five segments: agents that trade on prediction and betting markets, agents that manage trading and portfolio decisions, information agents that act as co-pilots rather than executors, agents that provision liquidity across decentralised exchanges, and lending agents that move a user's collateral between protocols to chase yield. He named lending as the segment with the most product-market fit and the largest share of assets under management so far."
      },
      {
        "type": "paragraph",
        "text": "On numbers, all of them self-reported and unverified, Green said assets under management in agentic finance were near zero at the start of 2025, reached roughly $20 million by October, and stood around $500 million by the talk, a jump he gave without further support. He also cited stablecoin market cap growing from roughly $20 billion to $300 billion over five years, stablecoin transaction volume overtaking Visa's, and an Ernst & Young survey putting institutional interest in DeFi at 24 percent today, rising to a projected 75 percent within two years."
      },
      {
        "type": "paragraph",
        "text": "The talk mattered less for any single figure than for the frame it offered: judge agentic finance by whether it changes which markets and actions become possible, not by whether any one model sounds convincing today."
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
        "organisation": "Google",
        "isModerator": false
      },
      {
        "name": "Nader Dabit",
        "organisation": "Eigen Labs",
        "isModerator": false
      },
      {
        "name": "Clemens",
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
        "text": "Five builders agreed on what an agentic system needs, an LLM loop plus memory, tools and an environment to run in, but split on whether any of it needs to be decentralised. Nicolás Montone argued that agents simply require trusting whichever model provider sits behind them, the same trust any app already asks for, and that decentralisation mostly earns its place around payments between agents. Nader Dabit and Juan Irungaray leaned the other way: as specialised agents built by different teams start depending on each other, something resembling blockchain-level trust becomes necessary, even though no agent can live inside a contract."
      },
      {
        "type": "paragraph",
        "text": "Dabit made that case at the mechanism level. Contracts are action-based while agents must run continuously and reach external APIs, so a plain server has none of a contract's auditability. His answer, Eigen's compute product, gives an agent a trusted execution environment holding a wallet key generated inside the runtime, so only the running agent, not its operator, can spend funds sent to it. A companion product targets deterministic, re-executable inference, so a prompt and model can be shown to produce a given output. He called ERC-8004 a useful but unsettled start on reputation."
      },
      {
        "type": "paragraph",
        "text": "Clemens focused on the layer underneath: agents with wallet or RPC access need hard limits on trade size and exposure, and an abstraction like a phone user never picking a GPS satellite, setting a preference (cheaper, faster, greener) instead. He preferred an approval flow that checks with a human until a workflow proves itself and remembers it, rather than an intrusive prompt every time, alongside attested identity so an agent can prove who it acts for."
      },
      {
        "type": "paragraph",
        "text": "Montone sketched Vercel's stack in four layers: environment (v0 runs on fluid compute, billing only CPU actually used, not time waiting on a model), context (cacheable, injectable system prompts), actions (tools and MCP), and application, where a failed build is fed back for self-correction. Irungaray described Google's Agent Engine as infrastructure hosting agents built on LangGraph, Hugging Face or Google's own ADK, abstracting away memory and session handling, with ADK sitting between LangGraph and n8n. He named x402 and A2A as protocols still short of consensus."
      },
      {
        "type": "paragraph",
        "text": "The live disagreement, over where trust sits once agents act with money and each other's outputs, outweighs the acronyms. MCP, A2A, x402 and ERC-8004 all showed up as scaffolding still being poured, a useful check on anyone assuming the stack is finished."
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
        "text": "Artem Kotelskiy argued that AI and crypto were pushing capitalism toward what cyber•Fund internally calls a cybernetic economy: a resource allocation system that is self-regulating and, unlike the one we have now, hyperefficient. His case was that human limits, not the market mechanism itself, are what produce capitalism's failures, and that AI removes those limits while crypto supplies the infrastructure for the resulting activity to actually take place."
      },
      {
        "type": "paragraph",
        "text": "He built the argument in two steps. First, prices work as a signal that adjusts supply and demand, but people executing on that signal are bounded: limited in how much they can research, process, coordinate and act on, which he tied to asset bubbles and principal-agent problems. AI, in his framing, directly extends those bounded capacities, so plugging AI into the existing market mechanism just makes the invisible hand work harder."
      },
      {
        "type": "paragraph",
        "text": "The second step was less conventional. He distinguished markets already programmatically accessible, like public stock exchanges, from markets that are not, such as government procurement or task-based gig work, and used a personal anecdote about ordering party balloons through a chatbot to illustrate the second kind: the agent completed the task but picked poorly, because the underlying market had no structured way to be queried or bid into. His claim was that AI's real function is to instrument these markets, reading a request, extracting the actual intent and constraints, spinning up a temporary auction, finding counterparties, and settling into a contract. He named the missing piece as \"mechanism-aware AI,\" agents that understand they are negotiating economically and know what to disclose, and said this does not yet exist. He also argued agents transacting this way erode the ad-supported attention economy, since agents do not look at banners, and gestured at a machine-to-machine payment rail as the kind of infrastructure this favors, without detailing it further. Blockchains, he said, are a plausible but not guaranteed substrate for the coordination itself."
      },
      {
        "type": "paragraph",
        "text": "He closed on a values point: the cybernetic economy is coming regardless, but the path there is not fixed, and a passive path risks concentrating data and control rather than distributing it."
      },
      {
        "type": "paragraph",
        "text": "That framing is a useful counterweight to the event's more concrete sessions. It names why \"agents doing DeFi\" or \"agents doing research\" are instances of one larger shift, even though the talk itself stayed at the level of thesis rather than working system."
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
        "text": "Ricky Esclapon walked through a string of experiments Cambrian had run on top of its data agent, Deep 42, which links on-chain contracts to off-chain sources such as GitHub and social data. The throughline was practical rather than theoretical: each step, from wrapping the agent in ERC-8004 to testing trusted execution to building a discovery layer, was framed as a working prototype rather than a finished product, and Esclapon was candid about what still did not hold together across the stack."
      },
      {
        "type": "paragraph",
        "text": "The first step was making Deep 42 an ERC-8004 agent, which he said depended more on getting the A2A agent card right than on the ERC-8004 wrapping itself, and he credited the agent0 SDK for making that easier. From there Cambrian tried trusted execution environments, running one TE for the agent and one for its MCP server and building a UI to surface the proofs between them. He was upfront that this removed only some trust assumptions, not all of them, and pointed people toward their open-sourced repo and toward a managed cloud compute service he rated highly for standing up TEEs, if a pricier one."
      },
      {
        "type": "paragraph",
        "text": "The bulk of the demo covered agent discovery: an API that takes a question, matches it to an agent's A2A skills through a knowledge graph, and returns a ranked, sourced answer along with an execution plan for which agent to call. He showed this running against a query about which agents know about movies, backed by a Google Spanner database chosen for combining Cypher and SQL in one place. Because Spanner is not permissionless and carries no attestation model, Cambrian built its own graph-SQL database instead, one anyone could provision, pay for on-chain, and query with attestations attached, and he showed data being written into it live."
      },
      {
        "type": "paragraph",
        "text": "The value of the demo was in showing its own seams. Esclapon said plainly that current agent standards do not yet compose cleanly in practice, and that discovery, verifiable data, and permissionless payment are three separate problems Cambrian is stitching together rather than one solved stack, which is a more honest picture of ERC-8004 tooling today than any launch announcement would give."
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
        "text": "Shaw Walters used Babylon, a prediction-market game built on ElizaOS, to make a narrower claim than most agent talks: a registry standard for identity, discovery and reputation was usable now, most LLM trading agents had made no money, and the path to agents that work ran through simulation, not live capital."
      },
      {
        "type": "paragraph",
        "text": "Babylon grew out of Walters getting banned from X over open-source work tied to Eliza, so he built a parallel feed of AI versions of public figures, wrapped it in a betting layer, and framed it as the first real test of ERC-8004. He described the standard as three things folded together, identity, a discoverable registry of agents and services, and reputation, and compared it to Yelp and Fiverr merged into one directory that agents, not people, populate and query. Multiple teams, naming Near, Hedera and Olas, had converged on wanting the same registry, which he treated as the reason to build on a shared, neutral standard rather than a house version. Babylon signs users into that registry on sign-up. He also described early use of a lightweight standard for agent-to-agent payments, calling it thin and still maturing."
      },
      {
        "type": "paragraph",
        "text": "Walters was openly skeptical of current DeFi trading agents, arguing that an LLM wired to an action-caller is not a strategy, that every such agent he had seen had lost money, and that simply holding Bitcoin beat all of them. His alternative was reinforcement learning inside a closed simulation: agents in Babylon trade against the game, every decision and outcome is logged as a trajectory, and a judge model ranks a batch of trajectories best to worst by profit and success rate, a method he called group ranked policy optimization. The reward comes from that judging step rather than hand-coded rules, which he said was noisy but workable given clean data. Agents should prove they can make money in simulation before being trusted with real funds."
      },
      {
        "type": "paragraph",
        "text": "On infrastructure, he argued against putting model inference on-chain, since replicating LLM compute across every validator does not scale, and described running inference off-chain inside trusted execution environments. Results are checked using the fact that a seeded LLM on identical hardware reproduces deterministically, letting a second machine verify a result without re-running the whole chain."
      },
      {
        "type": "paragraph",
        "text": "The wider claim underneath it: prediction markets are starting to shape the outcomes they forecast, and Walters wants the registry and verification layer built now, while it is still small."
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
        "text": "Renç Korzay argued that DeFi had drifted from its original promise of open access and was now run by a small class of people who know how to read collateral positions and calculate yields. His proposed fix was the financial agent: a persistent, deterministic piece of software that manages capital on behalf of a user according to that user's own stated policies, rather than a one-off bot or script. Giza builds these agents specifically for stablecoins, which he framed as the asset class most in need of this kind of automation."
      },
      {
        "type": "paragraph",
        "text": "He defined a financial agent narrowly: it runs continuously, evaluates and reallocates on an ongoing basis, and relies on auditable, traditionally battle-tested financial logic rather than opaque models. To illustrate the problem it solves, he showed how fragmented the stablecoin landscape had become, arguing that no person can track that many tokens and protocols while making fast, high-stakes decisions. Giza's answer collapses that landscape into a single interface: a user deposits capital once, sets preferences such as which collateral or curator to trust, and the agent executes continuously against those preferences."
      },
      {
        "type": "paragraph",
        "text": "He gave figures for Giza's own deployment, all self-reported and unverified: agents live for roughly eight months, having moved more than three billion dollars in what he described as real, fee-bearing volume on Base rather than incentivized test activity, and having executed close to a million financial decisions. He said over 65 percent of users customize their agent's policies rather than accept defaults, and that users had seen roughly double the yield of a static or manually managed position. He also cited close to 200 billion dollars in stablecoins sitting idle industry-wide, a gap he attributed to infrastructure lagging behind what automation now makes possible. He closed by naming Ethereum's security, composability and deep liquidity, plus L2 cost and latency improvements, as the reasons Giza builds there."
      },
      {
        "type": "paragraph",
        "text": "The claim worth weighing is less about any one number than the framing itself: that autonomy is being pitched as the route back to DeFi's founding idea of access for everyone, not just those willing to learn its mechanics."
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
        "text": "Four builders were asked how much control over capital AI agents should be given in DeFi, and largely talked each other out of the optimistic answer. All four saw agents as a real efficiency gain in monitoring, execution and interface design, and none would hand them unsupervised control of funds. What emerged was a shared near-term shape: bounded execution, verified data, and a human who remains accountable."
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
      },
      {
        "type": "paragraph",
        "text": "The accountability question the moderator kept returning to is the one that gates adoption. Every guardrail discussed exists to answer it. Agentic finance does not arrive when agents get good enough to act alone; it arrives when someone can say who is responsible when they act wrongly."
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
        "text": "Michael Sena argued that benchmarks, the industry's default way of deciding which AI model or agent to trust, had stopped working, and proposed replacing them with open, funded competitions where any model or agent proves itself under real conditions rather than a fixed test."
      },
      {
        "type": "paragraph",
        "text": "His case against benchmarks had three parts. Large labs increasingly trained their models on the benchmark questions themselves, so a model could top the leaderboard and still disappoint in production, a pattern he illustrated with Grok 4. Benchmarks were also run by a small number of operators covering only the most prominent large models, leaving specialized agents, the kind built by individual developers for tasks like crypto trading, entirely outside any reputation system. And the format could not scale: as the number of agents and the range of tasks they attempted kept multiplying, a handful of fixed tests could never keep pace."
      },
      {
        "type": "paragraph",
        "text": "Recall's alternative let anyone fund an arena, define what success meant for a given skill, and open it to competing models and agents. For an objective skill like trading, results were read directly on-chain against metrics such as Sharpe, Sortino or Calmar ratios rather than raw returns alone. Arenas ran across multiple rounds so a win could be distinguished from luck, with users adding forward-looking curation before statistical significance was reached. Output was a continuously updating on-chain ranking meant to feed reputation registries such as ERC-8004, producing not one master score but a separate score per skill."
      },
      {
        "type": "paragraph",
        "text": "Sena reported (treat as self-reported and unverified) fifteen arenas run so far, spanning trading, a football play-calling contest, an internal coding arena scored on reviewer comments before merge, and new arenas executing on EigenLayer for verifiable computation alongside Recall's on-chain verified results. Asked in Q&A how rankings avoided rewarding lucky streaks, he described an Elo-style score paired with a separate confidence measure that only rises with repeated competition, so a lower score built over many rounds would outrank a higher one earned in a single appearance."
      },
      {
        "type": "paragraph",
        "text": "The pitch mattered less for the specific arenas than for what it implied about reputation itself: if trust in an AI system has to be earned skill by skill, in public, over repeated rounds, no single registry or benchmark can just declare it. Verification becomes a continuous, adversarial process rather than a one-time score."
      }
    ]
  },
  {
    "slug": "verisafe-spec-driven-smart-contract-development",
    "title": "VeriSafe: Spec-Driven Smart Contract Development Technology",
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
        "text": "Mooly Sagiv of Certora pushed back on the assumption that language models make smart contract code less secure. He argued the opposite could hold if a model's output was checked against a formal specification rather than trusted on its own, and used the talk, presenting alongside his Certora colleague John Toman, to walk through a tool they built to do that: generate contract code from a spec, verify it against a prover, and feed the prover's failures back to the model until the implementation was provably correct."
      },
      {
        "type": "paragraph",
        "text": "He framed the problem first. Contract security already leans on skilled developers plus auditing, fuzzing and formal verification, and bugs still get through. The common prediction was that models would make this worse, producing more buggy code faster. Sagiv's counter was an older idea, starting from a specification rather than from code, paired with a model: the model guessed plausible implementations, and formal verification knew when a guess was wrong."
      },
      {
        "type": "paragraph",
        "text": "The mechanism, demonstrated on a contrived liquidity pool where withdrawal fees rose with withdrawal size, ran as a loop. A design document and a formal spec went in alongside an interface, and before writing code the model scanned the documents for requirements the formal rules didn't cover. It generated an implementation, checked by Certora's prover at the bytecode level. A failure produced a counterexample explaining the violation, fed back to the model for another pass. When the demo pool's first implementation blocked one large withdrawal but not the same amount split into many small ones, the team added a spec rule rather than regenerating from scratch, feeding the prior implementation and the model's memory of earlier answers back in so the fix stayed minimal. The model could also flag the spec itself as wrong when a counterexample conflicted with the design intent, proposing a change a human had to approve."
      },
      {
        "type": "paragraph",
        "text": "In the Q&A, the team said the loop carried no formal convergence guarantee, only a model prompted to ask for help when stuck, with a person able to interrupt if it didn't. They placed the technique inside an older synthesis idea, generate and check until it holds, with a language model as the proposer."
      },
      {
        "type": "paragraph",
        "text": "The session mattered less for the specific pool than for the discipline it modeled: a model's output as a draft a checker can reject, not a finished answer. That framing sits under most of the agent trust questions running through the rest of the event."
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
        "text": "Sandi Fatic argued that AI was repeating a pattern he had watched play out with email and money: a technology starts decentralised, gets captured by centralised operators, and has to be won back by people willing to build alternatives. He framed corporate-controlled AI as the next target for that kind of rebellion, and presented Calimero Network's peer-to-peer, local-first infrastructure as one attempt at the counter-system."
      },
      {
        "type": "paragraph",
        "text": "His argument rested on a surveillance metaphor before it rested on architecture. He described a prison design where a single watchtower can see every cell but inmates can never tell when they are being watched, and said the uncertainty alone was enough to make people self-censor. He tied that to working inside large tech companies, recalling being told to bring his authentic self to work and a colleague warning him that doing so honestly would get him fired. He also pointed to the gap between the data a user can export from a centralised service and the far larger volume that service actually holds on them, and to European proposals to scan private messages, as evidence that any standing capability to monitor communications eventually gets used."
      },
      {
        "type": "paragraph",
        "text": "On the technical side, he described Calimero as a peer-to-peer network rather than a blockchain: data lives on a user's own device, and nodes use a conflict-free replicated data type instead of blockchain consensus, so each participant's local changes broadcast to peers who verify and merge them without a central server. He cited a hackathon project built on this where medical institutions trained a model by exchanging only weight updates, never patient data. On payments, he pointed to the HTTP 402 status code, revived for agent-to-agent micropayments, as a useful building block undermined by running on fully public, traceable rails, arguing it needed private, encrypted settlement using stablecoins or tokens instead."
      },
      {
        "type": "paragraph",
        "text": "Fatic's framing was closer to polemic than protocol spec, and he said as much: he was arguing for values, not pitching a product. Read past the rebellion language, the concrete claim is narrower and more useful, that agent commerce is being built on payment rails that are cheap and fast but not private by default, and that privacy has to be engineered in rather than assumed. As agents start paying each other for data, compute and inference, which rail they settle on, and who can watch that settlement, becomes a real design question rather than a philosophical one."
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
