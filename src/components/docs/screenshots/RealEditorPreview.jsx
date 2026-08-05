import { useState } from 'react'
import { GripVertical, X, HelpCircle, Trash2, ChevronDown, Lightbulb, AlertCircle, Zap } from 'lucide-react'
import { DocsNodeIcon, nodeDiscBg } from '../icons/docsNodeIcons'
import './RealEditorPreview.css'

/**
 * A faithful recreation of the real WorkflowMitra editor.
 *
 * Every measurement and string below is taken from the product source so the
 * docs show users the screen they'll actually see:
 *   - WorkflowNode.jsx      → 80px disc, 3px white ring, inset highlight,
 *                             ring-4 selection halo, role badge top-LEFT
 *                             (orange ⚡, not a text pill), step number
 *                             top-RIGHT, label+summary at top-[86px]
 *   - NodeConfigPopover.jsx → 380px panel, grip + 32px icon tile + name over
 *                             uppercase type, delete-step footer
 *   - FormField.jsx         → 13px semibold label + red *, 2px left rail that
 *                             turns red on error, bulb hint / red error line
 *   - CredentialPicker.jsx  → its own 12px label, "None — enter details inline"
 *
 * `operations` turns the screenshot into a teaching surface: each entry is one
 * real operation the node supports, so a reader can page through every mode the
 * integration has instead of seeing a single example. Nodes with one mode pass
 * a single entry and no tabs render.
 */

function Field({ label, required, value, placeholder, hint, error, multiline }) {
  return (
    <div className={`wmf${error ? ' wmf--err' : ''}`}>
      {label && (
        <div className="wmf__label">
          <span>{label}</span>
          {required && <span className="wmf__req">*</span>}
        </div>
      )}
      <div className={`wmf__ctl${multiline ? ' wmf__ctl--area' : ''}`}>
        {value ? <span>{value}</span> : <span className="wmf__ph">{placeholder}</span>}
      </div>
      {error ? (
        <p className="wmf__err"><AlertCircle size={12} /> {error}</p>
      ) : hint ? (
        <p className="wmf__hint"><Lightbulb size={12} className="wmf__bulb" /><span>{hint}</span></p>
      ) : null}
    </div>
  )
}

function SelectField({ label, value, hint }) {
  return (
    <div className="wmf">
      {label && <div className="wmf__label"><span>{label}</span></div>}
      <div className="wmf__ctl wmf__ctl--select">
        <span>{value}</span>
        <ChevronDown size={14} className="wmf__chev" />
      </div>
      {hint && <p className="wmf__hint"><Lightbulb size={12} className="wmf__bulb" /><span>{hint}</span></p>}
    </div>
  )
}

/** CredentialPicker has its own label style in the product — not <Field>. */
function CredentialField() {
  return (
    <div>
      <label className="wm-cred__label">Credential</label>
      <div className="wmf__ctl wmf__ctl--select">
        <span>None — enter details inline</span>
        <ChevronDown size={14} className="wmf__chev" />
      </div>
      <p className="wm-cred__note">
        No saved credentials for this app. <a href="/docs/integrations">Add one →</a>
      </p>
    </div>
  )
}

function renderControl(f, i) {
  if (f.kind === 'credential') return <CredentialField key={i} />
  if (f.kind === 'select') return <SelectField key={i} label={f.label} value={f.value} hint={f.hint} />
  return (
    <Field
      key={i}
      label={f.label}
      required={f.required}
      value={f.value}
      placeholder={f.placeholder}
      hint={f.hint}
      error={f.error}
      multiline={f.multiline}
    />
  )
}

export function RealEditorPreview({
  nodeType,
  nodeLabel,
  triggerLabel = 'New order',
  triggerSummary = 'shopify · order/paid',
  triggerIcon = 'shopify',
  operations = [],
  docsUrl,
}) {
  const [active, setActive] = useState(0)
  const op = operations[active] || { fields: [] }
  const showTabs = operations.length > 1

  return (
    <div className="wm-shot">
      {showTabs && (
        <div className="wm-tabs" role="tablist" aria-label="Operations this node supports">
          {operations.map((o, i) => (
            <button
              key={o.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}

      <div className="wm-frame">
        <div className="wm-topbar">{nodeLabel} flow</div>

        <div className="wm-stage">
          <div className="wm-canvas">
            <div className="wm-canvas__row">
              <div className="wm-node">
                <div className="wm-node__disc" style={{ background: nodeDiscBg(triggerIcon) }}>
                  <DocsNodeIcon type={triggerIcon} size={34} mono />
                </div>
                <span className="wm-node__role" title="This step starts the workflow">
                  <Zap size={13} strokeWidth={2.6} />
                </span>
                <span className="wm-node__num">1</span>
                <div className="wm-node__label">
                  <div className="wm-node__t">{triggerLabel}</div>
                  <div className="wm-node__s">{triggerSummary}</div>
                </div>
              </div>

              <div className="wm-edge">
                <svg viewBox="0 0 74 80" preserveAspectRatio="none" aria-hidden="true">
                  <path className="wm-edge__base" d="M0 40 C24 40,50 40,74 40" />
                  <path className="wm-edge__flow" d="M0 40 C24 40,50 40,74 40" />
                </svg>
              </div>

              <div className="wm-node wm-node--selected">
                <div className="wm-node__disc" style={{ background: nodeDiscBg(nodeType) }}>
                  <DocsNodeIcon type={nodeType} size={34} mono />
                </div>
                <span className="wm-node__num">2</span>
                <div className="wm-node__label">
                  <div className="wm-node__t">{nodeLabel}</div>
                  <div className="wm-node__s">{op.summary || ''}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="wm-pop">
            <div className="wm-pop__head">
              <GripVertical size={15} className="wm-pop__grip" />
              <span className="wm-pop__tile">
                <DocsNodeIcon type={nodeType} size={17} />
              </span>
              <div className="wm-pop__title">
                <div className="wm-pop__name">{nodeLabel}</div>
                <div className="wm-pop__type">{nodeType}</div>
              </div>
              {docsUrl && <HelpCircle size={16} className="wm-pop__help" aria-label="View docs" />}
              <X size={16} className="wm-pop__x" />
            </div>

            <div className="wm-pop__body">{op.fields.map(renderControl)}</div>

            <div className="wm-pop__foot">
              <span className="wm-pop__del"><Trash2 size={14} /> Delete step</span>
            </div>
          </div>
        </div>
      </div>

      {op.caption && <p className="wm-caption">{op.caption}</p>}
    </div>
  )
}
