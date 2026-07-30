import { useEffect, useState } from 'react'
import './HeroAnimated.css'

function HeroAnimated() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorPositions, setCursorPositions] = useState([
    { id: 1, name: 'Aron', x: 15, y: 45, color: '#E8388A', targetX: 15, targetY: 45 },
    { id: 2, name: 'Lizzy', x: 85, y: 55, color: '#3B82F6', targetX: 85, targetY: 55 }
  ])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorPositions(prev => prev.map(cursor => ({
        ...cursor,
        targetX: cursor.targetX + (Math.random() - 0.5) * 10,
        targetY: cursor.targetY + (Math.random() - 0.5) * 10
      })))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getIconSvg = (iconId) => {
    const icons = {
      gmail: (
        <svg viewBox="0 0 48 48" width="32" height="32">
          <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"/>
          <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"/>
          <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/>
          <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"/>
          <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"/>
        </svg>
      ),
      sheets: (
        <svg viewBox="0 0 48 48" width="32" height="32">
          <path fill="#43a047" d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"/>
          <path fill="#c8e6c9" d="M40 13L30 13 30 3z"/>
          <path fill="#2e7d32" d="M30 13L40 23 40 13z"/>
          <path fill="#e8f5e9" d="M31,23H17c-0.552,0-1,0.448-1,1v12c0,0.552,0.448,1,1,1h14c0.552,0,1-0.448,1-1V24C32,23.448,31.552,23,31,23z M23,35h-5v-3h5V35z M23,31h-5v-3h5V31z M23,27h-5v-2h5V27z M30,35h-6v-3h6V35z M30,31h-6v-3h6V31z M30,27h-6v-2h6V27z"/>
        </svg>
      ),
      slack: (
        <svg viewBox="0 0 48 48" width="32" height="32">
          <path fill="#33d375" d="M33,8c0-2.209-1.791-4-4-4s-4,1.791-4,4c0,0.253,0,11,0,11h4c2.209,0,4-1.791,4-4S33,8.253,33,8z"/>
          <path fill="#40c4ff" d="M43,19c0-2.209-1.791-4-4-4c-0.253,0-11,0-11,0v4c0,2.209,1.791,4,4,4S43,21.209,43,19z"/>
          <path fill="#e91e63" d="M40,24c2.209,0,4,1.791,4,4s-1.791,4-4,4c-0.253,0-11,0-11,0v-4C29,25.791,30.791,24,33,24S39.747,24,40,24z"/>
          <path fill="#ffc107" d="M15,8c0-2.209,1.791-4,4-4s4,1.791,4,4c0,0.253,0,11,0,11h-4c-2.209,0-4-1.791-4-4S15,8.253,15,8z"/>
          <path fill="#ff3d00" d="M5,19c0-2.209,1.791-4,4-4c0.253,0,11,0,11,0v4c0,2.209-1.791,4-4,4S5,21.209,5,19z"/>
          <path fill="#448aff" d="M8,24c-2.209,0-4,1.791-4,4s1.791,4,4,4c0.253,0,11,0,11,0v-4C19,25.791,17.209,24,15,24S8.253,24,8,24z"/>
        </svg>
      ),
      drive: (
        <svg viewBox="0 0 48 48" width="32" height="32">
          <path fill="#ffc107" d="M17,6l-11.7,20.2L10,35.8l11.7-20.2L17,6z"/>
          <path fill="#1976d2" d="M31,6L19.3,26.2l4.7,9.6L35.7,15.6L31,6z"/>
          <path fill="#4caf50" d="M5.3,26.2l4.7,9.6h22L40,26.2H5.3z"/>
        </svg>
      ),
      zapier: (
        <svg viewBox="0 0 48 48" width="32" height="32">
          <circle fill="#ff4f00" cx="24" cy="24" r="20"/>
          <path fill="#fff" d="M24,12v8l-6.9-6.9L24,12z M24,36v-8l6.9,6.9L24,36z M12,24h8l-6.9-6.9L12,24z M36,24h-8l6.9,6.9L36,24z"/>
        </svg>
      ),
      discord: (
        <svg viewBox="0 0 48 48" width="32" height="32">
          <path fill="#5865f2" d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z"/>
        </svg>
      ),
      twitter: (
        <svg viewBox="0 0 48 48" width="32" height="32">
          <path fill="#1da1f2" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"/>
        </svg>
      ),
      airtable: (
        <svg viewBox="0 0 48 48" width="32" height="32">
          <path fill="#FCB400" d="M23.5 8L6 16l17.5 8L41 16z"/>
          <path fill="#F8832D" d="M6 16v16l17.5 8V24z"/>
          <path fill="#FF3366" d="M41 16v16l-17.5 8V24z"/>
        </svg>
      ),
    }
    return icons[iconId] || null
  }

  const floatingIcons = [
    { id: 'gmail', label: 'Gmail', position: { left: '10%', top: '28%' }, delay: 0 },
    { id: 'slack', label: 'Slack', position: { left: '6%', top: '48%' }, delay: 0.5 },
    { id: 'airtable', label: 'Airtable', position: { left: '14%', top: '68%' }, delay: 1 },
    { id: 'discord', label: 'Discord', position: { left: '10%', top: '38%' }, delay: 1.5 },
    { id: 'sheets', label: 'Sheets', position: { right: '10%', top: '32%' }, delay: 0.2 },
    { id: 'drive', label: 'Drive', position: { right: '6%', top: '52%' }, delay: 0.7 },
    { id: 'zapier', label: 'Zapier', position: { right: '12%', top: '42%' }, delay: 1.7 },
    { id: 'twitter', label: 'Twitter', position: { right: '26%', top: '20%' }, delay: 0.8 },
  ]

  return (
    <section className="hero-animated">
      <div className="announcement-banner">
        <span className="badge-pill">NEW</span>
        <span className="banner-text">We raised a $50M Series B led by Benchmark</span>
      </div>

      <div className="hero-background">
        <div className="gradient-blob gradient-blob-1"></div>
        <div className="gradient-blob gradient-blob-2"></div>
        <div className="gradient-blob gradient-blob-3"></div>
      </div>

      {floatingIcons.map((icon) => (
        <div key={icon.id} className="floating-icon" style={{ ...icon.position, animationDelay: `${icon.delay}s` }}>
          <div className="icon-bubble">{getIconSvg(icon.id)}</div>
          <span className="icon-label">{icon.label}</span>
        </div>
      ))}

      <svg className="workflow-arrows" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
          </marker>
        </defs>
        <path d="M 15 35 Q 35 45 50 50" stroke="#10b981" strokeWidth="0.3" fill="none" strokeDasharray="2 1" markerEnd="url(#arrowhead)" className="flow-path" />
        <path d="M 50 50 Q 65 45 85 38" stroke="#10b981" strokeWidth="0.3" fill="none" strokeDasharray="2 1" markerEnd="url(#arrowhead)" className="flow-path" style={{animationDelay: '0.5s'}} />
        <path d="M 12 52 Q 30 55 50 52" stroke="#3b82f6" strokeWidth="0.3" fill="none" strokeDasharray="2 1" markerEnd="url(#arrowhead)" className="flow-path" style={{animationDelay: '1s'}} />
      </svg>

      {cursorPositions.map((cursor) => (
        <div key={cursor.id} className="animated-cursor" style={{ left: `${cursor.x}%`, top: `${cursor.y}%`, transform: `translate(${cursor.targetX - cursor.x}px, ${cursor.targetY - cursor.y}px)`, transition: 'transform 3s ease-in-out' }}>
          <svg className="cursor-pointer" viewBox="0 0 80 90" width="24" height="24">
            <defs><filter id={`cursor-shadow-${cursor.id}`}><feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" /></filter></defs>
            <path fill={cursor.color} stroke="#fff" strokeWidth="3" strokeLinejoin="round" d="M37.1 6.8a7.1 7.1 0 0 1 13 0l34.6 77c.8 1.7-1 3.6-2.8 3l-39-13.3q-2-.8-4.2 0l-33 12.7a2.3 2.3 0 0 1-2.9-3z" filter={`url(#cursor-shadow-${cursor.id})`} />
          </svg>
          <span className="cursor-tag" style={{ background: cursor.color }}>{cursor.name}</span>
        </div>
      ))}

      <div className="hero-content-wrapper">
        <div className="container">
          <div className="hero-text">
            <h1 className="hero-title">AI agents built<br /><span className="title-highlight">for</span> by your team</h1>
            <p className="hero-subtitle">Understanding a task should be the only prerequisite to automating it.</p>
            <div className="hero-cta">
              <button className="btn-hero btn-hero-primary">Get Started</button>
              <button className="btn-hero btn-hero-secondary">Talk to Sales</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroAnimated
