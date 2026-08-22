import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { getBrandIcon } from '../utils/brandIcons'
import { MODELS, INTEGRATIONS, TASKS, AGENTS } from './aiSectionData'

describe('MODELS', () => {
  it('lists ten marks', () => {
    expect(MODELS).toHaveLength(10)
  })

  // The @lobehub/icons test stub renders nothing, so counting <svg> in the
  // arc would pass at zero. Assert the component reference instead.
  it('gives every entry a component and a colour', () => {
    MODELS.forEach((m) => {
      expect(typeof m.Icon, m.key).toBe('function')
      expect(m.color, m.key).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })

  it('puts the flagship at full size in the middle', () => {
    const peak = Math.max(...MODELS.map((m) => m.share))
    const lead = MODELS.filter((m) => m.share === peak)
    expect(lead).toHaveLength(1)
    expect(lead[0].key).toBe('openai')
    expect(MODELS.indexOf(lead[0])).toBe(5)
  })

  it('tapers symmetrically away from the flagship', () => {
    const shares = MODELS.map((m) => m.share)
    const lead = shares.indexOf(Math.max(...shares))
    for (let i = 1; i < lead; i++) expect(shares[i]).toBeGreaterThan(shares[i - 1])
    for (let i = lead + 1; i < shares.length; i++) expect(shares[i]).toBeLessThan(shares[i - 1])
  })

  it('carries no app that is not a model or provider', () => {
    expect(MODELS.map((m) => m.key)).not.toContain('notion')
  })

  it('names the five providers the AI node can dial', () => {
    const keys = MODELS.map((m) => m.key)
    ;['openai', 'anthropic', 'gemini', 'groq', 'ollama'].forEach((p) =>
      expect(keys).toContain(p)
    )
  })
})

describe('INTEGRATIONS', () => {
  const real = INTEGRATIONS.filter(Boolean)

  it('fills a 32-slot grid with 32 real apps', () => {
    expect(INTEGRATIONS).toHaveLength(32)
    expect(real).toHaveLength(32)
  })

  it('repeats no app', () => {
    expect(new Set(real).size).toBe(real.length)
  })

  // getBrandIcon returns null for an unknown name, and the grid would render
  // an empty white tile that reads as a deliberate blank. Catch it here.
  it.each(INTEGRATIONS.filter(Boolean))('resolves a renderable mark for "%s"', (name) => {
    const icon = getBrandIcon(name, { size: 20 })
    expect(icon?.component, name).toBeTruthy()
    const { container } = render(<>{icon.component}</>)
    expect(container.querySelector('svg'), name).toBeInTheDocument()
  })
})

describe('TASKS', () => {
  it('lists the three schedules a business turns on first', () => {
    expect(TASKS.map((t) => t.name)).toEqual([
      'Abandoned cart recovery',
      'Daily sales report',
      'Payment reminder',
    ])
  })

  it('badges each row with a real brand', () => {
    TASKS.forEach((t) => {
      const icon = getBrandIcon(t.brand, { size: 13 })
      expect(icon?.component, t.brand).toBeTruthy()
      expect(t.badgeBg, t.brand).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })

  it('gives every row outcomes to cycle and a run counter', () => {
    TASKS.forEach((t) => {
      expect(t.outcomes.length, t.name).toBeGreaterThanOrEqual(2)
      expect(t.live.runs, t.name).toBeGreaterThan(0)
      expect(t.live.unit, t.name).toBeTruthy()
    })
  })
})

describe('AGENTS', () => {
  it('names each agent after the system it drives', () => {
    expect(AGENTS.map((a) => a.label)).toEqual([
      'WhatsApp Inbox Agent',
      'Shopify Order Agent',
      'Zendesk Handoff Agent',
    ])
  })

  it('resolves the avatar brand and all three mini marks', () => {
    AGENTS.forEach((a) => {
      expect(getBrandIcon(a.brand, { size: 13 })?.component, a.brand).toBeTruthy()
      expect(a.minis, a.label).toHaveLength(3)
      a.minis.forEach((m) =>
        expect(getBrandIcon(m, { size: 11 })?.component, `${a.label}/${m}`).toBeTruthy()
      )
    })
  })
})
