import { describe, it, expect } from 'vitest'
import { getRelatedIntegrations } from './relatedIntegrations'

const registry = [
  { slug: 'slack', category: 'MESSAGING', status: 'live' },
  { slug: 'discord', category: 'MESSAGING', status: 'coming-soon' },
  { slug: 'telegram', category: 'MESSAGING', status: 'live' },
  { slug: 'whatsapp', category: 'MESSAGING', status: 'live' },
  { slug: 'gmail', category: 'EMAIL', status: 'live' },
  { slug: 'shopify', category: 'COMMERCE', status: 'live' },
]

describe('getRelatedIntegrations', () => {
  it('excludes the current slug', () => {
    const result = getRelatedIntegrations('slack', { registry })
    expect(result).not.toContain('slack')
  })

  it('only returns same-category candidates when there is no co-occurrence data', () => {
    const result = getRelatedIntegrations('slack', { registry })
    result.forEach((slug) => {
      const entry = registry.find((e) => e.slug === slug)
      expect(entry.category).toBe('MESSAGING')
    })
  })

  it('ranks higher co-occurrence counts first', () => {
    const result = getRelatedIntegrations('slack', {
      registry,
      coOccurrenceCounts: { discord: 1, telegram: 5, whatsapp: 2 },
    })
    expect(result[0]).toBe('telegram')
  })

  it('caps results at the given limit', () => {
    const result = getRelatedIntegrations('slack', { registry, limit: 2 })
    expect(result.length).toBeLessThanOrEqual(2)
  })

  it('returns the override verbatim when provided, ignoring the algorithm', () => {
    const result = getRelatedIntegrations('slack', { registry, override: ['gmail', 'shopify'] })
    expect(result).toEqual(['gmail', 'shopify'])
  })
})
