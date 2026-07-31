import { motion } from 'framer-motion'
import '../styles/SolutionHero.css'

function SolutionHero({ eyebrow, headline, description, primaryCTA, secondaryCTA, icon }) {
  return (
    <section className="solution-hero">
      <div className="solution-hero-container">
        <motion.div 
          className="solution-hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            className="solution-hero-icon-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <span className="solution-hero-icon">{icon}</span>
          </motion.div>
          
          <motion.p 
            className="solution-hero-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {eyebrow}
          </motion.p>
          
          <motion.h1 
            className="solution-hero-headline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {headline}
          </motion.h1>
          
          <motion.p 
            className="solution-hero-description"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {description}
          </motion.p>
          
          <motion.div 
            className="solution-hero-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <button className="solution-hero-btn-primary">
              {primaryCTA}
            </button>
            <button className="solution-hero-btn-secondary">
              {secondaryCTA}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default SolutionHero
