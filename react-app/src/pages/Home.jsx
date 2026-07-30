import HeroAnimated from '../components/HeroAnimated'
import AIFeatures from '../components/AIFeatures'
import PremiumHero from '../components/PremiumHero'
import IntegrationsShowcase from '../components/IntegrationsShowcase'
import './Home.css'

function Home() {
  const templates = [
    {
      category: 'NOTIFICATIONS',
      title: 'New order — Email + Sheet',
      description: 'When an order comes in, email the customer a confirmation and log the order to Google Sheets.',
      apps: ['gmail', 'sheets'],
      steps: '3 steps',
      uses: '2 uses'
    },
    {
      category: 'NOTIFICATIONS',
      title: 'API health check — Discord alert',
      description: 'Ping an endpoint on a schedule. If it is down, post an alert to your team Discord channel.',
      apps: ['api', 'discord'],
      steps: '4 steps',
      uses: '1 uses'
    },
    {
      category: 'REPORTING',
      title: 'Daily report — Slack',
      description: 'Fetch your metrics from an API, format a short summary, and post it to a Slack channel every day.',
      apps: ['api', 'slack'],
      steps: '4 steps',
      uses: '1 uses'
    },
    {
      category: 'DATA SYNC',
      title: 'Lead capture — Google Sheet',
      description: 'Capture a new lead and append it as a row in Google Sheets. Add a webhook trigger to fire it from your site form.',
      apps: ['webhook', 'sheets'],
      steps: '3 steps',
      uses: '0 uses'
    }
  ]

  const getAppIcon = (app) => {
    switch(app) {
      case 'gmail':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.366l8.073-5.873C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
          </svg>
        )
      case 'sheets':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M19.44 3H4.56A1.56 1.56 0 0 0 3 4.56v14.88A1.56 1.56 0 0 0 4.56 21h14.88a1.56 1.56 0 0 0 1.56-1.56V4.56A1.56 1.56 0 0 0 19.44 3zm-1.56 15.56H6.12V5.44h11.76z" fill="#0F9D58"/>
          </svg>
        )
      case 'discord':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" fill="#5865F2"/>
          </svg>
        )
      case 'slack':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52a2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521a2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521a2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523a2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A"/>
          </svg>
        )
      case 'api':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20">
            <circle cx="12" cy="12" r="10" fill="none" stroke="#6366f1" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" fill="#6366f1"/>
          </svg>
        )
      case 'webhook':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M10 15l-3.5 3.5c-1 1-2.5 1-3.5 0s-1-2.5 0-3.5L6.5 11M14 9l3.5-3.5c1-1 2.5-1 3.5 0s1 2.5 0 3.5L17.5 13M8 16l8-8" stroke="#6366f1" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="home-page">
      <HeroAnimated />
      
      {/* AI Features Section - Make.com Style */}
      <AIFeatures />
      
      {/* Premium Hero - Interactive Agents */}
      <PremiumHero />
      
      {/* Integrations Showcase - n8n style */}
      <IntegrationsShowcase />
      
      {/* Templates Section */}
      <section className="templates-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Templates</h2>
            <div className="template-tabs">
              <button className="tab-btn active">All</button>
              <button className="tab-btn">Data sync</button>
              <button className="tab-btn">Notifications</button>
              <button className="tab-btn">Sales</button>
              <button className="tab-btn">Support</button>
              <button className="tab-btn">Reporting</button>
              <button className="tab-btn">Logistics</button>
            </div>
          </div>

          <div className="templates-grid">
            {templates.map((template, index) => (
              <div key={index} className="template-card">
                <div className="template-header">
                  <div className="template-apps">
                    {template.apps.map((app, idx) => (
                      <div key={idx} className="app-icon">
                        {getAppIcon(app)}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="template-content">
                  <span className="template-category">{template.category}</span>
                  <h3 className="template-title">{template.title}</h3>
                  <p className="template-description">{template.description}</p>
                  
                  <div className="template-footer">
                    <span className="template-meta">{template.steps} · {template.uses}</span>
                    <button className="btn-use">Use</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500k+</div>
              <div className="stat-label">Automations Created</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime Guarantee</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Integrations</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to automate your workflow?</h2>
            <p className="cta-description">
              Join thousands of teams already building with AI agents. Start free, no credit card required.
            </p>
            <div className="cta-actions">
              <a href="/contact" className="btn btn-primary btn-large">Get Started for Free</a>
              <a href="/contact" className="btn btn-secondary btn-large">Talk to Sales</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
