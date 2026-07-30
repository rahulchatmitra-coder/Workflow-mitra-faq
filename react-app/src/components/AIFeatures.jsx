import './AIFeatures.css'

function AIFeatures() {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Adopt AI across your business.',
      description: 'Deploy AI agents and workflows, using 3,000+ integrations.',
      color: '#8B5CF6',
      bgColor: '#f3f0ff'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'From idea to live automation. Fast.',
      description: 'Build by prompt, drag-and-drop or via MCP.',
      color: '#EC4899',
      bgColor: '#fef3f8'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
        </svg>
      ),
      title: 'Scale without losing visibility.',
      description: 'See everything in one visual landscape. Enterprise ready.',
      color: '#F59E0B',
      bgColor: '#fffbeb'
    }
  ]

  return (
    <section className="ai-features-section">
      <div className="container">
        {/* Main Title */}
        <h2 className="ai-features-title">
          The platform to build and manage all
          <br />
          your <span className="highlight-text">AI agents</span> and <span className="highlight-text">automations</span>
        </h2>

        {/* Feature Cards Grid */}
        <div className="ai-features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="ai-feature-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div 
                className="ai-feature-icon" 
                style={{ 
                  background: feature.bgColor,
                  color: feature.color 
                }}
              >
                {feature.icon}
              </div>
              <h3 className="ai-feature-title">{feature.title}</h3>
              <p className="ai-feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AIFeatures
