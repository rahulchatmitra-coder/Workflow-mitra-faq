import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'
import fs from 'fs'
import path from 'path'

const BASE_URL = process.env.BASE_URL || 'http://localhost:4173'

const ROUTES = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Features', path: '/features' },
  { name: 'Templates', path: '/templates' },
  { name: 'Integrations', path: '/integrations' },
  { name: 'Docs Hub', path: '/docs' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Automation Help', path: '/automation-help' },
  { name: 'Create Account', path: '/how-to-create-account-workflowmitra' },
  { name: 'Credentials', path: '/credentials' },
  { name: 'Doc: Gmail', path: '/docs/integrations/gmail' },
  { name: 'Doc: Slack', path: '/docs/integrations/slack' },
]

async function runDualAudit() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox', '--window-size=1350,940']
  })

  console.log(`Chrome started on port ${chrome.port}`)
  const resultsDir = path.resolve('test-results/audit-dual')
  fs.mkdirSync(resultsDir, { recursive: true })

  const results = []

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route.path}`
    console.log(`\n========================================`)
    console.log(`Auditing: ${route.name} (${url})`)
    console.log(`========================================`)

    // 1. DESKTOP RUN
    const desktopFlags = {
      logLevel: 'error',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
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
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
      }
    }

    const runnerResultDesktop = await lighthouse(url, desktopFlags)
    const lhrDesktop = runnerResultDesktop.lhr
    const dScores = {
      perf: Math.round((lhrDesktop.categories.performance?.score || 0) * 100),
      a11y: Math.round((lhrDesktop.categories.accessibility?.score || 0) * 100),
      bp: Math.round((lhrDesktop.categories['best-practices']?.score || 0) * 100),
      seo: Math.round((lhrDesktop.categories.seo?.score || 0) * 100),
      cls: lhrDesktop.audits['cumulative-layout-shift']?.displayValue || '0',
      lcp: lhrDesktop.audits['largest-contentful-paint']?.displayValue || '0',
    }

    console.log(`  [Desktop] Scores -> Perf: ${dScores.perf} | A11y: ${dScores.a11y} | BP: ${dScores.bp} | SEO: ${dScores.seo} | CLS: ${dScores.cls}`)

    // 2. MOBILE RUN (Standard Lighthouse Mobile Emulation)
    const mobileFlags = {
      logLevel: 'error',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
      formFactor: 'mobile',
      screenEmulation: {
        mobile: true,
        width: 412,
        height: 823,
        deviceScaleFactor: 1.75,
        disabled: false,
      },
      throttling: {
        rttMs: 150,
        throughputKbps: 1638.4,
        cpuSlowdownMultiplier: 4,
      }
    }

    const runnerResultMobile = await lighthouse(url, mobileFlags)
    const lhrMobile = runnerResultMobile.lhr
    const mScores = {
      perf: Math.round((lhrMobile.categories.performance?.score || 0) * 100),
      a11y: Math.round((lhrMobile.categories.accessibility?.score || 0) * 100),
      bp: Math.round((lhrMobile.categories['best-practices']?.score || 0) * 100),
      seo: Math.round((lhrMobile.categories.seo?.score || 0) * 100),
      cls: lhrMobile.audits['cumulative-layout-shift']?.displayValue || '0',
      lcp: lhrMobile.audits['largest-contentful-paint']?.displayValue || '0',
    }

    console.log(`  [Mobile]  Scores -> Perf: ${mScores.perf} | A11y: ${mScores.a11y} | BP: ${mScores.bp} | SEO: ${mScores.seo} | CLS: ${mScores.cls}`)

    results.push({
      name: route.name,
      path: route.path,
      desktop: dScores,
      mobile: mScores,
    })
  }

  await chrome.kill()
  fs.writeFileSync(path.join(resultsDir, 'dual-summary.json'), JSON.stringify(results, null, 2))
  console.log(`\nAudit complete! Saved to test-results/audit-dual/dual-summary.json`)
}

runDualAudit().catch(console.error)
