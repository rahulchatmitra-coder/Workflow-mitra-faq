import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import './App.css'

// Keep the homepage's first paint synchronous. Every other page is fetched
// only when its route is visited, so the homepage does not pay for unrelated
// pages, docs, or their icon/data dependencies.
const Apps = lazy(() => import('./pages/Apps'))
const Solutions = lazy(() => import('./pages/Solutions'))
const SolutionMarketing = lazy(() => import('./pages/SolutionMarketing'))
const SolutionSales = lazy(() => import('./pages/SolutionSales'))
const SolutionOperations = lazy(() => import('./pages/SolutionOperations'))
const SolutionEngineering = lazy(() => import('./pages/SolutionEngineering'))
const SolutionSupport = lazy(() => import('./pages/SolutionSupport'))
const SolutionSecurity = lazy(() => import('./pages/SolutionSecurity'))
const TestPage = lazy(() => import('./pages/TestPage'))
const Pricing = lazy(() => import('./pages/Pricing'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const TemplateFlowPage = lazy(() => import('./pages/TemplateFlowPage'))
const Templates = lazy(() => import('./pages/Templates'))
const Integrations = lazy(() => import('./pages/Integrations'))
const IntegrationsHub = lazy(() => import('./pages/docs/IntegrationsHub'))
const IntegrationDocPage = lazy(() => import('./pages/docs/IntegrationDocPage'))

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main>
          <Suspense fallback={<div className="route-loading" aria-hidden="true" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apps" element={<Apps />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/solutions/marketing" element={<SolutionMarketing />} />
              <Route path="/solutions/sales" element={<SolutionSales />} />
              <Route path="/solutions/operations" element={<SolutionOperations />} />
              <Route path="/solutions/engineering" element={<SolutionEngineering />} />
              <Route path="/solutions/support" element={<SolutionSupport />} />
              <Route path="/solutions/security" element={<SolutionSecurity />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/template/:templateId" element={<TemplateFlowPage />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/docs" element={<IntegrationsHub />} />
              <Route path="/docs/integrations" element={<IntegrationsHub />} />
              <Route path="/docs/integrations/:slug" element={<IntegrationDocPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
