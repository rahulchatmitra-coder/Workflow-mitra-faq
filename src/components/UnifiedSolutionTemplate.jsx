import React, { useState } from 'react';
import { 
  SiHubspot, 
  SiMailchimp, 
  SiGoogle, 
  SiMeta, 
  SiAirtable, 
  SiNotion,
  SiWebflow,
  SiTypeform,
  SiGmail,
  SiDatadog,
  SiJira,
  SiHuggingface,
  SiWhatsapp
} from 'react-icons/si';
import { FaLinkedin, FaSlack, FaGithub, FaAws, FaSalesforce, FaUserCircle, FaCube, FaMicrosoft } from 'react-icons/fa';
import { OpenAI, Anthropic, Google, Meta, DeepSeek } from '@lobehub/icons';
import './UnifiedSolutionTemplate.css';
import { getBrandIcon } from '../utils/brandIcons';

const getAppIcon = (name) => {
  const brandData = getBrandIcon(name, { size: 18 });
  if (brandData) return brandData.component;
  return <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#666' }}><FaCube /></div>;
};

const apps = [
  { name:'Salesforce',     tools:['Create contact','Update deal stage','Get pipeline report','Log activity','Find contact'] },
  { name:'Slack',          tools:['Send message','Create channel','Get channel history','Send direct message','Add reaction'] },
  { name:'Gmail',          tools:['Send email','Get inbox messages','Create draft','Search emails','Add label'] },
  { name:'GitHub',         tools:['Create issue','List pull requests','Get commit history','Merge branch','Add comment'] },
  { name:'Jira',           tools:['Create ticket','Update ticket status','Get ticket details','Assign agent','Add internal note'] },
  { name:'Google Sheets',  tools:['Read range','Update cell','Append row','Get sheet list','Create sheet'] },
  { name:'Airtable',       tools:['Run query','Get table schema','Insert row','Update record','Get row count'] },
  { name:'Notion',         tools:['Create document','Update content','Get document text','Share document','List recent docs'] },
  { name:'HubSpot',        tools:['Create contact','Update deal stage','Get pipeline report','Log activity','Find contact'] },
  { name:'Mailchimp',      tools:['Get campaign performance','Update budget','Pause campaign','Get keyword report','List ad groups'] },
  { name:'Datadog',        tools:['Get traffic report','List top pages','Get conversion rate','Compare date ranges','Export dashboard'] },
  { name:'AWS',            tools:['Trigger workflow','Get run history','Pause workflow','Get run status','Create webhook'] },
  { name:'LinkedIn',       tools:['Post update','Get mentions','Schedule post','Get follower count','Delete post'] },
  { name:'Meta',           tools:['Get campaign performance','Update budget','Pause campaign','Get keyword report','List ad groups'] },
  { name:'Webflow',        tools:['Export frame','Get comments','List projects','Duplicate file','Get component specs'] },
  { name:'Typeform',       tools:['Get responses','Create survey','Get completion rate','Export results','Add question'] },
  { name:'Salesforce',     tools:['Create contact','Update deal stage','Get pipeline report','Log activity','Find contact'] },
  { name:'Slack',          tools:['Send message','Create channel','Get channel history','Send direct message','Add reaction'] },
  { name:'Gmail',          tools:['Send email','Get inbox messages','Create draft','Search emails','Add label'] },
  { name:'GitHub',         tools:['Create issue','List pull requests','Get commit history','Merge branch','Add comment'] },
  { name:'Jira',           tools:['Create ticket','Update ticket status','Get ticket details','Assign agent','Add internal note'] },
  { name:'Google Sheets',  tools:['Read range','Update cell','Append row','Get sheet list','Create sheet'] },
  { name:'Airtable',       tools:['Run query','Get table schema','Insert row','Update record','Get row count'] },
  { name:'Notion',         tools:['Create document','Update content','Get document text','Share document','List recent docs'] }
];

const UnifiedSolutionTemplate = ({ config }) => {
  const [activeTab, setActiveTab] = useState(0);

  // New states for the interactive connector section
  const [selectedAppIdx, setSelectedAppIdx] = useState(0);
  const [orbitSlots, setOrbitSlots] = useState(() => {
    return [0, 1, 2, 3, 4, 5, 6].map(i => ({ appIdx: i, animKey: 0 }));
  });
  const [orbitPtr, setOrbitPtr] = useState(7);

  const handleAppClick = (appIdx) => {
    setSelectedAppIdx(appIdx);
    const slotIndex = orbitPtr % 7;
    setOrbitSlots(prev => {
      const next = [...prev];
      next[slotIndex] = { appIdx, animKey: next[slotIndex].animKey + 1 };
      return next;
    });
    setOrbitPtr(prev => prev + 1);
  };

  // Add error handling for missing config
  if (!config) {
    return <div>Loading...</div>;
  }

  // Add safety checks for nested objects
  const safeConfig = {
    ...config,
    customers: config.customers || [],
    personas: config.personas || { title: '', tabs: [] },
    demoApps: config.demoApps || [],
    skills: config.skills || { description: '', items: [] },
    chat: config.chat || { channel: '', description: '', messages: [] },
    background: config.background || { description: '', tasks: [] },
    multiAgent: config.multiAgent || { description: '', nodes: [], team: [] }
  };

  return (
    <div className="unified-solution">
      {/* SECTION 1 — Hero */}
      <section className="solution-hero">
        <div className="container">
          <div className="hero-badge">{config.badge}</div>
          <h1 className="hero-headline">{config.headline}</h1>
          <p className="hero-subheadline">{config.subheadline}</p>
          <div className="hero-ctas">
            <button className="btn-primary">{config.primaryCTA || 'Get Started'}</button>
            <button className="btn-secondary">{config.secondaryCTA || 'Talk to Sales'}</button>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Works With */}
      <section className="works-with-section">
        <div className="container">
          <p className="section-label">Works with</p>
          <div className="integration-icons">
            <div className="integration-icon">
              <SiHubspot size={22} color="#FF7A59" />
            </div>
            <div className="integration-icon">
              <SiMailchimp size={22} color="#FFE01B" />
            </div>
            <div className="integration-icon">
              <SiGoogle size={22} color="#4285F4" />
            </div>
            <div className="integration-icon">
              <SiMeta size={22} color="#0668E1" />
            </div>
            <div className="integration-icon">
              <FaLinkedin size={22} color="#0A66C2" />
            </div>
            <div className="integration-icon">
              <SiAirtable size={22} color="#18BFFF" />
            </div>
            <div className="integration-icon">
              <FaSlack size={22} color="#4A154B" />
            </div>
            <div className="integration-icon">
              <SiNotion size={22} color="#000000" />
            </div>
            <div className="integration-icon">
              <SiWebflow size={22} color="#4353FF" />
            </div>
            <div className="integration-icon">
              <SiTypeform size={22} color="#262627" />
            </div>
          </div>
          <p className="integration-footer">And +100 others…</p>

        </div>
      </section>

      {/* SECTION 3 — Persona + Interactive Demo */}
      <section className="persona-demo-section">
        <div className="container">
          <h2 className="section-heading">Built for {safeConfig.personas.title}</h2>
          
          <div className="persona-tabs">
            {safeConfig.personas.tabs.map((tab, idx) => (
              <button
                key={idx}
                className={`persona-tab ${activeTab === idx ? 'active' : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="demo-split demo-split-gradient">
            <div className="demo-left">
              <div className="demo-card-real">
                <h3>1. Give your agent superpowers by connecting apps</h3>
                <div className="search-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
                  Search connectors
                </div>
                <div className="icon-grid-real">
                  {apps.map((app, idx) => {
                    return (
                      <button 
                        key={idx}
                        className={`app-icon-real ${selectedAppIdx === idx ? 'selected' : ''}`}
                        title={app.name}
                        aria-label={app.name}
                        onClick={() => handleAppClick(idx)}
                      >
                        {getAppIcon(app.name)}
                        {selectedAppIdx === idx && (
                          <div className="badge check-purple">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="demo-right">
              <div className="connector-visual">
                <div className="hub">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
                    <path d="M50 5 C 65 5, 75 15, 85 25 C 95 35, 95 45, 95 50 C 95 65, 85 75, 75 85 C 65 95, 45 95, 35 95 C 20 95, 10 85, 5 75 C 5 60, 5 45, 5 35 C 5 20, 15 10, 25 5 C 35 5, 45 5, 50 5 Z" fill="#14121a" />
                  </svg>
                  <span></span><span></span>
                </div>

                {orbitSlots.map((slot, idx) => {
                  const appIdx = slot.appIdx;
                  const angle = (idx * (Math.PI * 2)) / 7 - Math.PI / 2;
                  const radius = 32;
                  const top = `${50 + radius * Math.sin(angle)}%`;
                  const left = `${50 + radius * Math.cos(angle)}%`;
                  
                  return (
                    <div 
                      key={`${idx}-${slot.animKey}`} 
                      className="orbit-icon-real pop" 
                      style={{ top, left }}
                    >
                      {getAppIcon(apps[appIdx].name)}
                    </div>
                  );
                })}
              </div>

              <div className="tool-card-container">
                <div className="tool-card-bg-2"></div>
                <div className="tool-card-bg-1"></div>
                <div className="tool-card-real" aria-live="polite">
                  {(() => {
                    const app = apps[selectedAppIdx];
                    return (
                      <>
                        <div className="tool-card-header">
                          <div className="tool-logo-real">
                            {getAppIcon(app.name)}
                          </div>
                          <div>
                            <div className="name">{app.name}</div>
                            <div className="sub">{app.tools.length} Tools</div>
                          </div>
                        </div>
                        <ul className="tool-list-real">
                          {app.tools.map((t, i) => (
                            <li key={i}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>

          <div className="hero-model-selection">
            <div className="icon-stack">
              <div className="icon-circle c1"><Meta.Color size={24} /></div>
              <div className="icon-circle c2"><Anthropic size={28} /></div>
              <div className="icon-circle c3"><SiHuggingface size={32} color="#FFD21E" /></div>
              <div className="icon-circle c4"><OpenAI size={42} /></div>
              <div className="icon-circle c5"><Google.Color size={32} /></div>
              <div className="icon-circle c6"><DeepSeek.Color size={26} /></div>
              <div className="icon-circle c7"><SiNotion size={24} color="#000000" /></div>
            </div>

            <div className="text-content">
              <h2>Choose your AI model</h2>
              <p>Pick the latest models from OpenAI, Anthropic, Google, and more to fit any task — switch any time. All built into FlowMitra, no API keys required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Add Custom Skills */}
      <section className="custom-skills-section">
        <div className="wrap">
          <div className="content">
            <div className="copy">
              <h2>Add custom skills</h2>
              <p>{safeConfig.skills.description}</p>
            </div>
            
            <div className="cards-region">
              <div className="cursor max">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 11L21 3L13 21L11 13L3 11Z" fill="currentColor"/></svg>
                <span className="cursor-label">Max</span>
              </div>
              
              <div className="cursor kat">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 11L21 3L13 21L11 13L3 11Z" fill="currentColor"/></svg>
                <span className="cursor-label">Kat</span>
              </div>

              <div className="cards-col">
                {safeConfig.skills.items.map((skill, idx) => {
                  const icons = [
                    <svg className="card-icon" viewBox="0 0 24 24" fill="none">
                      <path d="M4 20L4.6 16.9C4.7 16.4 4.95 15.95 5.3 15.6L15.4 5.5C16.2 4.7 17.5 4.7 18.3 5.5L18.5 5.7C19.3 6.5 19.3 7.8 18.5 8.6L8.4 18.7C8.05 19.05 7.6 19.3 7.1 19.4L4 20Z" fill="var(--icon-pink)"/>
                      <path d="M13.5 7.4L16.6 10.5" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>,
                    <svg className="card-icon" viewBox="0 0 24 24" fill="none">
                      <rect x="4" y="13" width="4" height="7" rx="1" fill="var(--icon-purple)"/>
                      <rect x="10" y="8" width="4" height="12" rx="1" fill="var(--icon-purple)"/>
                      <rect x="16" y="4" width="4" height="16" rx="1" fill="var(--icon-purple)"/>
                    </svg>,
                    <svg className="card-icon" viewBox="0 0 24 24" fill="none">
                      <path d="M6 3.5C6 2.67 6.67 2 7.5 2H14L18 6V20.5C18 21.33 17.33 22 16.5 22H7.5C6.67 22 6 21.33 6 20.5V3.5Z" fill="var(--icon-green)"/>
                      <path d="M14 2V6H18" fill="#ffffff" opacity="0.35"/>
                    </svg>
                  ];
                  
                  return (
                    <div key={idx} className="card">
                      <div className="card-head">
                        {icons[idx % 3]}
                        <span className="card-title">{skill.title}</span>
                      </div>
                      <p>{skill.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Interact With Agents Like Colleagues */}
      <section className="chat-hero-section">
        <div className="container">
          <div className="chat-mockup">
            <div className="integration-tabs">
              <div className="tab active">
                <FaSlack className="tab-icon" color="#E01E5A" size={16} />
                Slack
              </div>
              <div className="tab">
                <FaMicrosoft className="tab-icon" color="#5059C9" size={16} />
                Microsoft Teams
              </div>
              <div className="tab">
                <SiGmail className="tab-icon" color="#EA4335" size={16} />
                Gmail
              </div>
              <div className="tab">
                <SiWhatsapp className="tab-icon" color="#25D366" size={16} />
                WhatsApp
              </div>
            </div>

            <div className="chat-card">
              <div className="chat-header">#{safeConfig.chat.channel}</div>
              <div className="chat-subtabs">
                <span className="active">Messages</span>
                <span>Add canvas</span>
                <span>Files</span>
              </div>
              <hr className="chat-divider" />

              <div className="messages">
                {safeConfig.chat.messages.map((msg, idx) => {
                  const colors = ['#F59E0B', '#EC4899', '#14B8A6'];
                  const bgColor = colors[idx % colors.length];
                  const initials = msg.user.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
                  
                  // Extract @mention
                  const textParts = msg.text.split(' ');
                  const mention = textParts[0];
                  const restOfText = textParts.slice(1).join(' ');

                  return (
                    <div className="message" key={idx}>
                      <div className="avatar" style={{ background: bgColor }}>{initials}</div>
                      <div className="msg-body">
                        <div className="msg-meta">
                          <span className="name">{msg.user}</span>
                          <span className="time">{msg.time}</span>
                        </div>
                        <div className="msg-text">
                          {mention.startsWith('@') ? (
                            <><span className="mention">{mention}</span> {restOfText}</>
                          ) : (
                            msg.text
                          )}
                        </div>
                        <div className="msg-reactions">
                          <span className="pill">💬 {msg.replies > 0 ? msg.replies : 1}</span>
                          <span className="pill">{idx === 0 ? '🔥 1' : idx === 1 ? '👍 1' : '🎯 1'}</span>
                        </div>
                        <div className="msg-replies">
                          <svg viewBox="0 0 12 12" fill="none"><path d="M2 2h8v6H5l-3 3V2z" fill="#2563eb"/></svg>
                          {msg.replies} Replies <span className="time">{idx === 0 ? '4 minutes ago' : idx === 1 ? '2 minutes ago' : 'just now'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="hero-text">
            <h2>Interact with agents like co-workers</h2>
            <p>Tag <span className="mention">@FlowMitra</span> in Slack, Teams, or email and your agent responds like another teammate — right where conversations already happen.</p>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Keep Them Running in the Background */}
      <section className="bg-timeline-section">
        <div className="bg-timeline-wrap">
          <div className="bg-timeline-left">
            <h2>Keep them running in the background</h2>
            <p>Schedule weekly rank reports, daily competitor scans, hourly inbox triage — your agents work in the cloud.</p>
          </div>

          <div className="bg-timeline-right">
            {/* Social Presence */}
            <div className="bg-timeline-row">
              <div className="bg-timeline-row-head">
                <div className="bg-timeline-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-4.7 7.6 8.38 8.38 0 0 1-3.8.9 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                </div>
                <div>
                  <div className="bg-timeline-row-title">Social Presence</div>
                  <div className="bg-timeline-row-sub">Mondays at 8 AM PST</div>
                </div>
              </div>
              <div className="bg-timeline-col">
                <div className="bg-timeline-track">
                  <div className="bg-timeline-line"></div>
                  <div className="bg-timeline-dots">
                    <div className="bg-timeline-dot"></div>
                    <div className="bg-timeline-dot"></div>
                    <div className="bg-timeline-dot"></div>
                    <div className="bg-timeline-dot"></div>
                    <div className="bg-timeline-dot"></div>
                    <div className="bg-timeline-dot filled-dark"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lead Qualifier */}
            <div className="bg-timeline-row">
              <div className="bg-timeline-row-head">
                <div className="bg-timeline-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4.2 3.6-7 8-7s8 2.8 8 7"/>
                  </svg>
                </div>
                <div>
                  <div className="bg-timeline-row-title">Lead Qualifier</div>
                  <div className="bg-timeline-row-sub">Every form submission</div>
                </div>
              </div>
              <div className="bg-timeline-col">
                <div className="bg-timeline-track">
                  <div className="bg-timeline-badge purple" style={{ left: '60%', transform: 'translateX(-50%)' }}>New Opportunity</div>
                  <div className="bg-timeline-line"></div>
                  <div className="bg-timeline-dots">
                    <div className="bg-timeline-dot"></div>
                    <div className="bg-timeline-dot"></div>
                    <div className="bg-timeline-dot filled-purple"></div>
                    <div className="bg-timeline-dot"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Audit */}
            <div className="bg-timeline-row">
              <div className="bg-timeline-row-head">
                <div className="bg-timeline-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.5l7.5 3.2v5.4c0 5-3.2 8.9-7.5 10.4-4.3-1.5-7.5-5.4-7.5-10.4V5.7L12 2.5z"/>
                  </svg>
                </div>
                <div>
                  <div className="bg-timeline-row-title">Security Audit</div>
                  <div className="bg-timeline-row-sub">Every 8 hours</div>
                </div>
              </div>
              <div className="bg-timeline-col">
                <div className="bg-timeline-track">
                  <div className="bg-timeline-badge red" style={{ left: '0%' }}>New Risk Identified</div>
                  <div className="bg-timeline-line"></div>
                  <div className="bg-timeline-dots">
                    <div className="bg-timeline-dot filled-red"></div>
                    <div className="bg-timeline-dot"></div>
                  </div>
                </div>
                <div className="bg-timeline-axis">
                  <span>0H</span><span>2H</span><span>4H</span><span>6H</span><span>8H</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — How it works */}
      <section className="hiw-section">
        <div className="hiw-container">
          <div className="hiw-header">
            <span className="hiw-eyebrow">How it works</span>
            <h2>Connect. Customize. Conquer.</h2>
            <p className="hiw-subhead">
              You can choose how to use <span className="brand">FlowMitra</span>. Either sign up for the hosted FlowMitra Cloud or self-host via Docker.
            </p>
          </div>

          <div className="hiw-cards">
            {/* Card 1: Pull in data */}
            <div className="hiw-card">
              <div className="hiw-icon-panel">
                <span className="hiw-dot" style={{ width: 6, height: 6, top: 22, left: 28 }}></span>
                <span className="hiw-dot" style={{ width: 4, height: 4, top: 40, right: 34, background: 'var(--accent-orange-soft)' }}></span>
                <span className="hiw-dot" style={{ width: 5, height: 5, bottom: 26, left: 40 }}></span>
                <span className="hiw-dot" style={{ width: 3, height: 3, bottom: 44, right: 26 }}></span>
                <svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="21" y="46" width="50" height="14" rx="4" fill="#ffffff" stroke="#6c5ce7" strokeWidth="2"/>
                  <rect x="21" y="64" width="50" height="14" rx="4" fill="#ffffff" stroke="#6c5ce7" strokeWidth="2"/>
                  <circle cx="29" cy="53" r="1.6" fill="#e8622c"/>
                  <circle cx="29" cy="71" r="1.6" fill="#e8622c"/>
                  <path d="M46 14V42" stroke="#6c5ce7" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M34 30L46 42L58 30" stroke="#e8622c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Pull in data</h3>
              <p>Set up triggers for app events or specific times to fetch data across your app stack</p>
            </div>

            {/* Card 2: Set up steps */}
            <div className="hiw-card">
              <div className="hiw-icon-panel">
                <span className="hiw-dot" style={{ width: 5, height: 5, top: 24, right: 30 }}></span>
                <span className="hiw-dot" style={{ width: 4, height: 4, bottom: 22, left: 30, background: 'var(--accent-orange-soft)' }}></span>
                <span className="hiw-dot" style={{ width: 3, height: 3, top: 36, left: 24 }}></span>
                <svg width="100" height="92" viewBox="0 0 100 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 26L27 46" stroke="#c9bdf4" strokeWidth="2"/>
                  <path d="M50 26L73 46" stroke="#c9bdf4" strokeWidth="2"/>
                  <path d="M27 46L50 66" stroke="#c9bdf4" strokeWidth="2"/>
                  <path d="M73 46L50 66" stroke="#c9bdf4" strokeWidth="2"/>
                  <path d="M27 46H73" stroke="#c9bdf4" strokeWidth="2"/>
                  <circle cx="50" cy="26" r="8" fill="#6c5ce7"/>
                  <rect x="19" y="38" width="16" height="16" rx="4" fill="#ffffff" stroke="#e8622c" strokeWidth="2"/>
                  <rect x="65" y="38" width="16" height="16" rx="4" fill="#ffffff" stroke="#e8622c" strokeWidth="2"/>
                  <circle cx="50" cy="66" r="8" fill="#ffffff" stroke="#6c5ce7" strokeWidth="2.5"/>
                </svg>
              </div>
              <h3>Set up steps</h3>
              <p>Use 220+ app nodes to create, read, and update the valuable data across your apps</p>
            </div>

            {/* Card 3: Save time - every day */}
            <div className="hiw-card">
              <div className="hiw-icon-panel">
                <span className="hiw-dot" style={{ width: 5, height: 5, top: 28, left: 26 }}></span>
                <span className="hiw-dot" style={{ width: 4, height: 4, bottom: 30, right: 28, background: 'var(--accent-orange-soft)' }}></span>
                <span className="hiw-dot" style={{ width: 3, height: 3, top: 30, right: 34 }}></span>
                <svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="46" cy="46" r="30" fill="#ffffff" stroke="#6c5ce7" strokeWidth="2.5"/>
                  <circle cx="46" cy="46" r="2.4" fill="#e8622c"/>
                  <path d="M46 46L46 27" stroke="#6c5ce7" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M46 46L59 53" stroke="#e8622c" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M46 18V22" stroke="#c9bdf4" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M46 70V74" stroke="#c9bdf4" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M74 46H70" stroke="#c9bdf4" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M22 46H18" stroke="#c9bdf4" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Save time - every day</h3>
              <p>From monthly syncs to millions of executions, sit back as your workflow does the heavy lifting</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UnifiedSolutionTemplate;
