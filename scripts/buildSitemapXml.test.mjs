import { describe, it, expect } from 'vitest'
import { buildSitemapXml } from './buildSitemapXml.mjs'

const registry = [
  { slug: 'slack', status: 'live' },
  { slug: 'discord', status: 'coming-soon' },
]
const staticRoutes = ['/', '/pricing', '/docs/integrations']

describe('buildSitemapXml', () => {
  it('includes every static route', () => {
    const xml = buildSitemapXml(registry, staticRoutes, 'https://workflowmitra.com')
    staticRoutes.forEach((r) => expect(xml).toContain(`<loc>https://workflowmitra.com${r}</loc>`))
  })

  it('includes a URL for live registry entries', () => {
    const xml = buildSitemapXml(registry, staticRoutes, 'https://workflowmitra.com')
    expect(xml).toContain('<loc>https://workflowmitra.com/docs/integrations/slack</loc>')
  })

  it('excludes coming-soon registry entries — they have no real page yet', () => {
    const xml = buildSitemapXml(registry, staticRoutes, 'https://workflowmitra.com')
    expect(xml).not.toContain('/docs/integrations/discord')
  })

  it('produces valid, well-formed XML with the correct root element', () => {
    const xml = buildSitemapXml(registry, staticRoutes, 'https://workflowmitra.com')
    expect(xml).toMatch(/^<\?xml version="1.0" encoding="UTF-8"\?>/)
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(xml).toContain('</urlset>')
  })
})
