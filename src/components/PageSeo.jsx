import { useEffect } from 'react'

const SITE_ORIGIN = 'https://workflowmitra.com'
const DEFAULT_OG_IMAGE = '/og/default.png'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    el.setAttribute('data-page-seo', 'true')
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    canonical.setAttribute('data-page-seo', 'true')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', href)
}

export default function PageSeo({ title, description, path = '/', ogImage }) {
  useEffect(() => {
    if (title) document.title = title

    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
      setMeta('name', 'twitter:description', description)
    }
    if (title) {
      setMeta('property', 'og:title', title)
      setMeta('name', 'twitter:title', title)
    }
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', `${SITE_ORIGIN}${path}`)
    setMeta('property', 'og:image', `${SITE_ORIGIN}${ogImage || DEFAULT_OG_IMAGE}`)
    setMeta('property', 'og:site_name', 'WorkflowMitra')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:image', `${SITE_ORIGIN}${ogImage || DEFAULT_OG_IMAGE}`)

    setCanonical(`${SITE_ORIGIN}${path}`)
  }, [title, description, path, ogImage])

  return null
}
