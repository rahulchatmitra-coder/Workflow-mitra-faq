import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'
import fs from 'fs'
import path from 'path'

const BASE_URL = process.env.BASE_URL || 'http://localhost:4173'

const ROUTES = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Solution Marketing', path: '/solutions/marketing' },
  { name: 'Solution Sales', path: '/solutions/sales' },
  { name: 'Solution Operations', path: '/solutions/operations' },
  { name: 'Solution Engineering', path: '/solutions/engineering' },
  { name: 'Solution Support', path: '/solutions/support' },
  { name: 'Solution Security', path: '/solutions/security' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Automation Help', path: '/automation-help' },
  { name: 'Features', path: '/features' },
  { name: 'Templates', path: '/templates' },
  { name: 'Template Flow (1)', path: '/template/1' },
  { name: 'Integrations', path: '/integrations' },
  { name: 'Docs Hub', path: '/docs' },
  { name: 'Doc: Gmail', path: '/docs/integrations/gmail' },
  { name: 'Doc: Slack', path: '/docs/integrations/slack' },
  { name: 'Create Account', path: '/how-to-create-account-workflowmitra' },
  { name: 'Credentials', path: '/credentials' },
  { name: 'Credential: OpenAI', path: '/credentials/openai' },
  { name: 'Credential: Claude', path: '/credentials/claude' },
  { name: 'Credential: SMTP', path: '/credentials/smtp' },
  { name: '404 Page', path: '/404-page-not-found' }
]

async function runAudit() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox', '--window-size=1350,940']
  })

  console.log(`Chrome started on port ${chrome.port}`)
  const resultsDir = path.resolve('test-results/audit-baseline')
  fs.mkdirSync(resultsDir, { recursive: true })

  const summary = []

  // Run desktop audit by default (or mobile)
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
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    }
  }

  for (const route of ROUTES) {
    const targetUrl = `${BASE_URL}${route.path}`
    console.log(`\nAuditing: ${route.name} (${targetUrl})...`)
    try {
      const runnerResult = await lighthouse(targetUrl, desktopFlags)
      const lhr = runnerResult.lhr
      
      const perf = Math.round((lhr.categories.performance?.score || 0) * 100)
      const a11y = Math.round((lhr.categories.accessibility?.score || 0) * 100)
      const bp = Math.round((lhr.categories['best-practices']?.score || 0) * 100)
      const seo = Math.round((lhr.categories.seo?.score || 0) * 100)

      const fcp = lhr.audits['first-contentful-paint']?.displayValue || `${Math.round(lhr.audits['first-contentful-paint']?.numericValue || 0)}ms`
      const lcp = lhr.audits['largest-contentful-paint']?.displayValue || `${Math.round(lhr.audits['largest-contentful-paint']?.numericValue || 0)}ms`
      const tbt = lhr.audits['total-blocking-time']?.displayValue || `${Math.round(lhr.audits['total-blocking-time']?.numericValue || 0)}ms`
      const cls = lhr.audits['cumulative-layout-shift']?.displayValue || `${(lhr.audits['cumulative-layout-shift']?.numericValue || 0).toFixed(3)}`
      const si = lhr.audits['speed-index']?.displayValue || `${Math.round(lhr.audits['speed-index']?.numericValue || 0)}ms`

      // Collect issues
      const failingAudits = Object.entries(lhr.audits)
        .filter(([k, v]) => v.score !== null && v.score < 1 && (v.details?.type === 'table' || v.details?.type === 'opportunity' || v.details?.type === 'list' || v.scoreDisplayMode === 'binary'))
        .map(([k, v]) => ({
          id: k,
          title: v.title,
          score: v.score,
          displayValue: v.displayValue,
          explanation: v.explanation,
          itemsCount: v.details?.items?.length || 0,
          items: v.details?.items?.slice(0, 3)
        }))

      const pageResult = {
        name: route.name,
        path: route.path,
        url: targetUrl,
        scores: { perf, a11y, bp, seo },
        vitals: { fcp, lcp, tbt, cls, si },
        failingAudits
      }

      summary.push(pageResult)
      console.log(`  Scores -> Perf: ${perf} | A11y: ${a11y} | BP: ${bp} | SEO: ${seo}`)
      console.log(`  Vitals -> FCP: ${fcp} | LCP: ${lcp} | TBT: ${tbt} | CLS: ${cls} | SI: ${si}`)
      if (failingAudits.length > 0) {
        console.log(`  Issues (${failingAudits.length}): ${failingAudits.map(f => f.id).join(', ')}`)
      }

      const routeSafeName = route.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
      fs.writeFileSync(path.join(resultsDir, `${routeSafeName}.json`), JSON.stringify(lhr, null, 2))
      await new Promise(r => setTimeout(r, 600))
    } catch (err) {
      console.error(`  Failed to audit ${route.name}:`, err.message)
    }
  }

  await chrome.kill()

  fs.writeFileSync(path.join(resultsDir, 'summary.json'), JSON.stringify(summary, null, 2))
  console.log(`\nAudit complete! Baseline summary written to test-results/audit-baseline/summary.json`)
}

runAudit().catch(console.error)
