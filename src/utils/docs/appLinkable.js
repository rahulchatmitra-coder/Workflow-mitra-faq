// Resolves an app reference — either an informal TemplateFlowData.js key
// ('sheets', 'zoho', 'truck') or a differently-formatted display name
// (IntegrationStrip's 'Google Sheets', matching getBrandIcon's own
// input convention) — to its docs page, or null if there isn't a live
// one yet. Two normalization steps handle the two real call sites:
// `aliasMap` for genuinely different words, then bare-alphanumeric
// comparison for casing/spacing differences.
function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '')
}

export function docsPathForApp(appKeyOrName, { registry, aliasMap }) {
  const aliased = aliasMap[appKeyOrName] || appKeyOrName
  const target = normalize(aliased)
  const entry = registry.find((e) => normalize(e.slug) === target)
  return entry && entry.status === 'live' ? `/docs/integrations/${entry.slug}` : null
}
