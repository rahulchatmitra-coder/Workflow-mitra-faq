import { FaEnvelope, FaCommentDots, FaPhoneAlt, FaBuilding, FaCheck } from 'react-icons/fa';
import { useState } from 'react'
import './Contact.css'

function Contact() {
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
      <section className="contact-hero">
        <div className="container">
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
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
                <p>hello@flowmitra.com</p>
              </div>
              <div className="info-item">
                <h3><FaCommentDots /> Live Chat</h3>
                <p>Available Monday-Friday, 9am-6pm EST</p>
              </div>
              <div className="info-item">
                <h3><FaPhoneAlt /> Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="info-item">
                <h3><FaBuilding /> Office</h3>
                <p>123 Innovation Drive<br/>San Francisco, CA 94105</p>
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
                    placeholder="John Doe"
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
                    placeholder="john@company.com"
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
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us about your project..."
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
