const SITE_ORIGIN = 'https://workflowmitra.com'

export function breadcrumbSchema(title, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Docs', item: `${SITE_ORIGIN}/docs` },
      { '@type': 'ListItem', position: 2, name: 'Integrations', item: `${SITE_ORIGIN}/docs/integrations` },
      { '@type': 'ListItem', position: 3, name: title, item: `${SITE_ORIGIN}${path}` },
    ],
  }
}

export function howToSchema(title, credentialGuide, workflowGuide) {
  const allSteps = [...credentialGuide.steps, ...workflowGuide.steps]
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to connect ${title} to WorkflowMitra`,
    step: allSteps.map((s) => ({ '@type': 'HowToStep', name: s.title, text: s.body })),
  }
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
