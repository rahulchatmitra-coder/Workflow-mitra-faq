# AI Bento Section Redesign — Implementation Plan

**Spec:** `docs/superpowers/specs/2026-08-04-ai-bento-section-redesign.md`

**Goal:** Replace the four cards of `AIAgentsFeatureSection` with real brand marks, our own integrations, business-real recurring tasks and a canvas that runs.

**Architecture:** Data moves out of JSX into `src/data/aiSectionData.jsx` so it can be tested without rendering (the `@lobehub/icons` test mock returns `null`, so rendered assertions on card 1 are worthless — see R2). The component renders that data. Card 4's motion becomes CSS-only so the page keeps 3 timers, not 4.

**Tech stack:** React 18, Vite 5, Vitest 4 + `@testing-library/react`, `@lobehub/icons` 5.15, `react-icons` 5.7, plain co-located CSS.

## Global constraints

- **No `git commit`.** Standing user preference. Every task ends by leaving changes in the working tree.
- Work directly on `main`, on top of the user's existing uncommitted changes (authorised earlier this session).
- No feature flag — a static visual section doesn't earn one.
- Every new animation must sit inside a `@media (prefers-reduced-motion: reduce)` block.
- Zero generic/hand-drawn glyphs in the section. Every mark is an official brand logo from `@lobehub/icons` or `react-icons`.

---

### Task 1: Icon registry gaps + test mock

**Files:** modify `src/utils/brandIcons.jsx`, `src/test/setup.js`; create `src/utils/brandIcons.test.jsx`

Adds `postgresql`, `mysql`, `redis` to the brand registry (needed by card 2) and teaches the lobehub mock the six new model exports so nothing downstream explodes (R1).

- [ ] Write `brandIcons.test.jsx` asserting the three new keys resolve to distinct components
- [ ] Run it, watch it fail
- [ ] Add `SiPostgresql`, `SiMysql`, `SiRedis` to the import and registry
- [ ] Add `Gemini, Mistral, Qwen, Groq, Ollama, HuggingFace` to the `@lobehub/icons` mock in `setup.js`
- [ ] Run the full suite — still green

### Task 2: `src/data/aiSectionData.jsx`

**Files:** create `src/data/aiSectionData.jsx`, `src/data/aiSectionData.test.jsx`

**Produces:** `MODELS` (10 × `{key, Icon, color, share}`), `INTEGRATIONS` (32 slots, `null` = ghost), `TASKS` (3 × `{name, schedule, brand, badgeBg, color, live:{runs, unit}, outcomes[]}`), `AGENTS` (3 × `{id, label, brand, badgeBg, minis[]}`).

- [ ] Write the test: counts, OpenAI is the max share and sits centre, Notion absent, every model has an `Icon`, every integration + mini + brand key resolves via `getBrandIcon` (R2)
- [ ] Run it, watch it fail
- [ ] Write the data module, with the `NOTE` comment isolating the invented `live` figures (R7)
- [ ] Run the test — green

### Task 3: Card 1 + Card 2

**Files:** modify `src/components/AIAgentsFeatureSection.jsx`, `.css`; create `src/components/AIAgentsFeatureSection.test.jsx`

- [ ] Write tests: 10 `.logo-token`, 24 `.tile:not(.ghost)`, model caption present
- [ ] Run, watch fail
- [ ] Render `MODELS` into the arc — width/height/font-size as fractions of `--tok`, `z-index` and shadow by share
- [ ] Add `.logo-arc { --tok: clamp(52px, 6.8vw, 80px) }` and drop the fixed `.lead`/`.near` rules (R3)
- [ ] Render `INTEGRATIONS` into an 8-col grid inside a masked, negatively-margined wrapper; one white-tile rule, no per-tile tints
- [ ] Run tests — green

### Task 4: Card 3

**Files:** modify `AIAgentsFeatureSection.jsx`, `.css`; extend the component test

- [ ] Write tests: 3 `.task-row` with the expected names, a `.runs` counter each, brand badge renders an svg; with fake timers the chip leaves "Watching…" and the counter increments
- [ ] Run, watch fail
- [ ] Rewrite `TimelineRow`: brand badge, `.fill` progress line, hollow/solid/active dot states, outcome cycling, run counter
- [ ] Swap the axis to the business day
- [ ] Run tests — green

### Task 5: Card 4

**Files:** modify `AIAgentsFeatureSection.jsx`, `.css`; extend the component test

- [ ] Write tests: 3 `.node` with the expected labels, each with 3 `.mini i` containing an svg, avatar contains an svg
- [ ] Run, watch fail
- [ ] Render `AGENTS`; delete every coloured-square `<span>` and every inline hand-drawn avatar svg
- [ ] Replace the JS packet with CSS `offset-path`; node `.live` and the 3-way caption cross-fade on the same 7s period (R4)
- [ ] Extend the reduced-motion block to cover packet, live glow and caption (R5)
- [ ] Run tests — green

### Task 6: Verify + report

- [ ] `npm test` — full suite green
- [ ] `npm run build` — succeeds
- [ ] Grep the component and CSS for dead markup: `wordmark|\.lead|\.near|ghost-tile|drift|task-icon svg|cursor`
- [ ] Confirm no generic svg survives: grep the component for `stroke-linecap` / `viewBox="0 0 24 24"` outside the imported icon components
- [ ] **Stop and report.** Do not commit.
