import React, { useState, useEffect } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  Zap,
  GitBranch,
  Users,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import {
  FacebookLogo,
  HubSpotLogo,
  GmailLogo,
  Slack,
  GoogleSheetsLogo,
  WhatsappIcon,
  Claude,
  ZendeskLogo,
  ShopifyLogo,
  ZohoBooksLogo,
  ShiprocketLogo,
  ZoomLogo,
  CalendlyLogo,
  IntercomLogo,
} from './ui/svgs'
import { agentsShowcaseData as agents } from '../data/agentsShowcaseData'
import './AgentsShowcase.css'

export default function AgentsShowcase() {
  // Manual selection with Open / Close Toggle Support
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  // Keeps the last selected workflow visible in canvas even if dropdown card is collapsed
  const [selectedWorkflowIndex, setSelectedWorkflowIndex] = useState(0)

  const activeWorkflow = agents[selectedWorkflowIndex] || agents[0]

  // Step pulse animation (runs smoothly inside active canvas without re-rendering tabs)
  useEffect(() => {
    const stepTimer = setInterval(() => {
      setActiveStep((s) => (s + 1) % (activeWorkflow.nodes?.length || 7))
    }, 1500)
    return () => clearInterval(stepTimer)
  }, [activeWorkflow])

  const handleSelectWorkflow = (index) => {
    // If clicking the currently open accordion, close it (toggle); otherwise open it
    setActiveIndex((prev) => (prev === index ? -1 : index))
    setSelectedWorkflowIndex(index)
    setActiveStep(0)
  }

  const handlePrevWorkflow = () => {
    const baseIdx = selectedWorkflowIndex >= 0 ? selectedWorkflowIndex : 0
    const nextIdx = (baseIdx - 1 + agents.length) % agents.length
    setActiveIndex(nextIdx)
    setSelectedWorkflowIndex(nextIdx)
    setActiveStep(0)
  }

  const handleNextWorkflow = () => {
    const baseIdx = selectedWorkflowIndex >= 0 ? selectedWorkflowIndex : 0
    const nextIdx = (baseIdx + 1) % agents.length
    setActiveIndex(nextIdx)
    setSelectedWorkflowIndex(nextIdx)
    setActiveStep(0)
  }

  // 100% Real Authentic Official Brand Vector SVGs
  const renderRealIcon = (type) => {
    switch (type) {
      case 'facebook':
        return <FacebookLogo style={{ width: '28px', height: '28px' }} />
      case 'if':
        return <GitBranch size={26} color="#ea580c" />
      case 'hubspot':
        return <HubSpotLogo style={{ width: '28px', height: '28px' }} />
      case 'assign':
        return <Users size={24} color="#09090b" />
      case 'whatsapp':
        return <WhatsappIcon style={{ width: '28px', height: '28px' }} />
      case 'slack':
        return <Slack style={{ width: '28px', height: '28px' }} />
      case 'zendesk':
        return <ZendeskLogo style={{ width: '28px', height: '28px' }} />
      case 'ai':
        return <Claude style={{ width: '28px', height: '28px' }} />
      case 'shopify':
        return <ShopifyLogo style={{ width: '28px', height: '28px' }} />
      case 'zoho':
        return <ZohoBooksLogo style={{ width: '28px', height: '28px' }} />
      case 'shiprocket':
        return <ShiprocketLogo style={{ width: '28px', height: '28px' }} />
      case 'google-sheets':
        return <GoogleSheetsLogo style={{ width: '28px', height: '28px' }} />
      case 'calendly':
        return <CalendlyLogo style={{ width: '28px', height: '28px' }} />
      case 'googlemeet':
        return <ZoomLogo style={{ width: '28px', height: '28px' }} />
      case 'gmail':
        return <GmailLogo style={{ width: '28px', height: '28px' }} />
      case 'intercom':
        return <IntercomLogo style={{ width: '28px', height: '28px' }} />
      default:
        return <GitBranch size={26} color="#ea580c" />
    }
  }

  const { nodes, elseNode } = activeWorkflow
  const UNIFIED_LINE_COLOR = '#09090b'

  return (
    <section className="wm-showcase-section" id="workflow-showcase">
      <div className="wm-showcase-container">
        {/* SECTION HEADER */}
        <div className="wm-showcase-header">
          <h2 className="wm-showcase-title">
            Automate Any Business Process
          </h2>
          <p className="wm-showcase-subtitle">
            Build AI-powered workflows that connect your apps, make decisions, and execute tasks automatically.
          </p>
        </div>

        {/* MAIN 2-COLUMN GRID (LEFT: MANUAL SELECTOR | RIGHT: ROCK-SOLID TV CANVAS) */}
        <div className="wm-showcase-grid-official">

          {/* LEFT COLUMN: ROCK-SOLID WORKFLOW SELECTOR (ZERO LAYOUT SHIFTS) */}
          <div className="wm-selection-column">
            <div className="wm-selection-header">
              <span className="wm-selection-title">Select Business Automation:</span>
              <span className="wm-selection-count">5 Curated Flows</span>
            </div>

            <div className="wm-selection-list">
              {agents.map((item, idx) => {
                const isActive = idx === activeIndex

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`wm-premium-accordion-card ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleSelectWorkflow(idx)}
                    style={{
                      '--accent-color': item.color || '#ea580c',
                    }}
                  >
                    {/* Left Glowing Accent Strip */}
                    <div className="wm-accordion-glow-bar" />

                    <div className="wm-accordion-content">
                      {/* TOP ROW: ROLE PILL + LIVE STATUS / CHEVRON */}
                      <div className="wm-accordion-top-row">
                        <div className="wm-role-badge">
                          <span className="wm-role-dot" />
                          <span>{item.role}</span>
                        </div>
                        {isActive ? (
                          <span className="wm-live-status-pill">
                            <span className="wm-mini-pulse" />
                            <span>Live Canvas</span>
                          </span>
                        ) : (
                          <span className="wm-arrow-hint">
                            <ChevronRight size={14} />
                          </span>
                        )}
                      </div>

                      {/* WORKFLOW TITLE */}
                      <h3 className="wm-accordion-heading">
                        {item.name}
                      </h3>

                      {/* EXPANDABLE BODY */}
                      {isActive && (
                        <div className="wm-accordion-dropdown-body">
                          <p className="wm-accordion-desc">
                            {item.desc}
                          </p>

                          <div className="wm-accordion-apps-row">
                            <span className="wm-apps-tag">Integrated Ecosystem:</span>
                            <div className="wm-apps-pills-wrap">
                              {item.integrations.map((app) => (
                                <span key={app} className="wm-app-glass-pill">
                                  {app}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: FULL-HEIGHT OFFICIAL WORKFLOWMITRA TV CANVAS */}
          <div className="wm-canvas-column-main">
            <div className="wm-canvas-window wm-tv-clean-canvas">
              {/* TOP BROWSER ADDRESS BAR */}
              <div className="wm-window-topbar">
                <div className="wm-topbar-left">
                  <div className="wm-traffic-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <div className="wm-category-badge-pill">
                    <span className="wm-category-title-text">{activeWorkflow.cardTitle.toUpperCase()}</span>
                  </div>
                </div>

                <div className="wm-address-pill">
                  <Lock size={11} color="#059669" style={{ flexShrink: 0 }} />
                  <span className="wm-address-protocol">https://</span>
                  <span className="wm-address-url">{activeWorkflow.addressUrl}</span>
                </div>

                <div className="wm-topbar-right">
                  <div className="wm-pagination-ctrls">
                    <button
                      type="button"
                      onClick={handlePrevWorkflow}
                      className="wm-nav-btn"
                      title="Previous Workflow"
                    >
                      <ChevronLeft size={13} />
                      <span>Prev</span>
                    </button>
                    <span className="wm-page-counter">
                      {selectedWorkflowIndex + 1}/{agents.length}
                    </span>
                    <button
                      type="button"
                      onClick={handleNextWorkflow}
                      className="wm-nav-btn"
                      title="Next Workflow"
                    >
                      <span>Next</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                  <span className="wm-running-pill">
                    <span className="wm-pulse-dot" />
                    <span>Live Flow</span>
                  </span>
                </div>
              </div>

              {/* CANVAS BODY: PURE UNIFIED SVG WORKSPACE (100% IN-PLACE UPDATE) */}
              <div className="wm-canvas-body wm-clean-dot-body">
                <div className="wm-clean-scene">
                  <svg
                    viewBox="0 0 920 360"
                    className="wm-canvas-svg"
                    style={{ width: '100%', height: '100%', overflow: 'visible' }}
                  >
                    <defs>
                      {/* Soft Node Drop Shadow */}
                      <filter id="wm-node-shadow" x="-30%" y="-30%" width="160%" height="160%">
                        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.06" />
                      </filter>
                      <filter id="wm-active-glow" x="-40%" y="-40%" width="180%" height="180%">
                        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#09090b" floodOpacity="0.12" />
                      </filter>
                    </defs>

                    {/* ─── 1. SVG CONNECTING WIRES ─── */}
                    {/* Wire 1: Node 1 (100, 170) -> Node 2 (275, 170) */}
                    <path
                      d="M 132 170 L 243 170"
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="2.5"
                      strokeDasharray="5 5"
                    />
                    {activeStep >= 1 && (
                      <path
                        d="M 132 170 L 243 170"
                        fill="none"
                        stroke={UNIFIED_LINE_COLOR}
                        strokeWidth="3"
                        strokeDasharray="6 6"
                        className="wm-animated-wire"
                      />
                    )}

                    {/* Wire 2 (Top Branch): Node 2 (275, 170) -> Node 3 (450, 120) */}
                    <path
                      d="M 307 170 C 360 170, 365 120, 418 120"
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="2.5"
                      strokeDasharray="5 5"
                    />
                    {activeStep >= 2 && (
                      <path
                        d="M 307 170 C 360 170, 365 120, 418 120"
                        fill="none"
                        stroke={UNIFIED_LINE_COLOR}
                        strokeWidth="3"
                        strokeDasharray="6 6"
                        className="wm-animated-wire"
                      />
                    )}

                    {/* Wire 2 (Bottom Else Branch): Node 2 (275, 170) -> Else (470, 265) */}
                    {elseNode && (
                      <path
                        d="M 307 170 C 360 170, 390 265, 444 265"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="2.5"
                        strokeDasharray="5 5"
                      />
                    )}

                    {/* Wire 3: Node 3 (450, 120) -> Node 4 (605, 120) */}
                    <path
                      d="M 482 120 L 573 120"
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="2.5"
                      strokeDasharray="5 5"
                    />
                    {activeStep >= 3 && (
                      <path
                        d="M 482 120 L 573 120"
                        fill="none"
                        stroke={UNIFIED_LINE_COLOR}
                        strokeWidth="3"
                        strokeDasharray="6 6"
                        className="wm-animated-wire"
                      />
                    )}

                    {/* Wire 4a (Top Branch): Node 4 (605, 120) -> Node 5 (775, 55) */}
                    <path
                      d="M 637 120 C 690 120, 690 55, 743 55"
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="2.5"
                      strokeDasharray="5 5"
                    />
                    {activeStep >= 4 && (
                      <path
                        d="M 637 120 C 690 120, 690 55, 743 55"
                        fill="none"
                        stroke={UNIFIED_LINE_COLOR}
                        strokeWidth="3"
                        strokeDasharray="6 6"
                        className="wm-animated-wire"
                      />
                    )}

                    {/* Wire 4b (Middle Branch): Node 4 (605, 120) -> Node 6 (775, 170) */}
                    <path
                      d="M 637 120 C 690 120, 690 170, 743 170"
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="2.5"
                      strokeDasharray="5 5"
                    />
                    {activeStep >= 4 && (
                      <path
                        d="M 637 120 C 690 120, 690 170, 743 170"
                        fill="none"
                        stroke={UNIFIED_LINE_COLOR}
                        strokeWidth="3"
                        strokeDasharray="6 6"
                        className="wm-animated-wire"
                      />
                    )}

                    {/* Wire 4c (Bottom Branch): Node 4 (605, 120) -> Node 7 (775, 285) */}
                    <path
                      d="M 637 120 C 690 120, 690 285, 743 285"
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="2.5"
                      strokeDasharray="5 5"
                    />
                    {activeStep >= 4 && (
                      <path
                        d="M 637 120 C 690 120, 690 285, 743 285"
                        fill="none"
                        stroke={UNIFIED_LINE_COLOR}
                        strokeWidth="3"
                        strokeDasharray="6 6"
                        className="wm-animated-wire"
                      />
                    )}

                    {/* ─── 2. WIRE LABELS ─── */}
                    {/* Top Branch Label: 1st Has an email */}
                    <g transform="translate(362, 132)">
                      <rect x="-56" y="-12" width="112" height="24" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" filter="url(#wm-node-shadow)" />
                      <text x="0" y="4" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="800" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
                        1st Has an email
                      </text>
                    </g>

                    {/* Bottom Else Branch Label */}
                    {elseNode && (
                      <g transform="translate(365, 226)">
                        <rect x="-24" y="-11" width="48" height="22" rx="11" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" filter="url(#wm-node-shadow)" />
                        <text x="0" y="4" textAnchor="middle" fill="#475569" fontSize="10.5" fontStyle="italic" fontWeight="700" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
                          Else
                        </text>
                      </g>
                    )}

                    {/* Empty Else Placeholder Circle */}
                    {elseNode && (
                      <g transform={`translate(${elseNode.x}, ${elseNode.y})`}>
                        <circle r="26" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                        <text x="0" y="6" textAnchor="middle" fill="#64748b" fontSize="18" fontWeight="500">
                          +
                        </text>
                      </g>
                    )}

                    {/* ─── 3. ALL 7 UNIFIED CIRCULAR NODES ─── */}
                    {nodes.map((node, nIdx) => {
                      const isNodeActive = activeStep === nIdx
                      const isTerminal = ['5', '6', '7'].includes(node.id)

                      return (
                        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                          {/* Active Ambient Glow Halo */}
                          {isNodeActive && (
                            <circle
                              r="38"
                              fill="none"
                              stroke="#09090b"
                              strokeWidth="2.5"
                              opacity="0.16"
                            />
                          )}

                          {/* Main Circular Disc (Radius 32 = 64px) */}
                          <circle
                            r="32"
                            fill="#ffffff"
                            stroke={isNodeActive ? '#09090b' : '#cbd5e1'}
                            strokeWidth={isNodeActive ? '2.5' : '2'}
                            filter={isNodeActive ? 'url(#wm-active-glow)' : 'url(#wm-node-shadow)'}
                          />

                          {/* Real Official Brand Vector Icon Centered at (0, 0) */}
                          <foreignObject x="-16" y="-16" width="32" height="32" style={{ pointerEvents: 'none' }}>
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {renderRealIcon(node.type)}
                            </div>
                          </foreignObject>

                          {/* Number Badge at Top-Right (+22, -22) */}
                          <circle cx="22" cy="-22" r="9.5" fill="#09090b" stroke="#ffffff" strokeWidth="2" />
                          <text
                            x="22"
                            y="-18.5"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="10"
                            fontWeight="900"
                            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                          >
                            {node.num}
                          </text>

                          {/* Trigger Bolt Badge on Node 1 Top-Left (-22, -22) */}
                          {node.isTrigger && (
                            <>
                              <circle cx="-22" cy="-22" r="9.5" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
                              <foreignObject x="-27" y="-27" width="10" height="10" style={{ pointerEvents: 'none' }}>
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Zap size={10} fill="#ffffff" color="#ffffff" />
                                </div>
                              </foreignObject>
                            </>
                          )}

                          {/* Terminal Right Plus (+) Button (+46, 0) */}
                          {isTerminal && (
                            <g transform="translate(46, 0)">
                              <circle r="9.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" filter="url(#wm-node-shadow)" />
                              <text
                                x="0"
                                y="4"
                                textAnchor="middle"
                                fill="#475569"
                                fontSize="13"
                                fontWeight="700"
                                fontFamily="system-ui, sans-serif"
                              >
                                +
                              </text>
                            </g>
                          )}

                          {/* Node Title & Subtitle Below Disc */}
                          <text
                            x="0"
                            y="52"
                            textAnchor="middle"
                            fill="#09090b"
                            fontSize="13"
                            fontWeight="800"
                            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                          >
                            {node.label}
                          </text>
                          <text
                            x="0"
                            y="68"
                            textAnchor="middle"
                            fill="#334155"
                            fontSize="10.5"
                            fontWeight="600"
                            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                          >
                            {node.sub}
                          </text>
                        </g>
                      )
                    })}
                  </svg>
                </div>
              </div>

              {/* BOTTOM TELEMETRY & VALUE PROPOSITION DECK */}
              <div className="wm-canvas-bottom-deck">
                <div className="wm-deck-item">
                  <div className="wm-deck-icon-disc">
                    <Zap size={13} color="#ea580c" />
                  </div>
                  <div className="wm-deck-meta">
                    <span className="wm-deck-title">Sub-5s Instant Execution</span>
                    <span className="wm-deck-sub">Real-time webhook triggers</span>
                  </div>
                </div>

                <div className="wm-deck-divider" />

                <div className="wm-deck-item">
                  <div className="wm-deck-icon-disc">
                    <Cpu size={13} color="#8b5cf6" />
                  </div>
                  <div className="wm-deck-meta">
                    <span className="wm-deck-title">Claude 3.5 AI Engine</span>
                    <span className="wm-deck-sub">Autonomous intent scoring</span>
                  </div>
                </div>

                <div className="wm-deck-divider" />

                <div className="wm-deck-item">
                  <div className="wm-deck-icon-disc">
                    <ShieldCheck size={13} color="#10b981" />
                  </div>
                  <div className="wm-deck-meta">
                    <span className="wm-deck-title">Enterprise Encrypted</span>
                    <span className="wm-deck-sub">Zero-data retention SLA</span>
                  </div>
                </div>

                <div className="wm-deck-divider" />

                <div className="wm-deck-item wm-deck-highlight">
                  <div className="wm-deck-icon-disc" style={{ background: '#ecfdf5' }}>
                    <CheckCircle2 size={13} color="#059669" />
                  </div>
                  <div className="wm-deck-meta">
                    <span className="wm-deck-title" style={{ color: '#059669' }}>
                      {activeWorkflow.live?.runs.toLocaleString('en-IN')}+ Live Runs
                    </span>
                    <span className="wm-deck-sub">{activeWorkflow.live?.ok}% uptime success</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
