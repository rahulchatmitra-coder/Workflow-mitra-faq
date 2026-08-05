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
    .map((name, i) => ({
      name,
      spot: SPOTS[i],
      icon: getBrandIcon(name, { size: Math.round((SPOTS[i]?.size ?? 34) * 0.5) }),
    }))
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
