import { FaBullseye, FaRocket, FaHandshake, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import PageSeo from '../components/PageSeo'
import RollButton from '../components/RollButton'
import './About.css'

function About() {
  return (
    <div className="about-page">
      <PageSeo
        title="About WorkflowMitra — Our Mission & Values"
        description="WorkflowMitra is a workflow automation platform that makes automation accessible to every team, with expert support when you need it."
        path="/about"
      />

      <section className="about-hero">
        <div className="container">
          <h1 className="page-title">About WorkflowMitra</h1>
          <p className="page-subtitle">
            We're on a mission to make automation accessible to every team
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              WorkflowMitra was built with a simple belief: automation shouldn't require coding expertise.
              We've built a platform that empowers teams of all sizes to automate their workflows without writing a single line of code.
            </p>
            <p>
              What makes us different is our team of automation experts who are ready to help you build your workflows. You focus on your business — we handle the automation.
            </p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3><FaRocket /> Innovation</h3>
              <p>We constantly push boundaries to deliver cutting-edge automation solutions.</p>
            </div>
            <div className="value-card">
              <h3><FaHandshake /> Customer First</h3>
              <p>Your success is our success. We're here to help you achieve your goals.</p>
            </div>
            <div className="value-card">
              <h3><FaBullseye /> Simplicity</h3>
              <p>Complex problems deserve simple solutions. We make automation easy.</p>
            </div>
            <div className="value-card">
              <h3><FaGlobe /> Transparency</h3>
              <p>We believe in honest communication and building trust with our users.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <h2>Ready to automate your workflows?</h2>
          <p>Start building for free, or talk to our team about your automation needs.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <RollButton href="https://app.workflowmitra.com/signup" variant="dark" size="lg" showArrow>Start Building Free</RollButton>
            <RollButton to="/contact" variant="secondary" size="lg">Get in Touch</RollButton>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
