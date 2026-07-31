import { motion } from 'framer-motion'
import '../styles/IntegrationStrip.css'

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
          {integrations.map((integration, index) => (
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
              <div className="integration-strip-item-icon" style={{ 
                backgroundColor: `${color}15`,
                color
              }}>
                {integration.charAt(0).toUpperCase()}
              </div>
              <span className="integration-strip-item-name">{integration}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IntegrationStrip
