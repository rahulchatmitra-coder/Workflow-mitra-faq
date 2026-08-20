import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  Sparkles,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react'
import InteractivePlayer from './InteractivePlayer'

export const onboardingGuide = [
  {
    image: '/onboarding/step1.webp',
    title: 'Step 1: Open Workflow Mitra Portal',
    description:
      'Open your preferred web browser (Google Chrome, Safari, Firefox, Edge).\n\nType https://app.workflowmitra.com into the address bar and press Enter.',
    addressUrl: 'https://app.workflowmitra.com',
    hotspot: {
      target: 'image',
      top: '4.2%',
      left: '24.5%',
      title: 'Step 1: Open Address Bar',
      detail: 'Type https://app.workflowmitra.com into your browser address bar and press Enter.',
    },
  },
  {
    image: '/onboarding/step2.webp',
    title: "Step 2: Click 'Create Account' Link",
    description:
      'You are on the official Sign In page.\n\n• New users: Click \'Create Account\' at the bottom of the sign-in form.\n• Existing users: Enter Email & Password and click Sign In.',
    addressUrl: 'https://app.workflowmitra.com/login',
    hotspot: {
      target: 'image',
      top: '83.8%',
      left: '81%',
      title: 'Step 2: Click Create Account',
      detail: "Click the 'Create Account' link located at the bottom of the sign-in form.",
    },
  },
  {
    image: '/onboarding/step3.webp',
    title: 'Step 3: Complete Registration Form',
    description:
      'Fill in your registration details:\n\n• Full Name: Enter your full name.\n• Email Address: Enter your work email address.\n• Password: Create a strong password.\n• Confirm Password: Re-enter the same password.\n• Account Name: Enter a unique workspace handle (e.g. \'mycompany123\').\n\nClick the dark \'Create Account\' button to submit.',
    addressUrl: 'https://app.workflowmitra.com/signup',
    hotspot: {
      target: 'image',
      top: '48%',
      left: '64%',
      title: 'Step 3: Registration Form',
      detail: 'Fill in your Name, Email, Password, and Workspace Name, then click Create Account.',
    },
  },
  {
    image: '/onboarding/step4.webp',
    title: 'Step 4: Verify Email Inbox',
    description:
      'Open your email inbox (Gmail, Outlook, Yahoo, Work Mail).\n\nLocate the verification email sent by Workflow Mitra and click the confirmation link to activate your account.',
    addressUrl: 'https://app.workflowmitra.com/verify',
    hotspot: {
      target: 'image',
      top: '83%',
      left: '82%',
      title: 'Step 4: Verify Email Inbox',
      detail: 'Open your email inbox and click the verification link sent by Workflow Mitra.',
    },
  },
  {
    image: '/onboarding/step6.webp',
    title: 'Step 5: Access Welcome Dashboard',
    description:
      'Congratulations! Your account is verified and ready.\n\nLog in to access your Workflow Mitra dashboard, create AI workflows, and automate your business processes!',
    addressUrl: 'https://app.workflowmitra.com/dashboard',
    hotspot: {
      target: 'image',
      top: '35%',
      left: '25%',
      title: 'Step 5: Welcome Dashboard',
      detail: 'Congratulations! You are inside Workflow Mitra. Click "+ New Workflow" to start automating.',
    },
  },
]

export default function CreateAccountPage() {
  const navigate = useNavigate()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [selectedImageModal, setSelectedImageModal] = useState(null)
  const [isFullscreenModal, setIsFullscreenModal] = useState(false)
  const [activeSpeakingIndex, setActiveSpeakingIndex] = useState(null)
  const [feedbackGiven, setFeedbackGiven] = useState(false)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsFullscreenModal(false)
      }
    }
    if (isFullscreenModal) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreenModal])

  const handleBackToHelpCenter = (e) => {
    e.preventDefault()
    navigate('/automation-help')
  }

  const totalSteps = onboardingGuide.length

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const getBestVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null
    const voices = window.speechSynthesis.getVoices()
    if (!voices || voices.length === 0) return null

    const englishVoices = voices.filter((v) => v.lang.startsWith('en'))
    if (englishVoices.length === 0) return voices[0]

    const preferred = englishVoices.find((v) =>
      ['Guy', 'Daniel', 'George', 'Ryan', 'Google US English'].some((k) =>
        v.name.toLowerCase().includes(k.toLowerCase())
      )
    )
    return preferred || englishVoices[0]
  }

  const formatTextForSpeech = (text) => {
    if (!text) return ''
    return text
      .replace(/https?:\/\/(www\.)?/gi, '')
      .replace(/\.com/gi, ' dot com')
      .replace(/api/gi, 'A P I')
      .replace(/•/g, '. ')
      .replace(/[\n\r]+/g, '. ')
      .replace(/[^\w\s.,'-]/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  const handleSpeakCard = (stepIndex, stepTitle, stepDesc) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    if (activeSpeakingIndex === stepIndex) {
      window.speechSynthesis.cancel()
      setActiveSpeakingIndex(null)
      return
    }

    window.speechSynthesis.cancel()
    const textToRead = formatTextForSpeech(`${stepTitle}. ${stepDesc}`)
    const utterance = new SpeechSynthesisUtterance(textToRead)
    const bestVoice = getBestVoice()
    if (bestVoice) utterance.voice = bestVoice
    utterance.rate = 0.94

    utterance.onend = () => setActiveSpeakingIndex(null)
    utterance.onerror = () => setActiveSpeakingIndex(null)

    setActiveSpeakingIndex(stepIndex)
    window.speechSynthesis.speak(utterance)
  }

  const renderFormattedDescription = (text) => {
    if (!text) return null
    const parts = []
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s,\)]+)/g
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }
      if (match[1] && match[2]) {
        parts.push(
          <a
            key={`md-link-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#4f46e5', fontWeight: 700, textDecoration: 'underline' }}
            onClick={(e) => e.stopPropagation()}
          >
            {match[1]}
          </a>
        )
      } else if (match[3]) {
        const url = match[3]
        parts.push(
          <a
            key={`raw-link-${match.index}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#4f46e5', fontWeight: 700, textDecoration: 'underline' }}
            onClick={(e) => e.stopPropagation()}
          >
            {url}
          </a>
        )
      }
      lastIndex = linkRegex.lastIndex
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', color: '#09090b', fontFamily: "'Geist Sans', 'Inter', sans-serif" }}>
      
      {/* TOP NAVIGATION BACK BAR */}
      <div style={{ borderBottom: '1px solid #e4e4e7', background: '#fafafa', position: 'sticky', top: 0, zIndex: 30 }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '12px 24px' }}>
          <Link
            to="/docs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#3f3f46',
              textDecoration: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            className="hover:text-black"
          >
            <ArrowLeft size={16} />
            <span>Back to Help Center</span>
          </Link>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '36px 24px', display: 'flex', flexDirection: 'column', gap: '44px' }}>
        
        {/* TOP SECTION HEADER */}
        <div style={{ borderBottom: '1px solid #e4e4e7', paddingBottom: '24px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              borderRadius: '9999px',
              border: '1px solid #d4d4d8',
              background: '#f4f4f5',
              padding: '4px 14px',
              fontSize: '11.5px',
              fontWeight: 800,
              color: '#09090b',
            }}
          >
            <Sparkles size={13} color="#09090b" />
            <span>Interactive Account Registration Guide</span>
          </span>

          <h1 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.025em', color: '#09090b', margin: '12px 0 6px' }}>
            How to Create an Account in Workflow Mitra
          </h1>

          <p style={{ fontSize: '15px', color: '#71717a', margin: 0, fontWeight: 500 }}>
            Follow this 5-step visual guide to register, verify your email, and access your automation dashboard.
          </p>
        </div>

        {/* INTERACTIVE PLAYER (HD WIDESCREEN TV FRAME) */}
        <InteractivePlayer
          steps={onboardingGuide}
          currentStepIndex={currentStepIndex}
          onStepChange={(idx) => setCurrentStepIndex(idx)}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          defaultAddressUrl="https://app.workflowmitra.com"
          providerName="Workflow Mitra"
        />

        {/* STEP-BY-STEP POINT-WISE INSTRUCTIONS SECTION */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingTop: '20px', borderTop: '1px solid #e4e4e7' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#09090b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={13} color="#09090b" />
              Visual Walkthrough
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#09090b', margin: '8px 0 4px', letterSpacing: '-0.025em' }}>
              Step-by-Step Registration Instructions
            </h2>
            <p style={{ fontSize: '14.5px', color: '#71717a', margin: 0, fontWeight: 500 }}>
              Follow these detailed steps to complete your account registration.
            </p>
          </div>

          {/* 5 STEP CARDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {onboardingGuide.map((s, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: '28px',
                  border: '1.5px solid #e4e4e7',
                  background: '#ffffff',
                  padding: '26px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
                    gap: '32px',
                    alignItems: 'center',
                  }}
                  className="wm-step-card-grid"
                >
                  {/* LEFT: SCREENSHOT THUMBNAIL (SUBTLE NORMAL SCALE ON HOVER) */}
                  <div
                    style={{
                      borderRadius: '18px',
                      overflow: 'hidden',
                      border: '1.5px solid #d4d4d8',
                      background: '#09090b',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                    onClick={() => {
                      setSelectedImageModal(s.image)
                      setIsFullscreenModal(true)
                    }}
                    className="wm-thumbnail-hover-box"
                  >
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10' }}>
                      <img
                        src={s.image}
                        alt={`Step ${idx + 1}: ${s.title}`}
                        loading="lazy"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'top',
                          transition: 'transform 0.35s ease',
                        }}
                        className="wm-thumbnail-image"
                      />
                      
                      {/* HOVER OVERLAY: CLICK TO EXPAND */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0, 0, 0, 0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.25s ease',
                        }}
                        className="wm-expand-overlay"
                      >
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            borderRadius: '9999px',
                            background: 'rgba(9, 9, 11, 0.95)',
                            padding: '8px 18px',
                            fontSize: '12px',
                            fontWeight: 800,
                            color: '#ffffff',
                            border: '1px solid #3f3f46',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                          }}
                        >
                          <Maximize2 size={14} /> Click to Expand
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: STEP INFO & INSTRUCTIONS */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    
                    {/* Top Row: Badge + Title + Listen Button */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span
                          style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '10px',
                            background: '#09090b',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            fontWeight: 900,
                            flexShrink: 0,
                          }}
                        >
                          {idx + 1}
                        </span>
                        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#09090b', margin: 0, lineHeight: 1.3 }}>
                          {s.title}
                        </h3>
                      </div>

                      {/* AUDIO VOICE BUTTON */}
                      <button
                        onClick={() => handleSpeakCard(idx, s.title, s.description)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          borderRadius: '9999px',
                          padding: '5px 14px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          border: '1px solid #e4e4e7',
                          background: activeSpeakingIndex === idx ? '#ef4444' : '#ffffff',
                          color: activeSpeakingIndex === idx ? '#ffffff' : '#09090b',
                          transition: 'all 0.15s ease',
                          flexShrink: 0,
                        }}
                      >
                        {activeSpeakingIndex === idx ? (
                          <VolumeX size={14} color="#ffffff" />
                        ) : (
                          <Volume2 size={14} color="#09090b" />
                        )}
                        <span>{activeSpeakingIndex === idx ? 'Stop' : 'Listen'}</span>
                      </button>
                    </div>

                    {/* DESCRIPTION CONTAINER BOX */}
                    <div
                      style={{
                        borderRadius: '18px',
                        background: '#f8fafc',
                        border: '1px solid #f1f5f9',
                        padding: '18px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                      }}
                    >
                      <div style={{ fontSize: '13.5px', color: '#3f3f46', lineHeight: 1.65, margin: 0, whiteSpace: 'pre-line', fontWeight: 500 }}>
                        {renderFormattedDescription(s.description)}
                      </div>

                      {s.hotspot?.detail && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            fontSize: '12.5px',
                            fontWeight: 600,
                            color: '#27272a',
                            paddingTop: '10px',
                            borderTop: '1px solid #e2e8f0',
                            lineHeight: 1.5,
                          }}
                        >
                          <CheckCircle2 size={15} color="#09090b" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{s.hotspot.detail}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEEDBACK WIDGET */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '24px', border: '1px solid #e4e4e7', background: '#f8fafc', padding: '24px', textAlign: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#09090b', margin: 0 }}>
            Was this Create Account Guide helpful?
          </h4>

          {feedbackGiven ? (
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#059669' }}>
              <Sparkles size={16} />
              <span>Thank you for your feedback! 🎉</span>
            </div>
          ) : (
            <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setFeedbackGiven(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '12px', border: '1px solid #d4d4d8', background: '#ffffff', fontSize: '12px', fontWeight: 700, color: '#09090b', cursor: 'pointer' }}
              >
                <ThumbsUp size={14} />
                <span>Yes</span>
              </button>
              <button
                type="button"
                onClick={() => setFeedbackGiven(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '12px', border: '1px solid #d4d4d8', background: '#ffffff', fontSize: '12px', fontWeight: 700, color: '#09090b', cursor: 'pointer' }}
              >
                <ThumbsDown size={14} />
                <span>No</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL (WITH BACK & CANCEL X ICON) */}
      <AnimatePresence>
        {isFullscreenModal && selectedImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'rgba(0, 0, 0, 0.96)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px',
            }}
            onClick={() => setIsFullscreenModal(false)}
          >
            {/* Top Modal Header with Back / Cancel & X Icon */}
            <div
              style={{
                width: '100%',
                maxWidth: '1240px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#ffffff',
                paddingBottom: '12px',
                zIndex: 101,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* BACK / CANCEL BUTTON */}
                <button
                  onClick={() => setIsFullscreenModal(false)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#27272a',
                    border: '1px solid #3f3f46',
                    color: '#ffffff',
                    padding: '7px 16px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  className="hover:bg-zinc-700"
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff', display: 'inline-block' }} />
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#f4f4f5' }}>
                    Workflow Mitra Registration Screenshot Preview
                  </span>
                </div>
              </div>

              {/* CANCEL / CLOSE X ICON BUTTON */}
              <button
                onClick={() => setIsFullscreenModal(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#27272a',
                  border: '1.5px solid #52525b',
                  color: '#ffffff',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5)',
                  transition: 'all 0.15s ease',
                }}
                className="hover:bg-rose-600 hover:border-rose-500"
                title="Close / Cancel (Esc)"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Modal Image Viewport */}
            <div
              style={{
                position: 'relative',
                flex: 1,
                width: '100%',
                maxWidth: '1240px',
                margin: '8px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: '18px',
                border: '1.5px solid #27272a',
                background: '#09090b',
                padding: '8px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImageModal}
                alt="Workflow Mitra Step Screenshot"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
