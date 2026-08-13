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

export default function PageSeo({ title, description, path, ogImage }) {
  useEffect(() => {
    const prev = document.title
    document.title = title

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', `${SITE_ORIGIN}${path}`)
    setMeta('property', 'og:image', `${SITE_ORIGIN}${ogImage || DEFAULT_OG_IMAGE}`)
    setMeta('property', 'og:site_name', 'WorkflowMitra')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', `${SITE_ORIGIN}${ogImage || DEFAULT_OG_IMAGE}`)

    let canonical = document.head.querySelector('link[rel="canonical"][data-page-seo]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      canonical.setAttribute('data-page-seo', 'true')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${SITE_ORIGIN}${path}`)

    return () => {
      document.title = prev
      document.head.querySelectorAll('[data-page-seo]').forEach((el) => el.remove())
    }
  }, [title, description, path, ogImage])

  return null
}
