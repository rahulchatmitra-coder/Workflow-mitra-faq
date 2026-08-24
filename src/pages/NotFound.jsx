import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  AlertTriangle, 
  Workflow, 
  ArrowRight, 
  Home, 
  Layers, 
  Puzzle, 
  CreditCard, 
  HelpCircle, 
  CheckCircle2, 
  Zap,
  Bot
} from 'lucide-react'
import PageSeo from '../components/PageSeo'
import RollButton from '../components/RollButton'
import './NotFound.css'

export default function NotFound() {
  const QUICK_LINKS = [
    {
      title: 'Templates Hub',
      desc: '100+ ready-to-run workflow blueprints',
      icon: <Layers size={18} />,
      to: '/templates',
    },
    {
      title: 'Integrations',
      desc: '300+ pre-built native app connectors',
      icon: <Puzzle size={18} />,
      to: '/integrations',
    },
    {
      title: 'Pricing & Plans',
      desc: 'Transparent credit-based tiers',
      icon: <CreditCard size={18} />,
      to: '/pricing',
    },
    {
      title: 'Help Center',
      desc: 'Guides, setup docs & support team',
      icon: <HelpCircle size={18} />,
      to: '/automation-help',
    },
  ]

  return (
    <div className="wm-404-page">
      <PageSeo
        title="404 — Workflow Execution Lost | WorkflowMitra"
        description="The workflow node, template, or documentation endpoint you requested does not exist in the automation pipeline."
        path="/404"
      />

      {/* Atmospheric Ambient Glow */}
      <div className="wm-404-ambient-glow" aria-hidden="true" />

      <div className="wm-404-container">
        
        {/* Eyebrow Badge Pill */}
        <motion.div 
          className="wm-404-eyebrow"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="wm-404-pulse-dot" />
          <span>Workflow Execution Exception · Error 404</span>
        </motion.div>

        {/* Central Circuit Visual Card */}
        <motion.div 
          className="wm-404-circuit-board"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 404 Visual Digit Display */}
          <div className="wm-404-glitch-row">
            <span className="wm-404-digit">4</span>
            <div className="wm-404-node-core" title="Unreachable AI Node">
              <Bot size={38} />
            </div>
            <span className="wm-404-digit">4</span>
          </div>

          {/* Pipeline Trace Diagram */}
          <div className="wm-404-flow-pipeline">
            
            {/* Step 1: Inbound Trigger */}
            <div className="wm-404-flow-step">
              <div className="wm-404-step-icon step-ok">
                <Zap size={18} />
              </div>
              <span className="wm-404-step-name">HTTP Trigger</span>
              <span className="wm-404-step-status" style={{ color: '#059669' }}>✓ Received</span>
            </div>

            {/* Wire 1 */}
            <div className="wm-404-connector-wire">
              <ArrowRight size={16} />
            </div>

            {/* Step 2: Route Matcher (Broken) */}
            <div className="wm-404-flow-step">
              <div className="wm-404-step-icon step-missing">
                <AlertTriangle size={18} />
              </div>
              <span className="wm-404-step-name">Node Matcher</span>
              <span className="wm-404-step-status" style={{ color: '#dc2626' }}>✗ Unreachable</span>
            </div>

            {/* Wire 2 */}
            <div className="wm-404-connector-wire broken">
              <ArrowRight size={16} />
            </div>

            {/* Step 3: Self-Healing Handler */}
            <div className="wm-404-flow-step">
              <div className="wm-404-step-icon step-reroute">
                <Workflow size={18} />
              </div>
              <span className="wm-404-step-name">Auto-Reroute</span>
              <span className="wm-404-step-status" style={{ color: '#2563eb' }}>⚡ Ready</span>
            </div>

          </div>
        </motion.div>

        {/* Page Main Headline & Description */}
        <motion.h1 
          className="wm-404-title"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          This Workflow Path Doesn't Exist
        </motion.h1>

        <motion.p 
          className="wm-404-desc"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          The endpoint, template, or integration node you requested has been moved, deprecated, or was disconnected from the automation pipeline.
        </motion.p>

        {/* Primary Action Buttons */}
        <motion.div 
          className="wm-404-actions"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <RollButton
            to="/"
            variant="dark"
            size="lg"
            showArrow={true}
          >
            Back to Homepage
          </RollButton>

          <RollButton
            to="/templates"
            variant="secondary"
            size="lg"
          >
            Explore Blueprints
          </RollButton>
        </motion.div>

        {/* 4 Quick Jump Cards Grid */}
        <motion.div 
          className="wm-404-quick-nav"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="sr-only">Quick Navigation</h2>
          {QUICK_LINKS.map((link, idx) => (
            <Link key={idx} to={link.to} className="wm-404-nav-card">
              <div className="wm-404-card-icon-box">
                {link.icon}
              </div>
              <h3 className="wm-404-card-title">
                <span>{link.title}</span>
                <ArrowRight size={13} style={{ opacity: 0.6 }} />
              </h3>
              <p className="wm-404-card-desc">{link.desc}</p>
            </Link>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
