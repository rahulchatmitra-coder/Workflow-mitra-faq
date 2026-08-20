import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import {
  Zap,
  Network,
  Bot,
  CheckCircle2,
  Rocket,
} from 'lucide-react'
import './ConicornHowWeWorkSection.css'

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Choose Your Trigger',
    desc: 'Pick webhooks, scheduled crons, form submissions, Stripe checkouts, or app events from 200+ connected sources.',
    icon: Zap,
  },
  {
    number: '02',
    title: 'Connect Your Apps',
    desc: 'Authenticate WhatsApp, HubSpot, Slack, Shopify, Sheets, and databases with pre-built zero-code connectors.',
    icon: Network,
  },
  {
    number: '03',
    title: 'Add AI Intelligence',
    desc: 'Inject GPT-4o, Claude 3.5, or Gemini nodes for smart routing, classification, reasoning, and automated data enrichment.',
    icon: Bot,
  },
  {
    number: '04',
    title: 'Test & Validate in Real Time',
    desc: 'Run sample payloads through visual debuggers, inspect step-by-step inputs and outputs, and verify edge cases.',
    icon: CheckCircle2,
  },
  {
    number: '05',
    title: 'Deploy & Run on Autopilot',
    desc: 'Turn on 24/7 autonomous execution with self-healing auto-retries, SLA monitoring, error alerts, and sub-second execution.',
    icon: Rocket,
  },
]

export default function ConicornHowWeWorkSection() {
  const containerRef = useRef(null)
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  // Track scroll position through the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 70%'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.001,
  })

  // Center vertical line height from first dot to last dot (0% to 100%)
  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  // Dynamically activate steps as the line reaches each dot
  useEffect(() => {
    return scrollYProgress.on('change', latest => {
      const stepCount = PROCESS_STEPS.length
      // Break into step thresholds: step 0 is active from start, step 1 at ~0.25, step 2 at ~0.5, step 3 at ~0.75, step 4 at ~0.95
      let activeIdx = 0
      if (latest >= 0.85) {
        activeIdx = 4
      } else if (latest >= 0.62) {
        activeIdx = 3
      } else if (latest >= 0.38) {
        activeIdx = 2
      } else if (latest >= 0.15) {
        activeIdx = 1
      } else {
        activeIdx = 0
      }
      setActiveStepIndex(activeIdx)
    })
  }, [scrollYProgress])

  return (
    <section className="conicorn-process-section" id="how-it-works" ref={containerRef}>
      <div className="conicorn-padding-global">
        <div className="conicorn-container-medium">
          <div className="conicorn-process-layout">
            
            {/* Simple, Clean Centered Header (Exact Conicorn Look) */}
            <div className="conicorn-heading-layout">
              <h2 className="conicorn-heading-title">
                From trigger to autopilot in 5 simple steps.
              </h2>
              <p className="conicorn-subheading-text">
                Connect your favorite business apps, inject AI intelligence, and let your workflows run 24/7 — without writing a single line of code.
              </p>
            </div>

            {/* Process Main Timeline with Continuous Center Scroll Line */}
            <div className="conicorn-process-main">
              
              {/* Continuous Center Track & Dynamic Iridescent Scroll Gradient Line (ON TOP OF CARDS) */}
              <div className="conicorn-process-line-ray" aria-hidden="true">
                <motion.div
                  className="conicorn-process-line"
                  style={{ height: lineHeight }}
                />
              </div>

              {/* 5 Alternating Process Rows (Exact Conicorn 3-Column Layout) */}
              {PROCESS_STEPS.map((step, index) => {
                const isActive = index <= activeStepIndex
                const isEven = index % 2 === 1
                const IconComponent = step.icon

                return (
                  <div
                    key={step.number}
                    className={`conicorn-process-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveStepIndex(index)}
                  >
                    {/* Left Column */}
                    {isEven ? (
                      /* Even Row (02, 04): Content Block Aligned Right */
                      <div className="conicorn-process-item-block align-right">
                        <div className="conicorn-process-item-content align-right">
                          <h3 className="conicorn-process-item-title">{step.title}</h3>
                          <p className="conicorn-process-item-desc">{step.desc}</p>
                        </div>
                      </div>
                    ) : (
                      /* Odd Row (01, 03, 05): Icon Frame + Number Aligned Left */
                      <div className="conicorn-process-item-block">
                        <div className="conicorn-process-item-number-wrap">
                          <div className={`conicorn-process-item-icon-frame ${isActive ? 'active' : ''}`}>
                            <div className="conicorn-process-item-icon">
                              <IconComponent size={26} />
                            </div>
                          </div>
                          <div className={`conicorn-process-item-number ${isActive ? 'active' : ''}`}>
                            {step.number}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Center Column: Holographic Iridescent Pulse Dot */}
                    <div className="conicorn-process-item-center">
                      <div className={`conicorn-process-dot ${isActive ? 'active' : ''}`}>
                        <div className={`conicorn-process-dot-inner ${isActive ? 'active' : ''}`}>
                          <div className={`conicorn-process-dot-dot ${isActive ? 'active' : ''}`} />
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    {isEven ? (
                      /* Even Row (02, 04): Number + Icon Frame Aligned Right */
                      <div className="conicorn-process-item-block">
                        <div className="conicorn-process-item-number-wrap">
                          <div className={`conicorn-process-item-number ${isActive ? 'active' : ''}`}>
                            {step.number}
                          </div>
                          <div className={`conicorn-process-item-icon-frame ${isActive ? 'active' : ''}`}>
                            <div className="conicorn-process-item-icon">
                              <IconComponent size={26} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Odd Row (01, 03, 05): Content Block Aligned Left */
                      <div className="conicorn-process-item-block">
                        <div className="conicorn-process-item-content">
                          <h3 className="conicorn-process-item-title">{step.title}</h3>
                          <p className="conicorn-process-item-desc">{step.desc}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
