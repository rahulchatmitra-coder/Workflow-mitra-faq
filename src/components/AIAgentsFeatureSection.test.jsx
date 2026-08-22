import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, act, cleanup } from '@testing-library/react'
import AIAgentsFeatureSection from './AIAgentsFeatureSection'
import { INTEGRATIONS } from '../data/aiSectionData'

afterEach(cleanup)

describe('AIAgentsFeatureSection — card 1, models', () => {
  it('renders ten model tokens', () => {
    const { container } = render(<AIAgentsFeatureSection />)
    expect(container.querySelectorAll('.logo-token')).toHaveLength(10)
  })

  it('sizes every token off the shared --tok property so the arc scales', () => {
    const { container } = render(<AIAgentsFeatureSection />)
    container.querySelectorAll('.logo-token').forEach((el) => {
      expect(el.style.width).toMatch(/var\(--tok\)/)
    })
  })

  it('names the providers under the arc', () => {
    const { container } = render(<AIAgentsFeatureSection />)
    expect(container.querySelector('.model-caption').textContent).toMatch(
      /OpenAI, Claude, Gemini, Groq, Ollama/
    )
  })
})

describe('AIAgentsFeatureSection — card 2, integrations', () => {
  it('renders a tile per slot, ghosts included', () => {
    const { container } = render(<AIAgentsFeatureSection />)
    expect(container.querySelectorAll('.tile')).toHaveLength(INTEGRATIONS.length)
    expect(container.querySelectorAll('.tile.ghost')).toHaveLength(
      INTEGRATIONS.filter((k) => !k).length
    )
  })

  it('draws a real mark inside every non-ghost tile', () => {
    const { container } = render(<AIAgentsFeatureSection />)
    const real = container.querySelectorAll('.tile:not(.ghost)')
    expect(real).toHaveLength(32)
    real.forEach((tile) => expect(tile.querySelector('svg')).toBeInTheDocument())
  })

  it('gives every tile the same white treatment, not per-tile tints', () => {
    const { container } = render(<AIAgentsFeatureSection />)
    container.querySelectorAll('.tile:not(.ghost)').forEach((tile) => {
      expect(tile.getAttribute('style') || '').not.toMatch(/background/)
    })
  })
})

describe('AIAgentsFeatureSection — card 3, recurring tasks', () => {
  it('lists the three schedules', () => {
    const { container } = render(<AIAgentsFeatureSection />)
    const rows = container.querySelectorAll('.task-row')
    expect(rows).toHaveLength(3)
    expect([...rows].map((r) => r.querySelector('.name').textContent)).toEqual([
      'Abandoned cart recovery',
      'Daily sales report',
      'Payment reminder',
    ])
  })

  it('badges each row with a brand mark, not a hand-drawn glyph', () => {
    const { container } = render(<AIAgentsFeatureSection />)
    container.querySelectorAll('.task-icon').forEach((badge) => {
      expect(badge.querySelector('svg')).toBeInTheDocument()
    })
  })

  it('shows a run counter per row', () => {
    const { container } = render(<AIAgentsFeatureSection />)
    const runs = container.querySelectorAll('.runs b')
    expect(runs).toHaveLength(3)
    expect(runs[0].textContent).toMatch(/^[\d,]+$/)
  })

  it('advances the timeline and banks a run once the schedule fires', () => {
    vi.useFakeTimers()
    try {
      const { container } = render(<AIAgentsFeatureSection />)
      const before = container.querySelector('.runs b').textContent
      expect(container.querySelector('.tag').textContent).toBe('Watching…')

      act(() => { vi.advanceTimersByTime(1000) })

      expect(container.querySelector('.tag').textContent).not.toBe('Watching…')
      expect(container.querySelector('.runs b').textContent).not.toBe(before)
      expect(container.querySelector('.dot.now')).toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })

  it('labels the axis as a business day', () => {
    const { container } = render(<AIAgentsFeatureSection />)
    expect(container.querySelector('.axis .labels').textContent).toBe('9 AM12 PM3 PM6 PM9 PM')
  })
})

describe('AIAgentsFeatureSection — card 4, canvas', () => {
  it('names each agent after the system it drives', () => {
    const { container } = render(<AIAgentsFeatureSection />)
    const nodes = container.querySelectorAll('.node')
    expect(nodes).toHaveLength(3)
    expect([...nodes].map((n) => n.querySelector('.node-label').textContent)).toEqual([
      'WhatsApp Inbox Agent',
      'Shopify Order Agent',
      'Zendesk Handoff Agent',
    ])
  })

  it('puts a brand mark on every avatar and every mini chip', () => {
    const { container } = render(<AIAgentsFeatureSection />)
    container.querySelectorAll('.node').forEach((node) => {
      expect(node.querySelector('.avatar svg')).toBeInTheDocument()
      const minis = node.querySelectorAll('.mini i')
      expect(minis).toHaveLength(3)
      minis.forEach((m) => expect(m.querySelector('svg')).toBeInTheDocument())
    })
  })

  it('runs a packet down each branch, without a JS timer', () => {
    const { container } = render(<AIAgentsFeatureSection />)
    expect(container.querySelectorAll('.packet')).toHaveLength(2)
    expect(container.querySelector('.packet.a')).toBeInTheDocument()
    expect(container.querySelector('.packet.b')).toBeInTheDocument()
    expect(container.querySelectorAll('.flow')).toHaveLength(2)
  })

  it('cross-fades three captions under the canvas', () => {
    const { container } = render(<AIAgentsFeatureSection />)
    expect(container.querySelectorAll('.canvas-foot .cap')).toHaveLength(3)
  })
})

describe('AIAgentsFeatureSection — no placeholder art survives', () => {
  it('renders no bare coloured square in place of a logo', () => {
    const { container } = render(<AIAgentsFeatureSection />)
    container.querySelectorAll('.mini i, .avatar, .task-icon').forEach((el) => {
      expect(el.querySelector('svg'), el.className).toBeInTheDocument()
    })
  })
})
