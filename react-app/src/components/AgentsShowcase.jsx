import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './AgentsShowcase.css'

const agents = [
  {
    id: 'data-analysis',
    title: 'Data Analysis Agent',
    description: 'A reasoning agent that answers questions from your data warehouse.',
    icon: '📊',
    team: 'Data',
    creators: ['Aron', 'Katherine', 'Max'],
    badgeColor: '#dbeafe',
    badgeText: '#1d4ed8',
  },
  {
    id: 'support',
    title: 'Support Agent',
    description: 'An agent that triages bugs, creates tickets, and spots support patterns automatically.',
    icon: '💬',
    team: 'Support',
    creators: ['Gonzalo', 'Katherine', 'Marcelo'],
    badgeColor: '#dcfce7',
    badgeText: '#15803d',
  },
  {
    id: 'crm',
    title: 'CRM Agent',
    description: 'An agent that manages deals, researches prospects, and keeps your CRM up to date.',
    icon: '💼',
    team: 'Sales',
    creators: ['Aron', 'Rahul'],
    badgeColor: '#fef3c7',
    badgeText: '#b45309',
  },
  {
    id: 'meeting-prep',
    title: 'Meeting Prep Agent',
    description: 'An agent that automatically briefs you before every meeting with context from across your tools.',
    icon: '📋',
    team: 'Sales',
    creators: ['Gonzalo', 'Max', 'Rahul'],
    badgeColor: '#ede9fe',
    badgeText: '#6d28d9',
  },
  {
    id: 'call-analysis',
    title: 'Call Analysis Agent',
    description: 'An agent that analyzes call recordings to surface objection patterns, coaching insights, and competitive intelligence.',
    icon: '📞',
    team: 'Sales',
    creators: ['Aron', 'Katherine', 'Marcelo'],
    badgeColor: '#fce7f3',
    badgeText: '#be185d',
  },
]

const avatarColors = [
  'linear-gradient(135deg, #ec4899, #f472b6)',
  'linear-gradient(135deg, #8b5cf6, #a78bfa)',
  'linear-gradient(135deg, #3b82f6, #60a5fa)',
  'linear-gradient(135deg, #10b981, #34d399)',
  'linear-gradient(135deg, #f59e0b, #fbbf24)',
]

function SupportDemo() {
  return (
    <div className="agent-demo-scene">
      <div className="agent-demo-card agent-demo-main">
        <p className="demo-status-line">Found 4 related tickets. Linking them to <strong>BUG-4192</strong> now.</p>
        <div className="demo-success-row">
          <span className="demo-check">✓</span>
          <span><strong>BUG-4192</strong> is now linked to the following existing CSV export issues:</span>
        </div>
        <table className="demo-table">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Account</th>
              <th>Status</th>
              <th>Reported</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>BUG-3874</td><td>Thrift Bank</td><td><span className="status-pill open">Open</span></td><td>Feb 14</td></tr>
            <tr><td>BUG-3911</td><td>Meridian Corp</td><td><span className="status-pill progress">In Progress</span></td><td>Feb 18</td></tr>
            <tr><td>BUG-4022</td><td>Northwind</td><td><span className="status-pill open">Open</span></td><td>Feb 22</td></tr>
            <tr><td>BUG-4105</td><td>Acme Inc</td><td><span className="status-pill open">Open</span></td><td>Mar 1</td></tr>
          </tbody>
        </table>
        <p className="demo-analysis">
          This is the 5th reported instance of CSV export issues in the last month across 4 accounts.
          Looks like this may be a systemic issue with the export timeout on large datasets.
        </p>
        <p className="demo-question">
          Want me to escalate this cluster to the engineering team, or flag it for prioritization on the product side?
        </p>
      </div>
      <div className="agent-demo-card agent-demo-float">
        <div className="float-ticket-title">Fix CSV Exporting Timeout Bug</div>
        <div className="float-ticket-id">ENG-1847</div>
        <div className="float-ticket-field">
          <span className="float-label">Summary</span>
          <span className="float-value">CSV export fails on datasets over 10k rows</span>
        </div>
        <div className="float-ticket-sidebar">
          <div><span className="float-label">Status</span><span className="float-value">In Progress</span></div>
          <div><span className="float-label">Priority</span><span className="float-value">High</span></div>
          <div><span className="float-label">Assignee</span><span className="float-value">Marcelo</span></div>
        </div>
      </div>
    </div>
  )
}

function DataAnalysisDemo() {
  return (
    <div className="agent-demo-scene">
      <div className="agent-demo-card agent-demo-main">
        <p className="demo-status-line">Analyzing onboarding funnel data from your warehouse…</p>
        <div className="demo-alert demo-alert-red">
          <span>🔴</span>
          <span><strong>Biggest drop-off: Dashboard → Attempted Integration</strong> — 46% of users never try to connect an integration.</span>
        </div>
        <table className="demo-table">
          <thead><tr><th>Step</th><th>Users</th><th>Drop-off</th></tr></thead>
          <tbody>
            <tr><td>Signed Up</td><td>4,820</td><td>—</td></tr>
            <tr><td>Completed Profile</td><td>3,940</td><td>18%</td></tr>
            <tr><td>Viewed Dashboard</td><td>3,105</td><td>21%</td></tr>
            <tr><td>Attempted Integration</td><td>1,673</td><td className="warn">⚠ 46%</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CrmDemo() {
  return (
    <div className="agent-demo-scene">
      <div className="agent-demo-card agent-demo-main">
        <p className="demo-status-line">Q1 pipeline snapshot — 38 active deals, $2.4M total</p>
        <table className="demo-table">
          <thead><tr><th>Deal</th><th>Account</th><th>Stage</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>Enterprise Expansion</td><td>Meridian Health</td><td>Negotiation</td><td>$142,000</td></tr>
            <tr><td>Platform Rollout</td><td>Torchlight Systems</td><td>Proposal Sent</td><td>$98,500</td></tr>
            <tr><td>Annual Renewal</td><td>Northwind</td><td>Discovery</td><td>$64,000</td></tr>
          </tbody>
        </table>
        <div className="demo-bars">
          <div className="demo-bar-row"><span>Discovery</span><div className="demo-bar-track"><div className="demo-bar demo-bar-green" style={{ width: '65%' }}>$540K</div></div></div>
          <div className="demo-bar-row"><span>Solution Fit</span><div className="demo-bar-track"><div className="demo-bar demo-bar-purple" style={{ width: '78%' }}>$680K</div></div></div>
          <div className="demo-bar-row"><span>Security</span><div className="demo-bar-track"><div className="demo-bar demo-bar-blue" style={{ width: '52%' }}>$430K</div></div></div>
        </div>
      </div>
    </div>
  )
}

function MeetingPrepDemo() {
  return (
    <div className="agent-demo-scene">
      <div className="agent-demo-card agent-demo-main">
        <p className="demo-status-line">Briefing ready for your 2pm call with Torchlight Systems</p>
        <table className="demo-table">
          <thead><tr><th>Detail</th><th>Info</th></tr></thead>
          <tbody>
            <tr><td>Company</td><td>Torchlight Systems — Series B, 220 employees</td></tr>
            <tr><td>Contact</td><td>Sarah Chen, VP Engineering</td></tr>
            <tr><td>Deal Stage</td><td>Proposal Sent — $98,500</td></tr>
            <tr><td>Last Touch</td><td>Demo call March 5 — positive feedback</td></tr>
          </tbody>
        </table>
        <ul className="demo-checklist">
          <li>Address security compliance questions from last call</li>
          <li>Share case study: similar deployment at Meridian Health</li>
          <li>Discuss Q2 launch timeline</li>
        </ul>
      </div>
    </div>
  )
}

function CallAnalysisDemo() {
  return (
    <div className="agent-demo-scene">
      <div className="agent-demo-card agent-demo-main">
        <p className="demo-status-line">Analyzed 143 calls in Q1 — top objections surfaced</p>
        <table className="demo-table">
          <thead><tr><th>#</th><th>Objection</th><th>Calls</th><th>Win Rate</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Pricing / Budget</td><td>61 (43%)</td><td>38%</td></tr>
            <tr><td>2</td><td>Implementation Timeline</td><td>41 (29%)</td><td>22%</td></tr>
            <tr><td>3</td><td>Feature Gaps</td><td>28 (20%)</td><td>31%</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

const demoComponents = {
  'data-analysis': DataAnalysisDemo,
  support: SupportDemo,
  crm: CrmDemo,
  'meeting-prep': MeetingPrepDemo,
  'call-analysis': CallAnalysisDemo,
}

export default function AgentsShowcase() {
  const [activeId, setActiveId] = useState('support')
  const activeAgent = agents.find((a) => a.id === activeId)
  const DemoComponent = demoComponents[activeId]

  return (
    <section className="agents-showcase-section">
      <div className="container">
        <div className="showcase-grid">
          <div className="showcase-left">
            <h2 className="showcase-heading">
              Roll out specialized<br />agents in minutes
            </h2>
            <div className="agent-list">
              {agents.map((agent) => {
                const isActive = agent.id === activeId
                return (
                  <button
                    key={agent.id}
                    type="button"
                    className={`agent-list-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveId(agent.id)}
                  >
                    <div className="agent-list-header">
                      {isActive && <span className="agent-icon-box">{agent.icon}</span>}
                      <h3 className="agent-list-title">{agent.title}</h3>
                    </div>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          className="agent-list-expand"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: 'easeOut' }}
                        >
                          <p className="agent-list-desc">{agent.description}</p>
                          <div
                            className="agent-badge"
                            style={{ background: agent.badgeColor, color: agent.badgeText }}
                          >
                            <div className="badge-avatars">
                              {agent.creators.map((name, i) => (
                                <span
                                  key={name}
                                  className="badge-avatar"
                                  style={{ background: avatarColors[i % avatarColors.length] }}
                                >
                                  {name.charAt(0)}
                                </span>
                              ))}
                            </div>
                            <span>{agent.team} · Built by {agent.creators.join(', ')}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="showcase-right">
            <div className="preview-gradient-wrap">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  className="preview-content"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <DemoComponent />
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="preview-agent-label">{activeAgent?.title}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
