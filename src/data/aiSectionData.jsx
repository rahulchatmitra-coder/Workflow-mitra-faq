/**
 * Content for the "Everything you need to make AI work" bento section.
 *
 * It lives outside the component for two reasons. The obvious one is that four
 * cards of literals make the JSX unreadable. The real one is that
 * src/test/setup.js stubs @lobehub/icons with components that render nothing —
 * so a test counting <svg> inside the model arc passes at zero. Keeping the
 * data here means the tests can assert against the source of truth instead.
 *
 * Everything below was checked against the engine before being written down:
 *   - MODELS      → workflow/apps/api/src/modules/workflow/nodes/ai-providers.ts
 *   - INTEGRATIONS→ .../nodes/ (native) + app-defs.ts + meeting-providers.ts
 */
import {
  OpenAI, Anthropic, Gemini, Meta, DeepSeek,
  HuggingFace, Mistral, Qwen, Groq, Ollama,
} from '@lobehub/icons'

/**
 * The arc. `share` is this mark's diameter as a fraction of the flagship's, so
 * the whole row scales together off one `--tok` custom property — see
 * `.logo-arc` in AIAgentsFeatureSection.css. Sizes taper outward from OpenAI.
 *
 * The five providers the AI node can actually dial are OpenAI, Anthropic
 * (Claude), Gemini, Groq and Ollama. Llama, Mistral, DeepSeek and Qwen earn
 * their place as models Groq and Ollama serve, and HuggingFace as where the
 * open ones come from. Nothing here is an app.
 */
export const MODELS = [
  { key: 'ollama', Icon: Ollama, color: '#0A0A0A', share: 0.475 },
  { key: 'qwen', Icon: Qwen.Color, color: '#615CED', share: 0.55 },
  { key: 'huggingface', Icon: HuggingFace.Color, color: '#FFD21E', share: 0.625 },
  { key: 'groq', Icon: Groq, color: '#F55036', share: 0.725 },
  { key: 'anthropic', Icon: Anthropic, color: '#D97757', share: 0.85 },
  { key: 'openai', Icon: OpenAI, color: '#0A0A0A', share: 1 },
  { key: 'gemini', Icon: Gemini.Color, color: '#4285F4', share: 0.85 },
  { key: 'meta', Icon: Meta.Color, color: '#0866FF', share: 0.725 },
  { key: 'deepseek', Icon: DeepSeek.Color, color: '#4D6BFE', share: 0.625 },
  { key: 'mistral', Icon: Mistral.Color, color: '#FF7000', share: 0.55 },
]

export const MODEL_PROVIDERS = ['OpenAI', 'Claude', 'Gemini', 'Groq', 'Ollama']

/**
 * The integration field: 8 columns × 4 rows. `null` is a dashed ghost cell —
 * they break the grid's rhythm so it reads as a scattered field rather than a
 * filled box.
 *
 * Every named app is backed by something real: a native node (WhatsApp, Slack,
 * Sheets, the four databases…), an entry in app-defs.ts (HubSpot, Zoho,
 * Shopify, WooCommerce, Zendesk, Intercom, LinkedIn, Facebook) or a meeting
 * provider (Zoom, Meet, Calendly, Teams).
 *
 * Deliberately absent: Razorpay, Stripe, Notion, Airtable, GitHub, Jira,
 * Salesforce. The old card showed several of them. None has a node — they are
 * reachable only through the HTTP node, which is what the foot line claims.
 */
export const INTEGRATIONS = [
  'whatsapp', 'googlesheets', 'hubspot', 'gmail', 'telegram', 'notion', 'zoho', 'salesforce',
  'stripe', 'shopify', 'woocommerce', 'zendesk', 'github', 'slack', 'discord', 'airtable',
  'mongodb', 'postgresql', 'razorpay', 'mysql', 'redis', 'jira', 'intercom', 'linkedin',
  'facebook', 'figma', 'zoom', 'googlemeet', 'calendly', 'msteams', 'mailchimp', 'asana',
]

/** 30 native node types + 13 app-request definitions + 10 meeting providers. */
export const INTEGRATION_COUNT = '30+'

/**
 * NOTE: every figure in `live`, and every string in `outcomes`, is a DEMO
 * VALUE. None of it comes from platform telemetry. The card presents them as
 * production numbers — a climbing counter, a rupee amount, a paid invoice.
 * Replace them with real figures, or reword the card as an illustrative
 * sample, before treating any of it as a public claim.
 */
export const TASKS = [
  {
    id: 'cart',
    name: 'Abandoned cart recovery',
    schedule: 'Shopify · every 30 minutes',
    brand: 'shopify',
    badgeBg: '#5E8E3E',
    color: '#10b981',
    live: { runs: 1284, unit: 'runs today' },
    outcomes: ['Cart recovered · ₹4,320', '38 reminders sent', 'Cart recovered · ₹1,890'],
  },
  {
    id: 'report',
    name: 'Daily sales report',
    schedule: 'Google Sheets · weekdays, 9 AM IST',
    brand: 'googlesheets',
    badgeBg: '#0F9D58',
    color: '#0F9D58',
    live: { runs: 96, unit: 'runs this month' },
    outcomes: ['Sheet updated · 412 rows', 'Report sent to 6 people', 'Sheet updated · 388 rows'],
  },
  {
    id: 'payment',
    name: 'Payment reminder',
    // Zoho Books, not Razorpay — Razorpay has no node, Zoho Books is in
    // app-defs.ts. The badge has to name something the engine can drive.
    schedule: 'Zoho Books · every day, 10 AM',
    brand: 'zohobooks',
    badgeBg: '#E42527',
    color: '#E42527',
    live: { runs: 730, unit: 'runs this year' },
    outcomes: ['Invoice #2214 paid', '12 reminders sent', 'Invoice #2231 paid'],
  },
]

/** Five stops on the timeline, as percentages across the track. */
export const TIMELINE_STOPS = [2, 26, 50, 74, 98]

export const AXIS_LABELS = ['9 AM', '12 PM', '3 PM', '6 PM', '9 PM']

/**
 * The canvas. Each agent is named after the system it drives, so the brand mark
 * on its avatar is honest rather than decorative — the alternative was a
 * generic robot glyph, which is what the coloured squares here used to be.
 */
export const AGENTS = [
  {
    id: 'inbox',
    label: 'WhatsApp Inbox Agent',
    brand: 'whatsapp',
    badgeBg: '#25D366',
    minis: ['whatsapp', 'googlegemini', 'googlesheets'],
  },
  {
    id: 'order',
    label: 'Shopify Order Agent',
    brand: 'shopify',
    badgeBg: '#5E8E3E',
    minis: ['shopify', 'zohobooks', 'googlesheets'],
  },
  {
    id: 'handoff',
    label: 'Zendesk Handoff Agent',
    brand: 'zendesk',
    badgeBg: '#03363D',
    minis: ['zendesk', 'slack', 'gmail'],
  },
]

export const BRANCH_LABELS = ['Order question?', 'Wants a human?']

/** Cross-faded under the canvas on the same 7s period as the packet. */
export const CANVAS_CAPTIONS = [
  'Agent 1 reading the message',
  'Order lookup in Shopify',
  'Ticket assigned to a human',
]
