import { describe, it, expect } from 'vitest'
import { breadcrumbSchema, howToSchema, faqSchema } from './jsonLd'

describe('breadcrumbSchema', () => {
  it('builds a 3-level Docs > Integrations > name trail', () => {
    const schema = breadcrumbSchema('Slack', '/docs/integrations/slack')
    expect(schema['@type']).toBe('BreadcrumbList')
    expect(schema.itemListElement).toHaveLength(3)
    expect(schema.itemListElement[2].name).toBe('Slack')
    expect(schema.itemListElement[2].item).toContain('/docs/integrations/slack')
  })
})

describe('howToSchema', () => {
  it('merges both step tracks into one ordered HowTo', () => {
    const credentialGuide = { steps: [{ title: 'Turn the toggle on', body: 'Do the thing.' }] }
    const workflowGuide = { steps: [{ title: 'Add the node', body: 'Drop it on the canvas.' }] }
    const schema = howToSchema('Slack', credentialGuide, workflowGuide)
    expect(schema['@type']).toBe('HowTo')
    expect(schema.step).toHaveLength(2)
    expect(schema.step[0].name).toBe('Turn the toggle on')
    expect(schema.step[1].name).toBe('Add the node')
  })
})

describe('faqSchema', () => {
  it('maps faqs[] to FAQPage mainEntity', () => {
    const faqs = [{ q: 'Do I need to be an admin?', a: 'No.' }]
    const schema = faqSchema(faqs)
    expect(schema['@type']).toBe('FAQPage')
    expect(schema.mainEntity[0].name).toBe('Do I need to be an admin?')
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe('No.')
  })
})
