import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import integrationDocs from './index'
import integrationRegistry from '../integrationRegistry'
import { IntegrationDocTemplate } from '../../components/docs/IntegrationDocTemplate'

describe('integrationDocs index', () => {
  it('has exactly one content file per live registry entry', () => {
    const liveSlugs = integrationRegistry.filter((e) => e.status === 'live').map((e) => e.slug).sort()
    expect(Object.keys(integrationDocs).sort()).toEqual(liveSlugs)
  })

  it.each(Object.keys(integrationDocs))('renders %s end-to-end through IntegrationDocTemplate without throwing', (slug) => {
    const registryEntry = integrationRegistry.find((e) => e.slug === slug)
    const config = integrationDocs[slug]
    expect(() =>
      render(
        <MemoryRouter>
          <IntegrationDocTemplate
            config={config}
            registryEntry={registryEntry}
            registry={integrationRegistry}
            templateFlows={[]}
            aliasMap={{}}
            templateMetadataById={{}}
          />
        </MemoryRouter>
      )
    ).not.toThrow()
  })
})
