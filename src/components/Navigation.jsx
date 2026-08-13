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
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-mark">
              <FlowMitraLogo size="sm" variant="icon" />
            </span>
            WorkflowMitra
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-links desktop-only">
            <li 
              className="nav-dropdown"
              onMouseEnter={handleSolutionsEnter}
              onMouseLeave={handleSolutionsLeave}
            >
              <Link 
                to="/solutions"
                aria-expanded={isSolutionsOpen}
                aria-haspopup="true"
              >
                Solutions <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="#6b7280" strokeWidth="1.4" fill="none"/></svg>
              </Link>
            </li>
            <li className="nav-dropdown">
              <span className="nav-link" style={{cursor: 'pointer'}}>
                Resources <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="#6b7280" strokeWidth="1.4" fill="none"/></svg>
              </span>
              <div className="simple-dropdown-menu">
                <Link to="/templates" className="simple-dropdown-item">Templates</Link>
                <Link to="/integrations" className="simple-dropdown-item">Integrations</Link>
                <Link to="/docs" className="simple-dropdown-item">Docs</Link>
              </div>
            </li>
            <li><Link to="/integrations">Integrations</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
          </ul>

          {/* CTA Buttons */}
          <div className="nav-right desktop-only">
            <a href="https://app.workflowmitra.com/login" className="talk-to-sales">Login</a>
            <a href="https://app.workflowmitra.com/signup" className="get-started">Signup</a>
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
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mobile-menu">
              <Link to="/solutions" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Solutions</Link>
              <Link to="/templates" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Templates</Link>
              <Link to="/integrations" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Integrations</Link>
              <Link to="/docs" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Docs</Link>
              <Link to="/pricing" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
              <div className="mobile-menu-actions">
                <a href="https://app.workflowmitra.com/login" className="nav-btn nav-btn-ghost" onClick={() => setIsMobileMenuOpen(false)}>Login</a>
                <a href="https://app.workflowmitra.com/signup" className="nav-btn nav-btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Signup</a>
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
