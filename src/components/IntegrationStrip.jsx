import { motion } from 'framer-motion'
import { FaCube } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../styles/IntegrationStrip.css'
import { getBrandIcon } from '../utils/brandIcons'
import { docsPathForApp } from '../utils/docs/appLinkable'
import integrationRegistry from '../data/integrationRegistry'

const APP_ALIAS_MAP = { sheets: 'google-sheets', zoho: 'zoho-books', truck: 'shiprocket' }

function IntegrationStrip({ integrations, color }) {
  return (
    <section className="integration-strip">
      <div className="integration-strip-container">
        <motion.div 
          className="integration-strip-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="integration-strip-title">Works with your tools</h2>
          <p className="integration-strip-subtitle">
            Connect to the platforms you already use
          </p>
        </motion.div>

        <div className="integration-strip-grid">
          {integrations.map((integration, index) => {
            const brandData = getBrandIcon(integration, { size: 24, color: color });
            const docsPath = docsPathForApp(integration, { registry: integrationRegistry, aliasMap: APP_ALIAS_MAP });

            const content = (
              <>
                <div className="integration-strip-item-icon" style={{
                  backgroundColor: `${color}15`,
                  color
                }}>
                  {brandData ? brandData.component : <FaCube />}
                </div>
                <span className="integration-strip-item-name">{integration}</span>
              </>
            )

            return (
              <motion.div
                key={integration}
                className="integration-strip-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
                }}
              >
                {docsPath ? (
                  <Link to={docsPath} className="integration-strip-item-link">{content}</Link>
                ) : content}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default IntegrationStrip
