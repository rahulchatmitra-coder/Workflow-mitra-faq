import './Hero.css'

function Hero() {
  return (
    <section className="hero" itemScope itemType="https://schema.org/SoftwareApplication">
      {/* Workflow visualization at top */}
      <div className="workflow-visualization">
        <div className="workflow-container">
          {/* Gmail Icon */}
          <div className="workflow-node" style={{ animationDelay: '0s' }}>
            <div className="node-icon gmail">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.366l8.073-5.873C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
              </svg>
            </div>
            <span className="node-label">Gmail</span>
          </div>

          {/* Animated Arrow */}
          <svg className="connection-arrow" viewBox="0 0 100 50" width="100" height="50">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
              </marker>
            </defs>
            <path 
              d="M 10 25 Q 50 10, 90 25" 
              stroke="#10b981" 
              strokeWidth="2.5" 
              fill="none" 
              strokeDasharray="8 4"
              markerEnd="url(#arrowhead)"
              className="animated-path"
            />
          </svg>

          {/* FlowMitra Hub */}
          <div className="workflow-node hub" style={{ animationDelay: '0.3s' }}>
            <div className="node-icon flowmitra">
              <span className="hub-text">FM</span>
            </div>
            <span className="node-label">FlowMitra</span>
          </div>

          {/* Animated Arrow */}
          <svg className="connection-arrow" viewBox="0 0 100 50" width="100" height="50">
            <defs>
              <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
              </marker>
            </defs>
            <path 
              d="M 10 25 Q 50 40, 90 25" 
              stroke="#10b981" 
              strokeWidth="2.5" 
              fill="none" 
              strokeDasharray="8 4"
              markerEnd="url(#arrowhead2)"
              className="animated-path"
            />
          </svg>

          {/* Google Sheets Icon */}
          <div className="workflow-node" style={{ animationDelay: '0.6s' }}>
            <div className="node-icon sheets">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path d="M19.44 3H4.56A1.56 1.56 0 0 0 3 4.56v14.88A1.56 1.56 0 0 0 4.56 21h14.88a1.56 1.56 0 0 0 1.56-1.56V4.56A1.56 1.56 0 0 0 19.44 3zm-1.56 15.56H6.12V5.44h11.76z" fill="#0F9D58"/>
                <path d="M7.68 7h8.64v2.4H7.68zm0 3.6h8.64V13H7.68zm0 3.6h8.64v2.4H7.68z" fill="#0F9D58"/>
              </svg>
            </div>
            <span className="node-label">Sheets</span>
          </div>
        </div>

        {/* Floating cursor indicators */}
        <div className="cursor-indicator cursor-1">
          <svg className="cursor-icon" viewBox="0 0 16 20" width="16" height="20">
            <path d="M1 1L1 15.5L5 12L7.5 18L10 17L7.5 11H13L1 1Z" fill="#E8388A"/>
          </svg>
          <span className="cursor-tag pink">Aron</span>
        </div>

        <div className="cursor-indicator cursor-2">
          <svg className="cursor-icon" viewBox="0 0 16 20" width="16" height="20">
            <path d="M1 1L1 15.5L5 12L7.5 18L10 17L7.5 11H13L1 1Z" fill="#111111"/>
          </svg>
          <span className="cursor-tag black">Lizzy</span>
        </div>
      </div>

      {/* Hero content below */}
      <div className="hero-content">
        <h1 className="hero-title" itemProp="name">
          AI agents built
          <br />
          <span className="hero-title-highlight">for</span> by your team
        </h1>
        
        <p className="hero-subtitle" itemProp="description">
          Understanding a task should be the only prerequisite to automating it.
        </p>

        <div className="hero-actions">
          <a href="#start" className="btn btn-primary btn-large" aria-label="Get started with FlowMitra">
            Get Started
          </a>
          <a href="#sales" className="btn btn-secondary btn-large" aria-label="Contact sales team">
            Talk to Sales
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
