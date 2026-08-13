# Hero with real product nodes + promoted templates section

**Date:** 2026-08-04
**Project:** `workflowmitra_website`
**Status:** Design approved, ready for implementation planning

---

## 1. Goal

Two outcomes on the homepage:

1. The hero shows **real integration logos** instead of the bold single letters it renders today, matched to the
   competitor reference the user supplied (small grey mascots, white logo chips scattered around them, teammate
   cursors).
2. The **four strongest workflow templates** become visible in the first scroll, so a visitor understands what
   WorkflowMitra produces — not just that it integrates with things.

The four templates do **not** go in the hero. They go in the templates section, which is promoted to sit
directly beneath it.

---

## 2. Current state

### Hero
`src/pages/Home.jsx:99` renders `<HeroAnimated />`, which renders four `<AgentDecoration />` instances from a
hardcoded array at `src/components/HeroAnimated.jsx:6-59`.

Each decoration is a large pastel mascot with five badges on a 140 px orbit ring. The orbit is driven by a
`requestAnimationFrame` loop that calls `setState` every frame (`AgentDecoration.jsx:16-31`), 15 s per
revolution. Badges render as **bold single letters**, not logos (`AgentDecoration.jsx:75-86`) — `G`, `#`, `S`,
`D`, `A`, `Z`, with `drive` and `discord` both rendering `D`.

Two defects in the live component:

- **`scale` prop is inert.** `AgentDecoration.jsx:94` sets `transform: scale(...)` inline, but the
  `floatMascot` keyframe animates `transform` on the same element using `var(--scale, 1)`, and `--scale` is
  never set. The keyframe wins, so all four render at scale 1 and the `0.8 / 0.85 / 0.9 / 0.95` values in the
  data array have no effect.
- **No reduced-motion path.** The rAF loop and all three keyframes (`floatMascot`, `blinkMascot`,
  `wobbleCursor`) run unconditionally. `HeroWorkflowDemo.jsx` and `FlowDiagram.jsx` both respect
  `prefers-reduced-motion`; the live hero does not.

### Templates section
`src/pages/Home.jsx` already contains a **Featured Templates** section (markup at lines 127-152, data at
14-49, icons at 51-95). It has cards, category tabs, and a `Use` button that navigates to `/template/:id`.

It sits **fifth** in the page order:

```
HeroAnimated → CustomerLogos → AgentsShowcase → AIAgentsFeatureSection
  → IntegrationsShowcase → Featured Templates → Stats → CTA
```

Its four templates are the weakest of the nine curated ones (all `manual-trigger` chains ending in a
spreadsheet row or a Discord ping). Each card shows two flat app icons via an inline `getAppIcon` switch whose
Google Sheets path is wrong and whose Slack mark uses the retired `#E01E5A` palette. The footer reads
`3 steps · 0 uses` — a zero social-proof count.

### Icon registries that already exist
- `src/utils/brandIcons.jsx` — ~62 brands → `{ icon, color }`, exposed via `getBrandIcon(name, props)`. Backed
  by `react-icons` (`/si`, `/fa`) and `@lobehub/icons`. Its normaliser strips non-alphanumerics, so
  `google-sheets` resolves but `http-request` does not.
- `src/components/docs/icons/docsNodeIcons.jsx` — mirrors the editor's node icons for 13 node types, including
  logic nodes the brand registry has no concept of.
- `src/components/docs/icons/IntegrationLogo.jsx` — resilient wrapper with the fallback chain
  `brandIcons → docsNodeIcons → category glyph`. Never renders empty.
- `src/data/integrationRegistry.js` — `{ slug, title, category, status }`; 8 `live`, rest `coming-soon`.

**These are extended, not replaced.** No new icon module is created.

---

## 3. Design

### 3.1 Hero

Four clusters, one per corner, matching the reference:

| Part | Spec |
|---|---|
| Mascot | 66 px grey silhouette (`--mascot`), two white eye ellipses, four distinct shapes across the clusters |
| Blink | `blinkMascot` retained — `scaleY(1 → 0.1)` at the 50 % mark, 5.2 s, per-cluster delay |
| Float | `floatMascot` retained — `translateY(0 → -14px)`, 8 s, delays `0 / .5 / 1 / 1.5 s` |
| Chips | 6 per cluster. Four at 34 px, two at 28 px and `opacity: .85`. White fill, 1 px hairline border, `0 3px 10px rgba(15,23,42,.09)` shadow, logo at 50 % of chip size in the brand's own colour |
| Scatter | Fixed positions, shared across all four clusters. Not an orbit, not randomised — see §3.3 |
| Cursors | One per cluster: coloured arrow + name pill, `wobbleCursor` 6.4 s with staggered delays |

**The orbit is removed.** The `requestAnimationFrame` loop, the `rotation` state, the counter-rotation
transform, and the 140 px ring geometry all go. Chips take fixed offsets. This deletes a 60 fps `setState` loop
from the homepage.

**Every chip is a brand mark.** No lucide logic glyphs (AI, IF, Approve, Schedule) appear in the hero — beside
Gmail and Shopify they read as unfinished placeholders. Logic nodes appear only in the templates section, where
they are legitimately part of a flow.

### 3.2 Popular workflows section

The existing Featured Templates section **moves** to sit directly after `<HeroAnimated />`. Resulting order:

```
HeroAnimated → Popular workflows → CustomerLogos → AgentsShowcase
  → AIAgentsFeatureSection → IntegrationsShowcase → Stats → CTA
```

Card structure, hover lift, tab pills and the `Use` button are unchanged, so the majority of the existing
`Home.css` rules continue to apply. What changes inside each card:

- The two flat app icons become a **real node chain**: the template's actual node sequence drawn with the
  editor's discs — brand-colour fill, white glyph, white rim, amber bolt badge on the trigger — joined by
  marching-ants edges (`stroke-dasharray: .1 8`, `cm-flow` 1.15 s linear).
- Footer reads `N steps`. **The uses count is dropped** — `0 uses` is worse than no number. It returns only if
  a real figure is wired up.
- Section heading: *"Start from a workflow that already works"*, sub: *"Four of the most-used templates. Open
  one, connect your accounts, run it."*

### 3.3 Shared scatter geometry

One layout, reused by all four clusters, in a 250 × 180 box. Not mirrored on the right-hand side — mirroring
would make no visual difference now that there is no directional flow wire, and a single constant is simpler
to reason about.

```
mascot   (90, 54)  66 px
chip 0   (  8,  20)  34      chip 3   (200,  62)  34
chip 1   ( 62,   0)  34      chip 4   (  2,  92)  28   ambient
chip 2   (150,   8)  34      chip 5   (206, 122)  28   ambient
```

Cluster placement in the hero (container `max-width: 1400px`, `.hero-text` 800 px, ~300 px each side):

```
cluster 0   left: 2px    top: 34px       cluster 1   right: 2px   top: 20px
cluster 2   left: 30px   bottom: 26px    cluster 3   right: 30px  bottom: 16px
```

### 3.4 Data

**Hero clusters** — logos only, all drawn from live integrations:

| Cluster | Logos |
|---|---|
| 0 | Facebook, Gemini, HubSpot, WhatsApp, Google Sheets, Telegram |
| 1 | Shopify, Razorpay, Zoho, WhatsApp, Stripe, WooCommerce |
| 2 | Gmail, Anthropic, Slack, Google Sheets, Zendesk, Discord |
| 3 | Calendly, Zoom, MongoDB, Slack, Google Meet, Telegram |

**Templates** — every card maps to an existing entry in `src/data/TemplateFlowData.js`, which already holds six
fully authored template pages. Ids are **numeric**, matching that file and `TemplateFlowPage.jsx`:

| id | Category | Card title | Abridged chain | Steps | Replaces |
|---|---|---|---|---|---|
| 6 | Lead capture | Lead → WhatsApp in 5 seconds | Webhook · AI · HubSpot · WhatsApp | 5 | Lead capture — Google Sheet |
| 2 | E-commerce | Paid order → invoice → WhatsApp | Shopify · Zoho · WhatsApp · Google Sheets | 5 | New order — Email + Sheet |
| 4 | AI | AI drafts, you approve | Gmail · AI · Approve · Gmail | 6 | API health check — Discord |
| 3 | Customer support | Support ticket → AI triage | Zendesk · AI · IF · Slack | 6 | Daily report — Slack |

The node chain is **abridged to four discs** — a recognisable summary, not the full graph. The `steps` figure is
the real template's node count, so a card can legitimately read `6 steps` beside four discs. This is
intentional; do not "fix" it by padding the chain or lowering the count.

Category tabs become `All / Lead capture / E-commerce / AI / Customer support`. The current tabs
(`Data sync`, `Notifications`, `Reporting`) match nothing under the new set and are removed.

**"Daily numbers in Slack" is dropped.** It has no entry in `TemplateFlowData.js`, and authoring one means
writing nodes, edges, six step bodies and the `why` / `benefit` prose to match the existing entries' depth.
Template 3 (Support ticket → AI triage) takes the slot instead — already complete, and a distinct category.

### 3.5 Pre-existing bug: every homepage Use button is broken

`Home.jsx` gives its templates **slug** ids (`'lead-capture-google-sheet'`) and navigates to
`/template/{id}`. `TemplateFlowPage.jsx:21` resolves with `parseInt(templateId, 10)`, so every slug becomes
`NaN`, no flow matches, and the visitor gets the "Template not found" screen.

All four homepage cards are affected today. Switching to the numeric ids above fixes it as a side effect; the
fix must be verified by actually clicking through, not assumed.

---

## 4. Components and files

### Extended

| File | Change |
|---|---|
| `src/utils/brandIcons.jsx` | Add `razorpay`, `zoho`, `mongodb`, `googlegemini`, `anthropic`, `facebook`, and a `googlemeet` key (`SiGooglemeet` is imported but unkeyed). All exist in the installed `react-icons@5.7.0` — no new dependency. |
| `src/components/docs/icons/docsNodeIcons.jsx` | Add `if` and `approval` (lucide `GitBranch` / `UserCheck`, both exported by the pinned `lucide-react@1.28.0`, accent `#ff9e43`), plus brand entries `hubspot`, `zoho`, `zendesk`. Existing entries already cover `ai`, `gmail`, `slack`, `shopify`, `whatsapp`, `google-sheets`, `webhook-trigger`. Without these, `nodeDiscBg` returns `#0A0A0A` and `DocsNodeIcon` falls back to the generic `Blocks` glyph. |

### New

| File | Purpose |
|---|---|
| `src/components/NodeChain.jsx` + `.css` | Renders a template's node sequence: discs plus marching-ants edges. Props: `nodes` (array of node-type strings), `size`, `gap`. Builds each disc from the existing `nodeDiscBg(type)` and `<DocsNodeIcon type mono />` — no new icon logic. Used only by the templates section. |

### Modified

| File | Change |
|---|---|
| `src/components/AgentDecoration.jsx` | Delete the rAF orbit loop, `rotation` state and ring geometry. Replace `renderBadgeLogo`'s letter switch with `getBrandIcon`. Mascot becomes the small grey silhouette. Chips take fixed scatter offsets. |
| `src/components/AgentDecoration.css` | Chip and mascot styles; delete orbit rules; fix the dead `--scale`; add a `prefers-reduced-motion` block. |
| `src/components/HeroAnimated.jsx` | Rewrite the decorations array — per-cluster logo lists, mascot shape index, cursor position and delay. Drop the now-meaningless `badges`/`shape`/`color` fields. |
| `src/pages/Home.jsx` | Move the templates section above `<CustomerLogos />`. Replace the `templates` array and `categories` list. Delete the inline `getAppIcon` switch in favour of `NodeChain`. |
| `src/pages/Home.css` | Restyle the `.template-apps` row for the chain; update tab rules if the new labels wrap. |

---

## 5. Non-goals

- **Mobile.** Hero decorations remain `display: none` below 1024 px (`.desktop-only`, `HeroAnimated.css:83-87`).
  Phone visitors continue to see the headline on an empty field. The promoted templates section is responsive
  and will show, so on mobile the flows carry the whole story. A stacked mobile hero is separate work.
- **Clickable hero.** The decoration layer keeps `pointer-events: none`. Only the templates section is
  interactive.
- **Flow wires in the hero.** Rejected in favour of the pure reference match (mock V1).
- **Reviving `HeroWorkflowDemo.jsx` or `PremiumHero.jsx`.** Both remain unused; neither is deleted here.
- **Real usage counts.** The `uses` field is dropped, not populated.

---

## 6. Risks

| Risk | Mitigation |
|---|---|
| Moving the templates section changes the page's narrative order — CustomerLogos and AgentsShowcase each drop one slot. | Approved by the user. Visual check of the full page at 1440 px and 1280 px after the move. |
| ~~New template ids may not resolve~~ — **investigated, resolved.** Ids are numeric and all four exist in `TemplateFlowData.js`. The current slug ids are the bug (§3.5). | Click each of the four `Use` buttons after the change and confirm a real template page renders. |
| Six chips per cluster at fixed positions may collide with `.hero-text` at 1280 px, where side gutters shrink. | Chips sit behind the text (`z-index` 2 vs 10) as they do today; verify at 1280 px and 1440 px. |
| `@lobehub/icons` entries in `brandIcons.jsx` use a different prop shape (`colorPrimary`) than react-icons entries. | New additions all come from `react-icons/si`; follow the existing react-icons pattern, not the lobehub one. |
| Removing the rAF loop changes `AgentDecoration`'s public props. | It is rendered only by `HeroAnimated`; no other consumer. |

---

## 7. Verification

- `npm test` — 212 tests currently pass; must still pass.
- `npm run build` — must succeed.
- Browser check at 1440 px, 1280 px and 1024 px: chips render as logos with no missing marks, no chip/headline
  collision, templates section sits directly under the hero.
- Toggle `prefers-reduced-motion: reduce` — float, blink and cursor animations all stop.
- Click `Use` on each of the four cards and confirm it lands on a real template page.
- Confirm no `requestAnimationFrame` remains in `AgentDecoration.jsx`.

---

## 8. Implementation planning

The project's `CLAUDE.md` requires the implementation plan to carry all nine sections (functional requirements,
missing functionality, backend / frontend / database / API / permission / analytics impact, rollout). This is a
frontend-only change: backend, database, API and permission impact are all *none*, and that must be stated
explicitly rather than omitted.
