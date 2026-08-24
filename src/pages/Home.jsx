import { lazy, Suspense, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HeroAnimated from '../components/HeroAnimated'
import EnterpriseScaleSection from '../components/EnterpriseScaleSection'
import IntegrationsShowcase from '../components/IntegrationsShowcase'
import NodeChain from '../components/NodeChain'
import DeferredHomeSection from '../components/DeferredHomeSection'
import PageSeo from '../components/PageSeo'
import { Sparkles, ArrowRight, CheckCircle2, Zap, Users, CreditCard, Layers, Bot, Play, XCircle, Clock, AlertCircle, ChevronRight, ChevronDown, TrendingUp, Headphones, ShoppingBag, MousePointerClick, Coins, Cpu, Network, HelpCircle, MessageCircle, Sliders, ShieldCheck } from 'lucide-react'
import { SiZapier, SiMake, SiN8N } from 'react-icons/si'
import RollButton from '../components/RollButton'
import './Home.css'

import AgentsShowcase from '../components/AgentsShowcase'
const AIAgentsFeatureSection = lazy(() => import('../components/AIAgentsFeatureSection'))
const DarkAIIntegrationsSection = lazy(() => import('../components/DarkAIIntegrationsSection'))
const OnboardingSection = lazy(() => import('../credentials-portal/OnboardingSection'))
const TestimonialSlider = lazy(() => import('../components/TestimonialSlider'))

const TEMPLATES = [
  {
    id: 6,
    category: 'Lead capture',
    title: 'Lead → WhatsApp in 5 seconds',
    description: 'A form submission is categorised by AI, saved to HubSpot, answered on WhatsApp, then handed to the next salesperson in the rota.',
    chain: ['webhook-trigger', 'ai', 'hubspot', 'whatsapp'],
    steps: 5,
  },
  {
    id: 2,
    category: 'E-commerce',
    title: 'Paid order → invoice → WhatsApp',
    description: 'A paid Shopify order raises a Zoho Books invoice, confirms on WhatsApp, books the shipment and logs the order to a sheet.',
    chain: ['shopify', 'zoho', 'whatsapp', 'google-sheets'],
    steps: 5,
  },
  {
    id: 4,
    category: 'AI',
    title: 'AI drafts, you approve',
    description: 'Incoming support emails are read by an AI, a drafted response is generated, and a notification is sent to Slack with an Approve button.',
    chain: ['email', 'ai', 'slack', 'gmail'],
    steps: 4,
  },
  {
    id: 1,
    category: 'Lead capture',
    title: 'Facebook Ads → CRM + SMS',
    description: 'New leads from Facebook Lead Ads are validated, added to your CRM, and sent a personalised welcome SMS within 60 seconds.',
    chain: ['facebook', 'hubspot', 'sms'],
    steps: 3,
  },
  {
    id: 3,
    category: 'E-commerce',
    title: 'Abandoned cart recovery',
    description: 'When a cart is abandoned for 1 hour, check if the customer has purchased before, then send a personalised WhatsApp message with a dynamic discount code.',
    chain: ['shopify', 'condition', 'whatsapp'],
    steps: 4,
  },
  {
    id: 5,
    category: 'Internal ops',
    title: 'Google Sheets to database sync',
    description: 'Every night, read new rows from a shared Google Sheet, validate the data, transform formats, and upsert into PostgreSQL.',
    chain: ['schedule', 'google-sheets', 'database'],
    steps: 3,
  },
]

const HOW_STEPS = [
  { num: '1', title: 'Choose what starts your workflow', desc: 'Pick a trigger — a form submission, a new order, a scheduled time, or a webhook from any app.' },
  { num: '2', title: 'Add the actions you need', desc: 'Tell WorkflowMitra what to do: send a message, update a record, call an API, run an AI step, or add conditions.' },
  { num: '3', title: 'Connect your apps', desc: 'Link the tools your business already uses — CRM, messaging, spreadsheets, payment gateways, and more.' },
  { num: '4', title: 'Test before you go live', desc: 'Run the workflow once to verify every step works. Fix anything before it handles real data.' },
  { num: '5', title: 'Turn it on and walk away', desc: 'The workflow runs automatically whenever the trigger fires. You get back the hours you used to spend on repetitive work.' },
]

const BEFORE_STEPS = [
  { step: '01', title: '1. Build lead spreadsheet', desc: 'Manually gather lead details and meticulously organize them into structured rows and columns in a spreadsheet.', tag: 'Hours' },
  { step: '02', title: '2. Hunt down valid emails', desc: 'Spend valuable hours researching prospects online and cross-checking databases to find accurate, working email addresses.', tag: 'Data Hunting' },
  { step: '03', title: '3. Draft cold emails', desc: 'Individually write personalized outreach emails from scratch, hoping to resonate with each recipient.', tag: 'Manual Copy' },
  { step: '04', title: '4. Schedule batch send', desc: 'Manually configure email campaigns, carefully selecting ideal send times to maximize open rates.', tag: 'Batch Delay' },
  { step: '05', title: '5. Wait for replies', desc: 'Sit idly and wait, sometimes days, for prospects to slowly respond, creating uncertainty in your pipeline.', tag: 'Days Wasted' },
  { step: '06', title: '6. Manual follow-ups', desc: 'Regularly revisit the spreadsheet, identify unresponsive leads, and manually craft and send additional follow-up messages.', tag: 'Tedious Work' },
  { step: '07', title: '7. Qualify prospects on calls', desc: 'Schedule and conduct phone calls individually to determine the genuine interest level and qualification of prospects.', tag: 'Time Drain' },
  { step: '08', title: '8. Back-and-forth scheduling', desc: 'Playing the never-ending back and forth with clients to coordinate calendar availability and meeting links.', tag: 'Calendar Chaos' },
  { step: '09', title: '9. Update CRM fields', desc: 'Spend extra hours manually logging interactions, notes, updates, and lead status into your CRM to keep records up-to-date.', tag: 'Admin Work' },
  { step: '10', title: '10. Meeting finally confirmed', desc: 'After numerous manual tasks, repeated efforts, and days of waiting, finally confirm the meeting with your prospect.', tag: 'Slow Velocity' },
]

const AFTER_STEPS = [
  { step: '01', title: '1. Connect your CRM & Inbound Sources', desc: 'Seamlessly plug your existing CRM and tools into WorkflowMitra—no setup headaches, zero code. Just connect and let the automation begin.', tag: 'Instant Sync' },
  { step: '02', title: '2. AI scores & personalizes leads', desc: 'Instantly analyzes and ranks your leads based on relevance and buying intent, then tailors outreach to each one—before you even lift a finger.', tag: 'AI Powered' },
  { step: '03', title: '3. Smart follow-up launches on Autopilot', desc: 'Outreach never sleeps. Your AI agent sends timely, personalized follow-ups across WhatsApp & Email around the clock to maximize response rates.', tag: '24/7 Autopilot' },
  { step: '04', title: '4. Calendar filled—meeting booked & closed', desc: 'Once replies come in, the AI handles scheduling and confirmations—dropping booked meetings directly into your calendar, no back-and-forth.', tag: '5× Faster' },
]

const CATEGORIES = ['All', 'Lead capture', 'E-commerce', 'AI', 'Customer support']

const WHY_ITEMS = [
  {
    icon: 'easy',
    roleTag: 'For Founders & Ops',
    label: 'Easy & No-Code',
    desc: 'Visual drag-and-drop workflow building without writing a single line of code or script.',
    benefit: 'Live in under 5 minutes',
    accent: '#2563eb',
    bg: '#eff6ff',
  },
  {
    icon: 'affordable',
    roleTag: 'For CFOs & Scaling Teams',
    label: 'Transparent & Affordable',
    desc: '10,000 tasks for ₹999/mo with zero per-step penalties. Save up to 80% vs legacy tools.',
    benefit: 'Save up to 80% on costs',
    accent: '#059669',
    bg: '#ecfdf5',
  },
  {
    icon: 'expert',
    roleTag: 'For Growing Businesses',
    label: '1-on-1 Expert Help',
    desc: 'Real automation engineers audit, map, build, and troubleshoot custom workflows with you.',
    benefit: 'Zero guesswork or hiring',
    accent: '#d97706',
    bg: '#fffbeb',
  },
  {
    icon: 'powerful',
    roleTag: 'For High-Velocity Teams',
    label: 'Autonomous AI Agents',
    desc: 'Native Claude 3.5 & GPT-4o reasoning, condition branches, and automatic error retries.',
    benefit: 'AI reasoning built-in',
    accent: '#7c3aed',
    bg: '#f5f3ff',
  },
  {
    icon: 'flexible',
    roleTag: 'For Tech & Architects',
    label: 'Universal App Reach',
    desc: 'Connect 37+ SaaS tools or integrate any custom REST API via Webhooks and OAuth.',
    benefit: '37+ Apps & Webhooks',
    accent: '#0284c7',
    bg: '#f0f9ff',
  },
]

const FAQ_ITEMS = [
  {
    q: 'What is WorkflowMitra?',
    a: 'WorkflowMitra is a no-code workflow automation platform. It lets you connect your business apps, automate repetitive tasks, and build multi-step workflows — without writing code. If you need help, our automation experts can assist you.',
  },
  {
    q: 'Is WorkflowMitra suitable for non-technical users?',
    a: 'Yes. WorkflowMitra is designed for people who want automation but don\'t have a technical background. You choose a trigger, add actions, connect your apps, and turn the workflow on. No coding or scripting required.',
  },
  {
    q: 'What can I automate with WorkflowMitra?',
    a: 'Common automations include lead capture and follow-up, e-commerce order processing, customer support ticket routing, marketing campaigns, appointment scheduling, data syncing between tools, and AI-powered content workflows.',
  },
  {
    q: 'Is WorkflowMitra an alternative to Zapier?',
    a: 'Yes. WorkflowMitra offers multi-step workflow automation similar to Zapier, with a focus on simplicity, affordability, and expert support. If you find Zapier\'s per-task pricing expensive or its interface overwhelming, WorkflowMitra is worth trying.',
  },
  {
    q: 'Is WorkflowMitra an alternative to Make?',
    a: 'Yes. Like Make (formerly Integromat), WorkflowMitra provides visual workflow building with conditions, loops, and error handling. WorkflowMitra is designed to be easier to learn, and our automation experts are available if you need help.',
  },
  {
    q: 'Is WorkflowMitra an alternative to n8n?',
    a: 'Yes. WorkflowMitra provides a managed automation platform with a visual editor, similar to n8n. You get the power of a workflow engine without needing to self-host, manage infrastructure, or write code.',
  },
  {
    q: 'Can WorkflowMitra experts help me build a workflow?',
    a: 'Yes. Tell us what you want to automate, and our automation experts can help you understand the workflow, design the steps, and build it. This is one of WorkflowMitra\'s key differentiators — you don\'t have to figure everything out alone.',
  },
  {
    q: 'How much does WorkflowMitra cost?',
    a: 'WorkflowMitra starts at ₹999/month for the Starter plan, which includes 10,000 credits, unlimited active workflows, and up to 5 team seats. Higher plans are available as your needs grow. All plans include a free trial.',
  },
]

function Home() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')
  const [openFaq, setOpenFaq] = useState(null)
  const [activeUseCase, setActiveUseCase] = useState(0)

  return (
    <div className="home-page">
      <PageSeo
        title="WorkflowMitra — Workflow Automation Platform | No-Code AI Workflows"
        description="Build powerful workflow automations without code. Connect your apps, automate repetitive work, and get help from automation experts when you need it."
        path="/"
      />

      {/* 1 — Hero */}
      <HeroAnimated />

      {/* 2 — Built for enterprise scale and trust (OmniAgent Reference 1:1) */}
      <EnterpriseScaleSection />

      {/* 3 — Effortless Tool Integrations (Orbital Interactive Showcase) */}
      <IntegrationsShowcase />

      {/* 4 — N8N-Inspired Interactive Workflow Showcase */}
      <AgentsShowcase />

      {/* 5 — AI-powered Automation */}
      <DeferredHomeSection minHeight={600}>
        <Suspense fallback={null}>
          <AIAgentsFeatureSection />
        </Suspense>
      </DeferredHomeSection>

      {/* 5.1 — Connect AI to your tools & everything you use */}
      <DeferredHomeSection minHeight={480}>
        <Suspense fallback={null}>
          <DarkAIIntegrationsSection />
        </Suspense>
      </DeferredHomeSection>

      {/* 6 — Affordability (Ultra-Modern AI Automation Pricing & Value Showcase) */}
      <DeferredHomeSection minHeight={520}>
        <section className="afford-section" id="pricing-overview">
          {/* Subtle Ambient Background Glow */}
          <div className="wm-afford-ambient-glow" />

          <div className="container">
            <div className="wm-afford-card-wrapper">
              
              {/* Left Value & Feature Matrix Column */}
              <motion.div 
                className="wm-afford-text-col"
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="wm-afford-pill-badge">
                  <Sparkles size={13} className="wm-afford-badge-sparkle" />
                  <span>TRANSPARENT &amp; PREDICTABLE PRICING</span>
                </div>

                <h2 className="wm-afford-title">
                  Powerful automation <br />
                  <span className="wm-afford-title-gradient">without unnecessary cost</span>
                </h2>
                
                <p className="wm-afford-subtitle">
                  Built specifically for startups, agencies, and high-growth teams. Experience enterprise-grade AI automation with unlimited workflows, collaborative team access, and zero hidden per-seat fees.
                </p>

                {/* 2x2 Sleek Feature Grid */}
                <div className="wm-afford-feature-grid">
                  <motion.div 
                    className="wm-afford-feature-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <div className="wm-afford-icon-box icon-amber">
                      <Zap size={18} />
                    </div>
                    <div className="wm-afford-feature-info">
                      <h4>10,000 Monthly Credits</h4>
                      <p>Multi-step executions and high-volume triggers included.</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="wm-afford-feature-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <div className="wm-afford-icon-box icon-blue">
                      <Layers size={18} />
                    </div>
                    <div className="wm-afford-feature-info">
                      <h4>Unlimited Workflows</h4>
                      <p>Build and run as many active flows as your business needs.</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="wm-afford-feature-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <div className="wm-afford-icon-box icon-purple">
                      <Users size={18} />
                    </div>
                    <div className="wm-afford-feature-info">
                      <h4>5 Team Seats Included</h4>
                      <p>Full team collaboration with zero per-seat upgrade fees.</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="wm-afford-feature-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <div className="wm-afford-icon-box icon-emerald">
                      <Headphones size={18} />
                    </div>
                    <div className="wm-afford-feature-info">
                      <h4>Human Expert Help</h4>
                      <p>1-on-1 workflow setup assistance whenever you need it.</p>
                    </div>
                  </motion.div>
                </div>

                {/* Left Guarantee Note */}
                <div className="wm-afford-cta-row">
                  <span className="wm-afford-guarantee">
                    <ShieldCheck size={16} color="#059669" />
                    <span>Free 14-day trial &middot; No credit card required</span>
                  </span>
                </div>
              </motion.div>

              {/* Right Interactive AI Automation Tier Card */}
              <motion.div 
                className="wm-afford-card-col"
                initial={{ opacity: 0, x: 35, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="wm-afford-pricing-card">
                  {/* Popular Accent Glow */}
                  <div className="wm-afford-card-glow" />

                  <div className="wm-afford-badge-row">
                    <div className="wm-afford-plan-identity">
                      <span className="wm-afford-plan-dot" />
                      <span className="wm-afford-plan-name">Starter Blueprint Plan</span>
                    </div>
                    <span className="wm-afford-save-chip">⚡ MOST POPULAR</span>
                  </div>

                  <div className="wm-afford-price-block">
                    <div className="wm-afford-amount-wrap">
                      <span className="wm-afford-currency">₹</span>
                      <span className="wm-afford-price-num">999</span>
                    </div>
                    <div className="wm-afford-price-meta">
                      <span className="wm-afford-frequency">/month</span>
                      <span className="wm-afford-cancel-anytime">Billed monthly &middot; Cancel anytime</span>
                    </div>
                  </div>

                  <div className="wm-afford-savings-pill">
                    <CheckCircle2 size={13} color="#059669" />
                    <span>Save up to 75% compared to Zapier / Make tiers</span>
                  </div>

                  <p className="wm-afford-tier-desc">
                    Everything you need to automate core sales, CRM enrichment, customer support, and operational workflows on autopilot.
                  </p>

                  <div className="wm-afford-specs-box">
                    <div className="wm-afford-spec-row">
                      <span className="wm-spec-label">Monthly Tasks / Credits</span>
                      <span className="wm-spec-val font-bold">10,000 executions</span>
                    </div>
                    <div className="wm-afford-spec-row">
                      <span className="wm-spec-label">Active Workflows</span>
                      <span className="wm-spec-val val-green">Unlimited</span>
                    </div>
                    <div className="wm-afford-spec-row">
                      <span className="wm-spec-label">Team Members</span>
                      <span className="wm-spec-val">5 Included</span>
                    </div>
                    <div className="wm-afford-spec-row">
                      <span className="wm-spec-label">Execution Latency</span>
                      <span className="wm-spec-val val-green">&lt; 0.2s Real-time</span>
                    </div>
                    <div className="wm-afford-spec-row">
                      <span className="wm-spec-label">Reliability &amp; SLA</span>
                      <span className="wm-spec-val">99.99% Uptime</span>
                    </div>
                  </div>

                  <RollButton
                    href="https://app.workflowmitra.com/signup"
                    variant="dark"
                    size="md"
                    showArrow={true}
                    className="wm-afford-roll-btn"
                  >
                    Start Free 14-Day Trial
                  </RollButton>

                  <div className="wm-afford-card-footer-notes">
                    <span>Instant activation</span>
                    <span>&middot;</span>
                    <span>No card needed</span>
                    <span>&middot;</span>
                    <span>14-day guarantee</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </DeferredHomeSection>

      {/* 11 — Templates */}
      <DeferredHomeSection minHeight={540}>
        <section className="templates-section">
          <div className="container">
            <motion.div 
              className="section-header templates-header-centered"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="wm-templates-eyebrow-badge">
                <Sparkles size={13} className="wm-templates-badge-sparkle" />
                <span>PRE-BUILT BLUEPRINTS</span>
              </div>
              <h2 className="section-title">Start from a workflow that already works</h2>
              <p className="section-subtitle">Open a production-tested template, connect your apps, and run it on 24/7 autopilot.</p>
              
              <div className="template-tabs" role="tablist" aria-label="Template categories">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={activeTab === cat}
                    className={`tab-btn ${activeTab === cat ? 'active' : ''}`}
                    onClick={() => setActiveTab(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="templates-grid">
              {TEMPLATES.filter(t => activeTab === 'All' || t.category.toLowerCase() === activeTab.toLowerCase()).map((template, tIdx) => (
                <motion.div 
                  key={template.id} 
                  className="template-card" 
                  onClick={() => navigate(`/template/${template.id}`)}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: tIdx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                >
                  <div className="template-card-glow" aria-hidden="true" />
                  <div className="template-header">
                    <div className="template-apps">
                      <NodeChain nodes={template.chain} size={42} gap={20} />
                    </div>
                  </div>
                  <div className="template-content">
                    <div className="template-badge-row">
                      <span className={`template-category cat-${template.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                        {template.category}
                      </span>
                      <span className="template-meta">
                        <Zap size={11} className="template-meta-icon" />
                        {template.steps} steps
                      </span>
                    </div>
                    <h3 className="template-title">{template.title}</h3>
                    <p className="template-description">{template.description}</p>
                    <div className="template-footer">
                      <span className="template-ready-hint">Ready to deploy</span>
                      <span className="template-explore-link">
                        <span>View Template</span>
                        <ArrowRight size={13} className="template-arrow" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="templates-more"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <RollButton
                to="/templates"
                variant="dark"
                size="md"
                showArrow={true}
              >
                Explore All Templates
              </RollButton>
            </motion.div>
          </div>
        </section>
      </DeferredHomeSection>

      {/* 13 — Why WorkflowMitra / Testimonials Slider */}
      {/* 
      <DeferredHomeSection minHeight={480}>
        <Suspense fallback={<div className="section-placeholder" style={{ minHeight: 480 }} />}>
          <TestimonialSlider />
        </Suspense>
      </DeferredHomeSection> 
      */}

      {/* 14 — Documentation & Onboarding Hub */}
      <DeferredHomeSection minHeight={380}>
        <Suspense fallback={null}>
          <OnboardingSection />
        </Suspense>
      </DeferredHomeSection>

      {/* 15 — FAQ */}
      <DeferredHomeSection minHeight={480}>
        <section className="faq-section" id="faq" itemScope itemType="https://schema.org/FAQPage">
          <div className="container">
            
            <motion.div 
              className="section-header faq-header-centered"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="faq-eyebrow-badge">
                <span className="faq-eyebrow-dot" />
                <span>Everything You Need To Know</span>
              </div>
              <h2 className="section-title">Frequently asked questions</h2>
              <p className="section-subtitle">
                Clear answers to common questions about WorkflowMitra, integrations, pricing, and how we compare.
              </p>
            </motion.div>

            <div className="faq-list">
              {FAQ_ITEMS.map((item, i) => (
                <motion.div
                  className={`faq-card ${openFaq === i ? 'open' : ''}`}
                  key={i}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    className="faq-trigger"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="faq-question-text" itemProp="name">{item.q}</span>
                    <div className="faq-icon-circle">
                      <ChevronDown size={18} className={`faq-icon-chevron ${openFaq === i ? 'rotate' : ''}`} />
                    </div>
                  </button>

                  <div
                    className="faq-answer-wrap"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    role="region"
                    hidden={openFaq !== i}
                  >
                    <p className="faq-answer-text" itemProp="text">{item.a}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </DeferredHomeSection>

      {/* 15 — Final CTA (Manual Rock-Solid Center AI Card) */}
      <DeferredHomeSection minHeight={320}>
        <section className="wm-final-cta-section" id="start-automating">
          <motion.div 
            className="wm-final-cta-card"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Atmospheric Background Glow */}
            <div className="wm-final-card-glow" aria-hidden="true" />

            {/* Eyebrow Badge */}
            <div className="wm-final-cta-badge">
              <Sparkles size={13} className="wm-final-badge-sparkle" />
              <span>Ready To Automate Your Business?</span>
            </div>

            {/* Main Headline */}
            <h2 className="wm-final-cta-title">
              Start automating yourself — or let our <span className="wm-final-highlight">experts help you</span>
            </h2>

            {/* Subtitle */}
            <p className="wm-final-cta-sub">
              Free to start, no credit card required. Build it yourself in minutes or tell us what you need and our automation experts will help you get there.
            </p>

            {/* Action Buttons */}
            <div className="wm-final-cta-btns">
              <RollButton
                href="https://app.workflowmitra.com/signup"
                variant="dark"
                size="lg"
                showArrow={true}
              >
                Start Building Free
              </RollButton>

              <RollButton
                to="/contact"
                variant="secondary"
                size="lg"
              >
                Get Help Building My Workflow
              </RollButton>
            </div>

            {/* Trust Reassurance Row */}
            <div className="wm-final-trust-row">
              <motion.span 
                className="wm-final-trust-item"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <CheckCircle2 size={15} color="#059669" />
                <span>10,000 Free Credits</span>
              </motion.span>
              <motion.span 
                className="wm-final-trust-item"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.28 }}
              >
                <CheckCircle2 size={15} color="#059669" />
                <span>37+ Pre-Built Apps</span>
              </motion.span>
              <motion.span 
                className="wm-final-trust-item"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.36 }}
              >
                <CheckCircle2 size={15} color="#059669" />
                <span>Live Expert Support</span>
              </motion.span>
              <motion.span 
                className="wm-final-trust-item"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.44 }}
              >
                <CheckCircle2 size={15} color="#059669" />
                <span>99.8% Uptime SLA</span>
              </motion.span>
            </div>
          </motion.div>
        </section>
      </DeferredHomeSection>
    </div>
  )
}

export default Home
