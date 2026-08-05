import '../../styles/docs-theme.css'
import './DocsLayout.css'

/**
 * Docs page shell.
 *
 * Deliberately has NO topbar or footer of its own — the real site
 * <Navigation /> and <Footer /> wrap every route (see App.jsx), so docs sit
 * inside the same chrome as the rest of workflowmitra.com. This only provides
 * the full-width canvas and the optional sticky section nav beside the content.
 */
export function DocsLayout({ sectionNav, children }) {
  return (
    <div className="docs-shell">
      <div className={`docs-body${sectionNav ? '' : ' docs-body--no-sidenav'}`}>
        {sectionNav}
        <main className="docs-main">{children}</main>
      </div>
    </div>
  )
}
