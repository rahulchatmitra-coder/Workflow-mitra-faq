import './sections.css'

export function BeforeYouStart({ prerequisites }) {
  return (
    <div className="ds-callout">
      <div><div className="ds-callout__k">You'll need</div><div className="ds-callout__v">{prerequisites.youNeed}</div></div>
      <div><div className="ds-callout__k">WorkflowMitra needs</div><div className="ds-callout__v">{prerequisites.weNeed}</div></div>
      <div><div className="ds-callout__k">Cost</div><div className="ds-callout__v">{prerequisites.cost}</div></div>
    </div>
  )
}
