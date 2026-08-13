# Integrations Documentation Section — Design Spec

Date: 2026-08-03 (rev. 2 — schema, registry, and system-level decisions locked per review)
Status: Approved by user, pending user review of this revision
Repos touched: `workflowmitra_website` (primary), `workflow` (one small addition)
Mockup reviewed: https://claude.ai/code/artifact/06c2f964-3f2b-4b64-a3f0-d91524b2d505 (Shell A / "Native Console" is the chosen direction)

## Summary

Add a beginner-friendly documentation section to the WorkflowMitra marketing site: one page per integration/app, explaining what it's for, real business use cases, how to get the credential it needs (with an annotated recreation of the real third-party dashboard), and how to configure it inside a flow (with an annotated recreation of the real WorkflowMitra editor). Content is written for non-technical beginners, in plain language, and structured for SEO/AEO/GEO (schema markup, clean headings, direct answers).

Rev. 2 locks every open decision flagged in review: the content schema, a two-tier registry/content architecture, the screenshot-recreation strategy, search, category taxonomy, the related-integrations algorithm, the templates-fallback behavior, full SEO metadata, sitemap generation, versioning, image handling, accessibility, deep-link anchors, copy helpers, and a maintenance runbook. Nothing below is deferred to "figure out during implementation."

## Scope — Phase 1

The workflow engine supports 36 node types plus provider sub-catalogs (6 WhatsApp BSPs, 12 App Request apps, 10 meeting providers, 5 AI brains) — 50+ potential integration pages in total. Phase 1 builds the shared architecture once, then fully writes **8 flagship pages**, chosen for the widest spread of credential patterns in the fewest pages:

| Integration | Credential pattern it teaches |
|---|---|
| Slack | Webhook URL (paste one secret string) |
| Telegram | Bot token (from BotFather) |
| WhatsApp (Meta) | Access token + phone number ID (multi-field) |
| Gmail | Google OAuth (third-party sign-in flow) |
| Google Sheets | Google service account (JSON key file) |
| HTTP Request | Configurable auth (none / bearer / basic / API key / OAuth2) — the generic teaching case |
| AI Agent | Provider API key (Claude/OpenAI/Groq/Gemini/Ollama — pick-a-provider pattern) |
| Shopify | Access token via the App Request credential type |

The remaining ~45 integrations are **not** written in phase 1 — they exist only as lightweight registry entries (see below) so they can appear in the Hub as "Coming soon," be searched, and be counted, without full content.

## Architecture: registry + content split

This is the foundational decision everything else in this spec depends on, per review feedback to create "a central registry instead of scanning files."

**`src/data/integrationRegistry.js`** — one lightweight entry for **every** integration (all 50+), the single source of truth the Hub, search, sitemap, category filters, and the related-integrations algorithm all read from:

```js
export default [
  {
    slug: 'slack',
    title: 'Slack',
    shortDescription: 'Post a message to a Slack channel from any flow.',
    category: 'MESSAGING',        // one of the locked categories below
    credentialType: 'slack',      // matches the workflow repo's credential-types.ts `type`
    icon: 'slack',                // key into the shared brand-icon set
    status: 'live',               // 'live' | 'coming-soon'
  },
  {
    slug: 'discord',
    title: 'Discord',
    shortDescription: 'Post to a Discord server channel via webhook.',
    category: 'MESSAGING',
    credentialType: 'discord',
    icon: 'discord',
    status: 'coming-soon',
  },
  // …one entry per node type / provider, ~50+ total
]
```

**`src/data/integrationDocs/<slug>.js`** — the full content object, **only for `status: 'live'` entries** (8 files in phase 1). Never hand-duplicates anything already in the registry (slug/title/category/icon are looked up, not repeated).

This split exists specifically so "coming soon" entries cost one array row each, not a placeholder content file — and so every consumer (Hub, search, sitemap, related-picker) reads one array instead of scanning the filesystem or importing 50 files.

## Locked content schema

```js
// src/data/integrationDocs/slack.js
export default {
  slug: 'slack',                    // must match the registry entry
  schemaVersion: 1,                 // bump only if THIS SHAPE changes — lets a future codemod find old configs

  // freshness — distinct concerns, tracked separately
  publishedDate: '2026-08-03',      // first went live — feeds article:published_time
  lastUpdated: '2026-08-03',        // bump whenever content changes — feeds article:modified_time
  reviewDate: '2026-11-01',         // next scheduled manual re-check against the real Slack/editor UI (~90 days out)

  hero: {
    tagline: 'Send a message to any Slack channel the moment something happens in a flow.',
    metaChips: [
      { icon: 'message', label: 'Messaging' },
      { icon: 'clock', label: '~5 min setup' },
      { icon: 'gauge', label: 'Beginner friendly', tone: 'success' },
      { icon: 'key', label: 'Needs a Webhook URL' },
    ],
  },

  // parallel scenarios, not a sequence — icon-tagged, not numbered
  useCases: [
    { icon: 'bag', text: 'A D2C skincare brand posts to #cod-verification the instant a COD Shopify order over ₹1,500 comes in.' },
    { icon: 'headset', text: 'When a WhatsApp customer types "talk to a person," the flow pings #support-escalations inside the 15-minute SLA.' },
    { icon: 'bell', text: 'If a broadcast campaign’s failure rate crosses 10%, #campaign-ops gets an alert immediately.' },
    { icon: 'calendar', text: 'Every evening at 7 PM, one line lands in #daily-numbers: leads, conversion rate, credits left.' },
  ],

  prerequisites: {
    youNeed: 'A Slack workspace you can install an app in',
    weNeed: 'One Webhook URL',
    cost: 'Free',
  },

  // Track ① — anchorId is FIXED across every integration page (see deep-link contract below)
  credentialGuide: {
    anchorId: 'get-credential',
    sceneComponent: 'SlackWebhookScene',   // which shared "real dashboard" scene renders this — see Screenshot strategy
    steps: [
      { pin: 1, title: 'Turn the toggle on', body: 'This tells Slack you’re ready to receive messages from an outside app.' },
      { pin: 2, title: 'Click "Add New Webhook to Workspace"', body: 'Slack will ask which channel should receive the messages.' },
      { pin: 3, title: 'Pick a channel', body: 'e.g. #cod-verification — and click Allow.' },
      { pin: 4, title: 'Copy the Webhook URL', body: 'Starts with hooks.slack.com/services/… — treat it like a password.' },
    ],
    resultFields: [
      { label: 'Webhook URL', example: 'hooks.slack.com/services/T0N9F/B0A5K/xxxxxxxxxxxxxxxx', copyable: true },
    ],
  },

  // Track ② — anchorId is FIXED across every integration page
  workflowGuide: {
    anchorId: 'configure-node',
    nodeType: 'slack',              // matches the workflow repo's node registry `type`
    nodeColor: '#4A154B',
    steps: [
      { pin: 1, title: 'Add a Slack step', body: 'Right after the step that should trigger it.' },
      { pin: 2, title: 'Click the Slack node', body: 'Opens its settings panel.' },
      { pin: 3, title: 'Choose a connection', body: 'Pick a saved one, or paste a fresh Webhook URL.' },
      { pin: 4, title: 'Write your message', body: 'Insert variables like order number or customer name.' },
      { pin: 5, title: 'Save and test', body: 'The floating bar at the bottom has Save and a one-click Test.' },
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

  templates: {
    // populated at render time by querying TemplateFlowData.js for templates whose `apps` include this slug
    // — never hand-authored here. See "Templates that use this" fallback behaviour below.
    fallbackWhenEmpty: 'recommended-workflows',
  },

  mistakes: [
    { text: 'Pasting the webhook URL with a stray space — it fails silently.' },
    { text: 'Picking a private channel without inviting the app to it first.' },
    { text: 'Leaving {{ }} placeholders in the message when the earlier step never ran.' },
  ],

  faqs: [
    { q: 'Do I need to be a Slack admin?', a: 'No — any member can create an app and add a webhook for a channel they’re in, unless your workspace restricts app installs.' },
    { q: 'Can one webhook post to multiple channels?', a: 'No. One webhook is tied to one channel — add a second webhook and a second Slack step.' },
    { q: 'Is the Webhook URL safe to share?', a: 'Treat it like a password. WorkflowMitra stores it encrypted and never shows the full value again after you save it.' },
  ],

  // optional — see the Related-integrations algorithm; omit to use the computed default
  relatedOverride: undefined,       // e.g. ['discord', 'telegram'] to pin specific slugs

  seo: {
    metaTitle: 'Slack Integration — Connect Slack to WorkflowMitra',
    metaDescription: 'Send Slack messages automatically from a WorkflowMitra flow. Step-by-step: get your Webhook URL and configure the node — beginner friendly.',
    ogImage: 'category',            // 'category' = reuse the Messaging category's shared OG template; or an explicit path override
    // ogTitle, ogDescription: optional — omit to default to metaTitle/metaDescription (Slack doesn't need an override)
  },

  // only for schema.org properties that truly can't be derived from the fields above (rare) —
  // HowTo/FAQPage/BreadcrumbList JSON-LD is generated FROM credentialGuide/workflowGuide/faqs, not authored twice
  schemaOverrides: undefined,
}
```

Why `schema` isn't a hand-authored JSON-LD blob (the original review example included one): generating `HowTo` and `FAQPage` structured data programmatically from `credentialGuide`, `workflowGuide`, and `faqs` guarantees the visible content and the structured data can never drift apart. `schemaOverrides` stays available as an escape hatch for the rare property that genuinely can't be derived.

`og:type`, `twitter:card`, and the `BreadcrumbList` schema are **not** per-page fields — every integration page is the same content type, so these are fixed constants set once in the shared `<Seo>` component, not something 8 (then 50) files each restate.

## Category taxonomy (locked enum)

Derived from the actual node/provider inventory in the `workflow` repo, not invented — covers every one of the 50+ integrations so it doesn't drift as more are added:

| Category | Representative apps |
|---|---|
| `MESSAGING` | Slack, Discord, Telegram, WhatsApp |
| `EMAIL` | Gmail, SMTP |
| `SPREADSHEET` | Google Sheets |
| `AI` | AI Agent, one-shot AI (Claude/OpenAI/Groq/Gemini/Ollama) |
| `CRM` | HubSpot, Zoho CRM, Pipedrive |
| `SUPPORT` | Zendesk, Freshdesk, Intercom, Zoho Desk |
| `COMMERCE` | Shopify, WooCommerce, Shiprocket |
| `SOCIAL` | LinkedIn, Facebook Page |
| `FINANCE` | Zoho Books |
| `MEETINGS` | Zoom, Google Meet, Cal.com, Calendly, Whereby, Teams, Zoho Bookings, Jitsi |
| `DATABASE` | Postgres, MySQL, MongoDB, Redis |
| `DEVELOPER` | HTTP Request |

Core engine primitives (Code, Switch, Merge, Loop, Set Variable, Delay, Approval, Response, and the trigger nodes) are **not** part of this taxonomy — they don't connect to an external service or need a credential-acquisition guide, so they belong in a future "Concepts" docs section, not the Integrations directory.

## Screenshot / real-UI recreation strategy

**Decision: React components (JSX + CSS), never PNG/Figma exports.** This was explicit review feedback and matches what the mockup already proved out.

Two shared primitives, used by every page instead of each page inventing its own layout:

- **`<AnnotatedScreenshot variant="browser-chrome" | "app-native">`** — the outer frame. `browser-chrome` renders a fake address bar (for recreating a third-party website like Slack's console); `app-native` renders no browser chrome (for recreating the WorkflowMitra editor itself, since that's not a website being visited).
- **`<Pin number anchor="top-right" | "top-left" | "bottom-right" | "bottom-left">`** — the numbered annotation dot, positioned relative to whatever element it wraps (not absolute page coordinates), so it stays correctly placed at any width without a fixed-size screenshot image.

On top of these:

- **`<RealEditorPreview nodeType nodeColor popoverFields pins>`** — **one** shared component recreating the WorkflowMitra editor (circular node discs, dotted-grid canvas, floating popover), reused by all 8 pages today and all ~50 eventually. Only the node color/icon and the popover's field list change per integration — the chrome, the canvas, the popover shell, and the pin system are identical every time. This is what prevents "50 completely different screenshot implementations."
- **Per-service "scene" components** (e.g. `SlackWebhookScene`, `TelegramBotFatherScene`, `GoogleCloudConsoleScene`, `MetaDevConsoleScene`) — one per *distinct real third-party UI*, since Slack's console genuinely does not look like Telegram's BotFather chat or Google's Cloud Console. Each scene is still built from `<AnnotatedScreenshot>` + `<Pin>`, so the annotation system, numbering, and responsive behaviour are consistent even though the visual content differs. A new integration reuses an existing scene when its provider's real UI is similar enough (e.g. any future Google-service page can extend `GoogleCloudConsoleScene`), and only needs a net-new scene when the real UI is genuinely unlike anything documented yet.

Mapping for the 8 phase-1 pages — showing where scenes are shared vs. genuinely new, and how the two providers with no single fixed dashboard are handled:

| Page | `sceneComponent` | Note |
|---|---|---|
| Slack | `SlackWebhookScene` | new |
| Telegram | `TelegramBotFatherScene` | new — BotFather is a chat conversation, not a dashboard, so this scene recreates a chat bubble UI instead of `browser-chrome` |
| WhatsApp (Meta) | `MetaDevConsoleScene` | new |
| Gmail | `GoogleCloudConsoleScene` (OAuth consent tab) | new shell, reused below |
| Google Sheets | `GoogleCloudConsoleScene` (service-account tab) | **reuses** Gmail's shell with a different tab active — same real top bar/left nav, per the "reuse when the real UI resembles one already built" rule |
| Shopify | `ShopifyAdminScene` | new |
| HTTP Request | *(none — see below)* | no single fixed third-party UI exists to recreate |
| AI Agent | `OpenAiPlatformScene` | represents the pick-a-provider pattern using OpenAI's API-key page as the worked example, with a one-line callout that Anthropic/Groq/Gemini/Ollama follow the same basic shape (account → API keys page → create → copy) rather than building 5 near-identical scenes for phase 1 |

**HTTP Request is a deliberate exception**: since its whole point is "here's how to fill in whatever auth *your* API needs," Track ① doesn't recreate a third-party dashboard at all — it instead shows an expanded `<RealEditorPreview>` focused on the node's own auth-config fields (the real product UI, which is the actual subject of this particular page).

Responsive: pins are anchored to the element they annotate (CSS `position: relative` + a small `position: absolute` badge), not to fixed pixel coordinates on a screenshot image — the same technique already validated in the mockup, so these scale fluidly at any viewport width with no horizontal scroll.

## Information architecture

- New entry point: **`/docs`**, distinct from the existing `/apps` and `/integrations` marketing directory pages (left as-is for phase 1).
- `/docs` and `/docs/integrations` resolve to the same Hub page for phase 1. URL structure leaves room for sibling doc categories later (e.g. `/docs/getting-started`).
- **Hub** (`/docs/integrations`): a grid built from `integrationRegistry.js` — every integration, real brand logo, name, short description, category. `status: 'live'` cards are clickable ("Live guide"); `status: 'coming-soon'` cards are dimmed. Includes search (see below) and category filter chips using the locked taxonomy.
- **Integration page** (`/docs/integrations/:slug`): one dynamic route, rendered from the matching `integrationDocs/<slug>.js` + its `integrationRegistry.js` entry. Mirrors the existing `TemplateDetail.jsx` / `UnifiedSolutionTemplate.jsx` + `solutionConfigs.jsx` patterns — plain JS data objects, no MDX/CMS.
- Docs pages use their own minimal topbar (logo + search + "back to site" link), not the marketing `Navigation.jsx`/`Footer.jsx`.

### Deep-link anchor contract

`credentialGuide.anchorId` is always `'get-credential'` and `workflowGuide.anchorId` is always `'configure-node'` — fixed across every page, never slug-specific — so any caller can link straight to a section with a deterministic formula: `` `/docs/integrations/${slug}#configure-node` ``. This is what makes the editor deep-link (below) a one-line formula instead of a per-integration lookup.

## Page template (applies to every integration page)

1. **Hero** — brand logo tile, name, `hero.tagline`, `hero.metaChips`.
2. **Real use cases** — `useCases[]`, icon-tagged (parallel scenarios, not a sequence).
3. **Before you start** — `prerequisites`.
4. **Track ① Get your credential** (`#get-credential`) — `credentialGuide.sceneComponent`, numbered pins matched to `credentialGuide.steps`, copyable `resultFields`.
5. **Track ② Configure the node** (`#configure-node`) — shared `<RealEditorPreview>`, numbered pins matched to `workflowGuide.steps`.
6. **Full example** — `exampleFlow`.
7. **Templates that use this** — queried from `TemplateFlowData.js`; see fallback below. Reciprocal: `TemplateDetail.jsx`'s app list links back into these doc pages.
8. **Common mistakes** — `mistakes[]`.
9. **FAQ** — `faqs[]`; doubles as `FAQPage` JSON-LD.
10. **Related integrations** — see algorithm below.
11. **Browse all integrations** — closing CTA banner back to the Hub (there is no persistent app-directory sidebar — see "In-page navigation").

### In-page navigation

A left "On this page" section nav (not an app directory — this was an explicit correction mid-review) lists anchors to the sections above and highlights whichever is in view via `IntersectionObserver`.

## Related-integrations algorithm

Deterministic, computed — not hand-curated per page (hand-curation drifts):

1. Filter `integrationRegistry` to the same `category`, excluding the current slug.
2. Boost candidates that co-occur with the current slug in at least one real template (from `TemplateFlowData.js`) — this reuses the same template query as "Templates that use this," no extra data source.
3. Sort by boosted score, descending; take the top 4.
4. If the page's `relatedOverride` array is set, use it verbatim instead of the computed result — for the rare case the algorithm doesn't pick the obviously-right answer.

## Templates that use this — fallback

`templates.fallbackWhenEmpty: 'recommended-workflows'`. When the `TemplateFlowData.js` query returns zero templates for a slug, the section does **not** say "Coming soon" (reads as broken) — it instead renders 2 "Recommended workflows" prompts built directly from that page's own `useCases[]` (already-written content, reformatted as "Build this yourself" starters that deep-link to a new flow with the node pre-added). Always actionable, never an admission of a gap.

## Search

**Fuse.js**, client-side, run directly against the in-memory `integrationRegistry` array (`keys: ['title', 'shortDescription', 'category']`), debounced on keystroke. No server, no precomputed index, no separate build step — at 50-60 rows this is well within what a small fuzzy-match library handles instantly in the browser, and it matches the site's actual architecture (client-rendered SPA, no existing search backend to extend).

## Cross-page linking (interconnectivity)

| Link | Direction | Mechanism |
|---|---|---|
| Hub ↔ integration page | both ways | breadcrumb "Integrations" crumb ↕ Hub cards |
| Page ↔ related integrations | both ways | algorithm above |
| Page ↔ Templates | both ways | "Templates that use this" ↕ template's app icons (real data) |
| Page ↔ Solutions pages | one way in | `IntegrationStrip` icons (already used on `/solutions/*`) become links |
| Page → Hub | one way | "Browse all integrations" closing banner |
| anywhere → anywhere | jump | Fuse.js search |
| Live editor → docs | one way out | help icon in `NodeConfigPopover`, deep-linked to `#configure-node` |

## Cross-repo change: `workflow` repo

- `apps/web/.../NodeConfigPopover.jsx` gets a small help-circle icon-button in its header (between the node name/type label and the close `X`), styled with the product's real accent orange (`#FF9E43`).
- Link target: `` `https://workflowmitra.com/docs/integrations/${slug}#configure-node` `` — opens directly to the configuration section, not the top of the page, per the deep-link anchor contract above.
- `slug` is resolved from the node's `type` (and `provider`, for parameterized nodes like WhatsApp) via a small lookup table co-located with the popover — not a new API call.

## Visual design — Shell A "Native Console" (chosen direction)

The docs section's page chrome mirrors the real WorkflowMitra product's actual design tokens (`apps/web/src/styles/tailwind.css`, `docs/08-ui-guidelines.md`): ink `#0A0A0A`, background `#F8FAFC`/`#F4F4F5`, single accent orange `#FF9E43`, Roboto, neutral-only shadows, the dark `#0A0A0A → #141414` sidebar rail (now hosting the section nav instead of an app list), `rounded-full` node discs, `rounded-2xl` popovers, `rounded-lg` inputs.

Chosen over the "Editorial Premium" alternative (also mocked, not shipped) because it's cheapest to keep in sync long-term — docs inherit the product's palette automatically if it ever changes — and because it reinforces that this documentation *is* part of the product, not a bolted-on microsite.

The two "real UI" recreations (service scene + `<RealEditorPreview>`) use fixed styling independent of the page-chrome theme, since they recreate real external things.

### Icon system

A ~20-icon hand-built stroke-based line-icon set (search, clock, key, gauge, chevron, close, link, lightbulb, undo/redo, resize, trash, copy, calendar, headset, bell, bag, message, help, grid, frame) plus full-color brand SVGs — mirrors the real product's actual `lucide-react` + `simple-icons` combination. **No emoji or Unicode symbol is used as a UI icon anywhere** (explicit mid-review correction). Plain typographic characters that are normal UI convention (`#` before a channel name, `→` at the end of a text link) are not icons and are unaffected.

## SEO / AEO / GEO

- Shared `<Seo>` component (no new dependency — `useEffect`-driven title/meta/canonical/JSON-LD injection), since the site currently has zero per-page meta mechanism.
- Per page: `metaTitle`, `metaDescription`, canonical URL, `og:title`/`og:description` (default to the meta pair unless a page explicitly overrides them), `og:image`, `og:type="article"` (fixed constant), `twitter:card="summary_large_image"` (fixed constant), `article:published_time`/`article:modified_time` (from `publishedDate`/`lastUpdated`).
- `BreadcrumbList` JSON-LD generated programmatically from the route (Docs → Integrations → *name*), not authored per page.
- `HowTo` JSON-LD from `credentialGuide`/`workflowGuide`, `FAQPage` JSON-LD from `faqs` — generated, not hand-duplicated (see schema note above).
- **OG images**: one static template image per category (12 total, matching the taxonomy), ~1200×630, PNG/JPG (not WebP — OG-image support for WebP is inconsistent across social-platform crawlers, so this is the one place the site deliberately doesn't use it). `seo.ogImage: 'category'` is the default for every phase-1 page; an explicit path overrides it if a page ever needs a bespoke image.

## Sitemap generation

A build-time script, **not manual**: `scripts/generate-sitemap.mjs` imports `integrationRegistry.js` (only `status: 'live'` entries get a `<url>`) plus the static marketing route list, and writes `public/sitemap.xml`. Wired as a `"prebuild"` script in `package.json` so it regenerates before every build — a developer adding integration #9 and flipping its `status` to `'live'` gets it into the sitemap automatically, with nothing to remember.

## Image handling

Brand logos and the real-UI recreations are inline SVG/React, not raster images — there is no screenshot asset to lazy-load, convert to WebP, or reserve aspect-ratio for. The one raster surface is the category OG images (above). Any raster image added in the future must use `loading="lazy" decoding="async"` plus explicit `width`/`height` to reserve layout space and avoid layout shift — stated here as the standing rule so it isn't forgotten later.

## Accessibility

- Every brand-logo SVG gets `role="img" aria-label="{name} logo"`.
- All interactive elements are native `<button>`/`<a>`/`<details>` — no `div`-with-`onClick`, so keyboard reachability and focus order come for free.
- FAQ accordions use native `<details>/<summary>` (already correct ARIA semantics without extra `aria-*` wiring).
- Heading order is strict: one `<h1>` in the hero, `<h2>` per major section, no skipped levels.
- Visible `:focus-visible` outline on every interactive element (already validated in the mockup CSS) carries into the real implementation as a hard requirement, not an optional nicety.

## Copy-credential helper

Any `resultFields` entry marked `copyable: true` (Webhook URL, phone number ID, business ID, etc.) renders through a shared `<CopyableField label value />` component with a copy-to-clipboard icon button (the same `copy` icon from the line-icon set), using the standard Clipboard API.

## Adding a new integration (maintenance runbook)

1. Add one entry to `integrationRegistry.js` (`status: 'coming-soon'` is fine to start).
2. When ready to write it: create `src/data/integrationDocs/<slug>.js` following the locked schema above.
3. Reuse an existing "scene" component for the credential step if the provider's real UI resembles one already built; otherwise build a new scene from `<AnnotatedScreenshot>` + `<Pin>`.
4. Write `useCases`, `mistakes`, `faqs` in the established tone (concrete, numbers-driven, beginner language — match the approved mockup copy, don't need to match its exact sentences).
5. Flip `status` to `'live'`. The registry is the only source Hub, search, sitemap, category filters, and the related-integrations pool read from — nothing else needs updating by hand.
6. Set `reviewDate` ~90 days out. Done.

## Explicitly out of scope for phase 1

- Writing the remaining ~45 integrations (later phase, same architecture).
- Fixing the existing `/apps`/`/integrations` marketing page duplication, beyond whatever consistency the Hub itself needs.
- Dedicated category-listing pages (e.g. `/docs/integrations/category/messaging`) — premature at 8 pages; the Hub's filter chips cover this for now. (The category *taxonomy* is locked now regardless, specifically so it doesn't drift before those pages become worth building.)
- A user-facing theme switch — Shell B is not shipped; the toggle in the mockup was a review tool only.

## Follow-ups noted but not blocking phase 1

- Standardizing `brandIcons.jsx`, `Apps.jsx`, and `Integrations.jsx` on `integrationRegistry.js`.
- Extending "Templates that use this"-style cross-linking to the `/solutions/*` pages once the Hub and initial 8 pages are live.

## Key source references

- `workflow/apps/web/src/styles/tailwind.css`, `docs/08-ui-guidelines.md` — real product design tokens.
- `workflow/apps/web/src/features/workflows/builder/CanvasEditor.jsx`, `WorkflowNode.jsx`, `NodeConfigPopover.jsx`, `CredentialPicker.jsx` — real editor structure.
- `workflow/apps/api/src/modules/workflow/nodes/registry.ts`, `app-defs.ts`, `credential-types.ts` — full node/credential inventory behind the category taxonomy and the 50+ integration count.
- `workflowmitra_website/src/pages/TemplateDetail.jsx`, `src/data/TemplateFlowData.js`, `src/data/solutionConfigs.jsx`, `src/components/UnifiedSolutionTemplate.jsx` — existing content-system patterns this design follows.
- `workflowmitra_website/SEO_GUIDE.md`, `SOLUTIONS_PAGES_GUIDE.md` — existing SEO/page-building conventions and known gaps (no per-page meta, no sitemap/robots.txt today).
