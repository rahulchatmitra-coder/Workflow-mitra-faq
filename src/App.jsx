import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Lenis from 'lenis'
import { TextColorProvider } from './credentials-portal/TextColorContext'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import Home from './pages/Home'
import './App.css'

// Keep the homepage's first paint synchronous. Every other page is fetched
// only when its route is visited, so the homepage does not pay for unrelated
// pages, docs, or their icon/data dependencies.
const Solutions = lazy(() => import('./pages/Solutions'))
const SolutionMarketing = lazy(() => import('./pages/SolutionMarketing'))
const SolutionSales = lazy(() => import('./pages/SolutionSales'))
const SolutionOperations = lazy(() => import('./pages/SolutionOperations'))
const SolutionEngineering = lazy(() => import('./pages/SolutionEngineering'))
const SolutionSupport = lazy(() => import('./pages/SolutionSupport'))
const SolutionSecurity = lazy(() => import('./pages/SolutionSecurity'))
const Pricing = lazy(() => import('./pages/Pricing'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const AutomationHelp = lazy(() => import('./pages/AutomationHelp'))
const Features = lazy(() => import('./pages/Features'))
const TemplateFlowPage = lazy(() => import('./pages/TemplateFlowPage'))
const Templates = lazy(() => import('./pages/Templates'))
const Integrations = lazy(() => import('./pages/Integrations'))
const IntegrationsHub = lazy(() => import('./pages/docs/IntegrationsHub'))
const IntegrationDocPage = lazy(() => import('./pages/docs/IntegrationDocPage'))
const CreateAccountPage = lazy(() => import('./credentials-portal/CreateAccountPage'))
const CredentialsPage = lazy(() => import('./credentials-portal/CredentialsPage'))
const CredentialProviderPage = lazy(() => import('./credentials-portal/CredentialProviderPage'))

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])
  return (
    <TextColorProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="app">
          <Navigation />
          <main>
            <Suspense fallback={<div className="route-loading" aria-hidden="true" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/apps" element={<Navigate to="/integrations" replace />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/solutions/marketing" element={<SolutionMarketing />} />
                <Route path="/solutions/sales" element={<SolutionSales />} />
                <Route path="/solutions/operations" element={<SolutionOperations />} />
                <Route path="/solutions/engineering" element={<SolutionEngineering />} />
                <Route path="/solutions/support" element={<SolutionSupport />} />
                <Route path="/solutions/security" element={<SolutionSecurity />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/automation-help" element={<AutomationHelp />} />
                <Route path="/features" element={<Features />} />
                <Route path="/template/:templateId" element={<TemplateFlowPage />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/docs" element={<IntegrationsHub />} />
                <Route path="/docs/integrations" element={<IntegrationsHub />} />
                <Route path="/docs/integrations/:slug" element={<IntegrationDocPage />} />
                <Route path="/how-to-create-account-workflowmitra" element={<CreateAccountPage />} />
                <Route path="/create-account" element={<Navigate to="/how-to-create-account-workflowmitra" replace />} />
                <Route path="/credentials" element={<CredentialsPage />} />
                <Route path="/credentials/:providerId" element={<CredentialProviderPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <CookieConsent />
        </div>
      </Router>
    </TextColorProvider>
  )
}

export default App
