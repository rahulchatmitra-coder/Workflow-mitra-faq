import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, CheckCircle2 } from 'lucide-react'
import {
  Slack,
  GmailLogo,
  HubSpotLogo,
  Openai,
  WhatsappIcon,
  WorkflowMitraLogo,
  GoogleSheetsLogo,
  Discord,
  Claude,
} from './ui/svgs'
import { SiStripe, SiNotion, SiZapier, SiMake, SiAirtable } from 'react-icons/si'
import { FaSalesforce } from 'react-icons/fa'
import './IntegrationsShowcase.css'

// 10 Primary Orbital Ecosystem App Coins
const ORBITAL_APPS = [
  {
    id: 'openai',
    name: 'OpenAI (ChatGPT)',
    category: 'AI & Models',
    action: 'Generate responses, analyze data & run AI agents',
    color: '#10A37F',
    glowColor: 'rgba(16, 163, 127, 0.45)',
    renderIcon: () => <Openai className="w-8 h-8" />,
    badge: 'AI Model',
    positionClass: 'pos-1', // Top Center
  },
  {
    id: 'hubspot',
    name: 'HubSpot CRM',
    category: 'CRMs & Sales',
    action: 'Sync leads, update deals & trigger sales workflows',
    color: '#FF7A59',
    glowColor: 'rgba(255, 122, 89, 0.45)',
    renderIcon: () => <HubSpotLogo className="w-8 h-8" />,
    badge: 'CRM Sync',
    positionClass: 'pos-2', // Top Right (Outer)
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    action: 'Real-time team alerts, approvals & bot messages',
    color: '#ECB22E',
    glowColor: 'rgba(224, 30, 90, 0.45)',
    renderIcon: () => <Slack className="w-8 h-8" />,
    badge: 'Team Chat',
    positionClass: 'pos-3', // Far Right
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    category: 'Communication',
    action: 'Instant customer messaging, catalogs & 24/7 auto-replies',
    color: '#25D366',
    glowColor: 'rgba(37, 211, 102, 0.45)',
    renderIcon: () => <WhatsappIcon className="w-8 h-8" />,
    badge: 'Instant Chat',
    positionClass: 'pos-4', // Bottom Right (Outer)
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'CRMs & Sales',
    action: 'Bidirectional sync with Enterprise accounts & pipelines',
    color: '#00A1E0',
    glowColor: 'rgba(0, 161, 224, 0.45)',
    renderIcon: () => <FaSalesforce size={32} color="#00A1E0" />,
    badge: 'Enterprise CRM',
    positionClass: 'pos-5', // Bottom Right (Inner)
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Payments',
    action: 'Automate invoices, charge webhooks & customer billing',
    color: '#635BFF',
    glowColor: 'rgba(99, 91, 255, 0.45)',
    renderIcon: () => <SiStripe size={32} color="#635BFF" />,
    badge: 'Payments',
    positionClass: 'pos-6', // Bottom Left (Outer)
  },
  {
    id: 'gmail',
    name: 'Gmail',
    category: 'Communication',
    action: 'Personalized cold email sequences & inbound email routing',
    color: '#EA4335',
    glowColor: 'rgba(234, 67, 53, 0.45)',
    renderIcon: () => <GmailLogo className="w-8 h-8" />,
    badge: 'Email Outbox',
    positionClass: 'pos-7', // Far Left
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Databases',
    action: 'Auto-populate databases, tasks & internal documentation',
    color: '#000000',
    glowColor: 'rgba(15, 23, 42, 0.45)',
    renderIcon: () => <SiNotion size={32} color="#000000" />,
    badge: 'Knowledge Base',
    positionClass: 'pos-8', // Top Left (Outer)
  },
  {
    id: 'claude',
    name: 'Anthropic Claude',
    category: 'AI & Models',
    action: 'Deep document reasoning, coding & enterprise research',
    color: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.45)',
    renderIcon: () => <Claude className="w-8 h-8" />,
    badge: 'Reasoning AI',
    positionClass: 'pos-9', // Top Left (Inner)
  },
  {
    id: 'googlesheets',
    name: 'Google Sheets',
    category: 'Databases',
    action: 'Append rows, sync records & export live business data',
    color: '#0F9D58',
    glowColor: 'rgba(15, 157, 88, 0.45)',
    renderIcon: () => <GoogleSheetsLogo className="w-8 h-8" />,
    badge: 'Live Sheets',
    positionClass: 'pos-10', // Bottom Center
  },
]

const FILTER_CATEGORIES = [
  'All 200+ Apps',
  'AI & Models',
  'CRMs & Sales',
  'Communication',
  'Payments',
  'Databases',
]

export default function IntegrationsShowcase() {
  const sectionRef = useRef(null)
  const [activeApp, setActiveApp] = useState(ORBITAL_APPS[0])
  const [activeCategory, setActiveCategory] = useState('All 200+ Apps')
  const [isHovered, setIsHovered] = useState(false)

  // Scroll Progress Bindings for Parallax & Orbital Twist
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 25, restDelta: 0.001 })
  const stageScale = useTransform(smoothScroll, [0, 0.35, 0.65, 1], [0.88, 1, 1, 0.94])
  const trackOuterRotate = useTransform(smoothScroll, [0, 1], [0, 120])
  const trackInnerRotate = useTransform(smoothScroll, [0, 1], [0, -180])
  const headerY = useTransform(smoothScroll, [0, 0.4], [40, 0])
  const headerOpacity = useTransform(smoothScroll, [0, 0.3], [0, 1])

  // Auto-cycle active app when user is not manually hovering
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setActiveApp(prev => {
        const list = activeCategory === 'All 200+ Apps' 
          ? ORBITAL_APPS 
          : ORBITAL_APPS.filter(a => a.category === activeCategory)
        if (!list.length) return ORBITAL_APPS[0]
        const currentIndex = list.findIndex(a => a.id === prev.id)
        const nextIndex = (currentIndex + 1) % list.length
        return list[nextIndex]
      })
    }, 3500)
    return () => clearInterval(interval)
  }, [isHovered, activeCategory])

  return (
    <section 
      ref={sectionRef} 
      className="tg-integrations-section" 
      id="integrations" 
      aria-labelledby="tg-int-heading"
    >
      {/* Ambient background glows */}
      <div className="tg-glow-top" aria-hidden="true" />
      <div className="tg-glow-bottom" aria-hidden="true" />

      <div className="container">
        
        {/* Section Header with Scroll Fade & Upward Motion */}
        <motion.div 
          className="tg-int-header"
          style={{ y: headerY, opacity: headerOpacity }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 id="tg-int-heading" className="tg-int-title">
            Effortless Tool Integrations
          </h2>

          <p className="tg-int-subtitle">
            Add or remove integrations as your needs grow, without slowing down performance.
          </p>
        </motion.div>

        {/* Category Filter Pills (Staggered Scroll Entrance) */}
        <motion.div 
          className="tg-category-pills" 
          role="tablist" 
          aria-label="Integration Categories"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {FILTER_CATEGORIES.map((cat, idx) => {
            const isSelected = activeCategory === cat
            return (
              <motion.button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`tg-cat-pill ${isSelected ? 'active' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + idx * 0.04 }}
                onClick={() => {
                  setActiveCategory(cat)
                  if (cat !== 'All 200+ Apps') {
                    const firstMatch = ORBITAL_APPS.find(a => a.category === cat)
                    if (firstMatch) setActiveApp(firstMatch)
                  }
                }}
              >
                {cat}
              </motion.button>
            )
          })}
        </motion.div>

        {/* TaskGo-Style Circular Solar Orbital Canvas with Framer Motion Scroll Scale & Parallax */}
        <motion.div 
          className="tg-orbital-stage"
          style={{ scale: stageScale }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Concentric Rotating Orbit Rings with Scroll-Coupled Rotation */}
          <motion.div 
            className="tg-orbit-track track-outer" 
            style={{ rotate: trackOuterRotate }} 
            aria-hidden="true" 
          />
          <div className="tg-orbit-track track-mid" aria-hidden="true" />
          <motion.div 
            className="tg-orbit-track track-inner" 
            style={{ rotate: trackInnerRotate }} 
            aria-hidden="true" 
          />

          {/* Orbiting Laser Pulse Energy Particles */}
          <div className="tg-orbit-particle particle-1" aria-hidden="true" />
          <div className="tg-orbit-particle particle-2" aria-hidden="true" />

          {/* Central Hub Core with Pop Spring Entrance */}
          <motion.div 
            className="tg-center-hub"
            initial={{ scale: 0.4, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          >
            <div className="tg-hub-pulse-ring" aria-hidden="true" />
            <div className="tg-hub-pulse-ring-2" aria-hidden="true" />
            
            <div className="tg-hub-core">
              <div className="tg-hub-logo-wrap">
                <WorkflowMitraLogo className="w-10 h-10" />
              </div>
              <span className="tg-hub-label">WorkflowMitra</span>
              <span className="tg-hub-status">
                <span className="tg-status-dot" />
                Live Hub
              </span>
            </div>
          </motion.div>

          {/* Pure 3D Circular App Coins with Staggered Outward Expansion */}
          <div className="tg-coins-container">
            {ORBITAL_APPS.map((app, index) => {
              const isActive = activeApp.id === app.id
              const isCategoryMatch = activeCategory === 'All 200+ Apps' || app.category === activeCategory

              return (
                <motion.div
                  key={app.id}
                  className={`tg-coin-wrapper ${app.positionClass} ${isActive ? 'is-active' : ''} ${!isCategoryMatch ? 'is-dimmed' : ''}`}
                  style={{
                    '--glow-color': app.glowColor,
                    '--app-color': app.color,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.15 + index * 0.05, 
                    type: 'spring', 
                    stiffness: 140, 
                    damping: 14 
                  }}
                  whileHover={{ scale: 1.18, transition: { duration: 0.2 } }}
                  onClick={() => setActiveApp(app)}
                  onMouseEnter={() => setActiveApp(app)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${app.name} integration`}
                >
                  {/* Circular 3D Coin Badge */}
                  <div className="tg-coin-circle">
                    <div className="tg-coin-icon">
                      {app.renderIcon()}
                    </div>
                  </div>

                  {/* Circular Hover/Active Aura Glow */}
                  <div className="tg-coin-glow" aria-hidden="true" />

                  {/* Floating Micro-Badge Tooltip */}
                  <div className="tg-coin-mini-tag">
                    <span>{app.name}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </motion.div>

        {/* Static Dedicated App Capability Dock (Below Orbital Wheel - Non-Overlapping!) */}
        <div className="tg-banner-dock-wrapper">
          {activeApp && (
            <motion.div 
              key={activeApp.id}
              className="tg-active-app-banner"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="tg-banner-icon-box" style={{ background: `${activeApp.color}12`, borderColor: `${activeApp.color}35` }}>
                {activeApp.renderIcon()}
              </div>
              <div className="tg-banner-info">
                <div className="tg-banner-top">
                  <h4 className="tg-banner-title">{activeApp.name}</h4>
                  <span className="tg-banner-tag" style={{ color: activeApp.color, borderColor: `${activeApp.color}40`, background: `${activeApp.color}10` }}>
                    {activeApp.badge}
                  </span>
                </div>
                <p className="tg-banner-desc">{activeApp.action}</p>
              </div>
              <div className="tg-banner-action">
                <span className="tg-banner-status-pill">
                  <Zap size={13} />
                  <span>Instant Hook</span>
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom CTA to View All 200+ Integrations */}
        <motion.div 
          className="tg-int-footer-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/integrations" className="tg-browse-btn">
              <span>Explore 200+ Pre-Built Integrations</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
