import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import integrationRegistry from '../src/data/integrationRegistry.js'
import { buildSitemapXml } from './buildSitemapXml.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_ORIGIN = 'https://workflowmitra.com'

// Existing top-level marketing routes — extend this list if new
// top-level pages are added; it intentionally does NOT try to
// auto-discover routes from App.jsx to keep this script simple and
// dependency-free.
const STATIC_ROUTES = ['/', '/pricing', '/integrations', '/templates', '/solutions', '/about', '/contact', '/automation-help', '/features', '/docs', '/docs/integrations']

const xml = buildSitemapXml(integrationRegistry, STATIC_ROUTES, SITE_ORIGIN)
writeFileSync(join(__dirname, '../public/sitemap.xml'), xml)
console.log(`sitemap.xml written with ${STATIC_ROUTES.length + integrationRegistry.filter((e) => e.status === 'live').length} URLs`)
