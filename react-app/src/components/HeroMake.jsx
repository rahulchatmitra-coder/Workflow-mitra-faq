import './HeroMake.css'

function HeroMake() {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12l-2 2-2-2M12 12l2-2 2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Adopt AI across your business.',
      description: 'Deploy AI agents and workflows, using 3,000+ integrations.',
      color: '#8B5CF6'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
          <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'From idea to live automation. Fast.',
      description: 'Build by prompt, drag-and-drop or via MCP.',
      color: '#EC4899'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Scale without losing visibility.',
      description: 'See everything in one visual landscape. Enterprise ready.',
      color: '#F59E0B'
    }
  ]

  return (
    <section className="hero-make">
      <div className="hero-make-container">
        {/* Main Title */}
        <div className="hero-make-header">
          <h1 className="hero-make-title">
            The platform to build and manage all
            <br />
            your <span className="highlight-gradient">AI agents</span> and <span className="highlight-gradient">automations</span>
          </h1>
        </div>

        {/* Feature Cards */}
        <div className="feature-cards">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="feature-icon" style={{ background: feature.color }}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hero-make-cta">
          <button className="btn-make-primary">Get started free</button>
          <button className="btn-make-secondary">Talk to sales</button>
        </div>

        {/* Trust Badge */}
        <div className="trust-badge">
          <p className="trust-text">Trusted by 500,000+ users worldwide</p>
        </div>
      </div>
    </section>
  )
}

export default HeroMake
