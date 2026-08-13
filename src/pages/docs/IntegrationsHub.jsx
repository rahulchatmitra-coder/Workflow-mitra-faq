import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DocsLayout } from '../../components/docs/DocsLayout'
import { IntegrationLogo } from '../../components/docs/icons/IntegrationLogo'
import { searchIntegrations } from '../../utils/docs/searchIntegrations'
import { CATEGORIES, CATEGORY_LABELS } from '../../data/categories'
import integrationRegistry from '../../data/integrationRegistry'
import './IntegrationsHub.css'

const HUB_TITLE = 'Integrations & Apps — WorkflowMitra Docs'
const HUB_DESCRIPTION = "Step-by-step guides for every app you can connect to a WorkflowMitra flow — how to get the credential it needs and how to configure it on the canvas."

function IntegrationsHub() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)

  // Listing page, not a how-to — sets its own title/description directly
  // rather than reusing <Seo>, which is shaped around a single
  // integration's HowTo/FAQ schema.
  useEffect(() => {
    document.title = HUB_TITLE
    let meta = document.head.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', HUB_DESCRIPTION)
  }, [])

  const filtered = useMemo(() => {
    let list = searchIntegrations(query, integrationRegistry)
    if (activeCategory) list = list.filter((e) => e.category === activeCategory)
    return list
  }, [query, activeCategory])

  return (
    <DocsLayout>
      <div className="ihub">
        <p className="ihub__eyebrow">Docs</p>
        <h1>Connect your apps to WorkflowMitra</h1>
        <p className="ihub__sub">Step-by-step guides for every app you can plug into a flow — what it's for, how to get the key it needs, and how to set it up on the canvas.</p>

        <input
          className="ihub__search"
          type="text"
          placeholder="Search apps (e.g. Slack, Google Sheets)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="ihub__chips">
          <button type="button" className={activeCategory === null ? 'active' : ''} onClick={() => setActiveCategory(null)}>All</button>
          {CATEGORIES.map((c) => (
            <button key={c} type="button" className={activeCategory === c ? 'active' : ''} onClick={() => setActiveCategory(c)}>
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>

        <div className="ihub__grid">
          {filtered.map((entry) =>
            entry.status === 'live' ? (
              <Link key={entry.slug} to={`/docs/integrations/${entry.slug}`} className="ihub__card">
                <span className="ihub__status ihub__status--live">Live guide</span>
                <span className="ihub__tile"><IntegrationLogo slug={entry.slug} category={entry.category} size={22} /></span>
                <h3>{entry.title}</h3>
                <p>{entry.shortDescription}</p>
              </Link>
            ) : (
              <div key={entry.slug} className="ihub__card ihub__card--dim">
                <span className="ihub__status">Coming soon</span>
                <span className="ihub__tile"><IntegrationLogo slug={entry.slug} category={entry.category} size={22} /></span>
                <h3>{entry.title}</h3>
                <p>{entry.shortDescription}</p>
              </div>
            )
          )}
        </div>
      </div>
    </DocsLayout>
  )
}

export { IntegrationsHub }
export default IntegrationsHub
