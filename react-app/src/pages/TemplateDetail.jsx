import { useParams, useNavigate, Link } from 'react-router-dom'
import './TemplateDetail.css'

const allTemplates = [
  {
    id: 'new-order-email-sheet',
    category: 'NOTIFICATIONS',
    title: 'New order — Email + Sheet',
    description: 'When an order comes in, email the customer a confirmation and log the order to Google Sheets.',
    apps: ['gmail', 'sheets'],
    steps: '3 steps',
    uses: '2 uses',
    longDescription: 'This automation triggers whenever a new order is placed. It instantly sends a personalized confirmation email to the customer via Gmail, then logs the order details — including product name, quantity, price, and timestamp — into a Google Sheets spreadsheet for easy tracking and reporting.',
    stepsDetail: [
      { label: 'Trigger', text: 'New order received via webhook', icon: 'trigger' },
      { label: 'Action 1', text: 'Send confirmation email via Gmail', icon: 'gmail' },
      { label: 'Action 2', text: 'Append row to Google Sheets', icon: 'sheets' },
    ],
    tags: ['email', 'spreadsheet', 'order', 'ecommerce']
  },
  {
    id: 'api-health-check-discord',
    category: 'NOTIFICATIONS',
    title: 'API health check — Discord alert',
    description: 'Ping an endpoint on a schedule. If it is down, post an alert to your team Discord channel.',
    apps: ['api', 'discord'],
    steps: '4 steps',
    uses: '1 uses',
    longDescription: 'Monitor the health of any API endpoint by pinging it on a configurable schedule. If the endpoint returns a non-200 status or times out, an alert is immediately posted to your designated Discord channel so your team can react quickly.',
    stepsDetail: [
      { label: 'Trigger', text: 'Schedule — runs every 5 minutes', icon: 'trigger' },
      { label: 'Action 1', text: 'Send HTTP GET to your API endpoint', icon: 'api' },
      { label: 'Action 2', text: 'Check response status code', icon: 'check' },
      { label: 'Action 3', text: 'Post alert to Discord channel', icon: 'discord' },
    ],
    tags: ['monitoring', 'api', 'discord', 'devops']
  },
  {
    id: 'daily-report-slack',
    category: 'REPORTING',
    title: 'Daily report — Slack',
    description: 'Fetch your metrics from an API, format a short summary, and post it to a Slack channel every day.',
    apps: ['api', 'slack'],
    steps: '4 steps',
    uses: '1 uses',
    longDescription: 'Every day at a time you choose, this automation fetches your key metrics from an API, formats them into a clean and readable summary, and posts it directly to your Slack channel. Keep your whole team informed without lifting a finger.',
    stepsDetail: [
      { label: 'Trigger', text: 'Schedule — daily at 9:00 AM', icon: 'trigger' },
      { label: 'Action 1', text: 'Fetch metrics from API', icon: 'api' },
      { label: 'Action 2', text: 'Format data into summary', icon: 'format' },
      { label: 'Action 3', text: 'Post message to Slack channel', icon: 'slack' },
    ],
    tags: ['reporting', 'slack', 'daily', 'metrics']
  },
  {
    id: 'lead-capture-google-sheet',
    category: 'DATA SYNC',
    title: 'Lead capture — Google Sheet',
    description: 'Capture a new lead and append it as a row in Google Sheets. Add a webhook trigger to fire it from your site form.',
    apps: ['webhook', 'sheets'],
    steps: '3 steps',
    uses: '0 uses',
    longDescription: 'Connect your website form to this automation using a webhook. Every time a visitor submits their information, it captures the lead data and appends a new row to your Google Sheets spreadsheet — giving your sales team instant visibility into incoming leads.',
    stepsDetail: [
      { label: 'Trigger', text: 'Webhook — form submission from website', icon: 'trigger' },
      { label: 'Action 1', text: 'Parse lead data (name, email, message)', icon: 'webhook' },
      { label: 'Action 2', text: 'Append row to Google Sheets', icon: 'sheets' },
    ],
    tags: ['leads', 'crm', 'sheets', 'webhook', 'forms']
  }
]

const getStepIconSvg = (icon) => {
  switch(icon) {
    case 'trigger':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      )
    case 'gmail':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.366l8.073-5.873C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
        </svg>
      )
    case 'sheets':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M19.44 3H4.56A1.56 1.56 0 0 0 3 4.56v14.88A1.56 1.56 0 0 0 4.56 21h14.88a1.56 1.56 0 0 0 1.56-1.56V4.56A1.56 1.56 0 0 0 19.44 3zm-1.56 15.56H6.12V5.44h11.76z" fill="#0F9D58"/>
        </svg>
      )
    case 'discord':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.12-.09.246-.19.373-.292a.074.074 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" fill="#5865F2"/>
        </svg>
      )
    case 'slack':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
          <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
          <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
          <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
        </svg>
      )
    case 'api':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22">
          <circle cx="12" cy="12" r="10" fill="none" stroke="#6366f1" strokeWidth="2"/>
          <circle cx="12" cy="12" r="3" fill="#6366f1"/>
        </svg>
      )
    case 'webhook':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M10 15l-3.5 3.5c-1 1-2.5 1-3.5 0s-1-2.5 0-3.5L6.5 11M14 9l3.5-3.5c1-1 2.5-1 3.5 0s1 2.5 0 3.5L17.5 13M8 16l8-8" stroke="#6366f1" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>
      )
    case 'check':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      )
    case 'format':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="21" y1="10" x2="3" y2="10"/>
          <line x1="21" y1="6" x2="3" y2="6"/>
          <line x1="21" y1="14" x2="3" y2="14"/>
          <line x1="21" y1="18" x2="3" y2="18"/>
        </svg>
      )
    default:
      return null
  }
}

function TemplateDetail() {
  const { templateId } = useParams()
  const navigate = useNavigate()
  const template = allTemplates.find(t => t.id === templateId)

  if (!template) {
    return (
      <div className="template-detail-page">
        <div className="container">
          <div className="template-not-found">
            <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            <h2>Template not found</h2>
            <p>The template you're looking for doesn't exist or has been removed.</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="template-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          <span>Templates</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          <span className="current">{template.title}</span>
        </nav>

        <div className="template-detail-layout">
          {/* Left Column - Info */}
          <div className="template-info">
            <div className="template-detail-header">
              <span className="template-detail-category">{template.category}</span>
              <h1 className="template-detail-title">{template.title}</h1>
              <p className="template-detail-description">{template.longDescription}</p>
            </div>

            <div className="template-detail-meta">
              <div className="meta-chip">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                {template.steps}
              </div>
              <div className="meta-chip">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                {template.uses}
              </div>
            </div>

            <div className="template-tags">
              {template.tags.map((tag, i) => (
                <span key={i} className="detail-tag">{tag}</span>
              ))}
            </div>

            {/* Workflow Steps */}
            <div className="workflow-steps">
              <h3 className="steps-heading">Workflow Steps</h3>
              <div className="steps-list">
                {template.stepsDetail.map((step, i) => (
                  <div key={i} className="step-item">
                    <div className="step-connector">
                      <div className="step-icon-wrapper">
                        {getStepIconSvg(step.icon)}
                      </div>
                      {i < template.stepsDetail.length - 1 && <div className="step-line" />}
                    </div>
                    <div className="step-content">
                      <span className="step-label">{step.label}</span>
                      <p className="step-text">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Action Card */}
          <div className="template-action-panel">
            <div className="action-card">
              <div className="action-card-header">
                <h3>Use this template</h3>
                <p>Set up this automation in just a few clicks. No coding required.</p>
              </div>

              <div className="connected-apps">
                <h4>Connected Apps</h4>
                <div className="app-list">
                  {template.apps.map((app, i) => (
                    <div key={i} className="app-item">
                      <div className="app-item-icon">
                        {getStepIconSvg(app)}
                      </div>
                      <span className="app-item-name">{app.charAt(0).toUpperCase() + app.slice(1)}</span>
                      <span className="app-item-status">Connect</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/contact" className="btn-activate">
                Get Started with this Template
              </Link>

              <p className="action-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                Free to use. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateDetail
