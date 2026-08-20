import React, { useState } from 'react'
import {
  Play,
  RotateCcw,
  RotateCw,
  Plus,
  Minus,
  Maximize2,
  Save,
  UserCheck,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Rss,
  Clock,
} from 'lucide-react'
import {
  FacebookLogo,
  ShopifyLogo,
  HubSpotLogo,
  Slack as SlackLogo,
  Linkedin as LinkedInLogo,
  GeminiLogo,
  Telegram,
  Discord,
  WhatsappIcon,
  ZohoLogo,
  ShiprocketLogo,
  Google,
  GmailLogo,
} from './svgs'

export function WorkflowCanvas() {
  const [activeFlowIndex, setActiveFlowIndex] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [activeStep, setActiveStep] = useState(null)
  const [executionMessage, setExecutionMessage] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(1)

  const workflows = [
    {
      id: 'flow-1',
      title: 'Facebook lead → HubSpot CRM → Slack & Gmail Alert',
      category: 'Lead Routing Automation',
      totalSteps: 7,
    },
    {
      id: 'flow-2',
      title: 'Shopify order → Zoho Books invoice → WhatsApp & Shiprocket',
      category: 'E-Commerce Fulfillment Automation',
      totalSteps: 6,
    },
    {
      id: 'flow-3',
      title: 'New blog post → Google Gemini AI rewrite → LinkedIn, Facebook, Telegram & Discord',
      category: 'AI Agents & Social Distribution',
      totalSteps: 8,
    },
  ]

  const handleNextFlow = () => {
    setActiveFlowIndex((prev) => (prev + 1) % workflows.length)
    setActiveStep(null)
    setExecutionMessage(null)
  }

  const handlePrevFlow = () => {
    setActiveFlowIndex((prev) => (prev - 1 + workflows.length) % workflows.length)
    setActiveStep(null)
    setExecutionMessage(null)
  }

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.5))
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.6))
  const handleResetZoom = () => setZoomLevel(1)

  const handleRun = () => {
    if (isRunning) return
    setIsRunning(true)
    setActiveStep(1)

    if (activeFlowIndex === 0) {
      setExecutionMessage('Step 1: Receiving Facebook Lead Ads Webhook...')
      setTimeout(() => {
        setActiveStep(2)
        setExecutionMessage('Step 2: Evaluating IF Condition (Has email)...')
      }, 900)
      setTimeout(() => {
        setActiveStep(3)
        setExecutionMessage('Step 3: Creating HubSpot CRM Contact...')
      }, 1800)
      setTimeout(() => {
        setActiveStep(4)
        setExecutionMessage('Step 4: Assigning Sales Representative...')
      }, 2700)
      setTimeout(() => {
        setActiveStep(5)
        setExecutionMessage('Step 5-7: Fanning out to Gmail, Slack & Google Sheets!')
      }, 3600)
      setTimeout(() => {
        setActiveStep(null)
        setIsRunning(false)
        setExecutionMessage('✓ Run finished successfully in 1.4s!')
      }, 4600)
    } else if (activeFlowIndex === 1) {
      setExecutionMessage('Step 1: Capturing Shopify New Order Webhook...')
      setTimeout(() => {
        setActiveStep(2)
        setExecutionMessage('Step 2: Checking IF Order is Paid...')
      }, 900)
      setTimeout(() => {
        setActiveStep(3)
        setExecutionMessage('Step 3: Generating Zoho Books Invoice...')
      }, 1800)
      setTimeout(() => {
        setActiveStep(4)
        setExecutionMessage('Step 4: Sending WhatsApp Confirmation Message...')
      }, 2700)
      setTimeout(() => {
        setActiveStep(5)
        setExecutionMessage('Step 5-6: Triggering Shiprocket & Logging to Google Sheets!')
      }, 3600)
      setTimeout(() => {
        setActiveStep(null)
        setIsRunning(false)
        setExecutionMessage('✓ Run finished successfully in 1.2s!')
      }, 4600)
    } else {
      setExecutionMessage('Step 1: RSS Trigger: New Blog Post Published...')
      setTimeout(() => {
        setActiveStep(2)
        setExecutionMessage('Step 2: Google Gemini AI Agent Rewriting Content...')
      }, 900)
      setTimeout(() => {
        setActiveStep(3)
        setExecutionMessage('Step 3: Awaiting Human Manager Approval...')
      }, 1800)
      setTimeout(() => {
        setActiveStep(4)
        setExecutionMessage('Step 4: Evaluating IF Manager Approved...')
      }, 2700)
      setTimeout(() => {
        setActiveStep(5)
        setExecutionMessage('Step 5-8: Publishing to LinkedIn, Facebook, Telegram & Discord!')
      }, 3600)
      setTimeout(() => {
        setActiveStep(null)
        setIsRunning(false)
        setExecutionMessage('✓ Run finished successfully in 1.8s!')
      }, 4600)
    }
  }

  return (
    <div id="tour-canvas" className="wm-canvas-card">
      {/* TOP HEADER */}
      <div className="wm-canvas-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="wm-canvas-logo">WM</div>
          <div className="wm-canvas-meta">
            <span className="wm-canvas-cat">
              {workflows[activeFlowIndex].category} ({activeFlowIndex + 1}/3)
            </span>
            <h3 className="wm-canvas-title">
              {workflows[activeFlowIndex].title}
            </h3>
          </div>
        </div>

        {/* WORKFLOW SLIDER CONTROLS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {executionMessage && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '9999px', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '4px 12px', fontSize: '12px', fontWeight: 700, color: '#059669' }}>
              <Sparkles size={14} />
              <span>{executionMessage}</span>
            </div>
          )}

          <div className="wm-canvas-controls">
            <button
              onClick={handlePrevFlow}
              className="wm-canvas-btn wm-canvas-btn--ghost"
              title="Previous Workflow"
            >
              <ChevronLeft size={16} />
              <span>Prev</span>
            </button>
            <span style={{ fontSize: '12px', fontWeight: 800, padding: '0 4px', color: '#64748b' }}>
              {activeFlowIndex + 1}/{workflows.length}
            </span>
            <button
              onClick={handleNextFlow}
              className="wm-canvas-btn wm-canvas-btn--dark"
              title="Next Workflow"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* CANVAS DOTTED VIEWPORT */}
      <div className="wm-canvas-viewport">
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            width: '1000px',
            height: '380px',
            position: 'relative',
            transition: 'transform 0.25s ease-out',
            flexShrink: 0,
          }}
        >
          {/* FLOW 1 */}
          {activeFlowIndex === 0 && (
            <>
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <line x1="135" y1="180" x2="222" y2="180" stroke="#1877F2" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
                <line x1="295" y1="180" x2="382" y2="180" stroke="#FF6B00" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
                <line x1="455" y1="180" x2="542" y2="180" stroke="#FF6B00" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
                <path d="M 615 180 C 700 180, 720 60, 788 60" fill="none" stroke="#EA4335" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
                <line x1="615" y1="180" x2="788" y2="180" stroke="#4A154B" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
                <path d="M 615 180 C 700 180, 720 300, 788 300" fill="none" stroke="#34A853" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
              </svg>

              {/* Node 1: Facebook */}
              <div id="tour-node-facebook" style={{ left: '68px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#1877F2', padding: '14px', position: 'relative', boxShadow: '0 8px 24px rgba(24, 119, 242, 0.35)', color: '#fff' }}>
                  <FacebookLogo style={{ width: '100%', height: '100%' }} />
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#0f172a', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>1</span>
                </div>
                <div style={{ textAlign: 'center', width: '110px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>On webhook call</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>from Lead Ads</span>
                </div>
              </div>

              {/* Node 2: IF */}
              <div id="tour-node-if" style={{ left: '228px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}>
                <div style={{ position: 'absolute', top: '-26px', fontSize: '10px', fontWeight: 800, background: '#fff', border: '1px solid #e2e8f0', padding: '2px 8px', borderRadius: '9999px', color: '#334155', whiteSpace: 'nowrap' }}>1st Has an email</div>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FF6B00', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', position: 'relative', boxShadow: '0 8px 24px rgba(255, 107, 0, 0.35)' }}>
                  IF
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#0f172a', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>2</span>
                </div>
                <div style={{ textAlign: 'center', width: '110px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>IF</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>1 route - first match</span>
                </div>
              </div>

              {/* Node 3: HubSpot */}
              <div id="tour-node-hubspot" style={{ left: '388px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', padding: '14px', position: 'relative', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)' }}>
                  <HubSpotLogo style={{ width: '100%', height: '100%' }} />
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#0f172a', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>3</span>
                </div>
                <div style={{ textAlign: 'center', width: '130px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>HubSpot CRM</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>POST /crm/v3/contacts</span>
                </div>
              </div>

              {/* Node 4: Assign */}
              <div id="tour-node-assign" style={{ left: '548px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.35)' }}>
                  <UserCheck size={28} />
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#0f172a', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>4</span>
                </div>
                <div style={{ textAlign: 'center', width: '140px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>Assign to next</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>Round Robin Queue</span>
                </div>
              </div>

              {/* Node 5, 6, 7 Destinations Group */}
              <div id="tour-node-destinations">
                {/* Node 5: Gmail */}
                <div style={{ left: '792px', top: '32px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10 }}>
                  <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', padding: '12px', position: 'relative', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                    <GmailLogo style={{ width: '100%', height: '100%' }} />
                    <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '20px', height: '20px', borderRadius: '50%', background: '#0f172a', color: '#fff', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff' }}>5</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>Gmail Alert</span>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>send lead_email</span>
                  </div>
                </div>

                {/* Node 6: Slack */}
                <div style={{ left: '792px', top: '152px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10 }}>
                  <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', padding: '12px', position: 'relative', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                    <SlackLogo style={{ width: '100%', height: '100%' }} />
                    <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '20px', height: '20px', borderRadius: '50%', background: '#0f172a', color: '#fff', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff' }}>6</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>Slack Channel</span>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>post to #sales-leads</span>
                  </div>
                </div>

                {/* Node 7: Google Sheets */}
                <div style={{ left: '792px', top: '272px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10 }}>
                  <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', padding: '12px', position: 'relative', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                    <Google style={{ width: '100%', height: '100%' }} />
                    <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '20px', height: '20px', borderRadius: '50%', background: '#0f172a', color: '#fff', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff' }}>7</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>Google Sheets</span>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>append Lead row</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* FLOW 2 */}
          {activeFlowIndex === 1 && (
            <>
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <line x1="135" y1="180" x2="222" y2="180" stroke="#95BF47" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
                <line x1="295" y1="180" x2="382" y2="180" stroke="#FF6B00" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
                <line x1="455" y1="180" x2="542" y2="180" stroke="#EA4335" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
                <line x1="615" y1="180" x2="702" y2="180" stroke="#25D366" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
                <path d="M 735 180 C 780 180, 780 290, 788 290" fill="none" stroke="#18181B" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
              </svg>

              {/* Node 1: Shopify */}
              <div style={{ left: '68px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', padding: '14px', position: 'relative', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                  <ShopifyLogo style={{ width: '100%', height: '100%' }} />
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#0f172a', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>1</span>
                </div>
                <div style={{ textAlign: 'center', width: '110px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>On webhook call</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>from Shopify</span>
                </div>
              </div>

              {/* Node 2: IF Paid */}
              <div style={{ left: '228px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}>
                <div style={{ position: 'absolute', top: '-26px', fontSize: '10px', fontWeight: 800, background: '#fff', border: '1px solid #e2e8f0', padding: '2px 8px', borderRadius: '9999px', color: '#334155', whiteSpace: 'nowrap' }}>1st Paid</div>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FF6B00', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', position: 'relative', boxShadow: '0 8px 24px rgba(255, 107, 0, 0.35)' }}>
                  IF
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#0f172a', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>2</span>
                </div>
                <div style={{ textAlign: 'center', width: '110px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>IF</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>1 route - paid</span>
                </div>
              </div>

              {/* Node 3: Zoho */}
              <div style={{ left: '388px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', padding: '14px', position: 'relative', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                  <ZohoLogo style={{ width: '100%', height: '100%' }} />
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#0f172a', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>3</span>
                </div>
                <div style={{ textAlign: 'center', width: '130px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>Zoho Books</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>Create Invoice</span>
                </div>
              </div>

              {/* Node 4: WhatsApp */}
              <div style={{ left: '548px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', padding: '12px', position: 'relative', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                  <WhatsappIcon style={{ width: '100%', height: '100%' }} />
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#0f172a', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>4</span>
                </div>
                <div style={{ textAlign: 'center', width: '120px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>WhatsApp</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>Send Order PDF</span>
                </div>
              </div>

              {/* Node 5: Shiprocket */}
              <div style={{ left: '708px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', padding: '14px', position: 'relative', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                  <ShiprocketLogo style={{ width: '100%', height: '100%' }} />
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#0f172a', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>5</span>
                </div>
                <div style={{ textAlign: 'center', width: '130px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>Shiprocket</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>Generate Label</span>
                </div>
              </div>

              {/* Node 6: Google Sheets */}
              <div style={{ left: '792px', top: '262px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10 }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', padding: '12px', position: 'relative', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                  <Google style={{ width: '100%', height: '100%' }} />
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '20px', height: '20px', borderRadius: '50%', background: '#0f172a', color: '#fff', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff' }}>6</span>
                </div>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>Google Sheets</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>Log Order Row</span>
                </div>
              </div>
            </>
          )}

          {/* FLOW 3 */}
          {activeFlowIndex === 2 && (
            <>
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <line x1="135" y1="180" x2="222" y2="180" stroke="#18181B" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
                <line x1="295" y1="180" x2="382" y2="180" stroke="#18181B" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
                <line x1="455" y1="180" x2="542" y2="180" stroke="#FF6B00" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
                <path d="M 615 180 C 700 180, 720 40, 788 40" fill="none" stroke="#0A66C2" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
                <path d="M 615 180 C 700 180, 720 130, 788 130" fill="none" stroke="#1877F2" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
                <path d="M 615 180 C 700 180, 720 220, 788 220" fill="none" stroke="#24A1DE" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
                <path d="M 615 180 C 700 180, 720 310, 788 310" fill="none" stroke="#5865F2" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dash 2s linear infinite' }} />
              </svg>

              {/* Node 1: RSS */}
              <div style={{ left: '68px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.35)' }}>
                  <Rss size={28} color="#fbbf24" />
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#0f172a', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>1</span>
                </div>
                <div style={{ textAlign: 'center', width: '120px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>When blog posts</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>RSS / WordPress</span>
                </div>
              </div>

              {/* Node 2: Gemini */}
              <div style={{ left: '228px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#090D16', border: '2px solid #60a5fa', padding: '14px', position: 'relative', boxShadow: '0 8px 24px rgba(96, 165, 250, 0.3)' }}>
                  <GeminiLogo style={{ width: '100%', height: '100%' }} />
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#0f172a', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>2</span>
                </div>
                <div style={{ textAlign: 'center', width: '120px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>Gemini AI</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>Content Rewrite</span>
                </div>
              </div>

              {/* Node 3: Wait */}
              <div style={{ left: '388px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FF6B00', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 8px 24px rgba(255, 107, 0, 0.35)' }}>
                  <Clock size={28} />
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#0f172a', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>3</span>
                </div>
                <div style={{ textAlign: 'center', width: '130px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>Wait for approval</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>Editor Review</span>
                </div>
              </div>

              {/* Node 4: IF Approved */}
              <div style={{ left: '548px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}>
                <div style={{ position: 'absolute', top: '-26px', fontSize: '10px', fontWeight: 800, background: '#fff', border: '1px solid #e2e8f0', padding: '2px 8px', borderRadius: '9999px', color: '#334155', whiteSpace: 'nowrap' }}>1st Approved</div>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FF6B00', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', position: 'relative', boxShadow: '0 8px 24px rgba(255, 107, 0, 0.35)' }}>
                  IF
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#0f172a', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>4</span>
                </div>
                <div style={{ textAlign: 'center', width: '110px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>IF</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>1 route - approved</span>
                </div>
              </div>

              {/* Node 5: LinkedIn */}
              <div style={{ left: '792px', top: '12px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10 }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', padding: '10px', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                  <LinkedInLogo style={{ width: '100%', height: '100%' }} />
                </div>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>LinkedIn</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>Auto-post</span>
                </div>
              </div>

              {/* Node 6: Facebook */}
              <div style={{ left: '792px', top: '102px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10 }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', padding: '10px', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                  <FacebookLogo style={{ width: '100%', height: '100%' }} />
                </div>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>Facebook</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>Publish Feed</span>
                </div>
              </div>

              {/* Node 7: Telegram */}
              <div style={{ left: '792px', top: '192px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10 }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', padding: '10px', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                  <Telegram style={{ width: '100%', height: '100%' }} />
                </div>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>Telegram</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>Broadcast</span>
                </div>
              </div>

              {/* Node 8: Discord */}
              <div style={{ left: '792px', top: '282px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10 }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', padding: '10px', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                  <Discord style={{ width: '100%', height: '100%' }} />
                </div>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block' }}>Discord</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>Announcements</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* BOTTOM FLOATING BAR */}
        <div className="wm-canvas-floating-bar">
          <button
            id="tour-run-btn"
            onClick={handleRun}
            disabled={isRunning}
            className="wm-run-btn"
          >
            <Play size={13} fill="#ffffff" />
            <span>{isRunning ? 'Running...' : 'Run Flow'}</span>
          </button>

          <div style={{ width: '1px', height: '16px', background: '#cbd5e1', margin: '0 4px' }} />

          <button className="wm-zoom-btn" title="Undo"><RotateCcw size={15} /></button>
          <button className="wm-zoom-btn" title="Redo"><RotateCw size={15} /></button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, color: '#10b981', padding: '0 6px' }}>
            <CheckCircle2 size={15} />
            <span>Saved</span>
          </div>

          <button style={{ display: 'flex', alignItems: 'center', gap: '4px', borderRadius: '9999px', border: '1px solid #cbd5e1', background: '#f8fafc', padding: '6px 12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
            <Save size={13} />
            <span>Save</span>
          </button>
        </div>

        {/* BOTTOM LEFT ZOOM BOX */}
        <div className="wm-canvas-zoom-box">
          <button onClick={handleZoomIn} className="wm-zoom-btn" title="Zoom In"><Plus size={15} /></button>
          <span style={{ fontSize: '11px', fontWeight: 800, padding: '0 4px', color: '#64748b', minWidth: '38px', textAlign: 'center' }}>
            {Math.round(zoomLevel * 100)}%
          </span>
          <button onClick={handleZoomOut} className="wm-zoom-btn" title="Zoom Out"><Minus size={15} /></button>
          <button onClick={handleResetZoom} className="wm-zoom-btn" title="Reset Zoom"><Maximize2 size={15} /></button>
        </div>
      </div>
    </div>
  )
}
