import { CATEGORIES } from '../../data/categories'

// One static 1200x630 PNG per category, reused across every page in
// that category (see spec "Image handling" — deliberately not WebP,
// for social-crawler compatibility). Real per-category artwork is a
// design deliverable tracked outside this codebase task; until each
// file actually exists in public/og/, every category safely resolves
// to the site's existing default OG image so nothing 404s.
const CATEGORY_IMAGE_PATH = (category) => `/og/${category.toLowerCase()}.png`
const DEFAULT_OG_IMAGE = '/og/default.png'

export function resolveOgImage(seo, category) {
  if (seo.ogImage && seo.ogImage !== 'category') return seo.ogImage
  return CATEGORIES.includes(category) ? CATEGORY_IMAGE_PATH(category) : DEFAULT_OG_IMAGE
}
