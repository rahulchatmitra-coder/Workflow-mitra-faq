import { useState } from 'react'
import './AgentsShowcase.css'

export default function AgentsShowcase() {
  const [activeTab, setActiveTab] = useState(0)

  const agents = [
    {
      id: 'data-analysis',
      title: 'Data Analysis Agent',
      description: 'An AI agent that answers complex questions by analyzing your company data warehouse.',
      icon: '📊',
      color: 'var(--color-brand-blue)',
      team: ['Max', 'Emma']
    },
    {
      id: 'support',
      title: 'Support Agent',
      description: 'An agent that automatically triages support tickets, tags bugs, and creates Jira issues.',
      icon: '💬',
      color: 'var(--color-brand-green)',
      team: ['Katherine', 'Gonzalo']
    },
    {
      id: 'crm',
      title: 'CRM Agent',
      description: 'Automate Salesforce entry, enrich leads, and draft personalized follow-up sequences.',
      icon: '💼',
      color: 'var(--color-brand-orange)',
      team: ['Mike', 'Lizzy']
    },
    {
      id: 'meeting-prep',
      title: 'Meeting Prep Agent',
      description: 'Generates comprehensive dossiers on prospects before your sales calls.',
      icon: '📝',
      color: 'var(--color-brand-purple)',
      team: ['Aron']
    },
    {
      id: 'call-analysis',
      title: 'Call Analysis Agent',
      description: 'Extracts action items, sentiment, and objections from Gong/Zoom transcripts.',
      icon: '📞',
      color: 'var(--color-brand-pink)',
      team: ['Marcelo', 'Sarah']
    }
  ]

  return (
    <section className="agents-showcase-section">
      <div className="container">
        <div className="showcase-grid">
          
          {/* Left Side: Accordion */}
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
                    style={{ '--agent-color': agent.color }}
                  >
                    <div className="accordion-header">
                      <div className="agent-icon-box">{agent.icon}</div>
                      <h3 className="agent-title">{agent.title}</h3>
                    </div>
                    
                    <div className="accordion-body">
                      <div className="accordion-content">
                        <p className="agent-desc">{agent.description}</p>
                        <div className="agent-team">
                          <span className="team-label">Built by</span>
                          <div className="team-avatars">
                            {agent.team.map((member, i) => (
                              <div key={i} className="team-avatar" title={member}>
                                {member.charAt(0)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Side: Preview Panel */}
          <div className="showcase-preview-container">
            <div className="preview-panel">
              <div className="preview-header">
                <div className="window-controls">
                  <span></span><span></span><span></span>
                </div>
                <div className="window-title">Agent Preview</div>
              </div>
              <div className="preview-body">
                {/* Mock visualization changing based on active tab */}
                <div className="mock-dashboard" key={activeTab}>
                  <div className="dashboard-header">
                    <div className="agent-badge" style={{ backgroundColor: `${agents[activeTab].color}15`, color: agents[activeTab].color }}>
                      {agents[activeTab].icon} {agents[activeTab].title}
                    </div>
                    <div className="status-badge">● Active</div>
                  </div>
                  
                  <div className="chart-container">
                    <div className="chart-title">Weekly Activity</div>
                    <div className="bar-chart">
                      {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                        <div className="chart-col" key={i}>
                          <div 
                            className="chart-bar" 
                            style={{ 
                              height: `${height}%`, 
                              backgroundColor: agents[activeTab].color 
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="recent-logs">
                    <div className="log-title">Recent Executions</div>
                    {[1, 2, 3].map((item) => (
                      <div className="log-row" key={item}>
                        <div className="log-icon" style={{ backgroundColor: agents[activeTab].color }}></div>
                        <div className="log-text">
                          <div className="log-name">Task {item} completed successfully</div>
                          <div className="log-time">{item * 2}m ago</div>
                        </div>
                        <div className="log-status">Success</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
