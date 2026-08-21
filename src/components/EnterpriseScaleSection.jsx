import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  Check, 
  Zap, 
  ShieldCheck, 
  Calendar, 
  Users, 
  Activity, 
  ArrowRight,
  Video,
  Clock
} from 'lucide-react'
import { 
  SiGooglesheets, 
  SiGmail, 
  SiHubspot, 
  SiNotion, 
  SiWhatsapp 
} from 'react-icons/si'
import { FaSlack } from 'react-icons/fa'
import './EnterpriseScaleSection.css'

export default function EnterpriseScaleSection() {
  return (
    <section className="enterprise-scale-section" id="enterprise-features">
      <div className="enterprise-container">
        
        {/* Section Header (Aligned Cleanly Without Button) */}
        <div className="enterprise-header-block">
          <motion.h2 
            className="enterprise-heading"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Built for enterprise scale and trust
          </motion.h2>
          <motion.p 
            className="enterprise-subheading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            WorkflowMitra meets the highest security, uptime, and support standards—so your revenue engine never slows down, no matter how fast you grow.
          </motion.p>
        </div>

        {/* 2x2 Feature Cards Grid */}
        <div className="enterprise-cards-grid">
          
          {/* Card 1: Calendar Booking on Autopilot */}
          <motion.div 
            className="enterprise-card"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
          >
            {/* Visual Stage */}
            <div className="card-visual-stage stage-calendar">
              {/* Concentric Glow & Rings */}
              <div className="orbital-ring orbital-ring-lg" />
              <div className="orbital-ring orbital-ring-md" />
              
              {/* Top 5x Badge with Floating Animation */}
              <motion.div 
                className="floating-badge-5x"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span>5x</span>
              </motion.div>

              {/* Floating Layered UI Cards */}
              <div className="calendar-cards-stack">
                {/* Back Card */}
                <div className="cal-card cal-card-back">
                  <div className="cal-card-left">
                    <div className="cal-avatar-group">
                      <div className="cal-avatar avatar-1">A</div>
                    </div>
                    <span className="cal-user-name">Alec Whitten</span>
                  </div>
                  <div className="cal-status-pill">
                    <Check size={11} className="check-icon" />
                    <span>Accepted</span>
                  </div>
                </div>

                {/* Front Main Card */}
                <div className="cal-card cal-card-front">
                  <div className="cal-front-top">
                    <span className="discovery-pill">Discovery Call</span>
                    <span className="duration-tag">30 Min Meeting</span>
                  </div>

                  <div className="cal-front-body">
                    <div className="cal-avatar-duo">
                      <div className="cal-avatar avatar-2">L</div>
                      <div className="cal-avatar avatar-3">R</div>
                    </div>
                    <div className="cal-user-meta">
                      <span className="cal-lead-name">Lyle Kaufman</span>
                      <div className="cal-agenda-tags">
                        <span className="cal-tag">Agenda</span>
                        <span className="cal-tag">KPI</span>
                        <span className="cal-tag">QnA</span>
                      </div>
                    </div>
                    <div className="cal-time-pill">
                      <span className="green-live-dot" />
                      <span>9.30 am</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="card-content-area">
              <h3 className="card-title">Calendar Booking on Autopilot</h3>
              <p className="card-desc">
                Schedules meetings the moment a lead qualifies—often while your team sleeps. Our AI books 5× more demos without human back-and-forth and drops them straight into your calendar.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Scale That Humans Can't Match */}
          <motion.div 
            className="enterprise-card"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
          >
            {/* Visual Stage */}
            <div className="card-visual-stage stage-scale">
              {/* Concentric Background Rings */}
              <div className="scale-bg-ring scale-ring-3" />
              <div className="scale-bg-ring scale-ring-2" />
              <div className="scale-bg-ring scale-ring-1" />

              {/* Central Glowing Disk & Double Border Rings */}
              <div className="scale-glow-disk">
                <div className="scale-outer-ring">
                  <div className="scale-inner-ring">
                    <motion.div 
                      className="scale-center-badge"
                      animate={{ scale: [1, 1.04, 1], boxShadow: ['0 6px 18px rgba(37, 99, 235, 0.4)', '0 8px 24px rgba(37, 99, 235, 0.6)', '0 6px 18px rgba(37, 99, 235, 0.4)'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <span>&gt;1M</span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* SVG Connecting Lines & Animated Blue Beams */}
              <svg className="scale-svg-lines" viewBox="0 0 580 290" fill="none">
                {/* Background Muted Circuit Tracks */}
                <path d="M 260 115 L 160 74 L 114 74" stroke="#d5e2f5" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 320 115 L 466 74" stroke="#d5e2f5" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 248 145 L 84 145" stroke="#d5e2f5" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 332 145 L 496 145" stroke="#d5e2f5" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 260 175 L 160 216 L 114 216" stroke="#d5e2f5" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 320 175 L 466 216" stroke="#d5e2f5" strokeWidth="1.5" strokeLinecap="round" />

                {/* Animated Glowing Electric Blue Pulse Arrows */}
                <motion.path 
                  d="M 260 115 L 160 74 L 114 74" 
                  stroke="#2563eb" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="40 180"
                  animate={{ strokeDashoffset: [220, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path 
                  d="M 320 115 L 466 74" 
                  stroke="#2563eb" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="40 180"
                  animate={{ strokeDashoffset: [220, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path 
                  d="M 248 145 L 84 145" 
                  stroke="#2563eb" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="40 180"
                  animate={{ strokeDashoffset: [220, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path 
                  d="M 332 145 L 496 145" 
                  stroke="#2563eb" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="40 180"
                  animate={{ strokeDashoffset: [220, 0] }}
                  transition={{ duration: 2.0, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path 
                  d="M 260 175 L 160 216 L 114 216" 
                  stroke="#2563eb" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="40 180"
                  animate={{ strokeDashoffset: [220, 0] }}
                  transition={{ duration: 2.3, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path 
                  d="M 320 175 L 466 216" 
                  stroke="#2563eb" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="40 180"
                  animate={{ strokeDashoffset: [220, 0] }}
                  transition={{ duration: 2.1, repeat: Infinity, ease: 'linear' }}
                />
              </svg>

              {/* 6 Avatars positioned exactly at the connector endpoints with smooth floating bobbing */}
              <motion.div 
                className="orbit-avatar avatar-top-left"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
              >
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" alt="" />
              </motion.div>
              <motion.div 
                className="orbit-avatar avatar-top-right"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              >
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" alt="" />
              </motion.div>
              <motion.div 
                className="orbit-avatar avatar-mid-left"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
              >
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80" alt="" />
              </motion.div>
              <motion.div 
                className="orbit-avatar avatar-mid-right"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              >
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80" alt="" />
              </motion.div>
              <motion.div 
                className="orbit-avatar avatar-bot-left"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
              >
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80" alt="" />
              </motion.div>
              <motion.div 
                className="orbit-avatar avatar-bot-right"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
              >
                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80" alt="" />
              </motion.div>
            </div>

            {/* Bottom Content */}
            <div className="card-content-area">
              <h3 className="card-title">Scale That Humans Can’t Match</h3>
              <p className="card-desc">
                WorkflowMitra delivers over one million personalized touches each month, engaging prospects at machine speed. Your team can focus entirely on closing deals while outreach runs on autopilot.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Integrations That Just Work */}
          <motion.div 
            className="enterprise-card"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
          >
            {/* Visual Stage */}
            <div className="card-visual-stage stage-integrations">
              {/* Concentric Atmosphere Rings */}
              <div className="int-ring int-ring-lg" />
              <div className="int-ring int-ring-md" />
              <div className="int-ring int-ring-sm" />

              {/* Central Core Eye Icon */}
              <motion.div 
                className="int-center-core"
                animate={{ scale: [1, 1.06, 1], boxShadow: ['0 0 20px rgba(37,99,235,0.3)', '0 0 35px rgba(37,99,235,0.55)', '0 0 20px rgba(37,99,235,0.3)'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="int-core-inner" />
              </motion.div>

              {/* Rotating Orbit Layer 1 (Outer Ring) */}
              <motion.div 
                className="orbit-track-layer orbit-layer-outer"
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              >
                <div className="app-badge orbit-node node-top">
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} className="node-icon-wrap">
                    <SiHubspot color="#FF7A59" size={15} />
                  </motion.div>
                </div>
                <div className="app-badge orbit-node node-right">
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} className="node-icon-wrap">
                    <SiNotion color="#000000" size={15} />
                  </motion.div>
                </div>
                <div className="app-badge orbit-node node-bottom">
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} className="node-icon-wrap">
                    <Sparkles color="#10A37F" size={15} />
                  </motion.div>
                </div>
                <div className="app-badge orbit-node node-left">
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} className="node-icon-wrap">
                    <SiWhatsapp color="#25D366" size={15} />
                  </motion.div>
                </div>
              </motion.div>

              {/* Rotating Orbit Layer 2 (Inner Ring) */}
              <motion.div 
                className="orbit-track-layer orbit-layer-inner"
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              >
                <div className="app-badge orbit-node node-tr">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} className="node-icon-wrap">
                    <SiGooglesheets color="#0F9D58" size={15} />
                  </motion.div>
                </div>
                <div className="app-badge orbit-node node-bl">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} className="node-icon-wrap">
                    <FaSlack color="#4A154B" size={15} />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Content */}
            <div className="card-content-area">
              <h3 className="card-title">Integrations That Just Work</h3>
              <p className="card-desc">
                Seamlessly connect with the tools your team already relies on, without complicated setup or costly delays. Enjoy smooth workflows and instant compatibility from day one.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Enterprise-Grade Performance */}
          <motion.div 
            className="enterprise-card"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
          >
            {/* Visual Stage */}
            <div className="card-visual-stage stage-performance">
              {/* Circular Gauge / Speedometer */}
              <div className="gauge-wrapper">
                <div className="gauge-track-outer">
                  <div className="gauge-arc-active" />
                  
                  {/* Gauge Ticks */}
                  <div className="gauge-tick tick-1" />
                  <div className="gauge-tick tick-2" />
                  <div className="gauge-tick tick-3" />
                  <div className="gauge-tick tick-4" />
                  <div className="gauge-tick tick-5" />
                  <div className="gauge-tick tick-6" />
                  <div className="gauge-tick tick-7" />
                  
                  {/* Animated Center Needle & Hub */}
                  <motion.div 
                    className="gauge-needle"
                    initial={{ rotate: -40 }}
                    whileInView={{ rotate: 38 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="gauge-hub" />
                </div>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="card-content-area">
              <h3 className="card-title">Enterprise-Grade Performance</h3>
              <p className="card-desc">
                With millisecond-level API calls and elastic scaling, WorkflowMitra easily handles sudden traffic spikes. Your pipeline remains fast, stable, and reliable—even during peak launch days.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
