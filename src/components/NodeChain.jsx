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
