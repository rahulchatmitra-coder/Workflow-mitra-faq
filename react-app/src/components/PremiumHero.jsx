import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './PremiumHero.css'

const agents = [
  {
    id: 'data-analysis',
    title: 'Data Analysis Agent',
    icon: '📊',
    description: 'A reasoning agent that answers questions from your data warehouse, surfaces insights, and visualizes trends.',
    team: 'Data',
    creators: ['Aron', 'Katherine', 'Max'],
  },
  {
    id: 'support',
    title: 'Support Agent',
    icon: '🛟',
    description: 'An agent that triages bugs, creates tickets, and spots support patterns automatically.',
    team: 'Support',
    creators: ['Gonzalo', 'Katherine', 'Marcelo'],
  },
  {
    id: 'crm',
    title: 'CRM Agent',
    icon: '⚙️',
    description: 'An agent that manages deals, researches prospects, and keeps your CRM up to date.',
    team: 'Sales',
    creators: ['Aron', 'Aron', 'Rahul'],
  },
  {
    id: 'meeting-prep',
    title: 'Meeting Prep Agent',
    icon: '📋',
    description: 'Prepares briefings, talking points, and background research before every meeting.',
    team: 'Ops',
    creators: ['Sarah', 'Dev', 'Priya'],
  },
  {
    id: 'call-analysis',
    title: 'Call Analysis Agent',
    icon: '⚠️',
    description: 'An agent that analyzes call recordings to surface objection patterns, coaching insights, and competitive intelligence.',
    team: 'Sales',
    creators: ['Aron', 'Katherine', 'Marcelo'],
  },
]

const demoData = {
  'data-analysis': {
    question: 'Where are we losing people in the onboarding flow?',
    steps: '4 Steps',
    stepIcons: ['🔵', '📊', '🟠'],
    responseHeading: "Here's what's happening in your onboarding funnel this month:",
    content: (
      <>
        <div className="gum-content-block">
          <div className="gum-red-dot-title">
            <span className="gum-red-dot"></span>
            <strong>Onboarding Funnel Breakdown</strong>
          </div>
          <table className="gum-table">
            <thead>
              <tr>
                <th>Step</th>
                <th>Users</th>
                <th>Drop-off</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Signed Up</strong></td>
                <td>4,820</td>
                <td>—</td>
                <td>→ Stable</td>
              </tr>
              <tr>
                <td><strong>Completed Profile</strong></td>
                <td>3,340 (69%)</td>
                <td>31%</td>
                <td>↑ 2x since Jan</td>
              </tr>
              <tr>
                <td><strong>Viewed Dashboard</strong></td>
                <td>3,120 (65%)</td>
                <td>7%</td>
                <td>→ Stable</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="gum-content-block">
          <strong>Drop-off by Source</strong>
          <p className="gum-sub-text">Trend: Organic signups retain better through onboarding</p>
          <div className="gum-bar-chart-rows">
            <div className="gum-bar-row">
              <span className="gum-bar-label">Organic</span>
              <div className="gum-bar-track"><div className="gum-bar-fill gum-bar-blue" style={{width: '82%'}}><span>82%</span></div></div>
            </div>
            <div className="gum-bar-row">
              <span className="gum-bar-label">Paid Ads</span>
              <div className="gum-bar-track"><div className="gum-bar-fill gum-bar-purple" style={{width: '58%'}}><span>58%</span></div></div>
            </div>
            <div className="gum-bar-row">
              <span className="gum-bar-label">Referral</span>
              <div className="gum-bar-track"><div className="gum-bar-fill gum-bar-green" style={{width: '71%'}}><span>71%</span></div></div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  'support': {
    question: 'Meridian Corp is reporting a broken CSV export — can you create a bug ticket?',
    steps: '5 Steps',
    stepIcons: ['🔵', '🟠', '🔴'],
    responseHeading: "Done — here's what I created:",
    content: (
      <>
        <div className="gum-content-block gum-ticket-block">
          <div className="gum-ticket-header">
            <span className="gum-ticket-icon">🐛</span>
            <span><strong>BUG-4192</strong> — <em>Meridian Corp: Broken CSV Export</em></span>
          </div>
          <div className="gum-ticket-meta">
            <span><strong>Priority:</strong> High</span>
            <span>· <strong>Type:</strong> Bug</span>
            <span>· <strong>Tags:</strong> <code>csv-export</code> , <code>meridian-corp</code></span>
          </div>
          <p className="gum-ticket-summary">
            <strong>Summary:</strong> Meridian Corp users are unable to successfully export data as CSV. Export either fails or produces an unusable file.
          </p>
          <div className="gum-logged-details">
            <strong>Logged details:</strong>
            <ul>
              <li>Account: Meridian Corp</li>
              <li>Source: Slack (via Support Agent)</li>
              <li>Severity: High</li>
            </ul>
          </div>
          <p className="gum-follow-up">Want me to assign this to a specific engineer, link it to any related issues, or notify the team?</p>
        </div>
      </>
    ),
  },
  'crm': {
    question: "How's our Q1 pipeline looking? Anything at risk?",
    steps: '3 Steps',
    stepIcons: ['🔵', '🟡'],
    responseHeading: "Here's your Q1 pipeline snapshot as of today (March 11):",
    content: (
      <>
        <div className="gum-content-block">
          <strong>Q1 Pipeline Summary</strong>
          <table className="gum-table">
            <thead>
              <tr>
                <th>Deal</th>
                <th>Account</th>
                <th>Stage</th>
                <th>Amount</th>
                <th>Close Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Enterprise Expansion</td>
                <td>Meridian Health</td>
                <td>Negotiation</td>
                <td>$142,000</td>
                <td>Mar 18</td>
              </tr>
              <tr>
                <td>Platform Rollout</td>
                <td>Torchlight Systems</td>
                <td>Proposal Sent</td>
                <td>$98,500</td>
                <td>Mar 24</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="gum-content-block">
          <strong>Q1 Pipeline Coverage</strong>
          <p className="gum-sub-text">$2.4M across 38 active deals</p>
          <div className="gum-bar-chart-rows">
            <div className="gum-bar-row">
              <span className="gum-bar-label">Discovery</span>
              <div className="gum-bar-track"><div className="gum-bar-fill gum-bar-green" style={{width: '65%'}}><span>$540K</span></div></div>
            </div>
            <div className="gum-bar-row">
              <span className="gum-bar-label">Solution Fit</span>
              <div className="gum-bar-track"><div className="gum-bar-fill gum-bar-purple" style={{width: '78%'}}><span>$680K</span></div></div>
            </div>
            <div className="gum-bar-row">
              <span className="gum-bar-label">Security</span>
              <div className="gum-bar-track"><div className="gum-bar-fill gum-bar-blue" style={{width: '52%'}}><span>$430K</span></div></div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  'meeting-prep': {
    question: 'Prep me for my 2pm call with Torchlight Systems.',
    steps: '4 Steps',
    stepIcons: ['🔵', '📋', '🟠'],
    responseHeading: "Here's your briefing for the Torchlight Systems call:",
    content: (
      <>
        <div className="gum-content-block">
          <strong>Meeting Briefing</strong>
          <table className="gum-table">
            <thead>
              <tr>
                <th>Detail</th>
                <th>Info</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Company</strong></td>
                <td>Torchlight Systems — Series B, 220 employees</td>
              </tr>
              <tr>
                <td><strong>Contact</strong></td>
                <td>Sarah Chen, VP Engineering</td>
              </tr>
              <tr>
                <td><strong>Deal Stage</strong></td>
                <td>Proposal Sent — $98,500</td>
              </tr>
              <tr>
                <td><strong>Last Touch</strong></td>
                <td>Demo call on March 5 — positive feedback</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="gum-content-block">
          <strong>Talking Points</strong>
          <ul className="gum-checklist">
            <li>Address security compliance questions from last call</li>
            <li>Share case study: similar deployment at Meridian Health</li>
            <li>Discuss implementation timeline — they want launch by Q2</li>
          </ul>
        </div>
      </>
    ),
  },
  'call-analysis': {
    question: 'What objections keep coming up on our calls this quarter?',
    steps: '5 Steps',
    stepIcons: ['🔵', '⚙️', '🔴'],
    responseHeading: "Here's what's coming up across 143 calls analyzed in Q1 2026:",
    content: (
      <>
        <div className="gum-content-block">
          <div className="gum-red-dot-title">
            <span className="gum-red-dot"></span>
            <strong>Top Objections This Quarter</strong>
          </div>
          <table className="gum-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Objection</th>
                <th>Calls</th>
                <th>Win Rate</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><strong>Pricing / Budget</strong></td>
                <td>61 (43%)</td>
                <td>38%</td>
                <td>→ Stable</td>
              </tr>
              <tr>
                <td>2</td>
                <td><strong>Implementation Timeline</strong></td>
                <td>41 (29%)</td>
                <td>22%</td>
                <td>↑ 3x since Jan</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="gum-content-block">
          <strong>Objections by Deal Stage</strong>
          <p className="gum-sub-text">Trend: Implementation timeline objections climb in late stages</p>
          <div className="gum-stage-grid">
            <div className="gum-stage-header">
              <span></span>
              <span>Discovery</span>
              <span>Demo</span>
              <span>Negotiation</span>
            </div>
            <div className="gum-stage-row">
              <span className="gum-stage-label">Pricing</span>
              <span className="gum-stage-cell">12%</span>
              <span className="gum-stage-cell">18%</span>
              <span className="gum-stage-cell gum-stage-high">42%</span>
            </div>
            <div className="gum-stage-row">
              <span className="gum-stage-label">Implementation Timeline</span>
              <span className="gum-stage-cell">7%</span>
              <span className="gum-stage-cell">15%</span>
              <span className="gum-stage-cell gum-stage-high">24%</span>
            </div>
            <div className="gum-stage-row">
              <span className="gum-stage-label">Feature Gaps</span>
              <span className="gum-stage-cell">4%</span>
              <span className="gum-stage-cell">16%</span>
              <span className="gum-stage-cell">22%</span>
            </div>
          </div>
        </div>
      </>
    ),
  },
}

// Avatar color palette
const avatarColors = [
  'linear-gradient(135deg, #ec4899, #f472b6)',
  'linear-gradient(135deg, #8b5cf6, #a78bfa)',
  'linear-gradient(135deg, #3b82f6, #60a5fa)',
  'linear-gradient(135deg, #10b981, #34d399)',
  'linear-gradient(135deg, #f59e0b, #fbbf24)',
]

const PremiumHero = () => {
  const [selectedId, setSelectedId] = useState('support')

  const currentAgent = agents.find((a) => a.id === selectedId)
  const currentDemo = demoData[selectedId]

  return (
    <section className="gum-agents-section">
      <div className="gum-agents-container">
        {/* LEFT SIDE */}
        <div className="gum-agents-left">
          <h2 className="gum-agents-title">
            Roll out specialized<br />agents in minutes
          </h2>

          <div className="gum-agents-nav">
            {agents.map((agent) => {
              const isActive = agent.id === selectedId
              return (
                <div
                  key={agent.id}
                  className={`gum-agent-item ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedId(agent.id)}
                >
                  <h3 className="gum-agent-name">{agent.title}</h3>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        className="gum-agent-expanded"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="gum-agent-expanded-inner">
                          <div className="gum-agent-icon-wrap">
                            <span className="gum-agent-icon">{agent.icon}</span>
                          </div>
                          <div className="gum-agent-details">
                            <h4 className="gum-agent-details-title">{agent.title}</h4>
                            <p className="gum-agent-details-desc">{agent.description}</p>
                            <div className="gum-agent-team">
                              <div className="gum-avatars">
                                {agent.creators.map((name, i) => (
                                  <div
                                    key={i}
                                    className="gum-avatar"
                                    style={{ background: avatarColors[i % avatarColors.length] }}
                                    title={name}
                                  >
                                    {name.charAt(0)}
                                  </div>
                                ))}
                              </div>
                              <span className="gum-team-label">
                                {agent.team} - Built by {agent.creators.join(', ')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="gum-agents-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              className="gum-demo-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* User message bubble */}
              <div className="gum-user-bubble">
                <p className="gum-user-text">{currentDemo.question}</p>
                <div className="gum-user-avatar">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>

              {/* FlowMitra response card */}
              <div className="gum-response-card">
                {/* Header row */}
                <div className="gum-response-header">
                  <span className="gum-response-chevron">›</span>
                  <span className="gum-response-brand">FlowMitra</span>
                </div>
                <div className="gum-response-meta">
                  <div className="gum-step-icons">
                    {currentDemo.stepIcons.map((icon, i) => (
                      <span key={i} className="gum-step-icon">{icon}</span>
                    ))}
                  </div>
                  <span className="gum-step-count">{currentDemo.steps}</span>
                </div>

                {/* Response body */}
                <div className="gum-response-body">
                  <p className="gum-response-heading">{currentDemo.responseHeading}</p>
                  {currentDemo.content}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default PremiumHero
