import { useEffect, useState } from 'react'
import './HeroAI.css'

function HeroAI() {
  const [activeNode, setActiveNode] = useState(null)

  // Workflow nodes like n8n's canvas
  const workflowNodes = [
    { id: 1, type: 'trigger', label: 'Gmail Trigger', icon: 'gmail', position: { x: 10, y: 45 }, color: '#EA4335' },
    { id: 2, type: 'ai', label: 'AI Process', icon: 'ai', position: { x: 35, y: 45 }, color: '#8B5CF6' },
    { id: 3, type: 'action', label: 'Google Sheets', icon: 'sheets', position: { x: 60, y: 35 }, color: '#0F9D58' },
    { id: 4, type: 'action', label: 'Slack Notify', icon: 'slack', position: { x: 60, y: 55 }, color: '#4A154B' },
  ]

  const connections = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 2, to: 4 },
  ]

  const getNodeIcon = (icon) => {
    const icons = {
      gmail: (
        <svg viewBox="0 0 48 48" width="24" height="24">
          <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"/>
          <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"/>
          <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/>
        </svg>
      ),
      sheets: (
        <svg viewBox="0 0 48 48" width="24" height="24">
          <path fill="#43a047" d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"/>
          <path fill="#e8f5e9" d="M31,23H17c-0.552,0-1,0.448-1,1v12c0,0.552,0.448,1,1,1h14c0.552,0,1-0.448,1-1V24C32,23.448,31.552,23,31,23z"/>
        </svg>
      ),
      slack: (
        <svg viewBox="0 0 48 48" width="24" height="24">
          <path fill="#33d375" d="M33,8c0-2.209-1.791-4-4-4s-4,1.791-4,4c0,0.253,0,11,0,11h4c2.209,0,4-1.791,4-4S33,8.253,33,8z"/>
          <path fill="#40c4ff" d="M43,19c0-2.209-1.791-4-4-4c-0.253,0-11,0-11,0v4c0,2.209,1.791,4,4,4S43,21.209,43,19z"/>
        </svg>
      ),
      ai: (
        <svg viewBox="0 0 48 48" width="24" height="24">
          <circle fill="#8B5CF6" cx="24" cy="24" r="20"/>
          <path fill="#fff" d="M24,12l-2,8h-4l6,8l2-8h4L24,12z"/>
        </svg>
      ),
    }
    return icons[icon]
  }

  return (
    <section className="hero-ai">
      {/* Announcement */}
      <div className="announcement">
        <span className="badge">AI-Powered</span>
        <span>Build intelligent workflows with FlowMitra</span>
      </div>

      {/* Main Content */}
      <div className="hero-container">
        <div className="hero-left">
          <h1 className="hero-title">
            AI Workflow
            <br />
            <span className="gradient-text">Automation</span>
            <br />
            Made Simple
          </h1>
          <p className="hero-description">
            Connect your apps, add AI logic, and automate anything.
            No code required. Visual, powerful, and built for teams.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Start Building Free</button>
            <button className="btn-secondary">Watch Demo</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">400+</div>
              <div className="stat-label">Integrations</div>
            </div>
            <div className="stat">
              <div className="stat-number">10M+</div>
              <div className="stat-label">Workflows Run</div>
            </div>
            <div className="stat">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Active Users</div>
            </div>
          </div>
        </div>

        {/* Visual Workflow Canvas */}
        <div className="hero-right">
          <div className="workflow-canvas">
            <div className="canvas-header">
              <div className="canvas-title">Example Workflow</div>
              <div className="canvas-status">
                <span className="status-dot"></span> Running
              </div>
            </div>

            <div className="canvas-content">
              {/* Nodes */}
              {workflowNodes.map((node) => (
                <div
                  key={node.id}
                  className={`workflow-node ${node.type} ${activeNode === node.id ? 'active' : ''}`}
                  style={{
                    left: `${node.position.x}%`,
                    top: `${node.position.y}%`,
                  }}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                >
                  <div className="node-icon" style={{ borderColor: node.color }}>
                    {getNodeIcon(node.icon)}
                  </div>
                  <div className="node-label">{node.label}</div>
                  {node.type === 'ai' && <div className="ai-badge">AI</div>}
                </div>
              ))}

              {/* Connections */}
              <svg className="connections" viewBox="0 0 100 100">
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
                  </marker>
                </defs>
                {connections.map((conn, idx) => {
                  const fromNode = workflowNodes.find(n => n.id === conn.from)
                  const toNode = workflowNodes.find(n => n.id === conn.to)
                  return (
                    <path
                      key={idx}
                      d={`M ${fromNode.position.x + 8} ${fromNode.position.y} L ${toNode.position.x - 2} ${toNode.position.y}`}
                      stroke="#94a3b8"
                      strokeWidth="2"
                      fill="none"
                      markerEnd="url(#arrow)"
                      className="connection-line"
                    />
                  )
                })}
              </svg>

              {/* Data flowing animation */}
              <div className="data-particle" style={{ left: '15%', top: '45%' }}></div>
              <div className="data-particle" style={{ left: '40%', top: '45%', animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroAI
