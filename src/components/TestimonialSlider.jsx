import React from 'react'
import './TestimonialSlider.css'

const ROW_ONE_STORIES = [
  {
    name: 'Melissa Chen',
    role: 'Operations Director',
    company: 'ScaleFlow',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: '"WorkflowMitra completely transformed how we run operations. What used to take our team 15 hours every week now executes in under 2 seconds automatically."',
  },
  {
    name: 'Michael Lim',
    role: 'Founder & CEO',
    company: 'Nexus Commerce',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: '"Connecting Shopify, WhatsApp, and our custom CRM took less than 20 minutes with zero code. Our abandoned cart recovery rate jumped by 34%."',
  },
  {
    name: 'Rina Sasmita',
    role: 'Head of Growth',
    company: 'CloudMetric',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    quote: '"The AI logic nodes with Claude 3.5 analyze inbound leads and auto-qualify them before they ever reach our sales pipeline. Highly recommended!"',
  },
  {
    name: 'Andi Wijaya',
    role: 'VP of Engineering',
    company: 'FinStack',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    quote: '"Self-hosted webhook triggers with 99.99% uptime SLA gave us the exact enterprise reliability we needed without spending thousands on legacy platforms."',
  },
  {
    name: 'Sarah Irawan',
    role: 'Lead Product Designer',
    company: 'Creato Studio',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    quote: '"The visual node editor is the cleanest interface I have used. Even our non-technical marketing managers build multi-step flows effortlessly."',
  },
]

const ROW_TWO_STORIES = [
  {
    name: 'Jakob Fischer',
    role: 'Head of Product',
    company: 'AutoSync',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    quote: '"Managing multi-branch conditional routing with human-in-the-loop approvals in Slack transformed our customer onboarding process completely."',
  },
  {
    name: 'Emilia Novak',
    role: 'RevOps Lead',
    company: 'HyperLeads',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    quote: '"We replaced 4 different brittle automation tools with WorkflowMitra. Our execution speed increased 10x while cutting SaaS bills by 60%."',
  },
  {
    name: 'Mateusz Kowalski',
    role: 'Full-Stack Architect',
    company: 'DataForge',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    quote: '"The direct database connectors and webhook relays are lightning fast. Processing 500k monthly events without a single dropped packet."',
  },
  {
    name: 'Elina Lindström',
    role: 'Customer Success Lead',
    company: 'ZenDeskify',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    quote: '"Auto-routing support tickets based on GPT-4o sentiment classification reduced our first-response resolution time from 4 hours to 8 minutes."',
  },
  {
    name: 'Theo Moreau',
    role: 'CEO',
    company: 'GrowthPulse',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    quote: '"WorkflowMitra runs our entire backend on autopilot. It is honestly the most impactful operations investment we have made this year."',
  },
]

export default function TestimonialSlider() {
  return (
    <section className="vintar-testimonial-section" id="testimonials" aria-label="Customer Success Stories">
      <div className="vintar-container">
        
        {/* Section Header */}
        <div className="vintar-testimonial-header">
          <h2 className="vintar-testimonial-title">
            Customer Success <span className="vintar-highlight-word">Stories</span>
          </h2>
          <p className="vintar-testimonial-subtitle">
            Discover how fast-growing teams scale, automate, and save thousands of hours with WorkflowMitra.
          </p>
        </div>

      </div>

      {/* Two-Row Infinite Auto-Scrolling Marquee Track */}
      <div className="vintar-testimonial-marquee-wrapper">
        
        {/* Row 1: Moves Left */}
        <div className="vintar-marquee-row left">
          <div className="vintar-marquee-track">
            {[...ROW_ONE_STORIES, ...ROW_ONE_STORIES, ...ROW_ONE_STORIES].map((item, idx) => (
              <div key={`r1-${idx}`} className="vintar-testimonial-card">
                <div className="vintar-tester-info">
                  <div className="vintar-tester-image">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      loading="lazy"
                      className="vintar-avatar-img"
                    />
                  </div>
                  <h3 className="vintar-tester-name">{item.name}</h3>
                  <div className="vintar-tester-subtitle">{item.role} • {item.company}</div>
                </div>
                <p className="vintar-tester-quote">{item.quote}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moves Right (Reverse) */}
        <div className="vintar-marquee-row right">
          <div className="vintar-marquee-track reverse">
            {[...ROW_TWO_STORIES, ...ROW_TWO_STORIES, ...ROW_TWO_STORIES].map((item, idx) => (
              <div key={`r2-${idx}`} className="vintar-testimonial-card">
                <div className="vintar-tester-info">
                  <div className="vintar-tester-image">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      loading="lazy"
                      className="vintar-avatar-img"
                    />
                  </div>
                  <h3 className="vintar-tester-name">{item.name}</h3>
                  <div className="vintar-tester-subtitle">{item.role} • {item.company}</div>
                </div>
                <p className="vintar-tester-quote">{item.quote}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
