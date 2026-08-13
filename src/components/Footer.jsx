import { Link } from 'react-router-dom'
import FlowMitraLogo from './FlowMitraLogo'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="footer-logo" aria-label="WorkflowMitra home">
              <FlowMitraLogo size="md" variant="full" />
            </Link>
            <p className="footer-tagline">Workflow automation, made simple</p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-heading">Product</h3>
              <ul>
                <li><Link to="/integrations">Integrations</Link></li>
                <li><Link to="/templates">Templates</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/solutions">Solutions</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Company</h3>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Resources</h3>
              <ul>
                <li><Link to="/docs">Documentation</Link></li>
                <li><Link to="/templates">Templates</Link></li>
                <li><Link to="/solutions">Use Cases</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; 2026 WorkflowMitra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
