import { useState } from 'react'
import './AgentsShowcase.css'

function AgentsShowcase() {
  const [selectedAgent, setSelectedAgent] = useState('data-analysis')

  const agents = [
    {
      id: 'data-analysis',
      icon: '📊',
      title: 'Data Analysis Agent',
      description: 'A reasoning agent that answers questions from your data warehouse.',
      creators: ['Aron', 'Katherine', 'Max'],
      link: 'Data - Built by Aron, Katherine, Max'
    },
    {
      id: 'support',
      icon: '💬',
      title: 'Support Agent',
      description: 'An AI agent that handles customer support tickets automatically.',
      creators: ['Sarah', 'John'],
      link: 'Support - Built by Sarah, John'
    },
    {
      id: 'sales',
      icon: '💼',
      title: 'Sales Agent',
      description: 'Automate lead qualification and follow-ups with intelligent responses.',
      creators: ['Mike', 'Emma'],
      link: 'Sales - Built by Mike, Emma'
    }
  ]

  const demoData = {
    'data-analysis': {
      question: 'Where are we losing people in the onboarding flow?',
      workflow: 'FlowMitra',
      steps: '4 Steps',
      insights: [
        {
          icon: '🔴',
          title: 'Biggest drop-off: Dashboard → Attempted Integration 46%',
          detail: 'of users who view the dashboard never even try to connect an integration — that\'s 1,432 people falling off in a single step. This is your #1 problem.'
        },
        {
          icon: '⚠️',
          title: 'Secondary drop-off: Attempted → Completed Integration',
          detail: 'Of the users who do try, 37% fail to complete it. Combined, only 22% of signups make it through the integration step at all.'
        }
      ],
      table: {
        headers: ['Step', 'Users', 'Drop-off'],
        rows: [
          ['Signed Up', '4,820', '—'],
          ['Completed Profile', '3,340', '18%'],
          ['Viewed Dashboard', '3,120', '7%']
        ]
      }
    },
    'support': {
      question: 'How can we automate customer support responses?',
      workflow: 'FlowMitra',
      steps: '3 Steps',
      insights: [
        {
          icon: '✅',
          title: 'Auto-resolve 60% of common tickets',
          detail: 'The AI agent can instantly handle password resets, billing questions, and account updates — saving your team 15 hours per week.'
        },
        {
          icon: '📊',
          title: 'Response time improved by 85%',
          detail: 'Average response time dropped from 4 hours to 35 minutes. Customer satisfaction scores increased by 23%.'
        }
      ],
      table: {
        headers: ['Ticket Type', 'Count', 'Auto-Resolved'],
        rows: [
          ['Password Reset', '1,240', '98%'],
          ['Billing Question', '890', '92%'],
          ['Account Update', '620', '87%']
        ]
      }
    },
    'sales': {
      question: 'Which leads should we prioritize this week?',
      workflow: 'FlowMitra',
      steps: '5 Steps',
      insights: [
        {
          icon: '🎯',
          title: 'High-value leads identified: 42 companies',
          detail: 'AI scoring found 42 leads with >80% conversion probability based on engagement, company size, and behavior patterns.'
        },
        {
          icon: '💰',
          title: 'Potential revenue: $340K in pipeline',
          detail: 'These leads represent $340K in potential ARR. Top 10 leads have engaged 5+ times in past 7 days.'
        }
      ],
      table: {
        headers: ['Lead Score', 'Companies', 'Avg Revenue'],
        rows: [
          ['90-100', '12', '$15K'],
          ['80-89', '30', '$8K'],
          ['70-79', '45', '$5K']
        ]
      }
    }
  }

  const currentDemo = demoData[selectedAgent]

  return (
    <section className="agents-showcase">
      <div className="showcase-container">
        {/* Left Side - Title & Agent Cards */}
        <div className="showcase-left">
          <h2 className="showcase-title">
            Roll out specialized
            <br />
            agents in minutes
          </h2>

          <div className="agents-list">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`agent-card ${selectedAgent === agent.id ? 'active' : ''}`}
                onClick={() => setSelectedAgent(agent.id)}
              >
                <div className="agent-icon">{agent.icon}</div>
                <div className="agent-info">
                  <h3 className="agent-title">{agent.title}</h3>
                  <p className="agent-description">{agent.description}</p>
                  <div className="agent-creators">
                    {agent.creators.map((creator, idx) => (
                      <div key={idx} className="creator-avatar" title={creator}>
                        {creator.charAt(0)}
                      </div>
                    ))}
                    <span className="agent-link">{agent.link}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Demo Preview */}
        <div className="showcase-right">
          {/* User Question Bubble */}
          <div className="user-question-bubble">
            <div className="user-avatar">U</div>
            <div className="question-text">{currentDemo.question}</div>
          </div>

          {/* Main Response Card */}
          <div className="demo-window">
            <div className="demo-content">
              {/* Header Row */}
              <div className="workflow-header">
                <div className="workflow-icon">⚡</div>
                <span className="workflow-name">{currentDemo.workflow}</span>
                <span className="chevron">›</span>
                <div className="step-avatars">
                  <div className="step-avatar">1</div>
                  <div className="step-avatar">2</div>
                  <div className="step-avatar">3</div>
                </div>
                <div className="steps-badge">{currentDemo.steps}</div>
              </div>

              {/* Heading */}
              <h3 className="demo-heading">Here's how we're solving it:</h3>

              {/* Callout Boxes */}
              <div className="callout-boxes">
                {currentDemo.insights.map((insight, idx) => (
                  <div key={idx} className="callout-box">
                    <div className="callout-title">
                      <span className="callout-icon">{insight.icon}</span>
                      {insight.title}
                    </div>
                    <p className="callout-detail">{insight.detail}</p>
                  </div>
                ))}
              </div>

              {/* Data Table (fixed height with overflow) */}
              <div className="data-table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      {currentDemo.table.headers.map((header, idx) => (
                        <th key={idx}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentDemo.table.rows.map((row, idx) => (
                      <tr key={idx}>
                        {row.map((cell, cellIdx) => (
                          <td key={cellIdx}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Floating Stat Card */}
          <div className="floating-stat-card">
            <h4 className="stat-card-title">Tickets Auto-Resolved This Week</h4>
            <div className="bar-chart">
              <div className="bars">
                <div className="bar" style={{height: '45%'}}></div>
                <div className="bar" style={{height: '52%'}}></div>
                <div className="bar" style={{height: '48%'}}></div>
                <div className="bar" style={{height: '62%'}}></div>
                <div className="bar" style={{height: '58%'}}></div>
                <div className="bar highlight" style={{height: '78%'}}></div>
                <div className="bar" style={{height: '65%'}}></div>
                <div className="bar" style={{height: '70%'}}></div>
                <div className="bar" style={{height: '55%'}}></div>
                <div className="bar" style={{height: '60%'}}></div>
                <div className="bar" style={{height: '68%'}}></div>
                <div className="bar" style={{height: '72%'}}></div>
              </div>
              <div className="chart-labels">
                <span>W1</span>
                <span>W6</span>
                <span>W12</span>
                <span>W18</span>
                <span>W24</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AgentsShowcase
