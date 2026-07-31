import { useState, useEffect, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

// ─── Default node data (easy to edit via props) ─────────────────────────────
const DEFAULT_NODES = [
  {
    id: 'trigger',
    label: 'New Gmail Email',
    caption: 'Trigger — when a new email arrives',
    iconColor: '#EA4335',
    icon: 'gmail',
  },
  {
    id: 'ai',
    label: 'AI Extracts Details',
    caption: 'Parse sender, subject & key info',
    iconColor: '#8B5CF6',
    icon: 'sparkle',
  },
  {
    id: 'action1',
    label: 'Update Google Sheet',
    caption: 'Log email data to your spreadsheet',
    iconColor: '#0F9D58',
    icon: 'sheets',
  },
  {
    id: 'action2',
    label: 'Notify on WhatsApp',
    caption: 'Send a message to your team',
    iconColor: '#25D366',
    icon: 'whatsapp',
  },
  {
    id: 'action3',
    label: 'Send Auto-Reply',
    caption: 'Respond with a templated email',
    iconColor: '#EA4335',
    icon: 'reply',
  },
]

// ─── Node icon SVGs ─────────────────────────────────────────────────────────
function NodeIcon({ icon, color }) {
  const cls = "shrink-0"
  const s = { width: 20, height: 20 }
  switch (icon) {
    case 'gmail':
      return (
        <svg viewBox="0 0 24 24" style={s} className={cls}>
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.366l8.073-5.873C21.69 2.28 24 3.434 24 5.457z" fill={color} />
        </svg>
      )
    case 'sparkle':
      return <Sparkles size={20} color={color} className={cls} />
    case 'sheets':
      return (
        <svg viewBox="0 0 24 24" style={s} className={cls}>
          <path d="M14.7 1H5.3C4.03 1 3 2.03 3 3.3v17.4C3 21.97 4.03 23 5.3 23h13.4c1.27 0 2.3-1.03 2.3-2.3V7.3L14.7 1zM15 8V2.5L20.5 8H15zM7 13h4v2H7v-2zm0 4h10v2H7v-2zm0-8h4v2H7V9z" fill={color} />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" style={s} className={cls}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill={color} />
        </svg>
      )
    case 'reply':
      return (
        <svg viewBox="0 0 24 24" style={s} className={cls}>
          <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" fill={color} />
        </svg>
      )
    default:
      return null
  }
}

// ─── Animation constants ────────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]
const CONNECTOR_DURATION = 0.6
const NODE_SPRING = { type: 'spring', stiffness: 260, damping: 20 }

// Staggered timeline (seconds from mount)
const T = {
  node1: 0.8,
  connA: 1.3,
  node2: 1.9,
  connBranch: 2.5,
  node3: 3.1,
  node4: 3.3,
  node5: 3.5,
}

const TOTAL_BUILD = 4.2
const HOLD_SECONDS = 3

// ─── Canvas layout — all in viewBox coords (700 × 460) ─────────────────────
const VB_W = 700
const VB_H = 460

// Node center positions in viewBox coords
const POS = {
  node1: { cx: 350, cy: 55 },
  node2: { cx: 350, cy: 185 },
  node3: { cx: 120, cy: 380 },
  node4: { cx: 350, cy: 380 },
  node5: { cx: 580, cy: 380 },
}

// Node card sizes (in viewBox units)
const NODE_W = 190
const NODE_H = 62

// SVG connector paths (start from bottom of source node, end at top of target)
function makePath(src, dst) {
  const sy = src.cy + NODE_H / 2 + 2
  const dy = dst.cy - NODE_H / 2 - 2
  const midY = (sy + dy) / 2
  return `M${src.cx},${sy} C${src.cx},${midY} ${dst.cx},${midY} ${dst.cx},${dy}`
}

const PATHS = {
  connA: makePath(POS.node1, POS.node2),
  branch1: makePath(POS.node2, POS.node3),
  branch2: makePath(POS.node2, POS.node4),
  branch3: makePath(POS.node2, POS.node5),
}

// ─── Sub-components ─────────────────────────────────────────────────────────

/** Effect 3: SVG connector with pathLength animation */
function ConnectorLine({ d, delay, color = '#D1D5DB', width = 2 }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: CONNECTOR_DURATION, ease: 'easeInOut', delay }}
    />
  )
}

/** Effect 4: Glowing dot travelling along a connector (idle) */
function PulseDot({ pathD, delay = 0, reducedMotion }) {
  if (reducedMotion) return null
  return (
    <motion.circle
      r={4}
      fill="#8B5CF6"
      filter="url(#glow)"
      style={{
        offsetPath: `path("${pathD}")`,
        offsetRotate: '0deg',
      }}
      initial={{ offsetDistance: '0%' }}
      animate={{ offsetDistance: '100%' }}
      transition={{
        duration: 2.5,
        ease: 'linear',
        repeat: Infinity,
        delay,
      }}
    />
  )
}

/** Single workflow node card rendered inside the SVG via foreignObject */
function SvgNode({ node, cx, cy, delay, isIdle, reducedMotion, floatDelay }) {
  const x = cx - NODE_W / 2
  const y = cy - NODE_H / 2

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.85 }}
      animate={
        isIdle && !reducedMotion
          ? { opacity: 1, scale: 1, y: [0, -4, 0] }
          : { opacity: 1, scale: 1 }
      }
      transition={
        isIdle && !reducedMotion
          ? {
              opacity: { ...NODE_SPRING, delay },
              scale: { ...NODE_SPRING, delay },
              y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay },
            }
          : { ...NODE_SPRING, delay }
      }
      style={{ originX: `${cx}px`, originY: `${cy}px` }}
    >
      <foreignObject x={x} y={y} width={NODE_W} height={NODE_H}>
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: '#fff',
            borderRadius: 12,
            padding: '10px 14px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
            height: '100%',
            boxSizing: 'border-box',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `${node.iconColor}14`,
              flexShrink: 0,
            }}
          >
            <NodeIcon icon={node.icon} color={node.iconColor} />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#111827',
                lineHeight: 1.3,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {node.label}
            </div>
            <div
              style={{
                fontSize: 10,
                color: '#9CA3AF',
                lineHeight: 1.3,
                marginTop: 2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {node.caption}
            </div>
          </div>
        </div>
      </foreignObject>
    </motion.g>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function HeroWorkflowDemo({ nodes = DEFAULT_NODES }) {
  const reducedMotion = useReducedMotion()
  const [replayKey, setReplayKey] = useState(0)
  const [isIdle, setIsIdle] = useState(false)

  // Effect 7: loop / replay
  useEffect(() => {
    const idleTimer = setTimeout(() => setIsIdle(true), (TOTAL_BUILD + 0.5) * 1000)

    let replayTimer
    if (!reducedMotion) {
      replayTimer = setTimeout(() => {
        setIsIdle(false)
        setReplayKey((k) => k + 1)
      }, (TOTAL_BUILD + HOLD_SECONDS + 2) * 1000)
    }

    return () => {
      clearTimeout(idleTimer)
      if (replayTimer) clearTimeout(replayTimer)
    }
  }, [replayKey, reducedMotion])

  const [trigger, ai, act1, act2, act3] = useMemo(
    () => [nodes[0], nodes[1], nodes[2], nodes[3], nodes[4]],
    [nodes]
  )

  // Effect 1: entrance stagger variants
  const containerV = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }
  const childV = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE_OUT_EXPO },
    },
  }

  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* ── Effect 6: Ambient glow blobs ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500, top: '-10%', left: '-5%',
            background: 'rgba(196,181,253,0.25)', filter: 'blur(100px)',
          }}
          animate={!reducedMotion ? { scale: [1, 1.05, 1] } : undefined}
          transition={!reducedMotion ? { duration: 8, repeat: Infinity, ease: 'easeInOut' } : undefined}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400, top: '20%', right: '-8%',
            background: 'rgba(147,197,253,0.18)', filter: 'blur(100px)',
          }}
          animate={!reducedMotion ? { scale: [1, 1.06, 1] } : undefined}
          transition={!reducedMotion ? { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 } : undefined}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 350, height: 350, bottom: '-5%', left: '30%',
            background: 'rgba(196,181,253,0.15)', filter: 'blur(100px)',
          }}
          animate={!reducedMotion ? { scale: [1, 1.04, 1] } : undefined}
          transition={!reducedMotion ? { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 4 } : undefined}
        />
      </div>

      {/* ── Headline block (Effect 1) ────────────────────────────────────── */}
      <motion.div
        key={`hdr-${replayKey}`}
        className="relative mx-auto max-w-3xl px-6 text-center"
        style={{ zIndex: 1 }}
        variants={containerV}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          variants={childV}
          className="font-bold leading-tight"
          style={{ color: '#111827', fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
        >
          Build AI-Powered Workflows
          <br />
          in Seconds
        </motion.h2>

        <motion.p
          variants={childV}
          className="mt-4"
          style={{ color: '#6B7280', fontSize: '1.125rem' }}
        >
          Describe what you need. FlowMitra&apos;s AI builds it for you.
        </motion.p>

        {/* ── Prompt input bar ───────────────────────────────────────────── */}
        <motion.div variants={childV} className="mt-8 mx-auto" style={{ maxWidth: 520 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#fff',
              borderRadius: 9999,
              border: '1px solid #E5E7EB',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
              paddingLeft: 20,
              paddingRight: 6,
              paddingTop: 6,
              paddingBottom: 6,
            }}
          >
            <input
              type="text"
              readOnly
              tabIndex={-1}
              placeholder="Describe the workflow you want to automate…"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: 14,
                color: '#374151',
                fontFamily: 'inherit',
              }}
            />
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 9999,
                background: '#111827',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
              }}
              aria-label="Generate workflow"
            >
              <Sparkles size={16} color="white" />
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Workflow canvas card ──────────────────────────────────────────── */}
      <div
        key={`canvas-${replayKey}`}
        className="relative mx-auto px-6 mt-12"
        style={{ maxWidth: 780, zIndex: 1 }}
      >
        <div
          style={{
            background: '#FBFCFF',
            backgroundImage: 'radial-gradient(circle, #E5E7EB 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            borderRadius: 24,
            boxShadow: '0 20px 40px -12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
            overflow: 'hidden',
          }}
        >
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Effect 3: Connector lines (draw-in) */}
            <ConnectorLine d={PATHS.connA} delay={T.connA} color="#C4B5FD" width={2} />
            <ConnectorLine d={PATHS.branch1} delay={T.connBranch} color="#D1D5DB" width={2} />
            <ConnectorLine d={PATHS.branch2} delay={T.connBranch + 0.1} color="#D1D5DB" width={2} />
            <ConnectorLine d={PATHS.branch3} delay={T.connBranch + 0.2} color="#D1D5DB" width={2} />

            {/* Effect 4: Idle pulse dots */}
            {isIdle && (
              <>
                <PulseDot pathD={PATHS.connA} delay={0} reducedMotion={reducedMotion} />
                <PulseDot pathD={PATHS.branch1} delay={0.4} reducedMotion={reducedMotion} />
                <PulseDot pathD={PATHS.branch2} delay={0.8} reducedMotion={reducedMotion} />
                <PulseDot pathD={PATHS.branch3} delay={1.2} reducedMotion={reducedMotion} />
              </>
            )}

            {/* Effect 2 + 5: Nodes (spring scale-in + idle float) */}
            <SvgNode node={trigger} cx={POS.node1.cx} cy={POS.node1.cy} delay={T.node1} isIdle={isIdle} reducedMotion={reducedMotion} floatDelay={0} />
            <SvgNode node={ai} cx={POS.node2.cx} cy={POS.node2.cy} delay={T.node2} isIdle={isIdle} reducedMotion={reducedMotion} floatDelay={0.5} />
            <SvgNode node={act1} cx={POS.node3.cx} cy={POS.node3.cy} delay={T.node3} isIdle={isIdle} reducedMotion={reducedMotion} floatDelay={1.0} />
            <SvgNode node={act2} cx={POS.node4.cx} cy={POS.node4.cy} delay={T.node4} isIdle={isIdle} reducedMotion={reducedMotion} floatDelay={1.5} />
            <SvgNode node={act3} cx={POS.node5.cx} cy={POS.node5.cy} delay={T.node5} isIdle={isIdle} reducedMotion={reducedMotion} floatDelay={2.0} />
          </svg>
        </div>
      </div>
    </section>
  )
}
