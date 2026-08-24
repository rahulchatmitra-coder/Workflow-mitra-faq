import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Lock,
  CheckCircle2,
  Volume2,
  VolumeX,
  RotateCcw,
  Rocket,
  Eye,
  KeyRound,
} from 'lucide-react'

export default function InteractivePlayer({
  steps,
  currentStepIndex,
  onStepChange,
  onNext,
  onPrev,
  defaultAddressUrl = 'https://app.workflowmitra.com',
  externalAppUrl,
  providerName = 'Workflow Mitra',
  onCompleteAction,
}) {
  const navigate = useNavigate()
  const [zoomLevel, setZoomLevel] = useState(100)
  const [showCompletionOverlay, setShowCompletionOverlay] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const currentStep = steps[currentStepIndex] || steps[0]
  const totalSteps = steps.length
  const addressBarUrl = currentStep.addressUrl || defaultAddressUrl

  useEffect(() => {
    if (currentStepIndex !== totalSteps - 1) {
      setShowCompletionOverlay(false)
    }
  }, [currentStepIndex, totalSteps])

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [currentStepIndex])

  const handleNextOrFinish = () => {
    if (currentStepIndex < totalSteps - 1) {
      onNext()
    } else {
      setShowCompletionOverlay(true)
      if (onCompleteAction) {
        onCompleteAction()
      }
    }
  }

  const handleRestartTour = () => {
    setShowCompletionOverlay(false)
    setZoomLevel(100)
    onStepChange(0)
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

  const handleSpeakStep = (e) => {
    e?.stopPropagation()
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    window.speechSynthesis.cancel()
    const rawTitle = (currentStep.hotspot?.title || currentStep.title || '').replace(/Step \d+:/i, '')
    const rawDesc = currentStep.description || ''
    const rawDetail = currentStep.hotspot?.detail || ''

    const textToRead = formatTextForSpeech(`Step ${currentStepIndex + 1}. ${rawTitle}. ${rawDesc}. ${rawDetail}`)
    const utterance = new SpeechSynthesisUtterance(textToRead)
    utterance.rate = 0.94
    const voice = getBestVoice()
    if (voice) utterance.voice = voice

    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    setIsSpeaking(true)
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

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 20, 200))
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 20, 80))

  const progressPercentage = Math.round(((currentStepIndex + 1) / totalSteps) * 100)

  return (
    <div className="w-full">
      {/* 2-COLUMN EQUAL-HEIGHT MAIN PLAYER GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 380px) 1fr',
          gap: '24px',
          alignItems: 'stretch',
        }}
        className="wm-player-grid"
      >
        {/* LEFT SIDE: STEP CONTROLS & DESCRIPTION CARD */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: '20px',
            border: '1.5px solid #e4e4e7',
            background: '#ffffff',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
            minHeight: '480px',
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* TOP ROW: STEP BADGE + PERCENTAGE + AUDIO BUTTON */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      borderRadius: '9999px',
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: 800,
                      background: '#09090b',
                      color: '#ffffff',
                    }}
                  >
                    Step {currentStepIndex + 1} of {totalSteps}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#71717a' }}>
                    ({progressPercentage}%)
                  </span>
                </div>

                {/* AUDIO VOICE ASSISTANT BUTTON */}
                <button
                  onClick={handleSpeakStep}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    borderRadius: '9999px',
                    padding: '5px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: '1px solid #c7d2fe',
                    background: isSpeaking ? '#ef4444' : '#eef2ff',
                    color: isSpeaking ? '#ffffff' : '#4f46e5',
                    transition: 'all 0.15s ease',
                  }}
                  title={isSpeaking ? 'Stop voice' : 'Listen to step instructions'}
                >
                  {isSpeaking ? (
                    <VolumeX size={14} color="#ffffff" />
                  ) : (
                    <Volume2 size={14} color="#4f46e5" />
                  )}
                  <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                </button>
              </div>

              {/* PROGRESS BAR */}
              <div style={{ height: '5px', width: '100%', borderRadius: '9999px', background: '#f4f4f5', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    background: '#09090b',
                    width: `${progressPercentage}%`,
                    borderRadius: '9999px',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>

            {/* STEP TITLE */}
            <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#09090b', margin: 0, lineHeight: 1.35, letterSpacing: '-0.02em' }}>
              {currentStep.title}
            </h2>

            {/* SCROLLABLE STEP DESCRIPTION & CALLOUT CONTAINER */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                maxHeight: '260px',
                overflowY: 'auto',
                paddingRight: '6px',
              }}
              className="wm-custom-scrollbar"
            >
              {/* STEP DESCRIPTION (DARK & CRISP) */}
              <div style={{ fontSize: '14.5px', lineHeight: 1.65, color: '#18181b', whiteSpace: 'pre-line', fontWeight: 500 }}>
                {renderFormattedDescription(currentStep.description)}
              </div>

              {/* AMBER CALLOUT BOX */}
              {currentStep.hotspot?.detail && (
                <div
                  style={{
                    borderRadius: '14px',
                    background: '#fffbeb',
                    border: '1.5px solid #fef3c7',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    color: '#78350f',
                    fontSize: '13px',
                    fontWeight: 600,
                    lineHeight: 1.55,
                  }}
                >
                  <Sparkles
                    size={16}
                    color="#d97706"
                    style={{ flexShrink: 0, marginTop: '2px' }}
                  />
                  <span>{currentStep.hotspot.detail}</span>
                </div>
              )}
            </div>
          </div>

          {/* STEP NAVIGATION BUTTONS */}
          <div style={{ paddingTop: '18px', borderTop: '1px solid #f4f4f5', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={onPrev}
              disabled={currentStepIndex === 0}
              style={{
                flex: 1,
                height: '46px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '0 18px',
                borderRadius: '14px',
                border: currentStepIndex === 0 ? '1.5px solid #e4e4e7' : '1.5px solid #d4d4d8',
                background: currentStepIndex === 0 ? '#f4f4f5' : '#ffffff',
                fontSize: '14px',
                fontWeight: 800,
                color: currentStepIndex === 0 ? '#a1a1aa' : '#09090b',
                cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
                opacity: currentStepIndex === 0 ? 0.6 : 1,
                boxShadow: currentStepIndex === 0 ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.15s ease',
              }}
              className={currentStepIndex === 0 ? '' : 'hover:bg-zinc-50 hover:border-zinc-900 active:scale-98'}
            >
              <ChevronLeft size={17} strokeWidth={2.5} />
              <span>Prev Step</span>
            </button>

            <button
              onClick={handleNextOrFinish}
              style={{
                flex: 1,
                height: '46px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '0 18px',
                borderRadius: '14px',
                border: 'none',
                background: '#09090b',
                fontSize: '14px',
                fontWeight: 800,
                color: '#ffffff',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.15s ease',
              }}
              className="hover:bg-zinc-800 active:scale-98"
            >
              <span>{currentStepIndex === totalSteps - 1 ? 'Complete Setup' : 'Next Step'}</span>
              {currentStepIndex === totalSteps - 1 ? <CheckCircle2 size={17} strokeWidth={2.5} /> : <ChevronRight size={17} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: BROWSER TV SCREEN FRAME */}
        <div style={{ width: '100%', height: '100%' }}>
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '20px',
              border: '2px solid #27272a',
              background: '#09090b',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.22)',
              height: '100%',
              minHeight: '480px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* TOP ADDRESS BAR */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #27272a',
                background: '#18181b',
                padding: '10px 18px',
                flexShrink: 0,
              }}
            >
              {/* Left: Traffic Lights + Step Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                </div>

                {/* TV BAR STEP BADGE */}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '2px 9px',
                    borderRadius: '9999px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    letterSpacing: '0.02em',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                  <span>Step {currentStepIndex + 1} of {totalSteps}</span>
                </span>
              </div>

              {/* URL Pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '9999px',
                  background: '#09090b',
                  padding: '4px 20px',
                  fontSize: '11.5px',
                  fontFamily: 'monospace',
                  color: '#e4e4e7',
                  border: '1px solid #27272a',
                  minWidth: '240px',
                }}
              >
                <Lock size={12} color="#a1a1aa" style={{ marginRight: '6px' }} />
                <span style={{ fontWeight: 600 }}>{addressBarUrl}</span>
              </div>

              {/* ZOOM CONTROLS */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#27272a', padding: '2px 6px', borderRadius: '6px' }}>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  style={{ background: 'transparent', border: 'none', color: '#e4e4e7', cursor: 'pointer', padding: '4px', minWidth: '24px', minHeight: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut size={13} />
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  style={{ background: 'transparent', border: 'none', color: '#e4e4e7', cursor: 'pointer', padding: '4px', minWidth: '24px', minHeight: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn size={13} />
                </button>
              </div>
            </div>

            {/* SCREENSHOT CONTAINER WITH 4-LAYER INTERACTIVE HOTSPOT PIN */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                background: '#09090b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <AnimatePresence initial={false} mode="wait">
                {!showCompletionOverlay ? (
                  <motion.div
                    key={`${currentStepIndex}-${currentStep.image}`}
                    initial={false}
                    animate={{ opacity: 1, scale: zoomLevel / 100 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: 'absolute', inset: 0, transformOrigin: 'top center' }}
                  >
                    <img
                      src={currentStep.image}
                      alt={currentStep.title}
                      loading={currentStepIndex === 0 ? "eager" : "lazy"}
                      fetchpriority={currentStepIndex === 0 ? "high" : undefined}
                      decoding="async"
                      width="1280"
                      height="720"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    />
                  </motion.div>
                ) : (
                  /* COMPLETION OVERLAY (EXACT LIVE TELEVISION FINISH SCREEN) */
                  <motion.div
                    key="completion-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(ellipse at center, #18181b 0%, #09090b 100%)',
                      color: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '36px 24px',
                      textAlign: 'center',
                      zIndex: 40,
                    }}
                  >
                    {/* GLOWING EMERALD BADGE WITH PULSE RING */}
                    <div
                      style={{
                        position: 'relative',
                        width: '74px',
                        height: '74px',
                        borderRadius: '24px',
                        background: 'rgba(16, 185, 129, 0.12)',
                        border: '2px solid rgba(16, 185, 129, 0.45)',
                        boxShadow: '0 0 45px rgba(16, 185, 129, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <CheckCircle2 size={38} color="#10b981" />
                    </div>

                    {/* HEADLINE */}
                    <h2
                      style={{
                        fontSize: '26px',
                        fontWeight: 900,
                        color: '#ffffff',
                        letterSpacing: '-0.025em',
                        margin: '0 0 10px',
                      }}
                    >
                      Integration Setup Completed!
                    </h2>

                    {/* SUBTITLE */}
                    <p
                      style={{
                        fontSize: '13.5px',
                        color: '#a1a1aa',
                        maxWidth: '460px',
                        margin: '0 0 28px',
                        lineHeight: 1.6,
                        textAlign: 'center',
                      }}
                    >
                      You have successfully completed all{' '}
                      <span style={{ color: '#10b981', fontWeight: 800 }}>
                        {totalSteps} {totalSteps === 1 ? 'step' : 'steps'}
                      </span>{' '}
                      for <strong style={{ color: '#ffffff' }}>{providerName || 'Workflow Mitra'}</strong>.
                      <br />
                      Your credentials are ready to be used in Workflow Mitra.
                    </p>

                    {/* 3 ACTION BUTTONS ROW */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                      }}
                    >
                      {/* BUTTON 1: START TOUR AGAIN */}
                      <button
                        onClick={handleRestartTour}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '11px 20px',
                          borderRadius: '14px',
                          border: '1px solid #3f3f46',
                          background: 'rgba(39, 39, 42, 0.8)',
                          color: '#e4e4e7',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                        className="hover:bg-zinc-700 active:scale-95"
                      >
                        <RotateCcw size={15} color="#818cf8" />
                        <span>Start Tour Again</span>
                      </button>

                      {/* BUTTON 2: EXPLORE CREDENTIALS */}
                      <button
                        onClick={() => {
                          const el = document.getElementById('providers-grid')
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth' })
                          } else {
                            navigate('/credentials')
                          }
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '11px 20px',
                          borderRadius: '14px',
                          border: '1px solid rgba(129, 140, 248, 0.35)',
                          background: 'rgba(30, 27, 75, 0.65)',
                          color: '#c7d2fe',
                          fontSize: '13px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                        className="hover:bg-indigo-950/80 active:scale-95"
                      >
                        <KeyRound size={15} color="#fbbf24" />
                        <span>Explore Credentials</span>
                      </button>

                      {/* BUTTON 3: LAUNCH APP (GLOWING GREEN CTA) */}
                      <a
                        href={externalAppUrl || 'https://app.workflowmitra.com'}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '11px 24px',
                          borderRadius: '14px',
                          background: '#059669',
                          color: '#ffffff',
                          fontSize: '13px',
                          fontWeight: 900,
                          textDecoration: 'none',
                          boxShadow: '0 0 24px rgba(5, 150, 105, 0.45)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                        className="hover:bg-emerald-500 active:scale-95"
                      >
                        <Rocket size={15} />
                        <span>Launch App</span>
                      </a>
                    </div>

                    {/* SUB LINK: VIEW STEP SCREENSHOT */}
                    <button
                      onClick={() => setShowCompletionOverlay(false)}
                      style={{
                        marginTop: '22px',
                        background: 'transparent',
                        border: 'none',
                        color: '#71717a',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                        transition: 'color 0.15s ease',
                      }}
                      className="hover:text-zinc-300"
                    >
                      <Eye size={13} />
                      <span>View Step {totalSteps} Screenshot</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 4-LAYER INTERACTIVE HOTSPOT PIN (100% MATHEMATICALLY CONCENTRIC & CENTERED) */}
              {!showCompletionOverlay && currentStep.hotspot?.target === 'image' && currentStep.hotspot?.top && currentStep.hotspot?.left && (
                <div
                  key={`hotspot-step-${currentStepIndex + 1}`}
                  style={{
                    position: 'absolute',
                    top: currentStep.hotspot.top,
                    left: currentStep.hotspot.left,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 30,
                    cursor: 'pointer',
                    userSelect: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNextOrFinish()
                  }}
                  title={`Click to proceed (${currentStep.hotspot.title || currentStep.title})`}
                >
                  <motion.div
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '20px',
                      height: '20px',
                    }}
                    whileHover={{ scale: 1.3, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.85 }}
                  >
                    {/* 1. SOFT AMBIENT GLOW AURA (Concentric) */}
                    <span
                      style={{
                        position: 'absolute',
                        inset: '-10px',
                        borderRadius: '50%',
                        background: 'rgba(99, 102, 241, 0.35)',
                        filter: 'blur(6px)',
                        pointerEvents: 'none',
                      }}
                      className="wm-hotspot-glow"
                    />

                    {/* 2. SILKY EXPANDING RIPPLE WAVE (Concentric) */}
                    <span
                      style={{
                        position: 'absolute',
                        inset: '-12px',
                        borderRadius: '50%',
                        border: '1.5px solid rgba(99, 102, 241, 0.7)',
                        boxShadow: '0 0 10px rgba(99, 102, 241, 0.4)',
                        pointerEvents: 'none',
                      }}
                      className="wm-hotspot-ripple"
                    />

                    {/* 3. ROTATING ORBIT RING WITH SATELLITE PARTICLE (Concentric) */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: '-8px',
                        borderRadius: '50%',
                        border: '1px solid rgba(199, 210, 254, 0.5)',
                        pointerEvents: 'none',
                      }}
                      className="wm-hotspot-spin"
                    >
                      <span
                        style={{
                          position: 'absolute',
                          top: '-3px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          height: '6px',
                          width: '6px',
                          borderRadius: '50%',
                          background: '#ffffff',
                          boxShadow: '0 0 6px #ffffff',
                        }}
                      />
                    </div>

                    {/* 4. LUMINOUS GLASS PEARL PIN & NUCLEUS (Concentric) */}
                    <span
                      className="wm-hotspot-pulse"
                      style={{
                        position: 'relative',
                        display: 'flex',
                        height: '20px',
                        width: '20px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        background: '#4f46e5',
                        border: '2px solid #ffffff',
                        boxShadow: '0 0 14px rgba(99, 102, 241, 0.9), 0 4px 8px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      <span
                        style={{
                          height: '6px',
                          width: '6px',
                          borderRadius: '50%',
                          background: '#ffffff',
                          boxShadow: '0 0 6px #ffffff',
                          display: 'block',
                        }}
                      />
                    </span>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
