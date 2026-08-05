// TemplateFlowData.js has no `apps[]` field — each node carries its own
// informal `app` key (e.g. 'sheets', 'zoho', 'truck'), which doesn't
// always match an integrationRegistry slug. `aliasMap` translates the
// informal keys to canonical slugs; keys with no alias are assumed
// already canonical. Generic/logic node app-keys (webhook, users, code…)
// simply never match a real slug and are naturally excluded — no
// separate exclude-list needed.
function appsForTemplate(template, aliasMap) {
  return [...new Set(template.nodes.map((n) => aliasMap[n.app] || n.app))]
}

export function templatesUsingApp(slug, { templateFlows, aliasMap, metadataById }) {
  return templateFlows
    .filter((t) => appsForTemplate(t, aliasMap).includes(slug))
    .map((t) => ({ id: t.templateId, title: metadataById[t.templateId]?.title || `Template ${t.templateId}` }))
}

export function coOccurrenceCounts(slug, { templateFlows, aliasMap }) {
  const counts = {}
  templateFlows.forEach((t) => {
    const apps = appsForTemplate(t, aliasMap)
    if (!apps.includes(slug)) return
    apps.forEach((app) => {
      if (app === slug) return
      counts[app] = (counts[app] || 0) + 1
    })
  })
  return counts
}

// Fallback for `templates.fallbackWhenEmpty: 'recommended-workflows'` —
// reuses the page's own useCases[] rather than claiming a template exists.
export function recommendedWorkflows(useCases, limit = 2) {
  return useCases.slice(0, limit)
}
