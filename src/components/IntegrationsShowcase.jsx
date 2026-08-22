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
} from './ui/svgs'
import { SiNotion } from 'react-icons/si'
import './IntegrationsShowcase.css'

// Official Claude AI Brand Icon Component
const ClaudeIcon = ({ className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"
      fill="#D97757"
      fillRule="nonzero"
    />
  </svg>
)

// 8 Primary Orbital Ecosystem App Coins (Symmetrical 8-Point Orbit)
const ORBITAL_APPS = [
  {
    id: 'openai',
    name: 'OpenAI (ChatGPT)',
    category: 'AI & Models',
    action: 'Generate responses, analyze data & run AI agents',
    color: '#10A37F',
    renderIcon: () => <Openai className="w-7 h-7" />,
    badge: 'AI Model',
    positionClass: 'pos-1', // Top (0°)
  },
  {
    id: 'hubspot',
    name: 'HubSpot CRM',
    category: 'CRMs & Sales',
    action: 'Sync leads, update deals & trigger sales workflows',
    color: '#FF7A59',
    renderIcon: () => <HubSpotLogo className="w-7 h-7" />,
    badge: 'CRM Sync',
    positionClass: 'pos-2', // Top Right (45°)
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    action: 'Real-time team alerts, approvals & bot messages',
    color: '#ECB22E',
    renderIcon: () => <Slack className="w-7 h-7" />,
    badge: 'Team Chat',
    positionClass: 'pos-3', // Right (90°)
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    category: 'Communication',
    action: 'Instant customer messaging, catalogs & 24/7 auto-replies',
    color: '#25D366',
    renderIcon: () => <WhatsappIcon className="w-7 h-7" />,
    badge: 'Instant Chat',
    positionClass: 'pos-4', // Bottom Right (135°)
  },
  {
    id: 'googlesheets',
    name: 'Google Sheets',
    category: 'Databases',
    action: 'Append rows, sync records & export live business data',
    color: '#0F9D58',
    renderIcon: () => <GoogleSheetsLogo className="w-7 h-7" />,
    badge: 'Live Sheets',
    positionClass: 'pos-5', // Bottom (180°)
  },
  {
    id: 'gmail',
    name: 'Gmail',
    category: 'Communication',
    action: 'Personalized cold email sequences & inbound email routing',
    color: '#EA4335',
    renderIcon: () => <GmailLogo className="w-7 h-7" />,
    badge: 'Email Outbox',
    positionClass: 'pos-6', // Bottom Left (225°)
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Databases',
    action: 'Auto-populate databases, tasks & internal documentation',
    color: '#000000',
    renderIcon: () => <SiNotion size={28} color="#000000" />,
    badge: 'Knowledge Base',
    positionClass: 'pos-7', // Left (270°)
  },
  {
    id: 'claude',
    name: 'Anthropic Claude',
    category: 'AI & Models',
    action: 'Deep document reasoning, coding & enterprise research',
    color: '#D97757',
    renderIcon: () => <ClaudeIcon className="w-7 h-7" />,
    badge: 'Reasoning AI',
    positionClass: 'pos-8', // Top Left (315°)
  },
]

export default function IntegrationsShowcase() {
  const sectionRef = useRef(null)
  const [activeApp, setActiveApp] = useState(ORBITAL_APPS[0])
  const [isHovered, setIsHovered] = useState(false)

  // Scroll Progress Bindings for Parallax & Orbital Twist
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 25, restDelta: 0.001 })
  const stageScale = useTransform(smoothScroll, [0, 0.35, 0.65, 1], [0.94, 1, 1, 0.96])
  const trackOuterRotate = useTransform(smoothScroll, [0, 1], [0, 90])
  const trackInnerRotate = useTransform(smoothScroll, [0, 1], [0, -120])
  const headerY = useTransform(smoothScroll, [0, 0.4], [30, 0])
  const headerOpacity = useTransform(smoothScroll, [0, 0.3], [0, 1])

  // Auto-cycle active app when user is not manually hovering
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setActiveApp(prev => {
        const currentIndex = ORBITAL_APPS.findIndex(a => a.id === prev.id)
        const nextIndex = (currentIndex + 1) % ORBITAL_APPS.length
        return ORBITAL_APPS[nextIndex]
      })
    }, 3500)
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <section 
      ref={sectionRef} 
      className="tg-integrations-section" 
      id="integrations" 
      aria-labelledby="tg-int-heading"
    >
      <div className="container">
        
        {/* Section Header */}
        <motion.div 
          className="tg-int-header"
          style={{ y: headerY, opacity: headerOpacity }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 id="tg-int-heading" className="tg-int-title">
            Effortless Tool Integrations
          </h2>

          <p className="tg-int-subtitle">
            Add or remove integrations as your needs grow, without slowing down performance.
          </p>
        </motion.div>

        {/* TaskGo-Style Circular Solar Orbital Canvas */}
        <motion.div 
          className="tg-orbital-stage"
          style={{ scale: stageScale }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Concentric Rotating Orbit Rings */}
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

          {/* Central Hub Core */}
          <motion.div 
            className="tg-center-hub"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
          >
            <div className="tg-hub-pulse-ring" aria-hidden="true" />
            
            <div className="tg-hub-core">
              <div className="tg-hub-logo-wrap">
                <WorkflowMitraLogo className="w-8 h-8" />
              </div>
              <span className="tg-hub-label">WorkflowMitra</span>
              <span className="tg-hub-status">
                <span className="tg-status-dot" />
                Live Hub
              </span>
            </div>
          </motion.div>

          {/* Pure 3D Circular App Coins */}
          <div className="tg-coins-container">
            {ORBITAL_APPS.map((app, index) => {
              const isActive = activeApp.id === app.id

              return (
                <motion.div
                  key={app.id}
                  className={`tg-coin-wrapper ${app.positionClass} ${isActive ? 'is-active' : ''}`}
                  style={{
                    '--app-color': app.color,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1 + index * 0.04, 
                    type: 'spring', 
                    stiffness: 150, 
                    damping: 15 
                  }}
                  whileHover={{ scale: 1.12, transition: { duration: 0.2 } }}
                  onClick={() => setActiveApp(app)}
                  onMouseEnter={() => setActiveApp(app)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${app.name} integration`}
                >
                  {/* Circular Coin Badge */}
                  <div className="tg-coin-circle">
                    <div className="tg-coin-icon">
                      {app.renderIcon()}
                    </div>
                  </div>

                  {/* Micro-Badge Tooltip */}
                  <div className="tg-coin-mini-tag">
                    <span>{app.name}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </motion.div>

        {/* Static Dedicated App Capability Dock */}
        <div className="tg-banner-dock-wrapper">
          {activeApp && (
            <motion.div 
              key={activeApp.id}
              className="tg-active-app-banner"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="tg-banner-icon-box" style={{ background: `${activeApp.color}10`, borderColor: `${activeApp.color}30` }}>
                {activeApp.renderIcon()}
              </div>
              <div className="tg-banner-info">
                <div className="tg-banner-top">
                  <h4 className="tg-banner-title">{activeApp.name}</h4>
                  <span className="tg-banner-tag" style={{ color: activeApp.color, borderColor: `${activeApp.color}35`, background: `${activeApp.color}0c` }}>
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
          <Link to="/integrations" className="tg-browse-btn">
            <span>Explore 200+ Pre-Built Integrations</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
