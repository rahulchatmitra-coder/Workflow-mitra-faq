import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import HeroAnimated from '../components/HeroAnimated'
import CustomerLogos from '../components/CustomerLogos'
import AgentsShowcase from '../components/AgentsShowcase'
import AIAgentsFeatureSection from '../components/AIAgentsFeatureSection'
import IntegrationsShowcase from '../components/IntegrationsShowcase'
import NodeChain from '../components/NodeChain'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')
  const categories = ['All', 'Lead capture', 'E-commerce', 'AI', 'Customer support']

  // Numeric ids, matching src/data/TemplateFlowData.js and the parseInt in
  // TemplateFlowPage.jsx. The slug ids these replaced parsed to NaN, so every
  // Use button landed on "Template not found".
  //
  // `chain` is an abridged four-disc summary; `steps` is the template's real
  // node count, so a card can read "6 steps" beside four discs.
  const templates = [
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
      description: 'New mail is read by AI, spam is archived, the rest is categorised and a reply drafted — then a person approves before anything is sent.',
      chain: ['gmail', 'ai', 'approval', 'gmail'],
      steps: 6,
    },
    {
      id: 3,
      category: 'Customer support',
      title: 'Support ticket → AI triage',
      description: 'A new helpdesk ticket is categorised by AI, urgent ones alert the team, it goes to the next agent in the rota, and the customer gets an acknowledgement.',
      chain: ['zendesk', 'ai', 'if', 'slack'],
      steps: 6,
    },
  ]

  return (
    <div className="home-page">
      <HeroAnimated />
      <IntegrationsShowcase />
       <AgentsShowcase />
        <AIAgentsFeatureSection />

      {/* Popular workflows — promoted above the fold-adjacent sections so a
          visitor sees what gets built before they see who else builds it. */}
      <section className="templates-section">
        <div className="container">
          <div className="section-header">
            <div className="section-heading-group">
              <h2 className="section-title">Start from a workflow that already works</h2>
              <p className="section-subtitle">Four of the most-used templates. Open one, connect your accounts, run it.</p>
            </div>
            <div className="template-tabs">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`tab-btn ${activeTab === cat ? 'active' : ''}`}
                  onClick={() => setActiveTab(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          

          <div className="templates-grid">
            {templates.filter(t => activeTab === 'All' || t.category.toLowerCase() === activeTab.toLowerCase()).map((template) => (
              <div key={template.id} className="template-card">
                <div className="template-header">
                  <div className="template-apps">
                    <NodeChain nodes={template.chain} size={40} gap={20} />
                  </div>
                </div>

                <div className="template-content">
                  <span className="template-category">{template.category}</span>
                  <h3 className="template-title">{template.title}</h3>
                  <p className="template-description">{template.description}</p>

                  <div className="template-footer">
                    <span className="template-meta">{template.steps} steps</span>
                    <button className="btn-use" onClick={() => navigate(`/template/${template.id}`)}>Use</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <CustomerLogos /> */}

     

     

      

      {/* Stats Section
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500k+</div>
              <div className="stat-label">Automations Created</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime Guarantee</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Integrations</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to automate your workflow?</h2>
            <p className="cta-description">
              Join thousands of teams already building with AI agents. Start free, no credit card required.
            </p>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-primary btn-large">Get Started for Free</Link>
              <Link to="/contact" className="btn btn-secondary btn-large">Talk to Sales</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
