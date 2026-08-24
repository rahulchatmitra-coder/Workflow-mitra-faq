import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
} from '../components/svgs'

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
      category: 'LEAD ROUTING AUTOMATION',
      totalSteps: 7,
    },
    {
      id: 'flow-2',
      title: 'Shopify order → Zoho Books invoice → WhatsApp & Shiprocket',
      category: 'E-COMMERCE FULFILLMENT AUTOMATION',
      totalSteps: 6,
    },
    {
      id: 'flow-3',
      title: 'New blog post → Google Gemini AI rewrite → LinkedIn, Facebook, Telegram & Discord',
      category: 'AI AGENTS & SOCIAL DISTRIBUTION',
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
    <div
      id="tour-canvas"
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: '24px',
        border: '1px solid #e4e4e7',
        background: '#f8fafc',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.06)',
        overflow: 'hidden',
      }}
    >
      {/* TOP HEADER WITH WORKFLOW TITLE & NAVIGATION */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #e4e4e7',
          background: '#ffffff',
          padding: '16px 24px',
          position: 'relative',
          zIndex: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#09090b',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '14px',
              border: '1px solid #27272a',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              flexShrink: 0,
            }}
          >
            WM
          </div>
          <div>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#71717a',
                display: 'block',
              }}
            >
              {workflows[activeFlowIndex].category} ({activeFlowIndex + 1}/3)
            </span>
            <h4
              style={{
                fontSize: '16px',
                fontWeight: 900,
                color: '#09090b',
                margin: '2px 0 0',
                letterSpacing: '-0.02em',
              }}
            >
              {workflows[activeFlowIndex].title}
            </h4>
          </div>
        </div>

        {/* WORKFLOW SLIDER CONTROLS (PREV / 1/3 / NEXT) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {executionMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '9999px',
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                padding: '5px 14px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#059669',
                boxShadow: '0 2px 6px rgba(5, 150, 105, 0.1)',
              }}
            >
              <Sparkles size={14} style={{ animation: isRunning ? 'spin 2s linear infinite' : 'none' }} />
              <span>{executionMessage}</span>
            </motion.div>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              border: '1px solid #e4e4e7',
              background: '#f4f4f5',
              padding: '4px',
              borderRadius: '16px',
            }}
          >
            <button
              onClick={handlePrevFlow}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 12px',
                minHeight: '36px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#18181b',
                background: 'transparent',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
              }}
              aria-label="Previous Workflow"
              title="Previous Workflow"
            >
              <ChevronLeft size={14} />
              <span>Prev</span>
            </button>
            <span style={{ fontSize: '11px', fontWeight: 800, padding: '0 6px', color: '#27272a' }}>
              {activeFlowIndex + 1}/{workflows.length}
            </span>
            <button
              onClick={handleNextFlow}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 14px',
                minHeight: '36px',
                fontSize: '12px',
                fontWeight: 800,
                color: '#ffffff',
                background: '#09090b',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
              }}
              aria-label="Next Workflow"
              title="Next Workflow"
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* CANVAS DOTTED VIEWPORT */}
      <div
        style={{
          position: 'relative',
          height: '460px',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'radial-gradient(#d4d4d8 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      >
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
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFlowIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              style={{ position: 'relative', width: '100%', height: '100%' }}
            >
              {/* FLOW 1: FACEBOOK LEAD -> HUBSPOT CRM -> SLACK & GMAIL */}
              {activeFlowIndex === 0 && (
                <>
                  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                    <defs>
                      <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1877F2" />
                      </marker>
                      <marker id="arrow-orange" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#FF6B00" />
                      </marker>
                      <marker id="arrow-dark" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#71717A" />
                      </marker>
                      <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#EA4335" />
                      </marker>
                      <marker id="arrow-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#4A154B" />
                      </marker>
                      <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#34A853" />
                      </marker>
                    </defs>

                    <line x1="135" y1="180" x2="222" y2="180" stroke="#1877F2" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-blue)" />
                    <line x1="295" y1="180" x2="382" y2="180" stroke="#FF6B00" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-orange)" />
                    <line x1="455" y1="180" x2="542" y2="180" stroke="#FF6B00" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-dark)" />
                    <path d="M 615 180 C 700 180, 720 60, 788 60" fill="none" stroke="#EA4335" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-red)" />
                    <line x1="615" y1="180" x2="788" y2="180" stroke="#4A154B" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-purple)" />
                    <path d="M 615 180 C 700 180, 720 300, 788 300" fill="none" stroke="#34A853" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-green)" />
                  </svg>

                  {/* Node 1: Facebook */}
                  <motion.div
                    id="tour-node-facebook"
                    animate={{ scale: activeStep === 1 ? 1.12 : 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ left: '68px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}
                  >
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#1877F2', padding: '14px', position: 'relative', boxShadow: activeStep === 1 ? '0 0 0 6px rgba(24, 119, 242, 0.4), 0 12px 28px rgba(24, 119, 242, 0.5)' : '0 8px 24px rgba(24, 119, 242, 0.35)', color: '#fff', transition: 'all 0.2s ease' }}>
                      <FacebookLogo style={{ width: '100%', height: '100%' }} />
                      <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#09090b', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>1</span>
                    </div>
                    <div style={{ textAlign: 'center', width: '110px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>On webhook call</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>from Lead Ads</span>
                    </div>
                  </motion.div>

                  {/* Node 2: IF */}
                  <motion.div
                    id="tour-node-if"
                    animate={{ scale: activeStep === 2 ? 1.12 : 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ left: '228px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}
                  >
                    <div style={{ position: 'absolute', top: '-26px', fontSize: '10px', fontWeight: 800, background: '#fff', border: '1px solid #e4e4e7', padding: '2px 8px', borderRadius: '9999px', color: '#3f3f46', whiteSpace: 'nowrap' }}>1st Has an email</div>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FF6B00', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', position: 'relative', boxShadow: activeStep === 2 ? '0 0 0 6px rgba(255, 107, 0, 0.4), 0 12px 28px rgba(255, 107, 0, 0.5)' : '0 8px 24px rgba(255, 107, 0, 0.35)', transition: 'all 0.2s ease' }}>
                      IF
                      <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#09090b', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>2</span>
                    </div>
                    <div style={{ textAlign: 'center', width: '110px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>IF</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>1 route - first match</span>
                    </div>
                  </motion.div>

                  {/* Node 3: HubSpot */}
                  <motion.div
                    id="tour-node-hubspot"
                    animate={{ scale: activeStep === 3 ? 1.12 : 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ left: '388px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}
                  >
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fff', border: '1px solid #e4e4e7', padding: '14px', position: 'relative', boxShadow: activeStep === 3 ? '0 0 0 6px rgba(255, 122, 89, 0.4), 0 12px 28px rgba(0, 0, 0, 0.12)' : '0 8px 24px rgba(0, 0, 0, 0.06)', transition: 'all 0.2s ease' }}>
                      <HubSpotLogo style={{ width: '100%', height: '100%' }} />
                      <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#09090b', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>3</span>
                    </div>
                    <div style={{ textAlign: 'center', width: '130px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>HubSpot CRM</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>POST /crm/v3/contacts</span>
                    </div>
                  </motion.div>

                  {/* Node 4: Assign */}
                  <motion.div
                    id="tour-node-assign"
                    animate={{ scale: activeStep === 4 ? 1.12 : 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ left: '548px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}
                  >
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#09090b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: activeStep === 4 ? '0 0 0 6px rgba(9, 9, 11, 0.4), 0 12px 28px rgba(9, 9, 11, 0.5)' : '0 8px 24px rgba(9, 9, 11, 0.35)', transition: 'all 0.2s ease' }}>
                      <UserCheck size={28} />
                      <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#09090b', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>4</span>
                    </div>
                    <div style={{ textAlign: 'center', width: '140px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>Assign to next person</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>Round Robin Queue</span>
                    </div>
                  </motion.div>

                  {/* Node 5, 6, 7 Destinations Group */}
                  <motion.div
                    id="tour-node-destinations"
                    animate={{ scale: activeStep === 5 ? 1.05 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Node 5: Gmail */}
                    <div style={{ left: '792px', top: '32px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10 }}>
                      <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: '#fff', border: '1px solid #e4e4e7', padding: '12px', position: 'relative', boxShadow: activeStep === 5 ? '0 0 0 4px rgba(234, 67, 53, 0.35), 0 8px 20px rgba(0,0,0,0.1)' : '0 4px 16px rgba(0,0,0,0.06)' }}>
                        <GmailLogo style={{ width: '100%', height: '100%' }} />
                        <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '20px', height: '20px', borderRadius: '50%', background: '#09090b', color: '#fff', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff' }}>5</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>Gmail Alert</span>
                        <span style={{ fontSize: '10px', color: '#71717a' }}>send &#123;&#123; lead_email &#125;&#125;</span>
                      </div>
                    </div>

                    {/* Node 6: Slack */}
                    <div style={{ left: '792px', top: '152px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10 }}>
                      <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: '#fff', border: '1px solid #e4e4e7', padding: '12px', position: 'relative', boxShadow: activeStep === 5 ? '0 0 0 4px rgba(74, 21, 75, 0.35), 0 8px 20px rgba(0,0,0,0.1)' : '0 4px 16px rgba(0,0,0,0.06)' }}>
                        <SlackLogo style={{ width: '100%', height: '100%' }} />
                        <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '20px', height: '20px', borderRadius: '50%', background: '#09090b', color: '#fff', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff' }}>6</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>Slack Channel</span>
                        <span style={{ fontSize: '10px', color: '#71717a' }}>post to #sales-leads</span>
                      </div>
                    </div>

                    {/* Node 7: Google Sheets */}
                    <div style={{ left: '792px', top: '272px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10 }}>
                      <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: '#fff', border: '1px solid #e4e4e7', padding: '12px', position: 'relative', boxShadow: activeStep === 5 ? '0 0 0 4px rgba(52, 168, 83, 0.35), 0 8px 20px rgba(0,0,0,0.1)' : '0 4px 16px rgba(0,0,0,0.06)' }}>
                        <Google style={{ width: '100%', height: '100%' }} />
                        <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '20px', height: '20px', borderRadius: '50%', background: '#09090b', color: '#fff', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff' }}>7</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>Google Sheets</span>
                        <span style={{ fontSize: '10px', color: '#71717a' }}>append Lead row</span>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}

              {/* FLOW 2 */}
              {activeFlowIndex === 1 && (
                <>
                  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                    <defs>
                      <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#34A853" />
                      </marker>
                      <marker id="arrow-orange" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#FF6B00" />
                      </marker>
                      <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#EA4335" />
                      </marker>
                      <marker id="arrow-dark" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#71717A" />
                      </marker>
                    </defs>

                    <line x1="135" y1="180" x2="222" y2="180" stroke="#95BF47" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-green)" />
                    <line x1="295" y1="180" x2="382" y2="180" stroke="#FF6B00" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-orange)" />
                    <line x1="455" y1="180" x2="542" y2="180" stroke="#EA4335" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-red)" />
                    <line x1="615" y1="180" x2="702" y2="180" stroke="#25D366" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-green)" />
                    <path d="M 735 180 C 780 180, 780 290, 788 290" fill="none" stroke="#18181B" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-dark)" />
                  </svg>

                  {/* Node 1: Shopify */}
                  <motion.div
                    animate={{ scale: activeStep === 1 ? 1.12 : 1 }}
                    style={{ left: '68px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}
                  >
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fff', border: '1px solid #e4e4e7', padding: '14px', position: 'relative', boxShadow: activeStep === 1 ? '0 0 0 6px rgba(149, 191, 71, 0.4)' : '0 8px 24px rgba(0,0,0,0.06)' }}>
                      <ShopifyLogo style={{ width: '100%', height: '100%' }} />
                      <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#09090b', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>1</span>
                    </div>
                    <div style={{ textAlign: 'center', width: '110px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>On webhook call</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>from Shopify</span>
                    </div>
                  </motion.div>

                  {/* Node 2: IF Paid */}
                  <motion.div
                    animate={{ scale: activeStep === 2 ? 1.12 : 1 }}
                    style={{ left: '228px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}
                  >
                    <div style={{ position: 'absolute', top: '-26px', fontSize: '10px', fontWeight: 800, background: '#fff', border: '1px solid #e4e4e7', padding: '2px 8px', borderRadius: '9999px', color: '#3f3f46', whiteSpace: 'nowrap' }}>1st Paid</div>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FF6B00', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', position: 'relative', boxShadow: activeStep === 2 ? '0 0 0 6px rgba(255, 107, 0, 0.4)' : '0 8px 24px rgba(255, 107, 0, 0.35)' }}>
                      IF
                      <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#09090b', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>2</span>
                    </div>
                    <div style={{ textAlign: 'center', width: '110px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>IF</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>1 route - paid</span>
                    </div>
                  </motion.div>

                  {/* Node 3: Zoho */}
                  <motion.div
                    animate={{ scale: activeStep === 3 ? 1.12 : 1 }}
                    style={{ left: '388px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}
                  >
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fff', border: '1px solid #e4e4e7', padding: '14px', position: 'relative', boxShadow: activeStep === 3 ? '0 0 0 6px rgba(234, 67, 53, 0.4)' : '0 8px 24px rgba(0,0,0,0.06)' }}>
                      <ZohoLogo style={{ width: '100%', height: '100%' }} />
                      <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#09090b', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>3</span>
                    </div>
                    <div style={{ textAlign: 'center', width: '130px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>Zoho Books</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>Create Invoice</span>
                    </div>
                  </motion.div>

                  {/* Node 4: WhatsApp */}
                  <motion.div
                    animate={{ scale: activeStep === 4 ? 1.12 : 1 }}
                    style={{ left: '548px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}
                  >
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fff', border: '1px solid #e4e4e7', padding: '12px', position: 'relative', boxShadow: activeStep === 4 ? '0 0 0 6px rgba(37, 211, 102, 0.4)' : '0 8px 24px rgba(0,0,0,0.06)' }}>
                      <WhatsappIcon style={{ width: '100%', height: '100%' }} />
                      <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#09090b', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>4</span>
                    </div>
                    <div style={{ textAlign: 'center', width: '120px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>WhatsApp</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>Send Order PDF</span>
                    </div>
                  </motion.div>

                  {/* Node 5: Shiprocket */}
                  <motion.div
                    animate={{ scale: activeStep === 5 ? 1.12 : 1 }}
                    style={{ left: '708px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}
                  >
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fff', border: '1px solid #e4e4e7', padding: '14px', position: 'relative', boxShadow: activeStep === 5 ? '0 0 0 6px rgba(99, 102, 241, 0.4)' : '0 8px 24px rgba(0,0,0,0.06)' }}>
                      <ShiprocketLogo style={{ width: '100%', height: '100%' }} />
                      <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#09090b', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>5</span>
                    </div>
                    <div style={{ textAlign: 'center', width: '130px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>Shiprocket</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>Generate Label</span>
                    </div>
                  </motion.div>

                  {/* Node 6: Google Sheets */}
                  <motion.div
                    animate={{ scale: activeStep === 5 ? 1.05 : 1 }}
                    style={{ left: '792px', top: '262px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10 }}
                  >
                    <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: '#fff', border: '1px solid #e4e4e7', padding: '12px', position: 'relative', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                      <Google style={{ width: '100%', height: '100%' }} />
                      <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '20px', height: '20px', borderRadius: '50%', background: '#09090b', color: '#fff', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fff' }}>6</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>Google Sheets</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>Log Order Row</span>
                    </div>
                  </motion.div>
                </>
              )}

              {/* FLOW 3 */}
              {activeFlowIndex === 2 && (
                <>
                  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                    <defs>
                      <marker id="arrow-dark" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#71717A" />
                      </marker>
                      <marker id="arrow-orange" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#FF6B00" />
                      </marker>
                      <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1877F2" />
                      </marker>
                      <marker id="arrow-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#5865F2" />
                      </marker>
                    </defs>

                    <line x1="135" y1="180" x2="222" y2="180" stroke="#18181B" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-dark)" />
                    <line x1="295" y1="180" x2="382" y2="180" stroke="#18181B" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-dark)" />
                    <line x1="455" y1="180" x2="542" y2="180" stroke="#FF6B00" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-orange)" />
                    <path d="M 615 180 C 700 180, 720 40, 788 40" fill="none" stroke="#0A66C2" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-blue)" />
                    <path d="M 615 180 C 700 180, 720 130, 788 130" fill="none" stroke="#1877F2" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-blue)" />
                    <path d="M 615 180 C 700 180, 720 220, 788 220" fill="none" stroke="#24A1DE" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-blue)" />
                    <path d="M 615 180 C 700 180, 720 310, 788 310" fill="none" stroke="#5865F2" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow-purple)" />
                  </svg>

                  {/* Node 1: RSS */}
                  <motion.div
                    animate={{ scale: activeStep === 1 ? 1.12 : 1 }}
                    style={{ left: '68px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}
                  >
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#09090b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: activeStep === 1 ? '0 0 0 6px rgba(251, 191, 36, 0.4)' : '0 8px 24px rgba(9, 9, 11, 0.35)' }}>
                      <Rss size={28} color="#fbbf24" />
                      <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#09090b', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>1</span>
                    </div>
                    <div style={{ textAlign: 'center', width: '120px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>When blog posts</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>RSS / WordPress</span>
                    </div>
                  </motion.div>

                  {/* Node 2: Gemini */}
                  <motion.div
                    animate={{ scale: activeStep === 2 ? 1.12 : 1 }}
                    style={{ left: '228px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}
                  >
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#090D16', border: '2px solid #60a5fa', padding: '14px', position: 'relative', boxShadow: activeStep === 2 ? '0 0 0 6px rgba(96, 165, 250, 0.5), 0 12px 28px rgba(96, 165, 250, 0.5)' : '0 8px 24px rgba(96, 165, 250, 0.3)' }}>
                      <GeminiLogo style={{ width: '100%', height: '100%' }} />
                      <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#09090b', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>2</span>
                    </div>
                    <div style={{ textAlign: 'center', width: '120px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>Gemini AI</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>Content Rewrite</span>
                    </div>
                  </motion.div>

                  {/* Node 3: Wait */}
                  <motion.div
                    animate={{ scale: activeStep === 3 ? 1.12 : 1 }}
                    style={{ left: '388px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}
                  >
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FF6B00', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: activeStep === 3 ? '0 0 0 6px rgba(255, 107, 0, 0.4)' : '0 8px 24px rgba(255, 107, 0, 0.35)' }}>
                      <Clock size={28} />
                      <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#09090b', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>3</span>
                    </div>
                    <div style={{ textAlign: 'center', width: '130px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>Wait for approval</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>Editor Review</span>
                    </div>
                  </motion.div>

                  {/* Node 4: IF Approved */}
                  <motion.div
                    animate={{ scale: activeStep === 4 ? 1.12 : 1 }}
                    style={{ left: '548px', top: '148px', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}
                  >
                    <div style={{ position: 'absolute', top: '-26px', fontSize: '10px', fontWeight: 800, background: '#fff', border: '1px solid #e4e4e7', padding: '2px 8px', borderRadius: '9999px', color: '#3f3f46', whiteSpace: 'nowrap' }}>1st Approved</div>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FF6B00', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', position: 'relative', boxShadow: activeStep === 4 ? '0 0 0 6px rgba(255, 107, 0, 0.4)' : '0 8px 24px rgba(255, 107, 0, 0.35)' }}>
                      IF
                      <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: '#09090b', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>4</span>
                    </div>
                    <div style={{ textAlign: 'center', width: '110px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>IF</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>1 route - approved</span>
                    </div>
                  </motion.div>

                  {/* Node 5: LinkedIn */}
                  <div style={{ left: '792px', top: '12px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10 }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '1px solid #e4e4e7', padding: '10px', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                      <LinkedInLogo style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>LinkedIn</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>Auto-post</span>
                    </div>
                  </div>

                  {/* Node 6: Facebook */}
                  <div style={{ left: '792px', top: '102px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10 }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '1px solid #e4e4e7', padding: '10px', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                      <FacebookLogo style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>Facebook</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>Publish Feed</span>
                    </div>
                  </div>

                  {/* Node 7: Telegram */}
                  <div style={{ left: '792px', top: '192px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10 }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '1px solid #e4e4e7', padding: '10px', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                      <Telegram style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>Telegram</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>Broadcast</span>
                    </div>
                  </div>

                  {/* Node 8: Discord */}
                  <div style={{ left: '792px', top: '282px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10 }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '1px solid #e4e4e7', padding: '10px', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                      <Discord style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', display: 'block' }}>Discord</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>Announcements</span>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM FLOATING BAR */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '9999px',
            border: '1px solid #e4e4e7',
            background: 'rgba(255, 255, 255, 0.92)',
            padding: '8px 16px',
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <motion.button
            id="tour-run-btn"
            onClick={handleRun}
            disabled={isRunning}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderRadius: '9999px',
              background: '#09090b',
              padding: '8px 20px',
              fontSize: '12px',
              fontWeight: 800,
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              opacity: isRunning ? 0.75 : 1,
            }}
          >
            <Play size={13} fill="#ffffff" style={{ animation: isRunning ? 'spin 1s linear infinite' : 'none' }} />
            <span>{isRunning ? 'Running...' : 'Run Flow'}</span>
          </motion.button>

          <div style={{ width: '1px', height: '16px', background: '#e4e4e7', margin: '0 4px' }} />

          <button style={{ background: 'transparent', border: 'none', padding: '6px', color: '#71717a', cursor: 'pointer' }} title="Undo">
            <RotateCcw size={15} />
          </button>
          <button style={{ background: 'transparent', border: 'none', padding: '6px', color: '#71717a', cursor: 'pointer' }} title="Redo">
            <RotateCw size={15} />
          </button>

          <div style={{ width: '1px', height: '16px', background: '#e4e4e7', margin: '0 4px' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, color: '#059669', padding: '0 6px' }}>
            <CheckCircle2 size={15} />
            <span>Saved</span>
          </div>

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              borderRadius: '9999px',
              border: '1px solid #e4e4e7',
              background: '#f4f4f5',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#09090b',
              cursor: 'pointer',
            }}
          >
            <Save size={13} />
            <span>Save</span>
          </button>
        </div>

        {/* BOTTOM LEFT ZOOM BOX */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            borderRadius: '12px',
            border: '1px solid #e4e4e7',
            background: 'rgba(255, 255, 255, 0.92)',
            padding: '4px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <button onClick={handleZoomIn} style={{ background: 'transparent', border: 'none', padding: '6px', color: '#3f3f46', cursor: 'pointer', borderRadius: '6px' }} title="Zoom In (+)">
            <Plus size={15} />
          </button>
          <span style={{ fontSize: '11px', fontWeight: 800, padding: '0 4px', color: '#71717a', minWidth: '38px', textAlign: 'center', fontFamily: 'monospace' }}>
            {Math.round(zoomLevel * 100)}%
          </span>
          <button onClick={handleZoomOut} style={{ background: 'transparent', border: 'none', padding: '6px', color: '#3f3f46', cursor: 'pointer', borderRadius: '6px' }} title="Zoom Out (-)">
            <Minus size={15} />
          </button>
          <button onClick={handleResetZoom} style={{ background: 'transparent', border: 'none', padding: '6px', color: '#3f3f46', cursor: 'pointer', borderRadius: '6px' }} title="Reset Zoom (100%)">
            <Maximize2 size={15} />
          </button>
        </div>

        {/* BOTTOM RIGHT MINIMAP / COLOR PALETTE OVERLAY */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            zIndex: 30,
            display: 'flex',
            height: '64px',
            width: '100px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '16px',
            border: '1px solid #e4e4e7',
            background: 'rgba(255, 255, 255, 0.92)',
            padding: '8px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.04)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#3b82f6' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#f97316' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#f97316' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#09090b' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#ef4444' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#a855f7' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#10b981' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
