import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Check } from 'lucide-react'
import AgentDecoration from './AgentDecoration'
import './HeroAnimated.css'

function HeroAnimated() {
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
        </div>
      </div>
    </section>
  )
}

export default HeroAnimated
