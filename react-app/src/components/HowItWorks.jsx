import { motion } from 'framer-motion'
import '../styles/HowItWorks.css'

function HowItWorks({ steps, color }) {
  return (
    <section className="how-it-works">
      <div className="how-it-works-container">
        <motion.div 
          className="how-it-works-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="how-it-works-title">How it works</h2>
          <p className="how-it-works-subtitle">
            Get started in minutes, not hours
          </p>
        </motion.div>

        <div className="how-it-works-steps">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              className="how-it-works-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div className="how-it-works-step-number" style={{ 
                backgroundColor: `${color}15`,
                color,
                borderColor: `${color}30`
              }}>
                {step.step}
              </div>
              <div className="how-it-works-step-content">
                <h3 className="how-it-works-step-title">{step.title}</h3>
                <p className="how-it-works-step-desc">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
