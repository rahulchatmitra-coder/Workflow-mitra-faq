import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { IntegrationDocTemplate } from './IntegrationDocTemplate'

const registryEntry = { slug: 'slack', title: 'Slack', category: 'MESSAGING', status: 'live' }
const registry = [registryEntry, { slug: 'discord', title: 'Discord', category: 'MESSAGING', status: 'coming-soon' }]

const config = {
  slug: 'slack',
  schemaVersion: 2,
  publishedDate: '2026-08-04',
  lastUpdated: '2026-08-04',
  reviewDate: '2026-11-01',
  hero: { tagline: 'Post a message to a Slack channel.', metaChips: [{ icon: 'key', label: 'Needs a webhook URL' }] },
  capabilitiesLead: 'The Slack node does one thing.',
  capabilities: [{ icon: 'message', title: 'Post a message', operation: 'text', body: 'Plain text with variables.' }],
  useCases: [{ icon: 'bag', text: 'Alert on COD orders over ₹1,500.' }],
  prerequisites: { youNeed: 'A workspace', weNeed: 'A webhook URL', cost: 'Free' },
  credentialGuide: {
    anchorId: 'get-credential',
    heading: 'Create your Slack webhook',
    lead: 'A webhook is a private address.',
    steps: [
      {
        title: "Open Slack's app page",
        body: 'Create a new app.',
        link: { href: 'https://api.slack.com/apps', label: 'api.slack.com/apps' },
        clickPath: ['Create New App', 'From scratch'],
        note: 'Name it something recognisable.',
      },
      {
        title: 'Copy the webhook URL',
        body: 'Slack shows a long address.',
        copyFields: [{ label: 'Webhook URL', value: 'https://hooks.slack.com/services/xxx' }],
      },
    ],
  },
  workflowGuide: {
    anchorId: 'configure-node',
    lead: 'Below is the real editor.',
    nodeType: 'slack',
    triggerLabel: 'New order',
    triggerSummary: 'shopify · order/paid',
    triggerIcon: 'shopify',
    operations: [
      { id: 'text', label: 'Post a message', summary: 'post to #orders', caption: 'Single mode.', fields: [{ label: 'Message', placeholder: 'New order' }] },
    ],
    steps: [{ pin: 1, title: 'Add a Slack step', body: 'after the trigger.' }],
  },
  exampleFlow: { nodes: [{ icon: 'slack', color: '#4A154B', label: 'Slack' }], caption: 'Posts to #orders.' },
  templates: { fallbackWhenEmpty: 'recommended-workflows' },
  mistakes: [{ text: 'Pasting a URL with a stray space.' }],
  faqs: [{ q: 'Do I need to be an admin?', a: 'No.' }],
  seo: { metaTitle: 'Slack Integration', metaDescription: 'Send Slack messages automatically.', ogImage: 'category' },
}

function renderTemplate(overrides = {}) {
  return render(
    <MemoryRouter>
      <IntegrationDocTemplate
        config={{ ...config, ...overrides }}
        registryEntry={registryEntry}
        registry={registry}
        templateFlows={[]}
        aliasMap={{}}
        templateMetadataById={{}}
      />
    </MemoryRouter>
  )
}

describe('IntegrationDocTemplate', () => {
  it('renders the hero title and tagline', () => {
    renderTemplate()
    expect(screen.getByRole('heading', { level: 1, name: 'Slack' })).toBeInTheDocument()
    expect(screen.getByText('Post a message to a Slack channel.')).toBeInTheDocument()
  })

  it('renders the fixed section anchors that cross-repo deep links rely on', () => {
    const { container } = renderTemplate()
    expect(container.querySelector('#get-credential')).toBeInTheDocument()
    expect(container.querySelector('#configure-node')).toBeInTheDocument()
  })

  it('shows every capability up front', () => {
    renderTemplate()
    expect(screen.getByText('The Slack node does one thing.')).toBeInTheDocument()
    expect(screen.getByText('Post a message')).toBeInTheDocument()
  })

  it('renders credential steps with their real link, click path, copy field and note', () => {
    renderTemplate()
    expect(screen.getByRole('link', { name: /api\.slack\.com\/apps/ })).toHaveAttribute('href', 'https://api.slack.com/apps')
    expect(screen.getByText('Create New App')).toBeInTheDocument()
    expect(screen.getByText('https://hooks.slack.com/services/xxx')).toBeInTheDocument()
    expect(screen.getByText('Name it something recognisable.')).toBeInTheDocument()
  })

  it('opens external credential links safely in a new tab', () => {
    renderTemplate()
    const link = screen.getByRole('link', { name: /api\.slack\.com\/apps/ })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  it('renders the editor with the operation\'s real fields', () => {
    renderTemplate()
    expect(screen.getByText('Message')).toBeInTheDocument()
    expect(screen.getByText('Single mode.')).toBeInTheDocument()
  })

  it('lets a reader page through every operation a multi-mode node supports', async () => {
    renderTemplate({
      workflowGuide: {
        ...config.workflowGuide,
        operations: [
          { id: 'text', label: 'Text message', summary: 'text', caption: 'Free text.', fields: [{ label: 'Message' }] },
          { id: 'media', label: 'Media', summary: 'media', caption: 'Send a file.', fields: [{ label: 'Public URL' }] },
        ],
      },
    })
    expect(screen.getAllByRole('tab')).toHaveLength(2)
    await userEvent.click(screen.getByRole('tab', { name: 'Media' }))
    expect(screen.getByText('Public URL')).toBeInTheDocument()
  })

  it('falls back to recommended workflows when no template matches, reusing the use-case text', () => {
    renderTemplate()
    expect(screen.getAllByText('Alert on COD orders over ₹1,500.')).toHaveLength(2)
  })

  it('renders related integrations from the same category', () => {
    renderTemplate()
    expect(screen.getByText('Discord')).toBeInTheDocument()
  })
})
