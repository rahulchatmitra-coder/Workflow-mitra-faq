import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  Clock, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Calendar, 
  Mail, 
  Database, 
  Bot, 
  Send, 
  FileSpreadsheet,
  Search,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Cpu
} from 'lucide-react'
import './ManualChaosVsAIClarity.css'

const MANUAL_PAIN_POINTS = [
  {
    title: 'Fragmented Spreadsheets & Data Hunting',
    desc: 'Manually scraping lead emails, copy-pasting CRM details, and managing messy CSV files.',
    time: '4 hrs / day',
    icon: FileSpreadsheet,
  },
  {
    title: 'Manual Cold Outreach & Follow-Ups',
    desc: 'Typing individual emails, tracking follow-up intervals in notes, and missing hot prospects.',
    time: '3 hrs / day',
    icon: Mail,
  },
  {
    title: 'Calendar Back-and-Forth',
    desc: 'Endless scheduling emails, conflicting time zones, and lost booking opportunities.',
    time: '2 hrs / day',
    icon: MessageSquare,
  },
  {
    title: 'Delayed CRM & Data Entry',
    desc: 'Manually updating pipeline stages, deal amounts, and conversation logs after hours.',
    time: '1.5 hrs / day',
    icon: Database,
  }
]

const AI_POWER_STEPS = [
  {
    step: '01',
    title: 'Inbound Trigger Detected',
    desc: 'New lead arrives from Website Form, Facebook Ad, or Webhook.',
    badge: '< 0.1s Trigger',
    icon: Zap,
    app: 'Webhook / Form',
  },
  {
    step: '02',
    title: 'AI Scores & Enriches Lead',
    desc: 'Claude 3.5 & GPT-4o analyze intent, budget, and company size instantly.',
    badge: 'Intent: 96/100',
    icon: Bot,
    app: 'AI Reasoning Engine',
  },
  {
    step: '03',
    title: 'Automated Multi-Channel Outreach',
    desc: 'Personalized WhatsApp & Email sent with interactive booking link.',
    badge: 'Personalized',
    icon: Send,
    app: 'WhatsApp & Email',
  },
  {
    step: '04',
    title: 'Meeting Auto-Booked in CRM',
    desc: 'Calendar slot confirmed, deal created in HubSpot, SDR notified on Slack.',
    badge: 'Meeting Booked',
    icon: Calendar,
    app: 'HubSpot & Cal.com',
  }
]

export default function ManualChaosVsAIClarity() {
  const [activeView, setActiveView] = useState('all') // 'all', 'manual', 'ai'
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Simulation auto-advancer
  useEffect(() => {
    let timer
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % AI_POWER_STEPS.length)
      }, 2400)
    }
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  return (
    <section className="mc-modern-section" id="manual-vs-ai">
      <div className="mc-modern-container">
        
        {/* Section Header */}
        <div className="mc-modern-header">
          <div className="mc-modern-pill-badge">
            <span className="mc-pill-red">Manual Chaos</span>
            <span className="mc-pill-arrow">→</span>
            <span className="mc-pill-green">AI Clarity</span>
          </div>

          <h2 className="mc-modern-title">
            Automate your outreach. <span className="mc-title-gradient">Reclaim your time.</span>
          </h2>

          <p className="mc-modern-subtitle">
            One trigger. Everything else executed on 24/7 autopilot in seconds.
          </p>

          {/* Quick Filter Switcher */}
          <div className="mc-filter-switcher">
            <button 
              className={`mc-filter-btn ${activeView === 'all' ? 'active' : ''}`}
              onClick={() => setActiveView('all')}
            >
              Side-by-Side Comparison
            </button>
            <button 
              className={`mc-filter-btn btn-red-filter ${activeView === 'manual' ? 'active' : ''}`}
              onClick={() => setActiveView('manual')}
            >
              <Clock size={14} />
              <span>Manual Way (10+ Hrs Wasted)</span>
            </button>
            <button 
              className={`mc-filter-btn btn-green-filter ${activeView === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveView('ai')}
            >
              <Zap size={14} />
              <span>WorkflowMitra (Instant Autopilot)</span>
            </button>
          </div>
        </div>

        {/* Side-by-Side Clean Grid */}
        <div className={`mc-modern-grid ${activeView !== 'all' ? `view-${activeView}` : ''}`}>
          
          {/* ========================================================= */}
          {/* LEFT: THE OLD MANUAL WAY (CHAOS) */}
          {/* ========================================================= */}
          {(activeView === 'all' || activeView === 'manual') && (
            <div className="mc-card-box mc-card-chaos">
              
              {/* Header */}
              <div className="mc-card-top-bar">
                <div className="mc-card-tag-pill pill-chaos">
                  <span className="mc-dot-red" />
                  <span>The Old Manual Way</span>
                </div>
                <div className="mc-card-stat-pill stat-chaos">
                  <Clock size={13} />
                  <span>18+ hrs / week lost</span>
                </div>
              </div>

              <div className="mc-card-heading-block">
                <h3 className="mc-card-main-title text-chaos">Slow, Fragmented &amp; Error-Prone</h3>
                <p className="mc-card-main-desc">
                  Scattered spreadsheets, manual typing, delayed follow-ups, and lost deals.
                </p>
              </div>

              {/* 4 Clean Scannable Pain Points */}
              <div className="mc-pain-list">
                {MANUAL_PAIN_POINTS.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div className="mc-pain-item" key={idx}>
                      <div className="mc-pain-icon-wrap">
                        <XCircle size={16} className="text-red-500" />
                      </div>
                      <div className="mc-pain-content">
                        <div className="mc-pain-header">
                          <h4 className="mc-pain-title">{item.title}</h4>
                          <span className="mc-pain-time">{item.time}</span>
                        </div>
                        <p className="mc-pain-desc">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Footer Summary Banner */}
              <div className="mc-card-bottom-banner banner-chaos">
                <div className="mc-banner-icon icon-chaos">
                  <AlertTriangle size={18} />
                </div>
                <div className="mc-banner-text">
                  <div className="mc-banner-title text-chaos">Human Bottleneck &amp; Pipeline Drop-off</div>
                  <div className="mc-banner-sub">Low conversion rate • Slow response times • Burned out team</div>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* RIGHT: THE WORKFLOWMITRA AI WAY (CLARITY) */}
          {/* ========================================================= */}
          {(activeView === 'all' || activeView === 'ai') && (
            <div className="mc-card-box mc-card-clarity">
              
              {/* Header */}
              <div className="mc-card-top-bar">
                <div className="mc-card-tag-pill pill-clarity">
                  <span className="mc-dot-green" />
                  <span>WorkflowMitra AI Autopilot</span>
                </div>
                <div className="mc-card-stat-pill stat-clarity">
                  <Zap size={13} />
                  <span>&lt; 0.2s Execution</span>
                </div>
              </div>

              <div className="mc-card-heading-block flex justify-between items-start">
                <div>
                  <h3 className="mc-card-main-title text-clarity">Instant, Intelligent &amp; Autonomous</h3>
                  <p className="mc-card-main-desc">
                    One trigger triggers native AI reasoning, multi-app data flow, and confirmed bookings.
                  </p>
                </div>

                <button 
                  className={`mc-live-sim-btn ${isAutoPlaying ? 'running' : ''}`}
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  title={isAutoPlaying ? 'Pause Live Demo' : 'Play Live Demo'}
                >
                  {isAutoPlaying ? <RotateCcw size={13} /> : <Play size={13} />}
                  <span>{isAutoPlaying ? 'Live Demo' : 'Run Demo'}</span>
                </button>
              </div>

              {/* 4 Interactive Flow Steps */}
              <div className="mc-ai-flow-list">
                {AI_POWER_STEPS.map((item, idx) => {
                  const Icon = item.icon
                  const isActive = activeStep === idx
                  return (
                    <div 
                      className={`mc-ai-step-item ${isActive ? 'active-step' : ''}`}
                      key={idx}
                      onClick={() => {
                        setActiveStep(idx)
                        setIsAutoPlaying(false)
                      }}
                    >
                      <div className="mc-step-node-col">
                        <div className={`mc-node-disc ${isActive ? 'active-disc' : ''}`}>
                          <CheckCircle2 size={16} />
                        </div>
                        {idx < AI_POWER_STEPS.length - 1 && <div className="mc-node-connector" />}
                      </div>

                      <div className="mc-ai-step-body">
                        <div className="mc-step-top-row">
                          <span className="mc-step-num-badge">Step {item.step}</span>
                          <span className="mc-step-app-tag">{item.app}</span>
                          <span className="mc-step-live-chip">{item.badge}</span>
                        </div>
                        <h4 className="mc-step-heading">{item.title}</h4>
                        <p className="mc-step-explanation">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Footer Summary Banner */}
              <div className="mc-card-bottom-banner banner-clarity">
                <div className="mc-banner-icon icon-clarity">
                  <Sparkles size={18} />
                </div>
                <div className="mc-banner-text">
                  <div className="mc-banner-title text-clarity">5× More Booked Meetings on Autopilot</div>
                  <div className="mc-banner-sub">100% Automated • Instant Outreach • Zero Human Errors</div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  )
}
