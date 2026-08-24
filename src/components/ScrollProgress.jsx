import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import './ScrollProgress.css'

export default function ScrollProgress() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollPercentage, setScrollPercentage] = useState(0)

  // Top laser progress bar with smooth physics spring
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 450,
    damping: 40,
    restDelta: 0.001
  })

  // Listen to native scroll for percentage and back-to-top visibility
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          
          if (totalHeight > 0) {
            const percent = Math.min(100, Math.max(0, (currentY / totalHeight) * 100))
            setScrollPercentage(percent)
          }

          setShowScrollTop(currentY > 360)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // SVG Circular progress calculation (radius = 18, circumference = 2 * PI * 18 ~ 113.1)
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference

  return (
    <>
      {/* 1. Sleek Top Laser Gradient Scroll Line */}
      <motion.div
        className="wm-scroll-progress-laser"
        style={{ scaleX }}
        aria-hidden="true"
      />

      {/* 2. Floating Circular Scroll Tracker Widget */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            className="wm-scroll-tracker-wrap"
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              className="wm-scroll-tracker-btn"
              onClick={scrollToTop}
              title="Back to top"
              aria-label={`Back to top (scrolled ${Math.round(scrollPercentage)}%)`}
            >
              {/* Circular Progress Ring SVG */}
              <svg className="wm-scroll-ring-svg" viewBox="0 0 44 44">
                <circle
                  className="wm-scroll-ring-bg"
                  cx="22"
                  cy="22"
                  r={radius}
                />
                <circle
                  className="wm-scroll-ring-fill"
                  cx="22"
                  cy="22"
                  r={radius}
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: strokeDashoffset
                  }}
                />
              </svg>

              {/* Upward Chevron Icon */}
              <ArrowUp size={18} className="wm-scroll-tracker-icon" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
