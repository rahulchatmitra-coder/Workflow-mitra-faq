export function buildSitemapXml(registry, staticRoutes, siteOrigin) {
  const liveIntegrationRoutes = registry.filter((e) => e.status === 'live').map((e) => `/docs/integrations/${e.slug}`)
  const allRoutes = [...staticRoutes, ...liveIntegrationRoutes]

  const urls = allRoutes.map((route) => `  <url><loc>${siteOrigin}${route}</loc></url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}
