import React from 'react'
import { HelpCircle, MessageCircleQuestion, Sparkles, Search, Building2 } from 'lucide-react'
import { Openai, Slack, WhatsappIcon, Google, Claude } from './svgs'

const HERO_TAG_ICONS = {
  OpenAI: <Openai className="h-4 w-4 shrink-0" />,
  Slack: <Slack className="h-4 w-4 shrink-0" />,
  HubSpot: <Building2 className="h-4 w-4 shrink-0 text-orange-500" />,
  WhatsApp: <WhatsappIcon className="h-4 w-4 shrink-0" />,
  Google: <Google className="h-4 w-4 shrink-0" />,
  Claude: <Claude className="h-4 w-4 shrink-0" />,
}

const HERO_TAG_LABELS = {
  OpenAI: 'AI Agents & OpenAI',
  Slack: 'Slack Alerts',
  HubSpot: 'HubSpot CRM',
  WhatsApp: 'WhatsApp Cloud API',
  Google: 'Google Sheets',
  Claude: 'Claude AI',
}

const HERO_TAG_QUERIES = {
  OpenAI: 'OpenAI',
  Slack: 'Slack',
  HubSpot: 'HubSpot',
  WhatsApp: 'WhatsApp',
  Google: 'Google',
  Claude: 'Claude',
}

const ROW_1_TAGS = ['OpenAI', 'Slack', 'HubSpot', 'WhatsApp']
const ROW_2_TAGS = ['Google', 'Claude']

export function HeroSection({ onOpenSearch }) {
  return (
    <section id="tour-overview" className="wm-hero-section">
      <div className="wm-container-narrow" style={{ position: 'relative' }}>
        {/* Floating Question Mark Left Bubble */}
        <div
          className="wm-floating-bubble wm-floating-bubble-left"
          title="Need Help?"
        >
          <HelpCircle size={24} color="#0f172a" />
        </div>

        {/* Floating Speech Bubble Right */}
        <div
          className="wm-floating-bubble wm-floating-bubble-right"
          title="Ask a Question"
        >
          <MessageCircleQuestion size={24} color="#ffffff" />
        </div>

        {/* Value Badge */}
        <div className="wm-hero-badge">
          <Sparkles size={14} color="#f59e0b" />
          <span>Workflow Mitra Automation Help Center</span>
        </div>

        {/* Main Headline (Minor bold as requested) */}
        <h1 className="wm-hero-title">
          Hi, how can we help?
        </h1>

        <p className="wm-hero-desc">
          Search 100+ automation guides, AI agent nodes, webhook triggers, API credentials, and execution troubleshooting FAQs.
        </p>

        {/* High Performance Search Bar Trigger */}
        <button
          type="button"
          onClick={() => onOpenSearch?.()}
          className="wm-search-trigger"
        >
          <div className="wm-search-trigger-content">
            <Search size={18} color="#71717a" className="shrink-0" />
            <span className="wm-search-trigger-text">
              Search 40+ integrations, API keys, webhooks, or ask a question...
            </span>
          </div>

          <kbd className="wm-search-kbd">
            <span>Ctrl</span> K
          </kbd>
        </button>

        {/* Quick Category Badges in 2 Balanced Rows */}
        <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          {/* Row 1 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {ROW_1_TAGS.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => onOpenSearch?.(HERO_TAG_QUERIES[key])}
                className="wm-hero-tag-btn"
              >
                {HERO_TAG_ICONS[key]}
                <span>{HERO_TAG_LABELS[key]}</span>
              </button>
            ))}
          </div>

          {/* Row 2 (Google Sheets & Claude AI on bottom row) */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {ROW_2_TAGS.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => onOpenSearch?.(HERO_TAG_QUERIES[key])}
                className="wm-hero-tag-btn"
              >
                {HERO_TAG_ICONS[key]}
                <span>{HERO_TAG_LABELS[key]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
