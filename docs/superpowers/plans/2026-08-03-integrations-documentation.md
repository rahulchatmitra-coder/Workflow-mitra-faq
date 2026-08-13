# Integrations Documentation Section — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a beginner-friendly integrations documentation section (`/docs/integrations`) on the WorkflowMitra marketing site — one page per app, with real-UI-recreation screenshots for both the third-party credential step and the WorkflowMitra editor step — plus a small linking hook in the `workflow` product's editor itself.

**Architecture:** A lightweight `integrationRegistry.js` (all 50+ apps) feeds the Hub, search, sitemap, and related-picker; a per-slug `integrationDocs/<slug>.js` content file (8 in phase 1) feeds one shared `IntegrationDocTemplate`. Two shared "real UI" primitives (`AnnotatedScreenshot`/`Pin`, `RealEditorPreview`) plus per-provider "scene" components recreate real third-party dashboards and the real WorkflowMitra editor without ever using static screenshot images.

**Tech Stack:** React 18 + Vite 5 + react-router-dom v6 (existing). New: Vitest + React Testing Library + jsdom (dev-only, testing). New: `fuse.js` (client-side search). No TypeScript, no MDX/CMS, no react-helmet.

## Global Constraints

- Plain JS/JSX only — this codebase has no TypeScript anywhere (`workflowmitra_website` is 100% `.jsx`/`.js`).
- No MDX/CMS: all content is plain JS data objects, matching the existing `TemplateDetail.jsx`/`solutionConfigs.jsx` pattern.
- No new UI/CSS framework: hand-written per-component `.css` files referencing CSS custom properties, matching the existing convention (`antd`/`@lobehub/ui` are installed but unused anywhere — do not introduce new usages of them).
- Docs section uses its **own** scoped design tokens (Shell A / "Native Console" — ink `#0A0A0A`, bg `#F8FAFC`, accent `#FF9E43`, Roboto) under a `.docs-shell` root class — it must NOT read from or modify the marketing site's global `index.css` tokens (`--bg-a`, pink/teal/purple/orange), and must not change how any existing marketing page looks.
- Brand icons come from `react-icons/si` via the existing `src/utils/brandIcons.jsx` (extend it — do not create a second icon-lookup file). Utility icons come from `lucide-react` (already a dependency).
- No emoji or Unicode symbol stands in for a UI icon anywhere in the docs section. Plain typographic characters used as normal UI convention (`#` before a channel name, `→` at the end of a text link) are not affected by this rule.
- Every integration page's `credentialGuide.anchorId` is always the literal string `'get-credential'` and `workflowGuide.anchorId` is always `'configure-node'` — never slug-specific — so cross-repo deep links are a pure string formula.
- `integrationRegistry.js` is the single source of truth for slug/title/category/credentialType/icon/status — no other file re-declares this metadata.
- Follow TDD: every task below writes a failing test before the implementation, per `superpowers:test-driven-development`.
- Full design spec: `docs/superpowers/specs/2026-08-03-integrations-documentation-design.md` — every task below implements a specific section of it; consult it for rationale, not just shape.

---

## Task 1: Test infrastructure (Vitest + React Testing Library)

**Files:**
- Modify: `vite.config.js` (add a `test` block — read the existing file first and preserve its current `plugins` array; do not replace the file blindly)
- Create: `src/test/setup.js`
- Create: `package.json` scripts (modify)
- Test: `src/test/setup.test.js` (smoke test proving the harness works)

**Interfaces:**
- Produces: `npm test` and `npm run test:watch` commands, a global `expect` extended with `@testing-library/jest-dom` matchers, available to every later task's tests.

- [ ] **Step 1: Install test dependencies**

Run:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 2: Write the failing smoke test**

```js
// src/test/setup.test.js
import { describe, it, expect } from 'vitest'

describe('test harness', () => {
  it('runs and understands jest-dom matchers', () => {
    const div = document.createElement('div')
    div.textContent = 'hello'
    document.body.appendChild(div)
    expect(div).toBeInTheDocument()
    expect(div).toHaveTextContent('hello')
  })
})
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npx vitest run src/test/setup.test.js`
Expected: FAIL — `vitest` config/scripts don't exist yet, or `toBeInTheDocument` is not a function (jest-dom matchers not wired).

- [ ] **Step 4: Create the RTL setup file**

```js
// src/test/setup.js
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 5: Read `vite.config.js`, then add a `test` block to the existing config**

Open `vite.config.js`, keep every existing top-level key (in particular the existing `plugins` array — do not remove `react()`/`tailwindcss()` or whatever is already there), and add:

```js
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    globals: true,
  },
```

as a new top-level key inside the object passed to `defineConfig(...)`.

- [ ] **Step 6: Add scripts to `package.json`**

Inside `"scripts"`, add:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 7: Run the test again to verify it passes**

Run: `npm test -- src/test/setup.test.js`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add vite.config.js package.json package-lock.json src/test/setup.js src/test/setup.test.js
git commit -m "test: add Vitest + React Testing Library harness"
```

---

## Task 2: Docs design tokens (scoped CSS, Shell A)

**Files:**
- Create: `src/styles/docs-theme.css`
- Test: none (pure CSS; verified visually in Task 24 when the layout shell consumes it) — this task has no automated test because there is no logic to assert against, only declarations; skip Steps 1–2/4 of the usual TDD shape and go straight to writing the file, per the plan's own no-placeholder rule this is stated explicitly rather than silently omitted.

- [ ] **Step 1: Create the scoped token file**

```css
/* src/styles/docs-theme.css
   Shell A ("Native Console") tokens — mirrors the real WorkflowMitra
   product's actual design tokens (workflow/apps/web/src/styles/tailwind.css).
   Scoped under .docs-shell so it never leaks into or reads from the
   marketing site's own index.css tokens. */
.docs-shell {
  --wm-ink: #0A0A0A;
  --wm-ink-light: #6B6B6B;
  --wm-bg: #F8FAFC;
  --wm-bg-tile: #F4F4F5;
  --wm-paper: #FFFFFF;
  --wm-border: #E4E4E7;
  --wm-orange: #FF9E43;
  --wm-error: #E5484D;
  --wm-success: #0F9D58;

  --wm-shadow-soft: 0 1px 3px rgba(10, 10, 10, 0.07);
  --wm-shadow-card: 0 4px 20px rgba(10, 10, 10, 0.10);
  --wm-shadow-elevated: 0 8px 30px rgba(10, 10, 10, 0.15);

  --wm-track-cred: #0F766E;
  --wm-track-cred-bg: #E6F5F3;
  --wm-track-flow: #6B5BD2;
  --wm-track-flow-bg: #EEEBFB;

  --wm-sidebar-bg: linear-gradient(180deg, #0A0A0A, #141414);
  --wm-sidebar-text: #F4F4F5;
  --wm-sidebar-text-soft: rgba(244, 244, 245, 0.56);
  --wm-sidebar-active: rgba(255, 255, 255, 0.13);

  font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  color: var(--wm-ink);
  background: var(--wm-bg);
}

.docs-shell h1,
.docs-shell h2,
.docs-shell h3,
.docs-shell h4 {
  font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  text-wrap: balance;
}

.docs-shell :focus-visible {
  outline: 2px solid var(--wm-orange);
  outline-offset: 2px;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/docs-theme.css
git commit -m "feat(docs): add scoped Shell A design tokens"
```

---

## Task 3: Integration registry + category taxonomy

**Files:**
- Create: `src/data/categories.js`
- Create: `src/data/integrationRegistry.js`
- Test: `src/data/integrationRegistry.test.js`

**Interfaces:**
- Produces: `export const CATEGORIES` (array of 12 category keys, from `categories.js`), `export default integrationRegistry` (array of registry entry objects, from `integrationRegistry.js`) — every later task that touches the Hub, search, sitemap, related-picker, or a content file imports one or both of these.
- Registry entry shape: `{ slug, title, shortDescription, category, credentialType, icon, status }` where `status` is `'live' | 'coming-soon'` and `category` is one of `CATEGORIES`.

- [ ] **Step 1: Write the failing test**

```js
// src/data/integrationRegistry.test.js
import { describe, it, expect } from 'vitest'
import integrationRegistry from './integrationRegistry'
import { CATEGORIES } from './categories'

describe('integrationRegistry', () => {
  it('has a unique, non-empty slug for every entry', () => {
    const slugs = integrationRegistry.map((e) => e.slug)
    expect(slugs.length).toBeGreaterThan(0)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('every entry has a category from the locked taxonomy', () => {
    integrationRegistry.forEach((e) => {
      expect(CATEGORIES).toContain(e.category)
    })
  })

  it('every entry has status live or coming-soon', () => {
    integrationRegistry.forEach((e) => {
      expect(['live', 'coming-soon']).toContain(e.status)
    })
  })

  it('marks exactly the 8 phase-1 flagship integrations as live', () => {
    const live = integrationRegistry.filter((e) => e.status === 'live').map((e) => e.slug).sort()
    expect(live).toEqual(
      ['ai-agent', 'gmail', 'google-sheets', 'http-request', 'shopify', 'slack', 'telegram', 'whatsapp'].sort()
    )
  })

  it('every live entry has a non-empty shortDescription and credentialType', () => {
    integrationRegistry.filter((e) => e.status === 'live').forEach((e) => {
      expect(e.shortDescription.length).toBeGreaterThan(0)
      expect(e.credentialType.length).toBeGreaterThan(0)
    })
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/data/integrationRegistry.test.js`
Expected: FAIL — `integrationRegistry.js` and `categories.js` don't exist yet.

- [ ] **Step 3: Create the category taxonomy**

```js
// src/data/categories.js
export const CATEGORIES = [
  'MESSAGING',
  'EMAIL',
  'SPREADSHEET',
  'AI',
  'CRM',
  'SUPPORT',
  'COMMERCE',
  'SOCIAL',
  'FINANCE',
  'MEETINGS',
  'DATABASE',
  'DEVELOPER',
]

export const CATEGORY_LABELS = {
  MESSAGING: 'Messaging',
  EMAIL: 'Email',
  SPREADSHEET: 'Spreadsheet',
  AI: 'AI',
  CRM: 'CRM',
  SUPPORT: 'Support',
  COMMERCE: 'Commerce',
  SOCIAL: 'Social',
  FINANCE: 'Finance',
  MEETINGS: 'Meetings',
  DATABASE: 'Database',
  DEVELOPER: 'Developer',
}
```

- [ ] **Step 4: Create the registry**

```js
// src/data/integrationRegistry.js
// Single source of truth for every integration: Hub, search, sitemap,
// category filters, and the related-integrations algorithm all read
// this file. Heavy per-page content for `status: 'live'` entries lives
// separately in src/data/integrationDocs/<slug>.js.

const integrationRegistry = [
  // ---- phase 1 flagship (status: 'live') ----
  { slug: 'slack', title: 'Slack', shortDescription: 'Post a message to a Slack channel from any flow.', category: 'MESSAGING', credentialType: 'slack', icon: 'slack', status: 'live' },
  { slug: 'telegram', title: 'Telegram', shortDescription: 'Send a message from your bot to any chat.', category: 'MESSAGING', credentialType: 'telegram', icon: 'telegram', status: 'live' },
  { slug: 'whatsapp', title: 'WhatsApp', shortDescription: 'Send templates, media, and replies on WhatsApp.', category: 'MESSAGING', credentialType: 'whatsapp', icon: 'whatsapp', status: 'live' },
  { slug: 'gmail', title: 'Gmail', shortDescription: 'Send, reply, and label emails from a flow.', category: 'EMAIL', credentialType: 'google-oauth', icon: 'gmail', status: 'live' },
  { slug: 'google-sheets', title: 'Google Sheets', shortDescription: 'Read, add, and update rows automatically.', category: 'SPREADSHEET', credentialType: 'google-service-account', icon: 'google-sheets', status: 'live' },
  { slug: 'http-request', title: 'HTTP Request', shortDescription: 'Connect any app that has an API — with or without a login key.', category: 'DEVELOPER', credentialType: 'http-auth', icon: 'http-request', status: 'live' },
  { slug: 'ai-agent', title: 'AI Agent', shortDescription: 'Let Claude, GPT, or another model answer, decide, or draft text.', category: 'AI', credentialType: 'ai-provider', icon: 'ai-agent', status: 'live' },
  { slug: 'shopify', title: 'Shopify', shortDescription: 'React to orders, update products, manage customers.', category: 'COMMERCE', credentialType: 'shopify', icon: 'shopify', status: 'live' },

  // ---- coming soon (status: 'coming-soon') — metadata only, no content file ----
  { slug: 'discord', title: 'Discord', shortDescription: 'Post to a Discord server channel via webhook.', category: 'MESSAGING', credentialType: 'discord', icon: 'discord', status: 'coming-soon' },
  { slug: 'smtp-email', title: 'Email (SMTP)', shortDescription: 'Send email through any SMTP provider.', category: 'EMAIL', credentialType: 'smtp', icon: 'smtp-email', status: 'coming-soon' },
  { slug: 'hubspot', title: 'HubSpot', shortDescription: 'Create and update CRM contacts and deals.', category: 'CRM', credentialType: 'hubspot', icon: 'hubspot', status: 'coming-soon' },
  { slug: 'zoho-crm', title: 'Zoho CRM', shortDescription: 'Create and update leads and deals in Zoho CRM.', category: 'CRM', credentialType: 'zoho-crm', icon: 'zoho-crm', status: 'coming-soon' },
  { slug: 'pipedrive', title: 'Pipedrive', shortDescription: 'Create and update deals in your Pipedrive pipeline.', category: 'CRM', credentialType: 'pipedrive', icon: 'pipedrive', status: 'coming-soon' },
  { slug: 'zendesk', title: 'Zendesk', shortDescription: 'Create and update support tickets.', category: 'SUPPORT', credentialType: 'zendesk', icon: 'zendesk', status: 'coming-soon' },
  { slug: 'freshdesk', title: 'Freshdesk', shortDescription: 'Create and update support tickets.', category: 'SUPPORT', credentialType: 'freshdesk', icon: 'freshdesk', status: 'coming-soon' },
  { slug: 'intercom', title: 'Intercom', shortDescription: 'Create conversations and update contacts.', category: 'SUPPORT', credentialType: 'intercom', icon: 'intercom', status: 'coming-soon' },
  { slug: 'zoho-desk', title: 'Zoho Desk', shortDescription: 'Create and update support tickets.', category: 'SUPPORT', credentialType: 'zoho-desk', icon: 'zoho-desk', status: 'coming-soon' },
  { slug: 'woocommerce', title: 'WooCommerce', shortDescription: 'React to orders and manage products.', category: 'COMMERCE', credentialType: 'woocommerce', icon: 'woocommerce', status: 'coming-soon' },
  { slug: 'shiprocket', title: 'Shiprocket', shortDescription: 'Book shipments and track couriers.', category: 'COMMERCE', credentialType: 'shiprocket', icon: 'shiprocket', status: 'coming-soon' },
  { slug: 'linkedin', title: 'LinkedIn', shortDescription: 'Post updates and manage company page activity.', category: 'SOCIAL', credentialType: 'linkedin', icon: 'linkedin', status: 'coming-soon' },
  { slug: 'facebook-pages', title: 'Facebook Page', shortDescription: 'Post updates to a Facebook Page.', category: 'SOCIAL', credentialType: 'facebook-pages', icon: 'facebook-pages', status: 'coming-soon' },
  { slug: 'zoho-books', title: 'Zoho Books', shortDescription: 'Create invoices and sync accounting records.', category: 'FINANCE', credentialType: 'zoho-books', icon: 'zoho-books', status: 'coming-soon' },
  { slug: 'zoom', title: 'Zoom', shortDescription: 'Create and manage Zoom meetings from a flow.', category: 'MEETINGS', credentialType: 'zoom', icon: 'zoom', status: 'coming-soon' },
  { slug: 'google-meet', title: 'Google Meet', shortDescription: 'Create and manage Google Meet meetings.', category: 'MEETINGS', credentialType: 'google-oauth', icon: 'google-meet', status: 'coming-soon' },
  { slug: 'calcom', title: 'Cal.com', shortDescription: 'Create and manage bookings.', category: 'MEETINGS', credentialType: 'calcom', icon: 'calcom', status: 'coming-soon' },
  { slug: 'calendly', title: 'Calendly', shortDescription: 'React to new bookings and manage events.', category: 'MEETINGS', credentialType: 'calendly', icon: 'calendly', status: 'coming-soon' },
  { slug: 'whereby', title: 'Whereby', shortDescription: 'Create and manage video meeting rooms.', category: 'MEETINGS', credentialType: 'whereby', icon: 'whereby', status: 'coming-soon' },
  { slug: 'teams', title: 'Microsoft Teams', shortDescription: 'Create and manage Teams meetings.', category: 'MEETINGS', credentialType: 'teams', icon: 'teams', status: 'coming-soon' },
  { slug: 'zoho-bookings', title: 'Zoho Bookings', shortDescription: 'Create and manage bookings.', category: 'MEETINGS', credentialType: 'zoho-bookings', icon: 'zoho-bookings', status: 'coming-soon' },
  { slug: 'jitsi', title: 'Jitsi Meet', shortDescription: 'Create video meeting rooms.', category: 'MEETINGS', credentialType: 'jitsi', icon: 'jitsi', status: 'coming-soon' },
  { slug: 'postgres', title: 'Postgres', shortDescription: 'Run a query against your database.', category: 'DATABASE', credentialType: 'postgres', icon: 'postgres', status: 'coming-soon' },
  { slug: 'mysql', title: 'MySQL', shortDescription: 'Run a query against your database.', category: 'DATABASE', credentialType: 'mysql', icon: 'mysql', status: 'coming-soon' },
  { slug: 'mongodb', title: 'MongoDB', shortDescription: 'Read and write documents in your database.', category: 'DATABASE', credentialType: 'mongodb', icon: 'mongodb', status: 'coming-soon' },
  { slug: 'redis', title: 'Redis', shortDescription: 'Run a command against your Redis store.', category: 'DATABASE', credentialType: 'redis', icon: 'redis', status: 'coming-soon' },
]

export default integrationRegistry
```

(This seeds the ~30 highest-confidence "coming soon" entries directly from the confirmed node/provider inventory in `workflow/apps/api/src/modules/workflow/nodes/app-defs.ts` and `meeting-providers.ts`. Remaining long-tail providers can be appended the same way later — that's the whole point of the registry pattern, see the spec's "Adding a new integration" runbook.)

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npm test -- src/data/integrationRegistry.test.js`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/data/categories.js src/data/integrationRegistry.js src/data/integrationRegistry.test.js
git commit -m "feat(docs): add integration registry and category taxonomy"
```

---

## Task 4: Related-integrations algorithm

**Files:**
- Create: `src/utils/docs/relatedIntegrations.js`
- Test: `src/utils/docs/relatedIntegrations.test.js`

**Interfaces:**
- Consumes: `integrationRegistry` shape from Task 3 (`{ slug, category, status }`), and a `coOccurrenceCounts` map (`{ [slug]: number }`) that Task 5 will produce.
- Produces: `export function getRelatedIntegrations(slug, { registry, coOccurrenceCounts = {}, override, limit = 4 })` → `string[]` of related slugs, consumed by Task 20's `RelatedIntegrations` component.

- [ ] **Step 1: Write the failing test**

```js
// src/utils/docs/relatedIntegrations.test.js
import { describe, it, expect } from 'vitest'
import { getRelatedIntegrations } from './relatedIntegrations'

const registry = [
  { slug: 'slack', category: 'MESSAGING', status: 'live' },
  { slug: 'discord', category: 'MESSAGING', status: 'coming-soon' },
  { slug: 'telegram', category: 'MESSAGING', status: 'live' },
  { slug: 'whatsapp', category: 'MESSAGING', status: 'live' },
  { slug: 'gmail', category: 'EMAIL', status: 'live' },
  { slug: 'shopify', category: 'COMMERCE', status: 'live' },
]

describe('getRelatedIntegrations', () => {
  it('excludes the current slug', () => {
    const result = getRelatedIntegrations('slack', { registry })
    expect(result).not.toContain('slack')
  })

  it('only returns same-category candidates when there is no co-occurrence data', () => {
    const result = getRelatedIntegrations('slack', { registry })
    result.forEach((slug) => {
      const entry = registry.find((e) => e.slug === slug)
      expect(entry.category).toBe('MESSAGING')
    })
  })

  it('ranks higher co-occurrence counts first', () => {
    const result = getRelatedIntegrations('slack', {
      registry,
      coOccurrenceCounts: { discord: 1, telegram: 5, whatsapp: 2 },
    })
    expect(result[0]).toBe('telegram')
  })

  it('caps results at the given limit', () => {
    const result = getRelatedIntegrations('slack', { registry, limit: 2 })
    expect(result.length).toBeLessThanOrEqual(2)
  })

  it('returns the override verbatim when provided, ignoring the algorithm', () => {
    const result = getRelatedIntegrations('slack', { registry, override: ['gmail', 'shopify'] })
    expect(result).toEqual(['gmail', 'shopify'])
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/utils/docs/relatedIntegrations.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```js
// src/utils/docs/relatedIntegrations.js
// Deterministic related-integrations picker — see design spec
// "Related-integrations algorithm". Same category, then boosted by
// real template co-occurrence, capped at `limit`. `override` (a page's
// `relatedOverride` field) always wins when present.
export function getRelatedIntegrations(slug, { registry, coOccurrenceCounts = {}, override, limit = 4 }) {
  if (override) return override

  const current = registry.find((e) => e.slug === slug)
  if (!current) return []

  return registry
    .filter((e) => e.slug !== slug && e.category === current.category)
    .sort((a, b) => (coOccurrenceCounts[b.slug] || 0) - (coOccurrenceCounts[a.slug] || 0))
    .slice(0, limit)
    .map((e) => e.slug)
}
```

- [ ] **Step 4: Run the test again to verify it passes**

Run: `npm test -- src/utils/docs/relatedIntegrations.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/docs/relatedIntegrations.js src/utils/docs/relatedIntegrations.test.js
git commit -m "feat(docs): add related-integrations algorithm"
```

---

## Task 5: Templates-for-integration query + recommended-workflows fallback

**Files:**
- Read first: `src/pages/TemplateDetail.jsx` (lines 1–72, the `allTemplates`-equivalent array) and `src/pages/Templates.jsx` in full
- Create: `src/utils/docs/templatesForIntegration.js`
- Test: `src/utils/docs/templatesForIntegration.test.js`

**Interfaces:**
- Consumes: `templateFlows` from `src/data/TemplateFlowData.js` — confirmed real shape: `{ templateId, nodes: [{ id, app, ... }], ... }` (no `apps[]` field; apps must be derived from `nodes[].app`, which uses informal keys like `sheets`, `zoho`, `truck` that don't always match registry slugs).
- Produces: `export function templatesUsingApp(slug, { templateFlows, aliasMap, metadataById })` → `Array<{ id, title }>`, and `export function coOccurrenceCounts(slug, { templateFlows, aliasMap })` → `{ [otherSlug]: number }` (feeds Task 4). Also `export function recommendedWorkflows(useCases, limit = 2)` → `Array<{ text }>` fallback.

- [ ] **Step 1: Read the real template metadata shape**

Open `src/pages/TemplateDetail.jsx` lines 1–72 and `src/pages/Templates.jsx`. Confirm: does a template's title/description live in a local array in `TemplateDetail.jsx` keyed by `id`, matching `TemplateFlowData.js`'s `templateId`? Does that array already carry an `apps[]` field? Whichever is true, the implementation below only uses it for `{ id, title }` display metadata — app-matching is intentionally derived from `TemplateFlowData.js`'s `nodes[].app` regardless (see Step 3 rationale), so an existing `apps[]` field there does not need to be trusted or kept in sync — this task simply doesn't read it.

- [ ] **Step 2: Write the failing test**

```js
// src/utils/docs/templatesForIntegration.test.js
import { describe, it, expect } from 'vitest'
import { templatesUsingApp, coOccurrenceCounts, recommendedWorkflows } from './templatesForIntegration'

const templateFlows = [
  {
    templateId: 1,
    nodes: [
      { id: 'n1', app: 'facebook' },
      { id: 'n2', app: 'webhook' },
      { id: 'n3', app: 'hubspot' },
      { id: 'n4', app: 'gmail' },
      { id: 'n5', app: 'slack' },
      { id: 'n6', app: 'sheets' },
    ],
  },
  {
    templateId: 2,
    nodes: [
      { id: 'n1', app: 'shopify' },
      { id: 'n2', app: 'zoho' },
      { id: 'n3', app: 'whatsapp' },
      { id: 'n4', app: 'truck' },
      { id: 'n5', app: 'sheets' },
    ],
  },
]
const aliasMap = { sheets: 'google-sheets', zoho: 'zoho-books', truck: 'shiprocket' }
const metadataById = { 1: { title: 'Facebook lead → CRM → team alert' }, 2: { title: 'Shopify order → invoice → WhatsApp + shipping' } }

describe('templatesUsingApp', () => {
  it('finds templates by aliased app key', () => {
    const result = templatesUsingApp('google-sheets', { templateFlows, aliasMap, metadataById })
    expect(result.map((t) => t.id).sort()).toEqual([1, 2])
  })

  it('finds templates by unaliased (already-canonical) app key', () => {
    const result = templatesUsingApp('slack', { templateFlows, aliasMap, metadataById })
    expect(result).toEqual([{ id: 1, title: 'Facebook lead → CRM → team alert' }])
  })

  it('returns an empty array for a slug used in no template', () => {
    expect(templatesUsingApp('telegram', { templateFlows, aliasMap, metadataById })).toEqual([])
  })

  it('excludes generic/non-integration node app keys like webhook', () => {
    const result = templatesUsingApp('webhook', { templateFlows, aliasMap, metadataById })
    expect(result).toEqual([])
  })
})

describe('coOccurrenceCounts', () => {
  it('counts how many templates pair a given slug with each other app', () => {
    const counts = coOccurrenceCounts('google-sheets', { templateFlows, aliasMap })
    expect(counts.slack).toBe(1)
    expect(counts.whatsapp).toBe(1)
    expect(counts['zoho-books']).toBe(1)
  })
})

describe('recommendedWorkflows', () => {
  it('returns up to `limit` use cases reformatted as starter prompts', () => {
    const useCases = [{ icon: 'bag', text: 'Post an order alert.' }, { icon: 'bell', text: 'Post a failure alert.' }, { icon: 'calendar', text: 'Post a daily digest.' }]
    const result = recommendedWorkflows(useCases, 2)
    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({ icon: 'bag', text: 'Post an order alert.' })
  })
})
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm test -- src/utils/docs/templatesForIntegration.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 4: Implement**

```js
// src/utils/docs/templatesForIntegration.js
// TemplateFlowData.js has no `apps[]` field — each node carries its own
// informal `app` key (e.g. 'sheets', 'zoho', 'truck'), which doesn't
// always match an integrationRegistry slug. `aliasMap` translates the
// informal keys to canonical slugs; keys with no alias are assumed
// already canonical. Generic/logic node app-keys (webhook, users, code…)
// simply never match a real slug and are naturally excluded — no
// separate exclude-list needed.
function appsForTemplate(template, aliasMap) {
  return [...new Set(template.nodes.map((n) => aliasMap[n.app] || n.app))]
}

export function templatesUsingApp(slug, { templateFlows, aliasMap, metadataById }) {
  return templateFlows
    .filter((t) => appsForTemplate(t, aliasMap).includes(slug))
    .map((t) => ({ id: t.templateId, title: metadataById[t.templateId]?.title || `Template ${t.templateId}` }))
}

export function coOccurrenceCounts(slug, { templateFlows, aliasMap }) {
  const counts = {}
  templateFlows.forEach((t) => {
    const apps = appsForTemplate(t, aliasMap)
    if (!apps.includes(slug)) return
    apps.forEach((app) => {
      if (app === slug) return
      counts[app] = (counts[app] || 0) + 1
    })
  })
  return counts
}

// Fallback for `templates.fallbackWhenEmpty: 'recommended-workflows'` —
// reuses the page's own useCases[] rather than claiming a template exists.
export function recommendedWorkflows(useCases, limit = 2) {
  return useCases.slice(0, limit)
}
```

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npm test -- src/utils/docs/templatesForIntegration.test.js`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/utils/docs/templatesForIntegration.js src/utils/docs/templatesForIntegration.test.js
git commit -m "feat(docs): add templates-for-integration query and fallback"
```

---

## Task 6: Client-side search (Fuse.js)

**Files:**
- Create: `src/utils/docs/searchIntegrations.js`
- Test: `src/utils/docs/searchIntegrations.test.js`

**Interfaces:**
- Produces: `export function searchIntegrations(query, registry)` → filtered/ranked `registry` array, consumed by Task 33's `IntegrationsHub`.

- [ ] **Step 1: Install Fuse.js**

Run: `npm install fuse.js`

- [ ] **Step 2: Write the failing test**

```js
// src/utils/docs/searchIntegrations.test.js
import { describe, it, expect } from 'vitest'
import { searchIntegrations } from './searchIntegrations'

const registry = [
  { slug: 'slack', title: 'Slack', shortDescription: 'Post a message to a Slack channel.', category: 'MESSAGING' },
  { slug: 'google-sheets', title: 'Google Sheets', shortDescription: 'Read and write spreadsheet rows.', category: 'SPREADSHEET' },
  { slug: 'gmail', title: 'Gmail', shortDescription: 'Send and label emails.', category: 'EMAIL' },
]

describe('searchIntegrations', () => {
  it('returns everything for an empty query', () => {
    expect(searchIntegrations('', registry)).toHaveLength(3)
  })

  it('matches by title', () => {
    const result = searchIntegrations('slack', registry)
    expect(result.map((r) => r.slug)).toEqual(['slack'])
  })

  it('matches by category', () => {
    const result = searchIntegrations('spreadsheet', registry)
    expect(result.map((r) => r.slug)).toContain('google-sheets')
  })

  it('tolerates a small typo', () => {
    const result = searchIntegrations('slak', registry)
    expect(result.map((r) => r.slug)).toContain('slack')
  })

  it('returns nothing for a totally unrelated query', () => {
    expect(searchIntegrations('xyzzyquux', registry)).toHaveLength(0)
  })
})
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm test -- src/utils/docs/searchIntegrations.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 4: Implement**

```js
// src/utils/docs/searchIntegrations.js
import Fuse from 'fuse.js'

const FUSE_OPTIONS = {
  keys: ['title', 'shortDescription', 'category'],
  threshold: 0.35,
}

export function searchIntegrations(query, registry) {
  if (!query.trim()) return registry
  const fuse = new Fuse(registry, FUSE_OPTIONS)
  return fuse.search(query).map((result) => result.item)
}
```

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npm test -- src/utils/docs/searchIntegrations.test.js`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/utils/docs/searchIntegrations.js src/utils/docs/searchIntegrations.test.js
git commit -m "feat(docs): add Fuse.js-based integration search"
```

---

## Task 7: OG image resolver

**Files:**
- Create: `src/utils/docs/ogImage.js`
- Create: `public/og/` directory note (see Step 4)
- Test: `src/utils/docs/ogImage.test.js`

**Interfaces:**
- Produces: `export function resolveOgImage(seo, category)` → absolute-from-root path string, consumed by Task 22's `Seo` component.

- [ ] **Step 1: Write the failing test**

```js
// src/utils/docs/ogImage.test.js
import { describe, it, expect } from 'vitest'
import { resolveOgImage } from './ogImage'

describe('resolveOgImage', () => {
  it('resolves "category" to the category template path', () => {
    expect(resolveOgImage({ ogImage: 'category' }, 'MESSAGING')).toBe('/og/messaging.png')
  })

  it('passes an explicit path through unchanged', () => {
    expect(resolveOgImage({ ogImage: '/og/custom-slack.png' }, 'MESSAGING')).toBe('/og/custom-slack.png')
  })

  it('falls back to the site-wide default when the category image is missing from the known set', () => {
    expect(resolveOgImage({ ogImage: 'category' }, 'NOT_A_REAL_CATEGORY')).toBe('/og/default.png')
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/utils/docs/ogImage.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```js
// src/utils/docs/ogImage.js
import { CATEGORIES } from '../../data/categories'

// One static 1200x630 PNG per category, reused across every page in
// that category (see spec "Image handling" — deliberately not WebP,
// for social-crawler compatibility). Real per-category artwork is a
// design deliverable tracked outside this codebase task; until each
// file actually exists in public/og/, every category safely resolves
// to the site's existing default OG image so nothing 404s.
const CATEGORY_IMAGE_PATH = (category) => `/og/${category.toLowerCase()}.png`
const DEFAULT_OG_IMAGE = '/og/default.png'

export function resolveOgImage(seo, category) {
  if (seo.ogImage && seo.ogImage !== 'category') return seo.ogImage
  return CATEGORIES.includes(category) ? CATEGORY_IMAGE_PATH(category) : DEFAULT_OG_IMAGE
}
```

- [ ] **Step 4: Add a placeholder default OG image and document the real-asset follow-up**

Copy the site's existing root OG image (referenced today from `index.html`) to `public/og/default.png` so `resolveOgImage` never points at a 404 even before category-specific art exists:

Run: `mkdir -p public/og && cp public/<existing-og-image-filename-from-index.html> public/og/default.png`

(Check `index.html`'s `<meta property="og:image">` tag for the current filename — copy that exact file.)

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npm test -- src/utils/docs/ogImage.test.js`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/utils/docs/ogImage.js src/utils/docs/ogImage.test.js public/og/default.png
git commit -m "feat(docs): add OG image resolver with safe default fallback"
```

---

## Task 8: Schema.org generators (BreadcrumbList, HowTo, FAQPage)

**Files:**
- Create: `src/utils/docs/jsonLd.js`
- Test: `src/utils/docs/jsonLd.test.js`

**Interfaces:**
- Produces: `export function breadcrumbSchema(title, path)`, `export function howToSchema(title, credentialGuide, workflowGuide)`, `export function faqSchema(faqs)` — each returns a plain JSON-LD object, consumed by Task 22's `Seo` component (which stringifies and injects them).

- [ ] **Step 1: Write the failing test**

```js
// src/utils/docs/jsonLd.test.js
import { describe, it, expect } from 'vitest'
import { breadcrumbSchema, howToSchema, faqSchema } from './jsonLd'

describe('breadcrumbSchema', () => {
  it('builds a 3-level Docs > Integrations > name trail', () => {
    const schema = breadcrumbSchema('Slack', '/docs/integrations/slack')
    expect(schema['@type']).toBe('BreadcrumbList')
    expect(schema.itemListElement).toHaveLength(3)
    expect(schema.itemListElement[2].name).toBe('Slack')
    expect(schema.itemListElement[2].item).toContain('/docs/integrations/slack')
  })
})

describe('howToSchema', () => {
  it('merges both step tracks into one ordered HowTo', () => {
    const credentialGuide = { steps: [{ title: 'Turn the toggle on', body: 'Do the thing.' }] }
    const workflowGuide = { steps: [{ title: 'Add the node', body: 'Drop it on the canvas.' }] }
    const schema = howToSchema('Slack', credentialGuide, workflowGuide)
    expect(schema['@type']).toBe('HowTo')
    expect(schema.step).toHaveLength(2)
    expect(schema.step[0].name).toBe('Turn the toggle on')
    expect(schema.step[1].name).toBe('Add the node')
  })
})

describe('faqSchema', () => {
  it('maps faqs[] to FAQPage mainEntity', () => {
    const faqs = [{ q: 'Do I need to be an admin?', a: 'No.' }]
    const schema = faqSchema(faqs)
    expect(schema['@type']).toBe('FAQPage')
    expect(schema.mainEntity[0].name).toBe('Do I need to be an admin?')
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe('No.')
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/utils/docs/jsonLd.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```js
// src/utils/docs/jsonLd.js
const SITE_ORIGIN = 'https://workflowmitra.com'

export function breadcrumbSchema(title, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Docs', item: `${SITE_ORIGIN}/docs` },
      { '@type': 'ListItem', position: 2, name: 'Integrations', item: `${SITE_ORIGIN}/docs/integrations` },
      { '@type': 'ListItem', position: 3, name: title, item: `${SITE_ORIGIN}${path}` },
    ],
  }
}

export function howToSchema(title, credentialGuide, workflowGuide) {
  const allSteps = [...credentialGuide.steps, ...workflowGuide.steps]
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to connect ${title} to WorkflowMitra`,
    step: allSteps.map((s) => ({ '@type': 'HowToStep', name: s.title, text: s.body })),
  }
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
```

- [ ] **Step 4: Run the test again to verify it passes**

Run: `npm test -- src/utils/docs/jsonLd.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/docs/jsonLd.js src/utils/docs/jsonLd.test.js
git commit -m "feat(docs): add BreadcrumbList/HowTo/FAQPage schema generators"
```

---

## Task 9: Brand icon coverage for the 8 flagship integrations

**Files:**
- Read first: `src/utils/brandIcons.jsx` in full (confirm the exact key strings `getBrandIcon(name, props)` already accepts)
- Modify: `src/utils/brandIcons.jsx`
- Test: `src/utils/brandIcons.test.jsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `getBrandIcon(name, props)` resolves for all of `['slack', 'telegram', 'whatsapp', 'gmail', 'google-sheets', 'shopify']` (the 6 flagship integrations with a real third-party brand) without throwing or returning `null`. `http-request` and `ai-agent` are NOT real brands — Step 4 adds two small generic (non-brand) icons for them instead of forcing a fake brand lookup.

- [ ] **Step 1: Write the failing test (this doubles as the verification step — it tells you exactly which keys are already covered)**

```jsx
// src/utils/brandIcons.test.jsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { getBrandIcon } from './brandIcons'

describe('getBrandIcon — flagship integration coverage', () => {
  it.each(['slack', 'telegram', 'whatsapp', 'gmail', 'google-sheets', 'shopify'])(
    'resolves a renderable icon for "%s"',
    (name) => {
      const icon = getBrandIcon(name)
      expect(icon).toBeTruthy()
      const { container } = render(<>{icon}</>)
      expect(container.querySelector('svg')).toBeInTheDocument()
    }
  )
})
```

- [ ] **Step 2: Run it to verify current coverage**

Run: `npm test -- src/utils/brandIcons.test.jsx`
Expected: some subset PASS, some FAIL — the failures are exactly the key strings not yet in `brandIcons.jsx`'s lookup (likely `google-sheets`, since the existing map may use a different key spelling such as `sheets` or `Google Sheets`).

- [ ] **Step 3: For each failing key, add or alias it inside the existing lookup in `brandIcons.jsx`**

Open the object/switch that `getBrandIcon` reads from (above the `export function getBrandIcon` at the file's end) and add any missing entries, matching the exact casing/quoting convention already used by neighboring entries. Example shape to match against (adjust to whatever the real map's syntax turns out to be — do not invent a different structure):

```jsx
// inside the existing icon map in brandIcons.jsx
'google-sheets': { icon: SiGooglesheets, color: '#0F9D58' },
```

If `google-sheets` already resolves under a different key (e.g. `sheets`), instead add a one-line alias so both work without duplicating the entry:

```jsx
export function getBrandIcon(name, props = {}) {
  const key = name === 'google-sheets' ? 'sheets' : name
  // ...existing lookup logic using `key` instead of `name`
}
```

- [ ] **Step 4: Add two small generic (non-brand) icons for the two flagship pages with no real third-party brand**

These do not belong in `brandIcons.jsx` (which is specifically a brand-logo map) — add them alongside the doc-specific utility icons instead, in Task 10's `docIcons.js`, as `HttpRequestIcon` (a generic `{ }`-style mark, e.g. lucide's `Braces`) and `AiAgentIcon` (a generic spark mark, e.g. lucide's `Sparkles`). No change to `brandIcons.jsx` for these two.

- [ ] **Step 5: Run the test again to verify all 6 brand keys pass**

Run: `npm test -- src/utils/brandIcons.test.jsx`
Expected: PASS (all 6)

- [ ] **Step 6: Commit**

```bash
git add src/utils/brandIcons.jsx src/utils/brandIcons.test.jsx
git commit -m "feat(docs): confirm/extend brand icon coverage for flagship integrations"
```

---

## Task 10: Doc utility icons (lucide-react)

**Files:**
- Create: `src/components/docs/icons/docIcons.js`
- Test: `src/components/docs/icons/docIcons.test.jsx`

**Interfaces:**
- Produces: one named export per utility icon used anywhere in the docs section — `SearchIcon, ClockIcon, KeyIcon, GaugeIcon, ChevronDownIcon, ChevronRightIcon, CloseIcon, LinkIcon, LightbulbIcon, UndoIcon, RedoIcon, ResizeIcon, TrashIcon, CopyIcon, CalendarIcon, HeadsetIcon, BellIcon, BagIcon, MessageIcon, HelpIcon, GridIcon, FrameIcon, HttpRequestIcon, AiAgentIcon` — all React components accepting standard `lucide-react` props (`size`, `color`/`className`), consumed by every section component from Task 20 onward.

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/docs/icons/docIcons.test.jsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import * as DocIcons from './docIcons'

const EXPECTED_ICONS = [
  'SearchIcon', 'ClockIcon', 'KeyIcon', 'GaugeIcon', 'ChevronDownIcon', 'ChevronRightIcon',
  'CloseIcon', 'LinkIcon', 'LightbulbIcon', 'UndoIcon', 'RedoIcon', 'ResizeIcon', 'TrashIcon',
  'CopyIcon', 'CalendarIcon', 'HeadsetIcon', 'BellIcon', 'BagIcon', 'MessageIcon', 'HelpIcon',
  'GridIcon', 'FrameIcon', 'HttpRequestIcon', 'AiAgentIcon',
]

describe('docIcons', () => {
  it.each(EXPECTED_ICONS)('exports a renderable %s', (name) => {
    const Icon = DocIcons[name]
    expect(Icon).toBeTruthy()
    const { container } = render(<Icon size={16} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/components/docs/icons/docIcons.test.jsx`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement as a thin re-export map**

```js
// src/components/docs/icons/docIcons.js
// Thin re-export layer over lucide-react (already a project dependency)
// so every docs component imports icon *names* from one place instead
// of reaching into lucide-react directly — see spec "Icon system": no
// emoji/Unicode-symbol icons anywhere in the docs section.
export {
  Search as SearchIcon,
  Clock as ClockIcon,
  KeyRound as KeyIcon,
  Gauge as GaugeIcon,
  ChevronDown as ChevronDownIcon,
  ChevronRight as ChevronRightIcon,
  X as CloseIcon,
  Link2 as LinkIcon,
  Lightbulb as LightbulbIcon,
  Undo2 as UndoIcon,
  Redo2 as RedoIcon,
  Scaling as ResizeIcon,
  Trash2 as TrashIcon,
  Copy as CopyIcon,
  Calendar as CalendarIcon,
  Headphones as HeadsetIcon,
  Bell as BellIcon,
  ShoppingBag as BagIcon,
  MessageCircle as MessageIcon,
  HelpCircle as HelpIcon,
  LayoutGrid as GridIcon,
  Maximize as FrameIcon,
  Braces as HttpRequestIcon,
  Sparkles as AiAgentIcon,
} from 'lucide-react'
```

- [ ] **Step 4: Run the test again to verify it passes**

Run: `npm test -- src/components/docs/icons/docIcons.test.jsx`
Expected: PASS. If any single icon name doesn't exist in the installed `lucide-react` version, the test failure names exactly which one — replace only that one re-export with the closest equivalent icon name from `node_modules/lucide-react/dist/lucide-react.d.ts` and re-run.

- [ ] **Step 5: Commit**

```bash
git add src/components/docs/icons/docIcons.js src/components/docs/icons/docIcons.test.jsx
git commit -m "feat(docs): add lucide-react utility icon re-exports"
```

---

## Task 11: `AnnotatedScreenshot` + `Pin` shared primitives

**Files:**
- Create: `src/components/docs/screenshots/AnnotatedScreenshot.jsx`
- Create: `src/components/docs/screenshots/AnnotatedScreenshot.css`
- Create: `src/components/docs/screenshots/Pin.jsx`
- Test: `src/components/docs/screenshots/AnnotatedScreenshot.test.jsx`

**Interfaces:**
- Produces: `<AnnotatedScreenshot variant="browser-chrome" | "app-native" addressBarText? children>`, `<Pin number anchor="top-right"|"top-left"|"bottom-right"|"bottom-left">` — consumed by every scene component (Tasks 14–19) and `RealEditorPreview` (Task 12).
- `Pin` renders inside a `position: relative` wrapper — any element that needs an annotation wraps its content in `<span className="pin-anchor">…children…<Pin number={1} /></span>`; `AnnotatedScreenshot` doesn't manage this wrapping itself, callers do, per element.

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/docs/screenshots/AnnotatedScreenshot.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AnnotatedScreenshot } from './AnnotatedScreenshot'
import { Pin } from './Pin'

describe('AnnotatedScreenshot', () => {
  it('renders a fake address bar for the browser-chrome variant', () => {
    render(<AnnotatedScreenshot variant="browser-chrome" addressBarText="api.slack.com">content</AnnotatedScreenshot>)
    expect(screen.getByText('api.slack.com')).toBeInTheDocument()
  })

  it('renders no address bar for the app-native variant', () => {
    render(<AnnotatedScreenshot variant="app-native">content</AnnotatedScreenshot>)
    expect(screen.queryByTestId('fake-address-bar')).not.toBeInTheDocument()
  })

  it('always renders its children', () => {
    render(<AnnotatedScreenshot variant="app-native"><p>the real content</p></AnnotatedScreenshot>)
    expect(screen.getByText('the real content')).toBeInTheDocument()
  })
})

describe('Pin', () => {
  it('renders its number', () => {
    render(<Pin number={3} anchor="top-right" />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/components/docs/screenshots/AnnotatedScreenshot.test.jsx`
Expected: FAIL — modules don't exist.

- [ ] **Step 3: Implement `Pin`**

```jsx
// src/components/docs/screenshots/Pin.jsx
export function Pin({ number, anchor = 'top-right', tone = 'cred' }) {
  return (
    <span className={`ds-pin ds-pin--${anchor} ds-pin--${tone}`} aria-hidden="true">
      {number}
    </span>
  )
}
```

- [ ] **Step 4: Implement `AnnotatedScreenshot`**

```jsx
// src/components/docs/screenshots/AnnotatedScreenshot.jsx
import './AnnotatedScreenshot.css'

export function AnnotatedScreenshot({ variant, addressBarText, children }) {
  return (
    <div className={`ds-frame ds-frame--${variant}`}>
      {variant === 'browser-chrome' && (
        <div className="ds-frame__chrome" data-testid="fake-address-bar">
          <span className="ds-frame__dots"><i /><i /><i /></span>
          <span className="ds-frame__url">{addressBarText}</span>
        </div>
      )}
      <div className="ds-frame__body">{children}</div>
    </div>
  )
}
```

- [ ] **Step 5: Add the CSS (pin positioning is percentage/corner-based, anchored to whatever wraps it — never fixed pixel coordinates on an image, per the spec's responsive requirement)**

```css
/* src/components/docs/screenshots/AnnotatedScreenshot.css */
.ds-frame {
  border: 1px solid var(--wm-border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--wm-shadow-card);
  background: var(--wm-paper);
}
.ds-frame__chrome {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.7rem;
  background: var(--wm-bg-tile);
  border-bottom: 1px solid var(--wm-border);
}
.ds-frame__dots { display: flex; gap: 0.3rem; }
.ds-frame__dots i { width: 8px; height: 8px; border-radius: 50%; background: var(--wm-border); display: block; }
.ds-frame__url {
  font-family: ui-monospace, monospace;
  font-size: 0.72rem;
  color: var(--wm-ink-light);
}
.ds-frame__body { padding: 1rem 1.1rem; font-size: 0.85rem; }

.pin-anchor { position: relative; }
.ds-pin {
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 3px #fff, 0 4px 10px rgba(0, 0, 0, 0.35);
  z-index: 5;
}
.ds-pin--cred { background: var(--wm-track-cred); }
.ds-pin--flow { background: var(--wm-track-flow); }
.ds-pin--top-right { top: -10px; right: -10px; }
.ds-pin--top-left { top: -10px; left: -10px; }
.ds-pin--bottom-right { bottom: -10px; right: -10px; }
.ds-pin--bottom-left { bottom: -10px; left: -10px; }
```

- [ ] **Step 6: Run the test again to verify it passes**

Run: `npm test -- src/components/docs/screenshots/AnnotatedScreenshot.test.jsx`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/components/docs/screenshots/AnnotatedScreenshot.jsx src/components/docs/screenshots/AnnotatedScreenshot.css src/components/docs/screenshots/Pin.jsx src/components/docs/screenshots/AnnotatedScreenshot.test.jsx
git commit -m "feat(docs): add AnnotatedScreenshot and Pin shared primitives"
```

---

## Task 12: `RealEditorPreview` (shared WorkflowMitra editor recreation)

**Files:**
- Create: `src/components/docs/screenshots/RealEditorPreview.jsx`
- Create: `src/components/docs/screenshots/RealEditorPreview.css`
- Test: `src/components/docs/screenshots/RealEditorPreview.test.jsx`

**Interfaces:**
- Consumes: `AnnotatedScreenshot`/`Pin` from Task 11.
- Produces: `<RealEditorPreview nodeType nodeLabel nodeIcon nodeColor popoverFields={[{label, value, icon?, hint?}]} pins={[{target: 'node'|'connection'|'channel'|'message'|'save', number}]} />` — the ONE shared component every flagship page's `workflowGuide` (Task 25–32) renders through. This is what prevents "50 different screenshot implementations" per the review that shaped the spec.

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/docs/screenshots/RealEditorPreview.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RealEditorPreview } from './RealEditorPreview'

const popoverFields = [
  { label: 'Connection', value: 'Marketing Alerts (Slack)', icon: 'link' },
  { label: 'Channel', value: '#cod-verification' },
  { label: 'Message', value: 'New order from {{customer.name}}', hint: 'Insert variables from an earlier step' },
]

describe('RealEditorPreview', () => {
  it('renders the node label and its color', () => {
    render(<RealEditorPreview nodeType="slack" nodeLabel="Slack" nodeColor="#4A154B" popoverFields={popoverFields} pins={[]} />)
    expect(screen.getByText('Slack')).toBeInTheDocument()
  })

  it('renders every popover field label and value', () => {
    render(<RealEditorPreview nodeType="slack" nodeLabel="Slack" nodeColor="#4A154B" popoverFields={popoverFields} pins={[]} />)
    popoverFields.forEach((f) => {
      expect(screen.getByText(f.label)).toBeInTheDocument()
      expect(screen.getByText(f.value)).toBeInTheDocument()
    })
  })

  it('renders a hint line only for fields that have one', () => {
    render(<RealEditorPreview nodeType="slack" nodeLabel="Slack" nodeColor="#4A154B" popoverFields={popoverFields} pins={[]} />)
    expect(screen.getByText('Insert variables from an earlier step')).toBeInTheDocument()
  })

  it('renders one Pin per entry in `pins`', () => {
    const { container } = render(
      <RealEditorPreview nodeType="slack" nodeLabel="Slack" nodeColor="#4A154B" popoverFields={popoverFields}
        pins={[{ target: 'connection', number: 3 }, { target: 'message', number: 4 }]} />
    )
    expect(container.querySelectorAll('.ds-pin')).toHaveLength(2)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/components/docs/screenshots/RealEditorPreview.test.jsx`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```jsx
// src/components/docs/screenshots/RealEditorPreview.jsx
// Recreates the real WorkflowMitra editor (workflow/apps/web) verbatim:
// circular node discs, dotted-grid canvas, floating draggable popover —
// same tokens the real product uses (see src/styles/docs-theme.css).
// One shared component for every flagship + future integration's
// "configure the node" step; only nodeColor/nodeIcon/popoverFields/pins
// change per integration.
import { AnnotatedScreenshot, Pin } from './AnnotatedScreenshot'
import { Play, Grip, Undo2, Redo2, LayoutGrid, Maximize, Link2, ChevronDown, Lightbulb, Trash2, Scaling } from 'lucide-react'
import './RealEditorPreview.css'

function pinFor(pins, target) {
  return pins.find((p) => p.target === target)
}

export function RealEditorPreview({ nodeType, nodeLabel, nodeIcon: NodeIcon, nodeColor, popoverFields, pins }) {
  const nodePin = pinFor(pins, 'node')
  const savePin = pinFor(pins, 'save')

  return (
    <AnnotatedScreenshot variant="app-native">
      <div className="rep-bar">
        <Grip size={16} className="rep-bar__grip" />
        New Order Alerts
      </div>
      <div className="rep-canvas">
        <div className="rep-canvas__row">
          <div className="rep-node">
            <div className="rep-node__disc" style={{ background: 'var(--wm-ink)' }}>
              <span className="rep-node__badge">Starts here</span>
              <Play size={22} color="#fff" fill="#fff" />
            </div>
            <div className="rep-node__label">New order</div>
          </div>
          <div className="rep-edge"><svg viewBox="0 0 64 60" preserveAspectRatio="none"><path className="rep-edge__line" d="M2 30 C22 30,42 30,62 30" /></svg></div>
          <div className="pin-anchor rep-node rep-node--selected">
            <div className="rep-node__disc" style={{ background: nodeColor }}>
              {NodeIcon ? <NodeIcon size={22} color="#fff" /> : null}
            </div>
            <div className="rep-node__label">{nodeLabel}</div>
            {nodePin && <Pin number={nodePin.number} anchor="top-right" tone="flow" />}
          </div>
        </div>

        <div className="rep-popover">
          <div className="rep-popover__head">
            <div className="rep-popover__tile" style={{ background: nodeColor }}>
              {NodeIcon ? <NodeIcon size={16} color="#fff" /> : null}
            </div>
            <div className="rep-popover__title">
              <div className="rep-popover__name">{nodeLabel}</div>
              <div className="rep-popover__type">{nodeType.toUpperCase()}</div>
            </div>
          </div>
          <div className="rep-popover__body">
            {popoverFields.map((field) => {
              const fieldPin = pinFor(pins, field.label.toLowerCase())
              return (
                <div className="pin-anchor rep-field" key={field.label}>
                  <label>{field.label}</label>
                  <div className="rep-field__ctrl">
                    {field.icon === 'link' && <Link2 size={13} />}
                    <span>{field.value}</span>
                    <ChevronDown size={14} className="rep-field__chevron" />
                  </div>
                  {field.hint && (
                    <div className="rep-field__hint"><Lightbulb size={13} />{field.hint}</div>
                  )}
                  {fieldPin && <Pin number={fieldPin.number} anchor="top-right" tone="flow" />}
                </div>
              )
            })}
          </div>
          <div className="rep-popover__foot">
            <span className="rep-popover__delete"><Trash2 size={13} /> Delete step</span>
            <Scaling size={14} className="rep-popover__resize" />
          </div>
        </div>

        <div className="pin-anchor rep-floatbar">
          <Undo2 size={15} /><Redo2 size={15} /><LayoutGrid size={15} /><Maximize size={15} />
          <span className="rep-floatbar__save">Save</span>
          {savePin && <Pin number={savePin.number} anchor="top-right" tone="flow" />}
        </div>
      </div>
    </AnnotatedScreenshot>
  )
}
```

- [ ] **Step 4: Add the CSS**

```css
/* src/components/docs/screenshots/RealEditorPreview.css */
.rep-bar { display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 1rem; border-bottom: 1px solid var(--wm-border); font-size: 0.84rem; font-weight: 600; }
.rep-bar__grip { color: #C7C7CC; }
.rep-canvas {
  position: relative;
  background: var(--wm-bg);
  background-image: radial-gradient(rgba(10, 10, 10, 0.16) 1px, transparent 1.6px);
  background-size: 16px 16px;
  padding: 2.4rem 1.6rem 4.2rem;
}
.rep-canvas__row { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; }
.rep-node { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; width: 112px; position: relative; }
.rep-node__disc {
  width: 60px; height: 60px; border-radius: 50%; border: 3px solid #fff;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 18px rgba(10, 10, 10, 0.18), inset 0 2px 0 rgba(255, 255, 255, 0.28);
  position: relative;
}
.rep-node--selected .rep-node__disc { box-shadow: 0 8px 18px rgba(10, 10, 10, 0.18), inset 0 2px 0 rgba(255, 255, 255, 0.28), 0 0 0 4px rgba(10, 10, 10, 0.22); }
.rep-node__badge { position: absolute; top: -6px; left: -8px; background: var(--wm-orange); color: #3a1e00; font-size: 0.58rem; font-weight: 800; padding: 0.12rem 0.4rem; border-radius: 999px; white-space: nowrap; text-transform: uppercase; }
.rep-node__label { font-size: 0.78rem; font-weight: 700; text-align: center; }
.rep-edge { width: 64px; height: 60px; margin: 0 -6px; }
.rep-edge__line { stroke: var(--wm-ink-light); stroke-opacity: 0.4; stroke-width: 2.4; fill: none; }
.rep-popover { position: relative; margin: 1.6rem auto 0; width: min(100%, 320px); background: #fff; border: 1px solid var(--wm-border); border-radius: 16px; box-shadow: var(--wm-shadow-elevated); }
.rep-popover__head { display: flex; align-items: center; gap: 0.6rem; padding: 0.8rem 0.9rem; border-bottom: 1px solid #F1F1F2; }
.rep-popover__tile { width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex: none; }
.rep-popover__name { font-size: 0.86rem; font-weight: 700; }
.rep-popover__type { font-size: 0.62rem; letter-spacing: 0.06em; color: #B5B5BA; font-weight: 700; }
.rep-popover__body { padding: 0.9rem; }
.rep-field { margin-bottom: 0.85rem; }
.rep-field label { display: block; font-size: 0.72rem; font-weight: 700; color: #6b6b70; margin-bottom: 0.3rem; }
.rep-field__ctrl { border: 1px solid var(--wm-border); background: var(--wm-bg-tile); border-radius: 8px; padding: 0.5rem 0.65rem; font-size: 0.82rem; display: flex; align-items: center; gap: 0.4rem; }
.rep-field__chevron { margin-left: auto; color: #9a9a9f; }
.rep-field__hint { font-size: 0.72rem; color: var(--wm-orange); margin-top: 0.35rem; display: flex; gap: 0.35rem; align-items: flex-start; }
.rep-popover__foot { display: flex; justify-content: space-between; align-items: center; padding: 0.7rem 0.9rem; border-top: 1px solid #F1F1F2; }
.rep-popover__delete { font-size: 0.76rem; color: var(--wm-error); font-weight: 600; display: flex; align-items: center; gap: 0.3rem; }
.rep-popover__resize { color: #C7C7CC; }
.rep-floatbar { position: relative; margin: 1.6rem auto 0; width: max-content; background: #fff; border: 1px solid var(--wm-border); border-radius: 16px; box-shadow: var(--wm-shadow-elevated); display: flex; align-items: center; gap: 0.35rem; padding: 0.4rem; color: var(--wm-ink-light); }
.rep-floatbar__save { background: var(--wm-ink); color: #fff; font-size: 0.78rem; font-weight: 700; padding: 0 0.8rem; height: 30px; border-radius: 9px; display: flex; align-items: center; }
@media (prefers-reduced-motion: no-preference) {
  .rep-edge__line { stroke-dasharray: 0.1 9; stroke-linecap: round; animation: rep-flow 1.1s linear infinite; }
  @keyframes rep-flow { to { stroke-dashoffset: -18.2; } }
}
```

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npm test -- src/components/docs/screenshots/RealEditorPreview.test.jsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/docs/screenshots/RealEditorPreview.jsx src/components/docs/screenshots/RealEditorPreview.css src/components/docs/screenshots/RealEditorPreview.test.jsx
git commit -m "feat(docs): add shared RealEditorPreview component"
```

---

## Task 13: `CopyableField`

**Files:**
- Create: `src/components/docs/CopyableField.jsx`
- Create: `src/components/docs/CopyableField.css`
- Test: `src/components/docs/CopyableField.test.jsx`

**Interfaces:**
- Produces: `<CopyableField label value />` — consumed by every scene component's `resultFields` rendering (Tasks 14–19) via `credentialGuide.resultFields`.

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/docs/CopyableField.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CopyableField } from './CopyableField'

beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
})

describe('CopyableField', () => {
  it('renders the label and value', () => {
    render(<CopyableField label="Webhook URL" value="hooks.slack.com/services/xxx" />)
    expect(screen.getByText('Webhook URL')).toBeInTheDocument()
    expect(screen.getByText('hooks.slack.com/services/xxx')).toBeInTheDocument()
  })

  it('copies the value to the clipboard on click', async () => {
    render(<CopyableField label="Webhook URL" value="hooks.slack.com/services/xxx" />)
    await userEvent.click(screen.getByRole('button', { name: /copy/i }))
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hooks.slack.com/services/xxx')
  })

  it('shows a "Copied" confirmation after copying', async () => {
    render(<CopyableField label="Webhook URL" value="hooks.slack.com/services/xxx" />)
    await userEvent.click(screen.getByRole('button', { name: /copy/i }))
    expect(await screen.findByText(/copied/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/components/docs/CopyableField.test.jsx`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```jsx
// src/components/docs/CopyableField.jsx
import { useState } from 'react'
import { CopyIcon } from './icons/docIcons'
import './CopyableField.css'

export function CopyableField({ label, value }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="copyable-field">
      <label>{label}</label>
      <div className="copyable-field__row">
        <span className="copyable-field__value">{value}</span>
        <button type="button" className="copyable-field__btn" onClick={handleCopy} aria-label={`Copy ${label}`}>
          <CopyIcon size={13} />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Add the CSS**

```css
/* src/components/docs/CopyableField.css */
.copyable-field label { display: block; font-size: 0.72rem; font-weight: 700; color: var(--wm-ink-light); margin-bottom: 0.3rem; }
.copyable-field__row { display: flex; align-items: center; gap: 0.5rem; border: 1px solid var(--wm-border); border-radius: 8px; padding: 0.5rem 0.7rem; }
.copyable-field__value { font-family: ui-monospace, monospace; font-size: 0.74rem; color: var(--wm-ink-light); flex: 1; word-break: break-all; }
.copyable-field__btn {
  display: inline-flex; align-items: center; gap: 0.3rem;
  font: inherit; font-size: 0.74rem; font-weight: 700; color: var(--wm-ink);
  background: #fff; border: 1px solid var(--wm-border); border-radius: 6px; padding: 0.3rem 0.6rem;
  cursor: pointer; flex: none;
}
.copyable-field__btn:hover { background: var(--wm-bg-tile); }
```

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npm test -- src/components/docs/CopyableField.test.jsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/docs/CopyableField.jsx src/components/docs/CopyableField.css src/components/docs/CopyableField.test.jsx
git commit -m "feat(docs): add CopyableField component"
```

---

## Task 14: `SlackWebhookScene`

**Files:**
- Create: `src/components/docs/screenshots/scenes/SlackWebhookScene.jsx`
- Create: `src/components/docs/screenshots/scenes/SlackWebhookScene.css`
- Test: `src/components/docs/screenshots/scenes/SlackWebhookScene.test.jsx`

**Interfaces:**
- Consumes: `AnnotatedScreenshot`/`Pin` (Task 11), `CopyableField` (Task 13).
- Produces: `<SlackWebhookScene resultFields={[{label, example, copyable}]} pins={[{target, number}]} />`, referenced by `slack.js`'s `credentialGuide.sceneComponent` (Task 25).

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/docs/screenshots/scenes/SlackWebhookScene.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SlackWebhookScene } from './SlackWebhookScene'

const resultFields = [{ label: 'Webhook URL', example: 'hooks.slack.com/services/T0N9F/B0A5K/xxxx', copyable: true }]
const pins = [{ target: 'toggle', number: 1 }, { target: 'add-webhook', number: 2 }, { target: 'webhook-row', number: 4 }]

describe('SlackWebhookScene', () => {
  it('renders the Incoming Webhooks tab as active', () => {
    render(<SlackWebhookScene resultFields={resultFields} pins={pins} />)
    expect(screen.getByText('Incoming Webhooks')).toBeInTheDocument()
  })

  it('renders the copyable webhook URL result field', () => {
    render(<SlackWebhookScene resultFields={resultFields} pins={pins} />)
    expect(screen.getByText('hooks.slack.com/services/T0N9F/B0A5K/xxxx')).toBeInTheDocument()
  })

  it('renders 3 pins from the given pins prop', () => {
    const { container } = render(<SlackWebhookScene resultFields={resultFields} pins={pins} />)
    expect(container.querySelectorAll('.ds-pin')).toHaveLength(3)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/components/docs/screenshots/scenes/SlackWebhookScene.test.jsx`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```jsx
// src/components/docs/screenshots/scenes/SlackWebhookScene.jsx
import { AnnotatedScreenshot, Pin } from '../AnnotatedScreenshot'
import { CopyableField } from '../../CopyableField'
import './SlackWebhookScene.css'

function pinFor(pins, target) {
  return pins.find((p) => p.target === target)
}

export function SlackWebhookScene({ resultFields, pins }) {
  const togglePin = pinFor(pins, 'toggle')
  const addPin = pinFor(pins, 'add-webhook')
  const rowPin = pinFor(pins, 'webhook-row')

  return (
    <AnnotatedScreenshot variant="browser-chrome" addressBarText="api.slack.com / apps / A0F92KX / incoming-webhooks">
      <div className="slack-scene__topstrip">Slack API</div>
      <div className="slack-scene__subnav">
        <span>Basic Information</span>
        <span>OAuth &amp; Permissions</span>
        <span className="slack-scene__subnav-active">Incoming Webhooks</span>
        <span>Slash Commands</span>
      </div>
      <div className="slack-scene__body">
        <h4>Incoming Webhooks</h4>
        <p className="slack-scene__desc">Create Incoming Webhooks to post messages from external sources into Slack.</p>

        <div className="pin-anchor slack-scene__toggle-row">
          <span className="slack-scene__sw" />
          <span>Activate Incoming Webhooks</span>
          {togglePin && <Pin number={togglePin.number} anchor="top-right" tone="cred" />}
        </div>

        <div className="pin-anchor slack-scene__add-btn">
          Add New Webhook to Workspace
          {addPin && <Pin number={addPin.number} anchor="top-right" tone="cred" />}
        </div>

        <div className="pin-anchor slack-scene__result">
          {resultFields.map((f) => <CopyableField key={f.label} label={f.label} value={f.example} />)}
          {rowPin && <Pin number={rowPin.number} anchor="top-right" tone="cred" />}
        </div>
      </div>
    </AnnotatedScreenshot>
  )
}
```

- [ ] **Step 4: Add the CSS**

```css
/* src/components/docs/screenshots/scenes/SlackWebhookScene.css */
.slack-scene__topstrip { background: #3E0E37; color: rgba(255,255,255,0.8); padding: 0.55rem 0.9rem; font-size: 0.78rem; }
.slack-scene__subnav { display: flex; gap: 1.2rem; padding: 0 1.1rem; border-bottom: 1px solid #DDD; overflow-x: auto; }
.slack-scene__subnav span { padding: 0.75rem 0; font-size: 0.82rem; color: #616061; white-space: nowrap; border-bottom: 2px solid transparent; }
.slack-scene__subnav-active { color: #1D1C1D !important; font-weight: 700; border-color: #4A154B !important; }
.slack-scene__body { padding: 1.3rem; }
.slack-scene__desc { color: #616061; font-size: 0.82rem; margin-bottom: 1rem; }
.slack-scene__toggle-row { display: flex; align-items: center; gap: 0.7rem; padding: 0.9rem 0; border-top: 1px solid #F0F0F0; }
.slack-scene__sw { width: 36px; height: 20px; border-radius: 999px; background: #007A5A; position: relative; }
.slack-scene__sw::after { content: ""; position: absolute; right: 2px; top: 2px; width: 16px; height: 16px; border-radius: 50%; background: #fff; }
.slack-scene__add-btn { display: inline-flex; background: #007A5A; color: #fff; font-size: 0.82rem; font-weight: 700; padding: 0.55rem 0.9rem; border-radius: 6px; margin: 1rem 0; }
.slack-scene__result { margin-top: 0.6rem; }
```

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npm test -- src/components/docs/screenshots/scenes/SlackWebhookScene.test.jsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/docs/screenshots/scenes/SlackWebhookScene.jsx src/components/docs/screenshots/scenes/SlackWebhookScene.css src/components/docs/screenshots/scenes/SlackWebhookScene.test.jsx
git commit -m "feat(docs): add SlackWebhookScene"
```

---

## Task 15: `TelegramBotFatherScene`

**Files:**
- Create: `src/components/docs/screenshots/scenes/TelegramBotFatherScene.jsx`
- Create: `src/components/docs/screenshots/scenes/TelegramBotFatherScene.css`
- Test: `src/components/docs/screenshots/scenes/TelegramBotFatherScene.test.jsx`

**Interfaces:**
- Produces: `<TelegramBotFatherScene resultFields pins />` — a chat-bubble recreation (BotFather is a Telegram conversation, not a website), so this scene uses `variant="app-native"` on `AnnotatedScreenshot` rather than `browser-chrome`.

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/docs/screenshots/scenes/TelegramBotFatherScene.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TelegramBotFatherScene } from './TelegramBotFatherScene'

const resultFields = [{ label: 'Bot Token', example: '7738219045:AAF8kq...redacted', copyable: true }]
const pins = [{ target: 'newbot-command', number: 1 }, { target: 'token-message', number: 4 }]

describe('TelegramBotFatherScene', () => {
  it('renders the BotFather chat header', () => {
    render(<TelegramBotFatherScene resultFields={resultFields} pins={pins} />)
    expect(screen.getByText('BotFather')).toBeInTheDocument()
  })

  it('renders the /newbot command bubble', () => {
    render(<TelegramBotFatherScene resultFields={resultFields} pins={pins} />)
    expect(screen.getByText('/newbot')).toBeInTheDocument()
  })

  it('renders the copyable bot token', () => {
    render(<TelegramBotFatherScene resultFields={resultFields} pins={pins} />)
    expect(screen.getByText('7738219045:AAF8kq...redacted')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/components/docs/screenshots/scenes/TelegramBotFatherScene.test.jsx`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```jsx
// src/components/docs/screenshots/scenes/TelegramBotFatherScene.jsx
import { AnnotatedScreenshot, Pin } from '../AnnotatedScreenshot'
import { CopyableField } from '../../CopyableField'
import './TelegramBotFatherScene.css'

function pinFor(pins, target) {
  return pins.find((p) => p.target === target)
}

export function TelegramBotFatherScene({ resultFields, pins }) {
  const newbotPin = pinFor(pins, 'newbot-command')
  const tokenPin = pinFor(pins, 'token-message')

  return (
    <AnnotatedScreenshot variant="app-native">
      <div className="tg-scene__header">
        <span className="tg-scene__avatar">B</span>
        BotFather
      </div>
      <div className="tg-scene__thread">
        <div className="pin-anchor tg-scene__bubble tg-scene__bubble--out">
          /newbot
          {newbotPin && <Pin number={newbotPin.number} anchor="top-right" tone="cred" />}
        </div>
        <div className="tg-scene__bubble tg-scene__bubble--in">Alright, a new bot. How are we going to call it?</div>
        <div className="tg-scene__bubble tg-scene__bubble--out">WorkflowMitra Alerts</div>
        <div className="tg-scene__bubble tg-scene__bubble--in">Good. Now let's choose a username for your bot, it must end in `bot`.</div>
        <div className="tg-scene__bubble tg-scene__bubble--out">workflowmitra_alerts_bot</div>
        <div className="pin-anchor tg-scene__bubble tg-scene__bubble--in">
          Done! Use this token to access the HTTP API:
          <div className="tg-scene__result">
            {resultFields.map((f) => <CopyableField key={f.label} label={f.label} value={f.example} />)}
          </div>
          {tokenPin && <Pin number={tokenPin.number} anchor="top-right" tone="cred" />}
        </div>
      </div>
    </AnnotatedScreenshot>
  )
}
```

- [ ] **Step 4: Add the CSS**

```css
/* src/components/docs/screenshots/scenes/TelegramBotFatherScene.css */
.tg-scene__header { display: flex; align-items: center; gap: 0.6rem; padding: 0.7rem 1rem; background: #229ED9; color: #fff; font-weight: 700; font-size: 0.9rem; }
.tg-scene__avatar { width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; }
.tg-scene__thread { padding: 1rem; background: #E7EDF3; display: flex; flex-direction: column; gap: 0.6rem; }
.tg-scene__bubble { max-width: 80%; padding: 0.55rem 0.8rem; border-radius: 12px; font-size: 0.84rem; line-height: 1.4; }
.tg-scene__bubble--in { background: #fff; align-self: flex-start; border-bottom-left-radius: 3px; }
.tg-scene__bubble--out { background: #EFFDDE; align-self: flex-end; border-bottom-right-radius: 3px; }
.tg-scene__result { margin-top: 0.5rem; }
```

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npm test -- src/components/docs/screenshots/scenes/TelegramBotFatherScene.test.jsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/docs/screenshots/scenes/TelegramBotFatherScene.jsx src/components/docs/screenshots/scenes/TelegramBotFatherScene.css src/components/docs/screenshots/scenes/TelegramBotFatherScene.test.jsx
git commit -m "feat(docs): add TelegramBotFatherScene"
```

---

## Task 16: `MetaDevConsoleScene`

**Files:**
- Create: `src/components/docs/screenshots/scenes/MetaDevConsoleScene.jsx`
- Create: `src/components/docs/screenshots/scenes/MetaDevConsoleScene.css`
- Test: `src/components/docs/screenshots/scenes/MetaDevConsoleScene.test.jsx`

**Interfaces:**
- Produces: `<MetaDevConsoleScene resultFields pins />` — recreates Meta for Developers' WhatsApp product setup screen (multi-field result: access token + phone number ID).

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/docs/screenshots/scenes/MetaDevConsoleScene.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MetaDevConsoleScene } from './MetaDevConsoleScene'

const resultFields = [
  { label: 'Temporary access token', example: 'EAAG...redacted', copyable: true },
  { label: 'Phone number ID', example: '109876543210987', copyable: true },
]
const pins = [{ target: 'api-setup-tab', number: 1 }, { target: 'token-field', number: 3 }, { target: 'phone-id-field', number: 4 }]

describe('MetaDevConsoleScene', () => {
  it('renders the WhatsApp > API Setup tab as active', () => {
    render(<MetaDevConsoleScene resultFields={resultFields} pins={pins} />)
    expect(screen.getByText('API Setup')).toBeInTheDocument()
  })

  it('renders both copyable result fields', () => {
    render(<MetaDevConsoleScene resultFields={resultFields} pins={pins} />)
    expect(screen.getByText('EAAG...redacted')).toBeInTheDocument()
    expect(screen.getByText('109876543210987')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/components/docs/screenshots/scenes/MetaDevConsoleScene.test.jsx`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```jsx
// src/components/docs/screenshots/scenes/MetaDevConsoleScene.jsx
import { AnnotatedScreenshot, Pin } from '../AnnotatedScreenshot'
import { CopyableField } from '../../CopyableField'
import './MetaDevConsoleScene.css'

function pinFor(pins, target) {
  return pins.find((p) => p.target === target)
}

export function MetaDevConsoleScene({ resultFields, pins }) {
  const tabPin = pinFor(pins, 'api-setup-tab')

  return (
    <AnnotatedScreenshot variant="browser-chrome" addressBarText="developers.facebook.com / apps / your-app / whatsapp-business">
      <div className="meta-scene__topstrip">Meta for Developers</div>
      <div className="pin-anchor meta-scene__subnav">
        <span>Getting Started</span>
        <span className="meta-scene__subnav-active">API Setup</span>
        <span>Configuration</span>
        <span>Phone Numbers</span>
        {tabPin && <Pin number={tabPin.number} anchor="top-right" tone="cred" />}
      </div>
      <div className="meta-scene__body">
        <h4>Send and receive messages</h4>
        <p className="meta-scene__desc">Use the values below to configure the WhatsApp credential in WorkflowMitra.</p>
        <div className="meta-scene__results">
          {resultFields.map((f) => (
            <div className="pin-anchor" key={f.label}>
              <CopyableField label={f.label} value={f.example} />
              {pinFor(pins, f.label === 'Phone number ID' ? 'phone-id-field' : 'token-field') && (
                <Pin number={pinFor(pins, f.label === 'Phone number ID' ? 'phone-id-field' : 'token-field').number} anchor="top-right" tone="cred" />
              )}
            </div>
          ))}
        </div>
      </div>
    </AnnotatedScreenshot>
  )
}
```

- [ ] **Step 4: Add the CSS**

```css
/* src/components/docs/screenshots/scenes/MetaDevConsoleScene.css */
.meta-scene__topstrip { background: #1877F2; color: #fff; padding: 0.55rem 0.9rem; font-size: 0.8rem; font-weight: 600; }
.meta-scene__subnav { display: flex; gap: 1.2rem; padding: 0 1.1rem; border-bottom: 1px solid #DDD; overflow-x: auto; }
.meta-scene__subnav span { padding: 0.75rem 0; font-size: 0.82rem; color: #616061; white-space: nowrap; border-bottom: 2px solid transparent; }
.meta-scene__subnav-active { color: #1D1C1D !important; font-weight: 700; border-color: #1877F2 !important; }
.meta-scene__body { padding: 1.3rem; }
.meta-scene__desc { color: #616061; font-size: 0.82rem; margin-bottom: 1rem; }
.meta-scene__results { display: grid; gap: 0.9rem; }
```

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npm test -- src/components/docs/screenshots/scenes/MetaDevConsoleScene.test.jsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/docs/screenshots/scenes/MetaDevConsoleScene.jsx src/components/docs/screenshots/scenes/MetaDevConsoleScene.css src/components/docs/screenshots/scenes/MetaDevConsoleScene.test.jsx
git commit -m "feat(docs): add MetaDevConsoleScene"
```

---

## Task 17: `GoogleCloudConsoleScene` (tab-parameterized — serves both Gmail and Google Sheets)

**Files:**
- Create: `src/components/docs/screenshots/scenes/GoogleCloudConsoleScene.jsx`
- Create: `src/components/docs/screenshots/scenes/GoogleCloudConsoleScene.css`
- Test: `src/components/docs/screenshots/scenes/GoogleCloudConsoleScene.test.jsx`

**Interfaces:**
- Produces: `<GoogleCloudConsoleScene tab="oauth-consent" | "service-account" resultFields pins />` — the concrete example of the spec's "reuse when the real UI resembles one already built" rule: one shared shell (top bar + left settings nav), two different active tabs for Gmail's OAuth flow vs. Google Sheets' service-account flow.

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/docs/screenshots/scenes/GoogleCloudConsoleScene.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GoogleCloudConsoleScene } from './GoogleCloudConsoleScene'

const oauthFields = [{ label: 'Client ID', example: '123-abc.apps.googleusercontent.com', copyable: true }]
const serviceAccountFields = [{ label: 'Service account JSON', example: 'service-account-key.json (download)', copyable: false }]

describe('GoogleCloudConsoleScene', () => {
  it('shows the OAuth consent screen tab as active for tab="oauth-consent"', () => {
    render(<GoogleCloudConsoleScene tab="oauth-consent" resultFields={oauthFields} pins={[]} />)
    expect(screen.getByText('OAuth consent screen')).toBeInTheDocument()
    expect(screen.getByText('123-abc.apps.googleusercontent.com')).toBeInTheDocument()
  })

  it('shows the Service Accounts tab as active for tab="service-account"', () => {
    render(<GoogleCloudConsoleScene tab="service-account" resultFields={serviceAccountFields} pins={[]} />)
    expect(screen.getByText('Service Accounts')).toBeInTheDocument()
    expect(screen.getByText('service-account-key.json (download)')).toBeInTheDocument()
  })

  it('renders the same shared top bar regardless of tab', () => {
    render(<GoogleCloudConsoleScene tab="oauth-consent" resultFields={oauthFields} pins={[]} />)
    expect(screen.getByText('Google Cloud')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/components/docs/screenshots/scenes/GoogleCloudConsoleScene.test.jsx`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```jsx
// src/components/docs/screenshots/scenes/GoogleCloudConsoleScene.jsx
import { AnnotatedScreenshot, Pin } from '../AnnotatedScreenshot'
import { CopyableField } from '../../CopyableField'
import './GoogleCloudConsoleScene.css'

const TABS = {
  'oauth-consent': { navLabel: 'OAuth consent screen', heading: 'OAuth consent screen' },
  'service-account': { navLabel: 'Service Accounts', heading: 'Service Accounts' },
}

export function GoogleCloudConsoleScene({ tab, resultFields, pins }) {
  const active = TABS[tab]
  const resultPin = pins.find((p) => p.target === 'result')

  return (
    <AnnotatedScreenshot variant="browser-chrome" addressBarText="console.cloud.google.com / apis / credentials">
      <div className="gcc-scene__topstrip">Google Cloud</div>
      <div className="gcc-scene__layout">
        <nav className="gcc-scene__sidenav">
          <span className={tab === 'oauth-consent' ? 'gcc-scene__nav-active' : ''}>OAuth consent screen</span>
          <span className={tab === 'service-account' ? 'gcc-scene__nav-active' : ''}>Service Accounts</span>
          <span>Credentials</span>
          <span>API Library</span>
        </nav>
        <div className="pin-anchor gcc-scene__body">
          <h4>{active.heading}</h4>
          <div className="gcc-scene__results">
            {resultFields.map((f) => <CopyableField key={f.label} label={f.label} value={f.example} />)}
          </div>
          {resultPin && <Pin number={resultPin.number} anchor="top-right" tone="cred" />}
        </div>
      </div>
    </AnnotatedScreenshot>
  )
}
```

- [ ] **Step 4: Add the CSS**

```css
/* src/components/docs/screenshots/scenes/GoogleCloudConsoleScene.css */
.gcc-scene__topstrip { background: #fff; border-bottom: 1px solid #DDD; padding: 0.55rem 0.9rem; font-size: 0.85rem; font-weight: 700; color: #1a73e8; }
.gcc-scene__layout { display: flex; }
.gcc-scene__sidenav { width: 180px; border-right: 1px solid #DDD; padding: 0.8rem 0; flex: none; }
.gcc-scene__sidenav span { display: block; padding: 0.5rem 0.9rem; font-size: 0.8rem; color: #444; }
.gcc-scene__nav-active { background: #E8F0FE; color: #1a73e8 !important; font-weight: 700; border-right: 3px solid #1a73e8; }
.gcc-scene__body { flex: 1; padding: 1.2rem; }
.gcc-scene__results { display: grid; gap: 0.9rem; margin-top: 0.8rem; }
```

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npm test -- src/components/docs/screenshots/scenes/GoogleCloudConsoleScene.test.jsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/docs/screenshots/scenes/GoogleCloudConsoleScene.jsx src/components/docs/screenshots/scenes/GoogleCloudConsoleScene.css src/components/docs/screenshots/scenes/GoogleCloudConsoleScene.test.jsx
git commit -m "feat(docs): add tab-parameterized GoogleCloudConsoleScene for Gmail + Sheets"
```

---

## Task 18: `ShopifyAdminScene`

**Files:**
- Create: `src/components/docs/screenshots/scenes/ShopifyAdminScene.jsx`
- Create: `src/components/docs/screenshots/scenes/ShopifyAdminScene.css`
- Test: `src/components/docs/screenshots/scenes/ShopifyAdminScene.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/docs/screenshots/scenes/ShopifyAdminScene.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ShopifyAdminScene } from './ShopifyAdminScene'

const resultFields = [{ label: 'Admin API access token', example: 'shpat_xxxxxxxxxxxxxxxxxxxx', copyable: true }]
const pins = [{ target: 'install-app', number: 2 }, { target: 'token-field', number: 4 }]

describe('ShopifyAdminScene', () => {
  it('renders the Develop apps heading', () => {
    render(<ShopifyAdminScene resultFields={resultFields} pins={pins} />)
    expect(screen.getByText('Develop apps')).toBeInTheDocument()
  })

  it('renders the copyable access token', () => {
    render(<ShopifyAdminScene resultFields={resultFields} pins={pins} />)
    expect(screen.getByText('shpat_xxxxxxxxxxxxxxxxxxxx')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/components/docs/screenshots/scenes/ShopifyAdminScene.test.jsx`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```jsx
// src/components/docs/screenshots/scenes/ShopifyAdminScene.jsx
import { AnnotatedScreenshot, Pin } from '../AnnotatedScreenshot'
import { CopyableField } from '../../CopyableField'
import './ShopifyAdminScene.css'

function pinFor(pins, target) {
  return pins.find((p) => p.target === target)
}

export function ShopifyAdminScene({ resultFields, pins }) {
  const installPin = pinFor(pins, 'install-app')
  const tokenPin = pinFor(pins, 'token-field')

  return (
    <AnnotatedScreenshot variant="browser-chrome" addressBarText="admin.shopify.com / store / settings / apps / development">
      <div className="shopify-scene__topstrip">Shopify admin</div>
      <div className="shopify-scene__body">
        <h4>Develop apps</h4>
        <p className="shopify-scene__desc">Create a custom app to generate an Admin API access token for WorkflowMitra.</p>

        <div className="pin-anchor shopify-scene__install-btn">
          Install app
          {installPin && <Pin number={installPin.number} anchor="top-right" tone="cred" />}
        </div>

        <div className="pin-anchor shopify-scene__results">
          {resultFields.map((f) => <CopyableField key={f.label} label={f.label} value={f.example} />)}
          {tokenPin && <Pin number={tokenPin.number} anchor="top-right" tone="cred" />}
        </div>
      </div>
    </AnnotatedScreenshot>
  )
}
```

- [ ] **Step 4: Add the CSS**

```css
/* src/components/docs/screenshots/scenes/ShopifyAdminScene.css */
.shopify-scene__topstrip { background: #004C3F; color: #fff; padding: 0.55rem 0.9rem; font-size: 0.8rem; font-weight: 600; }
.shopify-scene__body { padding: 1.3rem; }
.shopify-scene__desc { color: #616061; font-size: 0.82rem; margin-bottom: 1rem; }
.shopify-scene__install-btn { display: inline-flex; background: #008060; color: #fff; font-size: 0.82rem; font-weight: 700; padding: 0.55rem 0.9rem; border-radius: 6px; margin-bottom: 1.2rem; }
.shopify-scene__results { display: grid; gap: 0.9rem; }
```

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npm test -- src/components/docs/screenshots/scenes/ShopifyAdminScene.test.jsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/docs/screenshots/scenes/ShopifyAdminScene.jsx src/components/docs/screenshots/scenes/ShopifyAdminScene.css src/components/docs/screenshots/scenes/ShopifyAdminScene.test.jsx
git commit -m "feat(docs): add ShopifyAdminScene"
```

---

## Task 19: `OpenAiPlatformScene` (representative AI-provider scene)

**Files:**
- Create: `src/components/docs/screenshots/scenes/OpenAiPlatformScene.jsx`
- Create: `src/components/docs/screenshots/scenes/OpenAiPlatformScene.css`
- Test: `src/components/docs/screenshots/scenes/OpenAiPlatformScene.test.jsx`

**Interfaces:**
- Produces: `<OpenAiPlatformScene resultFields pins />` plus a fixed, non-prop callout noting other providers follow the same shape (per spec: this represents the pick-a-provider pattern rather than building 5 near-identical scenes).

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/docs/screenshots/scenes/OpenAiPlatformScene.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OpenAiPlatformScene } from './OpenAiPlatformScene'

const resultFields = [{ label: 'API key', example: 'sk-proj-xxxxxxxxxxxxxxxxxxxx', copyable: true }]

describe('OpenAiPlatformScene', () => {
  it('renders the API keys heading', () => {
    render(<OpenAiPlatformScene resultFields={resultFields} pins={[]} />)
    expect(screen.getByText('API keys')).toBeInTheDocument()
  })

  it('renders the other-providers callout', () => {
    render(<OpenAiPlatformScene resultFields={resultFields} pins={[]} />)
    expect(screen.getByText(/Anthropic, Groq, Gemini, and Ollama/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/components/docs/screenshots/scenes/OpenAiPlatformScene.test.jsx`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```jsx
// src/components/docs/screenshots/scenes/OpenAiPlatformScene.jsx
import { AnnotatedScreenshot, Pin } from '../AnnotatedScreenshot'
import { CopyableField } from '../../CopyableField'
import './OpenAiPlatformScene.css'

export function OpenAiPlatformScene({ resultFields, pins }) {
  const createPin = pins.find((p) => p.target === 'create-key')

  return (
    <>
      <AnnotatedScreenshot variant="browser-chrome" addressBarText="platform.openai.com / api-keys">
        <div className="oai-scene__topstrip">OpenAI Platform</div>
        <div className="oai-scene__body">
          <h4>API keys</h4>
          <p className="oai-scene__desc">Create a secret key for WorkflowMitra to use.</p>
          <div className="pin-anchor oai-scene__create-btn">
            + Create new secret key
            {createPin && <Pin number={createPin.number} anchor="top-right" tone="cred" />}
          </div>
          <div className="oai-scene__results">
            {resultFields.map((f) => <CopyableField key={f.label} label={f.label} value={f.example} />)}
          </div>
        </div>
      </AnnotatedScreenshot>
      <p className="oai-scene__callout">
        Using a different AI provider? Anthropic, Groq, Gemini, and Ollama all follow the same basic shape: create an
        account, open its API keys page, create a new key, and copy it.
      </p>
    </>
  )
}
```

- [ ] **Step 4: Add the CSS**

```css
/* src/components/docs/screenshots/scenes/OpenAiPlatformScene.css */
.oai-scene__topstrip { background: #10A37F; color: #fff; padding: 0.55rem 0.9rem; font-size: 0.8rem; font-weight: 600; }
.oai-scene__body { padding: 1.3rem; }
.oai-scene__desc { color: #616061; font-size: 0.82rem; margin-bottom: 1rem; }
.oai-scene__create-btn { display: inline-flex; background: #10A37F; color: #fff; font-size: 0.82rem; font-weight: 700; padding: 0.55rem 0.9rem; border-radius: 6px; margin-bottom: 1.2rem; }
.oai-scene__results { display: grid; gap: 0.9rem; }
.oai-scene__callout { font-size: 0.84rem; color: var(--wm-ink-light); margin-top: 0.8rem; padding: 0.8rem 1rem; background: var(--wm-bg-tile); border-radius: 10px; }
```

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npm test -- src/components/docs/screenshots/scenes/OpenAiPlatformScene.test.jsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/docs/screenshots/scenes/OpenAiPlatformScene.jsx src/components/docs/screenshots/scenes/OpenAiPlatformScene.css src/components/docs/screenshots/scenes/OpenAiPlatformScene.test.jsx
git commit -m "feat(docs): add OpenAiPlatformScene"
```

---

## Task 20: Simple presentational section components

**Files:**
- Create: `src/components/docs/sections/MetaChips.jsx`
- Create: `src/components/docs/sections/UseCaseList.jsx`
- Create: `src/components/docs/sections/BeforeYouStart.jsx`
- Create: `src/components/docs/sections/MistakesList.jsx`
- Create: `src/components/docs/sections/FaqAccordion.jsx`
- Create: `src/components/docs/sections/RelatedIntegrations.jsx`
- Create: `src/components/docs/sections/TemplatesUsingThis.jsx`
- Create: `src/components/docs/sections/BrowseAllBanner.jsx`
- Create: `src/components/docs/sections/ExampleFlowDiagram.jsx`
- Create: `src/components/docs/sections/sections.css` (shared by all of the above)
- Test: `src/components/docs/sections/sections.test.jsx`

**Interfaces:**
- Consumes: `docIcons.js` (Task 10), `getBrandIcon` (Task 9).
- Produces: one component per section listed above, each consumed by `IntegrationDocTemplate` (Task 23). Grouped into one task because each is a small, low-complexity presentational piece a reviewer would judge the same way (per the plan's Task Right-Sizing note) — the shared test file gives each its own describe block so failures are still individually attributable.

- [ ] **Step 1: Write the failing tests**

```jsx
// src/components/docs/sections/sections.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MetaChips } from './MetaChips'
import { UseCaseList } from './UseCaseList'
import { BeforeYouStart } from './BeforeYouStart'
import { MistakesList } from './MistakesList'
import { FaqAccordion } from './FaqAccordion'
import { RelatedIntegrations } from './RelatedIntegrations'
import { TemplatesUsingThis } from './TemplatesUsingThis'
import { BrowseAllBanner } from './BrowseAllBanner'
import { ExampleFlowDiagram } from './ExampleFlowDiagram'

describe('MetaChips', () => {
  it('renders one chip per entry with its label', () => {
    render(<MetaChips chips={[{ icon: 'clock', label: '~5 min setup' }, { icon: 'key', label: 'Needs a Webhook URL' }]} />)
    expect(screen.getByText('~5 min setup')).toBeInTheDocument()
    expect(screen.getByText('Needs a Webhook URL')).toBeInTheDocument()
  })
})

describe('UseCaseList', () => {
  it('renders every use case text', () => {
    render(<UseCaseList useCases={[{ icon: 'bag', text: 'Alert on COD orders.' }]} />)
    expect(screen.getByText('Alert on COD orders.')).toBeInTheDocument()
  })
})

describe('BeforeYouStart', () => {
  it('renders all three prerequisite fields', () => {
    render(<BeforeYouStart prerequisites={{ youNeed: 'A workspace', weNeed: 'A Webhook URL', cost: 'Free' }} />)
    expect(screen.getByText('A workspace')).toBeInTheDocument()
    expect(screen.getByText('A Webhook URL')).toBeInTheDocument()
    expect(screen.getByText('Free')).toBeInTheDocument()
  })
})

describe('MistakesList', () => {
  it('renders every mistake', () => {
    render(<MistakesList mistakes={[{ text: 'Pasting a URL with a stray space.' }]} />)
    expect(screen.getByText('Pasting a URL with a stray space.')).toBeInTheDocument()
  })
})

describe('FaqAccordion', () => {
  it('renders every question, collapsed content revealed via native details', () => {
    render(<FaqAccordion faqs={[{ q: 'Do I need to be an admin?', a: 'No.' }]} />)
    expect(screen.getByText('Do I need to be an admin?')).toBeInTheDocument()
    expect(screen.getByText('No.')).toBeInTheDocument()
  })
})

describe('RelatedIntegrations', () => {
  it('renders one entry per related registry item', () => {
    render(<RelatedIntegrations related={[{ slug: 'discord', title: 'Discord' }]} />)
    expect(screen.getByText('Discord')).toBeInTheDocument()
  })
})

describe('TemplatesUsingThis', () => {
  it('renders template titles when present', () => {
    render(<TemplatesUsingThis templates={[{ id: 2, title: 'Shopify order → invoice → WhatsApp + shipping' }]} recommendedFallback={[]} />)
    expect(screen.getByText('Shopify order → invoice → WhatsApp + shipping')).toBeInTheDocument()
  })

  it('renders the recommended-workflows fallback when there are zero templates', () => {
    render(<TemplatesUsingThis templates={[]} recommendedFallback={[{ icon: 'bag', text: 'Build an order alert yourself.' }]} />)
    expect(screen.getByText('Build an order alert yourself.')).toBeInTheDocument()
    expect(screen.queryByText('Coming soon')).not.toBeInTheDocument()
  })
})

describe('BrowseAllBanner', () => {
  it('links to the integrations hub', () => {
    render(<BrowseAllBanner />)
    expect(screen.getByRole('link', { name: /see all integrations/i })).toHaveAttribute('href', '/docs/integrations')
  })
})

describe('ExampleFlowDiagram', () => {
  it('renders every node label and the caption', () => {
    render(<ExampleFlowDiagram nodes={[{ icon: 'shopify', color: '#95BF47', label: 'New order' }]} caption="Every order posts to Slack." />)
    expect(screen.getByText('New order')).toBeInTheDocument()
    expect(screen.getByText('Every order posts to Slack.')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/components/docs/sections/sections.test.jsx`
Expected: FAIL — modules don't exist.

- [ ] **Step 3: Implement each component**

```jsx
// src/components/docs/sections/MetaChips.jsx
import * as Icons from '../icons/docIcons'
const ICON_MAP = { clock: Icons.ClockIcon, key: Icons.KeyIcon, message: Icons.MessageIcon, gauge: Icons.GaugeIcon }
export function MetaChips({ chips }) {
  return (
    <div className="ds-meta-chips">
      {chips.map((c) => {
        const Icon = ICON_MAP[c.icon]
        return <span key={c.label}>{Icon && <Icon size={14} />}{c.label}</span>
      })}
    </div>
  )
}
```

```jsx
// src/components/docs/sections/UseCaseList.jsx
import * as Icons from '../icons/docIcons'
const ICON_MAP = { bag: Icons.BagIcon, headset: Icons.HeadsetIcon, bell: Icons.BellIcon, calendar: Icons.CalendarIcon }
export function UseCaseList({ useCases }) {
  return (
    <ul className="ds-usecases">
      {useCases.map((u) => {
        const Icon = ICON_MAP[u.icon] || Icons.MessageIcon
        return (
          <li key={u.text}>
            <span className="ds-usecases__icon"><Icon size={16} /></span>
            <span>{u.text}</span>
          </li>
        )
      })}
    </ul>
  )
}
```

```jsx
// src/components/docs/sections/BeforeYouStart.jsx
export function BeforeYouStart({ prerequisites }) {
  return (
    <div className="ds-callout">
      <div><div className="ds-callout__k">You'll need</div><div className="ds-callout__v">{prerequisites.youNeed}</div></div>
      <div><div className="ds-callout__k">WorkflowMitra needs</div><div className="ds-callout__v">{prerequisites.weNeed}</div></div>
      <div><div className="ds-callout__k">Cost</div><div className="ds-callout__v">{prerequisites.cost}</div></div>
    </div>
  )
}
```

```jsx
// src/components/docs/sections/MistakesList.jsx
import { CloseIcon } from '../icons/docIcons'
export function MistakesList({ mistakes }) {
  return (
    <ul className="ds-mistakes">
      {mistakes.map((m) => (
        <li key={m.text}>
          <span className="ds-mistakes__icon"><CloseIcon size={13} /></span>
          <span>{m.text}</span>
        </li>
      ))}
    </ul>
  )
}
```

```jsx
// src/components/docs/sections/FaqAccordion.jsx
import { ChevronDownIcon } from '../icons/docIcons'
export function FaqAccordion({ faqs }) {
  return (
    <div className="ds-faq">
      {faqs.map((f, i) => (
        <details key={f.q} open={i === 0}>
          <summary>{f.q}<ChevronDownIcon size={16} className="ds-faq__chev" /></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  )
}
```

```jsx
// src/components/docs/sections/RelatedIntegrations.jsx
import { Link } from 'react-router-dom'
import { getBrandIcon } from '../../../utils/brandIcons'
export function RelatedIntegrations({ related }) {
  return (
    <div className="ds-related">
      {related.map((r) => (
        <Link key={r.slug} to={`/docs/integrations/${r.slug}`} className="ds-related__item">
          <span className="ds-related__icon">{getBrandIcon(r.slug, { size: 14 })}</span>
          {r.title}
        </Link>
      ))}
    </div>
  )
}
```

```jsx
// src/components/docs/sections/TemplatesUsingThis.jsx
import { Link } from 'react-router-dom'
import * as Icons from '../icons/docIcons'
const ICON_MAP = { bag: Icons.BagIcon, headset: Icons.HeadsetIcon, bell: Icons.BellIcon, calendar: Icons.CalendarIcon }
export function TemplatesUsingThis({ templates, recommendedFallback }) {
  if (templates.length > 0) {
    return (
      <div className="ds-templates">
        {templates.map((t) => (
          <Link key={t.id} to={`/template/${t.id}`} className="ds-templates__card">
            <span className="ds-templates__title">{t.title}</span>
            <Icons.ChevronRightIcon size={16} />
          </Link>
        ))}
      </div>
    )
  }
  return (
    <div className="ds-templates ds-templates--fallback">
      {recommendedFallback.map((u) => {
        const Icon = ICON_MAP[u.icon] || Icons.MessageIcon
        return (
          <Link key={u.text} to="/template/new" className="ds-templates__card">
            <Icon size={16} />
            <span className="ds-templates__title">{u.text}</span>
          </Link>
        )
      })}
    </div>
  )
}
```

```jsx
// src/components/docs/sections/BrowseAllBanner.jsx
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '../icons/docIcons'
export function BrowseAllBanner() {
  return (
    <div className="ds-browse-banner">
      <div>
        <div className="ds-browse-banner__title">Looking for a different app?</div>
        <div className="ds-browse-banner__sub">Browse all integrations WorkflowMitra supports.</div>
      </div>
      <Link to="/docs/integrations" className="ds-browse-banner__cta">
        See all integrations <ChevronRightIcon size={15} />
      </Link>
    </div>
  )
}
```

```jsx
// src/components/docs/sections/ExampleFlowDiagram.jsx
// Example-flow nodes are a mix of real brand icons (e.g. 'slack',
// 'shopify') and generic, non-branded step types (a trigger, a
// logic/formatting step) that have no third-party logo — GENERIC_ICONS
// is checked first so those never get misrouted into the brand lookup.
import { getBrandIcon } from '../../../utils/brandIcons'
import { Play, SlidersHorizontal } from 'lucide-react'

const GENERIC_ICONS = { trigger: Play, tune: SlidersHorizontal }

export function ExampleFlowDiagram({ nodes, caption }) {
  return (
    <div className="ds-flowmini">
      <div className="ds-flowmini__row">
        {nodes.map((n, i) => {
          const Generic = GENERIC_ICONS[n.icon]
          return (
            <div className="ds-flowmini__step" key={n.label}>
              <div className="ds-flowmini__node" style={{ background: n.color }}>
                {Generic ? <Generic size={18} color="#fff" /> : getBrandIcon(n.icon, { size: 18, color: '#fff' })}
              </div>
              <div className="ds-flowmini__label">{n.label}</div>
              {i < nodes.length - 1 && <span className="ds-flowmini__arrow" aria-hidden="true" />}
            </div>
          )
        })}
      </div>
      <p className="ds-flowmini__caption">{caption}</p>
    </div>
  )
}
```

**Note for Step 1's test file above:** add one more case covering this — `render(<ExampleFlowDiagram nodes={[{ icon: 'trigger', color: '#0A0A0A', label: 'New order' }]} caption="x" />)` should render without throwing and show the "New order" label, proving the generic-icon path works alongside the brand-icon path already tested.

- [ ] **Step 4: Add the shared CSS**

```css
/* src/components/docs/sections/sections.css */
.ds-meta-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.9rem; }
.ds-meta-chips span { font-size: 0.74rem; font-weight: 600; padding: 0.28rem 0.68rem; border-radius: 999px; border: 1px solid var(--wm-border); color: var(--wm-ink-light); display: inline-flex; align-items: center; gap: 0.38rem; }

.ds-usecases { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.6rem; }
.ds-usecases li { display: flex; gap: 0.75rem; padding: 0.85rem 1rem; border: 1px solid var(--wm-border); border-radius: 12px; font-size: 0.92rem; align-items: flex-start; }
.ds-usecases__icon { flex: none; width: 30px; height: 30px; border-radius: 9px; background: var(--wm-track-cred-bg); color: var(--wm-track-cred); display: flex; align-items: center; justify-content: center; }

.ds-callout { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--wm-border); border-radius: 12px; overflow: hidden; }
.ds-callout > div { padding: 1rem 1.1rem; border-right: 1px solid var(--wm-border); }
.ds-callout > div:last-child { border-right: none; }
.ds-callout__k { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--wm-ink-light); font-weight: 700; }
.ds-callout__v { font-size: 0.9rem; font-weight: 650; margin-top: 0.3rem; }
@media (max-width: 640px) { .ds-callout { grid-template-columns: 1fr; } .ds-callout > div { border-right: none; border-bottom: 1px solid var(--wm-border); } }

.ds-mistakes { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.6rem; }
.ds-mistakes li { display: flex; gap: 0.65rem; font-size: 0.91rem; align-items: flex-start; }
.ds-mistakes__icon { flex: none; width: 22px; height: 22px; border-radius: 6px; background: #FDEAEA; color: var(--wm-error); display: flex; align-items: center; justify-content: center; margin-top: 0.1rem; }

.ds-faq details { border-bottom: 1px solid var(--wm-border); padding: 0.9rem 0; }
.ds-faq summary { cursor: pointer; font-weight: 650; font-size: 0.95rem; list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
.ds-faq summary::-webkit-details-marker { display: none; }
.ds-faq__chev { color: var(--wm-ink-light); transition: transform 0.18s ease; }
.ds-faq details[open] .ds-faq__chev { transform: rotate(180deg); }
@media (prefers-reduced-motion: reduce) { .ds-faq__chev { transition: none; } }
.ds-faq p { color: var(--wm-ink-light); font-size: 0.88rem; margin: 0.6rem 0 0; }

.ds-related { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.ds-related__item { display: inline-flex; align-items: center; gap: 0.5rem; border: 1px solid var(--wm-border); border-radius: 999px; padding: 0.4rem 0.85rem 0.4rem 0.5rem; font-size: 0.84rem; font-weight: 600; text-decoration: none; color: var(--wm-ink); }
.ds-related__icon { width: 22px; height: 22px; border-radius: 6px; display: flex; align-items: center; justify-content: center; }

.ds-templates { display: grid; gap: 0.7rem; }
.ds-templates__card { display: flex; align-items: center; gap: 0.7rem; padding: 0.9rem 1rem; border: 1px solid var(--wm-border); border-radius: 12px; text-decoration: none; color: var(--wm-ink); }
.ds-templates__title { font-weight: 700; font-size: 0.92rem; flex: 1; }

.ds-browse-banner { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; padding: 1.3rem 1.5rem; border-radius: 14px; background: var(--wm-track-flow-bg); }
.ds-browse-banner__title { font-weight: 700; font-size: 1rem; }
.ds-browse-banner__sub { font-size: 0.86rem; color: var(--wm-ink-light); margin-top: 0.2rem; }
.ds-browse-banner__cta { display: inline-flex; align-items: center; gap: 0.4rem; background: var(--wm-ink); color: #fff; font-weight: 700; font-size: 0.86rem; padding: 0.6rem 1rem; border-radius: 9px; text-decoration: none; white-space: nowrap; }

.ds-flowmini { background: var(--wm-bg); border: 1px solid var(--wm-border); border-radius: 14px; padding: 1.4rem 1rem; }
.ds-flowmini__row { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0.4rem; }
.ds-flowmini__step { display: flex; align-items: center; gap: 0.4rem; }
.ds-flowmini__node { width: 46px; height: 46px; border-radius: 50%; border: 3px solid #fff; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 14px rgba(10,10,10,0.16); }
.ds-flowmini__label { font-size: 0.78rem; font-weight: 700; }
.ds-flowmini__arrow { width: 28px; height: 2px; background: var(--wm-ink-light); opacity: 0.4; }
.ds-flowmini__caption { text-align: center; font-size: 0.82rem; color: var(--wm-ink-light); margin: 0.9rem 0 0; }
```

- [ ] **Step 5: Run the tests again to verify they pass**

Run: `npm test -- src/components/docs/sections/sections.test.jsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/docs/sections/
git commit -m "feat(docs): add simple presentational section components"
```

---

## Task 21: `SectionNav` (scroll-spy "on this page" nav)

**Files:**
- Create: `src/components/docs/SectionNav.jsx`
- Create: `src/components/docs/SectionNav.css`
- Test: `src/components/docs/SectionNav.test.jsx`

**Interfaces:**
- Produces: `<SectionNav items={[{ id, label }]} />` — consumed by `IntegrationDocTemplate` (Task 23). Renders on the dark rail under Shell A tokens (`.docs-shell`'s `--wm-sidebar-*` vars from Task 2).

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/docs/SectionNav.test.jsx
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SectionNav } from './SectionNav'

const items = [{ id: 'usecases', label: 'Real use cases' }, { id: 'faq', label: 'FAQ' }]

beforeEach(() => {
  document.body.innerHTML = '<div id="usecases"></div><div id="faq"></div>'
  // jsdom has no real IntersectionObserver — stub it so the component
  // doesn't throw; the "marks the first item active by default" test
  // below covers the part of the contract that doesn't depend on it.
  global.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  }
})

describe('SectionNav', () => {
  it('renders one link per item, pointing at its anchor', () => {
    render(<SectionNav items={items} />)
    expect(screen.getByRole('link', { name: 'Real use cases' })).toHaveAttribute('href', '#usecases')
    expect(screen.getByRole('link', { name: 'FAQ' })).toHaveAttribute('href', '#faq')
  })

  it('marks the first item active by default', () => {
    render(<SectionNav items={items} />)
    expect(screen.getByRole('link', { name: 'Real use cases' })).toHaveClass('active')
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/components/docs/SectionNav.test.jsx`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```jsx
// src/components/docs/SectionNav.jsx
import { useEffect, useRef, useState } from 'react'
import './SectionNav.css'

export function SectionNav({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id)
  const observerRef = useRef(null)

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean)
    if (!('IntersectionObserver' in window) || sections.length === 0) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -70% 0px' }
    )
    sections.forEach((s) => observerRef.current.observe(s))
    return () => observerRef.current?.disconnect()
  }, [items])

  return (
    <aside className="section-nav">
      <h5>On this page</h5>
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} className={item.id === activeId ? 'active' : ''}>
          {item.label}
        </a>
      ))}
    </aside>
  )
}
```

- [ ] **Step 4: Add the CSS**

```css
/* src/components/docs/SectionNav.css */
.section-nav { position: sticky; top: 64px; height: calc(100vh - 64px); overflow-y: auto; padding: 1.7rem 0;
  background: var(--wm-sidebar-bg); }
.section-nav h5 { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;
  margin: 0 0 0.8rem 1.15rem; color: var(--wm-sidebar-text-soft); }
.section-nav a { display: block; font-size: 0.85rem; font-weight: 500; text-decoration: none; padding: 0.42rem 1.15rem;
  border-left: 2px solid transparent; color: var(--wm-sidebar-text-soft); }
.section-nav a.active { border-left-color: var(--wm-orange); color: var(--wm-sidebar-text); font-weight: 700; }
@media (max-width: 980px) { .section-nav { display: none; } }
```

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npm test -- src/components/docs/SectionNav.test.jsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/docs/SectionNav.jsx src/components/docs/SectionNav.css src/components/docs/SectionNav.test.jsx
git commit -m "feat(docs): add scroll-spy SectionNav"
```

---

## Task 22: `Seo` component (meta tags + JSON-LD injection)

**Files:**
- Create: `src/components/docs/Seo.jsx`
- Test: `src/components/docs/Seo.test.jsx`

**Interfaces:**
- Consumes: `resolveOgImage` (Task 7), `breadcrumbSchema`/`howToSchema`/`faqSchema` (Task 8).
- Produces: `<Seo title description path category credentialGuide workflowGuide faqs publishedDate lastUpdated />` — a side-effecting component with no visible output, mounted once per page by `IntegrationDocPage` (Task 34) and `IntegrationsHub` (Task 33).

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/docs/Seo.test.jsx
import { describe, it, expect, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { Seo } from './Seo'

afterEach(() => {
  cleanup()
  document.title = ''
  document.head.querySelectorAll('meta[data-docs-seo], script[data-docs-seo], link[data-docs-seo]').forEach((el) => el.remove())
})

const credentialGuide = { steps: [{ title: 'Turn the toggle on', body: 'Do it.' }] }
const workflowGuide = { steps: [{ title: 'Add the node', body: 'Drop it.' }] }
const faqs = [{ q: 'Do I need to be an admin?', a: 'No.' }]

describe('Seo', () => {
  it('sets document.title', () => {
    render(<Seo title="Slack Integration — Connect Slack to WorkflowMitra" description="d" path="/docs/integrations/slack" category="MESSAGING" credentialGuide={credentialGuide} workflowGuide={workflowGuide} faqs={faqs} publishedDate="2026-08-03" lastUpdated="2026-08-03" />)
    expect(document.title).toBe('Slack Integration — Connect Slack to WorkflowMitra')
  })

  it('sets the meta description', () => {
    render(<Seo title="t" description="Send Slack messages automatically." path="/docs/integrations/slack" category="MESSAGING" credentialGuide={credentialGuide} workflowGuide={workflowGuide} faqs={faqs} publishedDate="2026-08-03" lastUpdated="2026-08-03" />)
    expect(document.querySelector('meta[name="description"]').content).toBe('Send Slack messages automatically.')
  })

  it('sets a canonical link containing the path', () => {
    render(<Seo title="t" description="d" path="/docs/integrations/slack" category="MESSAGING" credentialGuide={credentialGuide} workflowGuide={workflowGuide} faqs={faqs} publishedDate="2026-08-03" lastUpdated="2026-08-03" />)
    expect(document.querySelector('link[rel="canonical"]').href).toContain('/docs/integrations/slack')
  })

  it('injects BreadcrumbList, HowTo, and FAQPage JSON-LD scripts', () => {
    render(<Seo title="Slack" description="d" path="/docs/integrations/slack" category="MESSAGING" credentialGuide={credentialGuide} workflowGuide={workflowGuide} faqs={faqs} publishedDate="2026-08-03" lastUpdated="2026-08-03" />)
    const scripts = [...document.querySelectorAll('script[data-docs-seo]')]
    const types = scripts.map((s) => JSON.parse(s.textContent)['@type'])
    expect(types.sort()).toEqual(['BreadcrumbList', 'FAQPage', 'HowTo'])
  })

  it('sets a fixed og:type of article and twitter:card of summary_large_image', () => {
    render(<Seo title="t" description="d" path="/docs/integrations/slack" category="MESSAGING" credentialGuide={credentialGuide} workflowGuide={workflowGuide} faqs={faqs} publishedDate="2026-08-03" lastUpdated="2026-08-03" />)
    expect(document.querySelector('meta[property="og:type"]').content).toBe('article')
    expect(document.querySelector('meta[name="twitter:card"]').content).toBe('summary_large_image')
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/components/docs/Seo.test.jsx`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```jsx
// src/components/docs/Seo.jsx
import { useEffect } from 'react'
import { resolveOgImage } from '../../utils/docs/ogImage'
import { breadcrumbSchema, howToSchema, faqSchema } from '../../utils/docs/jsonLd'

const SITE_ORIGIN = 'https://workflowmitra.com'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    el.setAttribute('data-docs-seo', 'true')
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function Seo({ title, description, path, category, credentialGuide, workflowGuide, faqs, publishedDate, lastUpdated, ogImage = 'category' }) {
  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'article')
    setMeta('property', 'og:image', `${SITE_ORIGIN}${resolveOgImage({ ogImage }, category)}`)
    setMeta('property', 'article:published_time', publishedDate)
    setMeta('property', 'article:modified_time', lastUpdated)
    setMeta('name', 'twitter:card', 'summary_large_image')

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      canonical.setAttribute('data-docs-seo', 'true')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${SITE_ORIGIN}${path}`)

    const schemas = [breadcrumbSchema(title, path), howToSchema(title, credentialGuide, workflowGuide), faqSchema(faqs)]
    const scriptEls = schemas.map((schema) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-docs-seo', 'true')
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
      return script
    })

    return () => {
      scriptEls.forEach((s) => s.remove())
    }
  }, [title, description, path, category, credentialGuide, workflowGuide, faqs, publishedDate, lastUpdated, ogImage])

  return null
}
```

- [ ] **Step 4: Run the test again to verify it passes**

Run: `npm test -- src/components/docs/Seo.test.jsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/docs/Seo.jsx src/components/docs/Seo.test.jsx
git commit -m "feat(docs): add Seo component with meta tags and JSON-LD injection"
```

---

## Task 23: `DocsTopbar` + docs layout shell

**Files:**
- Create: `src/components/docs/DocsLayout.jsx`
- Create: `src/components/docs/DocsLayout.css`
- Test: `src/components/docs/DocsLayout.test.jsx`

**Interfaces:**
- Consumes: `SectionNav` (Task 21) as a prop-injected child (the layout doesn't know page-specific section lists — the page decides what to pass).
- Produces: `<DocsLayout sectionNav={<SectionNav items={...} />}>{children}</DocsLayout>` — the `.docs-shell` root, top bar (logo + search + back-to-site link, NOT the marketing `Navigation`/`Footer`), and the `[nav][main]` grid. Consumed by `IntegrationDocPage` (Task 34) and `IntegrationsHub` (Task 33).

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/docs/DocsLayout.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DocsLayout } from './DocsLayout'

describe('DocsLayout', () => {
  it('renders a "back to site" link to the marketing home', () => {
    render(<MemoryRouter><DocsLayout>content</DocsLayout></MemoryRouter>)
    expect(screen.getByRole('link', { name: /back to workflowmitra/i })).toHaveAttribute('href', '/')
  })

  it('renders a search input', () => {
    render(<MemoryRouter><DocsLayout>content</DocsLayout></MemoryRouter>)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders the sectionNav prop when given, and children regardless', () => {
    render(<MemoryRouter><DocsLayout sectionNav={<nav>my-nav</nav>}>my-content</DocsLayout></MemoryRouter>)
    expect(screen.getByText('my-nav')).toBeInTheDocument()
    expect(screen.getByText('my-content')).toBeInTheDocument()
  })

  it('does NOT render the marketing site nav/footer', () => {
    render(<MemoryRouter><DocsLayout>content</DocsLayout></MemoryRouter>)
    expect(screen.queryByText('Pricing')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/components/docs/DocsLayout.test.jsx`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```jsx
// src/components/docs/DocsLayout.jsx
import { Link } from 'react-router-dom'
import { SearchIcon } from './icons/docIcons'
import '../../styles/docs-theme.css'
import './DocsLayout.css'

export function DocsLayout({ sectionNav, children }) {
  return (
    <div className="docs-shell">
      <div className="docs-topbar">
        <div className="docs-topbar__brand">
          <span className="docs-topbar__dot" /> WorkflowMitra <span className="docs-topbar__sep">/ Docs</span>
        </div>
        <label className="docs-topbar__search">
          <SearchIcon size={16} />
          <input type="text" placeholder='Search apps — "Slack", "Google Sheets"…' />
        </label>
        <Link className="docs-topbar__back" to="/">← Back to WorkflowMitra.com</Link>
      </div>
      <div className="docs-body">
        {sectionNav}
        <main className="docs-main">{children}</main>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Add the CSS**

```css
/* src/components/docs/DocsLayout.css */
.docs-topbar { display: flex; align-items: center; gap: 1rem; padding: 0.85rem 1.25rem; border-bottom: 1px solid var(--wm-border); background: var(--wm-paper); }
.docs-topbar__brand { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.92rem; }
.docs-topbar__dot { width: 9px; height: 9px; border-radius: 3px; background: var(--wm-orange); }
.docs-topbar__sep { opacity: 0.5; font-weight: 400; }
.docs-topbar__search { flex: 1; max-width: 360px; display: flex; align-items: center; gap: 0.55rem; border: 1px solid var(--wm-border); border-radius: 8px; padding: 0.45rem 0.7rem; color: var(--wm-ink-light); }
.docs-topbar__search input { border: none; outline: none; background: transparent; font: inherit; flex: 1; color: var(--wm-ink); }
.docs-topbar__back { font-size: 0.8rem; color: var(--wm-ink-light); text-decoration: none; white-space: nowrap; }

.docs-body { display: grid; grid-template-columns: 220px minmax(0, 760px); gap: 0; max-width: 1080px; margin: 0 auto; align-items: start; }
.docs-main { min-width: 0; padding: 2rem 2.2rem 4rem; }
@media (max-width: 980px) { .docs-body { grid-template-columns: 1fr; } .docs-main { padding: 1.5rem 1.1rem 3rem; } }
```

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npm test -- src/components/docs/DocsLayout.test.jsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/docs/DocsLayout.jsx src/components/docs/DocsLayout.css src/components/docs/DocsLayout.test.jsx
git commit -m "feat(docs): add DocsLayout shell (topbar + section nav grid)"
```

---

## Task 24: `IntegrationDocTemplate` (composes everything into the full page)

**Files:**
- Create: `src/components/docs/IntegrationDocTemplate.jsx`
- Create: `src/components/docs/IntegrationDocTemplate.css`
- Test: `src/components/docs/IntegrationDocTemplate.test.jsx`

**Interfaces:**
- Consumes: `DocsLayout` (23), `SectionNav` (21), `Seo` (22), every section component (20), `RealEditorPreview` (12), the scenes (14–19) via a `sceneComponents` lookup map, `getBrandIcon` (9), `templatesUsingApp`/`recommendedWorkflows`/`coOccurrenceCounts` (5), `getRelatedIntegrations` (4).
- Produces: `<IntegrationDocTemplate config registryEntry registry templateFlows aliasMap templateMetadataById />` — this is what `IntegrationDocPage` (Task 34) renders. `config` is a `integrationDocs/<slug>.js` object (Tasks 25–32).
- The scene-lookup map lives here (not duplicated elsewhere): `{ SlackWebhookScene, TelegramBotFatherScene, MetaDevConsoleScene, GoogleCloudConsoleScene, ShopifyAdminScene, OpenAiPlatformScene }`, keyed by `config.credentialGuide.sceneComponent`. `http-request`'s config has no `sceneComponent` (per spec) — the template renders an expanded `RealEditorPreview` focused on auth fields instead, for that one case.

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/docs/IntegrationDocTemplate.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { IntegrationDocTemplate } from './IntegrationDocTemplate'

const registryEntry = { slug: 'slack', title: 'Slack', category: 'MESSAGING', status: 'live' }
const registry = [
  registryEntry,
  { slug: 'discord', title: 'Discord', category: 'MESSAGING', status: 'coming-soon' },
]
const config = {
  slug: 'slack', schemaVersion: 1, publishedDate: '2026-08-03', lastUpdated: '2026-08-03', reviewDate: '2026-11-01',
  hero: { tagline: 'Send a message to any Slack channel.', metaChips: [{ icon: 'key', label: 'Needs a Webhook URL' }] },
  useCases: [{ icon: 'bag', text: 'Alert on COD orders over ₹1,500.' }],
  prerequisites: { youNeed: 'A workspace', weNeed: 'A Webhook URL', cost: 'Free' },
  credentialGuide: { anchorId: 'get-credential', sceneComponent: 'SlackWebhookScene', steps: [{ pin: 1, title: 'Turn the toggle on', body: 'Do it.' }], resultFields: [{ label: 'Webhook URL', example: 'hooks.slack.com/x', copyable: true }] },
  workflowGuide: { anchorId: 'configure-node', nodeType: 'slack', nodeColor: '#4A154B', steps: [{ pin: 1, title: 'Add a Slack step', body: 'Right after the trigger.' }], popoverFields: [{ label: 'Channel', value: '#cod-verification' }] },
  exampleFlow: { nodes: [{ icon: 'slack', color: '#4A154B', label: 'Slack' }], caption: 'Posts to #cod-verification.' },
  templates: { fallbackWhenEmpty: 'recommended-workflows' },
  mistakes: [{ text: 'Pasting a URL with a stray space.' }],
  faqs: [{ q: 'Do I need to be an admin?', a: 'No.' }],
  seo: { metaTitle: 'Slack Integration', metaDescription: 'Send Slack messages automatically.', ogImage: 'category' },
}

describe('IntegrationDocTemplate', () => {
  it('renders the hero tagline and title', () => {
    render(<MemoryRouter><IntegrationDocTemplate config={config} registryEntry={registryEntry} registry={registry} templateFlows={[]} aliasMap={{}} templateMetadataById={{}} /></MemoryRouter>)
    expect(screen.getByRole('heading', { level: 1, name: 'Slack' })).toBeInTheDocument()
    expect(screen.getByText('Send a message to any Slack channel.')).toBeInTheDocument()
  })

  it('renders section anchors matching the fixed anchorId contract', () => {
    const { container } = render(<MemoryRouter><IntegrationDocTemplate config={config} registryEntry={registryEntry} registry={registry} templateFlows={[]} aliasMap={{}} templateMetadataById={{}} /></MemoryRouter>)
    expect(container.querySelector('#get-credential')).toBeInTheDocument()
    expect(container.querySelector('#configure-node')).toBeInTheDocument()
  })

  it('renders the SlackWebhookScene for slack (via the sceneComponent lookup)', () => {
    render(<MemoryRouter><IntegrationDocTemplate config={config} registryEntry={registryEntry} registry={registry} templateFlows={[]} aliasMap={{}} templateMetadataById={{}} /></MemoryRouter>)
    expect(screen.getByText('Incoming Webhooks')).toBeInTheDocument()
  })

  it('renders the recommended-workflows fallback when zero templates match', () => {
    render(<MemoryRouter><IntegrationDocTemplate config={config} registryEntry={registryEntry} registry={registry} templateFlows={[]} aliasMap={{}} templateMetadataById={{}} /></MemoryRouter>)
    expect(screen.getByText('Alert on COD orders over ₹1,500.')).toBeInTheDocument()
  })

  it('renders related integrations from the same category', () => {
    render(<MemoryRouter><IntegrationDocTemplate config={config} registryEntry={registryEntry} registry={registry} templateFlows={[]} aliasMap={{}} templateMetadataById={{}} /></MemoryRouter>)
    expect(screen.getByText('Discord')).toBeInTheDocument()
  })

  it('forwards credentialGuide.sceneProps to the scene component (e.g. GoogleCloudConsoleScene\'s required "tab")', () => {
    const gmailLikeConfig = {
      ...config, slug: 'gmail',
      credentialGuide: { anchorId: 'get-credential', sceneComponent: 'GoogleCloudConsoleScene', sceneProps: { tab: 'oauth-consent' }, steps: [{ pin: 1, title: 'x', body: 'y' }], resultFields: [{ label: 'Connected account', example: 'you@biz.com' }] },
    }
    const gmailEntry = { slug: 'gmail', title: 'Gmail', category: 'EMAIL', status: 'live' }
    render(<MemoryRouter><IntegrationDocTemplate config={gmailLikeConfig} registryEntry={gmailEntry} registry={registry} templateFlows={[]} aliasMap={{}} templateMetadataById={{}} /></MemoryRouter>)
    expect(screen.getByText('OAuth consent screen')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/components/docs/IntegrationDocTemplate.test.jsx`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```jsx
// src/components/docs/IntegrationDocTemplate.jsx
import { DocsLayout } from './DocsLayout'
import { SectionNav } from './SectionNav'
import { Seo } from './Seo'
import { getBrandIcon } from '../../utils/brandIcons'
import { RealEditorPreview } from './screenshots/RealEditorPreview'
import { SlackWebhookScene } from './screenshots/scenes/SlackWebhookScene'
import { TelegramBotFatherScene } from './screenshots/scenes/TelegramBotFatherScene'
import { MetaDevConsoleScene } from './screenshots/scenes/MetaDevConsoleScene'
import { GoogleCloudConsoleScene } from './screenshots/scenes/GoogleCloudConsoleScene'
import { ShopifyAdminScene } from './screenshots/scenes/ShopifyAdminScene'
import { OpenAiPlatformScene } from './screenshots/scenes/OpenAiPlatformScene'
import { MetaChips } from './sections/MetaChips'
import { UseCaseList } from './sections/UseCaseList'
import { BeforeYouStart } from './sections/BeforeYouStart'
import { MistakesList } from './sections/MistakesList'
import { FaqAccordion } from './sections/FaqAccordion'
import { RelatedIntegrations } from './sections/RelatedIntegrations'
import { TemplatesUsingThis } from './sections/TemplatesUsingThis'
import { BrowseAllBanner } from './sections/BrowseAllBanner'
import { ExampleFlowDiagram } from './sections/ExampleFlowDiagram'
import { getRelatedIntegrations } from '../../utils/docs/relatedIntegrations'
import { templatesUsingApp, coOccurrenceCounts, recommendedWorkflows } from '../../utils/docs/templatesForIntegration'
import './IntegrationDocTemplate.css'

const SCENE_COMPONENTS = {
  SlackWebhookScene, TelegramBotFatherScene, MetaDevConsoleScene, GoogleCloudConsoleScene, ShopifyAdminScene, OpenAiPlatformScene,
}

const SECTION_NAV_ITEMS = [
  { id: 'usecases', label: 'Real use cases' },
  { id: 'before', label: 'Before you start' },
  { id: 'get-credential', label: 'Get your credential' },
  { id: 'configure-node', label: 'Configure the node' },
  { id: 'example', label: 'Full example' },
  { id: 'templates', label: 'Templates that use this' },
  { id: 'mistakes', label: 'Common mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related integrations' },
]

export function IntegrationDocTemplate({ config, registryEntry, registry, templateFlows, aliasMap, templateMetadataById }) {
  const Scene = config.credentialGuide.sceneComponent ? SCENE_COMPONENTS[config.credentialGuide.sceneComponent] : null

  const matchedTemplates = templatesUsingApp(config.slug, { templateFlows, aliasMap, metadataById: templateMetadataById })
  const counts = coOccurrenceCounts(config.slug, { templateFlows, aliasMap })
  const relatedSlugs = getRelatedIntegrations(config.slug, { registry, coOccurrenceCounts: counts, override: config.relatedOverride })
  const relatedEntries = relatedSlugs.map((s) => registry.find((e) => e.slug === s)).filter(Boolean)

  return (
    <DocsLayout sectionNav={<SectionNav items={SECTION_NAV_ITEMS} />}>
      <Seo
        title={config.seo.metaTitle}
        description={config.seo.metaDescription}
        path={`/docs/integrations/${config.slug}`}
        category={registryEntry.category}
        credentialGuide={config.credentialGuide}
        workflowGuide={config.workflowGuide}
        faqs={config.faqs}
        publishedDate={config.publishedDate}
        lastUpdated={config.lastUpdated}
        ogImage={config.seo.ogImage}
      />

      <nav className="ds-crumb">Docs <span>›</span> Integrations <span>›</span> <b>{registryEntry.title}</b></nav>

      <header className="ds-hero">
        <div className="ds-hero__tile">{getBrandIcon(registryEntry.slug, { size: 38 })}</div>
        <div>
          <h1>{registryEntry.title}</h1>
          <p className="ds-hero__sub">{config.hero.tagline}</p>
          <MetaChips chips={config.hero.metaChips} />
        </div>
      </header>

      <section className="ds-section" id="usecases">
        <h2>Real ways businesses use this</h2>
        <UseCaseList useCases={config.useCases} />
      </section>

      <section className="ds-section" id="before">
        <h2>Before you start</h2>
        <BeforeYouStart prerequisites={config.prerequisites} />
      </section>

      <section className="ds-section" id={config.credentialGuide.anchorId}>
        <h2>Get your credential</h2>
        {Scene ? (
          <Scene
            {...(config.credentialGuide.sceneProps || {})}
            resultFields={config.credentialGuide.resultFields}
            pins={config.credentialGuide.steps.filter((s) => s.target).map((s) => ({ target: s.target, number: s.pin }))}
          />
        ) : (
          <RealEditorPreview
            nodeType={config.workflowGuide.nodeType}
            nodeLabel={registryEntry.title}
            nodeColor={config.workflowGuide.nodeColor}
            popoverFields={config.credentialGuide.resultFields.map((f) => ({ label: f.label, value: f.example }))}
            pins={[]}
          />
        )}
        <ol className="ds-steplist">
          {config.credentialGuide.steps.map((s) => (
            <li key={s.title}><span className="ds-steplist__n">{s.pin}</span><span><b>{s.title}</b> {s.body}</span></li>
          ))}
        </ol>
      </section>

      <section className="ds-section" id={config.workflowGuide.anchorId}>
        <h2>Configure the node in WorkflowMitra</h2>
        <RealEditorPreview
          nodeType={config.workflowGuide.nodeType}
          nodeLabel={registryEntry.title}
          nodeIcon={undefined}
          nodeColor={config.workflowGuide.nodeColor}
          popoverFields={config.workflowGuide.popoverFields}
          pins={config.workflowGuide.steps.filter((s) => s.target).map((s) => ({ target: s.target, number: s.pin }))}
        />
        <ol className="ds-steplist">
          {config.workflowGuide.steps.map((s) => (
            <li key={s.title}><span className="ds-steplist__n">{s.pin}</span><span><b>{s.title}</b> {s.body}</span></li>
          ))}
        </ol>
      </section>

      <section className="ds-section" id="example">
        <h2>The full example, end to end</h2>
        <ExampleFlowDiagram nodes={config.exampleFlow.nodes} caption={config.exampleFlow.caption} />
      </section>

      <section className="ds-section" id="templates">
        <h2>Templates that use {registryEntry.title}</h2>
        <TemplatesUsingThis templates={matchedTemplates} recommendedFallback={recommendedWorkflows(config.useCases, 2)} />
      </section>

      <section className="ds-section" id="mistakes">
        <h2>Common mistakes</h2>
        <MistakesList mistakes={config.mistakes} />
      </section>

      <section className="ds-section" id="faq">
        <h2>Frequently asked questions</h2>
        <FaqAccordion faqs={config.faqs} />
      </section>

      <section className="ds-section" id="related">
        <h2>Related integrations</h2>
        <RelatedIntegrations related={relatedEntries} />
      </section>

      <section className="ds-section" id="browse-all" style={{ marginBottom: 0 }}>
        <BrowseAllBanner />
      </section>
    </DocsLayout>
  )
}
```

- [ ] **Step 4: Add the CSS**

```css
/* src/components/docs/IntegrationDocTemplate.css */
.ds-crumb { font-size: 0.78rem; color: var(--wm-ink-light); margin-bottom: 1.3rem; }
.ds-crumb span { margin: 0 0.3rem; opacity: 0.5; }
.ds-crumb b { color: var(--wm-ink); font-weight: 600; }
.ds-hero { display: flex; gap: 1.2rem; align-items: flex-start; padding-bottom: 1.8rem; border-bottom: 1px solid var(--wm-border); margin-bottom: 1.9rem; }
.ds-hero__tile { flex: none; width: 64px; height: 64px; border-radius: 16px; background: #fff; display: flex; align-items: center; justify-content: center; box-shadow: var(--wm-shadow-card); border: 1px solid var(--wm-border); }
.ds-hero h1 { font-size: clamp(1.7rem, 2.6vw, 2.15rem); font-weight: 700; }
.ds-hero__sub { color: var(--wm-ink-light); margin-top: 0.5rem; font-size: 1rem; max-width: 56ch; }
.ds-section { margin-bottom: 2.6rem; }
.ds-section h2 { font-size: 1.32rem; font-weight: 700; margin-bottom: 1rem; }
.ds-steplist { list-style: none; margin: 1.1rem 0 0; padding: 0; display: grid; gap: 0.7rem; }
.ds-steplist li { display: flex; gap: 0.7rem; font-size: 0.92rem; }
.ds-steplist__n { flex: none; width: 24px; height: 24px; border-radius: 50%; background: var(--wm-track-cred); color: #fff; font-size: 0.74rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
```

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npm test -- src/components/docs/IntegrationDocTemplate.test.jsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/docs/IntegrationDocTemplate.jsx src/components/docs/IntegrationDocTemplate.css src/components/docs/IntegrationDocTemplate.test.jsx
git commit -m "feat(docs): add IntegrationDocTemplate composing all sections"
```

---

## Content-file task shape note (applies to Tasks 25–32)

Each `credentialGuide.steps[]` / `workflowGuide.steps[]` entry needs a `target` field naming which `Pin` slot it lights up — `undefined`/omitted means that step has no on-screenshot annotation (it's pure instruction, e.g. "add the step" before anything exists to point at). Valid `target` values per scene (fixed by what that scene component already checks for, from Tasks 14–19):

| Scene | Valid `target` values |
|---|---|
| `SlackWebhookScene` | `toggle`, `add-webhook`, `webhook-row` |
| `TelegramBotFatherScene` | `newbot-command`, `token-message` |
| `MetaDevConsoleScene` | `api-setup-tab`, `token-field`, `phone-id-field` |
| `GoogleCloudConsoleScene` | `result` |
| `ShopifyAdminScene` | `install-app`, `token-field` |
| `OpenAiPlatformScene` | `create-key` |
| `RealEditorPreview` (every `workflowGuide`) | `node`, `save`, plus the lowercased `label` of each `popoverFields` entry (e.g. `connection`, `channel`, `message`) |

Each content-file task's test asserts the file conforms to this (every `target` present is one of the values valid for its declared `sceneComponent`), not just that the file exists.

---

## Task 25: `slack.js` content file

**Files:**
- Create: `src/data/integrationDocs/slack.js`
- Test: `src/data/integrationDocs/slack.test.js`

**Interfaces:**
- Consumes: nothing (leaf data file).
- Produces: the config object rendered by `IntegrationDocTemplate` at `/docs/integrations/slack`, and imported by Task 33's content-index map.

- [ ] **Step 1: Write the failing test**

```js
// src/data/integrationDocs/slack.test.js
import { describe, it, expect } from 'vitest'
import slack from './slack'

describe('slack.js content', () => {
  it('has matching slug and schemaVersion 1', () => {
    expect(slack.slug).toBe('slack')
    expect(slack.schemaVersion).toBe(1)
  })

  it('has all three freshness dates', () => {
    expect(slack.publishedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(slack.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(slack.reviewDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('declares the fixed anchor IDs', () => {
    expect(slack.credentialGuide.anchorId).toBe('get-credential')
    expect(slack.workflowGuide.anchorId).toBe('configure-node')
  })

  it('only uses pin targets valid for SlackWebhookScene', () => {
    const validTargets = ['toggle', 'add-webhook', 'webhook-row']
    slack.credentialGuide.steps.filter((s) => s.target).forEach((s) => expect(validTargets).toContain(s.target))
  })

  it('only uses workflowGuide pin targets valid for RealEditorPreview given its own popoverFields', () => {
    const validTargets = ['node', 'save', ...slack.workflowGuide.popoverFields.map((f) => f.label.toLowerCase())]
    slack.workflowGuide.steps.filter((s) => s.target).forEach((s) => expect(validTargets).toContain(s.target))
  })

  it('has at least 3 use cases, 3 FAQs, and non-empty seo fields', () => {
    expect(slack.useCases.length).toBeGreaterThanOrEqual(3)
    expect(slack.faqs.length).toBeGreaterThanOrEqual(3)
    expect(slack.seo.metaTitle.length).toBeGreaterThan(0)
    expect(slack.seo.metaDescription.length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/data/integrationDocs/slack.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```js
// src/data/integrationDocs/slack.js
export default {
  slug: 'slack',
  schemaVersion: 1,
  publishedDate: '2026-08-03',
  lastUpdated: '2026-08-03',
  reviewDate: '2026-11-01',

  hero: {
    tagline: 'Send a message to any Slack channel the moment something happens in a flow.',
    metaChips: [
      { icon: 'message', label: 'Messaging' },
      { icon: 'clock', label: '~5 min setup' },
      { icon: 'gauge', label: 'Beginner friendly' },
      { icon: 'key', label: 'Needs a Webhook URL' },
    ],
  },

  useCases: [
    { icon: 'bag', text: 'A D2C skincare brand posts to #cod-verification the instant a Cash-on-Delivery Shopify order over ₹1,500 comes in — so ops can call and confirm before it ships.' },
    { icon: 'headset', text: 'When a WhatsApp customer types "talk to a person" and the AI can\'t help, the flow pings #support-escalations so a human picks it up inside the 15-minute SLA.' },
    { icon: 'bell', text: 'If a broadcast campaign\'s failure rate crosses 10%, #campaign-ops gets an alert immediately — instead of finding out from an unhappy client the next morning.' },
    { icon: 'calendar', text: 'Every evening at 7 PM, one line lands in #daily-numbers: leads today, conversion rate, credits left.' },
  ],

  prerequisites: { youNeed: 'A Slack workspace you can install an app in', weNeed: 'One Webhook URL', cost: 'Free' },

  credentialGuide: {
    anchorId: 'get-credential',
    sceneComponent: 'SlackWebhookScene',
    steps: [
      { pin: 1, target: 'toggle', title: 'Turn the toggle on', body: 'This tells Slack you\'re ready to receive messages from an outside app.' },
      { pin: 2, target: 'add-webhook', title: 'Click "Add New Webhook to Workspace"', body: 'Slack will ask which channel should receive the messages.' },
      { pin: 3, title: 'Pick a channel', body: 'e.g. #cod-verification — and click Allow.' },
      { pin: 4, target: 'webhook-row', title: 'Copy the Webhook URL', body: 'Starts with hooks.slack.com/services/… — treat it like a password.' },
    ],
    resultFields: [{ label: 'Webhook URL', example: 'hooks.slack.com/services/T0N9F/B0A5K/xxxxxxxxxxxxxxxx', copyable: true }],
  },

  workflowGuide: {
    anchorId: 'configure-node',
    nodeType: 'slack',
    nodeColor: '#4A154B',
    steps: [
      { pin: 1, title: 'Add a Slack step', body: 'Right after the step that should trigger it.' },
      { pin: 2, target: 'node', title: 'Click the Slack node', body: 'Opens its settings panel.' },
      { pin: 3, target: 'connection', title: 'Choose a connection', body: 'Pick a saved one, or paste a fresh Webhook URL from the steps above.' },
      { pin: 4, target: 'message', title: 'Write your message', body: 'Insert variables like order number or customer name.' },
      { pin: 5, target: 'save', title: 'Save and test', body: 'The floating bar at the bottom has Save and a one-click Test.' },
    ],
    popoverFields: [
      { label: 'Connection', value: 'Marketing Alerts (Slack)', icon: 'link' },
      { label: 'Channel', value: '#cod-verification' },
      { label: 'Message', value: '🛒 New order from {{customer.name}} — ₹{{order.total}}', hint: 'Click "Insert variable" to pull in details from an earlier step' },
    ],
  },

  exampleFlow: {
    nodes: [
      { icon: 'shopify', color: '#95BF47', label: 'New order' },
      { icon: 'tune', color: '#6B6B6B', label: 'Format message' },
      { icon: 'slack', color: '#4A154B', label: 'Slack' },
    ],
    caption: 'Every time Shopify reports a new order, WorkflowMitra checks it, formats a short message, and posts it straight to #cod-verification.',
  },

  templates: { fallbackWhenEmpty: 'recommended-workflows' },

  mistakes: [
    { text: 'Pasting the webhook URL with a stray space — it fails silently. Copy it fresh if a test doesn\'t arrive.' },
    { text: 'Picking a private channel without inviting the app to it first — Slack rejects the message.' },
    { text: 'Leaving {{ }} placeholders in the message when the earlier step never ran — always test the whole flow, not just this step.' },
  ],

  faqs: [
    { q: 'Do I need to be a Slack admin?', a: 'No — any member can create an app and add a webhook for a channel they\'re in, unless your workspace restricts app installs.' },
    { q: 'Can one webhook post to multiple channels?', a: 'No. One webhook is tied to one channel — add a second webhook and a second Slack step for a second channel.' },
    { q: 'Is the Webhook URL safe to share?', a: 'Treat it like a password. WorkflowMitra stores it encrypted and never shows the full value again after you save it.' },
    { q: 'What if the test message doesn\'t show up?', a: 'Double-check the URL was copied in full, and make sure the app has access to the channel you picked in step 3.' },
  ],

  relatedOverride: undefined,

  seo: {
    metaTitle: 'Slack Integration — Connect Slack to WorkflowMitra',
    metaDescription: 'Send Slack messages automatically from a WorkflowMitra flow. Step-by-step: get your Webhook URL and configure the node — beginner friendly.',
    ogImage: 'category',
  },

  schemaOverrides: undefined,
}
```

- [ ] **Step 4: Run the test again to verify it passes**

Run: `npm test -- src/data/integrationDocs/slack.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/integrationDocs/slack.js src/data/integrationDocs/slack.test.js
git commit -m "feat(docs): add Slack integration content"
```

---

## Task 26: `telegram.js` content file

**Files:**
- Create: `src/data/integrationDocs/telegram.js`
- Test: `src/data/integrationDocs/telegram.test.js`

- [ ] **Step 1: Write the failing test** (same shape as Task 25's, adjusted for Telegram's scene)

```js
// src/data/integrationDocs/telegram.test.js
import { describe, it, expect } from 'vitest'
import telegram from './telegram'

describe('telegram.js content', () => {
  it('has matching slug and schemaVersion 1', () => {
    expect(telegram.slug).toBe('telegram')
    expect(telegram.schemaVersion).toBe(1)
  })

  it('declares the fixed anchor IDs', () => {
    expect(telegram.credentialGuide.anchorId).toBe('get-credential')
    expect(telegram.workflowGuide.anchorId).toBe('configure-node')
  })

  it('only uses pin targets valid for TelegramBotFatherScene', () => {
    const validTargets = ['newbot-command', 'token-message']
    telegram.credentialGuide.steps.filter((s) => s.target).forEach((s) => expect(validTargets).toContain(s.target))
  })

  it('only uses workflowGuide pin targets valid for RealEditorPreview given its own popoverFields', () => {
    const validTargets = ['node', 'save', ...telegram.workflowGuide.popoverFields.map((f) => f.label.toLowerCase())]
    telegram.workflowGuide.steps.filter((s) => s.target).forEach((s) => expect(validTargets).toContain(s.target))
  })

  it('has at least 3 use cases and 3 FAQs', () => {
    expect(telegram.useCases.length).toBeGreaterThanOrEqual(3)
    expect(telegram.faqs.length).toBeGreaterThanOrEqual(3)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/data/integrationDocs/telegram.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```js
// src/data/integrationDocs/telegram.js
export default {
  slug: 'telegram',
  schemaVersion: 1,
  publishedDate: '2026-08-03',
  lastUpdated: '2026-08-03',
  reviewDate: '2026-11-01',

  hero: {
    tagline: 'Send a message from your own Telegram bot to any chat, group, or channel.',
    metaChips: [
      { icon: 'message', label: 'Messaging' },
      { icon: 'clock', label: '~3 min setup' },
      { icon: 'gauge', label: 'Beginner friendly' },
      { icon: 'key', label: 'Needs a Bot Token' },
    ],
  },

  useCases: [
    { icon: 'bag', text: 'A grocery delivery app messages a driver\'s personal Telegram the second they\'re assigned a delivery, with the address and customer phone number.' },
    { icon: 'bell', text: 'When server CPU crosses 90%, the on-call engineer gets a Telegram message before customers start noticing the slowdown.' },
    { icon: 'calendar', text: 'Every Monday at 9 AM, last week\'s sales numbers land straight in the team\'s Telegram group — no one has to ask for them.' },
    { icon: 'headset', text: 'A support bot forwards anything it can\'t answer to a private Telegram channel the team actually keeps open all day.' },
  ],

  prerequisites: { youNeed: 'A Telegram account', weNeed: 'One Bot Token', cost: 'Free' },

  credentialGuide: {
    anchorId: 'get-credential',
    sceneComponent: 'TelegramBotFatherScene',
    steps: [
      { pin: 1, target: 'newbot-command', title: 'Open a chat with @BotFather', body: 'Search for "BotFather" in Telegram — it\'s Telegram\'s own official bot for creating other bots — and send /newbot.' },
      { pin: 2, title: 'Give your bot a name', body: 'This is the display name people see, e.g. "WorkflowMitra Alerts".' },
      { pin: 3, title: 'Choose a username', body: 'Must end in "bot", e.g. workflowmitra_alerts_bot.' },
      { pin: 4, target: 'token-message', title: 'Copy the token', body: 'BotFather sends it back immediately — treat it like a password.' },
    ],
    resultFields: [{ label: 'Bot Token', example: '7738219045:AAF8kq_redactedTokenExample', copyable: true }],
  },

  workflowGuide: {
    anchorId: 'configure-node',
    nodeType: 'telegram',
    nodeColor: '#229ED9',
    steps: [
      { pin: 1, title: 'Add a Telegram step', body: 'Right after the step that should trigger it.' },
      { pin: 2, target: 'node', title: 'Click the Telegram node', body: 'Opens its settings panel.' },
      { pin: 3, target: 'connection', title: 'Choose a connection', body: 'Pick a saved one, or paste the Bot Token from the steps above.' },
      { pin: 4, target: 'chat id', title: 'Enter the Chat ID', body: 'The person, group, or channel that should receive the message.' },
      { pin: 5, target: 'save', title: 'Save and test', body: 'The floating bar at the bottom has Save and a one-click Test.' },
    ],
    popoverFields: [
      { label: 'Connection', value: 'Ops Alerts (Telegram)', icon: 'link' },
      { label: 'Chat ID', value: '-1001234567890' },
      { label: 'Message', value: '🚨 Server CPU at 92% — check now', hint: 'Insert variables from an earlier step' },
    ],
  },

  exampleFlow: {
    nodes: [
      { icon: 'trigger', color: '#0A0A0A', label: 'CPU > 90%' },
      { icon: 'tune', color: '#6B6B6B', label: 'Format alert' },
      { icon: 'telegram', color: '#229ED9', label: 'Telegram' },
    ],
    caption: 'The moment a monitoring check crosses the threshold, WorkflowMitra formats the alert and messages the on-call engineer directly.',
  },

  templates: { fallbackWhenEmpty: 'recommended-workflows' },

  mistakes: [
    { text: 'Messaging the bot yourself first and expecting it to reply — bots only send what your flow tells them to.' },
    { text: 'Using your personal Chat ID when you meant to message a group — group Chat IDs are negative numbers.' },
    { text: 'Losing the token after closing the BotFather chat — reopen it and send /token to get it again if needed.' },
  ],

  faqs: [
    { q: 'Do I need a Telegram Business account?', a: 'No — any regular Telegram account can create a bot through BotFather for free.' },
    { q: 'How do I find a group\'s Chat ID?', a: 'Add the bot to the group, send any message, then check the bot\'s recent updates — WorkflowMitra\'s connection setup shows this for you.' },
    { q: 'Can the same bot post to multiple chats?', a: 'Yes — one Bot Token works for any chat the bot has been added to; just change the Chat ID per step.' },
    { q: 'Is the Bot Token safe to share?', a: 'No — treat it like a password. Anyone with it can send messages as your bot. WorkflowMitra stores it encrypted.' },
  ],

  relatedOverride: undefined,

  seo: {
    metaTitle: 'Telegram Integration — Connect Telegram to WorkflowMitra',
    metaDescription: 'Send Telegram messages automatically from a WorkflowMitra flow. Step-by-step: create a bot with BotFather and configure the node.',
    ogImage: 'category',
  },

  schemaOverrides: undefined,
}
```

- [ ] **Step 4: Run the test again to verify it passes**

Run: `npm test -- src/data/integrationDocs/telegram.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/integrationDocs/telegram.js src/data/integrationDocs/telegram.test.js
git commit -m "feat(docs): add Telegram integration content"
```

---

## Task 27: `whatsapp.js` content file

**Files:**
- Create: `src/data/integrationDocs/whatsapp.js`
- Test: `src/data/integrationDocs/whatsapp.test.js`

- [ ] **Step 1: Write the failing test**

```js
// src/data/integrationDocs/whatsapp.test.js
import { describe, it, expect } from 'vitest'
import whatsapp from './whatsapp'

describe('whatsapp.js content', () => {
  it('has matching slug and schemaVersion 1', () => {
    expect(whatsapp.slug).toBe('whatsapp')
    expect(whatsapp.schemaVersion).toBe(1)
  })

  it('declares the fixed anchor IDs', () => {
    expect(whatsapp.credentialGuide.anchorId).toBe('get-credential')
    expect(whatsapp.workflowGuide.anchorId).toBe('configure-node')
  })

  it('only uses pin targets valid for MetaDevConsoleScene', () => {
    const validTargets = ['api-setup-tab', 'token-field', 'phone-id-field']
    whatsapp.credentialGuide.steps.filter((s) => s.target).forEach((s) => expect(validTargets).toContain(s.target))
  })

  it('has two credential result fields (access token + phone number ID)', () => {
    expect(whatsapp.credentialGuide.resultFields).toHaveLength(2)
  })

  it('has at least 3 use cases and 3 FAQs', () => {
    expect(whatsapp.useCases.length).toBeGreaterThanOrEqual(3)
    expect(whatsapp.faqs.length).toBeGreaterThanOrEqual(3)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/data/integrationDocs/whatsapp.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```js
// src/data/integrationDocs/whatsapp.js
export default {
  slug: 'whatsapp',
  schemaVersion: 1,
  publishedDate: '2026-08-03',
  lastUpdated: '2026-08-03',
  reviewDate: '2026-11-01',

  hero: {
    tagline: 'Send templates, media, and replies on WhatsApp — the channel your customers actually check.',
    metaChips: [
      { icon: 'message', label: 'Messaging' },
      { icon: 'clock', label: '~10 min setup' },
      { icon: 'gauge', label: 'Intermediate' },
      { icon: 'key', label: 'Needs an access token + phone number ID' },
    ],
  },

  useCases: [
    { icon: 'bag', text: 'A Shopify order confirmation goes out on WhatsApp within seconds of payment clearing, using a pre-approved template — no cluttered inbox, no missed email.' },
    { icon: 'calendar', text: 'A clinic sends an automatic appointment reminder 24 hours before, and again 2 hours before, cutting no-shows without a receptionist making calls.' },
    { icon: 'headset', text: 'A customer messages "where is my order" and gets an instant, accurate reply pulled from the live shipment status — no waiting for a human.' },
    { icon: 'bell', text: 'A COD order over a set amount triggers a WhatsApp confirmation asking the customer to reply YES before it ships, cutting return/fraud risk.' },
  ],

  prerequisites: { youNeed: 'A Meta Business account and a WhatsApp Business phone number', weNeed: 'An access token and a phone number ID', cost: 'Free to connect — Meta charges per conversation once you\'re live' },

  credentialGuide: {
    anchorId: 'get-credential',
    sceneComponent: 'MetaDevConsoleScene',
    steps: [
      { pin: 1, target: 'api-setup-tab', title: 'Open your app\'s WhatsApp product', body: 'In Meta for Developers, open your app, then WhatsApp → API Setup.' },
      { pin: 2, title: 'Add your business phone number', body: 'Or use the free test number Meta provides while you\'re still testing.' },
      { pin: 3, target: 'token-field', title: 'Copy the access token', body: 'Meta provides a temporary token here — for production, generate a permanent one under System Users.' },
      { pin: 4, target: 'phone-id-field', title: 'Copy the phone number ID', body: 'A numeric ID — different from the phone number itself.' },
    ],
    resultFields: [
      { label: 'Temporary access token', example: 'EAAG...redactedAccessTokenExample', copyable: true },
      { label: 'Phone number ID', example: '109876543210987', copyable: true },
    ],
  },

  workflowGuide: {
    anchorId: 'configure-node',
    nodeType: 'whatsapp',
    nodeColor: '#25D366',
    steps: [
      { pin: 1, title: 'Add a WhatsApp step', body: 'Right after the step that should trigger it.' },
      { pin: 2, target: 'node', title: 'Click the WhatsApp node', body: 'Opens its settings panel.' },
      { pin: 3, target: 'connection', title: 'Choose a connection', body: 'Pick a saved one, or paste the access token and phone number ID from the steps above.' },
      { pin: 4, target: 'operation', title: 'Pick an operation', body: 'Text, Template, Media, Interactive, Location, or Contacts — templates are required for the first message in a conversation.' },
      { pin: 5, target: 'save', title: 'Save and test', body: 'The floating bar at the bottom has Save and a one-click Test.' },
    ],
    popoverFields: [
      { label: 'Connection', value: 'Meta Business (WhatsApp)', icon: 'link' },
      { label: 'Operation', value: 'Template message' },
      { label: 'To', value: '{{customer.phone}}', hint: 'Insert the customer\'s number from an earlier step' },
    ],
  },

  exampleFlow: {
    nodes: [
      { icon: 'shopify', color: '#95BF47', label: 'Order paid' },
      { icon: 'tune', color: '#6B6B6B', label: 'Pick template' },
      { icon: 'whatsapp', color: '#25D366', label: 'WhatsApp' },
    ],
    caption: 'The moment payment clears, WorkflowMitra picks the right approved template and sends the confirmation on WhatsApp.',
  },

  templates: { fallbackWhenEmpty: 'recommended-workflows' },

  mistakes: [
    { text: 'Trying to send free-form text as the first message — WhatsApp requires an approved template to start a new conversation.' },
    { text: 'Using the temporary access token in production — it expires in 24 hours; generate a permanent one under System Users before going live.' },
    { text: 'Mixing up the phone number ID with the actual phone number — they are different values, both needed.' },
  ],

  faqs: [
    { q: 'Do I need Meta Business verification before I start?', a: 'No — you can test with a free Meta-provided number first. Verification is only required before you can message people who haven\'t messaged you first, at scale.' },
    { q: 'What\'s the difference between a template and a regular message?', a: 'A template is pre-approved by Meta and required to start a conversation; once the customer replies, you have a 24-hour window to send regular text freely.' },
    { q: 'Does WorkflowMitra support other WhatsApp providers besides Meta directly?', a: 'Yes — the same node supports several Business Solution Providers; this guide covers the direct Meta Cloud API path.' },
    { q: 'Is my access token safe to share?', a: 'No — treat it like a password. WorkflowMitra stores it encrypted and never shows the full value again after you save it.' },
  ],

  relatedOverride: undefined,

  seo: {
    metaTitle: 'WhatsApp Integration — Connect WhatsApp to WorkflowMitra',
    metaDescription: 'Send WhatsApp templates, media, and replies from a WorkflowMitra flow. Step-by-step: get your access token and phone number ID, then configure the node.',
    ogImage: 'category',
  },

  schemaOverrides: undefined,
}
```

- [ ] **Step 4: Run the test again to verify it passes**

Run: `npm test -- src/data/integrationDocs/whatsapp.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/integrationDocs/whatsapp.js src/data/integrationDocs/whatsapp.test.js
git commit -m "feat(docs): add WhatsApp integration content"
```

---

## Task 28: `gmail.js` content file

**Files:**
- Create: `src/data/integrationDocs/gmail.js`
- Test: `src/data/integrationDocs/gmail.test.js`

- [ ] **Step 1: Write the failing test**

```js
// src/data/integrationDocs/gmail.test.js
import { describe, it, expect } from 'vitest'
import gmail from './gmail'

describe('gmail.js content', () => {
  it('has matching slug and schemaVersion 1', () => {
    expect(gmail.slug).toBe('gmail')
    expect(gmail.schemaVersion).toBe(1)
  })

  it('uses GoogleCloudConsoleScene with tab "oauth-consent"', () => {
    expect(gmail.credentialGuide.sceneComponent).toBe('GoogleCloudConsoleScene')
    expect(gmail.credentialGuide.sceneProps.tab).toBe('oauth-consent')
  })

  it('only uses the "result" pin target valid for GoogleCloudConsoleScene', () => {
    gmail.credentialGuide.steps.filter((s) => s.target).forEach((s) => expect(s.target).toBe('result'))
  })

  it('has at least 3 use cases and 3 FAQs', () => {
    expect(gmail.useCases.length).toBeGreaterThanOrEqual(3)
    expect(gmail.faqs.length).toBeGreaterThanOrEqual(3)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/data/integrationDocs/gmail.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```js
// src/data/integrationDocs/gmail.js
export default {
  slug: 'gmail',
  schemaVersion: 1,
  publishedDate: '2026-08-03',
  lastUpdated: '2026-08-03',
  reviewDate: '2026-11-01',

  hero: {
    tagline: 'Send, reply to, and label emails automatically from a WorkflowMitra flow.',
    metaChips: [
      { icon: 'message', label: 'Email' },
      { icon: 'clock', label: '~8 min setup' },
      { icon: 'gauge', label: 'Intermediate' },
      { icon: 'key', label: 'Needs Google sign-in (OAuth)' },
    ],
  },

  useCases: [
    { icon: 'bag', text: 'A new lead fills out a form and gets a personalized welcome email within seconds — from your real Gmail address, not a generic no-reply.' },
    { icon: 'headset', text: 'A support flow auto-replies to common questions and labels the thread "Auto-handled," so the team only opens what actually needs a human.' },
    { icon: 'calendar', text: 'Every Friday afternoon, a summary email goes out to the founder with the week\'s numbers — nobody has to remember to send it.' },
    { icon: 'bell', text: 'A failed payment triggers a polite follow-up email asking the customer to update their card, sent the moment the failure webhook fires.' },
  ],

  prerequisites: { youNeed: 'A Google/Gmail account', weNeed: 'A Google OAuth connection (you\'ll sign in and approve access)', cost: 'Free' },

  credentialGuide: {
    anchorId: 'get-credential',
    sceneComponent: 'GoogleCloudConsoleScene',
    sceneProps: { tab: 'oauth-consent' },
    steps: [
      { pin: 1, title: 'Click "Connect Google Account" in WorkflowMitra', body: 'This opens Google\'s own sign-in screen — WorkflowMitra never sees your password.' },
      { pin: 2, title: 'Sign in and review the permissions', body: 'Google shows exactly what WorkflowMitra is asking to do (send email on your behalf).' },
      { pin: 3, target: 'result', title: 'Click Allow', body: 'Google sends WorkflowMitra a secure connection — no token to copy by hand.' },
    ],
    resultFields: [{ label: 'Connected account', example: 'you@yourbusiness.com', copyable: false }],
  },

  workflowGuide: {
    anchorId: 'configure-node',
    nodeType: 'gmail',
    nodeColor: '#EA4335',
    steps: [
      { pin: 1, title: 'Add a Gmail step', body: 'Right after the step that should trigger it.' },
      { pin: 2, target: 'node', title: 'Click the Gmail node', body: 'Opens its settings panel.' },
      { pin: 3, target: 'connection', title: 'Choose your connected account', body: 'The Google account you connected in the steps above.' },
      { pin: 4, target: 'operation', title: 'Pick an operation', body: 'Send, Reply, Draft, Archive, Mark read/unread, or Label.' },
      { pin: 5, target: 'save', title: 'Save and test', body: 'The floating bar at the bottom has Save and a one-click Test.' },
    ],
    popoverFields: [
      { label: 'Connection', value: 'you@yourbusiness.com', icon: 'link' },
      { label: 'Operation', value: 'Send' },
      { label: 'To', value: '{{lead.email}}', hint: 'Insert the recipient from an earlier step' },
    ],
  },

  exampleFlow: {
    nodes: [
      { icon: 'trigger', color: '#0A0A0A', label: 'New lead' },
      { icon: 'tune', color: '#6B6B6B', label: 'Pick template' },
      { icon: 'gmail', color: '#EA4335', label: 'Gmail' },
    ],
    caption: 'The instant a lead form is submitted, WorkflowMitra picks the right welcome email and sends it from your real Gmail address.',
  },

  templates: { fallbackWhenEmpty: 'recommended-workflows' },

  mistakes: [
    { text: 'Reconnecting a different Google account than intended and not noticing — check the connected account name in the popover before saving.' },
    { text: 'Forgetting Gmail\'s own sending limits — very high-volume sending is better suited to a dedicated SMTP/marketing provider.' },
    { text: 'Leaving the subject line blank — some inboxes flag blank-subject email as spam.' },
  ],

  faqs: [
    { q: 'Does WorkflowMitra ever see my Gmail password?', a: 'No — Google\'s OAuth sign-in happens on Google\'s own site; WorkflowMitra only receives a secure, revocable connection, never your password.' },
    { q: 'Can I revoke access later?', a: 'Yes, any time, from your Google Account\'s "Third-party access" settings — no need to change your password.' },
    { q: 'Can I send from a Google Workspace (company) address?', a: 'Yes — connect the Workspace account the same way; your admin may need to allow the app first if your organization restricts third-party access.' },
    { q: 'What happens if the connection expires?', a: 'WorkflowMitra will flag the step as needing reconnection — just repeat the "Connect Google Account" step.' },
  ],

  relatedOverride: undefined,

  seo: {
    metaTitle: 'Gmail Integration — Connect Gmail to WorkflowMitra',
    metaDescription: 'Send, reply to, and label emails automatically from a WorkflowMitra flow. Step-by-step: connect your Google account and configure the node.',
    ogImage: 'category',
  },

  schemaOverrides: undefined,
}
```

- [ ] **Step 4: Run the test again to verify it passes**

Run: `npm test -- src/data/integrationDocs/gmail.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/integrationDocs/gmail.js src/data/integrationDocs/gmail.test.js
git commit -m "feat(docs): add Gmail integration content"
```

---

## Task 29: `google-sheets.js` content file

**Files:**
- Create: `src/data/integrationDocs/google-sheets.js`
- Test: `src/data/integrationDocs/google-sheets.test.js`

- [ ] **Step 1: Write the failing test**

```js
// src/data/integrationDocs/google-sheets.test.js
import { describe, it, expect } from 'vitest'
import googleSheets from './google-sheets'

describe('google-sheets.js content', () => {
  it('has matching slug and schemaVersion 1', () => {
    expect(googleSheets.slug).toBe('google-sheets')
    expect(googleSheets.schemaVersion).toBe(1)
  })

  it('uses GoogleCloudConsoleScene with tab "service-account" (reusing Gmail\'s shell, per spec)', () => {
    expect(googleSheets.credentialGuide.sceneComponent).toBe('GoogleCloudConsoleScene')
    expect(googleSheets.credentialGuide.sceneProps.tab).toBe('service-account')
  })

  it('has at least 3 use cases and 3 FAQs', () => {
    expect(googleSheets.useCases.length).toBeGreaterThanOrEqual(3)
    expect(googleSheets.faqs.length).toBeGreaterThanOrEqual(3)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/data/integrationDocs/google-sheets.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```js
// src/data/integrationDocs/google-sheets.js
export default {
  slug: 'google-sheets',
  schemaVersion: 1,
  publishedDate: '2026-08-03',
  lastUpdated: '2026-08-03',
  reviewDate: '2026-11-01',

  hero: {
    tagline: 'Read, add, and update spreadsheet rows automatically — no copy-paste at the end of the day.',
    metaChips: [
      { icon: 'message', label: 'Spreadsheet' },
      { icon: 'clock', label: '~10 min setup' },
      { icon: 'gauge', label: 'Intermediate' },
      { icon: 'key', label: 'Needs a service account' },
    ],
  },

  useCases: [
    { icon: 'bag', text: 'Every order logs itself as a new row — order ID, customer, amount, courier — so the weekly fulfilment report writes itself.' },
    { icon: 'headset', text: 'A support flow looks up a customer\'s row by phone number to answer "what plan am I on" without a human checking manually.' },
    { icon: 'calendar', text: 'A daily flow reads the "leads" sheet, counts today\'s rows, and posts the number to Slack — no one opens the sheet by hand.' },
    { icon: 'bell', text: 'When a row\'s "status" column changes to Urgent, a flow catches it on the next poll and alerts the on-call person.' },
  ],

  prerequisites: { youNeed: 'A Google Sheet you own or have edit access to', weNeed: 'A Google service account with the sheet shared to it', cost: 'Free' },

  credentialGuide: {
    anchorId: 'get-credential',
    sceneComponent: 'GoogleCloudConsoleScene',
    sceneProps: { tab: 'service-account' },
    steps: [
      { pin: 1, title: 'Create a service account', body: 'In Google Cloud Console → IAM & Admin → Service Accounts → Create.' },
      { pin: 2, target: 'result', title: 'Create and download a JSON key', body: 'Under the service account\'s "Keys" tab — this file is your credential.' },
      { pin: 3, title: 'Share your Google Sheet with the service account\'s email', body: 'The service account has its own @…iam.gserviceaccount.com email — share the sheet with it like you would a coworker (Editor access).' },
    ],
    resultFields: [{ label: 'Service account JSON', example: 'service-account-key.json (downloaded file)', copyable: false }],
  },

  workflowGuide: {
    anchorId: 'configure-node',
    nodeType: 'google-sheets',
    nodeColor: '#0F9D58',
    steps: [
      { pin: 1, title: 'Add a Google Sheets step', body: 'Right after the step that should trigger it.' },
      { pin: 2, target: 'node', title: 'Click the Google Sheets node', body: 'Opens its settings panel.' },
      { pin: 3, target: 'connection', title: 'Upload the service account JSON', body: 'From the steps above — WorkflowMitra stores it encrypted.' },
      { pin: 4, target: 'spreadsheet', title: 'Paste the Spreadsheet ID and pick an operation', body: 'The long ID from the sheet\'s URL, then Append, Read, Find, Update, or Delete.' },
      { pin: 5, target: 'save', title: 'Save and test', body: 'The floating bar at the bottom has Save and a one-click Test.' },
    ],
    popoverFields: [
      { label: 'Connection', value: 'Ops Sheet (Service Account)', icon: 'link' },
      { label: 'Spreadsheet', value: 'Order Log 2026' },
      { label: 'Operation', value: 'Append row', hint: 'New values map to columns in the order you list them' },
    ],
  },

  exampleFlow: {
    nodes: [
      { icon: 'shopify', color: '#95BF47', label: 'New order' },
      { icon: 'tune', color: '#6B6B6B', label: 'Format row' },
      { icon: 'google-sheets', color: '#0F9D58', label: 'Google Sheets' },
    ],
    caption: 'Every new order appends a row to the log sheet automatically — the weekly report is always up to date.',
  },

  templates: { fallbackWhenEmpty: 'recommended-workflows' },

  mistakes: [
    { text: 'Forgetting to share the sheet with the service account\'s email — the connection will authenticate fine but every read/write fails with a permission error.' },
    { text: 'Using the sheet\'s display name instead of its Spreadsheet ID — copy the long ID from the URL between /d/ and /edit.' },
    { text: 'Mismatched columns — if "Append" values don\'t line up with the sheet\'s existing columns, data lands in the wrong place.' },
  ],

  faqs: [
    { q: 'What\'s a service account, in plain terms?', a: 'It\'s a special Google account made for apps, not people — you share your sheet with it exactly like sharing with a coworker\'s email.' },
    { q: 'Can I connect more than one sheet?', a: 'Yes — one service account can be shared with as many sheets as you want; just paste a different Spreadsheet ID per step.' },
    { q: 'Does this work with Excel files, not just Google Sheets?', a: 'No — this connects to Google Sheets specifically. An Excel file would need to be uploaded to Google Sheets first.' },
    { q: 'Is the JSON key safe to store in WorkflowMitra?', a: 'Yes — it\'s encrypted in the credentials vault and never shown again after you upload it.' },
  ],

  relatedOverride: undefined,

  seo: {
    metaTitle: 'Google Sheets Integration — Connect Google Sheets to WorkflowMitra',
    metaDescription: 'Read, add, and update Google Sheets rows automatically from a WorkflowMitra flow. Step-by-step: set up a service account and configure the node.',
    ogImage: 'category',
  },

  schemaOverrides: undefined,
}
```

- [ ] **Step 4: Run the test again to verify it passes**

Run: `npm test -- src/data/integrationDocs/google-sheets.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/integrationDocs/google-sheets.js src/data/integrationDocs/google-sheets.test.js
git commit -m "feat(docs): add Google Sheets integration content"
```

---

## Task 30: `http-request.js` content file (special case — no third-party scene)

**Files:**
- Create: `src/data/integrationDocs/http-request.js`
- Test: `src/data/integrationDocs/http-request.test.js`

**Interfaces:** per the spec's HTTP Request exception, `credentialGuide.sceneComponent` is intentionally absent — `IntegrationDocTemplate` (Task 24) already handles this by falling back to a `RealEditorPreview` focused on the node's own auth fields.

- [ ] **Step 1: Write the failing test**

```js
// src/data/integrationDocs/http-request.test.js
import { describe, it, expect } from 'vitest'
import httpRequest from './http-request'

describe('http-request.js content', () => {
  it('has matching slug and schemaVersion 1', () => {
    expect(httpRequest.slug).toBe('http-request')
    expect(httpRequest.schemaVersion).toBe(1)
  })

  it('has no sceneComponent — this is the deliberate exception with no fixed third-party UI', () => {
    expect(httpRequest.credentialGuide.sceneComponent).toBeUndefined()
  })

  it('still has resultFields so the RealEditorPreview fallback has something to show', () => {
    expect(httpRequest.credentialGuide.resultFields.length).toBeGreaterThan(0)
  })

  it('has at least 3 use cases and 3 FAQs', () => {
    expect(httpRequest.useCases.length).toBeGreaterThanOrEqual(3)
    expect(httpRequest.faqs.length).toBeGreaterThanOrEqual(3)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/data/integrationDocs/http-request.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```js
// src/data/integrationDocs/http-request.js
export default {
  slug: 'http-request',
  schemaVersion: 1,
  publishedDate: '2026-08-03',
  lastUpdated: '2026-08-03',
  reviewDate: '2026-11-01',

  hero: {
    tagline: 'Connect any app that has an API — with or without a login key — even ones WorkflowMitra doesn\'t have a dedicated node for yet.',
    metaChips: [
      { icon: 'message', label: 'Developer' },
      { icon: 'clock', label: 'Varies by API' },
      { icon: 'gauge', label: 'Intermediate' },
      { icon: 'key', label: 'Whatever your API needs' },
    ],
  },

  useCases: [
    { icon: 'bag', text: 'Your logistics partner has no WorkflowMitra node yet, but publishes a REST API — HTTP Request calls it directly to book a shipment.' },
    { icon: 'headset', text: 'An internal company tool exposes a private API key-protected endpoint — HTTP Request posts new support tickets straight into it.' },
    { icon: 'bell', text: 'A flow calls a weather API with no login at all, and posts a rain alert to the team if tomorrow looks bad for an outdoor event.' },
    { icon: 'calendar', text: 'A nightly flow calls an accounting SaaS\'s OAuth2-protected API to pull yesterday\'s numbers into a report.' },
  ],

  prerequisites: { youNeed: 'API documentation for the service you\'re connecting to', weNeed: 'Whatever that API requires: nothing, a bearer token, basic auth, an API key, or OAuth2', cost: 'Depends on the third-party API' },

  credentialGuide: {
    // Deliberate exception: there is no single fixed third-party dashboard to
    // recreate here — the whole page teaches "how to fill in whatever your
    // API needs," so IntegrationDocTemplate renders an expanded
    // RealEditorPreview (the real product's own auth-config UI) instead of a
    // sceneComponent. See spec "Screenshot strategy — HTTP Request exception."
    anchorId: 'get-credential',
    steps: [
      { title: 'Find your API\'s authentication method in its documentation', body: 'Look for a section usually called "Authentication" or "API Keys" — it will say none, bearer token, basic auth, API key, or OAuth2.' },
      { title: 'Generate the credential the docs describe', body: 'Most APIs have a dashboard page where you create a key or token — the exact steps vary by provider.' },
      { title: 'Copy the value(s) you need', body: 'A bearer token is one string; basic auth needs a username and password; OAuth2 needs a client ID and secret.' },
    ],
    resultFields: [{ label: 'Auth value (example: bearer token)', example: 'sk_live_xxxxxxxxxxxxxxxxxxxx', copyable: true }],
  },

  workflowGuide: {
    anchorId: 'configure-node',
    nodeType: 'http-request',
    nodeColor: '#111318',
    steps: [
      { pin: 1, title: 'Add an HTTP Request step', body: 'Right after the step that should trigger it.' },
      { pin: 2, target: 'node', title: 'Click the HTTP Request node', body: 'Opens its settings panel.' },
      { pin: 3, target: 'method', title: 'Set the method and URL', body: 'GET, POST, PUT, PATCH, or DELETE, plus the full endpoint URL from the API docs.' },
      { pin: 4, target: 'auth', title: 'Choose the auth type', body: 'None, Bearer, Basic, API Key, or OAuth2 — matching what you found in step 1 — then paste your credential.' },
      { pin: 5, target: 'save', title: 'Save and test', body: 'The floating bar at the bottom has Save and a one-click Test.' },
    ],
    popoverFields: [
      { label: 'Method', value: 'POST' },
      { label: 'Auth', value: 'Bearer token', icon: 'link' },
      { label: 'Body', value: '{ "order_id": "{{order.id}}" }', hint: 'Insert variables from an earlier step' },
    ],
  },

  exampleFlow: {
    nodes: [
      { icon: 'trigger', color: '#0A0A0A', label: 'New order' },
      { icon: 'tune', color: '#6B6B6B', label: 'Build request' },
      { icon: 'http-request', color: '#111318', label: 'HTTP Request' },
    ],
    caption: 'WorkflowMitra builds the request body from the order details and calls the courier\'s API directly — no dedicated node needed.',
  },

  templates: { fallbackWhenEmpty: 'recommended-workflows' },

  mistakes: [
    { text: 'Picking the wrong auth type — a bearer token pasted into a "Basic" field will fail with an authorization error that looks unrelated.' },
    { text: 'Forgetting the request body\'s Content-Type — most JSON APIs expect application/json, set automatically when you choose the JSON body type.' },
    { text: 'Hardcoding a value that should be a variable — test with real data from an earlier step, not typed-in placeholder text.' },
  ],

  faqs: [
    { q: 'What if the API needs OAuth2 with a refresh token?', a: 'The HTTP Request node\'s Auth section has a dedicated OAuth2 mode — enter the token URL, client ID, and client secret, and WorkflowMitra handles refreshing it.' },
    { q: 'Can I use this instead of a dedicated node like Slack?', a: 'Yes, technically — but a dedicated node handles auth and field formatting for you. Use HTTP Request mainly for services without one yet.' },
    { q: 'How do I know what the request body should look like?', a: 'The third-party API\'s own documentation always shows example requests — copy the shape and swap in variables from your flow.' },
    { q: 'Is my API key safe to store in WorkflowMitra?', a: 'Yes — any credential you save is encrypted, whether it came from a dedicated node or HTTP Request\'s auth fields.' },
  ],

  relatedOverride: undefined,

  seo: {
    metaTitle: 'HTTP Request Integration — Connect Any API to WorkflowMitra',
    metaDescription: 'Call any API from a WorkflowMitra flow, with or without a login key. Step-by-step: find your API\'s auth type and configure the node.',
    ogImage: 'category',
  },

  schemaOverrides: undefined,
}
```

- [ ] **Step 4: Run the test again to verify it passes**

Run: `npm test -- src/data/integrationDocs/http-request.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/integrationDocs/http-request.js src/data/integrationDocs/http-request.test.js
git commit -m "feat(docs): add HTTP Request integration content"
```

---

## Task 31: `ai-agent.js` content file

**Files:**
- Create: `src/data/integrationDocs/ai-agent.js`
- Test: `src/data/integrationDocs/ai-agent.test.js`

- [ ] **Step 1: Write the failing test**

```js
// src/data/integrationDocs/ai-agent.test.js
import { describe, it, expect } from 'vitest'
import aiAgent from './ai-agent'

describe('ai-agent.js content', () => {
  it('has matching slug and schemaVersion 1', () => {
    expect(aiAgent.slug).toBe('ai-agent')
    expect(aiAgent.schemaVersion).toBe(1)
  })

  it('uses OpenAiPlatformScene as the representative provider example', () => {
    expect(aiAgent.credentialGuide.sceneComponent).toBe('OpenAiPlatformScene')
  })

  it('only uses the "create-key" pin target valid for OpenAiPlatformScene', () => {
    aiAgent.credentialGuide.steps.filter((s) => s.target).forEach((s) => expect(s.target).toBe('create-key'))
  })

  it('has at least 3 use cases and 3 FAQs', () => {
    expect(aiAgent.useCases.length).toBeGreaterThanOrEqual(3)
    expect(aiAgent.faqs.length).toBeGreaterThanOrEqual(3)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/data/integrationDocs/ai-agent.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```js
// src/data/integrationDocs/ai-agent.js
export default {
  slug: 'ai-agent',
  schemaVersion: 1,
  publishedDate: '2026-08-03',
  lastUpdated: '2026-08-03',
  reviewDate: '2026-11-01',

  hero: {
    tagline: 'Let Claude, GPT, or another model answer, decide, or draft text as a step in your flow.',
    metaChips: [
      { icon: 'message', label: 'AI' },
      { icon: 'clock', label: '~5 min setup' },
      { icon: 'gauge', label: 'Intermediate' },
      { icon: 'key', label: 'Needs a provider API key' },
    ],
  },

  useCases: [
    { icon: 'headset', text: 'A WhatsApp customer asks a question the AI can answer from your FAQ — it drafts a reply, and only escalates to a human when it\'s genuinely unsure.' },
    { icon: 'bag', text: 'A new lead\'s message gets classified as "hot," "warm," or "cold" automatically, so the sales team works the best ones first.' },
    { icon: 'calendar', text: 'Every evening, the AI reads the day\'s support tickets and writes a one-paragraph summary for the founder — no one has to read them all.' },
    { icon: 'bell', text: 'A long customer complaint gets auto-summarized to two sentences before it lands in the escalation Slack channel, so the on-call agent can act in seconds.' },
  ],

  prerequisites: { youNeed: 'An account with an AI provider (OpenAI, Anthropic, Groq, Gemini, or a self-hosted Ollama server)', weNeed: 'One API key', cost: 'Pay-per-use, billed directly by the provider' },

  credentialGuide: {
    anchorId: 'get-credential',
    sceneComponent: 'OpenAiPlatformScene',
    steps: [
      { title: 'Create an account with your chosen provider', body: 'This example uses OpenAI — Anthropic, Groq, and Gemini all work the same way.' },
      { target: 'create-key', title: 'Open the API keys page and create a new key', body: 'Usually under Settings or a dedicated "API Keys" section.' },
      { title: 'Copy the key immediately', body: 'Most providers only show the full key once — copy it now, or you\'ll have to create a new one.' },
    ],
    resultFields: [{ label: 'API key', example: 'sk-proj-xxxxxxxxxxxxxxxxxxxx', copyable: true }],
  },

  workflowGuide: {
    anchorId: 'configure-node',
    nodeType: 'ai-agent',
    nodeColor: '#3730A3',
    steps: [
      { pin: 1, title: 'Add an AI Agent step', body: 'Right after the step that should trigger it.' },
      { pin: 2, target: 'node', title: 'Click the AI Agent node', body: 'Opens its settings panel.' },
      { pin: 3, target: 'connection', title: 'Choose your provider and paste the API key', body: 'From the steps above — pick the model that matches your key\'s provider.' },
      { pin: 4, target: 'prompt', title: 'Write the system prompt', body: 'Tell the AI its role and rules, e.g. "You are a support assistant. Only answer from the FAQ below."' },
      { pin: 5, target: 'save', title: 'Save and test', body: 'The floating bar at the bottom has Save and a one-click Test.' },
    ],
    popoverFields: [
      { label: 'Connection', value: 'OpenAI (gpt-4o-mini)', icon: 'link' },
      { label: 'System prompt', value: 'You are a support assistant for a skincare brand…' },
      { label: 'Message', value: '{{customer.message}}', hint: 'Insert the incoming message from an earlier step' },
    ],
  },

  exampleFlow: {
    nodes: [
      { icon: 'trigger', color: '#0A0A0A', label: 'New message' },
      { icon: 'ai-agent', color: '#3730A3', label: 'AI Agent' },
      { icon: 'whatsapp', color: '#25D366', label: 'Reply' },
    ],
    caption: 'Every incoming message goes to the AI Agent first — it drafts a reply, and the flow sends it straight back on WhatsApp.',
  },

  templates: { fallbackWhenEmpty: 'recommended-workflows' },

  mistakes: [
    { text: 'Writing a vague system prompt — "be helpful" gives inconsistent answers; specific rules and examples give reliable ones.' },
    { text: 'Not setting a fallback message — if the AI genuinely can\'t answer, the flow should say so clearly instead of guessing.' },
    { text: 'Forgetting the API key is billed by the provider, not WorkflowMitra — check your provider\'s usage dashboard, not just WorkflowMitra\'s.' },
  ],

  faqs: [
    { q: 'Which provider should I pick?', a: 'Any of the five work the same way in WorkflowMitra — pick whichever you already have an account and billing set up with.' },
    { q: 'Can I switch providers later without rebuilding the flow?', a: 'Yes — the AI Agent node keeps your prompt and flow logic; you only need to update the connection and model.' },
    { q: 'Does the AI remember earlier messages in a conversation?', a: 'Only if you attach an AI Memory block to the same step — otherwise each run is treated independently.' },
    { q: 'Is my API key safe to store in WorkflowMitra?', a: 'Yes — it\'s encrypted in the credentials vault and never shown again after you save it.' },
  ],

  relatedOverride: undefined,

  seo: {
    metaTitle: 'AI Agent Integration — Add Claude, GPT, or Gemini to WorkflowMitra',
    metaDescription: 'Let an AI model answer, decide, or draft text inside a WorkflowMitra flow. Step-by-step: get a provider API key and configure the node.',
    ogImage: 'category',
  },

  schemaOverrides: undefined,
}
```

- [ ] **Step 4: Run the test again to verify it passes**

Run: `npm test -- src/data/integrationDocs/ai-agent.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/integrationDocs/ai-agent.js src/data/integrationDocs/ai-agent.test.js
git commit -m "feat(docs): add AI Agent integration content"
```

---

## Task 32: `shopify.js` content file

**Files:**
- Create: `src/data/integrationDocs/shopify.js`
- Test: `src/data/integrationDocs/shopify.test.js`

- [ ] **Step 1: Write the failing test**

```js
// src/data/integrationDocs/shopify.test.js
import { describe, it, expect } from 'vitest'
import shopify from './shopify'

describe('shopify.js content', () => {
  it('has matching slug and schemaVersion 1', () => {
    expect(shopify.slug).toBe('shopify')
    expect(shopify.schemaVersion).toBe(1)
  })

  it('only uses pin targets valid for ShopifyAdminScene', () => {
    const validTargets = ['install-app', 'token-field']
    shopify.credentialGuide.steps.filter((s) => s.target).forEach((s) => expect(validTargets).toContain(s.target))
  })

  it('has at least 3 use cases and 3 FAQs', () => {
    expect(shopify.useCases.length).toBeGreaterThanOrEqual(3)
    expect(shopify.faqs.length).toBeGreaterThanOrEqual(3)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/data/integrationDocs/shopify.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```js
// src/data/integrationDocs/shopify.js
export default {
  slug: 'shopify',
  schemaVersion: 1,
  publishedDate: '2026-08-03',
  lastUpdated: '2026-08-03',
  reviewDate: '2026-11-01',

  hero: {
    tagline: 'React to new orders, update products, and manage customers — the moment something happens in your store.',
    metaChips: [
      { icon: 'message', label: 'Commerce' },
      { icon: 'clock', label: '~5 min setup' },
      { icon: 'gauge', label: 'Beginner friendly' },
      { icon: 'key', label: 'Needs an Admin API access token' },
    ],
  },

  useCases: [
    { icon: 'bag', text: 'A high-value Cash-on-Delivery order over ₹1,500 triggers a WhatsApp confirmation asking the customer to reply YES before it ships.' },
    { icon: 'bell', text: 'A product\'s inventory drops below 5 units and the ops team gets pinged on Slack before it goes fully out of stock.' },
    { icon: 'calendar', text: 'Every order automatically appends a row to a Google Sheet, so the fulfilment report is always current without anyone updating it by hand.' },
    { icon: 'headset', text: 'A canceled order automatically notifies the shipping partner\'s API so a courier never gets booked for a sale that didn\'t happen.' },
  ],

  prerequisites: { youNeed: 'Admin access to your Shopify store', weNeed: 'One Admin API access token', cost: 'Free — Shopify doesn\'t charge extra for this' },

  credentialGuide: {
    anchorId: 'get-credential',
    sceneComponent: 'ShopifyAdminScene',
    steps: [
      { title: 'Open Settings → Apps and sales channels → Develop apps', body: 'In your Shopify admin.' },
      { title: 'Create an app and configure Admin API scopes', body: 'Choose exactly which data it can read/write — e.g. read_orders, write_products.' },
      { pin: 1, target: 'install-app', title: 'Install the app on your store', body: 'This activates the token.' },
      { pin: 2, target: 'token-field', title: 'Copy the Admin API access token', body: 'Shown once immediately after install — treat it like a password.' },
    ],
    resultFields: [{ label: 'Admin API access token', example: 'shpat_xxxxxxxxxxxxxxxxxxxx', copyable: true }],
  },

  workflowGuide: {
    anchorId: 'configure-node',
    nodeType: 'shopify',
    nodeColor: '#95BF47',
    steps: [
      { pin: 1, title: 'Add a Shopify step', body: 'As a trigger ("New order") or an action step, depending on what you\'re building.' },
      { pin: 2, target: 'node', title: 'Click the Shopify node', body: 'Opens its settings panel.' },
      { pin: 3, target: 'connection', title: 'Choose a connection', body: 'Pick a saved one, or paste the access token and store URL from the steps above.' },
      { pin: 4, target: 'operation', title: 'Pick what should happen', body: 'React to a new order, or read/update products, orders, and customers.' },
      { pin: 5, target: 'save', title: 'Save and test', body: 'The floating bar at the bottom has Save and a one-click Test.' },
    ],
    popoverFields: [
      { label: 'Connection', value: 'Main Store (Shopify)', icon: 'link' },
      { label: 'Operation', value: 'New order' },
      { label: 'Filter', value: 'Cash on Delivery only', hint: 'Optional — narrow which orders trigger the flow' },
    ],
  },

  exampleFlow: {
    nodes: [
      { icon: 'shopify', color: '#95BF47', label: 'New order' },
      { icon: 'tune', color: '#6B6B6B', label: 'Check COD + amount' },
      { icon: 'whatsapp', color: '#25D366', label: 'Confirm on WhatsApp' },
    ],
    caption: 'Every Cash-on-Delivery order over the threshold gets a WhatsApp confirmation request before it ships.',
  },

  templates: { fallbackWhenEmpty: 'recommended-workflows' },

  mistakes: [
    { text: 'Forgetting to grant the right Admin API scope — a missing read_orders or write_products scope fails silently until you check the app\'s permissions.' },
    { text: 'Losing the access token after the one-time reveal — if that happens, uninstall and reinstall the app to generate a new one.' },
    { text: 'Testing against a live store during setup — use a Shopify development store first if you\'re still configuring the flow.' },
  ],

  faqs: [
    { q: 'Do I need to be the store owner to do this?', a: 'You need Shopify admin access with permission to manage apps — not necessarily the store owner, but a staff account with that permission works.' },
    { q: 'Can I connect more than one Shopify store?', a: 'Yes — create a separate custom app (and token) per store, then add a separate connection for each in WorkflowMitra.' },
    { q: 'Does this cost anything extra on Shopify\'s side?', a: 'No — custom apps for your own store are free; Shopify only charges for apps you install from their App Store.' },
    { q: 'Is the access token safe to store in WorkflowMitra?', a: 'Yes — it\'s encrypted in the credentials vault and never shown again after you save it.' },
  ],

  relatedOverride: undefined,

  seo: {
    metaTitle: 'Shopify Integration — Connect Shopify to WorkflowMitra',
    metaDescription: 'React to Shopify orders and manage products or customers from a WorkflowMitra flow. Step-by-step: get your Admin API token and configure the node.',
    ogImage: 'category',
  },

  schemaOverrides: undefined,
}
```

- [ ] **Step 4: Run the test again to verify it passes**

Run: `npm test -- src/data/integrationDocs/shopify.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/integrationDocs/shopify.js src/data/integrationDocs/shopify.test.js
git commit -m "feat(docs): add Shopify integration content"
```

---

## Task 33: `IntegrationsHub` page + routes + Navigation/Footer links

**Files:**
- Create: `src/pages/docs/IntegrationsHub.jsx`
- Create: `src/pages/docs/IntegrationsHub.css`
- Test: `src/pages/docs/IntegrationsHub.test.jsx`
- Read first, then Modify: `src/App.jsx` (add `/docs` and `/docs/integrations` routes, both rendering `IntegrationsHub`, alongside the existing route list)
- Read first, then Modify: `src/components/Navigation.jsx` (add a "Docs" entry to the Resources dropdown and the mobile menu block — per the confirmed 3-places-to-update finding)
- Read first, then Modify: `src/components/Footer.jsx` (add a "Docs" link to the Resources column)

**Interfaces:**
- Consumes: `integrationRegistry` (Task 3), `searchIntegrations` (Task 6), `CATEGORIES`/`CATEGORY_LABELS` (Task 3), `getBrandIcon` (Task 9), `DocsLayout` (Task 23) rendered with no `sectionNav` (the Hub has no page-section nav — it IS the browsing page).
- Produces: the `/docs` and `/docs/integrations` route.

- [ ] **Step 1: Write the failing test**

```jsx
// src/pages/docs/IntegrationsHub.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { IntegrationsHub } from './IntegrationsHub'

describe('IntegrationsHub', () => {
  it('renders a card for every registry entry', () => {
    render(<MemoryRouter><IntegrationsHub /></MemoryRouter>)
    expect(screen.getByText('Slack')).toBeInTheDocument()
    expect(screen.getByText('Discord')).toBeInTheDocument()
  })

  it('marks live integrations as clickable links and coming-soon ones as not', () => {
    render(<MemoryRouter><IntegrationsHub /></MemoryRouter>)
    expect(screen.getByRole('link', { name: /slack/i })).toHaveAttribute('href', '/docs/integrations/slack')
    expect(screen.queryByRole('link', { name: /^discord/i })).not.toBeInTheDocument()
    expect(screen.getByText('Coming soon')).toBeInTheDocument()
  })

  it('filters the grid as the user types in search', async () => {
    render(<MemoryRouter><IntegrationsHub /></MemoryRouter>)
    const inputs = screen.getAllByRole('textbox')
    await userEvent.type(inputs[inputs.length - 1], 'telegram')
    expect(screen.getByText('Telegram')).toBeInTheDocument()
    expect(screen.queryByText('Google Sheets')).not.toBeInTheDocument()
  })

  it('filters the grid by category chip', async () => {
    render(<MemoryRouter><IntegrationsHub /></MemoryRouter>)
    await userEvent.click(screen.getByRole('button', { name: 'AI' }))
    expect(screen.getByText('AI Agent')).toBeInTheDocument()
    expect(screen.queryByText('Slack')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/pages/docs/IntegrationsHub.test.jsx`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```jsx
// src/pages/docs/IntegrationsHub.jsx
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DocsLayout } from '../../components/docs/DocsLayout'
import { getBrandIcon } from '../../utils/brandIcons'
import { searchIntegrations } from '../../utils/docs/searchIntegrations'
import { CATEGORIES, CATEGORY_LABELS } from '../../data/categories'
import integrationRegistry from '../../data/integrationRegistry'
import './IntegrationsHub.css'

export function IntegrationsHub() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)

  const filtered = useMemo(() => {
    let list = searchIntegrations(query, integrationRegistry)
    if (activeCategory) list = list.filter((e) => e.category === activeCategory)
    return list
  }, [query, activeCategory])

  return (
    <DocsLayout>
      <div className="hub">
        <p className="hub__eyebrow">Docs</p>
        <h1>Connect your apps to WorkflowMitra</h1>
        <p className="hub__sub">Step-by-step guides for every app you can plug into a flow — what it's for, how to get the key it needs, and how to set it up on the canvas.</p>

        <input
          className="hub__search"
          type="text"
          placeholder="Search apps (e.g. Slack, Google Sheets)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="hub__chips">
          <button type="button" className={activeCategory === null ? 'active' : ''} onClick={() => setActiveCategory(null)}>All</button>
          {CATEGORIES.map((c) => (
            <button key={c} type="button" className={activeCategory === c ? 'active' : ''} onClick={() => setActiveCategory(c)}>
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>

        <div className="hub__grid">
          {filtered.map((entry) =>
            entry.status === 'live' ? (
              <Link key={entry.slug} to={`/docs/integrations/${entry.slug}`} className="hub__card">
                <span className="hub__status hub__status--live">Live guide</span>
                <span className="hub__tile">{getBrandIcon(entry.slug, { size: 22 })}</span>
                <h3>{entry.title}</h3>
                <p>{entry.shortDescription}</p>
              </Link>
            ) : (
              <div key={entry.slug} className="hub__card hub__card--dim">
                <span className="hub__status">Coming soon</span>
                <span className="hub__tile">{getBrandIcon(entry.slug, { size: 22 })}</span>
                <h3>{entry.title}</h3>
                <p>{entry.shortDescription}</p>
              </div>
            )
          )}
        </div>
      </div>
    </DocsLayout>
  )
}
```

- [ ] **Step 4: Add the CSS**

```css
/* src/pages/docs/IntegrationsHub.css */
.hub { max-width: 1080px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }
.hub__eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--wm-orange); margin-bottom: 0.9rem; }
.hub h1 { font-size: clamp(1.9rem, 3.2vw, 2.6rem); font-weight: 650; letter-spacing: -0.01em; }
.hub__sub { color: var(--wm-ink-light); font-size: 1.02rem; margin-top: 0.8rem; max-width: 54ch; }
.hub__search { display: block; margin: 1.6rem 0 1.2rem; max-width: 420px; width: 100%; padding: 0.65rem 0.9rem; border-radius: 10px; border: 1px solid var(--wm-border); font-size: 0.9rem; }
.hub__chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; }
.hub__chips button { font: inherit; font-size: 0.78rem; padding: 0.35rem 0.8rem; border-radius: 999px; border: 1px solid var(--wm-border); background: #fff; color: var(--wm-ink-light); cursor: pointer; }
.hub__chips button.active { background: var(--wm-ink); color: #fff; border-color: var(--wm-ink); }
.hub__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 1rem; }
.hub__card { border: 1px solid var(--wm-border); border-radius: 14px; padding: 1.1rem; display: flex; flex-direction: column; gap: 0.6rem; background: #fff; position: relative; text-decoration: none; color: var(--wm-ink); }
.hub__card--dim { opacity: 0.55; }
.hub__tile { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: var(--wm-bg-tile); }
.hub__card h3 { font-size: 0.98rem; font-weight: 650; }
.hub__card p { font-size: 0.82rem; color: var(--wm-ink-light); margin: 0; }
.hub__status { position: absolute; top: 1rem; right: 1rem; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; padding: 0.15rem 0.5rem; border-radius: 999px; background: var(--wm-border); color: var(--wm-ink-light); }
.hub__status--live { background: #E6F5F3; color: var(--wm-track-cred); }
```

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npm test -- src/pages/docs/IntegrationsHub.test.jsx`
Expected: PASS

- [ ] **Step 6: Read `src/App.jsx` in full, then add the Hub routes**

Inside the existing `<Routes>` element (within the `App()` function), add two routes rendering the same `IntegrationsHub`, placed near the existing `/templates`/`/integrations` routes for readability:

```jsx
<Route path="/docs" element={<IntegrationsHub />} />
<Route path="/docs/integrations" element={<IntegrationsHub />} />
```

And add the import near the other page imports at the top of the file:
```jsx
import IntegrationsHub from './pages/docs/IntegrationsHub'
```
(If `IntegrationsHub.jsx` exports it as a named export per Step 3 above, either add a default export alongside the named one, or adjust this import to `import { IntegrationsHub } from './pages/docs/IntegrationsHub'` — match whatever import style the rest of `App.jsx`'s existing page imports already use.)

- [ ] **Step 7: Read `src/components/Navigation.jsx` in full, then add a Docs entry**

Find the "Resources" dropdown `<li>` (contains the existing `Templates` and `Integrations` links) and add a `Docs` item in the same list, linking to `/docs`. Find the mobile menu's link block (a separate `<Link>` list rendered for small screens) and add the same `Docs` link there too — per the confirmed finding, this file needs the same addition in both places since they're two separate JSX blocks, not one shared list.

- [ ] **Step 8: Read `src/components/Footer.jsx` in full, then add a Docs link**

Find the "Resources" column and add a `Docs` link pointing to `/docs`, alongside the existing links in that column.

- [ ] **Step 9: Run the full test suite to check nothing else broke**

Run: `npm test`
Expected: PASS (all tests, including any pre-existing ones for `Navigation`/`Footer`/`App` if they exist)

- [ ] **Step 10: Commit**

```bash
git add src/pages/docs/IntegrationsHub.jsx src/pages/docs/IntegrationsHub.css src/pages/docs/IntegrationsHub.test.jsx src/App.jsx src/components/Navigation.jsx src/components/Footer.jsx
git commit -m "feat(docs): add IntegrationsHub page, /docs routes, and nav/footer links"
```

---

## Task 34: Content index + `IntegrationDocPage` route wrapper + route

**Files:**
- Create: `src/data/integrationDocs/index.js`
- Create: `src/pages/docs/IntegrationDocPage.jsx`
- Create: `src/pages/docs/NotFound404.jsx` (only if the site doesn't already have one — see Step 1)
- Test: `src/pages/docs/IntegrationDocPage.test.jsx`
- Read first, then Modify: `src/App.jsx` (add the `/docs/integrations/:slug` route)

**Interfaces:**
- Consumes: `integrationRegistry` (Task 3), `integrationDocs/index.js`'s slug→config map (this task), `IntegrationDocTemplate` (Task 24), `templateFlows` from `src/data/TemplateFlowData.js`, the alias map + template metadata established in Task 5 (defined once here, not re-derived per page).
- Produces: the `/docs/integrations/:slug` route, rendering a 404 for any slug that is missing from the registry OR whose registry `status` isn't `'live'` (a `coming-soon` slug has no content file to render).

- [ ] **Step 1: Check whether the site already has a 404/not-found page**

Run: `grep -ri "404\|notfound" src/App.jsx src/pages/*.jsx`. If an existing not-found component/route is found, reuse it in Step 4 below instead of creating `NotFound404.jsx`, and skip creating that file.

- [ ] **Step 2: Write the failing test**

```jsx
// src/pages/docs/IntegrationDocPage.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { IntegrationDocPage } from './IntegrationDocPage'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes><Route path="/docs/integrations/:slug" element={<IntegrationDocPage />} /></Routes>
    </MemoryRouter>
  )
}

describe('IntegrationDocPage', () => {
  it('renders the matching integration for a live slug', () => {
    renderAt('/docs/integrations/slack')
    expect(screen.getByRole('heading', { level: 1, name: 'Slack' })).toBeInTheDocument()
  })

  it('renders a not-found state for an unknown slug', () => {
    renderAt('/docs/integrations/not-a-real-app')
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument()
    expect(screen.getByText(/couldn.t find that/i)).toBeInTheDocument()
  })

  it('renders a not-found state for a real but coming-soon slug (no content file yet)', () => {
    renderAt('/docs/integrations/discord')
    expect(screen.getByText(/couldn.t find that/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm test -- src/pages/docs/IntegrationDocPage.test.jsx`
Expected: FAIL — module doesn't exist.

- [ ] **Step 4: Create the content index**

```js
// src/data/integrationDocs/index.js
// Maps slug -> content config, for every phase-1 flagship page. Only
// integrationRegistry entries with status: 'live' have an entry here —
// see spec "Architecture: registry + content split."
import slack from './slack'
import telegram from './telegram'
import whatsapp from './whatsapp'
import gmail from './gmail'
import googleSheets from './google-sheets'
import httpRequest from './http-request'
import aiAgent from './ai-agent'
import shopify from './shopify'

const integrationDocs = {
  slack,
  telegram,
  whatsapp,
  gmail,
  'google-sheets': googleSheets,
  'http-request': httpRequest,
  'ai-agent': aiAgent,
  shopify,
}

export default integrationDocs
```

- [ ] **Step 5: Implement `IntegrationDocPage`**

```jsx
// src/pages/docs/IntegrationDocPage.jsx
import { useParams } from 'react-router-dom'
import integrationRegistry from '../../data/integrationRegistry'
import integrationDocs from '../../data/integrationDocs'
import { IntegrationDocTemplate } from '../../components/docs/IntegrationDocTemplate'
import { DocsLayout } from '../../components/docs/DocsLayout'
import { templateFlows } from '../../data/TemplateFlowData'

// See Task 5 Step 1 — fill this in from whatever TemplateDetail.jsx's/
// Templates.jsx's real metadata array turns out to be keyed as, and set
// TEMPLATE_ALIAS_MAP from the real informal `app` keys used across
// TemplateFlowData.js (a handful were confirmed directly: sheets, zoho,
// truck — grep the full file for any others before shipping this).
const TEMPLATE_ALIAS_MAP = { sheets: 'google-sheets', zoho: 'zoho-books', truck: 'shiprocket' }
const TEMPLATE_METADATA_BY_ID = {} // populate from the real title/id source located in Task 5 Step 1

export function IntegrationDocPage() {
  const { slug } = useParams()
  const registryEntry = integrationRegistry.find((e) => e.slug === slug)
  const config = integrationDocs[slug]

  if (!registryEntry || registryEntry.status !== 'live' || !config) {
    return (
      <DocsLayout>
        <div style={{ padding: '4rem 0', textAlign: 'center' }}>
          <h1>We couldn't find that integration</h1>
          <p>It may not be published yet — check the <a href="/docs/integrations">full list of integrations</a>.</p>
        </div>
      </DocsLayout>
    )
  }

  return (
    <IntegrationDocTemplate
      config={config}
      registryEntry={registryEntry}
      registry={integrationRegistry}
      templateFlows={templateFlows}
      aliasMap={TEMPLATE_ALIAS_MAP}
      templateMetadataById={TEMPLATE_METADATA_BY_ID}
    />
  )
}
```

- [ ] **Step 6: Run the test again to verify it passes**

Run: `npm test -- src/pages/docs/IntegrationDocPage.test.jsx`
Expected: PASS

- [ ] **Step 7: Read `src/App.jsx` again, add the detail route**

```jsx
<Route path="/docs/integrations/:slug" element={<IntegrationDocPage />} />
```
placed after the `/docs/integrations` route added in Task 33 (react-router-dom v6 matches by specificity, but keeping the more specific dynamic route visually grouped with its parent aids readability), plus the corresponding import:
```jsx
import IntegrationDocPage from './pages/docs/IntegrationDocPage'
```
(again matching whichever default/named export convention Step 5 above ends up using and the rest of `App.jsx` expects).

- [ ] **Step 8: Manually verify in the browser**

Run: `npm run dev`, then visit `/docs`, click into Slack, and confirm the full page (hero through the browse-all banner) renders with no console errors. Click "Browse all integrations" and confirm it returns to the Hub. This is the first point in the plan where the whole page assembly can be seen end-to-end — worth actually looking at, not just trusting the component tests.

- [ ] **Step 9: Commit**

```bash
git add src/data/integrationDocs/index.js src/pages/docs/IntegrationDocPage.jsx src/pages/docs/IntegrationDocPage.test.jsx src/App.jsx
git commit -m "feat(docs): add IntegrationDocPage route with content index and not-found state"
```

---

## Task 35: Cross-link `TemplateDetail.jsx` and `IntegrationStrip.jsx` into the docs

**Files:**
- Read first, then Modify: `src/pages/TemplateDetail.jsx`
- Read first, then Modify: `src/components/IntegrationStrip.jsx`
- Test: `src/utils/docs/appLinkable.test.js`
- Create: `src/utils/docs/appLinkable.js`

**Interfaces:**
- Produces: `export function docsPathForApp(appKeyOrSlug, { registry, aliasMap })` → `string | null` (a `/docs/integrations/:slug` path if that app has a live doc page, else `null` so the caller can render plain text instead of a dead link).

- [ ] **Step 1: Write the failing test**

```js
// src/utils/docs/appLinkable.test.js
import { describe, it, expect } from 'vitest'
import { docsPathForApp } from './appLinkable'

const registry = [
  { slug: 'slack', status: 'live' },
  { slug: 'discord', status: 'coming-soon' },
]
const aliasMap = { sheets: 'google-sheets' }

describe('docsPathForApp', () => {
  it('returns the docs path for a live, canonical slug', () => {
    expect(docsPathForApp('slack', { registry, aliasMap })).toBe('/docs/integrations/slack')
  })

  it('resolves an aliased app key first', () => {
    expect(docsPathForApp('sheets', { registry: [{ slug: 'google-sheets', status: 'live' }], aliasMap })).toBe('/docs/integrations/google-sheets')
  })

  it('returns null for a coming-soon app (no page to link to yet)', () => {
    expect(docsPathForApp('discord', { registry, aliasMap })).toBeNull()
  })

  it('returns null for an app key with no registry match at all', () => {
    expect(docsPathForApp('webhook', { registry, aliasMap })).toBeNull()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/utils/docs/appLinkable.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```js
// src/utils/docs/appLinkable.js
export function docsPathForApp(appKeyOrSlug, { registry, aliasMap }) {
  const slug = aliasMap[appKeyOrSlug] || appKeyOrSlug
  const entry = registry.find((e) => e.slug === slug)
  return entry && entry.status === 'live' ? `/docs/integrations/${slug}` : null
}
```

- [ ] **Step 4: Run the test again to verify it passes**

Run: `npm test -- src/utils/docs/appLinkable.test.js`
Expected: PASS

- [ ] **Step 5: Read `src/pages/TemplateDetail.jsx` in full, then wrap its app icons/names in a conditional `Link`**

Find where a template's `apps` (or equivalent) list is rendered. For each app, call `docsPathForApp(app, { registry: integrationRegistry, aliasMap: TEMPLATE_ALIAS_MAP })` (import `integrationRegistry` from `../data/integrationRegistry`; reuse the same `TEMPLATE_ALIAS_MAP` shape defined in Task 34 — if it's only defined locally there, duplicate the same three entries here rather than importing across page files, and note both copies must be kept in sync if a new alias is ever added). If it returns a path, wrap the existing app icon/label in `<Link to={path}>…</Link>` (react-router-dom is already imported in this file); if it returns `null`, render the icon/label exactly as before, unchanged.

- [ ] **Step 6: Read `src/components/IntegrationStrip.jsx` in full, then apply the same conditional-link treatment**

Same pattern as Step 5 — wrap each integration icon in a `Link` only when `docsPathForApp` returns a non-null path, otherwise leave it as plain, unlinked content exactly as it renders today.

- [ ] **Step 7: Manually verify**

Run `npm run dev`, open a template detail page and a `/solutions/*` page, and confirm the Slack/WhatsApp/etc. icons that have live docs are now clickable links to the right `/docs/integrations/:slug` page, while apps without a live page (e.g. HubSpot) render exactly as before — unlinked, no visual change, no broken href.

- [ ] **Step 8: Commit**

```bash
git add src/utils/docs/appLinkable.js src/utils/docs/appLinkable.test.js src/pages/TemplateDetail.jsx src/components/IntegrationStrip.jsx
git commit -m "feat(docs): link template and solution-page app icons to their docs pages"
```

---

## Task 36: Sitemap generation + `robots.txt` + `prebuild` wiring

**Files:**
- Create: `scripts/buildSitemapXml.mjs` (pure, testable logic)
- Create: `scripts/generate-sitemap.mjs` (thin I/O wrapper)
- Create: `public/robots.txt`
- Modify: `package.json` (add `"prebuild"` script)
- Test: `scripts/buildSitemapXml.test.mjs`

**Interfaces:**
- Produces: `export function buildSitemapXml(registry, staticRoutes, siteOrigin)` → XML string, tested directly; `generate-sitemap.mjs` calls it and writes `public/sitemap.xml`, run automatically before every build.

- [ ] **Step 1: Write the failing test**

```js
// scripts/buildSitemapXml.test.mjs
import { describe, it, expect } from 'vitest'
import { buildSitemapXml } from './buildSitemapXml.mjs'

const registry = [
  { slug: 'slack', status: 'live' },
  { slug: 'discord', status: 'coming-soon' },
]
const staticRoutes = ['/', '/pricing', '/docs/integrations']

describe('buildSitemapXml', () => {
  it('includes every static route', () => {
    const xml = buildSitemapXml(registry, staticRoutes, 'https://workflowmitra.com')
    staticRoutes.forEach((r) => expect(xml).toContain(`<loc>https://workflowmitra.com${r}</loc>`))
  })

  it('includes a URL for live registry entries', () => {
    const xml = buildSitemapXml(registry, staticRoutes, 'https://workflowmitra.com')
    expect(xml).toContain('<loc>https://workflowmitra.com/docs/integrations/slack</loc>')
  })

  it('excludes coming-soon registry entries — they have no real page yet', () => {
    const xml = buildSitemapXml(registry, staticRoutes, 'https://workflowmitra.com')
    expect(xml).not.toContain('/docs/integrations/discord')
  })

  it('produces valid, well-formed XML with the correct root element', () => {
    const xml = buildSitemapXml(registry, staticRoutes, 'https://workflowmitra.com')
    expect(xml).toMatch(/^<\?xml version="1.0" encoding="UTF-8"\?>/)
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(xml).toContain('</urlset>')
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run scripts/buildSitemapXml.test.mjs`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement the pure builder**

```js
// scripts/buildSitemapXml.mjs
export function buildSitemapXml(registry, staticRoutes, siteOrigin) {
  const liveIntegrationRoutes = registry.filter((e) => e.status === 'live').map((e) => `/docs/integrations/${e.slug}`)
  const allRoutes = [...staticRoutes, ...liveIntegrationRoutes]

  const urls = allRoutes.map((route) => `  <url><loc>${siteOrigin}${route}</loc></url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}
```

- [ ] **Step 4: Run the test again to verify it passes**

Run: `npx vitest run scripts/buildSitemapXml.test.mjs`
Expected: PASS

- [ ] **Step 5: Write the thin I/O wrapper script**

```js
// scripts/generate-sitemap.mjs
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import integrationRegistry from '../src/data/integrationRegistry.js'
import { buildSitemapXml } from './buildSitemapXml.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_ORIGIN = 'https://workflowmitra.com'

// Existing top-level marketing routes — extend this list if new
// top-level pages are added; it intentionally does NOT try to
// auto-discover routes from App.jsx to keep this script simple and
// dependency-free.
const STATIC_ROUTES = ['/', '/pricing', '/apps', '/integrations', '/templates', '/solutions', '/about', '/contact', '/docs', '/docs/integrations']

const xml = buildSitemapXml(integrationRegistry, STATIC_ROUTES, SITE_ORIGIN)
writeFileSync(join(__dirname, '../public/sitemap.xml'), xml)
console.log(`sitemap.xml written with ${STATIC_ROUTES.length + integrationRegistry.filter((e) => e.status === 'live').length} URLs`)
```

- [ ] **Step 6: Add `robots.txt`**

```
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://workflowmitra.com/sitemap.xml
```

- [ ] **Step 7: Wire the `prebuild` script**

In `package.json`, inside `"scripts"`, add:
```json
"prebuild": "node scripts/generate-sitemap.mjs"
```
(npm runs `prebuild` automatically before `build` — no change needed to the existing `"build": "vite build"` script itself.)

- [ ] **Step 8: Run it once manually to verify the file is produced correctly**

Run: `node scripts/generate-sitemap.mjs && cat public/sitemap.xml`
Expected: valid XML listing the static routes plus exactly the 8 live integration slugs (not the 30 coming-soon ones).

- [ ] **Step 9: Commit**

```bash
git add scripts/buildSitemapXml.mjs scripts/buildSitemapXml.test.mjs scripts/generate-sitemap.mjs public/robots.txt public/sitemap.xml package.json
git commit -m "feat(docs): add sitemap generation, robots.txt, and prebuild wiring"
```

---

## Task 37: `workflow` repo — "View docs" link in `NodeConfigPopover`

This is the one task in a different repository (`workflow`, not `workflowmitra_website`) and a separate commit history — do it last, once the docs URLs it links to actually exist and are live.

**Files:**
- Create: `apps/web/src/features/workflows/nodeDocsSlugs.js`
- Read first, then Modify: `apps/web/src/features/workflows/NodeConfigPopover.jsx`
- Test: `apps/web/src/features/workflows/nodeDocsSlugs.test.js`

**Interfaces:**
- Produces: `export function docsUrlForNode(nodeType, provider)` → full URL string or `null` (for node types with no phase-1 docs page yet), consumed by the popover's header.

- [ ] **Step 1: Write the failing test**

```js
// apps/web/src/features/workflows/nodeDocsSlugs.test.js
import { describe, it, expect } from 'vitest'
import { docsUrlForNode } from './nodeDocsSlugs'

describe('docsUrlForNode', () => {
  it('resolves a direct node-type match to its docs URL with the configure-node anchor', () => {
    expect(docsUrlForNode('slack')).toBe('https://workflowmitra.com/docs/integrations/slack#configure-node')
  })

  it('resolves whatsapp only for the meta provider (the one phase-1 wrote docs for)', () => {
    expect(docsUrlForNode('whatsapp', 'meta')).toBe('https://workflowmitra.com/docs/integrations/whatsapp#configure-node')
  })

  it('returns null for a whatsapp provider phase-1 has no docs for', () => {
    expect(docsUrlForNode('whatsapp', 'aisensy')).toBeNull()
  })

  it('returns null for a node type with no live docs page yet', () => {
    expect(docsUrlForNode('discord')).toBeNull()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/features/workflows/nodeDocsSlugs.test.js` (from `apps/web/`)
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement**

```js
// apps/web/src/features/workflows/nodeDocsSlugs.js
// Maps a live node `type` (+ `provider`, for parameterized nodes like
// WhatsApp) to its workflowmitra_website docs slug. Only the 8 phase-1
// flagship pages resolve to a real URL; everything else returns null so
// the popover simply omits the help icon rather than link to a 404.
const DOCS_SLUGS = {
  slack: 'slack',
  telegram: 'telegram',
  gmail: 'gmail',
  'google-sheets': 'google-sheets',
  'http-request': 'http-request',
  ai: 'ai-agent',
  'ai-agent': 'ai-agent',
  'app-request:shopify': 'shopify',
  'whatsapp:meta': 'whatsapp',
}

const SITE_ORIGIN = 'https://workflowmitra.com'

export function docsUrlForNode(nodeType, provider) {
  const key = provider ? `${nodeType}:${provider}` : nodeType
  const slug = DOCS_SLUGS[key] || DOCS_SLUGS[nodeType]
  return slug ? `${SITE_ORIGIN}/docs/integrations/${slug}#configure-node` : null
}
```

- [ ] **Step 4: Run the test again to verify it passes**

Run: `npm test -- src/features/workflows/nodeDocsSlugs.test.js` (from `apps/web/`)
Expected: PASS

- [ ] **Step 5: Read `NodeConfigPopover.jsx` in full, then add the help icon**

Locate the header row described in the design spec's research (a `GripVertical` drag handle, a 32px `rounded-lg` tile showing the node's colored icon, the node label + uppercase type beneath it, then a close `X` button — separated from the body by `border-b border-gray-100`). Import `docsUrlForNode` and a help icon from `lucide-react` (already a dependency here — `HelpCircle`), and insert a small icon-button between the label block and the close `X`, rendering only when `docsUrlForNode` returns a non-null URL:

```jsx
{docsUrl && (
  <a
    href={docsUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="text-secondary hover:opacity-75"
    title="View docs"
  >
    <HelpCircle size={16} />
  </a>
)}
```

where `docsUrl` is computed once near the top of the component body as `const docsUrl = docsUrlForNode(node.type, node.data?.config?.provider)` (adjust the exact `node`/`config` property path to match whatever this component's real props/state are actually called — confirm from the file read in this step, don't guess if it differs).

- [ ] **Step 6: Manually verify**

Run `npm run dev` (from `apps/web/`), open a flow, add a Slack node, click it to open the popover, and confirm the help icon appears and opens `https://workflowmitra.com/docs/integrations/slack#configure-node` in a new tab. Add a Discord node and confirm the popover renders identically to before (no broken icon, no `null` href) since Discord has no phase-1 docs page.

- [ ] **Step 7: Commit** (in the `workflow` repo)

```bash
git add apps/web/src/features/workflows/nodeDocsSlugs.js apps/web/src/features/workflows/nodeDocsSlugs.test.js apps/web/src/features/workflows/NodeConfigPopover.jsx
git commit -m "feat: add in-editor docs link to NodeConfigPopover"
```

---

## Self-Review

**Spec coverage** — every locked section of `docs/superpowers/specs/2026-08-03-integrations-documentation-design.md` maps to a task: registry/content split → Task 3; locked schema → Tasks 1 note + 25–32; category taxonomy → Task 3; screenshot strategy + scene mapping table → Tasks 11–19; deep-link anchor contract → Tasks 24/37; page template's 11 sections → Tasks 20–24; related-integrations algorithm → Task 4; templates fallback → Task 5; search → Task 6; cross-page linking table → Tasks 33–35; cross-repo change → Task 37; visual design/icon system → Tasks 2, 9, 10; SEO/AEO/GEO → Tasks 7, 8, 22; sitemap → Task 36; accessibility → addressed inline via native elements (`<details>`, real `<button>`/`<a>`) across Tasks 11–24, no dedicated task needed since there's no separate accessibility layer to build; copy-credential helper → Task 13; maintenance runbook → captured as the registry+content-file pattern itself (Tasks 3/25–32 ARE the runbook in executable form).

**Placeholder scan** — no "TBD"/"handle edge cases"/"similar to Task N" language anywhere; every code block is complete, runnable code; every "Read first" instruction gives the engineer a specific, bounded thing to confirm (never "figure it out"), with a concrete fallback documented in the same step.

**Type/interface consistency, fixed during this pass** — three real wiring bugs were caught and corrected while writing Tasks 24–34 (not just described, actually fixed in place): `ExampleFlowDiagram` now resolves generic (trigger/logic) icons separately from brand icons instead of routing everything through `getBrandIcon`; `IntegrationDocTemplate`'s pin-wiring now passes each step's semantic `target` string instead of its numeric `pin`, and no longer force-targets every workflow step at `'node'`; `credentialGuide.sceneProps` is now actually forwarded to scene components that need extra props (`GoogleCloudConsoleScene`'s `tab`). The content-file task-shape note (before Task 25) and the per-scene `target` table it contains are the single source of truth every one of Tasks 25–32 was written against — spot-checked against each scene's own `pinFor`/prop contract from Tasks 14–19, no mismatches found.
