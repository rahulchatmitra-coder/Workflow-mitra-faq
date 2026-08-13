import { FaEnvelope, FaCommentDots, FaCheck } from 'react-icons/fa';
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageSeo from '../components/PageSeo'
import './Contact.css'

function Contact() {
  const [searchParams] = useSearchParams()
  const isAutomationHelp = searchParams.get('from') === 'automation-help'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setFormData({ name: '', email: '', company: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="contact-page">
      <PageSeo
        title="Contact WorkflowMitra — Get Help With Your Workflows"
        description="Have questions about workflow automation? Need help building a workflow? Get in touch with the WorkflowMitra team."
        path="/contact"
      />

      <section className="contact-hero">
        <div className="container">
          <h1 className="page-title">{isAutomationHelp ? 'Tell Us What You Want to Automate' : 'Get in Touch'}</h1>
          <p className="page-subtitle">
            {isAutomationHelp
              ? "Describe the process you want to automate and the apps involved. Our automation experts will get back to you to help you build it."
              : "Have questions about workflow automation? Need help building a workflow? Send us a message and we'll respond as soon as possible."}
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <div className="info-item">
                <h3><FaEnvelope /> Email</h3>
                <p>support@workflowmitra.com</p>
              </div>
              <div className="info-item">
                <h3><FaCommentDots /> Support</h3>
                <p>Available Monday–Friday, 10am–7pm IST</p>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">{isAutomationHelp ? 'What do you want to automate? *' : 'Message *'}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder={isAutomationHelp
                      ? 'Describe the process and the apps involved, e.g. "When a new lead comes in on our website, notify sales on WhatsApp and add them to our CRM."'
                      : 'Tell us about your automation needs...'}
                  ></textarea>
                </div>

                {isSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '2rem', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}><FaCheck /></div>
                    <p style={{ fontWeight: 600, color: '#166534', marginBottom: '0.25rem' }}>Message sent successfully!</p>
                    <p style={{ color: '#4b5563', fontSize: '0.9rem' }}>We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <button type="submit" className="btn btn-primary btn-large btn-full">
                    Send Message
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
