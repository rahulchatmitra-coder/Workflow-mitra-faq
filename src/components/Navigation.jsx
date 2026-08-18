import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, ArrowRight, LayoutGrid, Layers, BookOpen, MessageSquare, Megaphone, Briefcase, Settings, MessageCircle, Code2, Shield } from 'lucide-react'
import FlowMitraLogo from './FlowMitraLogo'
import SolutionsMegaMenu from './SolutionsMegaMenu'
import './Navigation.css'

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null)
  const solutionsTimeoutRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mega menu and mobile menu when route changes
  useEffect(() => {
    setIsSolutionsOpen(false)
    setIsMobileMenuOpen(false)
    setOpenMobileDropdown(null)
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

  const toggleMobileDropdown = (name) => {
    setOpenMobileDropdown(prev => (prev === name ? null : name))
  }

  return (
    <>
      <div className="nav-wrapper">
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
          <div className="navbar-container">
            {/* Logo */}
            <Link to="/" className="logo" aria-label="WorkflowMitra Home">
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
                  Solutions <svg aria-hidden="true" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="#6b7280" strokeWidth="1.4" fill="none"/></svg>
                </Link>
              </li>
              <li className="nav-dropdown">
                <button className="nav-link nav-dropdown-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Resources menu">
                  Resources <svg aria-hidden="true" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="#6b7280" strokeWidth="1.4" fill="none"/></svg>
                </button>
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
              <a
                href="https://app.workflowmitra.com/login"
                className="wm-nav-login-btn"
              >
                Login
              </a>
              <a
                href="https://app.workflowmitra.com/signup"
                className="wm-nav-signup-btn"
              >
                <span>Get started</span>
                <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M2.5 6h7M6.5 2.5l3.5 3.5-3.5 3.5" />
                </svg>
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle mobile-only"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen)
                if (isMobileMenuOpen) setOpenMobileDropdown(null)
              }}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
          
          {/* Mobile Menu Accordion Drawer */}
          {isMobileMenuOpen && (
            <div className="mobile-menu">
              {/* 1. Solutions Accordion Dropdown */}
              <div className={`mobile-dropdown-group ${openMobileDropdown === 'solutions' ? 'active' : ''}`}>
                <button
                  type="button"
                  className="mobile-dropdown-trigger"
                  onClick={() => toggleMobileDropdown('solutions')}
                  aria-expanded={openMobileDropdown === 'solutions'}
                >
                  <span className="mobile-trigger-title">
                    <LayoutGrid size={18} className="mobile-trigger-icon" />
                    <span>Solutions</span>
                  </span>
                  <ChevronDown
                    size={18}
                    className={`mobile-chevron ${openMobileDropdown === 'solutions' ? 'rotate' : ''}`}
                  />
                </button>

                {openMobileDropdown === 'solutions' && (
                  <div className="mobile-submenu">
                    <Link to="/solutions/sales" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                      <Briefcase size={16} color="#2563eb" />
                      <div className="mobile-sublink-text">
                        <span className="sublink-title">Sales Automation</span>
                        <span className="sublink-desc">CRM, lead routing &amp; follow-ups</span>
                      </div>
                    </Link>

                    <Link to="/solutions/marketing" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                      <Megaphone size={16} color="#d97706" />
                      <div className="mobile-sublink-text">
                        <span className="sublink-title">Marketing Workflows</span>
                        <span className="sublink-desc">Campaigns, ads &amp; AI content</span>
                      </div>
                    </Link>

                    <Link to="/solutions/operations" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                      <Settings size={16} color="#059669" />
                      <div className="mobile-sublink-text">
                        <span className="sublink-title">Operations &amp; Sync</span>
                        <span className="sublink-desc">Cross-app data &amp; spreadsheets</span>
                      </div>
                    </Link>

                    <Link to="/solutions/support" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                      <MessageCircle size={16} color="#7c3aed" />
                      <div className="mobile-sublink-text">
                        <span className="sublink-title">Customer Support</span>
                        <span className="sublink-desc">Tickets, triage &amp; AI replies</span>
                      </div>
                    </Link>

                    <Link to="/solutions/engineering" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                      <Code2 size={16} color="#0284c7" />
                      <div className="mobile-sublink-text">
                        <span className="sublink-title">Engineering &amp; DevOps</span>
                        <span className="sublink-desc">Webhooks, API &amp; CI/CD</span>
                      </div>
                    </Link>

                    <Link to="/solutions/security" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                      <Shield size={16} color="#dc2626" />
                      <div className="mobile-sublink-text">
                        <span className="sublink-title">Security &amp; Audit</span>
                        <span className="sublink-desc">Access control &amp; compliance</span>
                      </div>
                    </Link>

                    <Link to="/solutions" className="mobile-sublink-all" onClick={() => setIsMobileMenuOpen(false)}>
                      <span>Explore all solution use-cases</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
              </div>

              {/* 2. Resources Accordion Dropdown */}
              <div className={`mobile-dropdown-group ${openMobileDropdown === 'resources' ? 'active' : ''}`}>
                <button
                  type="button"
                  className="mobile-dropdown-trigger"
                  onClick={() => toggleMobileDropdown('resources')}
                  aria-expanded={openMobileDropdown === 'resources'}
                >
                  <span className="mobile-trigger-title">
                    <Layers size={18} className="mobile-trigger-icon" />
                    <span>Resources &amp; Hub</span>
                  </span>
                  <ChevronDown
                    size={18}
                    className={`mobile-chevron ${openMobileDropdown === 'resources' ? 'rotate' : ''}`}
                  />
                </button>

                {openMobileDropdown === 'resources' && (
                  <div className="mobile-submenu">
                    <Link to="/templates" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                      <Layers size={16} color="#2563eb" />
                      <div className="mobile-sublink-text">
                        <span className="sublink-title">Pre-built Templates</span>
                        <span className="sublink-desc">1-click ready business recipes</span>
                      </div>
                    </Link>

                    <Link to="/integrations" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                      <LayoutGrid size={16} color="#059669" />
                      <div className="mobile-sublink-text">
                        <span className="sublink-title">Integrations Library</span>
                        <span className="sublink-desc">37+ Official SaaS connectors</span>
                      </div>
                    </Link>

                    <Link to="/docs" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                      <BookOpen size={16} color="#7c3aed" />
                      <div className="mobile-sublink-text">
                        <span className="sublink-title">Documentation &amp; Guides</span>
                        <span className="sublink-desc">Credentials, API &amp; tutorials</span>
                      </div>
                    </Link>

                    <Link to="/contact" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                      <MessageSquare size={16} color="#ea580c" />
                      <div className="mobile-sublink-text">
                        <span className="sublink-title">Talk to an Expert</span>
                        <span className="sublink-desc">Free 1-on-1 workflow design</span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Direct Links */}
              <Link to="/integrations" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <LayoutGrid size={18} className="mobile-link-icon" />
                <span>Integrations</span>
              </Link>

              <Link to="/pricing" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="mobile-pricing-dot" />
                <span>Pricing Plans</span>
              </Link>

              {/* Action Buttons */}
              <div className="mobile-menu-actions">
                <a href="https://app.workflowmitra.com/login" className="wm-mobile-login-btn" onClick={() => setIsMobileMenuOpen(false)}>Login</a>
                <a href="https://app.workflowmitra.com/signup" className="wm-mobile-signup-btn" onClick={() => setIsMobileMenuOpen(false)}>Get started</a>
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
