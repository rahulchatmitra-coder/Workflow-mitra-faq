import { useState } from 'react'
import './AgentsShowcase.css'

export default function AgentsShowcase() {
  const [activeTab, setActiveTab] = useState(0)

  const agents = [
    {
      id: 'data-analysis',
      title: 'Data Analysis Agent',
      description: 'A reasoning agent that answers questions from your data warehouse.',
      icon: '📊',
      color: '#3B82F6',
      team: ['Aron', 'Katherine', 'Max'],
      teamColors: ['#6366F1', '#EC4899', '#10B981'],
      teamLabel: 'Data'
    },
    {
      id: 'support',
      title: 'Support Agent',
      description: 'An agent that triages bugs, creates tickets, and spots support patterns automatically.',
      icon: '💬',
      color: '#10B981',
      team: ['Gonzalo', 'Katherine', 'Marcelo'],
      teamColors: ['#8B5CF6', '#EC4899', '#F59E0B'],
      teamLabel: 'Support'
    },
    {
      id: 'crm',
      title: 'CRM Agent',
      description: 'Automate Salesforce entry, enrich leads, and draft personalized follow-up sequences.',
      icon: '💼',
      color: '#F59E0B',
      team: ['Mike', 'Lizzy'],
      teamColors: ['#3B82F6', '#EC4899'],
      teamLabel: 'Sales'
    },
    {
      id: 'meeting-prep',
      title: 'Meeting Prep Agent',
      description: 'Generates comprehensive dossiers on prospects before your sales calls.',
      icon: '📝',
      color: '#8B5CF6',
      team: ['Aron'],
      teamColors: ['#6366F1'],
      teamLabel: 'Sales'
    },
    {
      id: 'call-analysis',
      title: 'Call Analysis Agent',
      description: 'An agent that analyzes call recordings to surface objection patterns, coaching insights, and competitive intelligence.',
      icon: '📞',
      color: '#EC4899',
      team: ['Aron', 'Katherine', 'Marcelo'],
      teamColors: ['#6366F1', '#EC4899', '#F59E0B'],
      teamLabel: 'Sales'
    }
  ]

  const renderPreview = () => {
    const agent = agents[activeTab]

    if (agent.id === 'data-analysis') {
      return (
        <div className="preview-content data-preview">
          <div className="chat-row user">
            <div className="chat-bubble user-bubble">
              Where are we losing people in the onboarding flow?
            </div>
            <div className="chat-avatar">👤</div>
          </div>

          <div className="agent-block">
            <div className="steps-row">
              <span className="steps-dot"></span>
              <span>4 Steps</span>
            </div>
            <p className="agent-intro">Here's where you're losing people:</p>

            <div className="alert critical">
              <strong>🚨 Biggest drop-off:</strong> Dashboard → Attempted Integration{' '}
              <strong>46% of users</strong> who view the dashboard never even try to connect an
              integration — that's 1,432 people falling off in a single step. This is your #1 problem.
            </div>

            <div className="alert warning">
              <strong>⚠️ Secondary drop-off:</strong> Attempted → Completed Integration Of the
              users who do try, <strong>37% fail to complete it</strong>. Combined, only 22% of
              signups make it through the integration step at all.
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Users</th>
                  <th>Drop-off</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Signed Up</td><td>4,820</td><td>—</td></tr>
                <tr><td>Completed Profile</td><td>3,040</td><td>37%</td></tr>
                <tr><td>Viewed Dashboard</td><td>2,810</td><td>8%</td></tr>
                <tr><td>Attempted Integration</td><td>1,518</td><td>46%</td></tr>
                <tr><td>Completed Integration</td><td>956</td><td>37%</td></tr>
              </tbody>
            </table>

            <div className="chart-card">
              <div className="chart-label">Weekly Active Users</div>
              <div className="bars">
                {[45, 52, 38, 65, 48, 72, 55, 68, 42, 58, 75, 50, 62, 70, 48, 55, 80, 60, 68, 45].map(
                  (h, i) => (
                    <div
                      key={i}
                      className={`bar ${i === 11 ? 'bar-highlight' : ''}`}
                      style={{ height: `${h}%` }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (agent.id === 'support') {
      return (
        <div className="preview-content support-preview">
          <div className="chat-row user">
            <div className="chat-bubble user-bubble">
              Meridian Corp is reporting a broken CSV export — can you create a bug ticket?
            </div>
            <div className="chat-avatar">👤</div>
          </div>

          <div className="agent-block">
            <div className="steps-row">
              <span className="steps-icons">
                <span className="si">📋</span>
                <span className="si">🔗</span>
                <span className="si">✅</span>
              </span>
              <span>5 Steps</span>
            </div>

            <p className="agent-intro">Done — here's what I created:</p>

            <div className="ticket-created">
              <div className="ticket-header-line">
                <span className="bug-icon">🐛</span>
                <strong>BUG-4192</strong> — Meridian Corp: Broken CSV Export
                <span className="priority-tag">Priority: High</span>
              </div>
              <div className="ticket-meta-line">
                Type: Bug · Tags:{' '}
                <span className="tag">csv-export</span>{' '}
                <span className="tag">meridian-corp</span>
              </div>
              <p className="ticket-summary-text">
                <strong>Summary:</strong> Meridian Corp users are unable to successfully export data
                as CSV. Export either fails or produces an unusable file.
              </p>
              <div className="logged-details">
                <strong>Logged details:</strong>
                <ul>
                  <li>Account: Meridian Corp</li>
                  <li>Source: Slack (via Support Agent)</li>
                  <li>Severity: High</li>
                </ul>
              </div>
            </div>

            <p className="agent-followup">
              Want me to assign this to a specific engineer, link it to any related tickets, or
              escalate?
            </p>

            <div className="eng-card">
              <div className="eng-card-left">
                <div className="eng-icon">🔧</div>
                <div>
                  <div className="eng-title">Fix CSV Exporting Timeout Bug</div>
                  <div className="eng-id">ENG-1847</div>
                  <div className="eng-summary-label">Summary</div>
                  <div className="eng-summary">
                    The CSV export feature has been experiencing timeout issues for the past few
                    days.
                  </div>
                </div>
              </div>
              <div className="eng-card-right">
                <div className="eng-status">
                  <span className="status-dot"></span> In Progress
                </div>
                <div className="eng-priority">↑ High</div>
                <div className="eng-assignee">
                  <span className="assignee-av">M</span> Marcelo
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (agent.id === 'call-analysis') {
      return (
        <div className="preview-content call-preview">
          <div className="chat-row user">
            <div className="chat-bubble user-bubble">
              What were the top objections in Q1 sales calls?
            </div>
            <div className="chat-avatar">👤</div>
          </div>

          <div className="agent-block">
            <div className="steps-row">
              <span className="steps-dot"></span>
              <span>3 Steps</span>
            </div>
            <p className="agent-intro">Analyzed 143 calls in Q1 — top objections surfaced:</p>

            <table className="data-table objections-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Objection</th>
                  <th>Calls</th>
                  <th>Win Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Pricing / Budget</td>
                  <td>61 (43%)</td>
                  <td>38%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Implementation Timeline</td>
                  <td>41 (29%)</td>
                  <td>22%</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Feature Gaps</td>
                  <td>28 (20%)</td>
                  <td>31%</td>
                </tr>
              </tbody>
            </table>

            <div className="insight-box">
              <strong>Insight:</strong> Pricing objections with a clear ROI case study closed at 52%
              win rate vs 28% without one. Recommend adding ROI one-pager to discovery decks.
            </div>
          </div>
        </div>
      )
    }

    if (agent.id === 'crm') {
      return (
        <div className="preview-content crm-preview">
          <div className="chat-row user">
            <div className="chat-bubble user-bubble">
              New lead from webinar: jane@acme.io — enrich and create Salesforce opportunity
            </div>
            <div className="chat-avatar">👤</div>
          </div>

          <div className="agent-block">
            <div className="steps-row">
              <span className="steps-dot"></span>
              <span>4 Steps</span>
            </div>
            <p className="agent-intro">Done. Here's what I added:</p>

            <div className="crm-card">
              <div className="crm-row">
                <span className="crm-label">Contact</span>
                <span>Jane Doe · jane@acme.io</span>
              </div>
              <div className="crm-row">
                <span className="crm-label">Company</span>
                <span>Acme Inc · 240 employees · SaaS</span>
              </div>
              <div className="crm-row">
                <span className="crm-label">Opportunity</span>
                <span>OPP-9921 · $48k · Stage: Discovery</span>
              </div>
              <div className="crm-row">
                <span className="crm-label">Owner</span>
                <span>Assigned to Lizzy</span>
              </div>
            </div>

            <p className="agent-followup">
              I also drafted a follow-up email. Want me to send it or put it in her drafts?
            </p>
          </div>
        </div>
      )
    }

    if (agent.id === 'meeting-prep') {
      return (
        <div className="preview-content meeting-preview">
          <div className="chat-row user">
            <div className="chat-bubble user-bubble">
              Prep me for the call with Northwind at 2pm
            </div>
            <div className="chat-avatar">👤</div>
          </div>

          <div className="agent-block">
            <div className="steps-row">
              <span className="steps-dot"></span>
              <span>5 Steps</span>
            </div>
            <p className="agent-intro">Here's your briefing for Northwind:</p>

            <div className="brief-card">
              <div className="brief-section">
                <strong>Company</strong>
                <p>Northwind Traders · Series B · 180 employees · Logistics SaaS</p>
              </div>
              <div className="brief-section">
                <strong>Attendees</strong>
                <p>Sarah Chen (VP Ops), Marcus Lee (Head of Procurement)</p>
              </div>
              <div className="brief-section">
                <strong>Recent signals</strong>
                <ul>
                  <li>Opened pricing page 4× this week</li>
                  <li>Competitor eval vs ShipBob mentioned in last email</li>
                  <li>Current contract with legacy vendor ends Aug 2026</li>
                </ul>
              </div>
              <div className="brief-section">
                <strong>Suggested angle</strong>
                <p>Lead with ROI on warehouse throughput + migration timeline under 6 weeks.</p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <section className="agents-showcase-section">
      <div className="container">
        <div className="showcase-grid">
          <div className="showcase-accordion">
            <h2 className="showcase-heading">
              Roll out specialized
              <br />
              agents in minutes
            </h2>

            <div className="accordion-list">
              {agents.map((agent, idx) => {
                const isActive = activeTab === idx
                return (
                  <div
                    key={agent.id}
                    className={`accordion-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTab(idx)}
                  >
                    <div className="accordion-header">
                      {isActive && (
                        <div className="agent-icon-box" style={{ color: agent.color }}>
                          {agent.icon}
                        </div>
                      )}
                      <h3 className="agent-title">{agent.title}</h3>
                    </div>

                    {isActive && (
                      <div className="accordion-body">
                        <p className="agent-desc">{agent.description}</p>
                        <div className="agent-team">
                          <div className="team-avatars">
                            {agent.team.map((member, i) => (
                              <div
                                key={i}
                                className="team-avatar"
                                style={{ background: agent.teamColors[i] }}
                                title={member}
                              >
                                {member.charAt(0)}
                              </div>
                            ))}
                          </div>
                          <span className="team-label">
                            {agent.teamLabel} · Built by {agent.team.join(', ')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="showcase-preview-container">
            <div className="preview-panel">{renderPreview()}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
