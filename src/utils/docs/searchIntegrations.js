import Fuse from 'fuse.js'

const FUSE_OPTIONS = {
  keys: ['title', 'shortDescription', 'category'],
  threshold: 0.35,
}

export function searchIntegrations(query, registry) {
  if (!query.trim()) return registry
  const fuse = new Fuse(registry, FUSE_OPTIONS)
  return fuse.search(query).map((result) => result.item)
}
