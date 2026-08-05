import { describe, it, expect } from 'vitest'
import integrationRegistry from './integrationRegistry'
import { CATEGORIES } from './categories'

describe('integrationRegistry', () => {
  it('has a unique, non-empty slug for every entry', () => {
    const slugs = integrationRegistry.map((e) => e.slug)
    expect(slugs.length).toBeGreaterThan(0)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('every entry has a category from the locked taxonomy', () => {
    integrationRegistry.forEach((e) => {
      expect(CATEGORIES).toContain(e.category)
    })
  })

  it('every entry has status live or coming-soon', () => {
    integrationRegistry.forEach((e) => {
      expect(['live', 'coming-soon']).toContain(e.status)
    })
  })

  it('marks exactly the 8 phase-1 flagship integrations as live', () => {
    const live = integrationRegistry.filter((e) => e.status === 'live').map((e) => e.slug).sort()
    expect(live).toEqual(
      ['ai-agent', 'gmail', 'google-sheets', 'http-request', 'shopify', 'slack', 'telegram', 'whatsapp'].sort()
    )
  })

  it('every live entry has a non-empty shortDescription and credentialType', () => {
    integrationRegistry.filter((e) => e.status === 'live').forEach((e) => {
      expect(e.shortDescription.length).toBeGreaterThan(0)
      expect(e.credentialType.length).toBeGreaterThan(0)
    })
  })
})
