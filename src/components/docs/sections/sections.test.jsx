import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MetaChips } from './MetaChips'
import { UseCaseList } from './UseCaseList'
import { BeforeYouStart } from './BeforeYouStart'
import { MistakesList } from './MistakesList'
import { FaqAccordion } from './FaqAccordion'
import { RelatedIntegrations } from './RelatedIntegrations'
import { TemplatesUsingThis } from './TemplatesUsingThis'
import { BrowseAllBanner } from './BrowseAllBanner'
import { ExampleFlowDiagram } from './ExampleFlowDiagram'

function withRouter(ui) {
  return <MemoryRouter>{ui}</MemoryRouter>
}

describe('MetaChips', () => {
  it('renders one chip per entry with its label', () => {
    render(<MetaChips chips={[{ icon: 'clock', label: '~5 min setup' }, { icon: 'key', label: 'Needs a Webhook URL' }]} />)
    expect(screen.getByText('~5 min setup')).toBeInTheDocument()
    expect(screen.getByText('Needs a Webhook URL')).toBeInTheDocument()
  })
})

describe('UseCaseList', () => {
  it('renders every use case text', () => {
    render(<UseCaseList useCases={[{ icon: 'bag', text: 'Alert on COD orders.' }]} />)
    expect(screen.getByText('Alert on COD orders.')).toBeInTheDocument()
  })
})

describe('BeforeYouStart', () => {
  it('renders all three prerequisite fields', () => {
    render(<BeforeYouStart prerequisites={{ youNeed: 'A workspace', weNeed: 'A Webhook URL', cost: 'Free' }} />)
    expect(screen.getByText('A workspace')).toBeInTheDocument()
    expect(screen.getByText('A Webhook URL')).toBeInTheDocument()
    expect(screen.getByText('Free')).toBeInTheDocument()
  })
})

describe('MistakesList', () => {
  it('renders every mistake', () => {
    render(<MistakesList mistakes={[{ text: 'Pasting a URL with a stray space.' }]} />)
    expect(screen.getByText('Pasting a URL with a stray space.')).toBeInTheDocument()
  })
})

describe('FaqAccordion', () => {
  it('renders every question, collapsed content revealed via native details', () => {
    render(<FaqAccordion faqs={[{ q: 'Do I need to be an admin?', a: 'No.' }]} />)
    expect(screen.getByText('Do I need to be an admin?')).toBeInTheDocument()
    expect(screen.getByText('No.')).toBeInTheDocument()
  })
})

describe('RelatedIntegrations', () => {
  it('renders one entry per related registry item', () => {
    render(withRouter(<RelatedIntegrations related={[{ slug: 'discord', title: 'Discord' }]} />))
    expect(screen.getByText('Discord')).toBeInTheDocument()
  })
})

describe('TemplatesUsingThis', () => {
  it('renders template titles when present', () => {
    render(withRouter(<TemplatesUsingThis templates={[{ id: 2, title: 'Shopify order → invoice → WhatsApp + shipping' }]} recommendedFallback={[]} />))
    expect(screen.getByText('Shopify order → invoice → WhatsApp + shipping')).toBeInTheDocument()
  })

  it('renders the recommended-workflows fallback when there are zero templates', () => {
    render(withRouter(<TemplatesUsingThis templates={[]} recommendedFallback={[{ icon: 'bag', text: 'Build an order alert yourself.' }]} />))
    expect(screen.getByText('Build an order alert yourself.')).toBeInTheDocument()
    expect(screen.queryByText('Coming soon')).not.toBeInTheDocument()
  })
})

describe('BrowseAllBanner', () => {
  it('links to the integrations hub', () => {
    render(withRouter(<BrowseAllBanner />))
    expect(screen.getByRole('link', { name: /see all integrations/i })).toHaveAttribute('href', '/docs/integrations')
  })
})

describe('ExampleFlowDiagram', () => {
  it('renders every node label and the caption, mixing brand and generic icons', () => {
    render(
      <ExampleFlowDiagram
        nodes={[{ icon: 'trigger', color: '#0A0A0A', label: 'New order' }, { icon: 'slack', color: '#4A154B', label: 'Slack' }]}
        caption="Every order posts to Slack."
      />
    )
    expect(screen.getByText('New order')).toBeInTheDocument()
    expect(screen.getByText('Slack')).toBeInTheDocument()
    expect(screen.getByText('Every order posts to Slack.')).toBeInTheDocument()
  })
})
