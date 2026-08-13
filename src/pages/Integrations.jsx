import React, { useState, useMemo } from 'react';
import PageSeo from '../components/PageSeo';
import './Integrations.css';

const integrationsData = [
  {
    id: 'ai-agent',
    category: 'ai',
    name: 'AI Agent',
    desc: 'A built-in node that lets a workflow reason, call tools and make decisions using an LLM.',
    icon: 'ic-robot',
    color: '#334155',
    iconColor: '#fff',
    border: 'none',
  },
  {
    id: 'http-request',
    category: 'developer-tools',
    name: 'HTTP Request',
    desc: 'Call any external API or webhook and use the response inside your workflow.',
    icon: 'ic-globe',
    color: '#4F46E5',
    iconColor: '#fff',
    border: 'none',
  },
  {
    id: 'google-sheets',
    category: 'analytics',
    name: 'Google Sheets',
    desc: 'A cloud-based spreadsheet for creating, editing and sharing tables online.',
    icon: 'ic-sheets',
    color: '#0F9D58',
    iconColor: '#fff',
    border: 'none',
  },
  {
    id: 'gmail',
    category: 'communication',
    name: 'Gmail',
    desc: 'Google\'s email service, for sending, reading and organising messages.',
    icon: 'ic-gmail',
    color: '#fff',
    iconColor: '#EA4335',
    border: '1.5px solid #eee',
  },
  {
    id: 'whatsapp',
    category: 'communication',
    name: 'WhatsApp',
    desc: 'A messaging app for chats, alerts and customer conversations.',
    icon: 'ic-whatsapp',
    color: '#25D366',
    iconColor: '#fff',
    border: 'none',
  },
  {
    id: 'slack',
    category: 'communication',
    name: 'Slack',
    desc: 'A team chat platform for channels, direct messages and notifications.',
    icon: 'ic-slack',
    color: '#fff',
    iconColor: 'inherit',
    border: '1.5px solid #eee',
  },
  {
    id: 'discord',
    category: 'communication',
    name: 'Discord',
    desc: 'A chat platform for communities, servers and voice channels.',
    icon: 'ic-discord',
    color: '#5865F2',
    iconColor: '#fff',
    border: 'none',
  },
  {
    id: 'zendesk',
    category: 'communication',
    name: 'Zendesk',
    desc: 'Helpdesk software for managing support tickets and customer conversations.',
    icon: 'ic-zendesk',
    color: '#17181A',
    iconColor: '#fff',
    border: 'none',
  },
  {
    id: 'facebook',
    category: 'sales',
    name: 'Facebook',
    desc: 'Social platform integration for lead ads, pages and messaging.',
    icon: 'ic-fb',
    color: '#1877F2',
    iconColor: '#fff',
    border: 'none',
  },
  {
    id: 'hubspot',
    category: 'sales',
    name: 'HubSpot',
    desc: 'A CRM for managing contacts, deals and marketing campaigns.',
    icon: 'ic-hubspot',
    color: '#FF7A59',
    iconColor: '#fff',
    border: 'none',
  },
  {
    id: 'zoho-books',
    category: 'sales',
    name: 'Zoho Books',
    desc: 'Cloud accounting software for invoices, expenses and payments.',
    icon: 'ic-zoho',
    color: '#C6362B',
    iconColor: '#fff',
    border: 'none',
  },
  {
    id: 'linkedin',
    category: 'sales',
    name: 'LinkedIn',
    desc: 'A professional network for posts, company pages and lead generation.',
    icon: 'ic-linkedin',
    color: '#0A66C2',
    iconColor: '#fff',
    border: 'none',
  }
];

function Integrations() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSegment, setActiveSegment] = useState('all');

  const filteredIntegrations = useMemo(() => {
    return integrationsData.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="integrations-page">
      <PageSeo
        title="Integrations — Connect Your Apps | WorkflowMitra"
        description="Browse all integrations available on WorkflowMitra. Connect your favourite apps, or reach anything else over HTTP."
        path="/integrations"
      />

      {/* Icon sprite */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <symbol id="ic-flow" viewBox="0 0 24 24">
            <circle cx="12" cy="6.5" r="2.1" fill="#fff"/><circle cx="6.5" cy="17" r="2.1" fill="#fff"/><circle cx="17.5" cy="17" r="2.1" fill="#fff"/>
            <path d="M12 8.6v3M10.4 12.6l-2.4 2.6M13.6 12.6l2.4 2.6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
          </symbol>
          <symbol id="ic-search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></symbol>
          <symbol id="ic-chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></symbol>

          <symbol id="ic-fb" viewBox="0 0 24 24"><text x="12" y="16.5" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="14" fill="currentColor">f</text></symbol>
          <symbol id="ic-hubspot" viewBox="0 0 24 24">
            <g stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 12V5"/><path d="M12 12l5 3"/><path d="M12 12l-5 3"/></g>
            <circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="17" cy="15" r="1.5" fill="currentColor"/><circle cx="7" cy="15" r="1.5" fill="currentColor"/>
          </symbol>
          <symbol id="ic-gmail" viewBox="0 0 24 24"><text x="12" y="16.5" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="13" fill="currentColor">M</text></symbol>
          <symbol id="ic-whatsapp" viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-7.6 13.8L3 21l4.4-1.3A9 9 0 1 0 12 3z" fill="currentColor"/></symbol>
          <symbol id="ic-zoho" viewBox="0 0 24 24"><text x="12" y="16.5" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="13" fill="currentColor">Z</text></symbol>
          <symbol id="ic-zendesk" viewBox="0 0 24 24"><text x="12" y="16.5" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="13" fill="currentColor">Z</text></symbol>
          <symbol id="ic-linkedin" viewBox="0 0 24 24"><text x="12" y="16" textAnchor="middle" fontWeight="800" fontSize="10.5" fill="currentColor">in</text></symbol>
          <symbol id="ic-globe" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8.3" fill="none" stroke="currentColor" strokeWidth="1.7"/>
            <path d="M3.7 12h16.6M12 3.7c2.8 3 2.8 13.6 0 16.6M12 3.7c-2.8 3-2.8 13.6 0 16.6" fill="none" stroke="currentColor" strokeWidth="1.4"/>
          </symbol>
          <symbol id="ic-discord" viewBox="0 0 24 24">
            <path d="M7 6.6C9 5.6 10.6 5.2 12 5.2s3 .4 5 1.4c1.7 2.1 2.5 5.2 2.2 8.7-1.4 1-3 1.6-4.5 2l-.7-1.3c.7-.2 1.4-.5 2-1-1.6.9-3.4 1.4-5 1.4s-3.4-.5-5-1.4c.6.5 1.3.8 2 1l-.7 1.3c-1.5-.4-3.1-1-4.5-2C4.5 11.8 5.3 8.7 7 6.6z" fill="currentColor"/>
            <circle cx="9.3" cy="11.4" r="1.15" fill="#fff"/><circle cx="14.7" cy="11.4" r="1.15" fill="#fff"/>
          </symbol>
          <symbol id="ic-sheets" viewBox="0 0 24 24">
            <rect x="4.5" y="3" width="15" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M4.5 9h15M4.5 15h15M10 3v18M14.5 3v18" stroke="currentColor" strokeWidth="1.1"/>
          </symbol>
          <symbol id="ic-slack" viewBox="0 0 24 24">
            <circle cx="8" cy="8" r="3.1" fill="#36C5F0"/><circle cx="16" cy="8" r="3.1" fill="#2EB67D"/>
            <circle cx="8" cy="16" r="3.1" fill="#ECB22E"/><circle cx="16" cy="16" r="3.1" fill="#E01E5A"/>
          </symbol>
          <symbol id="ic-robot" viewBox="0 0 24 24">
            <rect x="5" y="7.5" width="14" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6"/>
            <circle cx="9.6" cy="12.6" r="1.3" fill="currentColor"/><circle cx="14.4" cy="12.6" r="1.3" fill="currentColor"/>
            <path d="M12 7.5V4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="3.6" r="1" fill="currentColor"/>
            <path d="M9 16h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </symbol>
        </defs>
      </svg>

      <section className="int-hero">
        <h1>Every integration WorkflowMitra supports</h1>
        <p>Browse connectors for your favourite apps, or reach anything else over HTTP. Move data between tools without writing a line of code.</p>
      </section>

      <section className="int-browse">
        <div className="int-browse-head"><h2>Connect anything to everything</h2></div>

        <div className="int-search-row">
          <div className="int-search-box">
            <svg><use href="#ic-search"></use></svg>
            <input 
              type="text" 
              placeholder="Search for apps, nodes, workflows…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="int-seg-group">
            {['all', 'regular', 'trigger', 'core'].map((seg) => (
              <button 
                key={seg}
                className={`int-seg-btn ${activeSegment === seg ? 'active' : ''}`}
                onClick={() => setActiveSegment(seg)}
              >
                {seg === 'all' ? 'All Types' : seg.charAt(0).toUpperCase() + seg.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="int-browse-body">
          <aside className="int-sidebar">
            <div className="int-sidebar-title">Categories</div>
            <label className="int-check-row">Partner built <input type="checkbox" /></label>
            <div className="int-radio-list">
              {[
                { id: 'all', label: 'All categories' },
                { id: 'ai', label: 'AI', hasChev: true },
                { id: 'analytics', label: 'Analytics' },
                { id: 'communication', label: 'Communication' },
                { id: 'sales', label: 'Sales' },
                { id: 'developer-tools', label: 'Developer tools' },
                { id: 'cybersecurity', label: 'Cybersecurity' }
              ].map(cat => (
                <label className="int-radio-row" key={cat.id}>
                  <span>
                    {cat.label} 
                    {cat.hasChev && <svg className="int-chev"><use href="#ic-chev"></use></svg>}
                  </span>
                  <input 
                    type="radio" 
                    name="cat" 
                    value={cat.id} 
                    checked={activeCategory === cat.id}
                    onChange={(e) => setActiveCategory(e.target.value)}
                  />
                </label>
              ))}
            </div>
          </aside>

          <div className="int-results">
            <div className="int-results-head">
              <span className="int-count">
                {filteredIntegrations.length} integration{filteredIntegrations.length !== 1 ? 's' : ''}
              </span>
              <div className="int-sort">
                Sort:
                <select defaultValue="Popularity">
                  <option>Popularity</option>
                  <option>A–Z</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {filteredIntegrations.length > 0 ? (
              <div className="int-grid">
                {filteredIntegrations.map((item) => (
                  <article className="int-card" key={item.id}>
                    <span 
                      className="int-tile" 
                      style={{ background: item.color, border: item.border !== 'none' ? item.border : undefined }}
                    >
                      <svg style={{ color: item.iconColor }}><use href={`#${item.icon}`}></use></svg>
                    </span>
                    <p className="int-name">{item.name}</p>
                    <p className="int-desc">{item.desc}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="int-empty-state">No integrations match this category yet.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Integrations;
