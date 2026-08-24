import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'
import fs from 'fs'

async function diagnose() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox', '--window-size=1350,940']
  })

  const flags = {
    logLevel: 'error',
    output: 'json',
    port: chrome.port,
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
    }
  }

  const res = await lighthouse('http://localhost:4173/', flags)
  const lhr = res.lhr

  console.log('\n--- OVERALL CATEGORY SCORES ---')
  for (const [key, cat] of Object.entries(lhr.categories)) {
    console.log(`${cat.title}: ${Math.round(cat.score * 100)}`)
  }

  console.log('\n--- ALL FAILED / WARNED AUDITS (< 100%) ---')
  for (const [id, audit] of Object.entries(lhr.audits)) {
    if (audit.score !== null && audit.score < 1) {
      console.log(`\n[${audit.score * 100}] ${audit.title} (${id})`)
      if (audit.displayValue) console.log(`   Value: ${audit.displayValue}`)
      if (audit.explanation) console.log(`   Explanation: ${audit.explanation}`)
      if (audit.details?.items?.length) {
        console.log(`   Items (${audit.details.items.length}):`, JSON.stringify(audit.details.items.slice(0, 3), null, 2))
      }
    }
  }

  await chrome.kill()
}

diagnose().catch(console.error)
