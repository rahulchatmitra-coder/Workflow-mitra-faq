import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import FlowMitraLogo from './FlowMitraLogo'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="footer-logo" aria-label="FlowMitra home">
              <FlowMitraLogo size="md" variant="full" />
            </Link>
            <p className="footer-tagline">Build AI agents for your team</p>
            <div className="footer-social">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-icon">
                <FaTwitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
                <FaLinkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon">
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-heading">Product</h3>
              <ul>
                <li><Link to="/">Features</Link></li>
                <li><Link to="/apps">Integrations</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/solutions">Solutions</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Company</h3>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/pricing">Plans</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Resources</h3>
              <ul>
                <li><Link to="/contact">Support</Link></li>
                <li><Link to="/apps">App Directory</Link></li>
                <li><Link to="/solutions">Use Cases</Link></li>
                <li><Link to="/docs">Documentation</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Legal</h3>
              <ul>
                <li><Link to="/about">Privacy</Link></li>
                <li><Link to="/about">Terms</Link></li>
                <li><Link to="/about">Security</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 FlowMitra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
