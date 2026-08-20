import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'
import './TestimonialSlider.css'

const TESTIMONIALS = [
  {
    id: 1,
    roleTitle: 'For Founders & Ops',
    headline: 'Easy & No-Code',
    badge: 'No-Code Canvas',
    quote: 'Visual drag-and-drop workflow building without writing a single line of code or script.',
    benefit: 'Live in under 5 mins',
    category: 'Visual Ops',
    name: 'Mr. Venu Madhav',
    designation: 'Academician & Ops Mentor',
    company: 'ScaleLoop Ecosystem',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    initials: 'VM',
    linkedinUrl: 'https://www.linkedin.com',
  },
  {
    id: 2,
    roleTitle: 'For CFOs & Scaling Teams',
    headline: 'Transparent & Affordable',
    badge: 'TCS / Miraiminds',
    quote: '10,000 tasks for ₹999/mo with zero per-step penalties. Save up to 80% vs legacy tools.',
    benefit: 'Save up to 80% costs',
    category: 'FinOps',
    name: 'Mr. Sneh Mehta',
    designation: 'Ex. ML Engineer @ TCS',
    company: 'Chief AI Officer @ Miraiminds',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    initials: 'SM',
    linkedinUrl: 'https://www.linkedin.com',
  },
  {
    id: 3,
    roleTitle: 'For Growing Businesses',
    headline: '1-on-1 Expert Help',
    badge: 'Scarfall 2.0',
    quote: 'Real automation engineers audit, map, build, and troubleshoot custom workflows with you.',
    benefit: 'Zero guesswork',
    category: 'Workflow Help',
    name: 'Mr. Jemish Lakhani',
    designation: 'Founder & CEO',
    company: 'Scarfall 2.0 / D2C',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    initials: 'JL',
    linkedinUrl: 'https://www.linkedin.com',
  },
  {
    id: 4,
    roleTitle: 'For High-Velocity Teams',
    headline: 'Autonomous AI Agents',
    badge: 'Zepto Security',
    quote: 'Native Claude 3.5 & GPT-4o reasoning, condition branches, and automatic error retries.',
    benefit: 'AI reasoning built-in',
    category: 'AI / ML',
    name: 'Mr. Akash Chaurasia',
    designation: 'Lead Cloud Security Engineer',
    company: 'Enterprise Security @ Zepto',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    initials: 'AC',
    linkedinUrl: 'https://www.linkedin.com',
  },
  {
    id: 5,
    roleTitle: 'For Tech & Architects',
    headline: 'Universal App Reach',
    badge: '37+ SaaS Connectors',
    quote: 'Connect 37+ SaaS tools or integrate any custom REST API via Webhooks and OAuth.',
    benefit: '37+ Apps & Webhooks',
    category: 'Integrations',
    name: 'Ms. Ananya Sharma',
    designation: 'VP of Platform Engineering',
    company: 'CloudBridge Systems',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    initials: 'AS',
    linkedinUrl: 'https://www.linkedin.com',
  },
  {
    id: 6,
    roleTitle: 'For E-Commerce & Retail',
    headline: 'Multi-Channel Sync',
    badge: 'Shopify + Zoho',
    quote: 'Automated WhatsApp alerts, GST invoices, and order status updates with zero human errors.',
    benefit: 'Zero-Touch Ops',
    category: 'E-Commerce',
    name: 'Mr. Rohan Gupta',
    designation: 'Head of Operations',
    company: 'UrbanCart Logistics',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    initials: 'RG',
    linkedinUrl: 'https://www.linkedin.com',
  },
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [visibleCards, setVisibleCards] = useState(4)
  const autoPlayTimerRef = useRef(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Calculate visible cards count responsively
  const updateVisibleCards = useCallback(() => {
    if (typeof window === 'undefined') return
    const width = window.innerWidth
    if (width < 640) {
      setVisibleCards(1)
    } else if (width < 1024) {
      setVisibleCards(2)
    } else if (width < 1280) {
      setVisibleCards(3)
    } else {
      setVisibleCards(4)
    }
  }, [])

  useEffect(() => {
    updateVisibleCards()
    window.addEventListener('resize', updateVisibleCards)
    return () => window.removeEventListener('resize', updateVisibleCards)
  }, [updateVisibleCards])

  const maxIndex = Math.max(0, TESTIMONIALS.length - visibleCards)

  // Move to next slide
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  // Move to previous slide
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  // Auto-slide effect
  useEffect(() => {
    if (isHovered) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current)
      return
    }

    autoPlayTimerRef.current = setInterval(() => {
      handleNext()
    }, 3200)

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current)
    }
  }, [isHovered, handleNext, currentIndex])

  // Mobile Touch Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX
    setIsHovered(true)
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    setIsHovered(false)
    const diff = touchStartX.current - touchEndX.current
    if (diff > 45) {
      handleNext()
    } else if (diff < -45) {
      handlePrev()
    }
  }

  return (
    <section 
      className="wm-testi-section" 
      id="testimonials"
      aria-label="Why Teams Choose WorkflowMitra"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container">
        
        {/* Section Header */}
        <div className="wm-testi-header">
          <div className="wm-testi-header-left">
            <h2 className="wm-testi-title">
              Why teams choose <span className="wm-title-highlight">WorkflowMitra</span>
            </h2>
            <p className="wm-testi-subtitle">
              The modern automation platform engineered to scale your operations without friction or enterprise pricing.
            </p>
          </div>

          {/* Yellow/Amber Navigation Arrows */}
          <div className="wm-testi-controls">
            <button
              onClick={() => {
                handlePrev()
                setIsHovered(true)
                setTimeout(() => setIsHovered(false), 3500)
              }}
              className="wm-testi-arrow-btn"
              aria-label="Previous slide"
              title="Previous"
            >
              <ArrowLeft size={20} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => {
                handleNext()
                setIsHovered(true)
                setTimeout(() => setIsHovered(false), 3500)
              }}
              className="wm-testi-arrow-btn"
              aria-label="Next slide"
              title="Next"
            >
              <ArrowRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div 
          className="wm-testi-slider-window"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="wm-testi-slider-track"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            }}
          >
            {TESTIMONIALS.map((item) => (
              <div 
                key={item.id}
                className="wm-testi-card-wrapper"
                style={{ width: `${100 / visibleCards}%` }}
              >
                <div className="wm-testi-card">
                  
                  {/* Top Block: Role & Main Headline */}
                  <div className="wm-testi-card-header">
                    <span className="wm-testi-role-text">{item.roleTitle}</span>
                    <h3 className="wm-testi-headline-text">{item.headline}</h3>
                  </div>

                  {/* Brand / Identifier Tag */}
                  <div className="wm-testi-badge-wrapper">
                    <span className="wm-testi-badge-pill">{item.badge}</span>
                  </div>

                  {/* Quote Body */}
                  <div className="wm-testi-quote-wrapper">
                    <p className="wm-testi-quote-body">"{item.quote}"</p>
                  </div>

                  {/* Profile Section: Avatar + Name + Title + LinkedIn */}
                  <div className="wm-testi-profile-row">
                    <div className="wm-testi-avatar-frame">
                      <img 
                        src={item.avatar} 
                        alt={item.name} 
                        className="wm-testi-avatar-image"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          if (e.target.nextSibling) {
                            e.target.nextSibling.style.display = 'flex'
                          }
                        }}
                      />
                      <div className="wm-testi-avatar-fallback">
                        {item.initials}
                      </div>
                    </div>

                    <div className="wm-testi-profile-info">
                      <div className="wm-testi-name-container">
                        <span className="wm-testi-person-name">{item.name}</span>
                        <a 
                          href={item.linkedinUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="wm-testi-linkedin-btn"
                          aria-label={`${item.name} LinkedIn Profile`}
                        >
                          <FaLinkedin size={14} />
                        </a>
                      </div>
                      <span className="wm-testi-person-desig">{item.designation}</span>
                      <span className="wm-testi-person-company">{item.company}</span>
                    </div>
                  </div>

                  {/* Bottom Divider & Tags */}
                  <div className="wm-testi-footer-row">
                    <span className="wm-testi-tag-left">{item.benefit}</span>
                    <span className="wm-testi-tag-right">{item.category}</span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Slide Indicator Dots */}
        <div className="wm-testi-dots-container">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              className={`wm-testi-indicator-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentIndex(idx)
                setIsHovered(true)
                setTimeout(() => setIsHovered(false), 3500)
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
