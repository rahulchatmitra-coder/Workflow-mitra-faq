import React from 'react'
import { Link } from 'react-router-dom'
import FlowMitraLogo from './FlowMitraLogo'
import './Footer.css'

/* 100% Self-Contained Zero-Dependency Clean SVGs */
function IconGithub({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function IconDiscord({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

function IconLinkedin({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.69 1.69 0 1 0 0-3.38 1.69 1.69 0 0 0 0 3.38m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  )
}

function IconX({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function IconYoutube({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer id="main-footer" className="wm-ai-footer" role="contentinfo" aria-label="Site footer">
      <div className="wm-footer-container">

        {/* ─── MAIN FOOTER GRID: BRAND INFO (LEFT) + 4 LINK COLUMNS (RIGHT) ─── */}
        <div className="wm-footer-main-grid">
          
          {/* BRAND COLUMN */}
          <div className="wm-footer-brand-col">
            <Link to="/" className="wm-footer-brand-logo" aria-label="WorkflowMitra home">
              <FlowMitraLogo size="md" variant="full" />
            </Link>

            <p className="wm-footer-tagline">
              Automate without limits. Connect your apps, build AI-powered multi-step workflows, and execute operations 24/7 on autopilot.
            </p>

            {/* SOCIAL MEDIA CHANNELS */}
            <div className="wm-footer-socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="wm-social-btn" aria-label="GitHub">
                <IconGithub size={16} />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="wm-social-btn" aria-label="Discord">
                <IconDiscord size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="wm-social-btn" aria-label="LinkedIn">
                <IconLinkedin size={16} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="wm-social-btn" aria-label="X (Twitter)">
                <IconX size={15} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="wm-social-btn" aria-label="YouTube">
                <IconYoutube size={16} />
              </a>
            </div>
          </div>

          {/* 4 LINK COLUMNS */}
          <div className="wm-footer-links-grid">
            
            {/* COLUMN 1: PRODUCT */}
            <div className="wm-footer-col">
              <h3 className="wm-col-title">Product</h3>
              <ul className="wm-col-list">
                <li><Link to="/#workflow-showcase">AI Agents Engine</Link></li>
                <li><Link to="/#how-it-works">Visual Workflow Builder</Link></li>
                <li><Link to="/integrations">37+ App Connectors</Link></li>
                <li><Link to="/templates">Workflow Templates <span className="wm-link-pill">100+</span></Link></li>
                <li><Link to="/pricing">Pricing &amp; Plans</Link></li>
                <li><a href="https://app.workflowmitra.com/signup" target="_blank" rel="noopener noreferrer">Free Trial</a></li>
              </ul>
            </div>

            {/* COLUMN 2: SOLUTIONS */}
            <div className="wm-footer-col">
              <h3 className="wm-col-title">Solutions</h3>
              <ul className="wm-col-list">
                <li><Link to="/solutions/sales">Lead Qualification &amp; CRM</Link></li>
                <li><Link to="/solutions/support">Customer Support AI Triage</Link></li>
                <li><Link to="/solutions/operations">E-Commerce Orders &amp; Invoices</Link></li>
                <li><Link to="/solutions/marketing">Marketing &amp; Growth Ops</Link></li>
                <li><Link to="/solutions/engineering">API Webhooks &amp; Data Sync</Link></li>
                <li><Link to="/contact">Custom AI Solutions</Link></li>
              </ul>
            </div>

            {/* COLUMN 3: RESOURCES */}
            <div className="wm-footer-col">
              <h3 className="wm-col-title">Resources</h3>
              <ul className="wm-col-list">
                <li><Link to="/credentials">Documentation Hub</Link></li>
                <li><Link to="/how-to-create-account-workflowmitra">Account Setup Guide</Link></li>
                <li><Link to="/credentials">API Credentials Vault</Link></li>
                <li><Link to="/credentials/whatsapp">WhatsApp Automation Guide</Link></li>
                <li><Link to="/solutions">Use Cases Catalog</Link></li>
                <li><Link to="/contact">Talk to an Automation Expert</Link></li>
              </ul>
            </div>

            {/* COLUMN 4: COMPANY & LEGAL */}
            <div className="wm-footer-col">
              <h3 className="wm-col-title">Company</h3>
              <ul className="wm-col-list">
                <li><Link to="/about">About WorkflowMitra</Link></li>
                <li><Link to="/contact">Contact &amp; Support</Link></li>
                <li><Link to="/about">Careers <span className="wm-link-pill wm-hiring-pill">Hiring</span></Link></li>
                <li><Link to="/pricing">Enterprise &amp; Security</Link></li>
                <li><Link to="/privacy">Privacy &amp; GDPR</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>

          </div>

        </div>

        <div className="wm-footer-divider" />

        {/* ─── BOTTOM SECTION: LEGAL STRIP + COPYRIGHT ─── */}
        <div className="wm-footer-bottom-bar">
          <div className="wm-footer-legal-links">
            <Link to="/privacy">Security</Link>
            <span className="wm-legal-dot">·</span>
            <Link to="/privacy">Privacy Policy</Link>
            <span className="wm-legal-dot">·</span>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <span className="wm-legal-dot">·</span>
            <button
              type="button"
              className="wm-cookie-settings-btn"
              onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-settings'))}
            >
              Cookie Settings
            </button>
            <span className="wm-legal-dot">·</span>
            <Link to="/contact">Report Vulnerability</Link>
          </div>

          <div className="wm-footer-copyright">
            <span>&copy; {new Date().getFullYear()} WorkflowMitra Inc. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
