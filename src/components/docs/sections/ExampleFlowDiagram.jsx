// Example-flow nodes are a mix of real brand icons (e.g. 'slack',
// 'shopify') and generic, non-branded step types (a trigger, a
// logic/formatting step) that have no third-party logo — GENERIC_ICONS
// is checked first so those never get misrouted into the brand lookup.
import { getBrandIcon } from '../../../utils/brandIcons'
import { Play, SlidersHorizontal } from 'lucide-react'
import './sections.css'

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
                {Generic ? <Generic size={18} color="#fff" /> : getBrandIcon(n.icon, { size: 18, color: '#fff' })?.component}
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
