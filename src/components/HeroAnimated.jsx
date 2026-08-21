import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Sparkles, 
  Search, 
  LayoutGrid, 
  Share2, 
  Folder, 
  Activity, 
  CheckSquare, 
  Key, 
  Database, 
  Webhook, 
  Users, 
  CreditCard, 
  Settings, 
  ChevronDown, 
  ChevronsUpDown, 
  Play, 
  MoreVertical, 
  Clock, 
  Mail,
  PanelLeftClose
} from 'lucide-react'
import { 
  SiGooglesheets, 
  SiGmail, 
  SiHubspot, 
  SiWhatsapp, 
  SiFacebook
} from 'react-icons/si'
import { FaSlack } from 'react-icons/fa'
import './HeroAnimated.css'

const WORKFLOW_ITEMS = [
  {
    id: 1,
    title: 'When a sheet row changes',
    steps: '1 step',
    runs: '0 runs',
    updated: 'updated 3h ago',
    icons: [
      { type: 'sheets', bg: '#E8F5E9', icon: SiGooglesheets, color: '#0F9D58' }
    ],
    hasDashed: true,
    hasClock: true,
    status: null
  },
  {
    id: 2,
    title: 'New order → Email + Sheet',
    steps: '3 steps',
    runs: '0 runs',
    updated: 'updated 7h ago',
    icons: [
      { type: 'spark', bg: '#0F172A', icon: Sparkles, color: '#38BDF8' },
      { type: 'gmail', bg: '#FEECEB', icon: SiGmail, color: '#EA4335' },
      { type: 'sheets', bg: '#E8F5E9', icon: SiGooglesheets, color: '#0F9D58' }
    ],
    hasDashed: true,
    status: null
  },
  {
    id: 3,
    title: 'AI email assistant → draft → approve → send',
    steps: '10 steps',
    runs: '0 runs',
    updated: 'updated 7h ago',
    icons: [
      { type: 'mail', bg: '#0F172A', icon: Mail, color: '#FFFFFF' },
      { type: 'mail2', bg: '#0F172A', icon: Mail, color: '#FFFFFF' },
      { type: 'hubspot', bg: '#FFF2EE', icon: SiHubspot, color: '#FF7A59' },
      { type: 'hubspot2', bg: '#FFF2EE', icon: SiHubspot, color: '#FF7A59' }
    ],
    hasDashed: true,
    status: null
  },
  {
    id: 4,
    title: 'Trigger manually',
    steps: '2 steps',
    runs: '12 runs',
    updated: 'updated 2d ago',
    failed: 'failed · 2d ago',
    icons: [
      { type: 'spark', bg: '#0F172A', icon: Sparkles, color: '#38BDF8' },
      { type: 'whatsapp', bg: '#E9F9F0', icon: SiWhatsapp, color: '#25D366' }
    ],
    hasDashed: true,
    status: 'failed'
  },
  {
    id: 5,
    title: 'Facebook lead → CRM → team alert',
    steps: '7 steps',
    runs: '0 runs',
    updated: 'updated 3d ago',
    icons: [
      { type: 'fb', bg: '#EBF4FF', icon: SiFacebook, color: '#1877F2' },
      { type: 'hubspot', bg: '#FFF2EE', icon: SiHubspot, color: '#FF7A59' },
      { type: 'slack', bg: '#F5EFF6', icon: FaSlack, color: '#4A154B' },
      { type: 'team', bg: '#0F172A', icon: Users, color: '#FFFFFF' }
    ],
    hasDashed: true,
    status: null
  },
  {
    id: 6,
    title: 'Facebook lead → CRM → team alert',
    steps: '7 steps',
    runs: '0 runs',
    updated: 'updated 3d ago',
    icons: [
      { type: 'fb', bg: '#EBF4FF', icon: SiFacebook, color: '#1877F2' },
      { type: 'hubspot', bg: '#FFF2EE', icon: SiHubspot, color: '#FF7A59' },
      { type: 'slack', bg: '#F5EFF6', icon: FaSlack, color: '#4A154B' },
      { type: 'team', bg: '#0F172A', icon: Users, color: '#FFFFFF' }
    ],
    hasDashed: true,
    status: null
  },
  {
    id: 7,
    title: 'Googleshhet(read)-Ai-sendmail-googlesheet(update)-error',
    steps: '5 steps',
    runs: '0 runs',
    updated: 'updated 8d ago',
    icons: [
      { type: 'spark', bg: '#0F172A', icon: Sparkles, color: '#38BDF8' },
      { type: 'sheets', bg: '#E8F5E9', icon: SiGooglesheets, color: '#0F9D58' },
      { type: 'mail', bg: '#0F172A', icon: Mail, color: '#FFFFFF' },
      { type: 'mail2', bg: '#0F172A', icon: Mail, color: '#FFFFFF' }
    ],
    hasDashed: true,
    status: null
  }
]

export default function HeroAnimated() {
  const containerRef = useRef(null)
  const { scrollY } = useScroll()

  // Dreelio-style scroll-driven 3D tilt perspective transform
  const rotateX = useTransform(scrollY, [0, 450], [12, 0])
  const scale = useTransform(scrollY, [0, 450], [0.96, 1])
  const mockupY = useTransform(scrollY, [0, 450], [0, -15])

  return (
    <section className="hero-animated" id="hero-section" ref={containerRef}>
      {/* Atmosphere & Cloud Background */}
      <div className="hero-sky-atmosphere" aria-hidden="true">
        <motion.div 
          className="hero-cloud-layer cloud-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 0.96, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img 
            src="https://framerusercontent.com/images/iR8Ma0AjH7EaIAPThF3xcp9l3bM.png?width=2048&height=1117"
            alt=""
            className="hero-cloud-img"
          />
        </motion.div>
        
        <motion.div 
          className="hero-cloud-layer cloud-right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 0.96, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img 
            src="https://framerusercontent.com/images/qazH0744I2w9AnpfmUJIze7g.png?width=2531&height=1380"
            alt=""
            className="hero-cloud-img"
          />
        </motion.div>
        
        <div className="hero-sky-vignette" />
      </div>

      <div className="hero-content-wrapper">
        {/* ==============================================================
            1. HERO HEADLINE & VALUE PROPOSITION (DREELIO COMPOSITION & ENTRANCE)
            ============================================================== */}
        <div className="hero-header-block">
          <motion.h1 
            className="hero-main-headline"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Run your business on AI workflows like a pro
          </motion.h1>

          <motion.p 
            className="hero-subheadline"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            All-in-one AI automation platform to connect your apps, orchestrate intelligent agents, and eliminate repetitive tasks without the complexity.
          </motion.p>

          <motion.div 
            className="hero-action-group"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="https://app.workflowmitra.com/signup"
              className="hero-cta-primary"
              id="hero-start-free-btn"
            >
              <span>Start Building Free</span>
            </a>

            <Link
              to="/contact"
              className="hero-cta-secondary"
              id="hero-expert-help-btn"
            >
              <span>Get 1-on-1 Help</span>
            </Link>
          </motion.div>
        </div>

        {/* ==============================================================
            2. PRODUCT DASHBOARD MOCKUP (DREELIO 3D PERSPECTIVE ANIMATION)
            ============================================================== */}
        <motion.div 
          className="hero-mockup-wrapper"
          style={{
            perspective: 1200,
            rotateX: rotateX,
            scale: scale,
            y: mockupY,
            transformStyle: 'preserve-3d'
          }}
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="app-workflow-mockup-frame">
            
            {/* Left Dark Sidebar */}
            <aside className="app-mockup-sidebar">
              {/* Brand Header */}
              <div className="sidebar-brand-header">
                <div className="sidebar-brand-left">
                  <div className="sidebar-brand-badge">cm</div>
                  <div className="sidebar-brand-titles">
                    <span className="sidebar-brand-main">ChatMitra</span>
                    <span className="sidebar-brand-sub">Automation</span>
                  </div>
                </div>
                <PanelLeftClose size={14} className="sidebar-collapse-icon" />
              </div>

              {/* Sidebar Menu Navigation */}
              <nav className="sidebar-menu-list">
                <div className="sidebar-menu-item">
                  <LayoutGrid size={15} className="sidebar-menu-icon" />
                  <span>Dashboard</span>
                </div>
                <div className="sidebar-menu-item active">
                  <Share2 size={15} className="sidebar-menu-icon" />
                  <span>Workflows</span>
                </div>
                <div className="sidebar-menu-item">
                  <Folder size={15} className="sidebar-menu-icon" />
                  <span>Templates</span>
                </div>
                <div className="sidebar-menu-item">
                  <Activity size={15} className="sidebar-menu-icon" />
                  <span>Executions</span>
                </div>
                <div className="sidebar-menu-item">
                  <CheckSquare size={15} className="sidebar-menu-icon" />
                  <span>Approvals</span>
                </div>
                <div className="sidebar-menu-item">
                  <Key size={15} className="sidebar-menu-icon" />
                  <span>Credentials</span>
                </div>
                <div className="sidebar-menu-item">
                  <Database size={15} className="sidebar-menu-icon" />
                  <span>Data Stores</span>
                </div>
                <div className="sidebar-menu-item">
                  <Webhook size={15} className="sidebar-menu-icon" />
                  <span>Webhooks</span>
                </div>

                <div className="sidebar-menu-divider" />

                <div className="sidebar-menu-item">
                  <Users size={15} className="sidebar-menu-icon" />
                  <span>Team</span>
                </div>
                <div className="sidebar-menu-item">
                  <CreditCard size={15} className="sidebar-menu-icon" />
                  <span>Billing</span>
                </div>
                <div className="sidebar-menu-item">
                  <Settings size={15} className="sidebar-menu-icon" />
                  <span>Settings</span>
                </div>
              </nav>

              {/* Bottom User Profile */}
              <div className="sidebar-bottom-profile">
                <div className="profile-avatar">R</div>
                <div className="profile-info">
                  <span className="profile-name">Rahul</span>
                  <span className="profile-role">Rahul</span>
                </div>
                <ChevronsUpDown size={13} className="profile-chevron" />
              </div>
            </aside>

            {/* Right Main Workflow Area */}
            <main className="app-mockup-main">
              {/* Counter Text */}
              <div className="main-automations-count">7 automations</div>

              {/* Controls Header: Search & Filter */}
              <div className="main-controls-row">
                <div className="workflow-search-box">
                  <input 
                    type="text" 
                    placeholder="Search workflows..." 
                    readOnly 
                    aria-label="Search workflows"
                  />
                </div>
                <div className="workflow-filter-dropdown">
                  <span>Recently updated</span>
                  <ChevronDown size={14} />
                </div>
              </div>

              {/* Workflow Cards List */}
              <div className="workflow-cards-container">
                {WORKFLOW_ITEMS.map((item, index) => (
                  <motion.div 
                    key={item.id} 
                    className="workflow-card-row"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.35 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -1.5, borderColor: '#cbd5e1', boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)' }}
                  >
                    {/* Left: Icon Badges Cluster */}
                    <div className="workflow-icons-cluster">
                      {item.icons.map((ic, idx) => {
                        const IconComponent = ic.icon
                        return (
                          <div 
                            key={idx} 
                            className="workflow-round-icon"
                            style={{ background: ic.bg }}
                          >
                            <IconComponent size={12} color={ic.color} />
                          </div>
                        )
                      })}
                      {item.hasDashed && (
                        <div className="workflow-dashed-icon" />
                      )}
                    </div>

                    {/* Middle: Title & Meta Info */}
                    <div className="workflow-details-col">
                      <h3 className="workflow-item-title">{item.title}</h3>
                      <div className="workflow-meta-row">
                        <span className="meta-text">{item.steps}</span>
                        <span className="meta-dot">·</span>
                        <span className="meta-text">{item.runs}</span>
                        <span className="meta-dot">·</span>
                        <span className="meta-text">{item.updated}</span>
                        {item.failed && (
                          <>
                            <span className="meta-dot">·</span>
                            <span className="meta-failed-badge">{item.failed}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions & Controls */}
                    <div className="workflow-right-controls">
                      {item.hasClock && (
                        <Clock size={15} className="control-clock-icon" />
                      )}
                      
                      <motion.div 
                        className="control-run-pill"
                        whileHover={{ scale: 1.04, background: '#f8fafc', borderColor: '#94a3b8' }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <Play size={10} fill="currentColor" />
                        <span>Run</span>
                      </motion.div>

                      <div className="control-toggle-switch">
                        <span className="switch-knob" />
                      </div>

                      <MoreVertical size={15} className="control-more-icon" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </main>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
