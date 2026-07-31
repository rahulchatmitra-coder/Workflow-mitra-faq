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
      teamColors: ['#6366F1', '#EC4899', '#10B981']
    },
    {
      id: 'support',
      title: 'Support Agent',
      description: 'An agent that triages bugs, creates tickets, and spots support patterns automatically.',
      icon: '💬',
      color: '#10B981',
      team: ['Gonzalo', 'Katherine', 'Marcelo'],
      teamColors: ['#8B5CF6', '#EC4899', '#F59E0B']
    },
    {
      id: 'crm',
      title: 'CRM Agent',
      description: 'Automate Salesforce entry, enrich leads, and draft personalized follow-up sequences.',
      icon: '💼',
      color: '#F59E0B',
      team: ['Mike', 'Lizzy'],
      teamColors: ['#3B82F6', '#EC4899']
    },
    {
      id: 'meeting-prep',
      title: 'Meeting Prep Agent',
      description: 'Generates comprehensive dossiers on prospects before your sales calls.',
      icon: '📝',
      color: '#8B5CF6',
      team: ['Aron'],
      teamColors: ['#6366F1']
    },
    {
      id: 'call-analysis',
      title: 'Call Analysis Agent',
      description: 'Extracts action items, sentiment, and objections from Gong/Zoom transcripts.',
      icon: '📞',
      color: '#EC4899',
      team: ['Marcelo', 'Sarah'],
      teamColors: ['#F59E0B', '#10B981']
    }
  ]

  const renderPreview = () => {
    const agent = agents[activeTab]

    // Data Analysis Agent – matches Gumloop second screenshot
    if (agent.id === 'data-analysis') {
      return (
        <div className="preview-content data-preview">
          <div className="chat-bubble user">
            <span>Where are we losing people in the onboarding flow?</span>
            <div className="avatar-sm">👤</div>
          </div>

          <div className="agent-response">
            <div className="steps-badge">
              <span className="dot"></span> 4 Steps
            </div>
            <p className="response-intro">Here's where you're losing people:</p>

            <div className="alert-box critical">
              <strong>🚨 Biggest drop-off:</strong> Dashboard → Attempted Integration
              <span className="highlight">46% of users</span> who view the dashboard never even try to connect an integration — that's 1,432 people falling off in a single step. This is your #1 problem.
            </div>

            <div className="alert-box warning">
              <strong>⚠️ Secondary drop-off:</strong> Attempted → Completed Integration
              Of the users who do try, <span className="highlight">37% fail to complete it</span>. Combined, only 22% of signups make it through the integration step at all.
            </div>

            <table className="dropoff-table">
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Users</th>
                  <th>Drop-off</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Signed Up</td>
                  <td>4,820</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>Completed Profile</td>
                  <td>3,040</td>
                  <td>37%</td>
                </tr>
                <tr>
                  <td>Viewed Dashboard</td>
                  <td>2,810</td>
                  <td>8%</td>
                </tr>
                <tr>
                  <td>Attempted Integration</td>
                  <td>1,518</td>
                  <td>46%</td>
                </tr>
                <tr>
                  <td>Completed Integration</td>
                  <td>956</td>
                  <td>37%</td>
                </tr>
              </tbody>
            </table>

            <div className="chart-card">
              <div className="chart-title">Weekly Active Users</div>
              <div className="bar-chart">
                {[45, 52, 38, 65, 48, 72, 55, 68, 42, 58, 75, 50, 62, 70, 48, 55, 80, 60, 68, 45].map((h, i) => (
                  <div
                    key={i}
                    className={`bar ${i === 11 ? 'highlight-bar' : ''}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Support Agent – matches first screenshot
    if (agent.id === 'support') {
      return (
        <div className="preview-content support-preview">
          <div className="link-banner">
            <span className="check">✓</span>
            BUG-4192 is now linked to the following existing CSV export issues:
          </div>

          <table className="tickets-table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Account</th>
                <th>Status</th>
                <th>Reported</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BUG-3874</td>
                <td>Thrift Bank</td>
                <td><span className="status open">Open</span></td>
                <td>Feb 14</td>
              </tr>
              <tr>
                <td>BUG-3911</td>
                <td>Meridian Corp</td>
                <td><span className="status progress">In Progress</span></td>
                <td>Feb 18</td>
              </tr>
              <tr>
                <td>BUG-4022</td>
                <td>Northwind</td>
                <td><span className="status open">Open</span></td>
                <td>Feb 22</td>
              </tr>
              <tr>
                <td>BUG-4105</td>
                <td>Acme Inc</td>
                <td><span className="status open">Open</span></td>
                <td>Feb 25</td>
              </tr>
            </tbody>
          </table>

          <p className="systemic-note">
            This is the 5th reported instance of CSV export issues in the last month.
            Looks like this may be a systemic issue with the export timeout on large datasets.
          </p>

          <p className="escalate-prompt">
            Want me to escalate this cluster to the engineering team, or flag it on the product side?
          </p>

          <div className="ticket-detail-card">
            <div className="ticket-title">Fix CSV Exporting Timeout Bug</div>
            <div className="ticket-id">ENG-1847</div>
            <div className="ticket-summary">
              <strong>SUMMARY</strong>
              <p>CSV export fails on datasets over 10k rows</p>
            </div>
            <div className="ticket-meta">
              <div><span>STATUS</span> <strong className="status progress">In Progress</strong></div>
              <div><span>PRIORITY</span> <strong>High</strong></div>
              <div><span>ASSIGNEE</span> <strong>Marcelo</strong></div>
            </div>
          </div>
        </div>
      )
    }

    // Generic fallback for other agents
    return (
      <div className="preview-content generic-preview">
        <div className="agent-badge" style={{ background: `${agent.color}15`, color: agent.color }}>
          {agent.icon} {agent.title}
        </div>
        <div className="status-line">● Active · Running</div>
        <div className="chart-container">
          <div className="chart-title">Weekly Activity</div>
          <div className="bar-chart">
            {[40, 65, 45, 80, 55, 90, 70, 50, 75, 60].map((height, i) => (
              <div
                key={i}
                className="bar"
                style={{ height: `${height}%`, background: agent.color }}
              />
            ))}
          </div>
        </div>
        <div className="recent-logs">
          <div className="log-title">Recent Executions</div>
          {[1, 2, 3].map((item) => (
            <div className="log-row" key={item}>
              <div className="log-dot" style={{ background: agent.color }} />
              <div className="log-text">
                <div>Task {item} completed successfully</div>
                <div className="log-time">{item * 2}m ago</div>
              </div>
              <div className="log-status">Success</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="agents-showcase-section">
      <div className="container">
        <div className="showcase-grid">
          {/* Left: Accordion */}
          <div className="showcase-accordion">
            <h2 className="showcase-heading">
              Roll out specialized<br />agents in minutes
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
                      {isActive && <div className="agent-icon-box">{agent.icon}</div>}
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
                            {agent.title.split(' ')[0]} · Built by {agent.team.join(', ')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Preview Panel */}
          <div className="showcase-preview-container">
            <div className="preview-panel">
              {renderPreview()}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
