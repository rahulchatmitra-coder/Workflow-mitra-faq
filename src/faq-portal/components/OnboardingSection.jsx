import React from 'react'
import { motion } from 'framer-motion'
import { ClipboardList, ChevronRight, KeyRound, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export function OnboardingSection() {
  const providerCount = 37

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '64px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      {/* SECTION HEADER */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '9999px',
            padding: '5px 16px',
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            background: '#f4f4f5',
            border: '1px solid #e4e4e7',
            color: '#09090b',
            marginBottom: '12px',
          }}
        >
          <Sparkles size={13} color="#09090b" />
          <span>Documentation Hub</span>
        </div>

        <h2
          style={{
            fontSize: '34px',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: '#09090b',
            margin: '0 0 10px',
            lineHeight: 1.2,
          }}
        >
          Getting Started & Integration Guides
        </h2>

        <p
          style={{
            fontSize: '15px',
            color: '#71717a',
            lineHeight: 1.6,
            margin: 0,
            fontWeight: 500,
          }}
        >
          Explore complete walkthroughs for account setup and the {providerCount}+ third-party credentials vault.
        </p>
      </div>

      {/* 2 CLEAN GRID BOXES */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {/* BOX 1: ONBOARDING CATEGORY BOX */}
        <div
          style={{
            borderRadius: '20px',
            border: '2px solid #e4e4e7',
            background: '#ffffff',
            padding: '28px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
          }}
          className="wm-simple-guide-card"
        >
          <div>
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                paddingBottom: '16px',
                borderBottom: '1px solid #f4f4f5',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: '#f4f4f5',
                  border: '1px solid #e4e4e7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#09090b',
                  flexShrink: 0,
                }}
              >
                <ClipboardList size={22} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#09090b',
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  Account Setup & Tour
                </h3>
                <p
                  style={{
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#71717a',
                    margin: '3px 0 0',
                  }}
                >
                  Essential First Steps
                </p>
              </div>
            </div>

            {/* Sub-label */}
            <p
              style={{
                fontSize: '11px',
                color: '#a1a1aa',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                margin: '18px 0 12px',
              }}
            >
              2 Interactive Setup Steps
            </p>

            {/* Clean Links List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link
                to="/how-to-create-account-workflowmitra"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#3f3f46',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                }}
                className="wm-guide-link"
              >
                <span style={{ lineHeight: 1.4 }}>How to create your account & workspace?</span>
                <ChevronRight size={16} color="#a1a1aa" className="wm-guide-arrow" style={{ flexShrink: 0, marginLeft: '8px', transition: 'transform 0.15s ease' }} />
              </Link>

              <Link
                to="/how-to-create-account-workflowmitra"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#3f3f46',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                }}
                className="wm-guide-link"
              >
                <span style={{ lineHeight: 1.4 }}>How to log in & navigate the dashboard?</span>
                <ChevronRight size={16} color="#a1a1aa" className="wm-guide-arrow" style={{ flexShrink: 0, marginLeft: '8px', transition: 'transform 0.15s ease' }} />
              </Link>
            </div>
          </div>

          {/* Bottom Action Link */}
          <Link
            to="/how-to-create-account-workflowmitra"
            style={{
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px solid #f4f4f5',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#09090b',
              textDecoration: 'none',
              transition: 'opacity 0.15s ease',
            }}
            className="hover:opacity-80"
          >
            <span>Open Account Setup Guide</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* BOX 2: 37+ CREDENTIALS & INTEGRATIONS BOX */}
        <div
          style={{
            borderRadius: '20px',
            border: '2px solid #e4e4e7',
            background: '#ffffff',
            padding: '28px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
          }}
          className="wm-simple-guide-card"
        >
          {/* Top-Right Badge */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              padding: '3px 10px',
              borderRadius: '9999px',
              fontSize: '10.5px',
              fontWeight: 900,
              background: '#09090b',
              color: '#ffffff',
            }}
          >
            {providerCount}+ Providers
          </div>

          <div>
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                paddingBottom: '16px',
                borderBottom: '1px solid #f4f4f5',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: '#f4f4f5',
                  border: '1px solid #e4e4e7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#09090b',
                  flexShrink: 0,
                }}
              >
                <KeyRound size={22} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#09090b',
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  Integrations & Credentials
                </h3>
                <p
                  style={{
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#71717a',
                    margin: '3px 0 0',
                  }}
                >
                  Secure API Key Vault
                </p>
              </div>
            </div>

            {/* Sub-label */}
            <p
              style={{
                fontSize: '11px',
                color: '#a1a1aa',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                margin: '18px 0 12px',
              }}
            >
              {providerCount}+ Connected Services
            </p>

            {/* Clean Links List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link
                to="/credentials"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#3f3f46',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                }}
                className="wm-guide-link"
              >
                <span style={{ lineHeight: 1.4 }}>How to connect & manage API credentials?</span>
                <ChevronRight size={16} color="#a1a1aa" className="wm-guide-arrow" style={{ flexShrink: 0, marginLeft: '8px', transition: 'transform 0.15s ease' }} />
              </Link>

              <Link
                to="/credentials/whatsapp"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#3f3f46',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                }}
                className="wm-guide-link"
              >
                <span style={{ lineHeight: 1.4 }}>WhatsApp (Meta, ChatMitra, AiSensy, WATI)</span>
                <ChevronRight size={16} color="#a1a1aa" className="wm-guide-arrow" style={{ flexShrink: 0, marginLeft: '8px', transition: 'transform 0.15s ease' }} />
              </Link>

              <Link
                to="/credentials"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#3f3f46',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                }}
                className="wm-guide-link"
              >
                <span style={{ lineHeight: 1.4 }}>OpenAI, Claude, HubSpot, Shopify & Zoom</span>
                <ChevronRight size={16} color="#a1a1aa" className="wm-guide-arrow" style={{ flexShrink: 0, marginLeft: '8px', transition: 'transform 0.15s ease' }} />
              </Link>
            </div>
          </div>

          {/* Bottom Action Link */}
          <Link
            to="/credentials"
            style={{
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px solid #f4f4f5',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#09090b',
              textDecoration: 'none',
              transition: 'opacity 0.15s ease',
            }}
            className="hover:opacity-80"
          >
            <span>Explore {providerCount}+ Integrations Guide</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
