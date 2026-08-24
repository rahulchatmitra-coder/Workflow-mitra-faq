import React from 'react'
import { motion } from 'framer-motion'
import { Star, CheckCircle2 } from 'lucide-react'
import './TestimonialSlider.css'

const ROW_ONE_STORIES = [
  {
    name: 'Melissa Chen',
    role: 'Operations Director',
    company: 'ScaleFlow',
    metric: 'Saved 15 hrs / wk',
    metricType: 'emerald',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: 'WorkflowMitra completely transformed how we run operations. What used to take our team 15 hours every week now executes in under 2 seconds automatically.',
  },
  {
    name: 'Michael Lim',
    role: 'Founder & CEO',
    company: 'Nexus Commerce',
    metric: '+34% Cart Recovery',
    metricType: 'blue',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: 'Connecting Shopify, WhatsApp, and our custom CRM took less than 20 minutes with zero code. Our abandoned cart recovery rate jumped by 34% in month one.',
  },
  {
    name: 'Rina Sasmita',
    role: 'Head of Growth',
    company: 'CloudMetric',
    metric: '100% Lead Qualification',
    metricType: 'purple',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    quote: 'The native Claude 3.5 nodes analyze inbound leads, enrich CRM data, and auto-route them to the right sales reps before they ever wait.',
  },
  {
    name: 'Andi Wijaya',
    role: 'VP of Engineering',
    company: 'FinStack',
    metric: '99.99% Reliability',
    metricType: 'emerald',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    quote: 'Webhook triggers with 99.99% uptime SLA gave us the exact enterprise reliability we needed without spending thousands on legacy platforms.',
  },
  {
    name: 'Sarah Irawan',
    role: 'Lead Product Designer',
    company: 'Creato Studio',
    metric: '5-Min Onboarding',
    metricType: 'amber',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    quote: 'The visual node editor is the cleanest interface we have used. Even our non-technical marketing managers build multi-step flows effortlessly.',
  },
]

const ROW_TWO_STORIES = [
  {
    name: 'Jakob Fischer',
    role: 'Head of Product',
    company: 'AutoSync',
    metric: 'Zero Manual Work',
    metricType: 'blue',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    quote: 'Managing multi-branch conditional routing with human-in-the-loop approvals in Slack transformed our customer onboarding process completely.',
  },
  {
    name: 'Emilia Novak',
    role: 'RevOps Lead',
    company: 'HyperLeads',
    metric: '60% Cost Reduction',
    metricType: 'emerald',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    quote: 'We replaced 4 different brittle automation tools with WorkflowMitra. Our execution speed increased 10x while cutting our monthly SaaS bill by 60%.',
  },
  {
    name: 'Mateusz Kowalski',
    role: 'Full-Stack Architect',
    company: 'DataForge',
    metric: '500k Monthly Events',
    metricType: 'purple',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    quote: 'The direct database connectors and webhook relays are lightning fast. Processing over 500k monthly events without a single dropped packet.',
  },
  {
    name: 'Elina Lindström',
    role: 'Customer Success Lead',
    company: 'ZenDeskify',
    metric: '8 Min Resolution Time',
    metricType: 'blue',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    quote: 'Auto-routing support tickets based on GPT-4o sentiment classification reduced our first-response resolution time from 4 hours down to 8 minutes.',
  },
  {
    name: 'Theo Moreau',
    role: 'CEO & Founder',
    company: 'GrowthPulse',
    metric: '10x Faster Scaling',
    metricType: 'emerald',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    quote: 'WorkflowMitra runs our entire backend on autopilot. It is honestly the highest-ROI operations investment we have made this year.',
  },
]

export default function TestimonialSlider() {
  return (
    <section className="vintar-testimonial-section" id="testimonials" aria-label="Customer Success Stories">
      <div className="vintar-container">
        
        {/* Section Header */}
        <motion.div 
          className="vintar-testimonial-header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="vintar-eyebrow-badge">
            <span className="vintar-eyebrow-dot" />
            <span>Customer Success Stories</span>
          </div>
          <h2 className="vintar-testimonial-title">
            Loved by founders, trusted by <span className="vintar-highlight-word">modern teams</span>
          </h2>
          <p className="vintar-testimonial-subtitle">
            Discover how fast-growing businesses automate repetitive work, eliminate bottlenecks, and scale operations with WorkflowMitra.
          </p>
        </motion.div>

      </div>

      {/* Two-Row Infinite Auto-Scrolling Marquee Track */}
      <motion.div 
        className="vintar-testimonial-marquee-wrapper"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="vintar-marquee-fade-left" aria-hidden="true" />
        <div className="vintar-marquee-fade-right" aria-hidden="true" />
        
        {/* Row 1: Moves Left */}
        <div className="vintar-marquee-row left">
          <div className="vintar-marquee-track">
            {[...ROW_ONE_STORIES, ...ROW_ONE_STORIES, ...ROW_ONE_STORIES].map((item, idx) => (
              <div key={`r1-${idx}`} className="vintar-testimonial-card">
                <div className="vintar-card-top">
                  <div className="vintar-stars" aria-label="5 stars">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} size={14} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <span className={`vintar-metric-pill pill-${item.metricType}`}>
                    {item.metric}
                  </span>
                </div>

                <p className="vintar-tester-quote">"{item.quote}"</p>

                <div className="vintar-card-bottom">
                  <div className="vintar-tester-image">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      width="48"
                      height="48"
                      loading="lazy"
                      decoding="async"
                      className="vintar-avatar-img"
                    />
                  </div>
                  <div className="vintar-tester-meta">
                    <div className="vintar-tester-name-row">
                      <h3 className="vintar-tester-name">{item.name}</h3>
                      <CheckCircle2 size={13} className="vintar-verified-icon" />
                    </div>
                    <div className="vintar-tester-subtitle">{item.role} · <span className="vintar-company">{item.company}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moves Right (Reverse) */}
        <div className="vintar-marquee-row right">
          <div className="vintar-marquee-track reverse">
            {[...ROW_TWO_STORIES, ...ROW_TWO_STORIES, ...ROW_TWO_STORIES].map((item, idx) => (
              <div key={`r2-${idx}`} className="vintar-testimonial-card">
                <div className="vintar-card-top">
                  <div className="vintar-stars" aria-label="5 stars">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} size={14} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <span className={`vintar-metric-pill pill-${item.metricType}`}>
                    {item.metric}
                  </span>
                </div>

                <p className="vintar-tester-quote">"{item.quote}"</p>

                <div className="vintar-card-bottom">
                  <div className="vintar-tester-image">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      width="48"
                      height="48"
                      loading="lazy"
                      decoding="async"
                      className="vintar-avatar-img"
                    />
                  </div>
                  <div className="vintar-tester-meta">
                    <div className="vintar-tester-name-row">
                      <h3 className="vintar-tester-name">{item.name}</h3>
                      <CheckCircle2 size={13} className="vintar-verified-icon" />
                    </div>
                    <div className="vintar-tester-subtitle">{item.role} · <span className="vintar-company">{item.company}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  )
}
