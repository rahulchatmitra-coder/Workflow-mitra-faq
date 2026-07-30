import './Workflow.css'

function Workflow() {
  return (
    <section className="workflow-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Build workflows visually</h2>
          <p className="section-description">
            Connect your apps and automate tasks with an intuitive drag-and-drop interface
          </p>
        </div>

        <div className="workflow-demo">
          <div className="stage">
            <svg className="flow-svg" viewBox="0 0 420 420" width="420" height="420">
              <defs>
                <marker id="arrowhead" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#2f8f6d"/>
                </marker>
              </defs>
              <path className="flow-arrow" d="M214,178 C240,150 260,120 286,98" markerEnd="url(#arrowhead)"/>
              <path className="flow-arrow" d="M300,116 C314,160 324,220 334,258" markerEnd="url(#arrowhead)"/>
            </svg>
            
            <div className="blob">
              <span className="logo-txt">FM</span>
            </div>
            
            {/* Gmail Icon */}
            <div className="icon icon-a" style={{top: '66px', left: '270px'}}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <circle cx="12" cy="12" r="12" fill="#d23c2c"/>
                <rect x="4.5" y="7" width="15" height="11" rx="1.5" fill="none" stroke="#fff" strokeWidth="1.6"/>
                <path d="M4.5,7 L12,13 L19.5,7" fill="none" stroke="#fff" strokeWidth="1.6"/>
              </svg>
            </div>
            <span className="node-lbl" style={{top: '112px', left: '292px'}}>Gmail</span>
            
            {/* Trigger Icon */}
            <div className="icon icon-b dark" style={{top: '60px', left: '60px'}}>
              <svg viewBox="0 0 24 24" width="14" height="14">
                <path d="M3 3L21 21M21 3L3 21" stroke="#fff" strokeWidth="2.6" strokeLinecap="round"/>
              </svg>
            </div>
            
            {/* Sheets Icon */}
            <div className="icon icon-c" style={{top: '258px', left: '316px'}}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <circle cx="12" cy="12" r="12" fill="#1a9c5b"/>
                <rect x="5" y="4.5" width="14" height="15" rx="1.5" fill="none" stroke="#fff" strokeWidth="1.5"/>
                <line x1="5" y1="9.3" x2="19" y2="9.3" stroke="#fff" strokeWidth="1.2"/>
                <line x1="5" y1="14.3" x2="19" y2="14.3" stroke="#fff" strokeWidth="1.2"/>
                <line x1="10.6" y1="4.5" x2="10.6" y2="19.5" stroke="#fff" strokeWidth="1.2"/>
              </svg>
            </div>
            <span className="node-lbl" style={{top: '304px', left: '338px'}}>Sheets</span>
            
            {/* Live Cursors */}
            <div className="cursor cursor-aron">
              <svg className="pointer" viewBox="0 0 16 20" width="16" height="20">
                <path d="M1 1L1 15.5L5 12L7.5 18L10 17L7.5 11H13L1 1Z" fill="#E8388A"/>
              </svg>
              <span className="tag pink">Aron</span>
            </div>
            
            <div className="cursor cursor-lizzy">
              <svg className="pointer" viewBox="0 0 16 20" width="16" height="20">
                <path d="M1 1L1 15.5L5 12L7.5 18L10 17L7.5 11H13L1 1Z" fill="#111111"/>
              </svg>
              <span className="tag black">Lizzy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Workflow
