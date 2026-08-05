import { Link } from 'react-router-dom'
import AgentDecoration from './AgentDecoration'
import './HeroAnimated.css'

function HeroAnimated() {
  // Six real integrations per cluster. Indices 0-3 are the prominent chips,
  // 4-5 sit further out and dimmer. Every name resolves in brandIcons.jsx.
  const decorations = [
    {
      id: 'cluster-1',
      mascot: 0,
      position: { top: '34px', left: '2px' },
      logos: ['facebook', 'googlegemini', 'hubspot', 'whatsapp', 'googlesheets', 'telegram'],
      cursor: { name: 'Katherine', color: '#E8388A' },
      delay: 0,
    },
    {
      id: 'cluster-2',
      mascot: 1,
      position: { top: '20px', right: '2px' },
      logos: ['shopify', 'razorpay', 'zoho', 'whatsapp', 'stripe', 'woocommerce'],
      cursor: { name: 'Aron', color: '#EAB308' },
      delay: 0.5,
    },
    {
      id: 'cluster-3',
      mascot: 2,
      position: { bottom: '26px', left: '30px' },
      logos: ['gmail', 'anthropic', 'slack', 'googlesheets', 'zendesk', 'discord'],
      cursor: { name: 'Marcelo', color: '#8B5CF6' },
      delay: 1,
    },
    {
      id: 'cluster-4',
      mascot: 3,
      position: { bottom: '16px', right: '30px' },
      logos: ['calendly', 'zoom', 'mongodb', 'slack', 'googlemeet', 'telegram'],
      cursor: { name: 'Rahul', color: '#F97316' },
      delay: 1.5,
    },
  ]

  return (
    <section className="hero-animated">
      <div className="hero-decorations desktop-only">
        {decorations.map((dec) => (
          <AgentDecoration
            key={dec.id}
            logos={dec.logos}
            mascot={dec.mascot}
            position={dec.position}
            cursor={dec.cursor}
            delay={dec.delay}
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
