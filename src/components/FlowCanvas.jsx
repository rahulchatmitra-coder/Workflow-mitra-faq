import React, { useState, useEffect } from 'react'
import {
  Slack,
  WhatsappIcon,
  HubSpotLogo,
  FacebookLogo,
} from './ui/svgs'
import { GitBranch } from 'lucide-react'
import './FlowCanvas.css'

const HERO_FLOW_NODES = [
  { id: '1', label: 'On Webhook', sub: 'Lead Form', Icon: FacebookLogo, color: '#1877F2', x: 50, y: 100 },
  { id: '2', label: 'IF Filter', sub: 'Has Email?', Icon: GitBranch, color: '#EA580C', x: 170, y: 100 },
  { id: '3', label: 'HubSpot CRM', sub: 'Sync Contact', Icon: HubSpotLogo, color: '#FF7A59', x: 290, y: 100 },
  { id: '4', label: 'WhatsApp', sub: 'Fast 5s Reply', Icon: WhatsappIcon, color: '#25D366', x: 440, y: 55 },
  { id: '5', label: 'Slack Alert', sub: '#sales-leads', Icon: Slack, color: '#4A154B', x: 440, y: 145 },
]

export default function FlowCanvas({ step: externalStep }) {
  const [internalStep, setInternalStep] = useState(0)

  useEffect(() => {
    if (externalStep !== undefined) {
      setInternalStep(externalStep)
      return
    }
    const timer = setInterval(() => {
      setInternalStep((s) => (s + 1) % 5)
    }, 1500)
    return () => clearInterval(timer)
  }, [externalStep])

  const curStep = internalStep % 5

  return (
    <div
      className="fc-canvas"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '520px',
        height: '210px',
        margin: '0 auto',
        display: 'block',
      }}
    >
      {/* SVG CONNECTING WIRES */}
      <svg
        viewBox="0 0 520 210"
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}
      >
        {/* Wire 1: Node 1 -> Node 2 */}
        <path
          d="M 74 100 L 146 100"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="2.5"
          strokeDasharray="4 4"
        />
        {curStep >= 1 && (
          <path
            d="M 74 100 L 146 100"
            fill="none"
            stroke="#1877F2"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="fc-wire-anim"
          />
        )}

        {/* Wire 2: Node 2 -> Node 3 */}
        <path
          d="M 194 100 L 266 100"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="2.5"
          strokeDasharray="4 4"
        />
        {curStep >= 2 && (
          <path
            d="M 194 100 L 266 100"
            fill="none"
            stroke="#EA580C"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="fc-wire-anim"
          />
        )}

        {/* Wire 3: Node 3 -> Node 4 (WhatsApp Branch) */}
        <path
          d="M 314 100 C 365 100, 365 55, 416 55"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="2.5"
          strokeDasharray="4 4"
        />
        {curStep >= 3 && (
          <path
            d="M 314 100 C 365 100, 365 55, 416 55"
            fill="none"
            stroke="#25D366"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="fc-wire-anim"
          />
        )}

        {/* Wire 4: Node 3 -> Node 5 (Slack Branch) */}
        <path
          d="M 314 100 C 365 100, 365 145, 416 145"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="2.5"
          strokeDasharray="4 4"
        />
        {curStep >= 4 && (
          <path
            d="M 314 100 C 365 100, 365 145, 416 145"
            fill="none"
            stroke="#4A154B"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="fc-wire-anim"
          />
        )}
      </svg>

      {/* RENDER THE 5 FLOW NODES */}
      {HERO_FLOW_NODES.map((node, i) => {
        const isCurrent = i === curStep
        const NodeIcon = node.Icon

        return (
          <div
            key={node.id}
            style={{
              position: 'absolute',
              left: `${node.x}px`,
              top: `${node.y}px`,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 10,
              cursor: 'default',
              transition: 'all 0.2s ease',
            }}
          >
            {/* Step Number Badge */}
            <span
              style={{
                position: 'absolute',
                top: '-7px',
                right: '-4px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: isCurrent ? '#09090b' : node.color,
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ffffff',
                zIndex: 12,
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
              }}
            >
              {node.id}
            </span>

            {/* Icon Disc */}
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '13px',
                background: node.type === 'if' ? '#EA580C' : '#ffffff',
                border: `2px solid ${isCurrent ? '#09090b' : '#cbd5e1'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isCurrent
                  ? `0 0 0 5px ${node.color}33, 0 8px 18px rgba(0,0,0,0.12)`
                  : '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.2s ease',
                padding: '8px',
              }}
            >
              {node.type === 'if' ? (
                <GitBranch size={22} color="#ffffff" />
              ) : (
                <NodeIcon className="h-6 w-6" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
              )}
            </div>

            {/* Titles */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '6px',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#09090b', lineHeight: 1.2 }}>
                {node.label}
              </span>
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', marginTop: '1px' }}>
                {node.sub}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
