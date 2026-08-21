import { useState } from 'react'
import {
  Sparkles,
  Zap,
  Check,
  Search,
  Plus,
  Pencil,
  Play,
  Bell,
  Settings,
  ChevronDown,
  Users,
  PieChart,
  MessageSquare,
  Megaphone,
  Database,
  Sliders,
  FileText,
  ArrowRight,
} from 'lucide-react'
import {
  Slack,
  GmailLogo,
  HubSpotLogo,
  WhatsappIcon,
  ShopifyLogo,
  GoogleSheetsLogo,
  ZoomLogo,
} from './ui/svgs'
import { SiNotion } from 'react-icons/si'
import { FaSalesforce } from 'react-icons/fa'
import './VisualAdaptSpeedSection.css'

const WORKFLOW_ITEMS = [
  { id: 'lead', name: 'Lead Automation', icon: Megaphone },
  { id: 'support', name: 'Customer Support', icon: MessageSquare },
  { id: 'marketing', name: 'Marketing', icon: Megaphone },
  { id: 'sales', name: 'Sales Follow-up', icon: Users },
  { id: 'data', name: 'Data Sync', icon: Database },
  { id: 'ops', name: 'Operations', icon: Sliders },
]

const INTEGRATIONS_GRID = [
  { name: 'Gmail', icon: <GmailLogo className="wm-int-icon" /> },
  { name: 'Slack', icon: <Slack className="wm-int-icon" /> },
  { name: 'WhatsApp', icon: <WhatsappIcon className="wm-int-icon" /> },
  { name: 'HubSpot', icon: <HubSpotLogo className="wm-int-icon" /> },
  { name: 'Shopify', icon: <ShopifyLogo className="wm-int-icon" /> },
  { name: 'Notion', icon: <SiNotion className="wm-int-icon text-black" size={24} /> },
  { name: 'Salesforce', icon: <FaSalesforce className="wm-int-icon text-[#00A1E0]" size={24} /> },
  { name: 'Zoom', icon: <ZoomLogo className="wm-int-icon" /> },
  { name: 'Google Sheets', icon: <GoogleSheetsLogo className="wm-int-icon" /> },
]

const RECENT_RUNS = [
  { name: 'Lead Automation', time: '2 mins ago', status: 'Success', icon: Megaphone },
  { name: 'Customer Support', time: '5 mins ago', status: 'Success', icon: MessageSquare },
  { name: 'Marketing Campaign', time: '12 mins ago', status: 'Running', icon: Megaphone },
  { name: 'Data Sync', time: '1 hour ago', status: 'Success', icon: Database },
]

export default function VisualAdaptSpeedSection() {
  const [activeWorkflow, setActiveWorkflow] = useState('lead')
  const [isActiveToggle, setIsActiveToggle] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isRunningTest, setIsRunningTest] = useState(false)

  const handleRunTest = () => {
    setIsRunningTest(true)
    setTimeout(() => {
      setIsRunningTest(false)
    }, 2000)
  }

  const filteredWorkflows = WORKFLOW_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section
      className="wm-section2-root"
      id="connect-apps-workflow"
      aria-label="Connect Your Apps. Let AI Do The Work."
    >
      <div className="wm-section2-container">
        
        {/* Floating Decorative App Badges in Background Header Area */}
        <div className="wm-decor-floating-apps" aria-hidden="true">
          <div className="wm-floating-tile wm-float-gmail" title="Gmail">
            <GmailLogo className="wm-float-logo" />
          </div>
          <div className="wm-floating-tile wm-float-slack" title="Slack">
            <Slack className="wm-float-logo" />
          </div>
          <div className="wm-floating-tile wm-float-whatsapp" title="WhatsApp">
            <WhatsappIcon className="wm-float-logo" />
          </div>
          <div className="wm-floating-tile wm-float-hubspot" title="HubSpot">
            <HubSpotLogo className="wm-float-logo" />
          </div>
          <div className="wm-floating-tile wm-float-shopify" title="Shopify">
            <ShopifyLogo className="wm-float-logo" />
          </div>
          <div className="wm-floating-tile wm-float-notion" title="Notion">
            <SiNotion className="wm-float-logo text-black" size={26} />
          </div>
        </div>

        {/* Section Top Header */}
        <div className="wm-section2-header">
          <div className="wm-eyebrow-badge">
            <Zap size={14} className="wm-eyebrow-icon" />
            <span>POWERFUL AI AUTOMATION</span>
          </div>

          <h2 className="wm-main-heading">
            Connect Your Apps.
            <br />
            Let AI Do The Work.
          </h2>

          <p className="wm-main-subtext">
            Build intelligent workflows that understand your business, make decisions,
            and take action automatically — without writing code.
          </p>
        </div>

        {/* Main Workflow Product UI Canvas Window */}
        <div className="wm-product-window">
          
          {/* Top Bar of the Product Interface */}
          <div className="wm-product-topbar">
            {/* Left Brand Identity */}
            <div className="wm-topbar-brand">
              <div className="wm-brand-icon-box">
                <span className="wm-brand-u">U</span>
              </div>
              <span className="wm-brand-name">WorkflowMitra</span>
            </div>

            {/* Center Navigation Tabs */}
            <div className="wm-topbar-tabs" role="tablist">
              <button type="button" className="wm-tab-item active" role="tab" aria-selected="true">
                My Workflows
              </button>
              <button type="button" className="wm-tab-item" role="tab" aria-selected="false">
                Templates
              </button>
              <button type="button" className="wm-tab-item" role="tab" aria-selected="false">
                Integrations
              </button>
              <button type="button" className="wm-tab-item" role="tab" aria-selected="false">
                AI Agents
              </button>
            </div>

            {/* Right User & Settings Actions */}
            <div className="wm-topbar-actions">
              <button type="button" className="wm-icon-btn" aria-label="Notifications">
                <Bell size={16} />
                <span className="wm-notif-dot" />
              </button>
              <button type="button" className="wm-icon-btn" aria-label="Settings">
                <Settings size={16} />
              </button>
              <div className="wm-user-pill">
                <div className="wm-user-avatar">S</div>
                <span className="wm-user-name">Save John</span>
                <ChevronDown size={14} className="wm-user-chevron" />
              </div>
            </div>
          </div>

          {/* Product Body: 3-Column SaaS Layout */}
          <div className="wm-product-body">
            
            {/* 1. Left Sidebar */}
            <aside className="wm-sidebar-col">
              <div className="wm-sidebar-top">
                <div className="wm-sidebar-heading-row">
                  <h3 className="wm-sidebar-title">My Workflows</h3>
                  <button type="button" className="wm-add-btn" aria-label="Create workflow">
                    <Plus size={14} />
                  </button>
                </div>

                {/* Search Bar */}
                <div className="wm-sidebar-search">
                  <Search size={14} className="wm-search-icon" />
                  <input
                    type="text"
                    placeholder="Search workflows..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="wm-search-input"
                  />
                </div>

                {/* Workflow List Items */}
                <nav className="wm-workflow-nav" aria-label="Workflow list">
                  {filteredWorkflows.map((item) => {
                    const IconComp = item.icon
                    const isSelected = activeWorkflow === item.id
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`wm-workflow-item ${isSelected ? 'active' : ''}`}
                        onClick={() => setActiveWorkflow(item.id)}
                      >
                        <IconComp size={16} className="wm-item-icon" />
                        <span className="wm-item-text">{item.name}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* Bottom CTA Card */}
              <div className="wm-sidebar-cta-card">
                <div className="wm-cta-sparkle-row">
                  <Sparkles size={16} className="wm-cta-sparkle-icon" />
                  <p className="wm-cta-title">Create Your First AI Workflow</p>
                </div>
                <a
                  href="https://app.workflowmitra.com/signup"
                  className="wm-sidebar-cta-btn"
                >
                  <span>Get Started</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </aside>

            {/* 2. Main Workflow Canvas Area */}
            <main className="wm-canvas-col">
              
              {/* Canvas Top Bar */}
              <div className="wm-canvas-topbar">
                <div className="wm-canvas-title-group">
                  <div className="wm-canvas-title-row">
                    <h3 className="wm-canvas-title">Lead Automation Workflow</h3>
                    <button type="button" className="wm-title-edit-btn" aria-label="Edit title">
                      <Pencil size={13} />
                    </button>
                  </div>
                  <p className="wm-canvas-desc">
                    Qualify leads, update CRM and send personalized follow-ups automatically
                  </p>
                </div>

                {/* Canvas Controls */}
                <div className="wm-canvas-controls">
                  <div className="wm-toggle-wrapper">
                    <span className="wm-toggle-label">Active</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isActiveToggle}
                      className={`wm-switch-pill ${isActiveToggle ? 'on' : 'off'}`}
                      onClick={() => setIsActiveToggle(!isActiveToggle)}
                    >
                      <span className="wm-switch-thumb" />
                    </button>
                  </div>

                  <button type="button" className="wm-ctrl-btn wm-btn-save">
                    Save
                  </button>

                  <button
                    type="button"
                    className={`wm-ctrl-btn wm-btn-run ${isRunningTest ? 'running' : ''}`}
                    onClick={handleRunTest}
                  >
                    <Play size={11} className="wm-play-icon" />
                    <span>{isRunningTest ? 'Running...' : 'Run Test'}</span>
                  </button>
                </div>
              </div>

              {/* Workflow Interactive Node Canvas */}
              <div className="wm-nodes-canvas">
                
                {/* Node Grid Layout */}
                <div className="wm-nodes-layout">
                  
                  {/* Top Row: Trigger + Connector + AI + Fork Connector + Actions Stack */}
                  <div className="wm-nodes-horizontal-row">
                    
                    {/* NODE 1 — TRIGGER */}
                    <div className="wm-node-card wm-node-trigger">
                      <div className="wm-trigger-icon-box">
                        <FileText size={20} className="wm-trigger-icon" />
                      </div>
                      <h4 className="wm-node-title">New Lead Received</h4>
                      <p className="wm-node-subtitle">Website Form</p>
                      <span className="wm-node-badge wm-badge-trigger">Trigger</span>
                    </div>

                    {/* Connector: Trigger -> AI */}
                    <div className="wm-wire-connector wm-wire-trigger-ai" aria-hidden="true">
                      <svg width="36" height="10" viewBox="0 0 36 10" fill="none">
                        <line x1="0" y1="5" x2="36" y2="5" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>

                    {/* NODE 2 — AI AGENT (Visual Centerpiece) */}
                    <div className={`wm-node-card wm-node-ai ${isRunningTest ? 'wm-ai-pulsing' : ''}`}>
                      <div className="wm-ai-header">
                        <div className="wm-ai-sparkle-disc">
                          <Sparkles size={16} className="wm-ai-sparkle-icon" />
                        </div>
                        <div className="wm-ai-titles">
                          <h4 className="wm-node-title wm-ai-title">AI WorkflowMitra</h4>
                          <p className="wm-node-subtitle wm-ai-subtitle">AI Agent – Lead Qualifier</p>
                        </div>
                      </div>

                      <div className="wm-ai-checklist">
                        <div className="wm-check-row">
                          <Check size={13} className="wm-check-green" />
                          <span>Analyzing lead...</span>
                        </div>
                        <div className="wm-check-row">
                          <Check size={13} className="wm-check-green" />
                          <span>Checking intent...</span>
                        </div>
                        <div className="wm-check-row">
                          <Check size={13} className="wm-check-green" />
                          <span>Scoring lead...</span>
                        </div>
                        <div className="wm-check-row">
                          <Check size={13} className="wm-check-green" />
                          <span>Qualified lead</span>
                        </div>
                      </div>
                    </div>

                    {/* Fork Connector: AI -> Actions */}
                    <div className="wm-wire-connector wm-wire-fork" aria-hidden="true">
                      <svg width="40" height="150" viewBox="0 0 40 150" fill="none">
                        <path d="M 0 75 C 20 75, 20 30, 40 30" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 0 75 C 20 75, 20 120, 40 120" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>

                    {/* Right Stack: CRM & Email Action Nodes */}
                    <div className="wm-actions-stack">
                      {/* NODE 3 — CRM ACTION */}
                      <div className="wm-node-card wm-node-action">
                        <div className="wm-action-logo-box">
                          <HubSpotLogo className="wm-action-logo" />
                        </div>
                        <div className="wm-action-content">
                          <h4 className="wm-node-title">Update CRM</h4>
                          <p className="wm-node-subtitle">Automatically create &amp; update contact</p>
                          <span className="wm-node-badge wm-badge-action">Action</span>
                        </div>
                      </div>

                      {/* NODE 4 — EMAIL ACTION */}
                      <div className="wm-node-card wm-node-action">
                        <div className="wm-action-logo-box">
                          <GmailLogo className="wm-action-logo" />
                        </div>
                        <div className="wm-action-content">
                          <h4 className="wm-node-title">Send Personalized Email</h4>
                          <p className="wm-node-subtitle">AI-generated follow-up</p>
                          <span className="wm-node-badge wm-badge-action">Action</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Vertical Connector: AI -> Slack */}
                  <div className="wm-wire-vertical-ai-slack" aria-hidden="true">
                    <span className="wm-v-line" />
                  </div>

                  {/* Bottom Row: Slack Notification Node */}
                  <div className="wm-nodes-bottom-row">
                    {/* NODE 5 — NOTIFICATION */}
                    <div className="wm-node-card wm-node-action wm-node-slack">
                      <div className="wm-action-logo-box">
                        <Slack className="wm-action-logo" />
                      </div>
                      <div className="wm-action-content">
                        <h4 className="wm-node-title">Notify Sales Team</h4>
                        <p className="wm-node-subtitle">New qualified lead in Slack</p>
                        <span className="wm-node-badge wm-badge-action">Action</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Workflow Statistics Bar */}
              <div className="wm-canvas-stats-bar">
                <div className="wm-stat-item">
                  <div className="wm-stat-icon-disc">
                    <Users size={15} color="#7c3aed" />
                  </div>
                  <div className="wm-stat-text">
                    <span className="wm-stat-num">1,248</span>
                    <span className="wm-stat-lbl">Active Workflows</span>
                  </div>
                </div>

                <div className="wm-stat-item">
                  <div className="wm-stat-icon-disc">
                    <Zap size={15} color="#7c3aed" />
                  </div>
                  <div className="wm-stat-text">
                    <span className="wm-stat-num">89,432</span>
                    <span className="wm-stat-lbl">Tasks Automated</span>
                  </div>
                </div>

                <div className="wm-stat-item">
                  <div className="wm-stat-icon-disc">
                    <PieChart size={15} color="#7c3aed" />
                  </div>
                  <div className="wm-stat-text">
                    <span className="wm-stat-num">98%</span>
                    <span className="wm-stat-lbl">Success Rate</span>
                  </div>
                </div>
              </div>

            </main>

            {/* 3. Right Integrations & Recent Activity Panel */}
            <aside className="wm-integrations-col">
              
              {/* Available Integrations Box */}
              <div className="wm-panel-section">
                <div className="wm-panel-header">
                  <h3 className="wm-panel-title">Available Integrations</h3>
                  <a href="/integrations" className="wm-panel-link">
                    View All →
                  </a>
                </div>

                <div className="wm-int-grid">
                  {INTEGRATIONS_GRID.map((app, idx) => (
                    <div key={idx} className="wm-int-item" title={app.name}>
                      <div className="wm-int-icon-box">
                        {app.icon}
                      </div>
                      <span className="wm-int-label">{app.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Runs Box */}
              <div className="wm-panel-section wm-runs-section">
                <div className="wm-panel-header">
                  <h3 className="wm-panel-title">Recent Runs</h3>
                  <a href="/integrations" className="wm-panel-link">
                    View All →
                  </a>
                </div>

                <div className="wm-runs-list">
                  {RECENT_RUNS.map((run, idx) => {
                    const RunIcon = run.icon
                    const isSuccess = run.status === 'Success'
                    return (
                      <div key={idx} className="wm-run-row">
                        <div className="wm-run-icon-disc">
                          <RunIcon size={14} color="#6366f1" />
                        </div>
                        <div className="wm-run-details">
                          <span className="wm-run-name">{run.name}</span>
                          <span className="wm-run-time">{run.time}</span>
                        </div>
                        <span className={`wm-run-badge ${isSuccess ? 'success' : 'running'}`}>
                          {run.status}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

            </aside>

          </div>
        </div>

      </div>
    </section>
  )
}
