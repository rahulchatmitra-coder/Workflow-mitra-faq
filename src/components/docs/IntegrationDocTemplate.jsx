import { DocsLayout } from './DocsLayout'
import { SectionNav } from './SectionNav'
import { Seo } from './Seo'
import { IntegrationLogo } from './icons/IntegrationLogo'
import { RealEditorPreview } from './screenshots/RealEditorPreview'
import { MetaChips } from './sections/MetaChips'
import { UseCaseList } from './sections/UseCaseList'
import { BeforeYouStart } from './sections/BeforeYouStart'
import { CapabilityMatrix } from './sections/CapabilityMatrix'
import { CredentialSteps } from './sections/CredentialSteps'
import { MistakesList } from './sections/MistakesList'
import { FaqAccordion } from './sections/FaqAccordion'
import { RelatedIntegrations } from './sections/RelatedIntegrations'
import { TemplatesUsingThis } from './sections/TemplatesUsingThis'
import { BrowseAllBanner } from './sections/BrowseAllBanner'
import { ExampleFlowDiagram } from './sections/ExampleFlowDiagram'
import { getRelatedIntegrations } from '../../utils/docs/relatedIntegrations'
import { templatesUsingApp, coOccurrenceCounts, recommendedWorkflows } from '../../utils/docs/templatesForIntegration'
import './IntegrationDocTemplate.css'

const SECTION_NAV_ITEMS = [
  { id: 'capabilities', label: 'What it can do' },
  { id: 'usecases', label: 'Real use cases' },
  { id: 'before', label: 'Before you start' },
  { id: 'get-credential', label: 'Get your credential' },
  { id: 'configure-node', label: 'Configure the node' },
  { id: 'example', label: 'Full example' },
  { id: 'templates', label: 'Templates that use this' },
  { id: 'mistakes', label: 'Common mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related integrations' },
]

export function IntegrationDocTemplate({ config, registryEntry, registry, templateFlows, aliasMap, templateMetadataById }) {
  const matchedTemplates = templatesUsingApp(config.slug, { templateFlows, aliasMap, metadataById: templateMetadataById })
  const counts = coOccurrenceCounts(config.slug, { templateFlows, aliasMap })
  const relatedSlugs = getRelatedIntegrations(config.slug, { registry, coOccurrenceCounts: counts, override: config.relatedOverride })
  const relatedEntries = relatedSlugs.map((s) => registry.find((e) => e.slug === s)).filter(Boolean)

  return (
    <DocsLayout sectionNav={<SectionNav items={SECTION_NAV_ITEMS} />}>
      <Seo
        title={config.seo.metaTitle}
        description={config.seo.metaDescription}
        path={`/docs/integrations/${config.slug}`}
        category={registryEntry.category}
        credentialGuide={config.credentialGuide}
        workflowGuide={config.workflowGuide}
        faqs={config.faqs}
        publishedDate={config.publishedDate}
        lastUpdated={config.lastUpdated}
        ogImage={config.seo.ogImage}
      />

      <nav className="ds-crumb">Docs <span>›</span> Integrations <span>›</span> <b>{registryEntry.title}</b></nav>

      <header className="ds-hero">
        <div className="ds-hero__tile"><IntegrationLogo slug={registryEntry.slug} category={registryEntry.category} size={38} /></div>
        <div>
          <h1>{registryEntry.title}</h1>
          <p className="ds-hero__sub">{config.hero.tagline}</p>
          <MetaChips chips={config.hero.metaChips} />
        </div>
      </header>

      {/* Every operation up front — what the integration is actually capable of,
          before anyone invests in setting it up. */}
      <section className="ds-section" id="capabilities">
        <h2>What you can do with {registryEntry.title}</h2>
        <p className="ds-lead">{config.capabilitiesLead}</p>
        <CapabilityMatrix capabilities={config.capabilities} />
      </section>

      <section className="ds-section" id="usecases">
        <h2>Real ways businesses use this</h2>
        <UseCaseList useCases={config.useCases} />
      </section>

      <section className="ds-section" id="before">
        <h2>Before you start</h2>
        <BeforeYouStart prerequisites={config.prerequisites} />
      </section>

      <section className="ds-section" id={config.credentialGuide.anchorId}>
        <span className="ds-track ds-track--cred"><span className="ds-track__b">1</span> Get your credential</span>
        <h2>{config.credentialGuide.heading}</h2>
        <p className="ds-lead">{config.credentialGuide.lead}</p>
        <CredentialSteps steps={config.credentialGuide.steps} />
      </section>

      <section className="ds-section" id={config.workflowGuide.anchorId}>
        <span className="ds-track ds-track--flow"><span className="ds-track__b">2</span> Configure the node</span>
        <h2>Set it up in WorkflowMitra</h2>
        <p className="ds-lead">{config.workflowGuide.lead}</p>
        <RealEditorPreview
          nodeType={config.workflowGuide.nodeType}
          nodeLabel={registryEntry.title}
          triggerLabel={config.workflowGuide.triggerLabel}
          triggerSummary={config.workflowGuide.triggerSummary}
          triggerIcon={config.workflowGuide.triggerIcon}
          operations={config.workflowGuide.operations}
          docsUrl={`/docs/integrations/${config.slug}`}
        />
        <ol className="ds-steplist">
          {config.workflowGuide.steps.map((s) => (
            <li key={s.title}><span className="ds-steplist__n">{s.pin}</span><span><b>{s.title}</b> {s.body}</span></li>
          ))}
        </ol>
      </section>

      <section className="ds-section" id="example">
        <h2>The full example, end to end</h2>
        <ExampleFlowDiagram nodes={config.exampleFlow.nodes} caption={config.exampleFlow.caption} />
      </section>

      <section className="ds-section" id="templates">
        <h2>Templates that use {registryEntry.title}</h2>
        <TemplatesUsingThis templates={matchedTemplates} recommendedFallback={recommendedWorkflows(config.useCases, 2)} />
      </section>

      <section className="ds-section" id="mistakes">
        <h2>Common mistakes</h2>
        <MistakesList mistakes={config.mistakes} />
      </section>

      <section className="ds-section" id="faq">
        <h2>Frequently asked questions</h2>
        <FaqAccordion faqs={config.faqs} />
      </section>

      <section className="ds-section" id="related">
        <h2>Related integrations</h2>
        <RelatedIntegrations related={relatedEntries} />
      </section>

      <section className="ds-section" id="browse-all" style={{ marginBottom: 0 }}>
        <BrowseAllBanner />
      </section>
    </DocsLayout>
  )
}
