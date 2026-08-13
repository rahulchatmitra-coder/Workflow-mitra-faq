import { describe, it, expect } from 'vitest'
import { templatesUsingApp, coOccurrenceCounts, recommendedWorkflows } from './templatesForIntegration'

const templateFlows = [
  {
    templateId: 1,
    nodes: [
      { id: 'n1', app: 'facebook' },
      { id: 'n2', app: 'webhook' },
      { id: 'n3', app: 'hubspot' },
      { id: 'n4', app: 'gmail' },
      { id: 'n5', app: 'slack' },
      { id: 'n6', app: 'sheets' },
    ],
  },
  {
    templateId: 2,
    nodes: [
      { id: 'n1', app: 'shopify' },
      { id: 'n2', app: 'zoho' },
      { id: 'n3', app: 'whatsapp' },
      { id: 'n4', app: 'truck' },
      { id: 'n5', app: 'sheets' },
    ],
  },
]
const aliasMap = { sheets: 'google-sheets', zoho: 'zoho-books', truck: 'shiprocket' }
const metadataById = { 1: { title: 'Facebook lead → CRM → team alert' }, 2: { title: 'Shopify order → invoice → WhatsApp + shipping' } }

describe('templatesUsingApp', () => {
  it('finds templates by aliased app key', () => {
    const result = templatesUsingApp('google-sheets', { templateFlows, aliasMap, metadataById })
    expect(result.map((t) => t.id).sort()).toEqual([1, 2])
  })

  it('finds templates by unaliased (already-canonical) app key', () => {
    const result = templatesUsingApp('slack', { templateFlows, aliasMap, metadataById })
    expect(result).toEqual([{ id: 1, title: 'Facebook lead → CRM → team alert' }])
  })

  it('returns an empty array for a slug used in no template', () => {
    expect(templatesUsingApp('telegram', { templateFlows, aliasMap, metadataById })).toEqual([])
  })

  it('has no built-in concept of "generic" keys — it matches whatever literal app key is queried, exactly like any other', () => {
    // 'webhook' is a real literal app key on template 1's trigger node, so
    // it DOES match — generic/logic node types are only ever excluded in
    // practice because real callers (IntegrationDocTemplate) exclusively
    // query registry slugs, never a generic key like this. No separate
    // exclude-list belongs in this function.
    const result = templatesUsingApp('webhook', { templateFlows, aliasMap, metadataById })
    expect(result).toEqual([{ id: 1, title: 'Facebook lead → CRM → team alert' }])
  })
})

describe('coOccurrenceCounts', () => {
  it('counts how many templates pair a given slug with each other app', () => {
    const counts = coOccurrenceCounts('google-sheets', { templateFlows, aliasMap })
    expect(counts.slack).toBe(1)
    expect(counts.whatsapp).toBe(1)
    expect(counts['zoho-books']).toBe(1)
  })
})

describe('recommendedWorkflows', () => {
  it('returns up to `limit` use cases reformatted as starter prompts', () => {
    const useCases = [{ icon: 'bag', text: 'Post an order alert.' }, { icon: 'bell', text: 'Post a failure alert.' }, { icon: 'calendar', text: 'Post a daily digest.' }]
    const result = recommendedWorkflows(useCases, 2)
    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({ icon: 'bag', text: 'Post an order alert.' })
  })
})
