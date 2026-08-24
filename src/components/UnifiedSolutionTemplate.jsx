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
import { Zap, Cpu, Sparkles } from 'lucide-react';
import './UnifiedSolutionTemplate.css';
import { getBrandIcon } from '../utils/brandIcons';
import PageSeo from './PageSeo';
import RollButton from './RollButton';

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
      <PageSeo
        title={`${config.badge || 'Solutions'} | WorkflowMitra`}
        description={config.subheadline || `Automate ${config.department} workflows with WorkflowMitra. No coding required.`}
        path={`/solutions/${config.department}`}
      />

      {/* SECTION 1 — Hero (Matched BG Color Theme with Home Hero) */}
      <section className="solution-hero">
        <div className="container solution-hero-container">
          {/* Main Headline */}
          <h1 className="solution-hero-headline">{config.headline}</h1>

          {/* Subheadline */}
          <p className="solution-hero-subheadline">{config.subheadline}</p>

          {/* Action Button Group */}
          <div className="solution-hero-ctas">
            <RollButton
              href="https://app.workflowmitra.com/signup"
              variant="dark"
              size="lg"
              showArrow={true}
              id="solution-hero-start-btn"
            >
              Start Building
            </RollButton>
            <RollButton
              to="/templates"
              variant="secondary"
              size="lg"
              id="solution-hero-templates-btn"
            >
              View Templates
            </RollButton>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Works With */}
      <section className="works-with-section">
        <div className="container">
          <p className="section-label">Works with your entire marketing stack</p>
          <div className="integration-icons">
            <div className="integration-icon" title="HubSpot">
              <img src="/svg/hubspot-icon.svg" width="20" height="20" alt="HubSpot" />
              <span>HubSpot</span>
            </div>
            <div className="integration-icon" title="Google Sheets">
              <img src="/svg/icons8-google-sheets.svg" width="20" height="20" alt="Google Sheets" />
              <span>Google Sheets</span>
            </div>
            <div className="integration-icon" title="Google Workspace">
              <img src="/svg/gmail.svg" width="20" height="20" alt="Google" />
              <span>Google</span>
            </div>
            <div className="integration-icon" title="Microsoft Teams">
              <img src="/svg/microsoft-teams-icon.svg" width="20" height="20" alt="Microsoft Teams" />
              <span>Microsoft</span>
            </div>
            <div className="integration-icon" title="Claude AI">
              <img src="/svg/claude-ai-icon.svg" width="20" height="20" alt="Claude AI" />
              <span>Claude AI</span>
            </div>
            <div className="integration-icon" title="Intercom">
              <img src="/svg/intercom-icon-svgrepo-com.svg" width="20" height="20" alt="Intercom" />
              <span>Intercom</span>
            </div>
            <div className="integration-icon" title="Shopify">
              <img src="/svg/shopify.svg" width="20" height="20" alt="Shopify" />
              <span>Shopify</span>
            </div>
            <div className="integration-icon" title="Zoho">
              <img src="/svg/zoho.svg" width="20" height="20" alt="Zoho" />
              <span>Zoho</span>
            </div>
            <div className="integration-icon" title="Calendly">
              <img src="/svg/calendly-icon.svg" width="20" height="20" alt="Calendly" />
              <span>Calendly</span>
            </div>
            <div className="integration-icon" title="Slack">
              <FaSlack size={20} color="#4A154B" />
              <span>Slack</span>
            </div>
            <div className="integration-icon" title="Notion">
              <SiNotion size={20} color="#000000" />
              <span>Notion</span>
            </div>
            <div className="integration-icon" title="Airtable">
              <SiAirtable size={20} color="#18BFFF" />
              <span>Airtable</span>
            </div>
          </div>
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
              <p>Pick the latest models from OpenAI, Anthropic, Google, and more to fit any task — switch any time. All built into WorkflowMitra, no API keys required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Everything you need to launch an AI product (100% Exact Match Axvio Bento Grid) */}
      <section className="wm-launch-bento-section">
        <div className="container">
          <div className="wm-launch-header">
            <div className="wm-launch-eyebrow">
              <span className="wm-launch-eyebrow-dot" />
              <span>Features</span>
            </div>
            <h2 className="wm-launch-title">
              Everything you need to launch an AI product.
            </h2>
            <p className="wm-launch-desc">
              Designed for fast teams shipping real products, not marketing fluff.
            </p>
          </div>

          {/* Asymmetrical 2-Row Bento Grid (1fr+1.6fr / 1.6fr+1fr) */}
          <div className="wm-launch-bento-grid">
            
            {/* Row 1 — Left: Automate With Precision (Compact) */}
            <div className="wm-bento-card wm-bento-card-compact">
              <div className="wm-bento-visual wm-visual-pills">
                <div className="wm-axvio-pills-col">
                  <div className="wm-axvio-pill trigger">Trigger</div>
                  <div className="wm-axvio-line" />
                  <div className="wm-axvio-pill logic">Logic</div>
                  <div className="wm-axvio-line" />
                  <div className="wm-axvio-pill action">Action</div>
                </div>
              </div>

              <div className="wm-bento-content">
                <h3 className="wm-bento-title">Automate With Precision</h3>
                <p className="wm-bento-text">
                  Processes every action in real-time across your connected systems. No delays, no manual steps.
                </p>
              </div>
            </div>

            {/* Row 1 — Right: Decisions Made Smarter (Wide) */}
            <div className="wm-bento-card wm-bento-card-wide">
              <div className="wm-bento-visual wm-visual-scanner">
                <div className="wm-axvio-skel-container">
                  <div className="wm-axvio-skel-bar" />
                  <div className="wm-axvio-skel-bar" />
                  <div className="wm-axvio-skel-bar" />
                  <div className="wm-axvio-skel-bar" />
                  
                  {/* Glowing Laser Scanner Beam */}
                  <div className="wm-axvio-laser-beam">
                    <div className="wm-axvio-laser-glow" />
                    <div className="wm-axvio-laser-core" />
                  </div>
                </div>
              </div>

              <div className="wm-bento-content">
                <h3 className="wm-bento-title">Decisions Made Smarter</h3>
                <p className="wm-bento-text">
                  Analyzes patterns and refines decisions automatically. Your AI gets sharper with every workflow.
                </p>
              </div>
            </div>

            {/* Row 2 — Left: Connect Everything Instantly (Seamless Marquee + Centered 3-Layer Gradient Hero) */}
            <div className="wm-bento-card wm-bento-card-wide">
              <div className="wm-bento-visual wm-visual-strip">
                {/* Seamless Endless Marquee Track (z-index 1) */}
                <div className="wm-axvio-marquee-viewport">
                  <div className="wm-axvio-marquee-track">
                    {[0, 1].map((setIdx) => (
                      <div key={setIdx} className="wm-marquee-group" aria-hidden={setIdx === 1}>
                        {/* 1. HubSpot */}
                        <div className="wm-app-icon-circle" title="HubSpot">
                          <img src="/svg/hubspot-icon.svg" width="24" height="24" alt="HubSpot" />
                        </div>

                        {/* 2. Google Workspace */}
                        <div className="wm-app-icon-circle" title="Google Workspace">
                          <img src="/svg/gmail.svg" width="24" height="24" alt="Google Workspace" />
                        </div>

                        {/* 3. Microsoft Teams */}
                        <div className="wm-app-icon-circle" title="Microsoft Teams">
                          <img src="/svg/microsoft-teams-icon.svg" width="24" height="24" alt="Microsoft Teams" />
                        </div>

                        {/* 4. Claude AI */}
                        <div className="wm-app-icon-circle" title="Claude AI">
                          <img src="/svg/claude-ai-icon.svg" width="24" height="24" alt="Claude AI" />
                        </div>

                        {/* 5. Intercom */}
                        <div className="wm-app-icon-circle" title="Intercom">
                          <img src="/svg/intercom-icon-svgrepo-com.svg" width="24" height="24" alt="Intercom" />
                        </div>

                        {/* 6. Shopify */}
                        <div className="wm-app-icon-circle" title="Shopify">
                          <img src="/svg/shopify.svg" width="24" height="24" alt="Shopify" />
                        </div>

                        {/* 7. Zoho */}
                        <div className="wm-app-icon-circle" title="Zoho">
                          <img src="/svg/zoho.svg" width="24" height="24" alt="Zoho" />
                        </div>

                        {/* 8. Calendly */}
                        <div className="wm-app-icon-circle" title="Calendly">
                          <img src="/svg/calendly-icon.svg" width="24" height="24" alt="Calendly" />
                        </div>

                        {/* 9. Google Sheets */}
                        <div className="wm-app-icon-circle" title="Google Sheets">
                          <img src="/svg/icons8-google-sheets.svg" width="24" height="24" alt="Google Sheets" />
                        </div>

                        {/* 10. Slack */}
                        <div className="wm-app-icon-circle" title="Slack">
                          <FaSlack size={24} color="#4A154B" />
                        </div>

                        {/* 11. Notion */}
                        <div className="wm-app-icon-circle" title="Notion">
                          <SiNotion size={24} color="#000000" />
                        </div>

                        {/* 12. GitHub */}
                        <div className="wm-app-icon-circle" title="GitHub">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="#181717"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fixed Center Hero Badge with 3-Layer Gradient Diamond Icon & Radiant Aura */}
                <div className="wm-fixed-center-hero" title="WorkflowMitra AI Engine">
                  <div className="wm-fixed-hero-aura" />
                  <div className="wm-fixed-hero-box">
                    <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                      <defs>
                        <linearGradient id="heroLayerGrad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#f7c38a" />
                          <stop offset="0.5" stopColor="#a686f1" />
                          <stop offset="1" stopColor="#38bdf8" />
                        </linearGradient>
                      </defs>
                      {/* Top Isometric Diamond Layer */}
                      <path d="M16 5L27 10.5L16 16L5 10.5L16 5Z" stroke="url(#heroLayerGrad)" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Middle Isometric Layer */}
                      <path d="M7 15L16 19.5L25 15" stroke="url(#heroLayerGrad)" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Bottom Isometric Layer */}
                      <path d="M7 20.5L16 25L25 20.5" stroke="url(#heroLayerGrad)" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="wm-bento-content">
                <h3 className="wm-bento-title">Connect Everything Instantly</h3>
                <p className="wm-bento-text">
                  Links your tools, APIs, and data in one place. Zero complexity, maximum compatibility.
                </p>
              </div>
            </div>

            {/* Row 2 — Right: Scale Without Limits (Compact with Smooth Animated Needle) */}
            <div className="wm-bento-card wm-bento-card-compact">
              <div className="wm-bento-visual wm-visual-speedometer">
                {/* Speedometer Gauge Dial with gradient ring and tick marks */}
                <div className="wm-speedo-dial-box">
                  <svg width="126" height="126" viewBox="0 0 126 126" className="wm-speedo-svg">
                    <defs>
                      <linearGradient id="speedoGradRing" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#a686f1" />
                        <stop offset="50%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#f7c38a" />
                      </linearGradient>
                    </defs>

                    {/* Outer Gradient Ring Circle */}
                    <circle cx="63" cy="63" r="54" fill="none" stroke="url(#speedoGradRing)" strokeWidth="6" opacity="0.9" />
                    
                    {/* Inner White Plate */}
                    <circle cx="63" cy="63" r="47" fill="#ffffff" />

                    {/* 60 Precision Radial Tick Marks */}
                    {Array.from({ length: 60 }).map((_, i) => {
                      const angle = i * 6;
                      const isLong = i % 5 === 0;
                      return (
                        <line
                          key={i}
                          x1="63"
                          y1={isLong ? "13" : "15"}
                          x2="63"
                          y2="21"
                          stroke={isLong ? "#475569" : "#94a3b8"}
                          strokeWidth={isLong ? "1.5" : "0.85"}
                          strokeLinecap="round"
                          transform={`rotate(${angle} 63 63)`}
                        />
                      );
                    })}

                    {/* Center Needle & Pivot Ring with Continuous Live Sweep Animation */}
                    <g className="wm-speedo-needle-sweep">
                      <line x1="63" y1="63" x2="63" y2="24" stroke="#181818" strokeWidth="1.9" strokeLinecap="round" />
                      <circle cx="63" cy="63" r="5" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
                      <circle cx="63" cy="63" r="2" fill="#181818" />
                    </g>
                  </svg>
                </div>

                {/* 4 Stats in a compact horizontal row */}
                <div className="wm-speedo-stats-row">
                  <div className="wm-speedo-stat">
                    <span className="val">11 ms</span>
                    <span className="lbl">Latency</span>
                  </div>
                  <div className="wm-speedo-stat">
                    <span className="val">99.99%</span>
                    <span className="lbl">Uptime</span>
                  </div>
                  <div className="wm-speedo-stat">
                    <span className="val">3×</span>
                    <span className="lbl">Replicas</span>
                  </div>
                  <div className="wm-speedo-stat">
                    <span className="val">SOC 2</span>
                    <span className="lbl">Certified</span>
                  </div>
                </div>
              </div>

              <div className="wm-bento-content">
                <h3 className="wm-bento-title">Scale Without Limits</h3>
                <p className="wm-bento-text">
                  SOC 2 certified and 99.9% uptime guaranteed. Ready for high-volume operations from day one.
                </p>
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
                  const colors = ['#b45309', '#be185d', '#0f766e'];
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
            <p>Tag <span className="mention">@WorkflowMitra</span> in Slack, Teams, or email and your agent responds like another teammate — right where conversations already happen.</p>
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

      {/* SECTION 7 — How it works (Connect. Customize. Conquer.) */}
      <section className="hiw-section">
        <div className="hiw-container">
          <div className="hiw-header">
            <div className="hiw-eyebrow">
              <span className="hiw-eyebrow-dot" />
              <span>How It Works</span>
            </div>
            <h2>Connect. Customize. Conquer.</h2>
            <p className="hiw-subhead">
              From lead capture to multichannel orchestration—launch automated AI workflows in minutes without writing code.
            </p>
          </div>

          <div className="hiw-cards">
            {/* Card 1: Ingest & Trigger */}
            <div className="hiw-card">
              <div className="hiw-icon-panel">
                <div className="hiw-visual-node-box">
                  <div className="hiw-node-header">
                    <span className="hiw-node-badge trigger">Trigger</span>
                    <span className="hiw-node-status">Live Stream</span>
                  </div>
                  <div className="hiw-node-body">
                    <div className="hiw-node-app">
                      <img src="/svg/gmail.svg" width="16" height="16" alt="Gmail" />
                      <span>Form Ingest</span>
                    </div>
                    <span className="hiw-node-arrow">→</span>
                    <div className="hiw-node-app">
                      <img src="/svg/hubspot-icon.svg" width="16" height="16" alt="HubSpot" />
                      <span>Webhook</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hiw-card-content">
                <span className="hiw-step-num">Step 01</span>
                <h3>Ingest & Trigger</h3>
                <p>Connect all your incoming lead channels—webhooks, CRM forms, ads, and spreadsheets—with instant real-time event triggers.</p>
              </div>
            </div>

            {/* Card 2: AI Logic & Enrichment */}
            <div className="hiw-card">
              <div className="hiw-icon-panel">
                <div className="hiw-visual-node-box">
                  <div className="hiw-node-header">
                    <span className="hiw-node-badge logic">AI Agent</span>
                    <span className="hiw-node-status">ICP Scored 98%</span>
                  </div>
                  <div className="hiw-node-body">
                    <div className="hiw-node-app">
                      <img src="/svg/claude-ai-icon.svg" width="16" height="16" alt="Claude" />
                      <span>Enrich Data</span>
                    </div>
                    <span className="hiw-node-arrow">→</span>
                    <div className="hiw-node-app highlight">
                      <span>GPT-4o Draft</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hiw-card-content">
                <span className="hiw-step-num">Step 02</span>
                <h3>AI Logic & Enrichment</h3>
                <p>Score leads against custom ICP criteria, enrich company profiles with AI agents, and draft personalized multi-step sequences.</p>
              </div>
            </div>

            {/* Card 3: Multi-Stack Sync & Scale */}
            <div className="hiw-card">
              <div className="hiw-icon-panel">
                <div className="hiw-visual-node-box">
                  <div className="hiw-node-header">
                    <span className="hiw-node-badge action">Sync & Scale</span>
                    <span className="hiw-node-status">100% Automated</span>
                  </div>
                  <div className="hiw-node-body">
                    <div className="hiw-node-app">
                      <FaSlack size={15} color="#4A154B" />
                      <span>Slack Alert</span>
                    </div>
                    <span className="hiw-node-arrow">→</span>
                    <div className="hiw-node-app">
                      <img src="/svg/icons8-google-sheets.svg" width="16" height="16" alt="Sheets" />
                      <span>Sync Stack</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hiw-card-content">
                <span className="hiw-step-num">Step 03</span>
                <h3>Multi-Stack Sync & Scale</h3>
                <p>Route qualified prospects to sales in real-time, notify your team across Slack, and sync updated analytics across your entire stack.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UnifiedSolutionTemplate;
