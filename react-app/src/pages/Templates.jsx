import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Templates.css';

const icons = {
  cursor: <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 4l7.07 17 2.51-7.39L21 11.07z" /></svg>,
  web: <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/><path d="M2 12h20"/></svg>,
  webhook: <svg viewBox="0 0 24 24" width="18" height="18" stroke="#f97316" strokeWidth="2" fill="none"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  discord: <svg viewBox="0 0 24 24" width="18" height="18" stroke="#5865F2" strokeWidth="2" fill="none"><path d="M9 12a1 1 0 1 0 0 2 1 1 0 1 0 0-2z"/><path d="M15 12a1 1 0 1 0 0 2 1 1 0 1 0 0-2z"/><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037a19.74 19.74 0 0 0-4.885 1.515a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.11 13.11 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.3 12.3 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.84 19.84 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.028z"/></svg>,
  gmail: <svg viewBox="0 0 24 24" width="18" height="18" stroke="#ea4335" strokeWidth="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>,
  sheets: <svg viewBox="0 0 24 24" width="18" height="18" stroke="#34a853" strokeWidth="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
  bracket: <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/></svg>,
  slack: <svg viewBox="0 0 24 24" width="18" height="18" stroke="#4A154B" strokeWidth="2" fill="none"><rect x="13" y="2" width="4" height="8" rx="2"/><rect x="7" y="14" width="4" height="8" rx="2"/><rect x="2" y="7" width="8" height="4" rx="2"/><rect x="14" y="13" width="8" height="4" rx="2"/></svg>
};

const templatesData = [
  {
    id: 1,
    category: 'NOTIFICATIONS',
    title: 'API health check → Discord alert',
    description: 'Ping an endpoint on a schedule; if it is down, post an alert to your team Discord channel.',
    steps: '4 steps · 4 uses',
    icons: ['cursor', 'web', 'webhook', 'discord']
  },
  {
    id: 2,
    category: 'NOTIFICATIONS',
    title: 'New order → Email + Sheet',
    description: 'When an order comes in, email the customer a confirmation and log the order to Google Sheets.',
    steps: '3 steps · 4 uses',
    icons: ['cursor', 'gmail', 'sheets']
  },
  {
    id: 3,
    category: 'DATA SYNC',
    title: 'Lead capture → Google Sheet',
    description: 'Capture a new lead and append it as a row in Google Sheets. Add a webhook trigger to fire it from your site form.',
    steps: '3 steps · 3 uses',
    icons: ['cursor', 'bracket', 'sheets']
  },
  {
    id: 4,
    category: 'REPORTING',
    title: 'Daily metrics → Slack report',
    description: 'Query your database daily, format the metrics, and post a summary directly to a Slack channel.',
    steps: '4 steps · 2 uses',
    icons: ['cursor', 'web', 'bracket', 'slack']
  }
];

const categories = ['All', 'Data sync', 'Notifications', 'Sales', 'Support', 'Reporting', 'Logistics'];

function Templates() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTemplates = activeCategory === 'All' 
    ? templatesData 
    : templatesData.filter(t => t.category === activeCategory.toUpperCase());

  return (
    <div className="templates-page">
      <div className="templates-header">
        <div className="templates-title-block">
          <h1>Templates</h1>
          <p>Start from a ready-made workflow — clone it, wire your accounts, and go live in minutes.</p>
        </div>
        <button className="templates-publish-btn">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Publish a template
        </button>
      </div>

      <div className="templates-filters">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`template-filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="templates-section-title">
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        FEATURED BY FLOWMITRA
      </div>

      <div className="templates-grid">
        {filteredTemplates.map(template => (
          <Link to={`/template/${template.id}`} key={template.id} className="template-card" style={{ textDecoration: 'none' }}>
            <div className="template-card-top">
              <div className="template-flow-icons">
                {template.icons.map((iconKey, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="template-icon-circle">
                      {icons[iconKey]}
                    </div>
                    {index < template.icons.length - 1 && (
                      <div className="template-flow-line" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="template-card-body">
              <span className="template-category">{template.category}</span>
              <h3 className="template-title">{template.title}</h3>
              <p className="template-desc">{template.description}</p>
              <div className="template-card-footer">
                <span className="template-meta">{template.steps}</span>
                <button className="template-use-btn" onClick={(e) => e.preventDefault()}>Use</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Templates;
