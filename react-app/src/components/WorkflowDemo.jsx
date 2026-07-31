import { motion } from 'framer-motion'
import { useState } from 'react'
import WorkflowNode from './WorkflowNode'
import '../styles/WorkflowDemo.css'

function WorkflowDemo({ useCases }) {
  const [activeCase, setActiveCase] = useState(0)
  
  return (
    <section className="workflow-demo">
      <div className="workflow-demo-container">
        <motion.div 
          className="workflow-demo-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="workflow-demo-title">See how it works</h2>
          <p className="workflow-demo-subtitle">
            Real automation workflows you can build in minutes
          </p>
        </motion.div>

        <div className="workflow-demo-tabs">
          {useCases.map((useCase, index) => (
            <motion.button
              key={useCase.id}
              className={`workflow-demo-tab ${activeCase === index ? 'active' : ''}`}
              onClick={() => setActiveCase(index)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <div className="workflow-demo-tab-content">
                <h3 className="workflow-demo-tab-title">{useCase.title}</h3>
                <p className="workflow-demo-tab-desc">{useCase.description}</p>
              </div>
              {activeCase === index && (
                <motion.div 
                  className="workflow-demo-tab-indicator"
                  layoutId="activeTab"
                />
              )}
            </motion.button>
          ))}
        </div>

        <motion.div 
          className="workflow-demo-content"
          key={activeCase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="workflow-nodes">
            {useCases[activeCase].workflow.map((node, index) => (
              <WorkflowNode 
                key={index}
                node={node}
                index={index}
                total={useCases[activeCase].workflow.length}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WorkflowDemo
