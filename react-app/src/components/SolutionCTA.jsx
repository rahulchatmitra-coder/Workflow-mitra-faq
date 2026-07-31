import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import '../styles/SolutionCTA.css'

function SolutionCTA({ title, color }) {
  return (
    <section className="solution-cta">
      <div className="solution-cta-container">
        <motion.div 
          className="solution-cta-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ borderColor: `${color}30` }}
        >
          <div className="solution-cta-content">
            <h2 className="solution-cta-title">
              Ready to automate your {title.toLowerCase()} workflows?
            </h2>
            <p className="solution-cta-description">
              Start building in minutes. No credit card required.
            </p>
            <div className="solution-cta-actions">
              <motion.button 
                className="solution-cta-btn-primary"
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started Free
                <ArrowRight size={20} />
              </motion.button>
              <motion.button 
                className="solution-cta-btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a Demo
              </motion.button>
            </div>
          </div>
          <div className="solution-cta-decoration" style={{ backgroundColor: `${color}08` }} />
        </motion.div>
      </div>
    </section>
  )
}

export default SolutionCTA
