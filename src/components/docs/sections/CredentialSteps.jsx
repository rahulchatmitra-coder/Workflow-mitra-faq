import { ChevronRightIcon, ExternalLinkIcon } from '../icons/docIcons'
import { CopyableField } from '../CopyableField'
import { AnnotatedScreenshot } from '../screenshots/AnnotatedScreenshot'
import './sections.css'

/**
 * A light recreation of the third-party screen for this step.
 *
 * Deliberately generic — a heading, optional blurb, an optional on/off row and
 * optional value rows covers every provider dashboard the flagship set needs,
 * so a new integration reuses it by writing data rather than a new component.
 */
function StepFrame({ frame }) {
  return (
    <div className="ds-cred__frame">
      <AnnotatedScreenshot variant="browser-chrome" addressBarText={frame.url}>
        {frame.heading && <div className="ds-cred__fh">{frame.heading}</div>}
        {frame.sub && <p className="ds-cred__fs">{frame.sub}</p>}
        {frame.toggle && (
          <div className="ds-cred__toggle">
            <span className="ds-cred__sw" />
            <span>{frame.toggle}</span>
          </div>
        )}
        {frame.fields?.map((f) => (
          <div className="ds-cred__frow" key={f.label}>
            <CopyableField label={f.label} value={f.value} />
          </div>
        ))}
      </AnnotatedScreenshot>
    </div>
  )
}

/**
 * The credential walkthrough.
 *
 * Beginners get stuck between "open the dashboard" and "find the value" — so
 * each step can carry the real link to click, the exact menu path once inside,
 * the value to copy, and a warning about whatever actually goes wrong there.
 * Only `title` and `body` are required; everything else renders when present.
 */
export function CredentialSteps({ steps }) {
  return (
    <ol className="ds-cred">
      {steps.map((s, i) => (
        <li key={s.title}>
          <span className="ds-cred__num">{i + 1}</span>
          <div className="ds-cred__body">
            <h3>{s.title}</h3>
            <p>{s.body}</p>

            {s.link && (
              <a className="ds-cred__go" href={s.link.href} target="_blank" rel="noopener noreferrer">
                {s.link.label} <ExternalLinkIcon size={13} />
              </a>
            )}

            {s.clickPath && (
              <div className="ds-cred__path">
                {s.clickPath.map((p, j) => (
                  <span key={p} className="ds-cred__crumb">
                    {j > 0 && <ChevronRightIcon size={13} className="ds-cred__arrow" />}
                    <code>{p}</code>
                  </span>
                ))}
              </div>
            )}

            {s.frame && <StepFrame frame={s.frame} />}

            {s.copyFields?.map((f) => (
              <div className="ds-cred__copy" key={f.label}>
                <CopyableField label={f.label} value={f.value} />
              </div>
            ))}

            {s.note && <div className="ds-cred__note">{s.note}</div>}
          </div>
        </li>
      ))}
    </ol>
  )
}
