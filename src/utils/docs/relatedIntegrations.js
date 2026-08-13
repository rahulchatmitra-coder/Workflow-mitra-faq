// Deterministic related-integrations picker — see design spec
// "Related-integrations algorithm". Same category, then boosted by
// real template co-occurrence, capped at `limit`. `override` (a page's
// `relatedOverride` field) always wins when present.
export function getRelatedIntegrations(slug, { registry, coOccurrenceCounts = {}, override, limit = 4 }) {
  if (override) return override

  const current = registry.find((e) => e.slug === slug)
  if (!current) return []

  return registry
    .filter((e) => e.slug !== slug && e.category === current.category)
    .sort((a, b) => (coOccurrenceCounts[b.slug] || 0) - (coOccurrenceCounts[a.slug] || 0))
    .slice(0, limit)
    .map((e) => e.slug)
}
