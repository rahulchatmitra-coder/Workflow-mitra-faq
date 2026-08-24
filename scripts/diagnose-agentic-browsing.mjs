import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

async function checkAgentic() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox', '--window-size=1350,940']
  })

  const res = await lighthouse('http://localhost:4173/', {
    port: chrome.port,
    output: 'json',
  })

  const lhr = res.lhr
  console.log('Categories available:', Object.keys(lhr.categories))
  
  if (lhr.categories['agentic-browsing']) {
    console.log('Agentic Browsing Category:', JSON.stringify(lhr.categories['agentic-browsing'], null, 2))
  } else {
    console.log('Searching for agentic or accessibility audits...')
    for (const [id, a] of Object.entries(lhr.audits)) {
      if (id.includes('agentic') || id.includes('landmark') || id.includes('form') || id.includes('interactive') || id.includes('heading')) {
        console.log(`- ${id}: score=${a.score} title="${a.title}" explanation="${a.explanation || ''}"`)
      }
    }
  }

  await chrome.kill()
}

checkAgentic().catch(console.error)
