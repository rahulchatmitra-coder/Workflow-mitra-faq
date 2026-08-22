import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  GitBranch,
  Users,
  Zap,
  Clock,
  Plus,
  Globe,
  MousePointer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Headphones,
  ShoppingBag,
  CheckCircle2,
  Bot,
  Layers,
  Settings,
  ChevronRight,
  Workflow,
  Database,
  Webhook,
  Terminal,
  Filter,
  Cpu,
  Boxes
} from 'lucide-react'
import {
  SiZendesk,
  SiZoho
} from 'react-icons/si'
import {
  FacebookLogo,
  HubSpotLogo,
  GmailLogo,
  Slack,
  GoogleSheetsLogo,
  Shopify,
  Discord,
  WhatsappIcon
} from './ui/svgs'
import './AgentsShowcase.css'

// Single unified line palette matching exact specifications
const LINE_BASE_COLOR = '#94a3b8'
const LINE_PULSE_COLOR = '#334155'
const LINE_RED_PULSE = '#ef4444'
const LINE_GREEN_PULSE = '#10b981'

// Custom Shiprocket Logo Icon
function ShiprocketIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ffffff' }}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  )
}

// 4 Exact Enterprise Workflows with Refined Clear Content & Hero Theming
const TOP_WORKFLOWS = [
  {
    id: 'wf-1-sales-lead',
    layout: 'left-content',
    badge: '01 / Sales & Growth',
    badgeTheme: 'sales',
    badgeColor: '#ff7a00',
    badgeBg: '#fff7ed',
    badgeBorder: '#ffedd5',
    title: 'Facebook Inbound Lead Routing & Multi-Channel Alert',
    description: 'Instantly capture new leads from Facebook Ads, validate contact email deliverability with intelligent conditional branching, auto-create & enrich contacts in HubSpot CRM, and notify sales reps on Slack, Gmail, and Google Sheets within seconds.',
    metrics: [
      { label: 'Sync Latency', value: '< 380ms' },
      { label: 'Data Accuracy', value: '100%' },
      { label: 'Round-Robin', value: 'Instant' }
    ]
  },
  {
    id: 'wf-2-support-triage',
    layout: 'right-content',
    badge: '02 / Customer Support',
    badgeTheme: 'support',
    badgeColor: '#0284c7',
    badgeBg: '#f0f9ff',
    badgeBorder: '#e0f2fe',
    title: 'Zendesk Autonomous AI Ticket Triage & Escalation',
    description: 'Ingest customer tickets via Zendesk webhooks, run sentiment & intent analysis with Anthropic AI, intelligently route urgent issues directly to on-call support engineers on Slack, auto-update ticket statuses, and log every event in Google Sheets.',
    metrics: [
      { label: 'Response Time', value: '-80%' },
      { label: 'AI Accuracy', value: '99.4%' },
      { label: 'Triage Speed', value: 'Zero-Touch' }
    ]
  },
  {
    id: 'wf-3-ecommerce-order',
    layout: 'left-content',
    badge: '03 / E-Commerce Operations',
    badgeTheme: 'ecommerce',
    badgeColor: '#16a34a',
    badgeBg: '#f0fdf4',
    badgeBorder: '#dcfce7',
    title: 'Shopify Order Fulfillment, Invoicing & WhatsApp Tracking',
    description: 'Trigger automatically on paid Shopify checkout, generate compliant GST invoices in Zoho Books, dispatch real-time WhatsApp order tracking updates to the buyer, create automated Shiprocket courier manifests, and sync all order data to Google Sheets.',
    metrics: [
      { label: 'Invoice Creation', value: 'Instant' },
      { label: 'WhatsApp Delivery', value: '100%' },
      { label: 'Courier Booking', value: 'Automated' }
    ]
  },
  {
    id: 'wf-4-api-health',
    layout: 'right-content',
    badge: '04 / DevOps & Monitoring',
    badgeTheme: 'devops',
    badgeColor: '#6366f1',
    badgeBg: '#eef2ff',
    badgeBorder: '#e0e7ff',
    title: 'API Health Check & Automated Incident Escalation',
    description: 'Continuously monitor production API endpoints with automated HTTP health checks, evaluate response latency and payload validity via condition filters, and instantly alert engineering teams on Discord channels and WhatsApp on-call numbers.',
    metrics: [
      { label: 'Endpoint Checks', value: 'Real-Time' },
      { label: 'Alert MTTA', value: '< 1.2s' },
      { label: 'Uptime Reliability', value: '99.99%' }
    ]
  }
]

/* ==========================================================================
   CANVAS 1: Sales & Marketing Lead Ingestion (100% Exact Pin Coupling)
   ========================================================================== */
function CanvasWorkflow1() {
  return (
    <div className="wm-wf-canvas-box">
      <div className="wm-wf-inner-stage">
        <svg className="wm-svg-connections-layer" viewBox="0 0 760 360" fill="none">
          {/* Node 1 (100, 180) -> Node 2 (180, 180) */}
          <path d="M 100 180 L 180 180" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 100 180 L 180 180" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 2 Upper (238, 170) -> Node 3 (350, 115) */}
          <path d="M 238 170 C 290 170, 310 115, 350 115" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 238 170 C 290 170, 310 115, 350 115" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 2 Lower (238, 190) -> Ghost Node (370, 245) */}
          <path d="M 238 190 C 290 190, 330 245, 370 245" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 238 190 C 290 190, 330 245, 370 245" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }} />

          {/* Node 3 (410, 115) -> Node 4 (490, 115) */}
          <path d="M 410 115 L 490 115" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 410 115 L 490 115" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 4 (550, 115) -> Node 5 Gmail (645, 45) */}
          <path d="M 550 115 C 600 115, 610 45, 645 45" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 550 115 C 600 115, 610 45, 645 45" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 4 (550, 115) -> Node 6 Slack (645, 145) */}
          <path d="M 550 115 C 600 115, 610 145, 645 145" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 550 115 C 600 115, 610 145, 645 145" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 4 (550, 115) -> Node 7 Sheets (645, 255) */}
          <path d="M 550 115 C 600 115, 610 255, 645 255" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 550 115 C 600 115, 610 255, 645 255" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />
        </svg>

        <div className="wm-nodes-flow-container">
          {/* Node 1: Facebook (Center: 70, 180) */}
          <div className="wm-node-wrapper" style={{ left: '70px', top: '180px' }}>
            <div className="wm-node-coin wm-node-white">
              <div className="wm-micro-badge wm-badge-bolt"><Zap size={10} color="#ffffff" /></div>
              <div className="wm-micro-badge wm-badge-clock"><Clock size={10} color="#64748b" /></div>
              <div className="wm-number-badge">1</div>
              <div className="wm-node-icon"><FacebookLogo style={{ width: '32px', height: '32px' }} /></div>
              <div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-captions">
              <span className="wm-node-title">On webhook call</span>
              <span className="wm-node-sub">from Lead Ads</span>
            </div>
          </div>

          {/* Node 2: IF (Center: 210, 180) */}
          <div className="wm-node-wrapper" style={{ left: '210px', top: '180px' }}>
            <div className="wm-node-coin wm-node-orange">
              <div className="wm-number-badge">2</div>
              <div className="wm-node-icon"><GitBranch size={26} color="#ffffff" /></div>
              <div className="wm-socket wm-socket-left" />
              <div className="wm-socket wm-socket-right-top" />
              <div className="wm-socket wm-socket-right-bottom" />
            </div>
            <div className="wm-node-captions">
              <span className="wm-node-title">IF</span>
              <span className="wm-node-sub">1 route &middot; first match</span>
            </div>
          </div>

          {/* Route Pills */}
          <div className="wm-route-pill wm-route-upper" style={{ left: '285px', top: '135px' }}><span>1st Has an email</span></div>
          <div className="wm-route-pill wm-route-lower" style={{ left: '290px', top: '225px' }}><span>Else</span></div>

          {/* Ghost Plus Node (Center: 370, 245) */}
          <div className="wm-ghost-plus-node" style={{ left: '370px', top: '245px' }}><Plus size={18} /></div>

          {/* Node 3: HubSpot (Center: 380, 115) */}
          <div className="wm-node-wrapper" style={{ left: '380px', top: '115px' }}>
            <div className="wm-node-coin wm-node-hubspot">
              <div className="wm-number-badge">3</div>
              <div className="wm-node-icon"><HubSpotLogo fill="#ffffff" style={{ width: '32px', height: '32px', color: '#ffffff' }} /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-captions">
              <span className="wm-node-title">App Request</span>
              <span className="wm-node-sub">hubspot &middot; POST /crm/objects/...</span>
            </div>
          </div>

          {/* Node 4: Assign (Center: 520, 115) */}
          <div className="wm-node-wrapper" style={{ left: '520px', top: '115px' }}>
            <div className="wm-node-coin wm-node-black">
              <div className="wm-number-badge">4</div>
              <div className="wm-node-icon"><Users size={24} color="#ffffff" /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-captions">
              <span className="wm-node-title">Assign to the next pers...</span>
              <span className="wm-node-sub">click to set up</span>
            </div>
          </div>

          {/* Node 5: Gmail (Center: 675, 45) */}
          <div className="wm-node-wrapper" style={{ left: '675px', top: '45px' }}>
            <div className="wm-node-coin wm-node-white">
              <div className="wm-number-badge">5</div>
              <div className="wm-node-icon"><GmailLogo style={{ width: '28px', height: '28px' }} /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-add-btn"><Plus size={12} /></div>
            <div className="wm-node-captions"><span className="wm-node-title">Gmail</span><span className="wm-node-sub">send &#123;&#123; email &#125;&#125;</span></div>
          </div>

          {/* Node 6: Slack (Center: 675, 145) */}
          <div className="wm-node-wrapper" style={{ left: '675px', top: '145px' }}>
            <div className="wm-node-coin wm-node-white">
              <div className="wm-number-badge">6</div>
              <div className="wm-node-icon"><Slack style={{ width: '28px', height: '28px' }} /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-add-btn"><Plus size={12} /></div>
            <div className="wm-node-captions"><span className="wm-node-title">Slack</span><span className="wm-node-sub">post to Slack</span></div>
          </div>

          {/* Node 7: Google Sheets (Center: 675, 255) */}
          <div className="wm-node-wrapper" style={{ left: '675px', top: '255px' }}>
            <div className="wm-node-coin wm-node-white">
              <div className="wm-number-badge">7</div>
              <div className="wm-node-icon"><GoogleSheetsLogo style={{ width: '28px', height: '28px' }} /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-add-btn"><Plus size={12} /></div>
            <div className="wm-node-captions"><span className="wm-node-title">Google Sheets</span><span className="wm-node-sub">click to set up</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   CANVAS 2: Zendesk AI Ticket Triage & Routing (100% Exact Pin Coupling)
   ========================================================================== */
function CanvasWorkflow2() {
  return (
    <div className="wm-wf-canvas-box">
      <div className="wm-wf-inner-stage">
        <svg className="wm-svg-connections-layer" viewBox="0 0 760 360" fill="none">
          {/* Node 1 (95, 180) -> Node 2 (155, 180) */}
          <path d="M 95 180 L 155 180" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 95 180 L 155 180" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 2 (215, 180) -> Node 3 (275, 180) */}
          <path d="M 215 180 L 275 180" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 215 180 L 275 180" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 3 Top (333, 170) -> Node 4 (400, 180) [1st Urgent] */}
          <path d="M 333 170 C 365 170, 380 180, 400 180" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 333 170 C 365 170, 380 180, 400 180" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 3 Bottom (333, 190) -> Node 4 (400, 180) [Else - Red Stream] */}
          <path d="M 333 190 C 365 190, 380 180, 400 180" stroke="#fca5a5" strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 333 190 C 365 190, 380 180, 400 180" stroke={LINE_RED_PULSE} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 4 (460, 180) -> Node 5 Slack (535, 90) */}
          <path d="M 460 180 C 500 180, 505 90, 535 90" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 460 180 C 500 180, 505 90, 535 90" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 4 (460, 180) -> Node 6 Zendesk PUT (535, 225) */}
          <path d="M 460 180 C 500 180, 505 225, 535 225" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 460 180 C 500 180, 505 225, 535 225" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 6 (595, 225) -> Node 7 Sheets (650, 225) */}
          <path d="M 595 225 L 650 225" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 595 225 L 650 225" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />
        </svg>

        <div className="wm-nodes-flow-container">
          {/* Node 1: Zendesk (Center: 65, 180) */}
          <div className="wm-node-wrapper" style={{ left: '65px', top: '180px' }}>
            <div className="wm-node-coin wm-node-zendesk">
              <div className="wm-micro-badge wm-badge-bolt"><Zap size={10} color="#ffffff" /></div>
              <div className="wm-micro-badge wm-badge-clock"><Clock size={10} color="#64748b" /></div>
              <div className="wm-number-badge">1</div>
              <div className="wm-node-icon"><SiZendesk size={26} color="#ffffff" /></div>
              <div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-captions"><span className="wm-node-title">On webhook call</span><span className="wm-node-sub">from Zendesk</span></div>
          </div>

          {/* Node 2: AI Sparkle (Center: 185, 180) */}
          <div className="wm-node-wrapper" style={{ left: '185px', top: '180px' }}>
            <div className="wm-node-coin wm-node-black">
              <div className="wm-number-badge">2</div>
              <div className="wm-node-icon"><Sparkles size={24} color="#ffffff" /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-captions"><span className="wm-node-title">AI</span><span className="wm-node-sub">anthropic &middot; default</span></div>
          </div>

          {/* Node 3: IF (Center: 305, 180) */}
          <div className="wm-node-wrapper" style={{ left: '305px', top: '180px' }}>
            <div className="wm-node-coin wm-node-orange">
              <div className="wm-number-badge">3</div>
              <div className="wm-node-icon"><GitBranch size={26} color="#ffffff" /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right-top" /><div className="wm-socket wm-socket-right-bottom" />
            </div>
            <div className="wm-node-captions"><span className="wm-node-title">IF</span><span className="wm-node-sub">1 route &middot; first match</span></div>
          </div>

          {/* Route Pills */}
          <div className="wm-route-pill wm-route-upper" style={{ left: '365px', top: '145px' }}><span>1st Urgent</span></div>
          <div className="wm-route-pill wm-route-lower" style={{ left: '365px', top: '215px' }}><span>Else</span></div>

          {/* Node 4: Assign (Center: 430, 180) */}
          <div className="wm-node-wrapper" style={{ left: '430px', top: '180px' }}>
            <div className="wm-node-coin wm-node-black">
              <div className="wm-number-badge">4</div>
              <div className="wm-node-icon"><Users size={24} color="#ffffff" /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-captions"><span className="wm-node-title">Assign to the next pers...</span><span className="wm-node-sub">click to set up</span></div>
          </div>

          {/* Node 5: Slack (Center: 565, 90) */}
          <div className="wm-node-wrapper" style={{ left: '565px', top: '90px' }}>
            <div className="wm-node-coin wm-node-white">
              <div className="wm-number-badge">5</div>
              <div className="wm-node-icon"><Slack style={{ width: '28px', height: '28px' }} /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-add-btn"><Plus size={12} /></div>
            <div className="wm-node-captions"><span className="wm-node-title">Slack</span><span className="wm-node-sub">post to Slack</span></div>
          </div>

          {/* Node 6: App Request Zendesk (Center: 565, 225) */}
          <div className="wm-node-wrapper" style={{ left: '565px', top: '225px' }}>
            <div className="wm-node-coin wm-node-zendesk">
              <div className="wm-number-badge">6</div>
              <div className="wm-node-icon"><SiZendesk size={26} color="#ffffff" /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-captions"><span className="wm-node-title">App Request</span><span className="wm-node-sub">zendesk &middot; PUT /api/v2/tickets/</span></div>
          </div>

          {/* Node 7: Google Sheets (Center: 680, 225) */}
          <div className="wm-node-wrapper" style={{ left: '680px', top: '225px' }}>
            <div className="wm-node-coin wm-node-white">
              <div className="wm-number-badge">7</div>
              <div className="wm-node-icon"><GoogleSheetsLogo style={{ width: '28px', height: '28px' }} /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-add-btn"><Plus size={12} /></div>
            <div className="wm-node-captions"><span className="wm-node-title">Google Sheets</span><span className="wm-node-sub">click to set up</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   CANVAS 3: Shopify -> Zoho Books -> WhatsApp -> Shiprocket -> Sheets (100% Exact Pin Coupling)
   ========================================================================== */
function CanvasWorkflow3() {
  return (
    <div className="wm-wf-canvas-box">
      <div className="wm-wf-inner-stage">
        <svg className="wm-svg-connections-layer" viewBox="0 0 760 360" fill="none">
          {/* Node 1 (100, 180) -> Node 2 (175, 180) */}
          <path d="M 100 180 L 175 180" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 100 180 L 175 180" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 2 Upper (233, 170) -> Node 3 (335, 115) [1st Paid] */}
          <path d="M 233 170 C 285 170, 300 115, 335 115" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 233 170 C 285 170, 300 115, 335 115" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 2 Lower (233, 190) -> Ghost Node (360, 245) [Else] */}
          <path d="M 233 190 C 285 190, 320 245, 360 245" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 233 190 C 285 190, 320 245, 360 245" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }} />

          {/* Node 3 (395, 115) -> Node 4 (465, 115) */}
          <path d="M 395 115 L 465 115" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 395 115 L 465 115" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 4 (525, 115) -> Node 5 (595, 115) */}
          <path d="M 525 115 L 595 115" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 525 115 L 595 115" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 5 (655, 115) -> Node 6 Sheets (595, 255) */}
          <path d="M 655 115 C 675 115, 545 255, 595 255" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 655 115 C 675 115, 545 255, 595 255" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }} />
        </svg>

        <div className="wm-nodes-flow-container">
          {/* Node 1: Shopify (Center: 70, 180) */}
          <div className="wm-node-wrapper" style={{ left: '70px', top: '180px' }}>
            <div className="wm-node-coin wm-node-white">
              <div className="wm-micro-badge wm-badge-bolt"><Zap size={10} color="#ffffff" /></div>
              <div className="wm-micro-badge wm-badge-clock"><Clock size={10} color="#64748b" /></div>
              <div className="wm-number-badge">1</div>
              <div className="wm-node-icon"><Shopify style={{ width: '30px', height: '30px' }} /></div>
              <div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-captions"><span className="wm-node-title">On webhook call</span><span className="wm-node-sub">from Shopify</span></div>
          </div>

          {/* Node 2: IF (Center: 205, 180) */}
          <div className="wm-node-wrapper" style={{ left: '205px', top: '180px' }}>
            <div className="wm-node-coin wm-node-orange">
              <div className="wm-number-badge">2</div>
              <div className="wm-node-icon"><GitBranch size={26} color="#ffffff" /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right-top" /><div className="wm-socket wm-socket-right-bottom" />
            </div>
            <div className="wm-node-captions"><span className="wm-node-title">IF</span><span className="wm-node-sub">1 route &middot; first match</span></div>
          </div>

          {/* Route Pills */}
          <div className="wm-route-pill wm-route-upper" style={{ left: '280px', top: '135px' }}><span>1st Paid</span></div>
          <div className="wm-route-pill wm-route-lower" style={{ left: '285px', top: '225px' }}><span>Else</span></div>

          {/* Ghost Plus Node (Center: 360, 245) */}
          <div className="wm-ghost-plus-node" style={{ left: '360px', top: '245px' }}><Plus size={18} /></div>

          {/* Node 3: Zoho Books (Center: 365, 115) */}
          <div className="wm-node-wrapper" style={{ left: '365px', top: '115px' }}>
            <div className="wm-node-coin wm-node-zoho">
              <div className="wm-number-badge">3</div>
              <div className="wm-node-icon"><SiZoho size={30} color="#ffffff" /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-captions"><span className="wm-node-title">App Request</span><span className="wm-node-sub">zoho-books &middot; POST /books/v...</span></div>
          </div>

          {/* Node 4: WhatsApp (Center: 495, 115) */}
          <div className="wm-node-wrapper" style={{ left: '495px', top: '115px' }}>
            <div className="wm-node-coin wm-node-white">
              <div className="wm-number-badge">4</div>
              <div className="wm-node-icon"><WhatsappIcon style={{ width: '30px', height: '30px' }} /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-captions"><span className="wm-node-title">WhatsApp</span><span className="wm-node-sub">send WhatsApp</span></div>
          </div>

          {/* Node 5: Shiprocket (Center: 625, 115) */}
          <div className="wm-node-wrapper" style={{ left: '625px', top: '115px' }}>
            <div className="wm-node-coin wm-node-shiprocket">
              <div className="wm-number-badge">5</div>
              <div className="wm-node-icon"><ShiprocketIcon /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-captions"><span className="wm-node-title">App Request</span><span className="wm-node-sub">shiprocket &middot; POST /v1/external</span></div>
          </div>

          {/* Node 6: Google Sheets (Center: 625, 255) */}
          <div className="wm-node-wrapper" style={{ left: '625px', top: '255px' }}>
            <div className="wm-node-coin wm-node-white">
              <div className="wm-number-badge">6</div>
              <div className="wm-node-icon"><GoogleSheetsLogo style={{ width: '28px', height: '28px' }} /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-add-btn"><Plus size={12} /></div>
            <div className="wm-node-captions"><span className="wm-node-title">Google Sheets</span><span className="wm-node-sub">click to set up</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   CANVAS 4: Trigger Manually -> HTTP Request -> IF -> Discord / WhatsApp (100% Exact Pin Coupling)
   ========================================================================== */
function CanvasWorkflow4() {
  return (
    <div className="wm-wf-canvas-box">
      <div className="wm-wf-inner-stage">
        <svg className="wm-svg-connections-layer" viewBox="0 0 760 360" fill="none">
          {/* Node 1 (120, 180) -> Node 2 (215, 180) */}
          <path d="M 120 180 L 215 180" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 120 180 L 215 180" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 2 (275, 180) -> Node 3 (370, 180) */}
          <path d="M 275 180 L 370 180" stroke={LINE_BASE_COLOR} strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 275 180 L 370 180" stroke={LINE_PULSE_COLOR} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 3 Top (428, 170) -> Node 4 Discord (535, 100) [1st Route 1 - Green Stream] */}
          <path d="M 428 170 C 475 170, 500 100, 535 100" stroke="#86efac" strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 428 170 C 475 170, 500 100, 535 100" stroke={LINE_GREEN_PULSE} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />

          {/* Node 3 Bottom (428, 190) -> Node 5 WhatsApp (605, 245) [Else - Red Stream] */}
          <path d="M 428 190 C 475 190, 540 245, 605 245" stroke="#fca5a5" strokeWidth="2" strokeDasharray="4 4" />
          <motion.path d="M 428 190 C 475 190, 540 245, 605 245" stroke={LINE_RED_PULSE} strokeWidth="2.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />
        </svg>

        <div className="wm-nodes-flow-container">
          {/* Node 1: Manual Trigger (Center: 90, 180) */}
          <div className="wm-node-wrapper" style={{ left: '90px', top: '180px' }}>
            <div className="wm-node-coin wm-node-black">
              <div className="wm-micro-badge wm-badge-clock"><Clock size={10} color="#64748b" /></div>
              <div className="wm-number-badge">1</div>
              <div className="wm-node-icon"><MousePointer size={24} color="#ffffff" /></div>
              <div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-captions"><span className="wm-node-title">Trigger manually</span><span className="wm-node-sub">when you click Run</span></div>
          </div>

          {/* Node 2: HTTP Request (Center: 245, 180) */}
          <div className="wm-node-wrapper" style={{ left: '245px', top: '180px' }}>
            <div className="wm-node-coin wm-node-black">
              <div className="wm-number-badge">2</div>
              <div className="wm-node-icon"><Globe size={24} color="#ffffff" /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-captions"><span className="wm-node-title">HTTP Request</span><span className="wm-node-sub">GET https://api.example.co...</span></div>
          </div>

          {/* Node 3: IF (Center: 400, 180) */}
          <div className="wm-node-wrapper" style={{ left: '400px', top: '180px' }}>
            <div className="wm-node-coin wm-node-orange">
              <div className="wm-number-badge">3</div>
              <div className="wm-node-icon"><GitBranch size={26} color="#ffffff" /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right-top" /><div className="wm-socket wm-socket-right-bottom" />
            </div>
            <div className="wm-node-captions"><span className="wm-node-title">IF</span><span className="wm-node-sub">&#123;&#123; ok &#125;&#125; eq false</span></div>
          </div>

          {/* Route Pills */}
          <div className="wm-route-pill wm-route-upper" style={{ left: '475px', top: '125px' }}><span>1st Route 1</span></div>
          <div className="wm-route-pill wm-route-lower" style={{ left: '480px', top: '235px' }}><span>Else</span></div>

          {/* Node 4: Discord (Center: 565, 100) */}
          <div className="wm-node-wrapper" style={{ left: '565px', top: '100px' }}>
            <div className="wm-node-coin wm-node-white">
              <div className="wm-number-badge">4</div>
              <div className="wm-node-icon"><Discord style={{ width: '28px', height: '28px' }} /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-add-btn"><Plus size={12} /></div>
            <div className="wm-node-captions"><span className="wm-node-title">Discord</span><span className="wm-node-sub">post to Discord</span></div>
          </div>

          {/* Node 5: WhatsApp (Center: 635, 245) */}
          <div className="wm-node-wrapper" style={{ left: '635px', top: '245px' }}>
            <div className="wm-node-coin wm-node-white">
              <div className="wm-number-badge">5</div>
              <div className="wm-node-icon"><WhatsappIcon style={{ width: '30px', height: '30px' }} /></div>
              <div className="wm-socket wm-socket-left" /><div className="wm-socket wm-socket-right" />
            </div>
            <div className="wm-node-add-btn"><Plus size={12} /></div>
            <div className="wm-node-captions"><span className="wm-node-title">WhatsApp</span><span className="wm-node-sub">send WhatsApp</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Router to render correct canvas for each workflow
function RenderWorkflowCanvas({ wfId }) {
  switch (wfId) {
    case 'wf-1-sales-lead':
      return <CanvasWorkflow1 />
    case 'wf-2-support-triage':
      return <CanvasWorkflow2 />
    case 'wf-3-ecommerce-order':
      return <CanvasWorkflow3 />
    case 'wf-4-api-health':
      return <CanvasWorkflow4 />
    default:
      return <CanvasWorkflow1 />
  }
}

export default function AgentsShowcase() {
  return (
    <section className="wm-top-workflows-section" id="workflow-showcase">
      {/* Subtle Hero-Matching Ambient Glow */}
      <div className="wm-wf-ambient-glow" />

      <div className="wm-wf-global-container">
        
        {/* SECTION HEADER (Clean, Atmospheric Hero Theme) */}
        <div className="wm-wf-section-header">
          <div className="wm-wf-pill-badge">
            <Sparkles size={13} className="wm-pill-sparkle-icon" />
            <span>ENTERPRISE WORKFLOW BLUEPRINTS</span>
          </div>
          <h2 className="wm-wf-section-title">
            Top 4 Autonomous Workflows <br />
            <span className="wm-wf-title-gradient">Built for Real-World Scale</span>
          </h2>
          <p className="wm-wf-section-subtitle">
            See how high-performing teams replace manual chaos with automated, zero-touch operational flows across sales, support, commerce, and DevOps.
          </p>
        </div>

        {/* 4 REFINED ALTERNATING WORKFLOW SHOWCASES (STICKY STACKING DECK) */}
        <div className="wm-wf-cards-stack">
          {TOP_WORKFLOWS.map((wf, index) => {
            const isReverse = wf.layout === 'right-content'

            return (
              <div
                key={wf.id}
                className={`wm-wf-card-row ${isReverse ? 'layout-reverse' : 'layout-standard'} wm-card-stack-${index + 1}`}
                style={{
                  top: '86px',
                  zIndex: index + 1
                }}
              >
                {/* CONTENT COLUMN (34% Width - Clean & Highly Readable) */}
                <div className="wm-wf-info-col">
                  {/* Category Badge Pill */}
                  <div
                    className="wm-wf-info-badge"
                    style={{
                      color: wf.badgeColor,
                      backgroundColor: wf.badgeBg,
                      borderColor: wf.badgeBorder
                    }}
                  >
                    <span className="wm-wf-badge-dot" style={{ backgroundColor: wf.badgeColor }} />
                    <span>{wf.badge}</span>
                  </div>

                  {/* Heading */}
                  <h3 className="wm-wf-card-heading">{wf.title}</h3>
                  
                  {/* Refined Description */}
                  <p className="wm-wf-card-desc">{wf.description}</p>

                  {/* Clean Formatted Metrics Grid */}
                  <div className="wm-wf-metrics-grid">
                    {wf.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="wm-wf-metric-box">
                        <span className="wm-wf-metric-value">{m.value}</span>
                        <span className="wm-wf-metric-label">{m.label}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* CANVAS COLUMN (66% Width - Clean Grid Canvas) */}
                <div className="wm-wf-canvas-col">
                  <RenderWorkflowCanvas wfId={wf.id} />
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
