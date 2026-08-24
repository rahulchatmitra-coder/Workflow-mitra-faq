import { useState, useMemo } from 'react';
import TemplateCard from '../components/TemplateCard';
import TemplateSearchBox from '../components/TemplateSearchBox';
import TemplateFilterChips from '../components/TemplateFilterChips';
import PageSeo from '../components/PageSeo';
import './Templates.css';

const templatesData = [
  {
    id: 1,
    category: 'LEAD CAPTURE',
    title: 'Facebook lead → CRM → team alert',
    description: 'A new Lead Ads submission creates a HubSpot contact, emails the lead, tells the team on Slack, and keeps a copy in Google Sheets.',
    steps: '5 steps · 3 uses',
    icons: ['facebook', 'webhook', 'hubspot', 'users', 'gmail']
  },
  {
    id: 2,
    category: 'E-COMMERCE',
    title: 'Shopify order → invoice → WhatsApp + shipping',
    description: 'A paid Shopify order raises a Zoho Books invoice, confirms on WhatsApp, books the Shiprocket shipment and logs the order to a sheet.',
    steps: '5 steps · 0 uses',
    icons: ['shopify', 'webhook', 'zoho', 'whatsapp', 'truck']
  },
  {
    id: 3,
    category: 'CUSTOMER SUPPORT',
    title: 'Support ticket → AI triage → team + reply',
    description: 'A new helpdesk ticket is categorised by AI, urgent ones alert the team, it goes to the next agent in the rota, and the customer gets an acknowledgement.',
    steps: '5 steps · 0 uses',
    icons: ['zendesk', 'sparkles', 'webhook', 'users', 'slack']
  },
  {
    id: 4,
    category: 'AI',
    title: 'AI email assistant → draft → approve → send',
    description: 'New mail is read by AI, spam is archived, the rest is categorised and a reply drafted — then a person approves before anything is sent.',
    steps: '5 steps · 0 uses',
    icons: ['gmail', 'sparkles', 'webhook', 'gmail', 'sparkles']
  },
  {
    id: 5,
    category: 'SOCIAL',
    title: 'New blog post → AI rewrite → social',
    description: 'When your blog publishes, AI rewrites the post for each network, a person approves it, then it goes to LinkedIn, Facebook, Telegram and Discord.',
    steps: '5 steps · 0 uses',
    icons: ['rss', 'sparkles', 'user-orange', 'webhook', 'linkedin']
  },
  {
    id: 6,
    category: 'LEAD CAPTURE',
    title: 'Website form → WhatsApp + CRM + sales owner',
    description: 'A form submission is categorised by AI, saved to HubSpot, answered on WhatsApp and email, then handed to the next salesperson in the rota.',
    steps: '5 steps · 0 uses',
    icons: ['zap', 'webhook', 'sparkles', 'hubspot', 'users']
  },
  {
    id: 7,
    category: 'NOTIFICATIONS',
    title: 'API health check → Discord alert',
    description: 'Ping an endpoint on a schedule; if it is down, post an alert to your team Discord channel.',
    steps: '4 steps · 0 uses',
    icons: ['cursor', 'web', 'webhook', 'discord']
  },
  {
    id: 8,
    category: 'NOTIFICATIONS',
    title: 'New order → Email + Sheet',
    description: 'When an order comes in, email the customer a confirmation and log the order to Google Sheets.',
    steps: '3 steps · 0 uses',
    icons: ['cursor', 'gmail', 'sheets']
  },
  {
    id: 9,
    category: 'REPORTING',
    title: 'Daily report → Slack',
    description: 'Fetch your metrics from an API, format a short summary, and post it to a Slack channel every day.',
    steps: '4 steps · 0 uses',
    icons: ['cursor', 'web', 'code', 'slack']
  },
  {
    id: 10,
    category: 'DATA SYNC',
    title: 'Lead capture → Google Sheet',
    description: 'Capture a new lead and append it as a row in Google Sheets. Add a webhook trigger to fire it from your site form.',
    steps: '3 steps · 0 uses',
    icons: ['cursor', 'braces', 'sheets']
  }
];

function Templates() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const cats = new Set(templatesData.map(t => t.category));
    return ['All', ...Array.from(cats).sort()];
  }, []);

  const filteredTemplates = useMemo(() => {
    return templatesData.filter(t => {
      return activeCategory === 'All' || t.category === activeCategory;
    });
  }, [activeCategory]);

  return (
    <div className="app-content">
      <PageSeo
        title="Workflow Templates — Ready-Made Automations | WorkflowMitra"
        description="Browse ready-made workflow templates. Open one, connect your accounts, and run it — no coding required."
        path="/templates"
      />
      <h1 className="sr-only">Workflow Templates — Ready-Made Automations</h1>

      {/* SPRITE SHEET DEFINITION (Rendered ONCE) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <symbol id="i-cursor" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 8l6.5 15.5 2.5-7.5 7.5-2.5z"/>
            <path d="M4 4l1.5 1.5M2 8h2M8 2v2"/>
          </symbol>
          <symbol id="i-web" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/><path d="M2 12h20"/></symbol>
          <symbol id="i-webhook" viewBox="0 0 24 24"><path fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7.5 8c0-2.5 2-4 4.4-4S16 5.5 16 8s-2 4-4.4 4c-2.2 0-3.7 1.3-3.7 3.3s1.5 3.3 3.7 3.3c2.4 0 4.4-1.5 4.4-4"/></symbol>
          <symbol id="i-gmail" viewBox="0 0 24 24">
            <path fill="#4285f4" d="M2 18.5V5.4l8 6v10.6H4.5A2.5 2.5 0 0 1 2 18.5z"/>
            <path fill="#34a853" d="M22 18.5V5.4l-8 6v10.6h5.5a2.5 2.5 0 0 0 2.5-2.5z"/>
            <path fill="#ea4335" d="M14 11.4V2h5.5c1.4 0 2.5 1.1 2.5 2.5v.9L14 11.4z"/>
            <path fill="#fbbc04" d="M10 11.4V2H4.5C3.1 2 2 3.1 2 4.5v.9l8 6z"/>
            <path fill="#ea4335" d="M10 11.4L12 13l2-1.6V2h-4v9.4z"/>
          </symbol>
          <symbol id="i-sheets" viewBox="0 0 24 24">
            <path fill="#0F9D58" d="M14 2H6C4.9 2 4 2.9 4 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z"/>
            <path fill="#00e676" d="M14 2v6h6L14 2z"/>
            <path fill="#ffffff" d="M7 10h10v2H7zM7 14h10v2H7zM7 18h6v2H7z"/>
          </symbol>
          <symbol id="i-slack" viewBox="0 0 24 24">
            <path fill="#e01e5a" d="M9.4 15.6c0-1.2-.9-2.1-2.1-2.1s-2.1.9-2.1 2.1.9 2.1 2.1 2.1h2.1v-2.1zm0-1.6c0 1.2.9 2.1 2.1 2.1s2.1-.9 2.1-2.1V9.4c0-1.2-.9-2.1-2.1-2.1s-2.1.9-2.1 2.1v4.6z"/>
            <path fill="#36c5f0" d="M8.4 9.4c1.2 0 2.1-.9 2.1-2.1S9.6 5.2 8.4 5.2s-2.1.9-2.1 2.1.9 2.1 2.1 2.1v-.1zm1.6 0c-1.2 0-2.1.9-2.1 2.1s.9 2.1 2.1 2.1h4.6c1.2 0 2.1-.9 2.1-2.1s-.9-2.1-2.1-2.1h-4.6z"/>
            <path fill="#2eb67d" d="M14.6 8.4c0 1.2.9 2.1 2.1 2.1s2.1-.9 2.1-2.1-.9-2.1-2.1-2.1h-2.1v2.1zm0 1.6c0-1.2-.9-2.1-2.1-2.1s-2.1.9-2.1 2.1v4.6c0 1.2.9 2.1 2.1 2.1s2.1-.9 2.1-2.1V10z"/>
            <path fill="#ecb22e" d="M15.6 14.6c-1.2 0-2.1.9-2.1 2.1s.9 2.1 2.1 2.1 2.1-.9 2.1-2.1v-.1zm-1.6 0c1.2 0 2.1-.9 2.1-2.1s-.9-2.1-2.1-2.1h-4.6c-1.2 0-2.1.9-2.1 2.1s.9 2.1 2.1 2.1h4.6z"/>
          </symbol>
          <symbol id="i-sparkles" viewBox="0 0 24 24" fill="#111"><path d="M12 2.5l1.9 6.3 6.1 1.9-6.1 1.9-1.9 6.4-1.9-6.4-6.1-1.9 6.1-1.9z"/></symbol>
          <symbol id="i-zap" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></symbol>
          <symbol id="i-braces" viewBox="0 0 24 24"><text x="12" y="16.5" fontFamily="'JetBrains Mono', monospace" fontSize="14" textAnchor="middle" fill="#111">{`{ }`}</text></symbol>
          <symbol id="i-code" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></symbol>
          <symbol id="i-discord" viewBox="0 0 24 24">
            <path fill="#5865F2" d="M19.3 5.4c-1.3-.6-2.8-1.1-4.4-1.4-.2.3-.4.7-.6 1.1-1.6-.2-3.1-.2-4.7 0-.2-.4-.4-.8-.6-1.1-1.5.3-3 .7-4.4 1.4-2.5 3.8-3.2 8.1-2.7 12.3 1.8 1.3 3.5 2 5.1 2.5.4-.5.8-1 1.1-1.6-1.5-.6-2.9-1.3-4.2-2.3 2.8 1.9 6.2 2.8 9.7 2.8 3.5 0 6.9-1 9.7-2.8-1.2 1-2.7 1.8-4.2 2.3.4.6.8 1.1 1.1 1.6 1.7-.5 3.4-1.2 5.1-2.5.5-4.6-.4-8.8-2.9-12.3zM8.8 15.6c-1 0-1.8-.9-1.8-2 0-1.1.8-2 1.8-2s1.8.9 1.8 2c0 1.1-.8 2-1.8 2zm6.4 0c-1 0-1.8-.9-1.8-2 0-1.1.8-2 1.8-2s1.8.9 1.8 2c0 1.1-.8 2-1.8 2z"/>
          </symbol>
          <symbol id="i-whatsapp" viewBox="0 0 24 24">
            <path fill="#25D366" d="M12 2C6.48 2 2 6.48 2 12c0 1.74.45 3.38 1.24 4.8L2 22l5.35-1.19A9.95 9.95 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.1 14.28c-.22.61-1.24 1.14-1.72 1.21-.46.06-1.03.09-2.99-.74-2.35-.99-3.87-3.44-3.99-3.6-.11-.16-.95-1.27-.95-2.42s.6-1.72.82-1.95c.21-.23.46-.28.61-.28.15 0 .3 0 .44.01.14.01.32-.05.5.4.18.45.62 1.5.68 1.62.05.12.09.26.02.41-.08.16-.11.25-.22.37-.11.12-.23.25-.32.34-.11.1-.21.21-.09.41.11.2.49.82 1.03 1.31.7.64 1.31.84 1.51.94.2.1.32.08.43-.05.11-.13.5-.59.64-.79.13-.2.29-.17.47-.11.18.06 1.16.55 1.36.65.2.1.33.15.38.23.04.09.04.49-.18 1.1z"/>
          </symbol>
          <symbol id="i-facebook" viewBox="0 0 24 24">
            <path fill="#1877F2" d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z"/>
            <path fill="#FFF" d="M16.67 15.56l.53-3.5h-3.32V9.8c0-.95.47-1.88 1.96-1.88h1.5V4.94s-1.36-.23-2.67-.23c-2.73 0-4.53 1.67-4.53 4.7v2.66H7.08v3.5h3.04V24h3.76v-8.44h2.79z"/>
          </symbol>
          <symbol id="i-hubspot" viewBox="0 0 24 24">
            <path fill="#FF7A59" d="M19.1 7.2a2.9 2.9 0 1 0 0-5.8 2.9 2.9 0 0 0 0 5.8zM4.9 17.6a2.9 2.9 0 1 0 0-5.8 2.9 2.9 0 0 0 0 5.8zm6.5-7.4a2.9 2.9 0 1 1 5.8 0 2.9 2.9 0 0 1-5.8 0z"/>
            <path fill="#FF7A59" d="M12.5 12.5L6.5 16l-1-1.5 6-3.5 1 1.5zm.5-.5l5-7 1.5 1-5 7-1.5-1z"/>
          </symbol>
          <symbol id="i-users" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </symbol>
          <symbol id="i-shopify" viewBox="0 0 24 24">
            <path fill="#95BF47" d="M19.2 7c-.2-.7-.9-1.2-1.6-1.2H6.4c-.7 0-1.4.5-1.6 1.2L2.3 21.5h19.4L19.2 7z"/>
            <path fill="none" stroke="#95BF47" strokeWidth="2.5" d="M7.5 7V4.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5V7"/>
            <path fill="#ffffff" d="M13.5 12.5c0-.6-.4-.9-1-.9s-1 .3-1 .6c0 .4.4.5.8.6l1.2.4c1.1.4 1.5 1 1.5 1.8 0 1.3-1 2.2-2.5 2.2s-2.5-.9-2.5-2h1.4c.1.5.5.8 1.1.8s1.1-.3 1.1-.7c0-.4-.3-.6-.8-.7l-1.1-.3c-1.2-.4-1.6-1-1.6-1.9 0-1.2 1-2.1 2.4-2.1 1.5 0 2.3.9 2.3 1.9h-1.3z"/>
          </symbol>
          <symbol id="i-zoho" viewBox="0 0 24 24">
            <rect x="2" y="7" width="20" height="10" rx="3" fill="#E42528"/>
            <text x="12" y="14" fill="#fff" fontFamily="Arial, sans-serif" fontSize="6.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">ZOHO</text>
          </symbol>
          <symbol id="i-truck" viewBox="0 0 24 24" fill="#111">
            <path d="M20 8h-3V4H3v13h2a3 3 0 0 0 6 0h2a3 3 0 0 0 6 0h2v-5l-3-4zM6 18a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm12 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-1-7l2.2 3H17v-3z"/>
          </symbol>
          <symbol id="i-zendesk" viewBox="0 0 24 24">
            <path fill="#03363D" d="M12 12l8-8v16z"/><path fill="#03363D" d="M12 12L4 20V4z"/>
          </symbol>
          <symbol id="i-rss" viewBox="0 0 24 24" fill="none" stroke="#F26522" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1.5" fill="#F26522"></circle>
          </symbol>
          <symbol id="i-user-orange" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
          </symbol>
          <symbol id="i-linkedin" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 19H6V10h3v9zM7.5 8.5c-1 0-1.8-.8-1.8-1.8S6.5 5 7.5 5s1.8.8 1.8 1.8-.8 1.8-1.8 1.8zM19 19h-3v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2V19h-3V10h3v1.3c.7-1.2 2-1.8 3.5-1.8 2.5 0 4.5 2 4.5 4.5V19z"/>
          </symbol>
        </defs>
      </svg>

      <div className="tabs" role="tablist" aria-label="Filter templates by category">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            role="tab"
            aria-selected={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="section-label">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 2.5 15 9l7 1-5.2 5 1.3 7-6.1-3.3L5.9 22l1.3-7L2 10l7-1z"/></svg>
        FEATURED · BY WORKFLOWMITRA
      </div>

      <div className="template-grid">
        {filteredTemplates.map((template, index) => (
          <TemplateCard key={template.id} template={template} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Templates;
