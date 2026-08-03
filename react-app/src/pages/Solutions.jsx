import { FaBullseye, FaLock, FaChartBar, FaCommentDots, FaPhoneAlt, FaBullhorn, FaBriefcase, FaCog, FaLaptop, FaCalendarAlt, FaHeadphones, FaSearch, FaMobileAlt, FaPen, FaAddressCard, FaGift, FaShoppingBag, FaUsers, FaLightbulb } from 'react-icons/fa';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Solutions.css'

function Solutions() {
  const [activeTab, setActiveTab] = useState('roles')

  const roles = [
    {
      id: 'marketing',
      icon: '<FaBullhorn />',
      title: 'Marketing',
      description: 'Automate content, SEO, ads, and reporting',
      color: '#ec4899'
    },
    {
      id: 'sales',
      icon: '<FaBriefcase />',
      title: 'Sales',
      description: 'Run AI agents across every sales motion',
      color: '#8b5cf6'
    },
    {
      id: 'operations',
      icon: '<FaCog />️',
      title: 'Operations',
      description: 'Eliminate busywork and reduce manual errors',
      color: '#10b981'
    },
    {
      id: 'engineering',
      icon: '<FaLaptop />',
      title: 'Engineering',
      description: 'Production-grade automations, ship faster',
      color: '#3b82f6'
    },
    {
      id: 'support',
      icon: '<FaCommentDots />',
      title: 'Support',
      description: 'Triage tickets, spot trends, stop churn',
      color: '#f59e0b'
    },
    {
      id: 'security',
      icon: '<FaLock />',
      title: 'Security',
      description: 'Security, compliance, and data governance',
      color: '#ef4444'
    }
  ]

  const useCases = [
    {
      id: 'data-analysis',
      icon: '<FaChartBar />',
      title: 'Data Analysis Agent',
      description: 'Query your data warehouse from Slack',
      color: '#8b5cf6'
    },
    {
      id: 'meeting-prep',
      icon: '<FaCalendarAlt />',
      title: 'Meeting Prep Agent',
      description: 'Get context before every meeting',
      color: '#ec4899'
    },
    {
      id: 'support-agent',
      icon: '<FaHeadphones />',
      title: 'Support Agent',
      description: 'Triage tickets through natural conversation',
      color: '#10b981'
    },
    {
      id: 'seo-automation',
      icon: '<FaSearch />',
      title: 'SEO Automation',
      description: 'Automate every SEO workflow',
      color: '#f59e0b'
    },
    {
      id: 'lead-qualification',
      icon: '<FaBullseye />',
      title: 'Lead Qualification Agent',
      description: 'Qualify and route inbound leads',
      color: '#3b82f6'
    },
    {
      id: 'ad-campaign',
      icon: '<FaMobileAlt />',
      title: 'Ad Campaign Management',
      description: 'Track accounts and report on spend',
      color: '#ec4899'
    },
    {
      id: 'content-creation',
      icon: '<FaPen />️',
      title: 'Content Creation',
      description: 'Agents for your content workflows',
      color: '#8b5cf6'
    },
    {
      id: 'competitor-analysis',
      icon: '<FaSearch />',
      title: 'Competitor Analysis',
      description: 'Track competitors across every channel',
      color: '#10b981'
    },
    {
      id: 'crm-agent',
      icon: '<FaAddressCard />',
      title: 'CRM Agent',
      description: 'Keep your sales pipeline up to date',
      color: '#f59e0b'
    },
    {
      id: 'call-analysis',
      icon: '<FaPhoneAlt />',
      title: 'Call Analysis Agent',
      description: 'Insights from every sales call',
      color: '#3b82f6'
    },
    {
      id: 'lead-generation',
      icon: '<FaGift />',
      title: 'Lead Generation Agent',
      description: 'Find, enrich, and prioritize every lead',
      color: '#ec4899'
    },
    {
      id: 'shopify-stores',
      icon: '<FaShoppingBag />️',
      title: 'Shopify Stores',
      description: 'AI agents for Shopify merchants',
      color: '#10b981'
    }
  ]

  return (
    <div className="solutions-page">
      {/* Hero Section */}
      <section className="solutions-hero">
        <div className="solutions-hero-content">
          <h1 className="solutions-hero-title">
            Build AI agents for every team
          </h1>
          <p className="solutions-hero-description">
            FlowMitra helps you and your team build AI agents across all of your business operations — from marketing, sales, support, to engineering and more.
          </p>
          <div className="solutions-hero-actions">
            <Link to="/contact" className="btn-primary-large">Get Started</Link>
            <Link to="/contact" className="btn-secondary-large">Talk to Sales</Link>
          </div>
        </div>

        {/* Integration Logos */}
        <div className="integration-logos">
          <span className="integration-label">Works with</span>
          <div className="logo-grid">
            {['Slack', 'Gmail', 'Sheets', 'Airtable', 'Notion', 'Salesforce', 'HubSpot', 'Zapier'].map((name) => (
              <div key={name} className="integration-logo">
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="solutions-tabs-section">
        <div className="solutions-tabs">
          <button
            className={`tab-button ${activeTab === 'roles' ? 'active' : ''}`}
            onClick={() => setActiveTab('roles')}
          >
            <span className="tab-icon"><FaUsers /></span>
            <span className="tab-label">ROLES</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'use-cases' ? 'active' : ''}`}
            onClick={() => setActiveTab('use-cases')}
          >
            <span className="tab-icon"><FaLightbulb /></span>
            <span className="tab-label">USE CASES</span>
          </button>
        </div>
      </section>

      {/* Content Grid */}
      <section className="solutions-content">
        <div className="solutions-container">
          {activeTab === 'roles' && (
            <div className="solutions-grid">
              {roles.map((role) => (
                <Link
                  key={role.id}
                  to={`/solutions/${role.id}`}
                  className="solution-card"
                  style={{ '--card-color': role.color }}
                >
                  <div className="solution-icon">{role.icon}</div>
                  <div className="solution-content">
                    <h3 className="solution-title">{role.title}</h3>
                    <p className="solution-description">{role.description}</p>
                  </div>
                  <span className="solution-arrow">→</span>
                </Link>
              ))}
            </div>
          )}

          {activeTab === 'use-cases' && (
            <div className="solutions-grid">
              {useCases.map((useCase) => (
                <Link
                  key={useCase.id}
                  to={`/solutions/${useCase.id}`}
                  className="solution-card"
                  style={{ '--card-color': useCase.color }}
                >
                  <div className="solution-icon">{useCase.icon}</div>
                  <div className="solution-content">
                    <h3 className="solution-title">{useCase.title}</h3>
                    <p className="solution-description">{useCase.description}</p>
                  </div>
                  <span className="solution-arrow">→</span>
                </Link>
              ))}
            </div>
          )}

          <div className="see-more">
            <Link to="/solutions/all" className="see-more-link">
              See more {activeTab === 'roles' ? 'roles' : 'use cases'} →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="solutions-cta">
        <div className="solutions-cta-content">
          <h2>Ready to build your AI agents?</h2>
          <p>Start automating your workflows today with FlowMitra</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn-primary-large">Get Started</Link>
            <Link to="/contact" className="btn-secondary-large">View Documentation</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Solutions
