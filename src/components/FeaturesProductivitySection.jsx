import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Zap,
  Bot,
  Activity,
  CheckCircle2,
  Sliders,
  Database,
  Send,
  Users,
  Check,
  Clock,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Layers,
  Lock,
  Workflow,
  Radio,
  BarChart3,
  RefreshCw,
  FileCheck,
  CheckCircle
} from 'lucide-react'
import {
  Slack,
  GmailLogo,
  HubSpotLogo,
  Openai,
  WhatsappIcon,
  WorkflowMitraLogo,
  GoogleSheetsLogo,
  Claude,
} from './ui/svgs'
import { SiStripe, SiNotion } from 'react-icons/si'
import { FaSalesforce } from 'react-icons/fa'
import './FeaturesProductivitySection.css'

const WORKFLOW_MODES = [
  {
    id: 'lead-gen',
    label: 'Lead Triage & Outreach',
    trigger: 'Inbound Webhook / Form',
    triggerSub: 'Meta Ads & Website Lead Capture',
    aiStep: 'Claude 3.5 Intent & Score',
    aiDetail: 'Score 98/100 • Enterprise tier ($10k+)',
    action: 'HubSpot Deal + WhatsApp Alert',
    actionDetail: 'Contact synced & SDR notified in 0.8s',
    metric: '1.2s avg execution',
  },
  {
    id: 'support-ops',
    label: 'Support Ticket Resolution',
    trigger: 'Inbound Support Ticket',
    triggerSub: 'Email & WhatsApp Multi-Channel',
    aiStep: 'GPT-4o Semantic Knowledge Match',
    aiDetail: 'Parsed issue against Notion Knowledge Base',
    action: 'Auto-Reply Drafted + Escalation',
    actionDetail: 'Resolution sent & logged to Zendesk',
    metric: '92% zero-touch resolution',
  },
  {
    id: 'billing-flow',
    label: 'Finance & Invoice Sync',
    trigger: 'Stripe Payment Webhook',
    triggerSub: 'Checkout Completed ($4,800)',
    aiStep: 'Financial Data Extraction',
    aiDetail: 'Verified tax ID, currency & ledger code',
    action: 'QuickBooks Invoice + Slack Ping',
    actionDetail: 'Receipt sent to client & team notified',
    metric: '100% accounting accuracy',
  },
]

const AI_MODELS = [
  { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', latency: '95ms', accuracy: '99.8%', bestFor: 'Deep reasoning & outreach copy' },
  { name: 'GPT-4o', provider: 'OpenAI', latency: '110ms', accuracy: '99.4%', bestFor: 'Multi-modal & structured data' },
  { name: 'DeepSeek V3', provider: 'DeepSeek', latency: '140ms', accuracy: '99.1%', bestFor: 'Code logic & high volume' },
]

export default function FeaturesProductivitySection() {
  const sectionRef = useRef(null)
  const [activeWorkflow, setActiveWorkflow] = useState(WORKFLOW_MODES[0])
  const [activeModel, setActiveModel] = useState(AI_MODELS[0])
  const [isSimulating, setIsSimulating] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })
  const sectionScale = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [0.97, 1, 1, 0.98])

  const triggerSimulation = () => {
    setIsSimulating(true)
    setTimeout(() => setIsSimulating(false), 2400)
  }

  return (
    <section 
      ref={sectionRef} 
      className="wm-prod-features-section" 
      id="features" 
      aria-label="Adapt at speed with visual-first automation and AI"
    >
      <div className="wm-prod-container">
        
        {/* Section Header */}
        <motion.div 
          className="wm-prod-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="wm-prod-badge">
            <span className="wm-prod-badge-dot" />
            <span>Visual-First Orchestration</span>
          </div>

          <h2 className="wm-prod-title">
            Adapt at speed with visual-first automation and AI
          </h2>

          <p className="wm-prod-subtitle">
            Design, build, and orchestrate complex multi-step workflows and intelligent AI agents across your business — with complete visual clarity and zero code.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          className="wm-prod-bento-grid"
          style={{ scale: sectionScale }}
        >
          
          {/* Card 1: Interactive Visual Workflow Engine (Hero Spans 8 Columns) */}
          <motion.div 
            className="wm-prod-card wm-prod-card-hero"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Text Group */}
            <div className="wm-prod-hero-header-block">
              <span className="wm-prod-pill-tag">Visual Canvas Engine</span>
              <h3 className="wm-prod-hero-heading">Visual-First Zero-Code Orchestration</h3>
              <p className="wm-prod-hero-desc">
                Design complex multi-step scenarios on an infinite visual canvas. Chain triggers, Claude &amp; GPT-4o reasoning, and bidirectional app syncs with real-time live execution.
              </p>
            </div>

            {/* Seamless Mode Switcher (Full Width above Canvas - No Awkward Gaps!) */}
            <div className="wm-prod-workflow-tabs">
              {WORKFLOW_MODES.map(mode => (
                <button
                  key={mode.id}
                  type="button"
                  className={`wm-prod-tab-btn ${activeWorkflow.id === mode.id ? 'active' : ''}`}
                  onClick={() => setActiveWorkflow(mode)}
                >
                  <span>{mode.label}</span>
                </button>
              ))}
            </div>

            {/* Interactive Visual Canvas */}
            <div className="wm-prod-canvas">
              <div className="wm-canvas-top-bar">
                <div className="wm-canvas-title-group">
                  <span className="wm-live-status-dot" />
                  <span className="wm-canvas-status-text">Pipeline Active • {activeWorkflow.metric}</span>
                </div>
                <button 
                  type="button" 
                  className={`wm-canvas-run-btn ${isSimulating ? 'is-running' : ''}`}
                  onClick={triggerSimulation}
                >
                  <RefreshCw size={13} className={isSimulating ? 'spin-anim' : ''} />
                  <span>{isSimulating ? 'Executing Flow...' : 'Test Run Flow'}</span>
                </button>
              </div>

              {/* Connected Step Pipeline */}
              <div className="wm-canvas-pipeline">
                
                {/* Step 1: Inbound Trigger */}
                <div className={`wm-pipe-card ${isSimulating ? 'active-pulse' : ''}`}>
                  <div className="wm-pipe-icon-wrap icon-green">
                    <Zap size={18} />
                  </div>
                  <div className="wm-pipe-details">
                    <span className="wm-pipe-type">01 • TRIGGER</span>
                    <h4 className="wm-pipe-title">{activeWorkflow.trigger}</h4>
                    <p className="wm-pipe-sub">{activeWorkflow.triggerSub}</p>
                  </div>
                  <span className="wm-pipe-status-pill">Instant (0.1s)</span>
                </div>

                {/* Connector Arrow */}
                <div className="wm-pipe-connector">
                  <div className="wm-connector-track" />
                  <div className="wm-connector-pulse" />
                </div>

                {/* Step 2: AI Logic */}
                <div className={`wm-pipe-card ${isSimulating ? 'active-pulse delay-1' : ''}`}>
                  <div className="wm-pipe-icon-wrap icon-dark">
                    <Bot size={18} />
                  </div>
                  <div className="wm-pipe-details">
                    <span className="wm-pipe-type">02 • AI DECISION</span>
                    <h4 className="wm-pipe-title">{activeWorkflow.aiStep}</h4>
                    <p className="wm-pipe-sub">{activeWorkflow.aiDetail}</p>
                  </div>
                  <span className="wm-pipe-status-pill">Auto-Triaged</span>
                </div>

                {/* Connector Arrow */}
                <div className="wm-pipe-connector">
                  <div className="wm-connector-track" />
                  <div className="wm-connector-pulse delay-1" />
                </div>

                {/* Step 3: Action & Sync */}
                <div className={`wm-pipe-card ${isSimulating ? 'active-pulse delay-2' : ''}`}>
                  <div className="wm-pipe-icon-wrap icon-emerald">
                    <Send size={18} />
                  </div>
                  <div className="wm-pipe-details">
                    <span className="wm-pipe-type">03 • EXECUTION</span>
                    <h4 className="wm-pipe-title">{activeWorkflow.action}</h4>
                    <p className="wm-pipe-sub">{activeWorkflow.actionDetail}</p>
                  </div>
                  <span className="wm-pipe-status-pill">Completed ✓</span>
                </div>

              </div>

              {/* Canvas Bottom Trust Badges */}
              <div className="wm-canvas-bottom-stats">
                <div className="wm-stat-item">
                  <CheckCircle2 size={15} className="wm-check-green" />
                  <span>Zero Data Loss Guarantee</span>
                </div>
                <div className="wm-stat-item">
                  <CheckCircle2 size={15} className="wm-check-green" />
                  <span>Bidirectional Webhook Latency &lt; 200ms</span>
                </div>
                <div className="wm-stat-item">
                  <CheckCircle2 size={15} className="wm-check-green" />
                  <span>Automatic Retry on API Outages</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Multi-Model Intelligence (Spans 4 Columns) */}
          <motion.div 
            className="wm-prod-card wm-prod-card-model"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <span className="wm-prod-pill-tag">Multi-LLM Router</span>
              <h3 className="wm-prod-card-title">Adaptive AI Intelligence</h3>
              <p className="wm-prod-card-desc">
                Intelligently route workflow steps to the best model based on latency, context complexity, and cost.
              </p>
            </div>

            {/* Model Selection List */}
            <div className="wm-model-selector-list">
              {AI_MODELS.map(model => (
                <div 
                  key={model.name}
                  className={`wm-model-item ${activeModel.name === model.name ? 'selected' : ''}`}
                  onClick={() => setActiveModel(model)}
                >
                  <div className="wm-model-item-top">
                    <span className="wm-model-name">{model.name}</span>
                    <span className="wm-model-speed">{model.latency}</span>
                  </div>
                  <div className="wm-model-item-bottom">
                    <span className="wm-model-best">{model.bestFor}</span>
                    <span className="wm-model-acc">{model.accuracy} acc</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="wm-model-footer-note">
              <Sparkles size={14} className="wm-spark-icon" />
              <span>Auto-optimizes token usage to save up to 68% in API costs.</span>
            </div>
          </motion.div>

          {/* Card 3: Enterprise Guardrails & Approval Gates (Spans 4 Columns) */}
          <motion.div 
            className="wm-prod-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <span className="wm-prod-pill-tag">Enterprise Security</span>
              <h3 className="wm-prod-card-title">Human-in-the-Loop Guardrails</h3>
              <p className="wm-prod-card-desc">
                Set custom confidence thresholds and approval gates so critical business actions require team sign-off.
              </p>
            </div>

            <div className="wm-guardrail-widget">
              <div className="wm-guardrail-rule">
                <div className="wm-rule-header">
                  <ShieldCheck size={16} className="wm-shield-icon" />
                  <span>Security Gate Rule #14</span>
                </div>
                <div className="wm-rule-body">
                  <code>IF Action = Refund &gt; $500 → Require Slack Approval</code>
                </div>
                <div className="wm-rule-state">
                  <span className="wm-dot-approved" />
                  <span>Manager Approved • Audit Logged</span>
                </div>
              </div>

              <div className="wm-security-specs">
                <div className="wm-spec-badge">SOC-2 Type II</div>
                <div className="wm-spec-badge">GDPR Compliant</div>
                <div className="wm-spec-badge">256-bit TLS</div>
                <div className="wm-spec-badge">Role-Based Access</div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Universal 200+ Integrations Hub (Spans 4 Columns) */}
          <motion.div 
            className="wm-prod-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <span className="wm-prod-pill-tag">Ecosystem</span>
              <h3 className="wm-prod-card-title">Instant 200+ App Connectors</h3>
              <p className="wm-prod-card-desc">
                Connect your existing stack in 1-click. No complex webhooks or API maintenance required.
              </p>
            </div>

            <div className="wm-eco-grid">
              <div className="wm-eco-item"><GmailLogo className="w-6 h-6" /><span>Gmail</span></div>
              <div className="wm-eco-item"><Slack className="w-6 h-6" /><span>Slack</span></div>
              <div className="wm-eco-item"><HubSpotLogo className="w-6 h-6" /><span>HubSpot</span></div>
              <div className="wm-eco-item"><WhatsappIcon className="w-6 h-6" /><span>WhatsApp</span></div>
              <div className="wm-eco-item"><Openai className="w-6 h-6" /><span>OpenAI</span></div>
              <div className="wm-eco-item"><Claude className="w-6 h-6" /><span>Claude</span></div>
              <div className="wm-eco-item"><SiStripe size={22} color="#635BFF" /><span>Stripe</span></div>
              <div className="wm-eco-item"><GoogleSheetsLogo className="w-6 h-6" /><span>Sheets</span></div>
            </div>

            <div className="wm-eco-footer">
              <Link to="/integrations" className="wm-eco-link">
                <span>Explore all 200+ Integrations</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Card 5: Real-Time Observability & Analytics (Spans 4 Columns) */}
          <motion.div 
            className="wm-prod-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <span className="wm-prod-pill-tag">Live Telemetry</span>
              <h3 className="wm-prod-card-title">Real-Time Ops &amp; Analytics</h3>
              <p className="wm-prod-card-desc">
                Gain end-to-end visibility into every automated run, error rate, and time saved across your organization.
              </p>
            </div>

            <div className="wm-telemetry-widget">
              <div className="wm-telemetry-row">
                <div className="wm-tele-metric">
                  <span className="metric-val">99.98%</span>
                  <span className="metric-lbl">Uptime SLA</span>
                </div>
                <div className="wm-tele-metric">
                  <span className="metric-val">1.2s</span>
                  <span className="metric-lbl">Avg Response</span>
                </div>
                <div className="wm-tele-metric">
                  <span className="metric-val">14.8k</span>
                  <span className="metric-lbl">Tasks / Day</span>
                </div>
              </div>

              {/* Live Event Feed */}
              <div className="wm-tele-events">
                <div className="wm-event-row">
                  <span className="event-dot dot-green" />
                  <span className="event-text">Inbound CRM Lead triaged &amp; booked</span>
                  <span className="event-time">Just now</span>
                </div>
                <div className="event-row">
                  <span className="event-dot dot-green" />
                  <span className="event-text">Stripe invoice synced to QuickBooks</span>
                  <span className="event-time">2m ago</span>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  )
}
