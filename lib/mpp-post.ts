import type { BlogBlock, BlogInline, BlogListItem } from './blog'

const strong = (text: string): BlogInline => ({ text, strong: true })
const code = (text: string): BlogInline => ({ text, code: true })
const emphasis = (text: string): BlogInline => ({ text, emphasis: true })
const agenticFinanceLink = (text = 'agentic finance', strongLink = false): BlogInline => ({
  text,
  href: '/what-is-agentic-finance',
  strongLink,
})
const paragraph = (...content: BlogInline[]): BlogBlock => ({ type: 'paragraph', content })
const introParagraph = (...content: BlogInline[]): BlogBlock => ({
  type: 'paragraph',
  content,
  accentStrong: true,
})
const brandedParagraph = (...content: BlogInline[]): BlogBlock => ({
  type: 'paragraph',
  content,
  accentStrong: true,
})
const item = (...content: BlogInline[]): BlogListItem => content

export const MPP_POST_BODY: BlogBlock[] = [
  introParagraph(
    'When AI agents start transacting, the infrastructure beneath them changes shape. Software needs to discover prices, understand payment terms, authorize spend and receive proof without relying on a human checkout flow.'
  ),
  introParagraph(
    'The ',
    strong('Machine Payments Protocol (MPP)'),
    ' gives us one of the clearest early places to observe this change. It brings payment authentication into HTTP itself, allowing software to negotiate access and pay through stablecoins, cards and other rails.'
  ),
  introParagraph(
    'For ',
    agenticFinanceLink('agentic finance', true),
    ', that makes MPP particularly interesting: it is early, real, measurable and easy to misread. MPP-mediated payments are already reaching production services, but a transfer count is not a customer count, a funded channel is not a purchase, and onchain activity does not by itself prove agent demand.'
  ),
  { type: 'heading', text: 'Summary' },
  {
    type: 'list',
    accentStrong: true,
    items: [
      item(
        strong('MPP is an early piece of agentic payments infrastructure.'),
        ' MPP is an HTTP payment coordination and authentication protocol co-authored by Tempo and Stripe. It defines how a service requests payment, how a machine provides payment authorization or proof, and how the service returns a receipt. MPP can settle payments through Tempo, Stripe/card infrastructure, among other networks.'
      ),
      item(
        strong('MPP puts payment negotiation inside the HTTP request/response loop.'),
        ' A machine can encounter a ',
        code('402 Payment Required'),
        ', receive machine-readable terms, authorize, and receive the resource plus a receipt without requiring the typical human-actions of account creation, checkout, prepaid credits or a manually configured subscription. MPP coordinates existing payment infrastructure rather than replacing it.'
      ),
      item(
        strong('Expansion in machine settlements.'),
        ' Sessions are high-volume, optimized for micropayments. Between June and July, observable session activity increased by 7,462.8%. Active payer addresses rose 271.8% and payment frequency per active payer increased 1,933.9%. At the same time, total priced value transferred fell 22.7% and the median priced session transfer fell 86.5%.'
      ),
      item(
        strong(
          'From verified Tempo session infrastructure, we reconstructed 192,964 onchain transfers to service providers across 192,953 Tempo transactions'
        ),
        ', involving 1,672 payer addresses and 70 recipient addresses. These transfers can settle multiple paid requests accumulated within a session, so they should not be read as individual purchases.'
      ),
      item(
        strong('USDC.e dominates in settlement.'),
        ' Within the measurable MPP Tempo sessions, it represents ',
        strong('99.96% of visible settlements'),
        '.'
      ),
    ],
  },
  paragraph(
    'The largest missing number is complete charge activity. Tempo charges do not have one mandatory marker used by every implementation. A current standard MPP tag lets us identify a large subset of transfers, but not reconstruct every charge. This post does not produce complete Tempo MPP settlement count, value, charge/session share. MPP has real services and observable economic settlement. What the current evidence does not support is a claim of broad, independently distributed economic adoption, a global MPP market size until these numbers can be reviewed.'
  ),
  { type: 'divider' },
  { type: 'heading', text: 'What is MPP and where it fits in agentic payments' },
  paragraph('MPP standardizes payment authentication over HTTP.'),
  paragraph(
    'Like x402, it lets software encounter a price and pay for a resource inside the request-response flow rather than requiring a separate account, billing relationship or checkout.'
  ),
  paragraph(
    'Its main contribution is separating that payment from both the settlement rail and the billing model. The same Challenge–Credential–Receipt exchange can support different payment methods, such as stablecoins, cards or Lightning, and other payment models: one-time charges, sessions or subscriptions.'
  ),
  paragraph('AP2 and ACP, though standards as well, solve different problems:'),
  {
    type: 'list',
    items: [
      item('AP2 focuses on proving that an agent was authorized to make a purchase'),
      item(
        'ACP manages checkout and order lifecycle. MPP handles payment for a resource; it does not prove human intent or manage a cart.'
      ),
    ],
  },
  paragraph(
    'An MPP payment can be generated by an AI agent, an agent following a predefined spending policy, a deterministic bot, a cron job, an ordinary API client, a developer test and also human-triggered software.'
  ),
  paragraph('One useful way to understand an MPP payment is to separate the components:'),
  {
    type: 'table',
    headers: [['Component'], ['Function'], ['Examples']],
    rows: [
      [[strong('Protocol')], ['Defines how payment is negotiated and authenticated'], ['MPP / HTTP Payment Authentication']],
      [[strong('Payment intent')], ['Defines what economic interaction is being requested'], ['Charge, session, subscription']],
      [[strong('Payment method / rail')], ['Defines how value is authorized or moved'], ['Tempo, Stripe, cards, EVM, Solana, Lightning']],
      [[strong('Asset')], ['Defines what value is transferred'], ['TIP-20 stablecoin, USDC, BTC, fiat/card denomination']],
      [[strong('Wallet / signer')], ['Authorizes the payment'], ['User wallet, agent-controlled restricted key, managed signer']],
      [[strong('Processor / relay / facilitator')], ['Validates, broadcasts or processes payment where applicable'], ['Stripe, MPP relay, Lightning provider']],
      [[strong('Service / provider')], ['Supplies the paid resource'], ['API, data service, browser infrastructure, merchant']],
      [[strong('Client / agent')], ['Encounters and satisfies the payment requirement'], ['AI agent, deterministic bot, application, cron process, human-triggered client']],
    ],
  },
  paragraph(
    'MPP sits at the top of this stack. Tempo sits lower, as one possible settlement environment.'
  ),
  paragraph(
    'Tempo has been designed with MPP-friendly primitives—including stablecoin-oriented transactions, scoped access keys, fee sponsorship and dedicated payment-channel infrastructure.'
  ),
  paragraph(
    'MPP is useful beyond stablecoin-native services. Stripe can process MPP payments through its existing payments infrastructure, including card-based payments. MPP coordinates the payment request and authorization; Stripe handles processing and merchant settlement. These payments do not necessarily produce a public blockchain transaction.'
  ),
  paragraph(
    'MPP is not limited to agent-to-agent digital services: the protocol can mediate software purchasing browser time, data, physical mail, physical goods or other services.'
  ),
  { type: 'divider' },
  { type: 'heading', text: 'How MPP works: HTTP 402, authorization and receipts' },
  paragraph('MPP extends normal HTTP authentication to payments:'),
  {
    type: 'code',
    content: `request
   ↓
402 Payment Required
WWW-Authenticate: Payment ...
   ↓
client authorizes payment
   ↓
retry original request
Authorization: Payment ...
   ↓
server validates / settles
   ↓
resource + Payment-Receipt`,
  },
  paragraph(
    'The ',
    code('402'),
    ' carries the payment terms, the credential carries authorization or proof, and the receipt confirms the result. The price and accepted payment method can therefore be discovered and handled by software at request time.'
  ),
  paragraph(
    'The HTTP exchange remains offchain. Whether payment produces a blockchain transaction depends on the payment method.'
  ),
  { type: 'subheading', text: 'Charge' },
  paragraph('A ', strong('charge'), ' is a one-time payment for a resource.'),
  paragraph(
    'On Tempo, charges can use direct TIP-20 transfers or split payments. There is no single mandatory contract or event that identifies every MPP charge.'
  ),
  { type: 'subheading', text: 'Session' },
  paragraph('A ', strong('session'), ' is designed for repeated, small payments.'),
  paragraph(
    'A payer funds a payment channel and signs cumulative payment authorizations offchain as the service is used. Rather than settling every request individually, the provider can settle the accumulated amount periodically or when the channel closes.'
  ),
  {
    type: 'code',
    content: `fund channel onchain
        ↓
request → payment authorization
request → larger authorization
        ↓
optional settlement
        ↓
more requests
        ↓
final settlement + refund of unused funds`,
  },
  paragraph(
    'This means one onchain transfer can settle multiple paid requests, making blockchain transaction counts a poor proxy for actual service usage.'
  ),
  { type: 'minorHeading', text: 'How to read the numbers' },
  paragraph('Not every observable event represents the same thing.'),
  {
    type: 'table',
    headers: [['Unit'], ['Meaning']],
    rows: [
      [[strong('Paid request')], ['One API or service interaction paid through MPP. Within a session, these are generally not individually visible onchain.']],
      [[strong('Session transfer')], ['Funds transferred onchain to a provider from an MPP session. One transfer can settle multiple paid requests.']],
      [[strong('Lifecycle event')], ['Opening, funding, settling or closing a payment channel. It is not necessarily a payment.']],
    ],
  },
  paragraph(
    'This is why the numbers below cannot be read interchangeably: paid requests, onchain transfers, blockchain transactions and channel activity measure different things.'
  ),
  { type: 'divider' },
  { type: 'heading', text: 'Where MPP can operate' },
  paragraph('MPP is not tied to one payment rail, but implementation and production evidence vary.'),
  {
    type: 'table',
    headers: [['Method'], ['Current evidence']],
    rows: [
      [[strong('Tempo')], ['Charge, session and subscription; in production']],
      [[strong('Stripe / cards')], ['Production support through Stripe']],
      [[strong('Lightning')], ['Charge and session implementations; production volume unknown']],
      [[strong('EVM, Solana and other networks')], ['Specifications or implementations exist; meaningful production usage is not established here']],
    ],
  },
  paragraph(
    'MPP may operate across several rails, but Tempo provides the clearest public view of settlement activity.'
  ),
  { type: 'divider' },
  { type: 'heading', text: 'MPP on Tempo: stablecoin settlement by the numbers' },
  paragraph(
    "Tempo gives us the clearest public view into MPP's onchain payment rails. It is particularly useful for studying the combination of ",
    strong('stablecoin settlement, payment channels and micropayments'),
    ' that ',
    agenticFinanceLink(),
    ' is expected to rely on.'
  ),
  { type: 'subheading', text: 'Throughput' },
  paragraph('Tempo MPP session infrastructure had produced:'),
  {
    type: 'list',
    items: [
      item('472,004 lifecycle events'),
      item('192,964 onchain session transfers to service providers'),
      item('192,953 Tempo transactions containing those transfers'),
      item('1,672 payer addresses and 70 recipient addresses'),
    ],
  },
  paragraph(
    'There are 11 more transfers than transactions because a single Tempo transaction can contain more than one transfer to a provider.'
  ),
  paragraph(
    'A separate attribution method identified 2.57 million MPP-tagged Tempo transfers through August 26. This expands what we can observe beyond sessions, but it is still not a complete charge count: not every implementation uses the tag, and one charge can produce multiple transfers.'
  ),
  { type: 'minorHeading', text: "Asset mix on Tempo's observable data" },
  paragraph('Asset composition is overwhelmingly concentrated in USDC.e:'),
  {
    type: 'table',
    headers: [['Asset'], ['Session transfers'], ['Native payee value'], ['Share of session transfers']],
    rows: [
      [['USDC.e'], ['192,895'], ['1,712.962917'], [strong('99.9642%')]],
      [['MACHUSD'], ['53'], ['9.864'], ['0.0275%']],
      [['pathUSD'], ['16'], ['3.283006'], ['0.0083%']],
    ],
  },
  paragraph(
    'USDC.e also represents ',
    strong('99.8087% of priced session value'),
    '. This also shows how early MPP activity is converging around ',
    strong('programmable stablecoin money'),
    ' rather than a broad mix of assets.'
  ),
  { type: 'minorHeading', text: 'Concentration' },
  paragraph(strong('Recipient payment routes:')),
  {
    type: 'list',
    items: [
      item('top recipient by count: ', strong('98.43% of session'), ';'),
      item('top 10 recipients by count: ', strong('99.58%'), '.'),
    ],
  },
  paragraph(
    "The MPP directory identifies many of these services as third-party integrations accessed through shared proxy infrastructure. The address receiving 189,935 session transfers is shared across multiple services: standard-tagged transfers associated with 30 distinct server fingerprints also route to it."
  ),
  paragraph(
    'The 98.43% concentration by transfer count is largely an infrastructure effect: the dominant recipient is shared across multiple services. Recipient-address concentration therefore cannot be read directly as service-market concentration.'
  ),
  paragraph(strong('Value:')),
  {
    type: 'list',
    items: [
      item('top recipient by priced value: 20.86%;'),
      item('top 10 recipients by priced value: 96.57%.'),
    ],
  },
  paragraph(
    'The count-dominant recipient received ',
    strong('189,935 session transfers'),
    ' but approximately ',
    strong('297.7 USDC.e'),
    ' in native settled value.'
  ),
  paragraph(strong('Payers:')),
  {
    type: 'list',
    items: [
      item('top payer: 1.67% ofsession transfers'),
      item('top 10: 7.97%;'),
      item('top 100: 69.75%;'),
      item('payer-count Gini: 0.884.'),
    ],
  },
  paragraph(
    'A small number of payer addresses are responsible for most of the money, but not for most of the payments: the top 10 payers account for ',
    strong('54.36% of priced value'),
    '.'
  ),
  { type: 'minorHeading', text: 'Growth in July' },
  {
    type: 'table',
    headers: [['Metric'], ['June'], ['July'], ['Change']],
    rows: [
      [['Session transfers'], ['775'], ['58,612'], [strong('+7,462.8%')]],
      [['Active payer addresses'], ['142'], ['528'], [strong('+271.8%')]],
      [['Transfers per active payer'], ['5.46'], ['111.01'], [strong('+1,933.9%')]],
      [['Priced value'], ['$406.86'], ['$314.69'], [strong('−22.7%')]],
      [['Median transfer value'], ['$0.0074'], ['$0.0010'], [strong('−86.5%')]],
    ],
  },
  paragraph(
    'Observable Tempo session activity exploded primarily because each active payer address generated far more, much smaller transfers—not because economic value grew proportionally.'
  ),
  paragraph('By August 26, the month had already recorded 127,621 session transfers.'),
  { type: 'minorHeading', text: 'Channel funding and completion' },
  paragraph(
    'A channel opens when the payer wants to start or prepare a session-based payment relationship with a service. But it might not actually purchase a service.'
  ),
  paragraph('For example:'),
  {
    type: 'table',
    headers: [['Infrastructure / asset'], ['Total funded'], ['Paid to payees'], ['Refunds observed']],
    rows: [
      [['Legacy USDC.e'], ['36,459.130370'], ['1,186.956023'], ['31,413.550234']],
      [['V2 USDC.e'], ['4,042.539839'], ['526.006894'], ['2,838.774543']],
    ],
  },
  paragraph('Among ', strong('16,536 completed channels'), ':'),
  {
    type: 'list',
    items: [
      item(strong('54.35%'), ' had ', strong('0% utilization'), ' and were fully refunded.'),
      item('median utilization was ', strong('0%'), ' and mean ', strong('7.48%'), '.'),
    ],
  },
  paragraph(
    'Channel funding should not be treated as consumer intent. The current SDK can open and fund a channel automatically after the first 402. Reusing the same channel across process restarts also depends on client state.'
  ),
  paragraph(
    'Short, fully refunded channels are possible without implying a completed purchase. The ',
    strong('54.35% of completed channels with zero utilization'),
    ' could include rejected or abandoned first attempts, explicit closes, stateless deployments, testing or other automation. The chain cannot distinguish among those causes.'
  ),
  paragraph(
    'What it does establish is that a deposit is reserved capacity; only value ultimately allocated to the payee is settlement.'
  ),
  { type: 'minorHeading', text: 'The 45k statistic' },
  paragraph('The historical public figure around 45,000 reconciles precisely to:'),
  {
    type: 'list',
    items: [
      item(strong('45,274 legacy lifecycle events not payments'), ';'),
      item(strong('36,504 distinct transactions'), ' emitting those events;'),
      item(strong('84.66% of lifecycle events consisting of channel opens or closes'), '.'),
    ],
  },
  paragraph(
    'A channel can produce multiple lifecycle events without any corresponding purchase, and a session can support multiple paid requests without producing a separate lifecycle event for every request.'
  ),
  brandedParagraph(
    'The data also shows why at ',
    strong('Agentic Zero'),
    ' we focus on what has to change in financial rails for agents: a transfer count is not a customer count. A channel open is not a purchase. Funding is not utilization. As machine payments become easier to generate, understanding what the underlying event actually represents becomes more important, not less.'
  ),
  { type: 'minorHeading', text: 'Payer-address activity and retention' },
  paragraph(
    'Among the 1,672 payer addresses in the reconstructed settlement dataset: ',
    strong('64.06%'),
    ' were active on at least two days.'
  ),
  paragraph('Exact-day retention:'),
  {
    type: 'list',
    items: [
      item('After 1 day: ', strong('19.27%')),
      item('After 7 days: ', strong('19.78%')),
      item('After 30 days: ', strong('12.97%')),
      item('After 60 days: ', strong('0.81%')),
    ],
  },
  paragraph(
    'These figures describe ',
    strong('payer-address retention'),
    ', not customer, company or agent retention. Exact-day retention also means activity on that specific future day.'
  ),
  { type: 'divider' },
  { type: 'heading', text: 'Services and ecosystem' },
  paragraph("MPP's public directory contains:"),
  {
    type: 'list',
    items: [
      {
        content: [strong('141 current services')],
        children: [
          {
            content: [
              '91 have a published realm or endpoint hostname whose cryptographic fingerprint appears in standard-tagged Tempo transfers.',
            ],
            children: [item('50 are categorized as data services'), item('23 as AI services')],
          },
        ],
      },
      item(strong('1,449 endpoints')),
      item(strong('139 services advertising Tempo')),
      item(strong('133 advertising Tempo charge')),
      item(strong('7 advertising Tempo session')),
    ],
  },
  paragraph(
    'The visible services footprint is concentrated in programmatic data, search, model/media and infrastructure APIs rather than broad consumer checkout. The strongest production examples include ',
    strong('Parallel, Dune, Allium, Browserbase, Orthogonal, StableEnrich, Alchemy and KeeperHub'),
    '.'
  ),
  paragraph(
    'Agent402 separately documents scheduled canary purchases of roughly ',
    strong('204 Tempo charges per day'),
    ', down from an earlier roughly 1,000 per day.'
  ),
  paragraph(
    'Current public evidence shows where MPP is being offered and used, but it does not identify most buyers or establish broad independent demand.'
  ),
  { type: 'heading', text: 'What the data says about adoption and market structure' },
  paragraph('MPP is early, real, measurable and easy to misread.'),
  {
    type: 'list',
    items: [
      item(
        strong('Breadth is increasing, but throughput is increasing much faster'),
        '. The jump from 142 to 528 active payer addresses between June and July demonstrates expansion in address-level participation'
      ),
      item(
        strong('Throughput increased far faster'),
        '. Session transfers per active address moved from 5.46 to 111.01.'
      ),
      item(
        strong('July produced more than 75 times as many session settlements than June.'),
        ' It shows that the system is being used for very small units of value, precisely ',
        emphasis('the'),
        ' use the architecture is designed to support.'
      ),
      item(
        strong('Repeat activity exists.'),
        ' A majority of observed payer addresses appear on more than one day. This is a proxy since, of course, one user can control many addresses.'
      ),
    ],
  },
  { type: 'heading', text: 'Why this matters for agentic finance' },
  paragraph(
    agenticFinanceLink('Agentic finance'),
    ' is not just about AI agents transacting onchain. It requires financial infrastructure that software can actually use: prices that can be discovered programmatically, payments that can be authorized under delegated controls, stablecoins or card rails that can settle without a human checkout, and receipts that machines can verify.'
  ),
  paragraph(
    'MPP is one early implementation of that idea. x402, AP2 and ACP approach adjacent parts of the same problem from different directions. Their emergence suggests that financial infrastructure is beginning to be designed with machine actors in mind.'
  ),
]
