import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FlowMitraLogo from './FlowMitraLogo'
import './Navigation.css'

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <FlowMitraLogo size="md" variant="full" />
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links desktop-only">
            <Link to="/solutions" className="nav-link">Solutions</Link>
            <Link to="/pricing" className="nav-link">Pricing</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/contact" className="nav-link">Contact Us</Link>
          </div>

          {/* CTA Buttons */}
          <div className="nav-actions desktop-only">
            <button className="nav-btn nav-btn-secondary">Talk to Sales</button>
            <button className="nav-btn nav-btn-primary">Get Started</button>
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
            <Link to="/solutions" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Solutions
            </Link>
            <Link to="/pricing" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Pricing
            </Link>
            <Link to="/about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Contact Us
            </Link>
            <div className="mobile-menu-actions">
              <button className="nav-btn nav-btn-secondary">Talk to Sales</button>
              <button className="nav-btn nav-btn-primary">Get Started</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
