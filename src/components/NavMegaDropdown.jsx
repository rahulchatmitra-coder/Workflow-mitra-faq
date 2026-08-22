import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Sparkles,
  TrendingUp,
  Headphones,
  Sliders,
  Code2,
  Shield,
  Layers,
  LayoutGrid,
  Zap,
  Cpu,
  BookOpen,
  Rocket,
  KeyRound,
  Send
} from 'lucide-react'
import './NavMegaDropdown.css'

const solutionsRoles = [
  { id: 'marketing', title: 'Marketing', icon: Sparkles, path: '/solutions/marketing' },
  { id: 'sales', title: 'Sales', icon: TrendingUp, path: '/solutions/sales' },
  { id: 'support', title: 'Support', icon: Headphones, path: '/solutions/support' },
  { id: 'operations', title: 'Operations', icon: Sliders, path: '/solutions/operations' },
  { id: 'engineering', title: 'Engineering', icon: Code2, path: '/solutions/engineering' },
  { id: 'security', title: 'Security', icon: Shield, path: '/solutions/security' }
]

const resourcesCol1 = [
  { id: 'templates', title: 'Workflow Templates', icon: Layers, path: '/templates' },
  { id: 'integrations', title: 'Integrations Library', icon: LayoutGrid, path: '/integrations' },
  { id: 'autonomous', title: 'Autonomous Workflows', icon: Zap, path: '/#workflow-showcase' },
  { id: 'app-connectors', title: '37+ App Connectors', icon: Cpu, path: '/integrations' }
]

const resourcesCol2 = [
  { id: 'docs', title: 'Documentation Hub', icon: BookOpen, path: '/docs' },
  { id: 'setup-guide', title: 'Account Setup Guide', icon: Rocket, path: '/how-to-create-account-workflowmitra' },
  { id: 'credentials', title: 'API Credentials Vault', icon: KeyRound, path: '/credentials' },
  { id: 'whatsapp-guide', title: 'WhatsApp Cloud API', icon: Send, path: '/credentials/whatsapp' },
  { id: 'expert', title: 'Talk to an Expert', icon: Headphones, path: '/contact' }
]

export default function NavMegaDropdown({
  activeMenu,
  onClose
}) {
  if (!activeMenu) return null

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <div className="nav-dropdown-menu-wrapper">
      <motion.div
        className={`nav-dropdown-card panel-${activeMenu}`}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -3 }}
        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-label={activeMenu === 'solutions' ? 'Solutions menu' : 'Resources menu'}
      >
        {/* ─── 1. SOLUTIONS DROPDOWN (Clean Roles with Proper Icon Boxes) ─── */}
        {activeMenu === 'solutions' && (
          <div className="nav-dropdown-body">
            <div className="nav-dropdown-col">
              <div className="nav-dropdown-header">ROLES</div>
              <div className="nav-dropdown-list">
                {solutionsRoles.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="nav-dropdown-item-link"
                      onClick={handleLinkClick}
                    >
                      <div className="nav-dropdown-icon-box">
                        <Icon size={21} strokeWidth={2} className="nav-dropdown-svg" />
                      </div>
                      <span className="nav-dropdown-item-title">{item.title}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── 2. RESOURCES DROPDOWN (Clean Multi-column with Icon Boxes) ─── */}
        {activeMenu === 'resources' && (
          <div className="nav-dropdown-body">
            <div className="nav-dropdown-grid res-grid">
              {/* Build & Automate */}
              <div className="nav-dropdown-col">
                <div className="nav-dropdown-header">BUILD &amp; AUTOMATE</div>
                <div className="nav-dropdown-list">
                  {resourcesCol1.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.id}
                        to={item.path}
                        className="nav-dropdown-item-link"
                        onClick={handleLinkClick}
                      >
                        <div className="nav-dropdown-icon-box">
                          <Icon size={21} strokeWidth={2} className="nav-dropdown-svg" />
                        </div>
                        <span className="nav-dropdown-item-title">{item.title}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Documentation & Setup */}
              <div className="nav-dropdown-col">
                <div className="nav-dropdown-header">DOCS &amp; SETUP</div>
                <div className="nav-dropdown-list">
                  {resourcesCol2.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.id}
                        to={item.path}
                        className="nav-dropdown-item-link"
                        onClick={handleLinkClick}
                      >
                        <div className="nav-dropdown-icon-box">
                          <Icon size={21} strokeWidth={2} className="nav-dropdown-svg" />
                        </div>
                        <span className="nav-dropdown-item-title">{item.title}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
