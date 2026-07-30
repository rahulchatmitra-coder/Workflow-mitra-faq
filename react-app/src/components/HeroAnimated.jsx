import { Link } from 'react-router-dom'
import AgentDecoration from './AgentDecoration'
import './HeroAnimated.css'

function HeroAnimated() {
  const decorations = [
    {
      id: 'agent-1',
      shape: 'blob',
      color: '#fbb6ce', // pink base
      position: { top: '10%', left: '5%' },
      badges: ['gmail', 'slack', 'sheets', 'drive', 'zapier'],
      cursors: [
        { name: 'Katherine', color: '#E8388A' },
        { name: 'Max', color: '#10b981' }
      ],
      delay: 0,
      scale: 0.9
    },
    {
      id: 'agent-2',
      shape: 'cross',
      color: '#93c5fd', // blue base
      position: { top: '15%', right: '5%' },
      badges: ['airtable', 'discord', 'slack', 'sheets', 'gmail'],
      cursors: [
        { name: 'Gonzalo', color: '#3B82F6' },
        { name: 'Aron', color: '#EAB308' }
      ],
      delay: 0.5,
      scale: 0.8
    },
    {
      id: 'agent-3',
      shape: 'square',
      color: '#c4b5fd', // purple base
      position: { bottom: '15%', left: '10%' },
      badges: ['drive', 'zapier', 'airtable', 'slack', 'discord'],
      cursors: [
        { name: 'Lizzy', color: '#8B5CF6' },
        { name: 'Sam', color: '#F97316' }
      ],
      delay: 1,
      scale: 0.85
    },
    {
      id: 'agent-4',
      shape: 'organic',
      color: '#d1d5db', // gray/black base
      position: { bottom: '10%', right: '10%' },
      badges: ['sheets', 'gmail', 'discord', 'drive', 'airtable'],
      cursors: [
        { name: 'Alex', color: '#000000' },
        { name: 'Sarah', color: '#E8388A' }
      ],
      delay: 1.5,
      scale: 0.95
    }
  ]

  return (
    <section className="hero-animated">
      <div className="hero-decorations desktop-only">
        {decorations.map((dec) => (
          <AgentDecoration 
            key={dec.id}
            shape={dec.shape}
            color={dec.color}
            position={dec.position}
            badges={dec.badges}
            cursors={dec.cursors}
            delay={dec.delay}
            scale={dec.scale}
          />
        ))}
      </div>

      <div className="hero-content-wrapper">
        <div className="container">
          <div className="hero-text">
            <h1 className="hero-title">
              Build AI agents <br />
              <span className="strikethrough">for</span> by your team
            </h1>
            <p className="hero-subtitle">
              Understanding a task should be the only prerequisite to automating it.
            </p>
            <div className="hero-cta">
              <Link to="/contact" className="btn btn-primary btn-large">
                Start building for free <span className="arrow">→</span>
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-large">
                Watch demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroAnimated
