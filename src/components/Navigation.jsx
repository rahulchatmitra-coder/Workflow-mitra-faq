import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  ArrowRight, 
  LayoutGrid, 
  Layers, 
  BookOpen, 
  Megaphone, 
  Briefcase, 
  Settings, 
  MessageCircle, 
  Code2, 
  Shield 
} from 'lucide-react'
import FlowMitraLogo from './FlowMitraLogo'
import NavMegaDropdown from './NavMegaDropdown'
import RollButton from './RollButton'
import './Navigation.css'

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null) // 'solutions' | 'resources' | null
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null)
  const dropdownTimeoutRef = useRef(null)
  const navRef = useRef(null)
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
    setActiveDropdown(null)
    setIsMobileMenuOpen(false)
    setOpenMobileDropdown(null)
  }, [location.pathname])

  // Escape key & Click Outside listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
      }
    }

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  // Dropdown hover & click handlers
  const handleDropdownEnter = (name) => {
    clearTimeout(dropdownTimeoutRef.current)
    setActiveDropdown(name)
  }

  const handleDropdownLeave = () => {
    clearTimeout(dropdownTimeoutRef.current)
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
  }

  const handleDropdownToggle = (name, e) => {
    if (e) e.preventDefault()
    clearTimeout(dropdownTimeoutRef.current)
    setActiveDropdown(prev => (prev === name ? null : name))
  }

  const toggleMobileDropdown = (name) => {
    setOpenMobileDropdown(prev => (prev === name ? null : name))
  }

  return (
    <header id="main-header" role="banner">
      <div 
        ref={navRef}
        className={`nav-wrapper ${isScrolled ? 'scrolled' : ''} ${activeDropdown ? 'has-dropdown-open' : ''}`}
        onMouseLeave={handleDropdownLeave}
      >
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
          <div className="navbar-container">
            {/* Logo */}
            <Link 
              to="/" 
              className="logo" 
              aria-label="WorkflowMitra Home" 
              onClick={() => setActiveDropdown(null)}
              onMouseEnter={handleDropdownLeave}
            >
              <span className="logo-mark">
                <FlowMitraLogo size="sm" variant="icon" />
              </span>
              WorkflowMitra
            </Link>

            {/* Desktop Navigation */}
            <ul className="nav-links desktop-only" onMouseLeave={handleDropdownLeave}>
              {/* 1. Solutions Dropdown */}
              <li 
                className={`nav-dropdown ${activeDropdown === 'solutions' ? 'is-active' : ''}`}
                onMouseEnter={() => handleDropdownEnter('solutions')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  className={`nav-link-btn ${activeDropdown === 'solutions' ? 'active' : ''}`}
                  onClick={(e) => handleDropdownToggle('solutions', e)}
                  aria-expanded={activeDropdown === 'solutions'}
                  aria-haspopup="true"
                >
                  <span>Solutions</span>
                  <motion.span 
                    className="nav-chevron-wrap"
                    animate={{ rotate: activeDropdown === 'solutions' ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ChevronDown size={14} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {activeDropdown === 'solutions' && (
                    <NavMegaDropdown 
                      activeMenu="solutions" 
                      onClose={() => setActiveDropdown(null)}
                    />
                  )}
                </AnimatePresence>
              </li>

              {/* 2. Resources Dropdown */}
              <li 
                className={`nav-dropdown ${activeDropdown === 'resources' ? 'is-active' : ''}`}
                onMouseEnter={() => handleDropdownEnter('resources')}
                onMouseLeave={handleDropdownLeave}
              >
                <button 
                  type="button"
                  className={`nav-link-btn ${activeDropdown === 'resources' ? 'active' : ''}`}
                  onClick={(e) => handleDropdownToggle('resources', e)}
                  aria-expanded={activeDropdown === 'resources'}
                  aria-haspopup="true"
                  aria-label="Resources menu"
                >
                  <span>Resources</span>
                  <motion.span 
                    className="nav-chevron-wrap"
                    animate={{ rotate: activeDropdown === 'resources' ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ChevronDown size={14} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {activeDropdown === 'resources' && (
                    <NavMegaDropdown 
                      activeMenu="resources" 
                      onClose={() => setActiveDropdown(null)}
                    />
                  )}
                </AnimatePresence>
              </li>

              {/* 3. Direct Links */}
              <li>
                <Link to="/integrations" onClick={() => setActiveDropdown(null)} onMouseEnter={handleDropdownLeave}>
                  Integrations
                </Link>
              </li>

              <li>
                <Link to="/pricing" onClick={() => setActiveDropdown(null)} onMouseEnter={handleDropdownLeave}>
                  Pricing
                </Link>
              </li>
            </ul>

            {/* CTA Buttons */}
            <div className="nav-right desktop-only" onMouseEnter={handleDropdownLeave}>
              <RollButton
                href="https://app.workflowmitra.com/signup"
                variant="dark"
                size="md"
                showArrow={true}
              >
                Get started
              </RollButton>
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
      </div>
    </header>
  )
}

export default Navigation
