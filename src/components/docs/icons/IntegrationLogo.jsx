import { getBrandIcon } from '../../../utils/brandIcons'
import { DocsNodeIcon } from './docsNodeIcons'
import * as Icons from './docIcons'

/**
 * An integration's logo, with a real fallback.
 *
 * brandIcons.jsx covers most services but not all of them, and several of the
 * registry's slugs (databases, self-hosted tools, apps Simple Icons omits on
 * brand-policy grounds) have no mark at all. Rendering nothing left visibly
 * empty tiles on the hub, so this falls back through:
 *
 *   brandIcons  →  the editor's own node icons  →  a category-shaped glyph
 *
 * A missing brand therefore degrades to something meaningful rather than a
 * blank square, and a new integration can never ship an empty tile.
 */
const CATEGORY_FALLBACK = {
  DATABASE: Icons.ListIcon,
  MEETINGS: Icons.CalendarIcon,
  EMAIL: Icons.MessageIcon,
  CRM: Icons.CardIcon,
  SUPPORT: Icons.HeadsetIcon,
  COMMERCE: Icons.BagIcon,
  SOCIAL: Icons.MessageIcon,
  FINANCE: Icons.FileIcon,
  DEVELOPER: Icons.HttpRequestIcon,
  AI: Icons.AiAgentIcon,
  MESSAGING: Icons.MessageIcon,
  SPREADSHEET: Icons.ListIcon,
}

export function IntegrationLogo({ slug, category, size = 22 }) {
  const brand = getBrandIcon(slug, { size })
  if (brand?.component) return brand.component

  // The docs' own node-icon set covers a few the site map misses.
  const NODE_SLUGS = ['whatsapp', 'telegram', 'discord', 'gmail', 'google-sheets', 'shopify', 'slack', 'http-request', 'ai-agent']
  if (NODE_SLUGS.includes(slug)) return <DocsNodeIcon type={slug} size={size} />

  const Fallback = CATEGORY_FALLBACK[category] || Icons.HttpRequestIcon
  return <Fallback size={size} color="var(--docs-muted)" />
}
