import React from 'react';
import { 
  SiAirtable, 
  SiNotion,
  SiGmail,
  SiJira,
  SiHuggingface,
  SiMeta,
  SiHubspot,
  SiTypeform,
  SiDatadog
} from 'react-icons/si';
import { FaSlack, FaGithub, FaSalesforce, FaLinkedin } from 'react-icons/fa';
import { OpenAI, Anthropic, Google, Meta, DeepSeek } from '@lobehub/icons';
import './AIAgentsFeatureSection.css';
import { useState, useEffect } from 'react';

const TimelineRow = ({ name, schedule, icon, iconBg, activeColor, activeText, intervalMs, delayMs }) => {
  const [position, setPosition] = useState(0);
  const [status, setStatus] = useState('hidden'); // 'event', 'monitoring', 'hidden'
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setStatus('monitoring');
    }
    
    const listener = (e) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setStatus('monitoring');
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let interval;
    let eventTimeout;
    let monitoringTimeout;

    const tick = () => {
      setStatus('event');
      setPosition(p => (p + 1) % 5);
      
      eventTimeout = setTimeout(() => {
        setStatus('monitoring');
        
        monitoringTimeout = setTimeout(() => {
          setStatus('hidden');
        }, 2000);
      }, 3000);
    };

    const startSequence = () => {
      tick();
      interval = setInterval(tick, intervalMs);
    };

    const initialDelay = setTimeout(startSequence, delayMs);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
      clearTimeout(eventTimeout);
      clearTimeout(monitoringTimeout);
    };
  }, [intervalMs, delayMs, prefersReducedMotion]);

  const leftPercents = [2, 26, 50, 74, 98];
  const currentLeft = leftPercents[position];

  return (
    <div className="task-row">
      <div className="task-id">
        <div className="task-icon" style={{ background: iconBg }}>
          {icon}
        </div>
        <div className="task-text">
          <div className="name">{name}</div>
          <div className="schedule">{schedule}</div>
        </div>
      </div>
      <div className="timeline">
        <div className="track"></div>
        {[0, 1, 2, 3, 4].map((i) => {
          const isEventActive = i === position && status === 'event';
          return (
            <div 
              key={i} 
              className={`dot ${i <= position ? 'on' : ''}`} 
              style={{
                left: `${leftPercents[i]}%`,
                transition: 'all 0.3s ease',
                ...(isEventActive ? {
                  background: activeColor,
                  width: '9px',
                  height: '9px',
                  boxShadow: `0 0 0 4px ${activeColor}33`
                } : {})
              }}
            ></div>
          );
        })}
        
        <div 
          className="tag"
          style={{
            left: `${currentLeft}%`,
            opacity: status === 'hidden' ? 0 : 1,
            transform: `translateX(-50%) translateY(${status === 'hidden' ? '8px' : '0'}) scale(${status === 'hidden' ? '0.95' : '1'})`,
            color: status === 'event' ? activeColor : 'var(--ink-soft)',
            borderColor: status === 'event' ? activeColor : 'var(--line)',
            background: status === 'event' ? `${activeColor}11` : '#fff',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          {status === 'event' ? activeText : 'Monitoring…'}
        </div>
      </div>
    </div>
  );
};

const AIAgentsFeatureSection = () => {
  return (
    <section className="ai-agents-section">
      <div className="wrap">
        <h1 className="title">Everything you need to make AI work</h1>

        <div className="grid">
          {/* CARD 1 — model logos */}
          <div className="card gradient">
            <h2>Every model out of the box<br/>no vendor lock-in</h2>
            <div className="logo-row">
              <div className="logo-token"><Meta.Color size={26} /></div>
              <div className="logo-token"><Anthropic size={30} /></div>
              <div className="logo-token"><SiHuggingface size={32} color="#FFD21E" /></div>
              <div className="logo-token"><OpenAI size={42} /></div>
              <div className="logo-token"><Google.Color size={34} /></div>
              <div className="logo-token"><DeepSeek.Color size={28} /></div>
              <div className="logo-token"><SiNotion size={26} color="#000" /></div>
            </div>
          </div>

          {/* CARD 2 — integrations */}
          <div className="card">
            <h2>Connect to internal<br/>and external data</h2>
            <div className="icon-field">
              <div className="cell"></div>
              <div className="cell"></div>
              <div className="cell"><div className="tile ghost"></div></div>
              <div className="cell"><div className="tile" style={{background:'#eef1ff'}}><FaSlack size={20} color="#4A154B" /></div></div>
              <div className="cell"><div className="tile" style={{background:'#f0eefc'}}><FaGithub size={20} color="#181717" /></div></div>

              <div className="cell"><div className="tile" style={{background:'#0f6fde'}}><SiJira size={20} color="#fff" /></div></div>
              <div className="cell"><div className="tile ghost"></div></div>
              <div className="cell"></div>
              <div className="cell"><div className="tile" style={{background:'#fdece6'}}><SiGmail size={20} color="#EA4335" /></div></div>
              <div className="cell"><div className="tile ghost"></div></div>

              <div className="cell"></div>
              <div className="cell"><div className="tile" style={{background:'#14161f'}}><SiNotion size={20} color="#fff" /></div></div>
              <div className="cell"><div className="tile ghost"></div></div>
              <div className="cell"><div className="tile" style={{background:'#fff2e2'}}><FaSalesforce size={20} color="#00A1E0" /></div></div>
              <div className="cell"><div className="tile" style={{background:'#14161f'}}><SiMeta size={20} color="#fff" /></div></div>

              <div className="cell"><div className="tile" style={{background:'#f2f2f2', boxShadow:'none'}}><SiHubspot size={20} color="#FF7A59" /></div></div>
              <div className="cell"></div>
              <div className="cell"><div className="tile" style={{background:'#e6f7f2'}}><SiAirtable size={20} color="#18BFFF" /></div></div>
              <div className="cell"></div>
              <div className="cell"><div className="tile" style={{background:'#ffb340'}}><FaLinkedin size={20} color="#fff" /></div></div>
            </div>
          </div>

          {/* CARD 3 — recurring tasks */}
          <div className="card">
            <h2>Recurring tasks to keep your agents<br/>running in the background</h2>
            <div className="tasks">
              <TimelineRow 
                name="Social Presence" 
                schedule="Mondays at 8 AM PST"
                icon={<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="none" stroke="#fff" strokeWidth="2"/></svg>}
                iconBg="#14161f"
                activeColor="#10b981"
                activeText="New Mention"
                intervalMs={8000}
                delayMs={1000}
              />
              <TimelineRow 
                name="Lead Qualifier" 
                schedule="Every form submission"
                icon={<svg viewBox="0 0 24 24"><path d="M6 12l4 4 8-8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                iconBg="#ff5a34"
                activeColor="#8b5cf6"
                activeText="New Opportunity"
                intervalMs={9500}
                delayMs={4000}
              />
              <TimelineRow 
                name="Security Audit" 
                schedule="Every 8 hours"
                icon={<svg viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/></svg>}
                iconBg="#3f8cff"
                activeColor="#ef4444"
                activeText="New Risk Identified"
                intervalMs={11000}
                delayMs={7000}
              />
            </div>
            <div className="axis">
              <div className="labels">
                <span>0H</span><span>2H</span><span>4H</span><span>6H</span><span>8H</span>
              </div>
            </div>
          </div>

          {/* CARD 4 — canvas / workflow */}
          <div className="card gradient">
            <h2>A canvas to orchestrate<br/>multi-agent workflows</h2>
            <div className="canvas">
              <svg className="paths" viewBox="0 0 460 250" preserveAspectRatio="none">
                <path className="flow" d="M230 30 L230 90 L90 90 L90 175"></path>
                <path className="flow" d="M230 30 L230 120 L370 120 L370 225"></path>
              </svg>

              <div className="node n1">
                <div className="avatar"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" fill="none" stroke="#fff" strokeWidth="2"/></svg></div>
                Social Presence Agent
                <div className="mini"><span style={{background:'#ff5a34'}}></span><span style={{background:'#3f8cff'}}></span><span style={{background:'#14161f'}}></span></div>
              </div>

              <div className="tag-float t1">Good Review?</div>
              <div className="tag-float t2">Mentions Support?</div>

              <div className="node n2">
                <div className="avatar" style={{background:'#ff5a34'}}><svg viewBox="0 0 24 24"><path d="M4 12l4 4L20 4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                Marketing Agent
                <div className="mini"><span style={{background:'#ffb340'}}></span><span style={{background:'#3f8cff'}}></span><span style={{background:'#d768e0'}}></span></div>
              </div>

              <div className="node n3">
                <div className="avatar" style={{background:'#3f8cff'}}><svg viewBox="0 0 24 24"><path d="M4 18c0-4 3-6 8-6s8 2 8 6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="8" r="3" fill="#fff"/></svg></div>
                Customer Support Agent
                <div className="mini"><span style={{background:'#22b88a'}}></span><span style={{background:'#8b6ef0'}}></span><span style={{background:'#ffb340'}}></span></div>
              </div>

              <svg className="cursor" viewBox="0 0 24 24"><path d="M4 3l16 7-6.5 2-2 6.5z" fill="#ff5a34"/></svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIAgentsFeatureSection;
