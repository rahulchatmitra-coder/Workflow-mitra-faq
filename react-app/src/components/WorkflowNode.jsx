import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import '../styles/WorkflowNode.css'

function WorkflowNode({ node, index, total }) {
  return (
    <div className="workflow-node-wrapper">
      <motion.div 
        className="workflow-node"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="workflow-node-icon">
          {node.icon}
        </div>
        <div className="workflow-node-content">
          <h4 className="workflow-node-title">{node.title}</h4>
          <p className="workflow-node-subtitle">{node.subtitle}</p>
        </div>
        <div className="workflow-node-badge">
          {index + 1}
        </div>
      </motion.div>
      
      {index < total - 1 && (
        <motion.div 
          className="workflow-connector"
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.2, duration: 0.3 }}
        >
          <ArrowDown size={18} />
        </motion.div>
      )}
    </div>
  )
}

export default WorkflowNode
