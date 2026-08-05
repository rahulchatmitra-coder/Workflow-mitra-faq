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
          style={{
            left: `${(POS.n3.x + POS[id].x) / 2 + 4}px`,
            top: `${(POS.n3.y + POS[id].y) / 2}px`,
          }}
        >
          {label}
        </span>
      ))}

      {ORDER.map((id, i) => {
        const node = nodes[id]
        if (!node) return null
        // Once the flow fans out, both branch ends read as done — neither is
        // "still to come" the way a linear step would be.
        const state = i === step
          ? 'is-on'
          : i < step || (step >= 3 && i >= 3) ? 'is-done' : 'is-idle'
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
