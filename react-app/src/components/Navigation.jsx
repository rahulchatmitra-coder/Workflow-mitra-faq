import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FlowMitraLogo from './FlowMitraLogo'
import SolutionsMegaMenu from './SolutionsMegaMenu'
import './Navigation.css'

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
  const solutionsTimeoutRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mega menu when route changes
  useEffect(() => {
    setIsSolutionsOpen(false)
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsSolutionsOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleSolutionsEnter = () => {
    clearTimeout(solutionsTimeoutRef.current)
    setIsSolutionsOpen(true)
  }

  const handleSolutionsLeave = () => {
    solutionsTimeoutRef.current = setTimeout(() => {
      setIsSolutionsOpen(false)
    }, 200)
  }

  const handleMegaMenuEnter = () => {
    clearTimeout(solutionsTimeoutRef.current)
  }

  const handleMegaMenuLeave = () => {
    solutionsTimeoutRef.current = setTimeout(() => {
      setIsSolutionsOpen(false)
    }, 200)
  }

  const closeSolutions = () => {
    setIsSolutionsOpen(false)
  }

  return (
    <>
      <div className="nav-wrapper">
        <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
          <div className="nav-content">
            {/* Logo */}
            <Link to="/" className="nav-logo">
              <FlowMitraLogo size="sm" variant="full" />
            </Link>

            {/* Desktop Navigation */}
            <div className="nav-links desktop-only">
              <div 
                className="nav-dropdown"
                onMouseEnter={handleSolutionsEnter}
                onMouseLeave={handleSolutionsLeave}
              >
                <Link 
                  to="/solutions"
                  className="nav-link"
                  aria-expanded={isSolutionsOpen}
                  aria-haspopup="true"
                >
                  Solutions <span className="chevron">▼</span>
                </Link>
              </div>
              <div className="nav-dropdown">
                <button className="nav-link">Resources <span className="chevron">▼</span></button>
              </div>
              <Link to="/pricing" className="nav-link">Enterprise</Link>
              <Link to="/pricing" className="nav-link">Pricing</Link>
            </div>

            {/* CTA Buttons */}
            <div className="nav-actions desktop-only">
              <Link to="/contact" className="nav-btn nav-btn-ghost">Talk to Sales</Link>
              <Link to="/contact" className="nav-btn nav-btn-primary">Get Started</Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle mobile-only"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mobile-menu">
              <Link to="/solutions" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Solutions</Link>
              <Link to="/solutions" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Resources</Link>
              <Link to="/pricing" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Enterprise</Link>
              <Link to="/pricing" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
              <div className="mobile-menu-actions">
                <Link to="/contact" className="nav-btn nav-btn-ghost" onClick={() => setIsMobileMenuOpen(false)}>Talk to Sales</Link>
                <Link to="/contact" className="nav-btn nav-btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
              </div>
            </div>
          )}
        </nav>

        {/* Solutions Mega Menu */}
        <SolutionsMegaMenu 
          isOpen={isSolutionsOpen} 
          onClose={closeSolutions}
          onMouseEnter={handleMegaMenuEnter}
          onMouseLeave={handleMegaMenuLeave}
        />
      </div>
    </>
  )
}

export default Navigation
