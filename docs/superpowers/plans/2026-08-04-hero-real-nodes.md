# Hero Real Nodes + Promoted Templates — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hero's letter badges with real integration logos matched to the approved reference, and promote the existing Featured Templates section to sit under the hero with real node chains and working links.

**Architecture:** Frontend only. Extend the two icon registries that already exist (`brandIcons.jsx`, `docsNodeIcons.jsx`) rather than adding a module; add one new presentational component (`NodeChain`); rewrite `AgentDecoration` to drop its `requestAnimationFrame` orbit in favour of fixed CSS-animated scatter; re-order and re-data the templates section in `Home.jsx`.

**Tech Stack:** React 18, Vite 5, `react-router-dom` v6, Vitest + `@testing-library/react` + `jest-dom`, plain co-located CSS with custom properties, `react-icons@5.7.0`, `lucide-react@1.28.0`.

**Spec:** `docs/superpowers/specs/2026-08-04-hero-real-nodes-design.md`

## Global Constraints

- **Do not commit.** The user's standing instruction is that Claude never runs `git commit`. Every "Commit" step below is a **stop-and-report** step: stage nothing, run the verification, and report the task complete. The user commits.
- **No new dependencies.** Every icon needed exists in the installed `react-icons@5.7.0` and `lucide-react@1.28.0`. Do not add `simple-icons`.
- **Test command:** `npx vitest run <path>` for a single file, `npm test` for the suite. 212 tests pass today and must still pass.
- **Build command:** `npm run build` (runs `scripts/generate-sitemap.mjs` first via `prebuild`).
- **`lucide-react@1.28.0` does not export `Slack`.** `docsNodeIcons.jsx` inlines `SlackGlyph` for this reason. Never `import { Slack } from 'lucide-react'`.
- **Test files live beside their source** (`src/utils/brandIcons.test.jsx`, not `tests/`). Vitest `include` is `src/**/*.{test,spec}.{js,jsx}`.
- **`globals: true`** is set, but existing tests still import `{ describe, it, expect }` from `vitest` explicitly. Match that.
- **Template ids are numeric.** `TemplateFlowPage.jsx:21` does `parseInt(templateId, 10)`. Never use slug ids.
- **Hero decorations stay `pointer-events: none`** and stay hidden below 1024 px via `.desktop-only`. Mobile is out of scope.
- **Brand colours are verbatim** from the product's registry: Slack `#4A154B`, WhatsApp `#25D366`, Zoho `#E42527`, Zendesk `#03363D`, HubSpot `#FF7A59`, Razorpay `#0C2451`, MongoDB `#47A248`, Gemini `#8E75B2`, Anthropic `#191919`, Facebook `#0866FF`, Google Meet `#00897B`. Logic accent is `#ff9e43`.

---

### Task 1: Add the six missing brands to `brandIcons.jsx`

The hero needs Razorpay, Zoho, MongoDB, Gemini, Anthropic and Facebook, and `SiGooglemeet` is already imported but never keyed.

**Files:**
- Modify: `src/utils/brandIcons.jsx`
- Test: `src/utils/brandIcons.test.jsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `getBrandIcon(name, props)` resolves for `'razorpay' | 'zoho' | 'mongodb' | 'googlegemini' | 'anthropic' | 'facebook' | 'googlemeet'`, returning `{ component, color }` as it does for existing brands. The normaliser lowercases and strips non-alphanumerics, so `'google-gemini'` and `'googlegemini'` both resolve.

- [ ] **Step 1: Write the failing test**

Append this block to `src/utils/brandIcons.test.jsx`:

```jsx
describe('getBrandIcon — hero cluster coverage', () => {
  it.each([
    'razorpay', 'zoho', 'mongodb', 'googlegemini', 'anthropic',
    'facebook', 'googlemeet', 'zendesk', 'hubspot', 'stripe',
    'woocommerce', 'calendly', 'zoom',
  ])('resolves a renderable icon for "%s"', (name) => {
    const icon = getBrandIcon(name)
    expect(icon).toBeTruthy()
    expect(icon.component).toBeTruthy()
    const { container } = render(<>{icon.component}</>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('normalises a hyphenated slug to the same entry', () => {
    expect(getBrandIcon('google-gemini')?.color).toBe(getBrandIcon('googlegemini')?.color)
  })
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npx vitest run src/utils/brandIcons.test.jsx`
Expected: FAIL. `razorpay`, `zoho`, `mongodb`, `googlegemini`, `anthropic`, `facebook`, `googlemeet` return `null`, so `expect(icon).toBeTruthy()` fails for each. The pre-existing cases and `zendesk`/`hubspot`/`stripe`/`woocommerce`/`calendly`/`zoom` should pass.

- [ ] **Step 3: Add the imports**

In `src/utils/brandIcons.jsx`, extend the existing `react-icons/si` import block with the six new marks. Add them to the end of the existing list — do not reorder it:

```jsx
import {
  SiHubspot, SiGmail, SiGooglesheets,
  SiDiscord, SiNotion, SiStripe, SiGithub, SiJira, SiAirtable,
  SiZendesk, SiAsana, SiMailchimp, SiMeta,
  SiTypeform, SiCalendly, SiZapier, SiTrello,
  SiAtlassian, SiVercel, SiSentry, SiCircleci, SiIntercom,
  SiHelpscout, SiOkta, SiAuth0, SiDatadog, SiPagerduty,
  SiSplunk, SiGoogle, SiGooglecalendar, SiGooglemeet, SiLinear,
  SiDropbox, SiFigma,
  SiShopify, SiWoo, SiMailgun, SiMixpanel, SiZoom,
  SiSnowflake, SiMiro,
  SiWebflow, SiApollographql,
  SiTelegram, SiWhatsapp,
  SiRazorpay, SiZoho, SiMongodb, SiGooglegemini, SiAnthropic, SiFacebook
} from 'react-icons/si';
```

- [ ] **Step 4: Add the registry entries**

Add these to the `BRAND_ICONS` object. Colours are the product's, verbatim:

```jsx
  razorpay: { icon: SiRazorpay, color: '#0C2451' },
  zoho: { icon: SiZoho, color: '#E42527' },
  zohocrm: { icon: SiZoho, color: '#E42527' },
  zohobooks: { icon: SiZoho, color: '#E42527' },
  mongodb: { icon: SiMongodb, color: '#47A248' },
  googlegemini: { icon: SiGooglegemini, color: '#8E75B2' },
  gemini: { icon: SiGooglegemini, color: '#8E75B2' },
  anthropic: { icon: SiAnthropic, color: '#191919' },
  claude: { icon: SiAnthropic, color: '#191919' },
  facebook: { icon: SiFacebook, color: '#0866FF' },
  googlemeet: { icon: SiGooglemeet, color: '#00897B' },
```

- [ ] **Step 5: Run the test and verify it passes**

Run: `npx vitest run src/utils/brandIcons.test.jsx`
Expected: PASS, all cases.

- [ ] **Step 6: Run the full suite**

Run: `npm test`
Expected: PASS. Report the task complete — **do not commit.**

---

### Task 2: Add the logic and brand node marks to `docsNodeIcons.jsx`

`NodeChain` draws template steps through this registry. Five types it needs are missing, and `nodeDiscBg` silently returns `#0A0A0A` with a generic `Blocks` glyph for anything absent — a wrong render, not an error.

**Files:**
- Modify: `src/components/docs/icons/docsNodeIcons.jsx`
- Test: `src/components/docs/icons/docsNodeIcons.test.jsx` *(create)*

**Interfaces:**
- Consumes: nothing.
- Produces: `nodeDiscBg(type)` returns the correct hex, and `<DocsNodeIcon type mono />` renders the correct mark, for the five added types: `'if'` → `#ff9e43`, `'approval'` → `#ff9e43`, `'hubspot'` → `#FF7A59`, `'zoho'` → `#E42527`, `'zendesk'` → `#03363D`. Both exports already exist and keep their current signatures.

- [ ] **Step 1: Write the failing test**

Create `src/components/docs/icons/docsNodeIcons.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { DocsNodeIcon, nodeDiscBg } from './docsNodeIcons'

describe('docsNodeIcons — types the template chains need', () => {
  it.each([
    ['if', '#ff9e43'],
    ['approval', '#ff9e43'],
    ['hubspot', '#FF7A59'],
    ['zoho', '#E42527'],
    ['zendesk', '#03363D'],
    ['gmail', '#EA4335'],
    ['whatsapp', '#25D366'],
    ['slack', '#4A154B'],
    ['shopify', '#7AB55C'],
    ['google-sheets', '#34A853'],
    ['ai', '#0A0A0A'],
    ['webhook-trigger', '#0A0A0A'],
  ])('gives "%s" the disc colour %s', (type, hex) => {
    expect(nodeDiscBg(type)).toBe(hex)
  })

  it.each(['if', 'approval', 'hubspot', 'zoho', 'zendesk'])(
    'renders a real mark for "%s"',
    (type) => {
      const { container } = render(<DocsNodeIcon type={type} size={24} mono />)
      expect(container.querySelector('svg')).toBeInTheDocument()
    }
  )
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npx vitest run src/components/docs/icons/docsNodeIcons.test.jsx`
Expected: FAIL. `nodeDiscBg('if')` returns `'#0A0A0A'`, not `'#ff9e43'` — same for `approval`, `hubspot`, `zoho`, `zendesk`.

- [ ] **Step 3: Add the imports**

Extend the two existing import statements in `docsNodeIcons.jsx`:

```jsx
import {
  SiWhatsapp, SiTelegram, SiDiscord, SiGmail, SiGooglesheets, SiShopify,
  SiHubspot, SiZoho, SiZendesk,
} from 'react-icons/si'
import { Globe, Sparkles, Blocks, MousePointerClick, Zap, GitBranch, UserCheck } from 'lucide-react'
```

`GitBranch` and `UserCheck` are both exported by `lucide-react@1.28.0` — verified. `Slack` is not; keep using the inlined `SlackGlyph`.

- [ ] **Step 4: Add the registry entries**

Add to the `BRAND` object:

```jsx
  hubspot: { Icon: SiHubspot, hex: '#FF7A59' },
  zoho: { Icon: SiZoho, hex: '#E42527' },
  zendesk: { Icon: SiZendesk, hex: '#03363D' },
```

Add to the `LUCIDE` object. `#ff9e43` is the product's `LOGIC_ACCENT` — the same colour `ai-agent` already uses:

```jsx
  if: { Icon: GitBranch, hex: '#ff9e43' },
  approval: { Icon: UserCheck, hex: '#ff9e43' },
```

- [ ] **Step 5: Run the test and verify it passes**

Run: `npx vitest run src/components/docs/icons/docsNodeIcons.test.jsx`
Expected: PASS, all cases.

- [ ] **Step 6: Run the full suite**

Run: `npm test`
Expected: PASS. Report complete — **do not commit.**

---

### Task 3: Build the `NodeChain` component

A row of discs joined by marching-ants edges, drawing the editor's own node look. Used by the templates section only.

**Files:**
- Create: `src/components/NodeChain.jsx`
- Create: `src/components/NodeChain.css`
- Test: `src/components/NodeChain.test.jsx`

**Interfaces:**
- Consumes: `nodeDiscBg(type)` and `<DocsNodeIcon type size mono />` from `./docs/icons/docsNodeIcons` (Task 2).
- Produces: `export default function NodeChain({ nodes, size = 40, gap = 20 })`. `nodes` is an **array of node-type strings**, e.g. `['shopify', 'zoho', 'whatsapp', 'google-sheets']`. Renders one `.nc-disc` per entry with `data-node-type` set, and `nodes.length - 1` `.nc-link` elements between them. The first disc carries a `.nc-bolt` trigger badge. Task 6 consumes this.

- [ ] **Step 1: Write the failing test**

Create `src/components/NodeChain.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import NodeChain from './NodeChain'

describe('NodeChain', () => {
  it('renders one disc per node', () => {
    const { container } = render(<NodeChain nodes={['shopify', 'zoho', 'whatsapp', 'google-sheets']} />)
    expect(container.querySelectorAll('.nc-disc')).toHaveLength(4)
  })

  it('renders a connector between each pair, never a trailing one', () => {
    const { container } = render(<NodeChain nodes={['gmail', 'ai', 'approval', 'gmail']} />)
    expect(container.querySelectorAll('.nc-link')).toHaveLength(3)
  })

  it('colours each disc with the product brand hex', () => {
    const { container } = render(<NodeChain nodes={['whatsapp', 'if']} />)
    const discs = container.querySelectorAll('.nc-disc')
    expect(discs[0].style.background).toBe('rgb(37, 211, 102)')  // #25D366
    expect(discs[1].style.background).toBe('rgb(255, 158, 67)')  // #ff9e43
  })

  it('marks only the first node as the trigger', () => {
    const { container } = render(<NodeChain nodes={['shopify', 'zoho', 'whatsapp']} />)
    const bolts = container.querySelectorAll('.nc-bolt')
    expect(bolts).toHaveLength(1)
    expect(container.querySelectorAll('.nc-disc')[0].querySelector('.nc-bolt')).toBeInTheDocument()
  })

  it('renders nothing for an empty chain', () => {
    const { container } = render(<NodeChain nodes={[]} />)
    expect(container.querySelectorAll('.nc-disc')).toHaveLength(0)
  })

  it('exposes the node type for assertions and styling', () => {
    const { container } = render(<NodeChain nodes={['zendesk', 'ai']} />)
    expect(container.querySelector('[data-node-type="zendesk"]')).toBeInTheDocument()
    expect(container.querySelector('[data-node-type="ai"]')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npx vitest run src/components/NodeChain.test.jsx`
Expected: FAIL — `Failed to resolve import "./NodeChain"`.

- [ ] **Step 3: Write the component**

Create `src/components/NodeChain.jsx`:

```jsx
import { DocsNodeIcon, nodeDiscBg } from './docs/icons/docsNodeIcons'
import './NodeChain.css'

/**
 * A template's node sequence, drawn the way the editor canvas draws it:
 * a brand-coloured disc with a white glyph, joined by the same marching-ants
 * edge. The first node wears the amber bolt that marks a trigger.
 *
 * The chain is deliberately abridged — four discs summarise a template that
 * may have six steps. The card's step count is the real figure.
 */
export default function NodeChain({ nodes = [], size = 40, gap = 20 }) {
  return (
    <div className="nc" role="presentation">
      {nodes.map((type, i) => (
        <div className="nc-step" key={`${type}-${i}`}>
          {i > 0 && (
            <span className="nc-link" style={{ width: `${gap}px`, height: `${size}px` }}>
              <svg width={gap} height={size} viewBox={`0 0 ${gap} ${size}`} aria-hidden="true">
                <path className="nc-base" d={`M0 ${size / 2} L${gap} ${size / 2}`} />
                <path className="nc-ants" d={`M0 ${size / 2} L${gap} ${size / 2}`} />
              </svg>
            </span>
          )}
          <span
            className="nc-disc"
            data-node-type={type}
            style={{ width: `${size}px`, height: `${size}px`, background: nodeDiscBg(type) }}
          >
            <DocsNodeIcon type={type} size={Math.round(size * 0.46)} mono />
            {i === 0 && (
              <span className="nc-bolt" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="#0A0A0A"
                     strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                </svg>
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Write the stylesheet**

Create `src/components/NodeChain.css`:

```css
.nc {
  display: flex;
  align-items: center;
}

.nc-step {
  display: flex;
  align-items: center;
}

.nc-disc {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 2.5px solid #ffffff;
  box-shadow: 0 4px 12px rgba(10, 10, 10, 0.16), inset 0 2px 0 rgba(255, 255, 255, 0.26);
}

.nc-bolt {
  position: absolute;
  top: -3px;
  left: -3px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #ff9e43;
  border: 2px solid #ffffff;
  display: grid;
  place-items: center;
}

.nc-link {
  flex: none;
  display: grid;
  place-items: center;
}

.nc-base {
  fill: none;
  stroke: var(--color-border, #e2e8f0);
  stroke-width: 2.5;
  opacity: 0.35;
}

/* The editor's edge: same dash pattern and period as the canvas. */
.nc-ants {
  fill: none;
  stroke: var(--color-border, #e2e8f0);
  stroke-width: 2.5;
  stroke-dasharray: 0.1 8;
  stroke-linecap: round;
  animation: nc-flow 1.15s linear infinite;
}

@keyframes nc-flow {
  to { stroke-dashoffset: -16.2; }
}

@media (prefers-reduced-motion: reduce) {
  .nc-ants { animation: none; }
}
```

- [ ] **Step 5: Run the test and verify it passes**

Run: `npx vitest run src/components/NodeChain.test.jsx`
Expected: PASS, all six cases.

If the colour assertions fail, check the received value: jsdom normalises `style.background` to `rgb(...)`. `#25D366` → `rgb(37, 211, 102)`, `#ff9e43` → `rgb(255, 158, 67)`. A mismatch means Task 2's registry entry is wrong, not the test.

- [ ] **Step 6: Run the full suite**

Run: `npm test`
Expected: PASS. Report complete — **do not commit.**

---

### Task 4: Rewrite `AgentDecoration` — real logos, grey mascot, no rAF

Replace the letter badges with brand marks, shrink the mascot to the reference's small grey silhouette, and delete the `requestAnimationFrame` orbit. Fixes the dead `--scale` and adds the missing reduced-motion path.

**Files:**
- Modify: `src/components/AgentDecoration.jsx` *(full rewrite)*
- Modify: `src/components/AgentDecoration.css` *(full rewrite)*
- Test: `src/components/AgentDecoration.test.jsx` *(create)*

**Interfaces:**
- Consumes: `getBrandIcon(name, props)` from `../utils/brandIcons` (Task 1).
- Produces: `export default function AgentDecoration({ logos = [], mascot = 0, position = {}, cursor = null, delay = 0 })`.
  - `logos` — array of up to 6 brand-name strings. Indices 0-3 render at 34 px; 4-5 render at 28 px with `.is-ambient`.
  - `mascot` — integer `0..3` selecting the silhouette.
  - `position` — CSS offsets spread onto the wrapper, e.g. `{ top: '34px', left: '2px' }`.
  - `cursor` — `{ name, color } | null`.
  - `delay` — float animation offset in seconds.
  - **The `shape`, `color`, `badges` and `scale` props are gone.** Task 5 supplies the new shape.

- [ ] **Step 1: Write the failing test**

Create `src/components/AgentDecoration.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import AgentDecoration from './AgentDecoration'

const LOGOS = ['facebook', 'googlegemini', 'hubspot', 'whatsapp', 'googlesheets', 'telegram']

describe('AgentDecoration', () => {
  it('renders one chip per logo', () => {
    const { container } = render(<AgentDecoration logos={LOGOS} mascot={0} />)
    expect(container.querySelectorAll('.agent-chip')).toHaveLength(6)
  })

  it('renders a real svg mark inside every chip, never a text letter', () => {
    const { container } = render(<AgentDecoration logos={LOGOS} mascot={0} />)
    container.querySelectorAll('.agent-chip').forEach((chip) => {
      expect(chip.querySelector('svg')).toBeInTheDocument()
      expect(chip.textContent).toBe('')
    })
  })

  it('marks the last two chips as ambient', () => {
    const { container } = render(<AgentDecoration logos={LOGOS} mascot={0} />)
    const chips = container.querySelectorAll('.agent-chip')
    expect(chips[3].classList.contains('is-ambient')).toBe(false)
    expect(chips[4].classList.contains('is-ambient')).toBe(true)
    expect(chips[5].classList.contains('is-ambient')).toBe(true)
  })

  it('renders the mascot silhouette selected by index', () => {
    const { container } = render(<AgentDecoration logos={LOGOS} mascot={2} />)
    expect(container.querySelector('[data-mascot="2"]')).toBeInTheDocument()
  })

  it('renders a cursor with its name when given one', () => {
    const { getByText } = render(
      <AgentDecoration logos={LOGOS} mascot={0} cursor={{ name: 'Katherine', color: '#E8388A' }} />
    )
    expect(getByText('Katherine')).toBeInTheDocument()
  })

  it('renders no cursor when given none', () => {
    const { container } = render(<AgentDecoration logos={LOGOS} mascot={0} />)
    expect(container.querySelector('.agent-cursor')).toBeNull()
  })

  it('skips a logo with no brand mark rather than rendering a placeholder', () => {
    const { container } = render(<AgentDecoration logos={['whatsapp', 'not-a-real-brand-xyz']} mascot={0} />)
    expect(container.querySelectorAll('.agent-chip')).toHaveLength(1)
  })

  it('applies the float delay as a custom property', () => {
    const { container } = render(<AgentDecoration logos={LOGOS} mascot={0} delay={1.5} />)
    expect(container.querySelector('.agent-decoration-wrapper').style.getPropertyValue('--float-delay')).toBe('1.5s')
  })
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npx vitest run src/components/AgentDecoration.test.jsx`
Expected: FAIL. The current component renders `.orbiting-badge`, not `.agent-chip`, so the first assertion returns 0.

- [ ] **Step 3: Rewrite the component**

Replace the entire contents of `src/components/AgentDecoration.jsx`:

```jsx
import { getBrandIcon } from '../utils/brandIcons'
import './AgentDecoration.css'

/**
 * One hero cluster: a small grey mascot with real integration marks scattered
 * around it, and an optional teammate cursor.
 *
 * The badges used to orbit on a 15s requestAnimationFrame loop that called
 * setState every frame. Positions are fixed now and every motion is CSS, so
 * the homepage no longer re-renders 60 times a second.
 */

// Fixed scatter inside the 250x180 box. First four are the prominent chips.
const SPOTS = [
  { x: 8, y: 20, size: 34 },
  { x: 62, y: 0, size: 34 },
  { x: 150, y: 8, size: 34 },
  { x: 200, y: 62, size: 34 },
  { x: 2, y: 92, size: 28 },
  { x: 206, y: 122, size: 28 },
]

const MASCOTS = [
  'M33 2c14 0 29 8 29 27 0 20-13 35-29 35S4 49 4 29C4 10 19 2 33 2z',
  'M18 16a13 13 0 0 1 25-4 12 12 0 0 1 13 15 13 13 0 0 1-4 27H20A15 15 0 0 1 8 30a13 13 0 0 1 10-14z',
  null, // index 2 is the rounded square, drawn as a <rect> below
  'M33 3c17 0 27 9 27 26s-9 34-27 34S6 46 6 29 16 3 33 3z',
]

const EYES = [
  { cx: [25, 41], cy: 30 },
  { cx: [26, 42], cy: 33 },
  { cx: [26, 42], cy: 31 },
  { cx: [26, 42], cy: 31 },
]

function Mascot({ index }) {
  const eyes = EYES[index] || EYES[0]
  return (
    <svg
      className="agent-mascot" data-mascot={index}
      width="66" height="66" viewBox="0 0 66 66" aria-hidden="true"
    >
      {MASCOTS[index]
        ? <path d={MASCOTS[index]} fill="var(--agent-mascot-fill)" />
        : <rect x="6" y="6" width="54" height="54" rx="17" fill="var(--agent-mascot-fill)" />}
      <ellipse className="agent-eye" cx={eyes.cx[0]} cy={eyes.cy} rx="4.3" ry="6.4" fill="#ffffff" />
      <ellipse className="agent-eye" cx={eyes.cx[1]} cy={eyes.cy} rx="4.3" ry="6.4" fill="#ffffff" />
    </svg>
  )
}

export default function AgentDecoration({
  logos = [],
  mascot = 0,
  position = {},
  cursor = null,
  delay = 0,
}) {
  // Resolve first, so a brand with no mark drops out instead of rendering a
  // placeholder glyph next to Gmail and Shopify.
  const chips = logos
    .map((name, i) => ({ name, spot: SPOTS[i], icon: getBrandIcon(name, { size: Math.round((SPOTS[i]?.size ?? 34) * 0.5) }) }))
    .filter((c) => c.spot && c.icon?.component)

  return (
    <div
      className="agent-decoration-wrapper"
      style={{ ...position, '--float-delay': `${delay}s` }}
    >
      <div className="agent-mascot-slot"><Mascot index={mascot} /></div>

      {chips.map((chip, i) => (
        <div
          key={`${chip.name}-${i}`}
          className={`agent-chip${i > 3 ? ' is-ambient' : ''}`}
          style={{
            left: `${chip.spot.x}px`,
            top: `${chip.spot.y}px`,
            width: `${chip.spot.size}px`,
            height: `${chip.spot.size}px`,
          }}
        >
          {chip.icon.component}
        </div>
      ))}

      {cursor && (
        <div className="agent-cursor" style={{ '--cursor-delay': `${delay + 0.4}s` }}>
          <svg width="15" height="19" viewBox="0 0 15 19" aria-hidden="true">
            <path
              d="M1 1l12 9-5.2 1.4L10 18 7 19 4.6 12.6 1 16V1z"
              fill={cursor.color} stroke="#ffffff" strokeWidth="1"
            />
          </svg>
          <span className="agent-cursor-label" style={{ backgroundColor: cursor.color }}>
            {cursor.name}
          </span>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Rewrite the stylesheet**

Replace the entire contents of `src/components/AgentDecoration.css`:

```css
/*
 * Hero cluster. Everything here is CSS-driven: the old orbit ran on
 * requestAnimationFrame and re-rendered React every frame.
 */

.agent-decoration-wrapper {
  position: absolute;
  width: 250px;
  height: 180px;
  z-index: 2;
  pointer-events: none;
  --agent-mascot-fill: #d7d7dc;
  animation: agentFloat 8s ease-in-out infinite;
  animation-delay: var(--float-delay, 0s);
}

@keyframes agentFloat {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-14px); }
}

.agent-mascot-slot {
  position: absolute;
  left: 90px;
  top: 54px;
}

.agent-mascot { display: block; }

.agent-eye {
  transform-origin: center;
  transform-box: fill-box;
  animation: agentBlink 5.2s infinite;
  animation-delay: var(--float-delay, 0s);
}

@keyframes agentBlink {
  0%, 46%, 54%, 100% { transform: scaleY(1); }
  50%                { transform: scaleY(0.1); }
}

.agent-chip {
  position: absolute;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #ececef;
  box-shadow: 0 3px 10px rgba(15, 23, 42, 0.09);
}

.agent-chip.is-ambient { opacity: 0.85; }

.agent-cursor {
  position: absolute;
  left: 30px;
  top: 96px;
  z-index: 4;
  display: flex;
  align-items: flex-start;
  animation: agentCursorWobble 6.4s ease-in-out infinite;
  animation-delay: var(--cursor-delay, 0s);
}

@keyframes agentCursorWobble {
  0%, 100% { transform: translate(0, 0); }
  25%      { transform: translate(9px, -7px); }
  50%      { transform: translate(-5px, 6px); }
  75%      { transform: translate(7px, 3px); }
}

.agent-cursor-label {
  margin-left: -3px;
  margin-top: 9px;
  padding: 2px 8px;
  border-radius: 6px;
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  white-space: nowrap;
}

/*
 * The old component animated `transform` in the float keyframe while also
 * setting `transform: scale()` inline, so the scale prop never took effect.
 * There is no scale prop now, and this block honours the OS preference the
 * previous version ignored entirely.
 */
@media (prefers-reduced-motion: reduce) {
  .agent-decoration-wrapper,
  .agent-eye,
  .agent-cursor {
    animation: none;
  }
}
```

- [ ] **Step 5: Run the test and verify it passes**

Run: `npx vitest run src/components/AgentDecoration.test.jsx`
Expected: PASS, all eight cases.

- [ ] **Step 6: Confirm the rAF loop is gone**

Run: `grep -n "requestAnimationFrame\|useState\|useEffect" src/components/AgentDecoration.jsx`
Expected: **no output.** Any match means the orbit survived the rewrite.

- [ ] **Step 7: Run the full suite**

Run: `npm test`
Expected: `HeroAnimated` still passes the old props, which the new component ignores, so nothing throws — but the hero renders no chips until Task 5. That is expected mid-flight. Report complete — **do not commit.**

---

### Task 5: Rewrite the `HeroAnimated` cluster data

Feed the new component shape: four clusters, six real logos each, one cursor apiece.

**Files:**
- Modify: `src/components/HeroAnimated.jsx:6-76`
- Test: `src/components/HeroAnimated.test.jsx` *(create)*

**Interfaces:**
- Consumes: `AgentDecoration({ logos, mascot, position, cursor, delay })` from Task 4.
- Produces: nothing consumed downstream. `Home.jsx` renders `<HeroAnimated />` with no props, unchanged.

- [ ] **Step 1: Write the failing test**

Create `src/components/HeroAnimated.test.jsx`. `HeroAnimated` renders `<Link>`, so it needs a router:

```jsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HeroAnimated from './HeroAnimated'

const renderHero = () =>
  render(<MemoryRouter><HeroAnimated /></MemoryRouter>)

describe('HeroAnimated', () => {
  it('renders four clusters', () => {
    const { container } = renderHero()
    expect(container.querySelectorAll('.agent-decoration-wrapper')).toHaveLength(4)
  })

  it('renders 24 real logo chips across the clusters', () => {
    const { container } = renderHero()
    const chips = container.querySelectorAll('.agent-chip')
    expect(chips).toHaveLength(24)
    chips.forEach((chip) => expect(chip.querySelector('svg')).toBeInTheDocument())
  })

  it('renders one named cursor per cluster', () => {
    const { getByText } = renderHero()
    ;['Katherine', 'Aron', 'Marcelo', 'Rahul'].forEach((name) =>
      expect(getByText(name)).toBeInTheDocument()
    )
  })

  it('uses all four mascot silhouettes', () => {
    const { container } = renderHero()
    ;[0, 1, 2, 3].forEach((i) =>
      expect(container.querySelector(`[data-mascot="${i}"]`)).toBeInTheDocument()
    )
  })

  it('keeps the headline and both calls to action', () => {
    const { getByText, getByRole } = renderHero()
    expect(getByText(/by your team/)).toBeInTheDocument()
    expect(getByRole('link', { name: /Start building for free/ })).toBeInTheDocument()
    expect(getByRole('link', { name: /Watch demo/ })).toBeInTheDocument()
  })

  it('keeps the decorations hidden below the desktop breakpoint', () => {
    const { container } = renderHero()
    expect(container.querySelector('.hero-decorations').classList.contains('desktop-only')).toBe(true)
  })
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npx vitest run src/components/HeroAnimated.test.jsx`
Expected: FAIL on the chip count — the old data passes `badges`, which the new `AgentDecoration` ignores, so 0 chips render.

- [ ] **Step 3: Replace the data array and the render loop**

In `src/components/HeroAnimated.jsx`, replace the `decorations` array (lines 6-59) and the `.map()` block (lines 64-75) with:

```jsx
  // Six real integrations per cluster. Indices 0-3 are the prominent chips,
  // 4-5 sit further out and dimmer. Every name resolves in brandIcons.jsx.
  const decorations = [
    {
      id: 'cluster-1',
      mascot: 0,
      position: { top: '34px', left: '2px' },
      logos: ['facebook', 'googlegemini', 'hubspot', 'whatsapp', 'googlesheets', 'telegram'],
      cursor: { name: 'Katherine', color: '#E8388A' },
      delay: 0,
    },
    {
      id: 'cluster-2',
      mascot: 1,
      position: { top: '20px', right: '2px' },
      logos: ['shopify', 'razorpay', 'zoho', 'whatsapp', 'stripe', 'woocommerce'],
      cursor: { name: 'Aron', color: '#EAB308' },
      delay: 0.5,
    },
    {
      id: 'cluster-3',
      mascot: 2,
      position: { bottom: '26px', left: '30px' },
      logos: ['gmail', 'anthropic', 'slack', 'googlesheets', 'zendesk', 'discord'],
      cursor: { name: 'Marcelo', color: '#8B5CF6' },
      delay: 1,
    },
    {
      id: 'cluster-4',
      mascot: 3,
      position: { bottom: '16px', right: '30px' },
      logos: ['calendly', 'zoom', 'mongodb', 'slack', 'googlemeet', 'telegram'],
      cursor: { name: 'Rahul', color: '#F97316' },
      delay: 1.5,
    },
  ]
```

And the render loop:

```jsx
        {decorations.map((dec) => (
          <AgentDecoration
            key={dec.id}
            logos={dec.logos}
            mascot={dec.mascot}
            position={dec.position}
            cursor={dec.cursor}
            delay={dec.delay}
          />
        ))}
```

Leave the `<section>`, `.hero-content-wrapper`, headline, subtitle and both `<Link>` CTAs exactly as they are.

- [ ] **Step 4: Run the test and verify it passes**

Run: `npx vitest run src/components/HeroAnimated.test.jsx`
Expected: PASS, all six cases.

A chip count below 24 means a logo name failed to resolve in `brandIcons.jsx` and was silently filtered out. To find which, add this temporary case to `src/utils/brandIcons.test.jsx`, run it, read the failure, then delete it:

```jsx
it('TEMP — every hero logo resolves', () => {
  const all = [
    'facebook', 'googlegemini', 'hubspot', 'whatsapp', 'googlesheets', 'telegram',
    'shopify', 'razorpay', 'zoho', 'stripe', 'woocommerce',
    'gmail', 'anthropic', 'slack', 'zendesk', 'discord',
    'calendly', 'zoom', 'mongodb', 'googlemeet',
  ]
  expect(all.filter((n) => !getBrandIcon(n))).toEqual([])
})
```

The assertion prints the unresolved names directly in the diff.

- [ ] **Step 5: Run the full suite**

Run: `npm test`
Expected: PASS. Report complete — **do not commit.**

---

### Task 6: Promote and rebuild the templates section

Move it above `CustomerLogos`, swap in the four strong templates with numeric ids, replace the two flat app icons with `NodeChain`, and delete the inline icon switch.

**Files:**
- Modify: `src/pages/Home.jsx` — data at 14-49, `getAppIcon` at 51-95, section markup at ~127-152, section order at ~105-125
- Modify: `src/pages/Home.css` — the `.template-apps` rule
- Test: `src/pages/Home.test.jsx` *(create)*

**Interfaces:**
- Consumes: `NodeChain({ nodes, size, gap })` from Task 3.
- Produces: nothing downstream.

- [ ] **Step 1: Write the failing test**

Create `src/pages/Home.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

const renderHome = () => render(<MemoryRouter><Home /></MemoryRouter>)

describe('Home — popular workflows section', () => {
  it('renders the four templates', () => {
    const { getByText } = renderHome()
    ;[
      'Lead → WhatsApp in 5 seconds',
      'Paid order → invoice → WhatsApp',
      'AI drafts, you approve',
      'Support ticket → AI triage',
    ].forEach((title) => expect(getByText(title)).toBeInTheDocument())
  })

  it('draws a real node chain on every card', () => {
    const { container } = renderHome()
    const chains = container.querySelectorAll('.templates-grid .nc')
    expect(chains).toHaveLength(4)
    chains.forEach((chain) => expect(chain.querySelectorAll('.nc-disc')).toHaveLength(4))
  })

  it('places the templates section before the customer logos', () => {
    const { container } = renderHome()
    const templates = container.querySelector('.templates-section')
    const logos = container.querySelector('.customer-logos, .customer-logos-section')
    expect(templates).toBeInTheDocument()
    expect(logos).toBeInTheDocument()
    // Node.DOCUMENT_POSITION_FOLLOWING === 4
    expect(templates.compareDocumentPosition(logos) & 4).toBeTruthy()
  })

  it('shows no zero-value usage counts', () => {
    const { container } = renderHome()
    expect(container.querySelector('.templates-section').textContent).not.toMatch(/0 uses/)
  })

  it('offers only categories that match a template', () => {
    const { container } = renderHome()
    const tabs = [...container.querySelectorAll('.template-tabs .tab-btn')].map((b) => b.textContent.trim())
    expect(tabs).toEqual(['All', 'Lead capture', 'E-commerce', 'AI', 'Customer support'])
  })

  it('titles the section by what the reader gets, not by what it is called', () => {
    const { getByText, queryByText } = renderHome()
    expect(getByText('Start from a workflow that already works')).toBeInTheDocument()
    expect(getByText(/Four of the most-used templates/)).toBeInTheDocument()
    expect(queryByText('Featured Templates')).toBeNull()
  })
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npx vitest run src/pages/Home.test.jsx`
Expected: FAIL on the first case — the live titles are `Lead capture — Google Sheet` and friends.

If it instead fails to render at all, check which child component threw; `Home` mounts five section components and any of them may need the router that `MemoryRouter` already provides.

- [ ] **Step 3: Replace the template data and categories**

In `src/pages/Home.jsx`, replace the `categories` and `templates` declarations (lines 12-49) with:

```jsx
  const categories = ['All', 'Lead capture', 'E-commerce', 'AI', 'Customer support']

  // Numeric ids, matching src/data/TemplateFlowData.js and the parseInt in
  // TemplateFlowPage.jsx. The slug ids these replaced parsed to NaN, so every
  // Use button landed on "Template not found".
  //
  // `chain` is an abridged four-disc summary; `steps` is the template's real
  // node count, so a card can read "6 steps" beside four discs.
  const templates = [
    {
      id: 6,
      category: 'Lead capture',
      title: 'Lead → WhatsApp in 5 seconds',
      description: 'A form submission is categorised by AI, saved to HubSpot, answered on WhatsApp, then handed to the next salesperson in the rota.',
      chain: ['webhook-trigger', 'ai', 'hubspot', 'whatsapp'],
      steps: 5,
    },
    {
      id: 2,
      category: 'E-commerce',
      title: 'Paid order → invoice → WhatsApp',
      description: 'A paid Shopify order raises a Zoho Books invoice, confirms on WhatsApp, books the shipment and logs the order to a sheet.',
      chain: ['shopify', 'zoho', 'whatsapp', 'google-sheets'],
      steps: 5,
    },
    {
      id: 4,
      category: 'AI',
      title: 'AI drafts, you approve',
      description: 'New mail is read by AI, spam is archived, the rest is categorised and a reply drafted — then a person approves before anything is sent.',
      chain: ['gmail', 'ai', 'approval', 'gmail'],
      steps: 6,
    },
    {
      id: 3,
      category: 'Customer support',
      title: 'Support ticket → AI triage',
      description: 'A new helpdesk ticket is categorised by AI, urgent ones alert the team, it goes to the next agent in the rota, and the customer gets an acknowledgement.',
      chain: ['zendesk', 'ai', 'if', 'slack'],
      steps: 6,
    },
  ]
```

- [ ] **Step 4: Delete `getAppIcon` and import `NodeChain`**

Delete the entire `getAppIcon` function (lines 51-95). Add to the imports at the top of the file:

```jsx
import NodeChain from '../components/NodeChain'
```

- [ ] **Step 5: Update the section heading and card markup**

First the heading. "Featured Templates" names the section after itself; the spec's wording says what the reader gets. Replace the `.section-header` block:

```jsx
          <div className="section-header">
            <div className="section-heading-group">
              <h2 className="section-title">Start from a workflow that already works</h2>
              <p className="section-subtitle">Four of the most-used templates. Open one, connect your accounts, run it.</p>
            </div>
            <div className="template-tabs">
```

The closing `</div>` for `.section-heading-group` goes immediately after the `</h2>`/`</p>` pair — do not wrap the tabs in it.

Then replace the `.template-header` block and the footer inside the `templates.map(...)`:

```jsx
              <div key={template.id} className="template-card">
                <div className="template-header">
                  <div className="template-apps">
                    <NodeChain nodes={template.chain} size={40} gap={20} />
                  </div>
                </div>

                <div className="template-content">
                  <span className="template-category">{template.category}</span>
                  <h3 className="template-title">{template.title}</h3>
                  <p className="template-description">{template.description}</p>

                  <div className="template-footer">
                    <span className="template-meta">{template.steps} steps</span>
                    <button className="btn-use" onClick={() => navigate(`/template/${template.id}`)}>Use</button>
                  </div>
                </div>
              </div>
```

The filter above it compares against the uppercased category today. The new data is title-case, so make the comparison case-insensitive on both sides:

```jsx
            {templates.filter(t => activeTab === 'All' || t.category.toLowerCase() === activeTab.toLowerCase()).map((template) => (
```

- [ ] **Step 6: Move the section**

In the returned JSX, cut the entire `{/* Templates Section */}` `<section className="templates-section">…</section>` block and paste it immediately after `<HeroAnimated />`. The order becomes:

```jsx
    <div className="home-page">
      <HeroAnimated />

      {/* Popular workflows — promoted above the fold-adjacent sections so a
          visitor sees what gets built before they see who else builds it. */}
      <section className="templates-section">
        …
      </section>

      // <CustomerLogos />
      <AgentsShowcase />
      <AIAgentsFeatureSection />
      <IntegrationsShowcase />

      {/* Stats Section */}
      …
```

- [ ] **Step 7: Restyle the chain row**

In `src/pages/Home.css`, find `.template-apps` (near line 152) and replace its rule body with:

```css
.template-apps {
  display: flex;
  align-items: center;
  min-height: 46px;
}
```

Then delete the `.template-card:hover .app-icon` rule near line 170 — `.app-icon` no longer exists, and a dead selector invites someone to "fix" it later.

Add the subtitle rule introduced in Step 5. Read the existing `.section-title` rule first and match its left alignment and colour tokens:

```css
.section-heading-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.section-subtitle {
  font-size: 15px;
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 52ch;
}
```

If `.section-header` is currently `display: flex` with the title and tabs as its two children, the new wrapper keeps that layout intact — the group is simply the first child now. Confirm in the browser at Step 8 that the tabs have not jumped to a new line.

- [ ] **Step 8: Run the test and verify it passes**

Run: `npx vitest run src/pages/Home.test.jsx`
Expected: PASS, all six cases.

If the section-order case fails, check the class name `CustomerLogos` actually renders — the test accepts either `.customer-logos` or `.customer-logos-section`. If it uses a third name, read `src/components/CustomerLogos.jsx` and update the selector in the test to match.

- [ ] **Step 9: Run the full suite**

Run: `npm test`
Expected: PASS. Report complete — **do not commit.**

---

### Task 7: Verification pass

Everything above is unit-tested. This task confirms the things unit tests cannot see: real rendering, real navigation, real motion.

**Files:** none modified. This task only reports.

**Interfaces:**
- Consumes: the finished work of Tasks 1-6.
- Produces: a pass/fail report. Any failure here goes back to the owning task.

- [ ] **Step 1: Full suite**

Run: `npm test`
Expected: PASS, and the total is **at least 212** — the count before this work. A lower number means a test file stopped being collected.

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: exit 0. The existing "chunk larger than 500 kB" warning is pre-existing and not a failure.

- [ ] **Step 3: Confirm the dead code is gone**

Run:
```bash
grep -rn "requestAnimationFrame" src/components/AgentDecoration.jsx
grep -rn "getAppIcon" src/pages/Home.jsx
grep -rn "app-icon" src/pages/Home.css
```
Expected: **no output from any of the three.**

- [ ] **Step 4: Start the dev server and check the hero**

Run: `npm run dev`
Open the site at 1440 px wide and confirm:
- Four clusters, six chips each, every chip a recognisable logo — no letters, no `?`, no blank circles.
- Mascots are small and grey, eyes blink, clusters drift vertically out of phase.
- One named cursor per cluster.
- No chip overlaps the headline text illegibly.

- [ ] **Step 5: Check the breakpoints**

Resize to 1280 px: confirm the chips still clear the headline. Resize to 1023 px: confirm the decorations disappear entirely (`.desktop-only`) and the headline is undisturbed.

- [ ] **Step 6: Check the templates section**

Confirm it sits directly under the hero, above the customer logos. Each card shows four discs joined by animated dashed edges, the first disc carries the amber bolt, and the footer reads `N steps` with no `uses` figure.

- [ ] **Step 7: Click all four Use buttons**

This is the fix for the pre-existing `NaN` bug, so verify it rather than assume it. Click `Use` on each card and confirm a real template page renders — **not** the "Template not found" screen.

Expected destinations: `/template/6`, `/template/2`, `/template/4`, `/template/3`.

- [ ] **Step 8: Check reduced motion**

In Chrome DevTools: Rendering panel → "Emulate CSS media feature prefers-reduced-motion" → `reduce`.
Expected: cluster float, eye blink, cursor wobble and the node-chain dashes all stop. Nothing disappears or shifts position.

- [ ] **Step 9: Report**

Report which steps passed and which failed, with the actual command output for any failure. Do not claim completion on a step that was skipped. **Do not commit** — hand back to the user.

---

## Notes for the reviewer

**CLAUDE.md's nine-section requirement.** This is a frontend-only change. Stated explicitly rather than omitted:

| Section | Impact |
|---|---|
| Functional requirements | Hero shows real integration marks; four strong templates visible under the hero with working links. |
| Missing functionality | Six brands absent from `brandIcons.jsx`; five node types absent from `docsNodeIcons.jsx`; no node-chain renderer. |
| Backend impact | **None.** No API, service or worker touched. |
| Frontend impact | Tasks 1-6 — two registries extended, one component added, `AgentDecoration` rewritten, `HeroAnimated` and `Home` re-data'd. |
| Database impact | **None.** |
| API impact | **None.** No endpoint added or changed. |
| Permission impact | **None.** All content is public and unauthenticated. |
| Analytics impact | **None added.** Worth noting for later: the four `Use` buttons have been sending every visitor to a "Template not found" page, so any historical funnel data from the homepage templates section is measuring a broken flow. |
| Rollout | No flag. Static frontend, ships with the next deploy, reverts by reverting the diff. Per `feedback_no_pointless_flags`, a flag here would be maintenance surface for behaviour that is simply correct. |
