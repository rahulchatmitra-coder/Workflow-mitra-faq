import React from 'react'
import { Sparkles } from 'lucide-react'
import { WorkflowCanvas } from './WorkflowCanvas'
import { DriverTourButton } from './DriverTourButton'

export function WorkflowDemoSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 pb-12 sm:px-6 lg:px-8" style={{ maxWidth: '1152px', margin: '0 auto', padding: '32px 20px 48px' }}>
      {/* SECTION TITLE & DRIVER TOUR BUTTON */}
      <div className="flex items-center justify-between pb-6" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '24px' }}>
        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              borderRadius: '9999px',
              border: '1px solid #d4d4d8',
              background: '#f4f4f5',
              padding: '4px 14px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#09090b',
            }}
          >
            <Sparkles size={14} color="#f59e0b" />
            <span>Interactive Flow Demo</span>
          </span>

          <h3
            style={{
              fontSize: '30px',
              fontWeight: 900,
              letterSpacing: '-0.025em',
              color: '#09090b',
              margin: '8px 0 0',
            }}
          >
            Workflow Automation Builder
          </h3>
        </div>

        <div style={{ flexShrink: 0 }}>
          <DriverTourButton title="Interactive Workflow Demo" size="lg" />
        </div>
      </div>

      {/* VISUAL WORKFLOW CANVAS COMPONENT */}
      <WorkflowCanvas />
    </section>
  )
}

export { WorkflowCanvas, DriverTourButton }
export default WorkflowDemoSection
