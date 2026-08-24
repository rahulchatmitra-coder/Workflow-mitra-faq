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

function setPreloadImage(href) {
  let el = document.head.querySelector('link[data-page-seo-preload="true"]') || document.head.querySelector(`link[rel="preload"][as="image"][href="${href}"]`)
  if (href) {
    if (!el) {
      el = document.createElement('link')
      el.setAttribute('rel', 'preload')
      el.setAttribute('as', 'image')
      el.setAttribute('data-page-seo-preload', 'true')
      el.setAttribute('fetchpriority', 'high')
      document.head.appendChild(el)
    }
    el.setAttribute('href', href)
  } else if (el && el.getAttribute('data-page-seo-preload') === 'true') {
    el.remove()
  }
}

export default function PageSeo({ title, description, path = '/', ogImage, preloadImage }) {
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
    setPreloadImage(preloadImage)

    return () => {
      setPreloadImage(null)
    }
  }, [title, description, path, ogImage, preloadImage])

  return null
}
