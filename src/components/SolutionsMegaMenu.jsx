import { Link } from 'react-router-dom'
import { Megaphone, Briefcase, Settings, Code2, MessageCircle, Shield, ArrowRight } from 'lucide-react'
import './SolutionsMegaMenu.css'

const roles = [
  {
    id: 'sales',
    icon: Briefcase,
    iconColor: '#2563eb',
    iconBg: '#eff6ff',
    title: 'Sales Automation',
    description: 'CRM, lead routing, prospecting & follow-ups'
  },
  {
    id: 'marketing',
    icon: Megaphone,
    iconColor: '#d97706',
    iconBg: '#fffbeb',
    title: 'Marketing & Growth',
    description: 'Campaigns, ads, content & nurturing flows'
  },
  {
    id: 'operations',
    icon: Settings,
    iconColor: '#059669',
    iconBg: '#ecfdf5',
    title: 'Operations & Sync',
    description: 'Cross-app data sync, orders & spreadsheets'
  },
  {
    id: 'support',
    icon: MessageCircle,
    iconColor: '#7c3aed',
    iconBg: '#f5f3ff',
    title: 'Customer Support',
    description: 'Ticket triage, auto-replies & escalation alerts'
  },
  {
    id: 'engineering',
    icon: Code2,
    iconColor: '#0284c7',
    iconBg: '#f0f9ff',
    title: 'Engineering & DevOps',
    description: 'Webhooks, API connectors & CI/CD automations'
  },
  {
    id: 'security',
    icon: Shield,
    iconColor: '#dc2626',
    iconBg: '#fef2f2',
    title: 'Security & Audit',
    description: 'Role-based access, audit logs & compliance'
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
          <div className="mega-menu-header-row">
            <span className="mega-menu-header">BY DEPARTMENT &amp; ROLE</span>
          </div>

          <div className="mega-menu-grid">
            {roles.map((role) => {
              const IconComponent = role.icon
              return (
                <Link
                  key={role.id}
                  to={`/solutions/${role.id}`}
                  className="mega-menu-item"
                  onClick={handleLinkClick}
                >
                  <div 
                    className="menu-item-icon-box"
                    style={{ backgroundColor: role.iconBg, color: role.iconColor }}
                  >
                    <IconComponent className="menu-item-icon" size={17} strokeWidth={2} />
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

        {/* Compact Footer Strip */}
        <div className="mega-menu-footer">
          <Link to="/solutions" className="mega-menu-footer-link" onClick={handleLinkClick}>
            <span>Explore all solutions overview</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SolutionsMegaMenu

