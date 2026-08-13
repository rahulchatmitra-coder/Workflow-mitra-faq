# Agents Showcase → Popular Automations (flow canvas) — Implementation Plan

> **For agentic workers:** Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the showcase section's chat-transcript right column with a live node-flow canvas, and re-data the left column as five popular automations.

**Architecture:** The left column (accordion, progress rail, avatar stack, auto-cycle) is kept as-is and only re-data'd. The right column's chat card and static bar card are replaced by a new `FlowCanvas` component plus a run-status card driven by the same step index, so one piece of state animates both.

**Tech Stack:** React 18, Vitest + `@testing-library/react`, co-located CSS. Node marks come from the existing `docsNodeIcons.jsx` / `brandIcons.jsx` registries extended in the hero work — no new icon source.

**Mock:** approved — variant **C** (status + counters), title **"Popular automations, running in minutes"**.

## Global Constraints

- **Do not commit.** Report each task complete; the user commits.
- **No new dependencies.**
- Left-column CSS (`.agents-section` … `.progress-fill`) is untouched. Only `.chat-card` … `.wau-axis` is replaced.
- Theme tokens stay verbatim: `--card-shadow`, the three-stop `.demo-glow`, `--blue: #3b82f6`, card radius 18px / 14px, `1px solid var(--gray-300)`.
- Telemetry figures are **invented demo values**. They live in one exported constant with a comment saying so, so they are trivial to replace or delete.
- `prefers-reduced-motion` must stop the wire dashes, the payload transition and the pulse.

---

### Task 1: Re-data `agentsShowcaseData.jsx`

**Files:**
- Modify: `src/data/agentsShowcaseData.jsx` *(full rewrite)*
- Test: `src/data/agentsShowcaseData.test.js` *(create)*

**Interfaces:**
- Produces: `agentsShowcaseData` — array of 5 objects:
  `{ id, name, desc, icon, color, integrations[], teamLabel, cardTitle, nodes{n1..n5:{type,label}}, tags{}, steps[5], payloads[4], json, live:{runs, ok, avg, unit, dur[5]} }`.
  The `question / lead / callouts / table / stat` fields are removed.

- [ ] **Step 1: Write the failing test**

Create `src/data/agentsShowcaseData.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { agentsShowcaseData } from './agentsShowcaseData'

const NODE_KEYS = ['n1', 'n2', 'n3', 'n4', 'n5']

describe('agentsShowcaseData', () => {
  it('has the five popular automations', () => {
    expect(agentsShowcaseData.map((a) => a.id))
      .toEqual(['support', 'meeting', 'calls', 'data', 'leads'])
  })

  it('gives every automation a five-node graph', () => {
    agentsShowcaseData.forEach((a) => {
      expect(Object.keys(a.nodes)).toEqual(NODE_KEYS)
      NODE_KEYS.forEach((k) => {
        expect(a.nodes[k].type).toBeTruthy()
        expect(a.nodes[k].label).toBeTruthy()
      })
    })
  })

  it('gives every automation one step caption per node and one payload per hop', () => {
    agentsShowcaseData.forEach((a) => {
      expect(a.steps).toHaveLength(5)
      expect(a.payloads).toHaveLength(4)
    })
  })

  it('carries demo telemetry with a per-step duration for each node', () => {
    agentsShowcaseData.forEach((a) => {
      expect(a.live.dur).toHaveLength(5)
      expect(a.live.runs).toBeGreaterThan(0)
      expect(a.live.ok).toBeGreaterThan(90)
      expect(a.live.unit).toBeTruthy()
    })
  })

  it('drops the old chat-transcript fields', () => {
    agentsShowcaseData.forEach((a) => {
      expect(a.question).toBeUndefined()
      expect(a.table).toBeUndefined()
      expect(a.callouts).toBeUndefined()
    })
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

Run: `npx vitest run src/data/agentsShowcaseData.test.js`
Expected: FAIL on the id list — currently `data-analysis, support, crm, meeting-prep, call-analysis`.

- [ ] **Step 3: Rewrite the data file**

Replace the whole file. Node `type` values must resolve in `docsNodeIcons.jsx`; `webhook-trigger`, `ai`, `if`, `slack`, `gmail`, `whatsapp`, `google-sheets`, `hubspot`, `zendesk` already exist there. `calendly`, `googlemeet`, `postgresql`, `assign` and `call` are added in Task 2.

```jsx
import { FaCommentDots, FaRegCalendarCheck, FaPhoneAlt, FaChartBar, FaBolt } from 'react-icons/fa'

/**
 * The five automations shown in the showcase. Each maps to a real curated
 * template and uses real node types — the graph is abridged to five discs, the
 * `live.dur` array is the per-step timing the run-status card counts through.
 *
 * NOTE: `live` figures are DEMO VALUES, not platform telemetry. They exist to
 * make the card feel like a running system. Replace them with real numbers or
 * remove the card's counters before treating them as a public claim.
 */
export const agentsShowcaseData = [
  {
    id: 'support',
    name: 'Support Agent',
    desc: 'Reads every new ticket, decides how urgent it is, and gets it to the right person.',
    icon: <FaCommentDots />,
    color: '#10B981',
    integrations: ['Zendesk', 'Slack'],
    teamLabel: 'Support',
    cardTitle: 'Support ticket triage',
    nodes: {
      n1: { type: 'zendesk', label: 'New ticket' },
      n2: { type: 'ai', label: 'AI triage' },
      n3: { type: 'if', label: 'Urgent?' },
      n4: { type: 'slack', label: 'Alert #support' },
      n5: { type: 'assign', label: 'Assign agent' },
    },
    tags: { n4: 'urgent', n5: 'else' },
    steps: [
      'Zendesk fires on ticket.created',
      'Claude reads it and scores urgency',
      'Routes on urgency = high',
      'Posts to the on-call channel',
      'Hands to next agent in rota',
    ],
    payloads: ['ticket_id: 8841', 'subject, body', 'urgency: "high"', '→ #support-urgent'],
    json: '{ ticket_id, subject, urgency }',
    live: { runs: 1284, ok: 99.4, avg: 4.2, unit: 'tickets', dur: [0.2, 2.4, 0.1, 0.9, 0.6] },
  },
  {
    id: 'meeting',
    name: 'Meeting automation',
    desc: 'Turns a booking into a room, an invite and a logged record — before you open your laptop.',
    icon: <FaRegCalendarCheck />,
    color: '#8B5CF6',
    integrations: ['Calendly', 'Google Meet'],
    teamLabel: 'Sales',
    cardTitle: 'Meeting scheduling',
    nodes: {
      n1: { type: 'calendly', label: 'Booking made' },
      n2: { type: 'googlemeet', label: 'Create room' },
      n3: { type: 'gmail', label: 'Send invite' },
      n4: { type: 'google-sheets', label: 'Log meeting' },
      n5: { type: 'slack', label: 'Notify owner' },
    },
    tags: {},
    steps: [
      'Calendly webhook on invitee.created',
      'Google Meet room is created',
      'Invite goes out with the link',
      'Row appended to the tracker',
      'Owner pinged in Slack',
    ],
    payloads: ['invitee, start_time', 'meet_link', 'calendar_event_id', '→ #sales'],
    json: '{ invitee, start_time, meet_link }',
    live: { runs: 412, ok: 99.8, avg: 3.1, unit: 'meetings', dur: [0.1, 1.1, 0.8, 0.6, 0.5] },
  },
  {
    id: 'calls',
    name: 'Calling automation',
    desc: 'Every call ends with a written summary in the CRM and a note to the team.',
    icon: <FaPhoneAlt />,
    color: '#F97316',
    integrations: ['HubSpot', 'Slack'],
    teamLabel: 'Sales',
    cardTitle: 'Call follow-up',
    nodes: {
      n1: { type: 'call', label: 'Call ended' },
      n2: { type: 'ai', label: 'Summarise' },
      n3: { type: 'hubspot', label: 'Log to CRM' },
      n4: { type: 'slack', label: 'Share summary' },
      n5: { type: 'gmail', label: 'Send recap' },
    },
    tags: {},
    steps: [
      'Webhook fires when the call hangs up',
      'Claude summarises the transcript',
      'Note attached to the CRM deal',
      'Summary posted to the team',
      'Recap emailed to the prospect',
    ],
    payloads: ['call_id, duration', 'summary, next_step', 'deal_id', '→ prospect'],
    json: '{ call_id, duration, summary }',
    live: { runs: 867, ok: 98.9, avg: 6.8, unit: 'calls', dur: [0.2, 4.1, 0.9, 0.8, 0.8] },
  },
  {
    id: 'data',
    name: 'Data analysis automation',
    desc: 'Pulls the numbers every morning, writes the summary, and posts it before standup.',
    icon: <FaChartBar />,
    color: '#3B82F6',
    integrations: ['PostgreSQL', 'Slack'],
    teamLabel: 'Data',
    cardTitle: 'Daily data digest',
    nodes: {
      n1: { type: 'schedule', label: '9:00 AM' },
      n2: { type: 'postgresql', label: 'Query metrics' },
      n3: { type: 'ai', label: 'Summarise' },
      n4: { type: 'slack', label: 'Post digest' },
      n5: { type: 'google-sheets', label: 'Append row' },
    },
    tags: {},
    steps: [
      'Schedule fires at 09:00 IST',
      'Runs the metrics query',
      'Claude writes a plain-English digest',
      'Posted to the leadership channel',
      'Same numbers appended for history',
    ],
    payloads: ['—', 'signups: 412', 'churn 1.8% · mrr ₹8.4L', '→ #leadership'],
    json: '{ signups, churn, mrr }',
    live: { runs: 96, ok: 100, avg: 9.4, unit: 'reports', dur: [0.1, 3.2, 4.6, 0.9, 0.6] },
  },
  {
    id: 'leads',
    name: 'Lead capture → conversion',
    desc: 'Scores every form submission and answers the hot ones on WhatsApp within seconds.',
    icon: <FaBolt />,
    color: '#E8388A',
    integrations: ['HubSpot', 'WhatsApp'],
    teamLabel: 'Growth',
    cardTitle: 'Lead capture → conversion',
    nodes: {
      n1: { type: 'webhook-trigger', label: 'Form submit' },
      n2: { type: 'ai', label: 'Qualify + score' },
      n3: { type: 'if', label: 'Score > 70?' },
      n4: { type: 'whatsapp', label: 'WhatsApp in 5s' },
      n5: { type: 'gmail', label: 'Nurture sequence' },
    },
    tags: { n4: 'hot', n5: 'else' },
    steps: [
      'Your site form posts to the webhook',
      'Claude scores intent and fit',
      'Splits hot leads from the rest',
      'Hot leads get an instant WhatsApp',
      'The rest enter the email sequence',
    ],
    payloads: ['name, phone', 'score: 82', 'intent: "pricing"', '→ +91 98•• ••••'],
    json: '{ name, phone, score, intent }',
    live: { runs: 2318, ok: 99.6, avg: 2.6, unit: 'leads', dur: [0.1, 1.2, 0.1, 0.8, 0.4] },
  },
]
```

- [ ] **Step 4: Verify it passes, then the suite**

Run: `npx vitest run src/data/agentsShowcaseData.test.js` → PASS (5 cases).
Run: `npm test` → the existing `AgentsShowcase` render will now break if anything else asserts on the old fields. Note any failure; Task 3 fixes the component.

---

### Task 2: Add the five missing node marks

`calendly`, `googlemeet`, `postgresql`, `assign` and `call` are referenced by Task 1 but absent from `docsNodeIcons.jsx`, where a miss silently renders a black `Blocks` disc.

**Files:**
- Modify: `src/components/docs/icons/docsNodeIcons.jsx`
- Modify: `src/components/docs/icons/docsNodeIcons.test.jsx`

**Interfaces:**
- Produces: `nodeDiscBg` / `DocsNodeIcon` resolve `calendly` `#006BFF`, `googlemeet` `#00897B`, `postgresql` `#4169E1`, `assign` `#ff9e43`, `call` `#0A0A0A`, `schedule` `#0A0A0A`.

- [ ] **Step 1: Extend the existing test**

Add these rows to the existing `it.each` colour table in `docsNodeIcons.test.jsx`:

```jsx
    ['calendly', '#006BFF'],
    ['googlemeet', '#00897B'],
    ['postgresql', '#4169E1'],
    ['assign', '#ff9e43'],
    ['call', '#0A0A0A'],
    ['schedule', '#0A0A0A'],
```

And extend the render `it.each` list to `['if', 'approval', 'hubspot', 'zoho', 'zendesk', 'calendly', 'googlemeet', 'postgresql', 'assign', 'call', 'schedule']`.

- [ ] **Step 2: Run and verify it fails**

Run: `npx vitest run src/components/docs/icons/docsNodeIcons.test.jsx`
Expected: FAIL — the six new colour rows return `#0A0A0A` (or the wrong hex).

- [ ] **Step 3: Add the marks**

Extend the imports:

```jsx
import {
  SiWhatsapp, SiTelegram, SiDiscord, SiGmail, SiGooglesheets, SiShopify,
  SiHubspot, SiZoho, SiZendesk, SiCalendly, SiGooglemeet, SiPostgresql,
} from 'react-icons/si'
import {
  Globe, Sparkles, Blocks, MousePointerClick, Zap, GitBranch, UserCheck,
  Users, PhoneCall, Clock,
} from 'lucide-react'
```

Add to `BRAND`:

```jsx
  calendly: { Icon: SiCalendly, hex: '#006BFF' },
  googlemeet: { Icon: SiGooglemeet, hex: '#00897B' },
  postgresql: { Icon: SiPostgresql, hex: '#4169E1' },
```

Add to `LUCIDE`:

```jsx
  assign: { Icon: Users, hex: '#ff9e43' },
  call: { Icon: PhoneCall, hex: '#0A0A0A' },
  schedule: { Icon: Clock, hex: '#0A0A0A' },
```

- [ ] **Step 4: Verify**

Run: `npx vitest run src/components/docs/icons/docsNodeIcons.test.jsx` → PASS.
Run: `npm test`.

---

### Task 3: Build `FlowCanvas`

The animated graph: five discs on a fixed skeleton, bezier wires, a payload chip riding the active hop.

**Files:**
- Create: `src/components/FlowCanvas.jsx`, `src/components/FlowCanvas.css`
- Test: `src/components/FlowCanvas.test.jsx`

**Interfaces:**
- Consumes: `nodeDiscBg`, `DocsNodeIcon` from `./docs/icons/docsNodeIcons`.
- Produces: `export default function FlowCanvas({ nodes, tags = {}, payloads = [], step = 0 })`.
  `nodes` is the `{n1..n5}` map. Renders `.fc-node` per node with `data-node` and a state class
  (`is-on` / `is-done` / `is-idle`), four `.fc-wire` paths, a `.fc-tag` per entry in `tags`, and a
  `.fc-payload` when `step > 0`. Layout constants live here, not in the caller.

- [ ] **Step 1: Write the failing test**

Create `src/components/FlowCanvas.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import FlowCanvas from './FlowCanvas'

const NODES = {
  n1: { type: 'zendesk', label: 'New ticket' },
  n2: { type: 'ai', label: 'AI triage' },
  n3: { type: 'if', label: 'Urgent?' },
  n4: { type: 'slack', label: 'Alert #support' },
  n5: { type: 'assign', label: 'Assign agent' },
}
const PAYLOADS = ['ticket_id: 8841', 'subject, body', 'urgency: "high"', '→ #support-urgent']

describe('FlowCanvas', () => {
  it('renders all five nodes with their labels', () => {
    const { container, getByText } = render(<FlowCanvas nodes={NODES} />)
    expect(container.querySelectorAll('.fc-node')).toHaveLength(5)
    expect(getByText('Urgent?')).toBeInTheDocument()
  })

  it('renders four wires', () => {
    const { container } = render(<FlowCanvas nodes={NODES} />)
    expect(container.querySelectorAll('.fc-wire')).toHaveLength(4)
  })

  it('marks exactly one node as executing', () => {
    const { container } = render(<FlowCanvas nodes={NODES} step={2} />)
    const on = container.querySelectorAll('.fc-node.is-on')
    expect(on).toHaveLength(1)
    expect(on[0].getAttribute('data-node')).toBe('n3')
  })

  it('treats earlier nodes as done and later ones as idle', () => {
    const { container } = render(<FlowCanvas nodes={NODES} step={2} />)
    expect(container.querySelector('[data-node="n1"]').classList.contains('is-done')).toBe(true)
    expect(container.querySelector('[data-node="n5"]').classList.contains('is-idle')).toBe(true)
  })

  it('shows no payload on the first step and the right one after', () => {
    const { container: a } = render(<FlowCanvas nodes={NODES} payloads={PAYLOADS} step={0} />)
    expect(a.querySelector('.fc-payload')).toBeNull()

    const { container: b } = render(<FlowCanvas nodes={NODES} payloads={PAYLOADS} step={2} />)
    expect(b.querySelector('.fc-payload').textContent).toBe('subject, body')
  })

  it('renders a branch tag per entry', () => {
    const { container, getByText } = render(
      <FlowCanvas nodes={NODES} tags={{ n4: 'urgent', n5: 'else' }} />
    )
    expect(container.querySelectorAll('.fc-tag')).toHaveLength(2)
    expect(getByText('urgent')).toBeInTheDocument()
  })

  it('colours each disc from the product registry', () => {
    const { container } = render(<FlowCanvas nodes={NODES} />)
    const disc = container.querySelector('[data-node="n3"] .fc-disc')
    expect(disc.style.background).toBe('rgb(255, 158, 67)')  // #ff9e43
  })
})
```

- [ ] **Step 2: Run and verify it fails**

Run: `npx vitest run src/components/FlowCanvas.test.jsx`
Expected: FAIL — `Failed to resolve import "./FlowCanvas"`.

- [ ] **Step 3: Write the component**

```jsx
import { DocsNodeIcon, nodeDiscBg } from './docs/icons/docsNodeIcons'
import './FlowCanvas.css'

/**
 * The showcase's node graph. One fixed skeleton carries every automation:
 * three steps in a row, then a two-way fan. The payload chip rides the hop
 * that is executing, so the data moving between nodes is visible rather than
 * implied.
 */
const ORDER = ['n1', 'n2', 'n3', 'n4', 'n5']
const POS = {
  n1: { x: 52, y: 78 }, n2: { x: 150, y: 78 }, n3: { x: 248, y: 78 },
  n4: { x: 360, y: 38 }, n5: { x: 360, y: 130 },
}
const EDGES = [['n1', 'n2'], ['n2', 'n3'], ['n3', 'n4'], ['n3', 'n5']]
const R = 22   // disc radius plus the white rim

function wirePath(from, to) {
  const s = POS[from]
  const t = POS[to]
  const midX = (s.x + t.x) / 2
  return `M${s.x + R} ${s.y} C${midX} ${s.y} ${midX} ${t.y} ${t.x - R} ${t.y}`
}

/** Which hop is carrying data on this step: 0→1, 1→2, then the branch. */
function activeHop(step) {
  if (step <= 0) return null
  if (step === 1) return ['n1', 'n2']
  if (step === 2) return ['n2', 'n3']
  return ['n3', step === 3 ? 'n4' : 'n5']
}

export default function FlowCanvas({ nodes, tags = {}, payloads = [], step = 0 }) {
  const hop = activeHop(step)
  const payload = step > 0 ? payloads[step - 1] : null

  return (
    <div className="fc-canvas">
      <svg className="fc-wires" viewBox="0 0 440 238" width="440" height="238" aria-hidden="true">
        {EDGES.map(([a, b], i) => {
          const d = wirePath(a, b)
          const hot = (i < 2 && step === i + 1) || (i >= 2 && step >= 3)
          return (
            <g key={`${a}-${b}`}>
              <path className="fc-wire" d={d} />
              <path className={`fc-ants${hot ? ' is-hot' : ''}`} d={d} />
            </g>
          )
        })}
      </svg>

      {Object.entries(tags).map(([id, label]) => (
        <span
          key={id}
          className="fc-tag"
          style={{ left: `${(POS.n3.x + POS[id].x) / 2 + 4}px`, top: `${(POS.n3.y + POS[id].y) / 2}px` }}
        >
          {label}
        </span>
      ))}

      {ORDER.map((id, i) => {
        const node = nodes[id]
        if (!node) return null
        const state = i === step ? 'is-on' : i < step || (step >= 3 && i >= 3) ? 'is-done' : 'is-idle'
        return (
          <div
            key={id}
            className={`fc-node ${state}`}
            data-node={id}
            style={{ left: `${POS[id].x}px`, top: `${POS[id].y}px` }}
          >
            <span className="fc-disc" style={{ background: nodeDiscBg(node.type) }}>
              <DocsNodeIcon type={node.type} size={17} mono />
              {i === 0 && <span className="fc-bolt" aria-hidden="true" />}
            </span>
            <span className="fc-label">{node.label}</span>
          </div>
        )
      })}

      {payload && hop && (
        <span
          className="fc-payload"
          style={{
            left: `${(POS[hop[0]].x + POS[hop[1]].x) / 2}px`,
            top: `${(POS[hop[0]].y + POS[hop[1]].y) / 2 - 24}px`,
          }}
        >
          {payload}
        </span>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Write `FlowCanvas.css`**

```css
.fc-canvas {
  position: relative;
  height: 238px;
  background-image: radial-gradient(rgba(15, 23, 42, 0.13) 1px, transparent 1px);
  background-size: 15px 15px;
}

.fc-wires { position: absolute; inset: 0; overflow: visible; }
.fc-wire  { fill: none; stroke: #cbd5e1; stroke-width: 2; opacity: 0.7; }

.fc-ants {
  fill: none; stroke: #cbd5e1; stroke-width: 2.5;
  stroke-dasharray: 0.1 8; stroke-linecap: round;
  animation: fcFlow 1.15s linear infinite;
}
.fc-ants.is-hot { stroke: #3b82f6; opacity: 1; }
@keyframes fcFlow { to { stroke-dashoffset: -16.2; } }

.fc-node {
  position: absolute; transform: translate(-50%, -50%);
  display: flex; flex-direction: column; align-items: center; width: 84px;
}

.fc-disc {
  position: relative; width: 38px; height: 38px; border-radius: 50%;
  display: grid; place-items: center; border: 2.5px solid #fff;
  box-shadow: 0 4px 12px rgba(10, 10, 10, 0.18), inset 0 2px 0 rgba(255, 255, 255, 0.26);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s, opacity 0.3s;
}

.fc-node.is-on .fc-disc {
  transform: scale(1.13);
  box-shadow: 0 0 0 5px rgba(59, 130, 246, 0.18),
              0 6px 16px rgba(10, 10, 10, 0.22),
              inset 0 2px 0 rgba(255, 255, 255, 0.26);
}
.fc-node.is-idle .fc-disc { opacity: 0.42; }

.fc-bolt {
  position: absolute; top: -4px; left: -4px; width: 13px; height: 13px;
  border-radius: 50%; background: #ff9e43; border: 2px solid #fff;
}

.fc-label {
  margin-top: 7px; font-size: 9.5px; font-weight: 650; line-height: 1.25;
  letter-spacing: -0.1px; color: #334155; text-align: center;
}
.fc-node.is-idle .fc-label { color: #a4b0c0; }

.fc-tag {
  position: absolute; transform: translate(-50%, -50%);
  font-size: 8.5px; font-weight: 700; letter-spacing: 0.04em; white-space: nowrap;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 999px;
  padding: 2px 7px; color: #64748b;
}

/* The data moving between nodes — the point of the whole canvas. */
.fc-payload {
  position: absolute; transform: translate(-50%, -50%); z-index: 5;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9.5px; font-weight: 600; white-space: nowrap;
  background: #0f172a; color: #fff; border-radius: 6px; padding: 3px 8px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.28);
  transition: left 0.85s cubic-bezier(0.4, 0, 0.2, 1), top 0.85s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (prefers-reduced-motion: reduce) {
  .fc-ants { animation: none; }
  .fc-disc, .fc-payload { transition: none; }
}
```

- [ ] **Step 5: Verify**

Run: `npx vitest run src/components/FlowCanvas.test.jsx` → PASS (7 cases).
Run: `npm test`.

---

### Task 4: Rewrite the showcase's right column

Swap the chat card and bar card for `FlowCanvas` plus the run-status card, and drive both from one step index.

**Files:**
- Modify: `src/components/AgentsShowcase.jsx`
- Modify: `src/components/AgentsShowcase.css` — replace `.chat-card` … `.wau-axis`; keep everything above `.chat-card`
- Test: `src/components/AgentsShowcase.test.jsx` *(create)*

**Interfaces:**
- Consumes: `agentsShowcaseData` (Task 1), `FlowCanvas` (Task 3).
- Produces: nothing downstream. `Home.jsx` renders `<AgentsShowcase />` with no props, unchanged.

- [ ] **Step 1: Write the failing test**

Create `src/components/AgentsShowcase.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, act } from '@testing-library/react'
import AgentsShowcase from './AgentsShowcase'

describe('AgentsShowcase', () => {
  it('titles the section by what it shows', () => {
    const { getByRole } = render(<AgentsShowcase />)
    expect(getByRole('heading', { level: 2 }).textContent).toMatch(/Popular automations/)
  })

  it('lists the five automations', () => {
    const { getByText } = render(<AgentsShowcase />)
    ;['Support Agent', 'Meeting automation', 'Calling automation',
      'Data analysis automation', 'Lead capture → conversion']
      .forEach((n) => expect(getByText(n)).toBeInTheDocument())
  })

  it('renders the flow canvas rather than a chat transcript', () => {
    const { container } = render(<AgentsShowcase />)
    expect(container.querySelector('.fc-canvas')).toBeInTheDocument()
    expect(container.querySelectorAll('.fc-node')).toHaveLength(5)
    expect(container.querySelector('.chat-card')).toBeNull()
  })

  it('shows the live run status with a step counter', () => {
    const { container } = render(<AgentsShowcase />)
    expect(container.querySelector('.sc-pill')).toBeInTheDocument()
    expect(container.querySelector('.sc-now').textContent).toMatch(/Step 1 of 5/)
  })

  it('shows the first automation active on mount', () => {
    const { container } = render(<AgentsShowcase />)
    const active = container.querySelectorAll('.agent-item.active')
    expect(active).toHaveLength(1)
    expect(active[0].textContent).toMatch(/Support Agent/)
  })

  it('switches automation when a row is clicked', () => {
    const { container, getByText } = render(<AgentsShowcase />)
    act(() => { getByText('Calling automation').closest('button').click() })
    expect(container.querySelector('.agent-item.active').textContent).toMatch(/Calling automation/)
  })
})
```

- [ ] **Step 2: Run and verify it fails**

Run: `npx vitest run src/components/AgentsShowcase.test.jsx`
Expected: FAIL — the heading still reads "Roll out specialized agents in minutes".

- [ ] **Step 3: Rewrite the component**

Keep the cycle/pause/switch machinery and the whole left column. Replace the heading, add a sub, and replace the `demo-col` contents. Add a `step` state advancing every `STEP_MS`, and a `runMs` clock:

```jsx
const CYCLE_MS = 7000
const TICK_MS = 100
const STEP_MS = 1250
const STEP_COUNT = 5
```

The `demo-col` becomes:

```jsx
        <div className="demo-col">
          <div className="demo-glow"></div>

          <div className={`flow-card ${isSwitching ? 'switching' : ''}`}>
            <div className="fcard-head">
              <span className="fcard-title">{activeAgent.cardTitle}</span>
              <span className="fcard-live"><i></i>running</span>
            </div>

            <FlowCanvas
              nodes={activeAgent.nodes}
              tags={activeAgent.tags}
              payloads={activeAgent.payloads}
              step={step}
            />

            <div className="fcard-foot">
              <span className="fcard-step">
                <b>Step {step + 1}/{STEP_COUNT}</b> · {activeAgent.steps[step]}
              </span>
              <span className="fcard-json">{activeAgent.json}</span>
            </div>
          </div>

          <div className={`stat-card ${isSwitching ? 'switching' : ''}`}>
            <div className="sc-top">
              <span className="sc-pill"><i></i>running</span>
              <span className="sc-run">#{runNo}</span>
              <span className="sc-ms">{(runMs / 1000).toFixed(1)}s</span>
            </div>
            <div className="sc-bar">
              <span style={{ width: `${Math.round(((step + 1) / STEP_COUNT) * 100)}%` }} />
            </div>
            <p className="sc-now">
              Step <b>{step + 1} of {STEP_COUNT}</b> · <b>{nodeLabels[step]}</b>
            </p>
            <div className="sc-stats">
              <div className="sc-stat">
                <span className="sc-num">{runs.toLocaleString('en-IN')} <em>▲</em></span>
                <span className="sc-cap">{activeAgent.live.unit} this week</span>
              </div>
              <div className="sc-stat">
                <span className="sc-num">{activeAgent.live.ok}%</span>
                <span className="sc-cap">succeeded</span>
              </div>
              <div className="sc-stat">
                <span className="sc-num">{activeAgent.live.avg}s</span>
                <span className="sc-cap">avg run</span>
              </div>
            </div>
          </div>
        </div>
```

where `nodeLabels = ['n1','n2','n3','n4','n5'].map((k) => activeAgent.nodes[k].label)`.

The heading block:

```jsx
          <h2>Popular automations,<br/>running in minutes</h2>
          <p className="agents-sub">
            Five flows teams start with. Every one is a real template — open it, connect your accounts, run it.
          </p>
```

Delete the `FaUserCircle` import and the `getDelay` helper; neither is used once the chat card is gone.

- [ ] **Step 4: Replace the right-column CSS**

In `AgentsShowcase.css`, delete every rule from `.chat-card` through `.wau-axis` (the `.reveal` rules go too — nothing staggers now). Keep `.demo-col` and `.demo-glow`. Add:

```css
.agents-sub {
  font-size: 15.5px;
  color: var(--gray-500);
  margin: 0 0 34px;
  max-width: 38ch;
  line-height: 1.5;
}

.flow-card {
  position: relative; z-index: 1; background: #fff; border-radius: 18px;
  box-shadow: var(--card-shadow); border: 1px solid var(--gray-300);
  max-width: 470px; overflow: hidden; transition: opacity 0.18s ease;
}
.flow-card.switching { opacity: 0; }

.fcard-head {
  display: flex; align-items: center; gap: 9px;
  padding: 14px 18px; border-bottom: 1px solid var(--gray-300);
}
.fcard-title { font-size: 13.5px; font-weight: 650; letter-spacing: -0.1px; }
.fcard-live {
  margin-left: auto; display: flex; align-items: center; gap: 6px;
  font-size: 10.5px; font-weight: 700; letter-spacing: 0.07em;
  text-transform: uppercase; color: var(--gray-500);
}
.fcard-live i {
  width: 6px; height: 6px; border-radius: 50%; background: #22c55e;
  animation: scBlip 1.5s ease-in-out infinite;
}

.fcard-foot {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 18px; border-top: 1px solid var(--gray-300); background: #fbfcfe;
}
.fcard-step { font-size: 11.5px; color: var(--gray-500); }
.fcard-step b { color: var(--ink); font-weight: 650; }
.fcard-json {
  margin-left: auto; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px; color: var(--gray-500);
  background: var(--gray-100); border-radius: 6px; padding: 3px 8px; white-space: nowrap;
}

.stat-card {
  position: absolute; right: 0; bottom: 0; z-index: 2; width: 276px;
  background: #fff; border-radius: 14px; box-shadow: var(--card-shadow);
  border: 1px solid var(--gray-300); padding: 14px 15px 12px;
  transition: opacity 0.18s ease;
}
.stat-card.switching { opacity: 0; }

.sc-top { display: flex; align-items: center; gap: 7px; margin-bottom: 11px; }
.sc-pill {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 9.5px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
  color: #0f9d58; background: #e8f7ee; border-radius: 999px; padding: 3px 8px;
}
.sc-pill i {
  width: 5px; height: 5px; border-radius: 50%; background: #0f9d58;
  animation: scBlip 1.2s ease-in-out infinite;
}
@keyframes scBlip { 0%, 100% { opacity: 1; } 50% { opacity: 0.22; } }

.sc-run { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; color: var(--gray-500); }
.sc-ms {
  margin-left: auto; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11.5px; font-weight: 700; color: var(--ink); font-variant-numeric: tabular-nums;
}

.sc-bar { height: 5px; border-radius: 999px; background: var(--gray-100); overflow: hidden; margin-bottom: 8px; }
.sc-bar span {
  display: block; height: 100%; border-radius: 999px; background: var(--blue);
  transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.sc-now { font-size: 11.5px; color: var(--gray-500); margin: 0 0 12px; }
.sc-now b { color: var(--ink); font-weight: 650; }

.sc-stats {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
  padding-top: 11px; border-top: 1px solid var(--gray-300);
}
.sc-stat { display: flex; flex-direction: column; gap: 1px; }
.sc-num {
  font-size: 15px; font-weight: 750; letter-spacing: -0.3px;
  font-variant-numeric: tabular-nums; display: flex; align-items: baseline; gap: 3px;
}
.sc-num em { font-style: normal; font-size: 9px; font-weight: 700; color: #0f9d58; }
.sc-cap { font-size: 9px; color: var(--gray-500); letter-spacing: 0.02em; }

@media (prefers-reduced-motion: reduce) {
  .fcard-live i, .sc-pill i { animation: none; }
  .sc-bar span { transition: none; }
}
```

Update the existing `@media (max-width: 860px)` block: replace `.wau-card { width: 220px; }` with `.stat-card { width: 236px; }`.

- [ ] **Step 5: Verify**

Run: `npx vitest run src/components/AgentsShowcase.test.jsx` → PASS (6 cases).
Run: `npm test` → all pass.
Run: `npm run build` → exit 0.

Confirm the old markup is gone:
```bash
grep -n "chat-card\|wau-card\|callout\|table-wrap" src/components/AgentsShowcase.jsx src/components/AgentsShowcase.css
```
Expected: no output.

---

## Notes for the reviewer

Frontend only. Backend, database, API and permission impact: **none**. No feature flag — per `feedback_no_pointless_flags`, this is a straight replacement of a marketing section.

**One open item for the user:** `live` in `agentsShowcaseData.jsx` is invented. The card presents it as running telemetry (a green "running" pill, a ticking clock, a climbing counter, "99.4% succeeded"). Either wire it to real figures or reframe the card as a sample run before treating it as a public claim. It is deliberately isolated in one object per automation so it can be swapped or dropped without touching the components.
