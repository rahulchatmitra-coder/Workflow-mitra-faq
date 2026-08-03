import { Link } from 'react-router-dom'
import { Megaphone, Briefcase, Settings, Code2, MessageCircle, Shield, Target, Mail, Database, Headphones, FileSearch, TrendingUp } from 'lucide-react'
import './SolutionsMegaMenu.css'

const roles = [
  {
    id: 'marketing',
    icon: Megaphone,
    title: 'Marketing',
    description: 'Automate campaigns, content workflows, lead research and reporting'
  },
  {
    id: 'sales',
    icon: Briefcase,
    title: 'Sales',
    description: 'Automate prospecting, enrichment, follow-ups and CRM workflows'
  },
  {
    id: 'operations',
    icon: Settings,
    title: 'Operations',
    description: 'Eliminate repetitive manual work across your business systems'
  },
  {
    id: 'engineering',
    icon: Code2,
    title: 'Engineering',
    description: 'Build reliable technical workflows, integrations and internal automations'
  },
  {
    id: 'support',
    icon: MessageCircle,
    title: 'Support',
    description: 'Automate ticket workflows, customer requests, routing and notifications'
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Security',
    description: 'Build controlled, auditable automation workflows with secure access'
  }
]

const useCases = [
  {
    id: 'lead-generation',
    icon: Target,
    title: 'Lead Generation',
    description: 'Find and enrich leads automatically'
  },
  {
    id: 'email-automation',
    icon: Mail,
    title: 'Email Automation',
    description: 'Automated email sequences and responses'
  },
  {
    id: 'crm-automation',
    icon: Database,
    title: 'CRM Automation',
    description: 'Keep your CRM data synchronized'
  },
  {
    id: 'customer-support',
    icon: Headphones,
    title: 'Customer Support',
    description: 'Automate ticket routing and responses'
  },
  {
    id: 'data-extraction',
    icon: FileSearch,
    title: 'Data Extraction',
    description: 'Extract and process data from documents'
  },
  {
    id: 'report-generation',
    icon: TrendingUp,
    title: 'Report Generation',
    description: 'Automated reporting and analytics'
  }
]

function SolutionsMegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }) {
  if (!isOpen) return null

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <div className="mega-menu-overlay" onClick={onClose}>
      <div 
        className="mega-menu" 
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role="dialog"
        aria-label="Solutions menu"
      >
        <div className="mega-menu-content">
          <div className="mega-menu-section">
            <div className="mega-menu-header">ROLES</div>
            <div className="mega-menu-items">
              {roles.map((role) => {
                const IconComponent = role.icon
                return (
                  <Link
                    key={role.id}
                    to={`/solutions/${role.id}`}
                    className="mega-menu-item"
                    onClick={handleLinkClick}
                  >
                    <div className="menu-item-icon-box">
                      <IconComponent className="menu-item-icon" size={20} strokeWidth={1.5} />
                    </div>
                    <div className="menu-item-content">
                      <div className="menu-item-title">{role.title}</div>
                      <div className="menu-item-description">{role.description}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="mega-menu-divider"></div>

          <div className="mega-menu-section">
            <div className="mega-menu-header">USE CASES</div>
            <div className="mega-menu-items">
              {useCases.map((useCase) => {
                const IconComponent = useCase.icon
                return (
                  <Link
                    key={useCase.id}
                    to={`/solutions/${useCase.id}`}
                    className="mega-menu-item"
                    onClick={handleLinkClick}
                  >
                    <div className="menu-item-icon-box">
                      <IconComponent className="menu-item-icon" size={20} strokeWidth={1.5} />
                    </div>
                    <div className="menu-item-content">
                      <div className="menu-item-title">{useCase.title}</div>
                      <div className="menu-item-description">{useCase.description}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SolutionsMegaMenu
