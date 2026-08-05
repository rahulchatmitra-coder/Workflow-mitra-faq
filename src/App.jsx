import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import Solutions from './pages/Solutions'
import SolutionMarketing from './pages/SolutionMarketing'
import SolutionSales from './pages/SolutionSales'
import SolutionOperations from './pages/SolutionOperations'
import SolutionEngineering from './pages/SolutionEngineering'
import SolutionSupport from './pages/SolutionSupport'
import SolutionSecurity from './pages/SolutionSecurity'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Contact from './pages/Contact'
import Apps from './pages/Apps'
import TemplateDetail from './pages/TemplateDetail'
import TemplateFlowPage from './pages/TemplateFlowPage'
import TestPage from './pages/TestPage'
import Templates from './pages/Templates'
import Integrations from './pages/Integrations'
import IntegrationsHub from './pages/docs/IntegrationsHub'
import IntegrationDocPage from './pages/docs/IntegrationDocPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
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
        <Footer />
      </div>
    </Router>
  )
}

export default App
