import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '../icons/docIcons'
import './sections.css'

export function BrowseAllBanner() {
  return (
    <div className="ds-browse-banner">
      <div>
        <div className="ds-browse-banner__title">Looking for a different app?</div>
        <div className="ds-browse-banner__sub">Browse all integrations WorkflowMitra supports.</div>
      </div>
      <Link to="/docs/integrations" className="ds-browse-banner__cta">
        See all integrations <ChevronRightIcon size={15} />
      </Link>
    </div>
  )
}
