import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react'
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

  const decorations = [
    {
      id: 'cluster-1',
      mascot: 0,
      position: { top: '28px', left: '-16px' },
      logos: ['facebook', 'googlegemini', 'hubspot', 'whatsapp', 'googlesheets', 'telegram'],
      cursor: { name: 'Katherine', color: '#E8388A' },
      delay: 0,
    },
    {
      id: 'cluster-2',
      mascot: 1,
      position: { top: '18px', right: '-16px' },
      logos: ['shopify', 'razorpay', 'zoho', 'whatsapp', 'stripe', 'woocommerce'],
      cursor: { name: 'Aron', color: '#EAB308' },
      delay: 0.5,
    },
    {
      id: 'cluster-3',
      mascot: 2,
      position: { bottom: '26px', left: '16px' },
      logos: ['gmail', 'anthropic', 'slack', 'googlesheets', 'zendesk', 'discord'],
      cursor: { name: 'Marcelo', color: '#8B5CF6' },
      delay: 1,
    },
    {
      id: 'cluster-4',
      mascot: 3,
      position: { bottom: '16px', right: '16px' },
      logos: ['calendly', 'zoom', 'mongodb', 'slack', 'googlemeet', 'telegram'],
      cursor: { name: 'Rahul', color: '#F97316' },
      delay: 1.5,
    },
  ]

  return (
    <section className="hero-animated">
      {/* Background Ambient Glow */}
      <div className="hero-ambient-glow" aria-hidden="true" />

      {/* Outer Floating Agent Clusters */}
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
            {/* 1. EYEBROW BADGE */}
            <div className="hero-eyebrow-container">
              <span className="hero-eyebrow-badge">
                <Sparkles size={14} className="hero-sparkle-icon" />
                <span>A simpler alternative to Zapier, Make &amp; n8n</span>
              </span>
            </div>

            {/* 2. MAIN HEADLINE (AI AUTOMATION FOCUSED & CENTERED) */}
            <h1 className="hero-title">
              Automate Your Business With AI
              <br />
              <span className="strikethrough-wrapper">
                <span className="strikethrough">Without</span>
              </span>
              {' '}The Complexity
            </h1>

            {/* 3. SUBTITLE */}
            <p className="hero-subtitle">
              Connect your apps, build workflows that run on autopilot, and get help from real automation experts when you need it. No coding required.
            </p>

            {/* 4. CALL TO ACTION BUTTONS */}
            <div className="hero-cta">
              <a
                href="https://app.workflowmitra.com/signup"
                className="hero-btn-primary"
              >
                <span>Start Building Free</span>
                <ArrowRight size={17} className="hero-arrow-icon" />
              </a>

              <Link
                to="/contact"
                className="hero-btn-secondary"
              >
                <span>Get Help Building My Workflow</span>
              </Link>
            </div>

            {/* 5. REASSURANCE TRUST ROW */}
            <div className="hero-reassurance-row">
              <span className="hero-trust-item">
                <Check size={14} className="hero-trust-check" />
                <span>Free to start</span>
              </span>
              <span className="hero-trust-dot">&middot;</span>
              <span className="hero-trust-item">
                <Check size={14} className="hero-trust-check" />
                <span>No credit card required</span>
              </span>
              <span className="hero-trust-dot">&middot;</span>
              <span className="hero-trust-item">
                <Check size={14} className="hero-trust-check" />
                <span>Expert help available</span>
              </span>
            </div>
          </div>

          {/* 6. INTERACTIVE BROWSER CANVAS PANEL */}
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
