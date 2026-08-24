import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

async function diagnoseMobile() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'] })

  const mRes = await lighthouse('http://localhost:4173/', {
    port: chrome.port,
    formFactor: 'mobile',
    screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
    throttling: { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4 }
  })

  const lhr = mRes.lhr
  console.log('Mobile LCP Element:', JSON.stringify(lhr.audits['largest-contentful-paint-element']?.details?.items, null, 2))
  console.log('Mobile LCP Phase Breakdown:', JSON.stringify(lhr.audits['lcp-breakdown']?.details?.items || lhr.audits['largest-contentful-paint'], null, 2))
  console.log('Long Tasks / Main Thread Execution:', JSON.stringify(lhr.audits['long-tasks']?.details?.items?.slice(0, 5), null, 2))
  console.log('Bootup Time:', JSON.stringify(lhr.audits['bootup-time']?.details?.items?.slice(0, 5), null, 2))

  await chrome.kill()
}

diagnoseMobile().catch(console.error)
