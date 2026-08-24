import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

const routes = [
  { name: 'Pricing', url: 'http://localhost:4173/pricing' },
  { name: 'Features', url: 'http://localhost:4173/features' },
  { name: 'Integrations', url: 'http://localhost:4173/integrations' },
  { name: 'Templates', url: 'http://localhost:4173/templates' },
  { name: 'Docs Hub', url: 'http://localhost:4173/docs' },
  { name: 'Doc: Gmail', url: 'http://localhost:4173/docs/integrations/gmail' },
]

async function checkA11y() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'] })

  for (const r of routes) {
    const res = await lighthouse(r.url, {
      port: chrome.port,
      onlyCategories: ['accessibility'],
    })

    const lhr = res.lhr
    console.log(`\n================= ${r.name} (Score: ${Math.round(lhr.categories.accessibility.score * 100)}) =================`)
    for (const [id, a] of Object.entries(lhr.audits)) {
      if (a.score !== null && a.score < 1) {
        console.log(`FAIL [${id}]: ${a.title} | ${a.explanation || ''}`)
        if (a.details?.items) {
          console.log('Items:', JSON.stringify(a.details.items.slice(0, 3).map(i => i.node?.snippet || i.node?.selector), null, 2))
        }
      }
    }
  }

  await chrome.kill()
}

checkA11y().catch(console.error)
