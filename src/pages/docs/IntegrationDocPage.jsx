import { useParams } from 'react-router-dom'
import integrationRegistry from '../../data/integrationRegistry'
import integrationDocs from '../../data/integrationDocs'
import { IntegrationDocTemplate } from '../../components/docs/IntegrationDocTemplate'
import { DocsLayout } from '../../components/docs/DocsLayout'
import { templateFlows } from '../../data/TemplateFlowData'

// Real informal `app` keys used in TemplateFlowData.js that differ from
// integrationRegistry slugs — confirmed against the actual file (see
// templatesForIntegration.js docstring for why this alias map exists).
const TEMPLATE_ALIAS_MAP = { sheets: 'google-sheets', zoho: 'zoho-books', truck: 'shiprocket' }
// Mirrors the inline `templatesData` in TemplateFlowPage.jsx (the
// component actually routed at /template/:templateId — TemplateDetail.jsx
// is imported in App.jsx but never routed, so it's not the real source).
// Kept as a small duplicated constant rather than importing across
// page files; if TemplateFlowPage's list changes, update both.
const TEMPLATE_METADATA_BY_ID = {
  1: { title: 'Facebook lead → CRM → team alert' },
  2: { title: 'Shopify order → invoice → WhatsApp + shipping' },
  3: { title: 'Support ticket → AI triage → team + reply' },
  4: { title: 'AI email assistant → draft → approve → send' },
  5: { title: 'New blog post → AI rewrite → social' },
  6: { title: 'Website form → WhatsApp + CRM + sales owner' },
}

function IntegrationDocPage() {
  const { slug } = useParams()
  const registryEntry = integrationRegistry.find((e) => e.slug === slug)
  const config = integrationDocs[slug]

  if (!registryEntry || registryEntry.status !== 'live' || !config) {
    return (
      <DocsLayout>
        <div style={{ padding: '4rem 0', textAlign: 'center' }}>
          <h1>We couldn't find that integration</h1>
          <p>It may not be published yet — check the <a href="/docs/integrations">full list of integrations</a>.</p>
        </div>
      </DocsLayout>
    )
  }

  return (
    <IntegrationDocTemplate
      config={config}
      registryEntry={registryEntry}
      registry={integrationRegistry}
      templateFlows={templateFlows}
      aliasMap={TEMPLATE_ALIAS_MAP}
      templateMetadataById={TEMPLATE_METADATA_BY_ID}
    />
  )
}

export { IntegrationDocPage }
export default IntegrationDocPage
