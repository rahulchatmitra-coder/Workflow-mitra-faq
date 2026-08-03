import { Link } from 'react-router-dom'
import './IntegrationsShowcase.css'

import { getBrandIcon } from '../utils/brandIcons'

const apps = [
  { name: 'DeepSeek AI', icon: null, color: '#4d6bfe', key: 'deepseek' },
  { name: 'OpenAI (ChatGPT)', icon: null, color: '#10A37F', key: 'openai' },
  { name: 'HubSpot CRM', icon: null, color: '#FF7A59', key: 'hubspot' },
  { name: 'Zendesk', icon: null, color: '#03363D', key: 'zendesk' },
  { name: 'Asana', icon: null, color: '#273347', key: 'asana' },
  { name: 'Salesforce', icon: null, color: '#00A1E0', key: 'salesforce' },
  { name: 'Slack', icon: null, color: '#4A154B', key: 'slack' },
  { name: 'Gmail', icon: null, color: '#EA4335', key: 'gmail' },
  { name: 'Google Sheets', icon: null, color: '#0F9D58', key: 'googlesheets' },
  { name: 'Discord', icon: null, color: '#5865F2', key: 'discord' },
  { name: 'Notion', icon: null, color: '#000000', key: 'notion' },
  { name: 'Stripe', icon: null, color: '#635BFF', key: 'stripe' },
  { name: 'GitHub', icon: null, color: '#181717', key: 'github' },
  { name: 'Jira', icon: null, color: '#0052CC', key: 'jira' },
  { name: 'Airtable', icon: null, color: '#18BFFF', key: 'airtable' },
]

function IntegrationsShowcase() {
  // Split apps into 2 arrays for the staggered rows
  const row1Apps = [...apps.slice(0, 8), ...apps.slice(0, 8)];
  const row2Apps = [...apps.slice(8), ...apps.slice(0, 7), ...apps.slice(8)];

  return (
    <section className="n8n-integrations-section">
      <div className="n8n-integrations-container">
        
        <div className="n8n-header">
          <h2 className="n8n-title">
            Plug AI into your own data &<br/>over 500 integrations
          </h2>
          <p className="n8n-subtitle">
            Use pre-built nodes for common apps. Custom API connections for everything else.
          </p>
        </div>

        <div className="n8n-carousel-wrapper">
          
          {/* Row 1 - Moves Left */}
          <div className="n8n-carousel-track n8n-move-left">
            {row1Apps.map((app, idx) => (
              <div key={`r1-${idx}`} className="n8n-app-card">
                <div className="n8n-app-icon" style={{ color: app.color }}>
                  {app.icon ? (
                    <span style={{ fontSize: '32px' }}>{app.icon}</span>
                  ) : (
                    getBrandIcon(app.name, { size: 32 })?.component
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 - Moves Right */}
          <div className="n8n-carousel-track n8n-move-right">
            {row2Apps.map((app, idx) => (
              <div key={`r2-${idx}`} className="n8n-app-card">
                <div className="n8n-app-icon" style={{ color: app.color }}>
                  {app.icon ? (
                    <span style={{ fontSize: '32px' }}>{app.icon}</span>
                  ) : (
                    getBrandIcon(app.name, { size: 32 })?.component
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Fades for smooth blending */}
          <div className="n8n-fade n8n-fade-left"></div>
          <div className="n8n-fade n8n-fade-right"></div>
        </div>

        <div className="n8n-cta-container">
          <Link to="/apps" className="n8n-btn">
            Browse all integrations
          </Link>
        </div>

      </div>
    </section>
  )
}

export default IntegrationsShowcase

