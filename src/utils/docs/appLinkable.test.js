import { describe, it, expect } from 'vitest'
import { docsPathForApp } from './appLinkable'

const registry = [
  { slug: 'slack', status: 'live' },
  { slug: 'google-sheets', status: 'live' },
  { slug: 'discord', status: 'coming-soon' },
]
const aliasMap = { sheets: 'google-sheets', zoho: 'zoho-books', truck: 'shiprocket' }

describe('docsPathForApp', () => {
  it('returns the docs path for a live, canonical slug', () => {
    expect(docsPathForApp('slack', { registry, aliasMap })).toBe('/docs/integrations/slack')
  })

  it('resolves an aliased informal key (TemplateFlowData-style)', () => {
    expect(docsPathForApp('sheets', { registry, aliasMap })).toBe('/docs/integrations/google-sheets')
  })

  it('resolves a differently-formatted display name (IntegrationStrip-style) via normalization', () => {
    expect(docsPathForApp('Google Sheets', { registry, aliasMap })).toBe('/docs/integrations/google-sheets')
    expect(docsPathForApp('Slack', { registry, aliasMap })).toBe('/docs/integrations/slack')
  })

  it('returns null for a coming-soon app (no page to link to yet)', () => {
    expect(docsPathForApp('discord', { registry, aliasMap })).toBeNull()
    expect(docsPathForApp('Discord', { registry, aliasMap })).toBeNull()
  })

  it('returns null for an app key with no registry match at all', () => {
    expect(docsPathForApp('webhook', { registry, aliasMap })).toBeNull()
  })
})
