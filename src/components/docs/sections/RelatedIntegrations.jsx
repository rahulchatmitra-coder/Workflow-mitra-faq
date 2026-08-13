import { Link } from 'react-router-dom'
import { IntegrationLogo } from '../icons/IntegrationLogo'
import './sections.css'

export function RelatedIntegrations({ related }) {
  return (
    <div className="ds-related">
      {related.map((r) => (
        <Link key={r.slug} to={`/docs/integrations/${r.slug}`} className="ds-related__item">
          <span className="ds-related__icon"><IntegrationLogo slug={r.slug} category={r.category} size={14} /></span>
          {r.title}
        </Link>
      ))}
    </div>
  )
}
