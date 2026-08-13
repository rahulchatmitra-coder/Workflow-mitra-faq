import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { getBrandIcon } from './brandIcons'

describe('getBrandIcon — flagship integration coverage', () => {
  it.each(['slack', 'telegram', 'whatsapp', 'gmail', 'google-sheets', 'shopify', 'discord'])(
    'resolves a renderable icon for "%s"',
    (name) => {
      const icon = getBrandIcon(name)
      expect(icon).toBeTruthy()
      expect(icon.component).toBeTruthy()
      const { container } = render(<>{icon.component}</>)
      expect(container.querySelector('svg')).toBeInTheDocument()
    }
  )

  it('returns null for a name with no brand match', () => {
    expect(getBrandIcon('not-a-real-brand-xyz')).toBeNull()
  })
})

describe('getBrandIcon — hero cluster coverage', () => {
  it.each([
    'razorpay', 'zoho', 'mongodb', 'googlegemini', 'anthropic',
    'facebook', 'googlemeet', 'zendesk', 'hubspot', 'stripe',
    'woocommerce', 'calendly', 'zoom',
  ])('resolves a renderable icon for "%s"', (name) => {
    const icon = getBrandIcon(name)
    expect(icon).toBeTruthy()
    expect(icon.component).toBeTruthy()
    const { container } = render(<>{icon.component}</>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('normalises a hyphenated slug to the same entry', () => {
    expect(getBrandIcon('google-gemini')?.color).toBe(getBrandIcon('googlegemini')?.color)
  })
})

describe('getBrandIcon — database nodes', () => {
  // The AI section's integration grid claims Postgres, MySQL and Redis. The
  // engine ships a node for each, so the registry has to as well.
  it.each(['postgresql', 'mysql', 'redis'])('resolves a renderable icon for "%s"', (name) => {
    const icon = getBrandIcon(name)
    expect(icon?.component).toBeTruthy()
    const { container } = render(<>{icon.component}</>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('draws three distinct marks', () => {
    const html = ['postgresql', 'mysql', 'redis'].map(
      (name) => render(<>{getBrandIcon(name).component}</>).container.innerHTML
    )
    expect(new Set(html).size).toBe(3)
  })
})
