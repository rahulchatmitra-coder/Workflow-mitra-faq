import React from 'react'
import { Sparkles } from 'lucide-react'
import { WorkflowCanvas } from './WorkflowCanvas'
import { DriverTourButton } from './DriverTourButton'

export function WorkflowDemoSection() {
  return (
    <section id="workflow-demo" className="wm-canvas-section">
      <div className="wm-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="wm-hero-badge" style={{ marginBottom: '8px' }}>
              <Sparkles size={13} />
              <span>Interactive Flow Demo</span>
            </div>
            <h2 className="wm-section-title" style={{ textAlign: 'left', margin: 0 }}>
              Workflow Automation Builder
            </h2>
          </div>
          <DriverTourButton title="Interactive Workflow Demo" size="lg" />
        </div>

        {/* VISUAL WORKFLOW CANVAS COMPONENT */}
        <WorkflowCanvas />
      </div>
    </section>
  )
}
