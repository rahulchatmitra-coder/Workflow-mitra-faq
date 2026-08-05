import { describe, it, expect } from 'vitest'
import integrationDocs from './index'
import integrationRegistry from '../integrationRegistry'

const entries = Object.entries(integrationDocs)

describe('integrationDocs — v2 schema conformance', () => {
  it('has exactly one content file per live registry entry', () => {
    const live = integrationRegistry.filter((e) => e.status === 'live').map((e) => e.slug).sort()
    expect(Object.keys(integrationDocs).sort()).toEqual(live)
  })

  it.each(entries)('%s declares schemaVersion 2 and a matching slug', (slug, c) => {
    expect(c.slug).toBe(slug)
    expect(c.schemaVersion).toBe(2)
  })

  it.each(entries)('%s has all three freshness dates', (_slug, c) => {
    expect(c.publishedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(c.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(c.reviewDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it.each(entries)('%s uses the fixed anchor IDs so cross-repo deep links work', (_slug, c) => {
    expect(c.credentialGuide.anchorId).toBe('get-credential')
    expect(c.workflowGuide.anchorId).toBe('configure-node')
  })

  it.each(entries)('%s lists every capability with a title and body', (_slug, c) => {
    expect(c.capabilities.length).toBeGreaterThan(0)
    expect(c.capabilitiesLead.length).toBeGreaterThan(0)
    c.capabilities.forEach((cap) => {
      expect(cap.title.length).toBeGreaterThan(0)
      expect(cap.body.length).toBeGreaterThan(0)
    })
  })

  it.each(entries)('%s credential steps each have a title and body', (_slug, c) => {
    expect(c.credentialGuide.steps.length).toBeGreaterThan(0)
    c.credentialGuide.steps.forEach((s) => {
      expect(s.title.length).toBeGreaterThan(0)
      expect(s.body.length).toBeGreaterThan(0)
    })
  })

  it.each(entries)('%s has at least one credential step linking somewhere real', (_slug, c) => {
    const hasActionable = c.credentialGuide.steps.some((s) => s.link || s.clickPath || s.copyFields)
    expect(hasActionable).toBe(true)
  })

  it.each(entries)('%s external credential links are absolute https URLs', (_slug, c) => {
    c.credentialGuide.steps
      .filter((s) => s.link)
      .forEach((s) => expect(s.link.href).toMatch(/^https:\/\//))
  })

  it.each(entries)('%s declares operations, each with fields the editor can render', (_slug, c) => {
    expect(c.workflowGuide.operations.length).toBeGreaterThan(0)
    c.workflowGuide.operations.forEach((op) => {
      expect(op.id.length).toBeGreaterThan(0)
      expect(op.label.length).toBeGreaterThan(0)
      expect(op.fields.length).toBeGreaterThan(0)
      op.fields.forEach((f) => {
        // every field either names a control kind or carries a label
        expect(Boolean(f.kind) || Boolean(f.label)).toBe(true)
      })
    })
  })

  it.each(entries)('%s capability count matches its operation count where they mirror each other', (_slug, c) => {
    // Slack/Telegram document one capability and one operation; the multi-mode
    // nodes should not claim capabilities they never show a form for.
    if (c.capabilities.every((cap) => cap.operation)) {
      expect(c.capabilities.length).toBeGreaterThanOrEqual(c.workflowGuide.operations.length)
    }
  })

  it.each(entries)('%s has at least 3 use cases, 3 FAQs and non-empty SEO', (_slug, c) => {
    expect(c.useCases.length).toBeGreaterThanOrEqual(3)
    expect(c.faqs.length).toBeGreaterThanOrEqual(3)
    expect(c.seo.metaTitle.length).toBeGreaterThan(0)
    expect(c.seo.metaDescription.length).toBeGreaterThan(0)
  })
})
