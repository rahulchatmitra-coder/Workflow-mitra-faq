import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  KeyRound,
  UserPlus,
  Zap,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { PROVIDER_LIST } from './credentials-data'
import './OnboardingSection.css'

export default function OnboardingSection() {
  const providerCount = PROVIDER_LIST?.length || 37

  return (
    <section className="wm-doc-hub-section" id="documentation-hub">
      <div className="wm-doc-hub-container">
        
        {/* SECTION HEADER (CLEAN SOLID THEME) */}
        <div className="wm-doc-hub-header">
          <h2 className="wm-doc-hub-title">
            Learn Workflow Mitra in Minutes
          </h2>
          <p className="wm-doc-hub-subtitle">
            Explore our interactive visual guides to create your account, connect API credentials, and automate workflows.
          </p>
        </div>

        {/* 3-COLUMN CARDS GRID */}
        <div className="wm-doc-hub-grid">
          
          {/* CARD 1: ACCOUNT REGISTRATION */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="wm-doc-hub-card"
          >
            <div className="wm-doc-corner-badge">
              5 Steps Guide
            </div>

            <div>
              <div className="wm-doc-card-top">
                <div className="wm-doc-icon-box">
                  <UserPlus size={22} color="#09090b" />
                </div>
                <div>
                  <h3 className="wm-doc-card-title">
                    Account Registration
                  </h3>
                  <p className="wm-doc-card-sub">
                    Step-by-step Setup
                  </p>
                </div>
              </div>

              <div className="wm-doc-category-tag">
                Getting Started
              </div>

              <div className="wm-doc-links-list">
                <Link
                  to="/how-to-create-account-workflowmitra"
                  className="wm-doc-link-item"
                >
                  <span>How to create an account in Workflow Mitra?</span>
                  <ChevronRight size={15} />
                </Link>
                <Link
                  to="/how-to-create-account-workflowmitra"
                  className="wm-doc-link-item"
                >
                  <span>Email verification &amp; Workspace setup</span>
                  <ChevronRight size={15} />
                </Link>
                <Link
                  to="/how-to-create-account-workflowmitra"
                  className="wm-doc-link-item"
                >
                  <span>Access your automation dashboard</span>
                  <ChevronRight size={15} />
                </Link>
              </div>
            </div>

            <Link
              to="/how-to-create-account-workflowmitra"
              className="wm-doc-bottom-cta"
            >
              <span>Start Account Setup Guide</span>
              <ChevronRight size={14} />
            </Link>
          </motion.div>

          {/* CARD 2: INTEGRATIONS & CREDENTIALS */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="wm-doc-hub-card"
          >
            <div className="wm-doc-corner-badge">
              {providerCount}+ Providers
            </div>

            <div>
              <div className="wm-doc-card-top">
                <div className="wm-doc-icon-box">
                  <KeyRound size={22} color="#09090b" />
                </div>
                <div>
                  <h3 className="wm-doc-card-title">
                    Integrations &amp; Credentials
                  </h3>
                  <p className="wm-doc-card-sub">
                    Secure API Key Vault
                  </p>
                </div>
              </div>

              <div className="wm-doc-category-tag">
                {providerCount}+ Connected Services
              </div>

              <div className="wm-doc-links-list">
                <Link
                  to="/credentials"
                  className="wm-doc-link-item"
                >
                  <span>How to connect &amp; manage API credentials?</span>
                  <ChevronRight size={15} />
                </Link>
                <Link
                  to="/credentials/whatsapp"
                  className="wm-doc-link-item"
                >
                  <span>WhatsApp (Meta, ChatMitra, AiSensy, WATI)</span>
                  <ChevronRight size={15} />
                </Link>
                <Link
                  to="/credentials"
                  className="wm-doc-link-item"
                >
                  <span>OpenAI, Claude, HubSpot, Shopify &amp; Zoom</span>
                  <ChevronRight size={15} />
                </Link>
              </div>
            </div>

            <Link
              to="/credentials"
              className="wm-doc-bottom-cta"
            >
              <span>Explore {providerCount}+ Integrations Guide</span>
              <ChevronRight size={14} />
            </Link>
          </motion.div>

          {/* CARD 3: WORKFLOW MITRA SUPPORT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="wm-doc-hub-card"
          >
            <div className="wm-doc-corner-badge">
              Instant Help
            </div>

            <div>
              <div className="wm-doc-card-top">
                <div className="wm-doc-icon-box">
                  <Zap size={22} color="#09090b" />
                </div>
                <div>
                  <h3 className="wm-doc-card-title">
                    Workflow Mitra Support
                  </h3>
                  <p className="wm-doc-card-sub">
                    Automation &amp; AI Assistance
                  </p>
                </div>
              </div>

              <div className="wm-doc-category-tag">
                Resources &amp; Support
              </div>

              <div className="wm-doc-links-list">
                <Link
                  to="/templates"
                  className="wm-doc-link-item"
                >
                  <span>Browse 100+ pre-built workflow templates</span>
                  <ChevronRight size={15} />
                </Link>
                <Link
                  to="/solutions"
                  className="wm-doc-link-item"
                >
                  <span>Solutions for Sales, Marketing &amp; Support</span>
                  <ChevronRight size={15} />
                </Link>
                <Link
                  to="/contact"
                  className="wm-doc-link-item"
                >
                  <span>Need custom workflow setup? Talk to an expert</span>
                  <ChevronRight size={15} />
                </Link>
              </div>
            </div>

            <Link
              to="/templates"
              className="wm-doc-bottom-cta"
            >
              <span>Explore All Templates</span>
              <ChevronRight size={14} />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
