import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Solutions.css'

function Solutions() {
  const [activeFeatureTab, setActiveFeatureTab] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)

  /* ─── Feature Tabs Data ─── */
  const featureTabs = [
    {
      label: 'Lead Capture',
      title: 'Automated Lead Capture & Ingestion',
      description: 'Ingest data automatically from web forms, landing pages, social ads, and third-party platforms into a unified pipeline. Never miss a lead again.',
      features: ['Multi-channel form collection', 'Real-time webhook triggers', 'Automatic data normalization', 'Duplicate detection & merge'],
      icon: '📥'
    },
    {
      label: 'AI Scoring',
      title: 'AI-Powered Lead Qualification',
      description: 'Use built-in AI models to automatically categorize and score leads based on company size, role, buyer intent, and engagement signals.',
      features: ['Smart scoring algorithms', 'Behavioral signal analysis', 'Hot/Warm/Cold categorization', 'Custom scoring formulas'],
      icon: '🤖'
    },
    {
      label: 'Data Enrichment',
      title: 'Real-Time Data Enrichment',
      description: 'Hydrate incomplete lead forms with corporate domain data, employee count, social profiles, and technology stack information automatically.',
      features: ['Company data lookup', 'Social profile matching', 'Technographic enrichment', 'Revenue & funding data'],
      icon: '🔍'
    },
    {
      label: 'CRM Sync',
      title: 'Intelligent CRM Routing & Sync',
      description: 'Route leads to the right sales reps based on region, deal size, or product interest. Keep your CRM updated in real-time across every tool.',
      features: ['Territory-based routing', 'Round-robin assignment', 'Bi-directional CRM sync', 'Pipeline stage automation'],
      icon: '🔄'
    },
    {
      label: 'Follow-ups',
      title: 'Automated Follow-Up Sequences',
      description: 'Trigger personalized email sequences, schedule callbacks, and post alerts to internal channels the moment a lead takes action.',
      features: ['Multi-step email sequences', 'Slack/Teams notifications', 'Calendar booking automation', 'SMS & WhatsApp follow-ups'],
      icon: '📧'
    }
  ]

  /* ─── Use Cases Data ─── */
  const useCases = [
    {
      icon: '🎯',
      title: 'Lead Management',
      description: 'Automate lead capture, scoring, routing, and nurturing across your entire sales funnel.',
      tags: ['CRM Sync', 'AI Scoring', 'Email Automation']
    },
    {
      icon: '🔗',
      title: 'Customer Integrations',
      description: 'Sync customer data seamlessly across CRM, support, billing, and communication tools.',
      tags: ['API Connectivity', 'Data Mapping', 'Webhooks']
    },
    {
      icon: '⚙️',
      title: 'IT Operations',
      description: 'Automate incident response, server monitoring, deployments, and infrastructure management.',
      tags: ['AIOps', 'Self-Healing', 'Script Orchestration']
    },
    {
      icon: '📢',
      title: 'Marketing Automation',
      description: 'Campaign management, content scheduling, audience segmentation, and analytics pipelines.',
      tags: ['Campaigns', 'Analytics', 'Content Scheduling']
    },
    {
      icon: '💰',
      title: 'Sales Operations',
      description: 'Pipeline management, deal tracking, revenue forecasting, and sales team automation.',
      tags: ['Pipeline', 'Forecasting', 'Deal Tracking']
    },
    {
      icon: '📊',
      title: 'Data & Analytics',
      description: 'ETL pipelines, data enrichment, report generation, and dashboard automation workflows.',
      tags: ['ETL', 'Reports', 'Data Validation']
    },
    {
      icon: '👥',
      title: 'HR & Recruiting',
      description: 'Hiring automation, resume screening, onboarding workflows, and employee management.',
      tags: ['Onboarding', 'Screening', 'Interview Scheduling']
    },
    {
      icon: '🎧',
      title: 'Customer Support',
      description: 'Ticket routing, auto-responses, knowledge base sync, and SLA management automation.',
      tags: ['Ticket Routing', 'Auto-Reply', 'SLA Tracking']
    }
  ]

  /* ─── Benefits Data ─── */
  const benefits = [
    {
      icon: '⚡',
      title: 'Zero Lead Loss',
      description: 'Instant real-time processing ensures no lead is missed, even during high-traffic campaigns or off-hours.'
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Full data control with self-hosting options. GDPR, SOC2, and HIPAA compliant data handling built in.'
    },
    {
      icon: '🧩',
      title: '1000+ Integrations',
      description: 'Connect any tool in your stack — from CRMs and marketing platforms to custom APIs and databases.'
    },
    {
      icon: '🤖',
      title: 'AI-Native Workflows',
      description: 'Built-in AI nodes for intelligent lead scoring, content generation, and decision automation.'
    },
    {
      icon: '📈',
      title: 'Unlimited Scale',
      description: 'From startup to enterprise — scale your automations without per-execution limits or throttling.'
    },
    {
      icon: '🛠️',
      title: 'Custom Logic',
      description: 'Use JavaScript or Python code nodes to implement proprietary business logic and scoring formulas.'
    }
  ]

  /* ─── FAQ Data ─── */
  const faqs = [
    {
      question: 'Is FlowMitra free to get started?',
      answer: 'Yes! FlowMitra offers a generous free tier that includes core automation features, basic integrations, and up to 1,000 workflow executions per month. Upgrade to a paid plan for advanced AI features and higher limits.'
    },
    {
      question: 'How does FlowMitra compare to Zapier or Make?',
      answer: 'FlowMitra offers more flexibility with AI-native workflows, code nodes for custom logic, and optional self-hosting for maximum data control. Unlike Zapier, there are no per-task limits on paid plans — you get unlimited executions.'
    },
    {
      question: 'Can I self-host FlowMitra for data compliance?',
      answer: 'Absolutely. FlowMitra supports Docker, Kubernetes, and bare-metal deployments behind your own firewall. This is ideal for GDPR, HIPAA, and SOC2 compliance where data residency is a concern.'
    },
    {
      question: 'Which CRMs and marketing tools are supported?',
      answer: 'FlowMitra integrates with 1,000+ apps including HubSpot, Salesforce, Pipedrive, Mailchimp, ActiveCampaign, Slack, Google Sheets, and many more. Custom API connections are also fully supported.'
    },
    {
      question: 'Can FlowMitra handle enterprise-scale workloads?',
      answer: 'Yes. FlowMitra is built for scale with horizontal scaling, queue-based execution, and enterprise SLA guarantees. Our enterprise customers process millions of workflow executions monthly.'
    },
    {
      question: 'How quickly can I set up my first automation?',
      answer: 'Most users create their first working automation within 15 minutes using our pre-built templates. No coding experience is required — our visual workflow builder makes it intuitive to connect apps and define logic.'
    }
  ]

  /* ─── Logo Brands ─── */
  const brands = ['Delivery Hero', 'Vodafone', 'Trendyol', 'Huel', 'Typeform', 'Supabase', 'monday.com', 'Notion']

  return (
    <div className="solutions-page">
      {/* ═══════════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════════ */}
      <section className="solutions-hero">
        <div className="hero-inner">
          <div className="hero-text">
            <span className="hero-eyebrow">Scale your operations</span>
            <h1 className="hero-title">
              Automate <span>everything</span> with FlowMitra
            </h1>
            <p className="hero-description">
              FlowMitra lets you connect all of your business tools to give you a much easier time managing leads, operations, data, and customer workflows — all in one platform.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn-hero-primary">
                Get Started
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link to="/contact" className="btn-hero-secondary">Contact Sales</Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="workflow-preview">
              <div className="workflow-nodes">
                <div className="workflow-node">
                  <div className="node-icon trigger">▶</div>
                  <span className="node-label">Start</span>
                  <span className="node-sublabel">trigger</span>
                </div>
                <div className="node-connector" />
                <div className="workflow-node">
                  <div className="node-icon ai">🤖</div>
                  <span className="node-label">AI Score</span>
                  <span className="node-sublabel">qualify</span>
                </div>
                <div className="node-connector" />
                <div className="workflow-node">
                  <div className="node-icon enrich">🔍</div>
                  <span className="node-label">Enrich</span>
                  <span className="node-sublabel">data</span>
                </div>
                <div className="node-connector" />
                <div className="workflow-node">
                  <div className="node-icon crm">☁️</div>
                  <span className="node-label">CRM</span>
                  <span className="node-sublabel">sync</span>
                </div>
                <div className="node-connector" />
                <div className="workflow-node">
                  <div className="node-icon notify">🔔</div>
                  <span className="node-label">Notify</span>
                  <span className="node-sublabel">alert</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. TRUSTED BY / LOGO BAR
          ═══════════════════════════════════════════ */}
      <section className="logo-bar">
        <div className="logo-bar-inner">
          <p className="logo-bar-label">Trusted by 10,000+ teams worldwide</p>
          <div className="logo-scroll">
            {brands.map((brand, i) => (
              <span key={i} className="logo-item">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. FEATURE TABS SECTION
          ═══════════════════════════════════════════ */}
      <section className="feature-tabs-section">
        <div className="feature-tabs-inner">
          <span className="section-eyebrow">Powerful Capabilities</span>
          <h2 className="section-heading">Everything you need to automate</h2>
          <p className="section-subheading">
            From lead capture to customer follow-ups, FlowMitra handles the full automation lifecycle with visual workflows and AI-powered intelligence.
          </p>

          <div className="feature-tabs-nav">
            {featureTabs.map((tab, idx) => (
              <button
                key={idx}
                className={`feature-tab-btn ${activeFeatureTab === idx ? 'active' : ''}`}
                onClick={() => setActiveFeatureTab(idx)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="feature-tab-content" key={activeFeatureTab}>
            <div className="tab-text">
              <h3>{featureTabs[activeFeatureTab].title}</h3>
              <p>{featureTabs[activeFeatureTab].description}</p>
              <ul className="tab-features-list">
                {featureTabs[activeFeatureTab].features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="tab-feature-icon">
                      <svg viewBox="0 0 16 16" fill="none">
                        <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#e84393" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="tab-visual">
              <div className="tab-visual-placeholder">
                <span className="placeholder-icon">{featureTabs[activeFeatureTab].icon}</span>
                <p>{featureTabs[activeFeatureTab].title}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. USE CASES GRID
          ═══════════════════════════════════════════ */}
      <section className="use-cases-section">
        <div className="use-cases-inner">
          <div className="use-cases-header">
            <span className="section-eyebrow">Use Cases</span>
            <h2 className="section-heading">Automation for every team</h2>
            <p className="section-subheading">
              Whether you're in sales, engineering, HR, or support — FlowMitra has pre-built solutions designed for your workflow.
            </p>
          </div>

          <div className="use-cases-grid">
            {useCases.map((uc, idx) => (
              <div key={idx} className="use-case-card">
                <div className="use-case-icon">{uc.icon}</div>
                <h3>{uc.title}</h3>
                <p>{uc.description}</p>
                <div className="use-case-tags">
                  {uc.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="use-case-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. HOW IT WORKS
          ═══════════════════════════════════════════ */}
      <section className="how-it-works-section">
        <div className="how-it-works-inner">
          <div className="how-it-works-header">
            <span className="section-eyebrow">How It Works</span>
            <h2 className="section-heading">Three steps to automation</h2>
            <p className="section-subheading">
              Get your first workflow running in minutes, not weeks. No coding required.
            </p>
          </div>

          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Connect</h3>
              <p>Link your favorite tools — CRMs, email platforms, APIs, databases, and 1000+ more integrations.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Automate</h3>
              <p>Build visual workflows with our drag-and-drop builder. Add AI nodes, custom logic, and conditional branches.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Scale</h3>
              <p>Deploy and let FlowMitra handle millions of executions. Monitor, optimize, and scale without limits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. BENEFITS SECTION
          ═══════════════════════════════════════════ */}
      <section className="benefits-section">
        <div className="benefits-inner">
          <div className="benefits-header">
            <span className="section-eyebrow">Why FlowMitra</span>
            <h2 className="section-heading">Built for teams that ship fast</h2>
            <p className="section-subheading">
              Enterprise-grade automation with the simplicity your team needs to move quickly.
            </p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. FAQ SECTION
          ═══════════════════════════════════════════ */}
      <section className="faq-section">
        <div className="faq-inner">
          <div className="faq-header">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="section-heading">Frequently asked questions</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  {faq.question}
                  <svg className="faq-chevron" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-content">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. BOTTOM CTA
          ═══════════════════════════════════════════ */}
      <section className="bottom-cta-section">
        <div className="bottom-cta-inner">
          <h2>Ready to automate <span>your workflow?</span></h2>
          <p>
            Join thousands of teams already building with AI-powered automation. Start free, no credit card required.
          </p>
          <div className="bottom-cta-actions">
            <Link to="/contact" className="btn-cta-primary">
              Get Started for Free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link to="/contact" className="btn-cta-secondary">Talk to Sales</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Solutions
