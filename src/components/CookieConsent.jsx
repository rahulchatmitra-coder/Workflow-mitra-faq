import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Cookie, ShieldCheck, Check, Settings2, RotateCcw, CheckCircle2 } from 'lucide-react'
import {
  saveConsent,
  getSavedConsent,
  resetConsent,
} from '../utils/cookieConsentManager'
import './CookieConsent.css'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
  })

  useEffect(() => {
    // 1. Check if user already made a decision
    const saved = getSavedConsent()
    if (!saved) {
      const timer = setTimeout(() => setIsVisible(true), 800)
      return () => clearTimeout(timer)
    } else if (saved.preferences) {
      setPreferences(saved.preferences)
    }
  }, [])

  // Listen for open / reset triggers from anywhere in app
  useEffect(() => {
    const handleOpenSettings = () => {
      const saved = getSavedConsent()
      if (saved?.preferences) {
        setPreferences(saved.preferences)
      }
      setIsModalOpen(true)
      setIsVisible(true)
    }

    const handleResetEvent = () => {
      setIsVisible(true)
      setIsModalOpen(false)
    }

    window.addEventListener('open-cookie-settings', handleOpenSettings)
    window.addEventListener('cookie-consent-reset', handleResetEvent)
    return () => {
      window.removeEventListener('open-cookie-settings', handleOpenSettings)
      window.removeEventListener('cookie-consent-reset', handleResetEvent)
    }
  }, [])

  const triggerToast = (msg) => {
    setToastMessage(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleAcceptAll = () => {
    const all = { necessary: true, analytics: true, marketing: true }
    saveConsent(all)
    setPreferences(all)
    setIsModalOpen(false)
    setIsVisible(false)
    triggerToast('All cookies accepted and saved successfully.')
  }

  const handleSavePreferences = () => {
    saveConsent(preferences)
    setIsModalOpen(false)
    setIsVisible(false)
    triggerToast('Cookie preferences updated & saved.')
  }

  const handleDeclineOptional = () => {
    const minimal = { necessary: true, analytics: false, marketing: false }
    saveConsent(minimal)
    setPreferences(minimal)
    setIsModalOpen(false)
    setIsVisible(false)
    triggerToast('Optional cookies declined.')
  }

  const handleResetConsent = () => {
    resetConsent()
    setPreferences({ necessary: true, analytics: true, marketing: false })
    setIsModalOpen(false)
    setIsVisible(true)
    triggerToast('Cookie settings have been reset.')
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <>
      {/* ─── Real-time Floating Success Toast ─── */}
      {showToast && (
        <div className="wm-cookie-toast" role="status" aria-live="polite">
          <div className="wm-toast-icon">
            <CheckCircle2 size={18} color="#059669" />
          </div>
          <span className="wm-toast-text">{toastMessage}</span>
        </div>
      )}

      {/* ─── Main Bottom Cookie Banner ─── */}
      {isVisible && !isModalOpen && (
        <div
          className="wm-cookie-banner"
          role="region"
          aria-label="Cookie consent banner"
        >
          <div className="wm-cookie-container">
            {/* Left Content Area */}
            <div className="wm-cookie-content">
              <div className="wm-cookie-icon-wrap" aria-hidden="true">
                <Cookie size={22} className="wm-cookie-icon" />
              </div>
              <div className="wm-cookie-text-box">
                <p className="wm-cookie-text">
                  With cookies we can ensure you get the best experience on our website. These cookies may incorporate data transfers to third-party providers based in countries without an adequate level of data protection. By clicking &ldquo;Understood&rdquo;, you acknowledge the storage of cookies on your device to improve website navigation, analyze website usage, and assist in our marketing efforts. For further information, please see our{' '}
                  <Link to="/privacy" className="wm-cookie-link">Cookie Notice</Link> &amp; <Link to="/privacy" className="wm-cookie-link">Privacy Policy</Link>.
                </p>
              </div>
            </div>

            {/* Right Actions Area */}
            <div className="wm-cookie-actions">
              <button
                type="button"
                className="wm-cookie-btn-settings"
                onClick={() => setIsModalOpen(true)}
              >
                <Settings2 size={15} />
                <span>Select Cookies Settings</span>
              </button>

              <button
                type="button"
                className="wm-cookie-btn-accept"
                onClick={handleAcceptAll}
              >
                <span>Understood</span>
              </button>

              <button
                type="button"
                className="wm-cookie-btn-close"
                onClick={handleClose}
                aria-label="Dismiss cookie notice"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Cookie Preferences Modal ─── */}
      {isModalOpen && (
        <div className="wm-cookie-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div
            className="wm-cookie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="wm-modal-header">
              <div className="wm-modal-title-group">
                <div className="wm-modal-icon-badge">
                  <ShieldCheck size={22} color="#059669" />
                </div>
                <div>
                  <h3 id="cookie-modal-title" className="wm-modal-title">Cookie &amp; Privacy Preferences</h3>
                  <p className="wm-modal-subtitle">Manage how cookies &amp; data are stored on your device.</p>
                </div>
              </div>
              <button
                type="button"
                className="wm-modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close preferences modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body: Preference Categories */}
            <div className="wm-modal-body">
              {/* Category 1: Strictly Necessary */}
              <div className="wm-pref-card">
                <div className="wm-pref-info">
                  <div className="wm-pref-heading">
                    <span className="wm-pref-name">Strictly Necessary Cookies</span>
                    <span className="wm-pref-badge badge-always">Always Active</span>
                  </div>
                  <p className="wm-pref-desc">
                    Required for secure login authentication, CSRF security, and route transitions. These cannot be disabled.
                  </p>
                </div>
                <div className="wm-toggle-wrapper">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    id="pref-necessary"
                    className="wm-toggle-input"
                  />
                  <label htmlFor="pref-necessary" className="wm-toggle-label disabled">
                    <span className="wm-toggle-knob" />
                  </label>
                </div>
              </div>

              {/* Category 2: Performance & Analytics */}
              <div className="wm-pref-card">
                <div className="wm-pref-info">
                  <div className="wm-pref-heading">
                    <span className="wm-pref-name">Analytics &amp; Performance</span>
                    <span className="wm-pref-badge badge-opt">
                      {preferences.analytics ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  <p className="wm-pref-desc">
                    Measures page load speeds, Core Web Vitals, and interaction trends to help us deliver maximum performance.
                  </p>
                </div>
                <div className="wm-toggle-wrapper">
                  <input
                    type="checkbox"
                    id="pref-analytics"
                    className="wm-toggle-input"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences((p) => ({ ...p, analytics: e.target.checked }))
                    }
                  />
                  <label htmlFor="pref-analytics" className="wm-toggle-label">
                    <span className="wm-toggle-knob" />
                  </label>
                </div>
              </div>

              {/* Category 3: Marketing & Experience */}
              <div className="wm-pref-card">
                <div className="wm-pref-info">
                  <div className="wm-pref-heading">
                    <span className="wm-pref-name">Marketing &amp; Personalization</span>
                    <span className="wm-pref-badge badge-opt">
                      {preferences.marketing ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  <p className="wm-pref-desc">
                    Allows tailored workflow suggestions and prevents repetitive marketing messages across visits.
                  </p>
                </div>
                <div className="wm-toggle-wrapper">
                  <input
                    type="checkbox"
                    id="pref-marketing"
                    className="wm-toggle-input"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences((p) => ({ ...p, marketing: e.target.checked }))
                    }
                  />
                  <label htmlFor="pref-marketing" className="wm-toggle-label">
                    <span className="wm-toggle-knob" />
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="wm-modal-footer">
              <div className="wm-modal-left-actions">
                <button
                  type="button"
                  className="wm-modal-btn-decline"
                  onClick={handleDeclineOptional}
                >
                  Reject Optional
                </button>

                <button
                  type="button"
                  className="wm-modal-btn-reset"
                  onClick={handleResetConsent}
                  title="Clear all stored cookies & consent"
                >
                  <RotateCcw size={13} />
                  <span>Reset Consent</span>
                </button>
              </div>

              <div className="wm-modal-primary-actions">
                <button
                  type="button"
                  className="wm-modal-btn-save"
                  onClick={handleSavePreferences}
                >
                  <Check size={16} />
                  <span>Save Preferences</span>
                </button>

                <button
                  type="button"
                  className="wm-modal-btn-accept-all"
                  onClick={handleAcceptAll}
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
