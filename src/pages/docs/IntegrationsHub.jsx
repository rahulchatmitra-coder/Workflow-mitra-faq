import React, { useEffect } from 'react'
import FaqDocsHomePage from '../../faq-portal'

const DOCS_TITLE = 'Documentation & Help Center — WorkflowMitra'
const DOCS_DESCRIPTION = 'Explore WorkflowMitra documentation, automation guides, interactive workflow canvas, and FAQs.'

function IntegrationsHub() {
  useEffect(() => {
    document.title = DOCS_TITLE
    let meta = document.head.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', DOCS_DESCRIPTION)
  }, [])

  return <FaqDocsHomePage />
}

export { IntegrationsHub }
export default IntegrationsHub
