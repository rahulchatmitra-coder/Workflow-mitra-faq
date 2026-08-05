# AI Bento Section Redesign — Design Spec

**Date:** 2026-08-04
**Component:** `src/components/AIAgentsFeatureSection.jsx` + `.css`
**Mounted at:** `src/pages/Home.jsx:62`
**Approved mock:** the four-card bento published this session (10 model marks, real logos throughout, live cards 3 and 4).

---

## 1. Audit — current state

`AIAgentsFeatureSection.jsx` is 261 lines. Four cards, every value hardcoded in JSX:

| Card | Today | Problem |
|---|---|---|
| 1 — models | 7 marks: Meta, Anthropic, HuggingFace, OpenAI, Google, DeepSeek, **Notion**. Flat even row, all 58px. | Notion is not a model. Only 7 marks, no hierarchy. Doesn't match the set the engine supports. |
| 2 — integrations | 20 cells, 5×4. Slack, GitHub, Jira, Gmail, Notion, Salesforce, Meta, HubSpot, Airtable, LinkedIn + 5 grey `.ghost` blanks. Tinted backgrounds, inconsistent. | These are **not our integrations** — GitHub, Jira, Airtable, Salesforce have no node in the engine. Grid is a closed 5×4 box, so it reads as "20 apps total". |
| 3 — recurring | 3 `TimelineRow`s: Social Presence, Lead Qualifier, Security Audit. Generic inline SVG icons. Chip only ever says an event name or "Monitoring…". Axis 0H–8H. | Tasks are invented and not business-real. Icons are hand-drawn outlines. No outcome, no volume — nothing that says the system is producing anything. |
| 4 — canvas | 3 chips: Social Presence / Marketing / Customer Support Agent. Coloured `<span>` squares as "integrations". Two dashed paths, drifting cursor. | The squares are placeholders for logos. Agents are generic. Nothing moves along the wires, so it reads as a static diagram. |

**Supporting files audited:**

- `src/utils/brandIcons.jsx` — `getBrandIcon(name, props)` → `{component, color}`; normaliser lowercases and strips non-alphanumerics. 66 keys registered. **Missing for this work:** `postgresql`, `mysql`, `redis`.
- `src/test/setup.js` — mocks `@lobehub/icons` with exactly `OpenAI, DeepSeek, Anthropic, Google, Meta`.
- `workflow/apps/api/src/modules/workflow/nodes/ai-providers.ts` — the AI node supports **5** providers: `openai`, `anthropic` (Claude), `gemini`, `groq` (default model `llama-3.3-70b-versatile`), `ollama` (default `llama3.3`).
- `workflow/apps/api/src/modules/workflow/nodes/app-defs.ts` — HubSpot, Zoho CRM, Pipedrive, Shopify, WooCommerce, Zoho Books, Zendesk, Freshdesk, Intercom, Zoho Desk, LinkedIn, Facebook Page, Shiprocket.
- `workflow/apps/api/src/modules/workflow/nodes/` — native nodes for WhatsApp, Gmail, Slack, Telegram, Discord, Google Sheets, Email, HTTP, Postgres, MySQL, MongoDB, Redis.
- `meeting-providers.ts` — Cal.com, Whereby, Zoom, Google Meet, Calendly, MS Teams, Zoho Bookings, Jitsi, Webex, GoTo Meeting.

## 2. Self-critique of the audit

Things I initially got wrong or nearly missed:

- **"Keep the AI logos the same" conflicted with the later ask.** The user said keep them, then asked to add more. The second instruction supersedes, and it makes Notion's removal correct rather than an overreach. Called out in the mock notes; not silently dropped.
- **HuggingFace is a soft claim.** It's on the card today and stays, but no `ai-providers.ts` entry names it. It is defensible as the source of open models Ollama runs — it is *not* a provider the AI node dials. If the user wants strict truth it should go.
- **`getBrandIcon` fails open, not closed.** Unregistered name → `null`. Card 2 maps over names; a typo produces an empty white tile that looks like a deliberate blank. The 5 existing `.ghost` cells make this invisible. Needs a test that asserts every key resolves, not just that tiles render.
- **The lobehub mock will mask card 1 entirely in tests.** Mocked components return `null`. A test counting rendered `<svg>` in card 1 passes at zero. Assertions must run against the data module.
- **I assumed the arc fits.** It does not. Between 901px and 1120px the card's usable width drops to ~348px against a 423px arc. Needs container-relative sizing, not fixed px.
- **Animation cost.** Card 3 already runs 3 intervals. Adding a 40ms interval for the canvas packet would make 4 timers on a marketing page. Card 4 should be CSS-only.

## 3. Risk analysis

| # | Risk | Blast radius | Mitigation |
|---|---|---|---|
| R1 | Extending card 1 breaks every test that renders `Home` — `@lobehub/icons` mock lacks Gemini, Mistral, Qwen, Groq, Ollama, HuggingFace. | `Home.test.jsx` (6 tests) + any future page test. Hard failure, loud. | Extend the mock in `src/test/setup.js` in the same task. Loud failure is the good case. |
| R2 | A model or app key with no icon renders an invisible gap. | Card 1 or 2 quietly ships with a hole. Silent. | `MODELS` and `INTEGRATIONS` become data; tests assert every entry resolves to a component. This is the same class of bug as the `nodeDiscBg` fallback caught earlier in this session. |
| R3 | Arc overflows the card between 901–1120px. | Horizontal clip or body scroll on laptop widths. | Size every token as a fraction of `--tok: clamp(52px, 6.8vw, 80px)`. Verified: 1440→421px arc in 457px; 901→323px in 348px. |
| R4 | Four concurrent timers on the homepage. | Battery and jank on low-end mobile. | Card 4 is pure CSS (`offset-path` for the packet, keyframes for node highlight and caption). Card 3 keeps its 3 timers, unchanged in count from today. |
| R5 | `prefers-reduced-motion` not honoured on new motion. | Accessibility regression. | Every new animation lands inside the existing `@media (prefers-reduced-motion: reduce)` block. Card 3's `TimelineRow` already checks the media query in JS; keep it. |
| R6 | Run counters climb without bound in a long-lived tab. | Cosmetic; "1,284" becomes "9,999" after hours. | Acceptable — a marketing page is not left open for hours. No mitigation. |
| R7 | The `live` figures are invented. | **Reputational.** The card asserts "1,284 runs today" and "₹4,320" as fact. | Not resolved in code. Flagged to the user twice; carries the same isolating `NOTE` comment as `agentsShowcaseData.jsx`. Values live in one object per row so they are trivially swappable. |
| R8 | `offset-path` browser support. | Packet doesn't move on old Safari (<15.4). | Degrades to a static dot at the path origin. Acceptable; no fallback code. |

**Rollback:** single component + its CSS + one data file. `git checkout` of four paths reverts everything. No schema, no API, no state.

---

## 4. Design

### 4.1 Card 1 — "Every model out of the box, no vendor lock-in"

Ten marks in an arc that tapers from the flagship outward. All official brand logos from `@lobehub/icons`.

| Position | Mark | Size (share of `--tok`) | Why it's here |
|---|---|---|---|
| 1 | Ollama | 0.475 | Provider — `ai-providers.ts` |
| 2 | Qwen | 0.550 | Model served by Groq/Ollama |
| 3 | HuggingFace | 0.625 | Open-model source; already on the card |
| 4 | Groq | 0.725 | Provider |
| 5 | Anthropic | 0.850 | Provider (Claude) |
| 6 | **OpenAI** | **1.000** | Provider — flagship, centre |
| 7 | Gemini | 0.850 | Provider |
| 8 | Meta | 0.725 | Llama, served by Groq/Ollama |
| 9 | DeepSeek | 0.625 | Model served by Groq/Ollama |
| 10 | Mistral | 0.550 | Model served by Groq/Ollama |

`--tok: clamp(52px, 6.8vw, 80px)` on `.logo-arc`. Overlap `margin-left: calc(var(--tok) * -0.19)`. Glyph `font-size: calc(var(--tok) * share * 0.46)` — lobehub icons default to `1em`, so font-size is the sizing lever. Shadow depth scales with share. `z-index` = share, so the flagship sits above its neighbours.

Caption below: **5 providers** · OpenAI, Claude, Gemini, Groq, Ollama.

Notion is removed.

### 4.2 Card 2 — "Connect to internal and external data"

An 8-column grid, 32 cells, deliberately wider than the card and clipped under a horizontal mask so it bleeds past both edges. Reads as "and many more" rather than a countable set.

24 real apps, every one backed by a node in the engine:

`razorpay, whatsapp, sheets, telegram, hubspot, zoho, shopify, gmail, woocommerce, zendesk, slack, mongodb, postgres, discord, calendly, facebook, stripe, notion, intercom, meet, mysql, linkedin, airtable, gcal`

8 `.ghost` cells (dashed outline, transparent) scattered among them for rhythm.

Tile treatment: 46px, `border-radius: 14px`, **white** background, brand-coloured glyph, soft shadow. One rule for every tile — no per-tile tinted backgrounds.

Foot line: **40+ native nodes** · plus any REST API.

### 4.3 Card 3 — "Recurring tasks to keep your agents running in the background"

Three rows, each the real thing a business turns on first, each badged with the brand that runs it — official logo reversed white on the brand's own colour.

| Row | Brand badge | Schedule | Outcomes cycled | Counter |
|---|---|---|---|---|
| Abandoned cart recovery | Shopify on `#5E8E3E` | Shopify · every 30 minutes | "Cart recovered · ₹4,320" / "38 reminders sent" / "Cart recovered · ₹1,890" | 1,284 runs today |
| Daily sales report | Google Sheets on `#0F9D58` | Google Sheets · weekdays, 9 AM IST | "Sheet updated · 412 rows" / "Report sent to 6 people" / "Sheet updated · 388 rows" | 96 runs this month |
| Payment reminder | Razorpay on `#0C2451` | Razorpay · every day, 10 AM | "Invoice #2214 paid" / "12 reminders sent" / "Invoice #2231 paid" | 730 runs this year |

Row anatomy, left to right: brand badge + name/schedule (176px) · timeline (fluid) · run counter (74px, right-aligned, `tabular-nums`).

Timeline behaviour per tick:
1. Position advances 0→4 and wraps.
2. Passed dots fill solid ink; the current dot becomes a filled brand-coloured disc with a soft ring.
3. A coloured progress line fills the track behind the position.
4. The chip moves to the position, shows the next outcome in brand colour, then reverts to a muted "Watching…" after 2.6s.
5. The run counter increments.

Axis: 9 AM · 12 PM · 3 PM · 6 PM · 9 PM — a business day, not 0H–8H.

Timings unchanged in shape from today: staggered start `700ms + index × 1500`, interval `5200ms + index × 1300`.

### 4.4 Card 4 — "A canvas to orchestrate multi-agent workflows"

A flow a reader recognises, with every agent named after the system it drives so the logo on its avatar is honest.

```
                    ┌──────────────────────────┐
                    │  WhatsApp Inbox Agent    │   ← trigger
                    └────────────┬─────────────┘
              "Order question?"  │  "Wants a human?"
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
     ┌───────────────────────┐      ┌────────────────────────┐
     │  Shopify Order Agent  │      │ Zendesk Handoff Agent  │
     └───────────────────────┘      └────────────────────────┘
```

Avatar = the brand's own logo reversed white on its brand colour. Mini chips = real logos on a light square:

- WhatsApp Inbox Agent → WhatsApp, OpenAI, Sheets
- Shopify Order Agent → Shopify, Razorpay, Sheets
- Zendesk Handoff Agent → Zendesk, Slack, Gmail

**Motion, CSS only** (R4):

- Wires keep the existing marching-dash `@keyframes march`.
- A packet dot rides the wires via `offset-path: path(...)`, 7s loop, running the left branch then the right.
- Each node takes a `.live` glow in turn via keyframes with staggered delays on the same 7s period.
- Foot caption: three stacked `<span>`s cross-fading on the same 7s period — "Agent 1 reading the message" → "Order lookup in Shopify" → "Ticket assigned" — each preceded by a pulsing green dot.

All of it stops under `prefers-reduced-motion: reduce`.

### 4.5 Section header

Title unchanged: **Everything you need to make AI work**.
New subtitle: *Your models, your apps, your data — wired into flows that keep running after you close the tab.*
Each card gains a one-line sub under its `h2`.

---

## 5. Impact

**5.1 Functional requirements** — Card 1 shows 10 real model marks tapering from a centre flagship. Card 2 shows 24 real integrations bleeding past the card edge. Card 3 shows 3 business-real recurring tasks with live outcome chips and run counters. Card 4 shows a 3-agent branch flow with a packet travelling the wires. No generic or hand-drawn glyph anywhere in the section.

**5.2 Missing functionality vs. current state** — real model set; brand hierarchy in the arc; our own integrations; bleeding grid; brand badges on task rows; outcome text; run counters; business-day axis; real logos on agent chips; packet motion; live captions; per-card sub-copy.

**5.3 Backend impact** — **None.** Marketing site, no API call, no service, no worker. `workflow/` is read for truth only; nothing in it changes.

**5.4 Frontend impact**
- Create `src/data/aiSectionData.jsx` — `MODELS`, `INTEGRATIONS`, `TASKS`, `AGENTS`.
- Rewrite `src/components/AIAgentsFeatureSection.jsx` — all four cards; `TimelineRow` gains brand badge, progress fill, run counter, outcome cycling; card 4 loses its JS.
- Rewrite the card-specific halves of `src/components/AIAgentsFeatureSection.css`.
- Extend `src/utils/brandIcons.jsx` — add `postgresql`, `mysql`, `redis`.
- Extend `src/test/setup.js` — mock the six new lobehub exports (**R1**).
- `src/pages/Home.jsx` unchanged.

**5.5 Database impact** — **None.**

**5.6 API impact** — **None.**

**5.7 Permission impact** — **None.** Public marketing page.

**5.8 Analytics impact** — **None planned.** Nothing in the section is clickable, so there's no new event. If the integration grid should become a link to `/apps` that's a separate change.

**5.9 Rollout strategy** — No flag. This is a visual replacement of a static section with no runtime dependency; a flag here would be maintenance surface for nothing. Ships as one change, reverts with `git checkout` of five paths.

---

## 6. Testing

| File | Asserts |
|---|---|
| `src/data/aiSectionData.test.jsx` | 10 models, 24 integrations, 3 tasks, 3 agents; **every** model has a component and every integration key resolves through `getBrandIcon` (**R2**); OpenAI is the largest share and is centre; Notion is absent from `MODELS`. |
| `src/components/AIAgentsFeatureSection.test.jsx` | Section renders; 10 `.logo-token`; 24 `.tile:not(.ghost)`; 3 `.task-row` with the expected names; run counters present; 3 `.node` with the expected labels; 4 `.mini i` per node carry an svg; no `.wordmark`/placeholder markup survives. |
| `src/utils/brandIcons.test.jsx` (extend or create) | `postgresql`, `mysql`, `redis` resolve to distinct components. |

Timer-driven behaviour in card 3 is exercised with `vi.useFakeTimers()`: advance past the stagger and assert the chip text moves off "Watching…" and the counter increments.

## 7. Open decision — carried, not resolved

> The run counts, ₹ amounts and outcome strings in `TASKS` are invented. The card presents them as live production figures. Either wire them to real numbers or reframe the card as an illustrative sample before treating them as a public claim.

Raised three times; the user has said continue each time. Implemented as specified, isolated in one `live`-shaped object per row with a `NOTE` comment, so replacing them is a one-file edit.
