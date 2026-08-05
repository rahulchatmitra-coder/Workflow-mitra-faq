/**
 * Node icons for the editor recreation.
 *
 * Mirrors the PRODUCT's own logic in
 * workflow/apps/web/src/features/workflows/builder/node-icons.jsx so a
 * screenshot in the docs draws exactly what the real canvas draws:
 *
 *   - service nodes  → official brand mark (Simple Icons, via react-icons/si)
 *   - Slack + logic  → Lucide glyph. Slack genuinely has no Simple Icons mark
 *                      (excluded on brand policy), so the real editor uses
 *                      Lucide's — drawing the 4-colour pinwheel here would be
 *                      showing users something the product never renders.
 *   - disc colour    → the brand hex, or the product's LOGIC_ACCENT override
 */
import {
  SiWhatsapp, SiTelegram, SiDiscord, SiGmail, SiGooglesheets, SiShopify,
  SiHubspot, SiZoho, SiZendesk, SiCalendly, SiGooglemeet, SiPostgresql,
} from 'react-icons/si'
import {
  Globe, Sparkles, Blocks, MousePointerClick, Zap, GitBranch, UserCheck,
  Users, PhoneCall, Clock,
} from 'lucide-react'

/**
 * Lucide's Slack glyph, inlined.
 *
 * The product renders `<Slack />` from lucide-react, but this site is pinned to
 * a different lucide major that doesn't export it. The geometry below is copied
 * verbatim from the version the product ships, so the docs keep drawing the
 * exact mark the editor draws even as the two packages drift.
 */
function SlackGlyph({ size = 26, color = 'currentColor' }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="3" height="8" x="13" y="2" rx="1.5" />
      <path d="M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5" />
      <rect width="3" height="8" x="8" y="14" rx="1.5" />
      <path d="M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5" />
      <rect width="8" height="3" x="14" y="13" rx="1.5" />
      <path d="M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5" />
      <rect width="8" height="3" x="2" y="8" rx="1.5" />
      <path d="M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5" />
    </svg>
  )
}

// Brand hexes, verbatim from the simple-icons package the product imports.
const BRAND = {
  whatsapp: { Icon: SiWhatsapp, hex: '#25D366' },
  telegram: { Icon: SiTelegram, hex: '#26A5E4' },
  discord: { Icon: SiDiscord, hex: '#5865F2' },
  gmail: { Icon: SiGmail, hex: '#EA4335' },
  'google-sheets': { Icon: SiGooglesheets, hex: '#34A853' },
  shopify: { Icon: SiShopify, hex: '#7AB55C' },
  hubspot: { Icon: SiHubspot, hex: '#FF7A59' },
  zoho: { Icon: SiZoho, hex: '#E42527' },
  zendesk: { Icon: SiZendesk, hex: '#03363D' },
  calendly: { Icon: SiCalendly, hex: '#006BFF' },
  googlemeet: { Icon: SiGooglemeet, hex: '#00897B' },
  postgresql: { Icon: SiPostgresql, hex: '#4169E1' },
}

// Lucide glyphs + the product's LOGIC_ACCENT colours.
const LUCIDE = {
  slack: { Icon: SlackGlyph, hex: '#4A154B' },
  'http-request': { Icon: Globe, hex: '#0A0A0A' },
  ai: { Icon: Sparkles, hex: '#0A0A0A' },
  'ai-agent': { Icon: Sparkles, hex: '#ff9e43' },
  'app-request': { Icon: Blocks, hex: '#0A0A0A' },
  'manual-trigger': { Icon: MousePointerClick, hex: '#0A0A0A' },
  'webhook-trigger': { Icon: Zap, hex: '#0A0A0A' },
  // Flow-control nodes wear the product's LOGIC_ACCENT amber, the same colour
  // ai-agent uses — the editor colours logic by role, not by brand.
  if: { Icon: GitBranch, hex: '#ff9e43' },
  approval: { Icon: UserCheck, hex: '#ff9e43' },
  assign: { Icon: Users, hex: '#ff9e43' },
  // Triggers wear brand black; the amber bolt badge is what says "starts here".
  call: { Icon: PhoneCall, hex: '#0A0A0A' },
  schedule: { Icon: Clock, hex: '#0A0A0A' },
}

/** The disc's fill — brand hex for service nodes, accent otherwise. */
export function nodeDiscBg(type) {
  return BRAND[type]?.hex || LUCIDE[type]?.hex || '#0A0A0A'
}

/**
 * A node's icon. `mono` renders it white for the coloured disc, matching the
 * product's `<NodeIcon mono />`.
 */
export function DocsNodeIcon({ type, size = 26, mono = false }) {
  const brand = BRAND[type]
  if (brand) {
    const { Icon } = brand
    return <Icon size={size} color={mono ? '#fff' : brand.hex} aria-hidden="true" />
  }
  const entry = LUCIDE[type]
  const Icon = entry?.Icon || Blocks
  return <Icon size={size} color={mono ? '#fff' : entry?.hex || '#0A0A0A'} aria-hidden="true" />
}
