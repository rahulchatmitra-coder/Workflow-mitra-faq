import React, { useState, useEffect } from 'react'
import { 
  ArrowRight, 
  Clock, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Calendar, 
  Mail, 
  Database, 
  UserCheck, 
  Send, 
  Check, 
  Layers, 
  Bot, 
  Flame,
  CheckCircle,
  FileSpreadsheet,
  Search,
  PenTool,
  Clock3,
  MessageSquare,
  PhoneCall,
  CalendarX,
  FileEdit,
  Smile
} from 'lucide-react'
import './ManualChaosVsAIClarity.css'

const MANUAL_STEPS = [
  {
    num: '1',
    title: 'Build lead spreadsheet',
    desc: 'Manually gather lead details and meticulously organize them into structured rows and columns in a spreadsheet.',
    tag: 'Hours',
    icon: FileSpreadsheet
  },
  {
    num: '2',
    title: 'Hunt down valid emails',
    desc: 'Spend valuable hours researching prospects online and cross-checking databases to find accurate, working email addresses.',
    tag: 'Data Hunting',
    icon: Search
  },
  {
    num: '3',
    title: 'Draft cold emails',
    desc: 'Individually write personalized outreach emails from scratch, hoping to resonate with each recipient.',
    tag: 'Manual Copy',
    icon: PenTool
  },
  {
    num: '4',
    title: 'Schedule batch send',
    desc: 'Manually configure email campaigns, carefully selecting ideal send times to maximize open rates.',
    tag: 'Batch Delay',
    icon: Clock3
  },
  {
    num: '5',
    title: 'Wait for replies',
    desc: 'Sit idly and wait, sometimes days, for prospects to slowly respond, creating uncertainty in your pipeline.',
    tag: 'Days Wasted',
    icon: Clock
  },
  {
    num: '6',
    title: 'Manual follow-ups',
    desc: 'Regularly revisit the spreadsheet, identify unresponsive leads, and manually craft and send additional follow-up messages.',
    tag: 'Tedious Work',
    icon: MessageSquare
  },
  {
    num: '7',
    title: 'Qualify prospects on calls',
    desc: 'Schedule and conduct phone calls individually to determine the genuine interest level and qualification of prospects.',
    tag: 'Time Drain',
    icon: PhoneCall
  },
  {
    num: '8',
    title: 'Back-and-forth scheduling',
    desc: 'Playing the never-ending back and forth with clients to coordinate calendar availability and meeting links.',
    tag: 'Calendar Chaos',
    icon: CalendarX
  },
  {
    num: '9',
    title: 'Update CRM fields',
    desc: 'Spend extra hours manually logging interactions, notes, updates, and lead status into your CRM to keep records up-to-date.',
    tag: 'Admin Work',
    icon: FileEdit
  },
  {
    num: '10',
    title: 'Meeting finally confirmed',
    desc: 'After numerous manual tasks, repeated efforts, and days of waiting, finally confirm the meeting with your prospect.',
    tag: 'Slow Velocity',
    icon: Smile
  }
]

const AI_STEPS = [
  {
    num: '1',
    title: 'Connect your CRM',
    desc: 'Seamlessly plug your existing CRM into the agent—no setup headaches, no code. Just connect and let the automation begin.',
    tag: 'Instant Setup',
    badge: 'Plug & Play',
    icon: Database
  },
  {
    num: '2',
    title: 'AI scores & personalizes leads',
    desc: 'Instantly analyzes and ranks your leads based on relevance and buying intent, then tailors outreach to each one—before you even lift a finger.',
    tag: 'AI Intelligence',
    badge: 'Intent: 94/100',
    icon: Bot
  },
  {
    num: '3',
    title: 'Smart follow-up launches',
    desc: 'Outreach never sleeps. Your AI agent sends timely, personalized follow-ups around the clock to maximize response and engagement rates.',
    tag: '24/7 Autopilot',
    badge: 'Multi-Channel',
    icon: Send
  },
  {
    num: '4',
    title: 'Calendar filled—meeting booked',
    desc: 'Once replies come in, the AI handles scheduling and confirmations—dropping booked meetings directly into your calendar, no back-and-forth.',
    tag: 'Zero Friction',
    badge: '5× Demos',
    icon: Calendar
  }
]

const LIVE_EVENTS = [
  {
    id: 1,
    icon: Bot,
    title: 'Auto-Reply is On',
    desc: 'Agent listening across Email, LinkedIn & WhatsApp',
    badge: 'Active',
    badgeClass: 'badge-active',
    time: 'Just now'
  },
  {
    id: 2,
    icon: Calendar,
    title: 'Meeting scheduled',
    desc: '3:00 PM Tomorrow • Alec Whitten (Acme Inc.)',
    badge: 'Auto-Booked',
    badgeClass: 'badge-active',
    time: '2s ago'
  },
  {
    id: 3,
    icon: UserCheck,
    title: 'Lead status updated',
    desc: 'Marked as High-Intent & Contacted',
    badge: 'Score 92/100',
    badgeClass: 'badge-active',
    time: '5s ago'
  },
  {
    id: 4,
    icon: Mail,
    title: 'Follow-up email sent',
    desc: 'Re: Project Proposal • Personalized for Acme Inc.',
    badge: 'Delivered',
    badgeClass: 'badge-active',
    time: '8s ago'
  },
  {
    id: 5,
    icon: Sparkles,
    title: 'Content personalized',
    desc: 'Proposal customized with live firmographic data',
    badge: 'AI Tailored',
    badgeClass: 'badge-active',
    time: '12s ago'
  },
  {
    id: 6,
    icon: Database,
    title: 'CRM sync complete',
    desc: 'Bidirectional sync with HubSpot & Salesforce',
    badge: 'Synced',
    badgeClass: 'badge-active',
    time: '15s ago'
  }
]

export default function ManualChaosVsAIClarity() {
  const [activeTab, setActiveTab] = useState('all') // 'all', 'manual', 'ai'
  const [simulating, setSimulating] = useState(false)
  const [activeSimIndex, setActiveSimIndex] = useState(0)

  // Simulation auto-advancer
  useEffect(() => {
    let interval
    if (simulating) {
      interval = setInterval(() => {
        setActiveSimIndex(prev => (prev + 1) % AI_STEPS.length)
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [simulating])

  const handleToggleSimulation = () => {
    if (!simulating) {
      setSimulating(true)
      setActiveSimIndex(0)
    } else {
      setSimulating(false)
    }
  }

  return (
    <section className="mc-section" id="manual-vs-ai" aria-labelledby="mc-section-heading">
      {/* Background Decorative Lighting */}
      <div className="mc-bg-glow-left" aria-hidden="true" />
      <div className="mc-bg-glow-right" aria-hidden="true" />

      <div className="container">
        {/* Section Header */}
        <div className="mc-header">
          <div className="mc-tag-badge">
            <span className="mc-tag-manual">Manual Chaos</span>
            <span className="mc-tag-arrow" aria-hidden="true">→</span>
            <span className="mc-tag-ai">AI Clarity</span>
          </div>

          <h2 id="mc-section-heading" className="mc-title">
            Automate your outreach. Reclaim your time.
          </h2>

          <p className="mc-subtitle">
            <strong>One trigger. Everything else handled.</strong> See how a single automated workflow replaces hours of painful manual steps.
          </p>

          {/* Interactive Mode Toggle (Side-by-side vs Single View on smaller screens) */}
          <div className="mc-tab-switcher" role="tablist" aria-label="Comparison View Filter">
            <button 
              type="button"
              role="tab"
              aria-selected={activeTab === 'all'}
              className={`mc-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <span>Side-by-Side Comparison</span>
            </button>
            <button 
              type="button"
              role="tab"
              aria-selected={activeTab === 'manual'}
              className={`mc-tab-btn btn-manual-tab ${activeTab === 'manual' ? 'active' : ''}`}
              onClick={() => setActiveTab('manual')}
            >
              <Clock size={13} />
              <span>Manual Process (10 Steps)</span>
            </button>
            <button 
              type="button"
              role="tab"
              aria-selected={activeTab === 'ai'}
              className={`mc-tab-btn btn-ai-tab ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai')}
            >
              <Zap size={13} />
              <span>AI Clarity (Autopilot)</span>
            </button>
          </div>
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className={`mc-grid ${activeTab !== 'all' ? `focus-${activeTab}` : ''}`}>
          
          {/* ========================================================= */}
          {/* COLUMN 1: MANUAL PROCESS (MANUAL CHAOS) */}
          {/* ========================================================= */}
          {(activeTab === 'all' || activeTab === 'manual') && (
            <div className="mc-card mc-card-manual">
              {/* Card Top Pill & Header */}
              <div className="mc-card-header">
                <div className="mc-badge-row">
                  <span className="mc-badge-pill badge-manual">
                    <span className="mc-pulse-dot dot-red" />
                    <span>Manual Process</span>
                  </span>
                  <span className="mc-time-pill time-manual">
                    <Clock size={13} />
                    <span>Hours</span>
                  </span>
                </div>
                <h3 className="mc-card-heading text-red">Manual Process</h3>
                <p className="mc-card-lead">
                  Repetitive copy-pasting, endless spreadsheet hunting, slow follow-ups, and pipeline drop-off.
                </p>
              </div>

              {/* 10 Step List */}
              <div className="mc-steps-container">
                {MANUAL_STEPS.map((item, idx) => {
                  const IconComponent = item.icon
                  return (
                    <div className="mc-step-item step-manual" key={idx}>
                      <div className="mc-step-left">
                        <div className="mc-step-icon-box icon-red">
                          <XCircle size={15} className="mc-icon-symbol" />
                        </div>
                        {idx < MANUAL_STEPS.length - 1 && <div className="mc-step-line line-red" />}
                      </div>

                      <div className="mc-step-content">
                        <div className="mc-step-meta">
                          <span className="mc-step-number num-red">{item.num}</span>
                          <span className="mc-step-tag tag-red">{item.tag}</span>
                        </div>
                        <h4 className="mc-step-title">{item.num}. {item.title}</h4>
                        <p className="mc-step-desc">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Manual Outcome Footer */}
              <div className="mc-card-footer footer-manual">
                <div className="mc-footer-icon-wrap icon-warn">
                  <AlertCircle size={20} />
                </div>
                <div className="mc-footer-body">
                  <div className="mc-footer-headline text-red">
                    Hours wasted on manual repetitive busywork
                  </div>
                  <div className="mc-footer-sub">
                    High human error risk • Missed follow-ups • Low reply rates • Frustrated team
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* COLUMN 2: AI CLARITY (WORKFLOWMITRA PROCESS) */}
          {/* ========================================================= */}
          {(activeTab === 'all' || activeTab === 'ai') && (
            <div className="mc-card mc-card-ai">
              {/* Card Top Pill & Header */}
              <div className="mc-card-header">
                <div className="mc-badge-row">
                  <span className="mc-badge-pill badge-ai">
                    <span className="mc-pulse-dot dot-green" />
                    <span>AI Clarity Process</span>
                  </span>
                  <span className="mc-time-pill time-ai">
                    <Zap size={13} />
                    <span>Min</span>
                  </span>
                </div>
                <div className="mc-ai-title-wrap">
                  <h3 className="mc-card-heading text-ai">WorkflowMitra Process</h3>
                  <button 
                    type="button" 
                    className={`mc-sim-btn ${simulating ? 'simulating' : ''}`}
                    onClick={handleToggleSimulation}
                    title={simulating ? 'Pause live simulation' : 'Run live simulation'}
                  >
                    {simulating ? <RotateCcw size={12} /> : <Play size={12} />}
                    <span>{simulating ? 'Live Demo Running...' : 'Simulate Workflow'}</span>
                  </button>
                </div>
                <p className="mc-card-lead">
                  One trigger. Everything else handled automatically across all your apps in seconds.
                </p>
              </div>

              {/* 4 Streamlined Power Steps */}
              <div className="mc-steps-container ai-steps-container">
                {AI_STEPS.map((item, idx) => {
                  const IconComponent = item.icon
                  const isHighlighted = simulating && activeSimIndex === idx
                  return (
                    <div 
                      className={`mc-step-item step-ai ${isHighlighted ? 'step-sim-active' : ''}`} 
                      key={idx}
                    >
                      <div className="mc-step-left">
                        <div className={`mc-step-icon-box icon-green ${isHighlighted ? 'glow' : ''}`}>
                          <CheckCircle2 size={16} className="mc-icon-symbol" />
                        </div>
                        {idx < AI_STEPS.length - 1 && <div className="mc-step-line line-green" />}
                      </div>

                      <div className="mc-step-content">
                        <div className="mc-step-meta">
                          <span className="mc-step-number num-green">{item.num}</span>
                          <span className="mc-step-tag tag-green">{item.tag}</span>
                          <span className="mc-step-badge">{item.badge}</span>
                        </div>
                        <h4 className="mc-step-title">{item.num}. {item.title}</h4>
                        <p className="mc-step-desc">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Live Interactive Mock UI Activity Console */}
              <div className="mc-mock-console">
                <div className="mc-console-header">
                  <div className="mc-console-title">
                    <span className="mc-live-dot" />
                    <span>Real-Time Execution Console</span>
                  </div>
                  <span className="mc-console-status">
                    <Sparkles size={12} color="#10b981" />
                    <span>Auto-Pilot 24/7</span>
                  </span>
                </div>

                <div className="mc-console-feed">
                  {LIVE_EVENTS.map((event) => {
                    const EventIcon = event.icon
                    return (
                      <div className="mc-console-item" key={event.id}>
                        <div className="mc-item-icon-box">
                          <EventIcon size={13} />
                        </div>
                        <div className="mc-item-text">
                          <div className="mc-item-headline">
                            <span className="mc-item-title">{event.title}</span>
                            <span className={`mc-item-badge ${event.badgeClass}`}>{event.badge}</span>
                          </div>
                          <div className="mc-item-sub">{event.desc}</div>
                        </div>
                        <span className="mc-item-time">{event.time}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* AI Outcome Footer */}
              <div className="mc-card-footer footer-ai">
                <div className="mc-footer-icon-wrap icon-ai">
                  <Sparkles size={20} color="#10b981" />
                </div>
                <div className="mc-footer-body">
                  <div className="mc-footer-headline text-emerald">
                    Instant &amp; error-free — 24/7 autopilot execution
                  </div>
                  <div className="mc-footer-sub">
                    Zero manual effort • Instant multi-channel outreach • 5× more meetings • 99.8% accuracy
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
