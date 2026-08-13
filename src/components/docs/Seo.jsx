import { useEffect } from 'react'
import { resolveOgImage } from '../../utils/docs/ogImage'
import { breadcrumbSchema, howToSchema, faqSchema } from '../../utils/docs/jsonLd'

const SITE_ORIGIN = 'https://workflowmitra.com'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    el.setAttribute('data-docs-seo', 'true')
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function Seo({ title, description, path, category, credentialGuide, workflowGuide, faqs, publishedDate, lastUpdated, ogImage = 'category' }) {
  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'article')
    setMeta('property', 'og:image', `${SITE_ORIGIN}${resolveOgImage({ ogImage }, category)}`)
    setMeta('property', 'article:published_time', publishedDate)
    setMeta('property', 'article:modified_time', lastUpdated)
    setMeta('name', 'twitter:card', 'summary_large_image')

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      canonical.setAttribute('data-docs-seo', 'true')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${SITE_ORIGIN}${path}`)

    const schemas = [breadcrumbSchema(title, path), howToSchema(title, credentialGuide, workflowGuide), faqSchema(faqs)]
    const scriptEls = schemas.map((schema) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-docs-seo', 'true')
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
      return script
    })

    return () => {
      scriptEls.forEach((s) => s.remove())
    }
  }, [title, description, path, category, credentialGuide, workflowGuide, faqs, publishedDate, lastUpdated, ogImage])

  return null
}
