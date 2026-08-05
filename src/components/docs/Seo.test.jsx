import { describe, it, expect, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { Seo } from './Seo'

afterEach(() => {
  cleanup()
  document.title = ''
  document.head.querySelectorAll('meta[data-docs-seo], script[data-docs-seo], link[data-docs-seo]').forEach((el) => el.remove())
})

const credentialGuide = { steps: [{ title: 'Turn the toggle on', body: 'Do it.' }] }
const workflowGuide = { steps: [{ title: 'Add the node', body: 'Drop it.' }] }
const faqs = [{ q: 'Do I need to be an admin?', a: 'No.' }]

describe('Seo', () => {
  it('sets document.title', () => {
    render(<Seo title="Slack Integration — Connect Slack to WorkflowMitra" description="d" path="/docs/integrations/slack" category="MESSAGING" credentialGuide={credentialGuide} workflowGuide={workflowGuide} faqs={faqs} publishedDate="2026-08-03" lastUpdated="2026-08-03" />)
    expect(document.title).toBe('Slack Integration — Connect Slack to WorkflowMitra')
  })

  it('sets the meta description', () => {
    render(<Seo title="t" description="Send Slack messages automatically." path="/docs/integrations/slack" category="MESSAGING" credentialGuide={credentialGuide} workflowGuide={workflowGuide} faqs={faqs} publishedDate="2026-08-03" lastUpdated="2026-08-03" />)
    expect(document.querySelector('meta[name="description"]').content).toBe('Send Slack messages automatically.')
  })

  it('sets a canonical link containing the path', () => {
    render(<Seo title="t" description="d" path="/docs/integrations/slack" category="MESSAGING" credentialGuide={credentialGuide} workflowGuide={workflowGuide} faqs={faqs} publishedDate="2026-08-03" lastUpdated="2026-08-03" />)
    expect(document.querySelector('link[rel="canonical"]').href).toContain('/docs/integrations/slack')
  })

  it('injects BreadcrumbList, HowTo, and FAQPage JSON-LD scripts', () => {
    render(<Seo title="Slack" description="d" path="/docs/integrations/slack" category="MESSAGING" credentialGuide={credentialGuide} workflowGuide={workflowGuide} faqs={faqs} publishedDate="2026-08-03" lastUpdated="2026-08-03" />)
    const scripts = [...document.querySelectorAll('script[data-docs-seo]')]
    const types = scripts.map((s) => JSON.parse(s.textContent)['@type'])
    expect(types.sort()).toEqual(['BreadcrumbList', 'FAQPage', 'HowTo'])
  })

  it('sets a fixed og:type of article and twitter:card of summary_large_image', () => {
    render(<Seo title="t" description="d" path="/docs/integrations/slack" category="MESSAGING" credentialGuide={credentialGuide} workflowGuide={workflowGuide} faqs={faqs} publishedDate="2026-08-03" lastUpdated="2026-08-03" />)
    expect(document.querySelector('meta[property="og:type"]').content).toBe('article')
    expect(document.querySelector('meta[name="twitter:card"]').content).toBe('summary_large_image')
  })
})
