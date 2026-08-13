import { Link } from 'react-router-dom'
import AgentDecoration from './AgentDecoration'
import FlowCanvas from './FlowCanvas'
import { useCanvasStep } from '../utils/useCanvasStep'
import '../styles/CanvasPanel.css'
import './HeroAnimated.css'

const HERO_NODES = {
  n1: { type: 'webhook-trigger', label: 'New Lead' },
  n2: { type: 'ai', label: 'Classify' },
  n3: { type: 'if', label: 'Qualified?' },
  n4: { type: 'slack', label: 'Notify Sales' },
  n5: { type: 'whatsapp', label: 'Follow Up' },
}
const HERO_TAGS = { n4: 'Yes', n5: 'No' }
const HERO_PAYLOADS = ['{ company: "Acme" }', 'score: 0.92', 'qualified → Slack', 'not yet → WhatsApp']

function HeroAnimated() {
  const heroStep = useCanvasStep(5, 1400, 2)
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
      <div className="hero-decorations desktop-only" aria-hidden="true">
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
            <p className="hero-eyebrow">A simpler alternative to Zapier, Make &amp; n8n</p>
            <h1 className="hero-title">
              Automate Your Business<br />
              <span className="strikethrough">Without</span> The Complexity
            </h1>
            <p className="hero-subtitle">
              Connect your apps, build workflows that run on autopilot, and get help from real automation experts when you need it. No coding required.
            </p>
            <div className="hero-cta">
              <a href="https://app.workflowmitra.com/signup" className="btn btn-primary btn-large">
                Start Building Free <span className="arrow">→</span>
              </a>
              <Link to="/contact" className="btn btn-secondary btn-large">
                Get Help Building My Workflow
              </Link>
            </div>
            <p className="hero-reassurance">Free to start &middot; No credit card required &middot; Expert help available</p>
          </div>

          <div className="hero-canvas-panel">
            <div className="canvas-panel">
              <div className="browser-bar">
                <span className="browser-dot" style={{ background: '#ff5f57' }} />
                <span className="browser-dot" style={{ background: '#febc2e' }} />
                <span className="browser-dot" style={{ background: '#28c840' }} />
                <span className="browser-url">app.workflowmitra.com/workflows/lead-to-whatsapp</span>
                <span className="live-pill">running</span>
              </div>
              <div className="canvas-panel-body">
                <div className="canvas-panel-dotgrid" aria-hidden="true" />
                <FlowCanvas nodes={HERO_NODES} tags={HERO_TAGS} payloads={HERO_PAYLOADS} step={heroStep} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroAnimated
