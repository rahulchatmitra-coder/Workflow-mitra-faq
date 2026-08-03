import React, { useState, useEffect, useRef } from 'react';
import { getBrandIcon } from '../utils/brandIcons';
import { agentsShowcaseData as agents } from '../data/agentsShowcaseData';
import { FaUserCircle } from 'react-icons/fa';
import './AgentsShowcase.css';

const CYCLE_MS = 6500;
const TICK_MS = 100;

export default function AgentsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  
  // Track the actual displayed agent to allow for fade out before changing content
  const [displayIndex, setDisplayIndex] = useState(0);

  // We use refs to safely access state inside the interval without recreating it
  const stateRef = useRef({ activeIndex, elapsed, isPaused, isSwitching });
  useEffect(() => {
    stateRef.current = { activeIndex, elapsed, isPaused, isSwitching };
  }, [activeIndex, elapsed, isPaused, isSwitching]);

  useEffect(() => {
    const timer = setInterval(() => {
      const { activeIndex: currentIdx, elapsed: currentElapsed, isPaused: currentPaused, isSwitching: currentSwitching } = stateRef.current;
      
      if (currentPaused || currentSwitching) return;

      const newElapsed = currentElapsed + TICK_MS;
      if (newElapsed >= CYCLE_MS) {
        handleAgentChange((currentIdx + 1) % agents.length);
      } else {
        setElapsed(newElapsed);
      }
    }, TICK_MS);

    return () => clearInterval(timer);
  }, []);

  const handleAgentChange = (newIndex) => {
    if (newIndex === stateRef.current.activeIndex) return;
    
    // Start transition
    setIsSwitching(true);
    setElapsed(0);
    setActiveIndex(newIndex);
    
    // Wait for fade out, then swap content and fade in
    setTimeout(() => {
      setDisplayIndex(newIndex);
      setIsSwitching(false);
    }, 180);
  };

  const handleManualClick = (index) => {
    handleAgentChange(index);
  };

  const activeAgent = agents[displayIndex];

  // Helper to get stagger delay for reveal animations
  const getDelay = (step) => ({
    transitionDelay: `${step * 180}ms`,
    animationDelay: `${step * 180}ms`
  });

  return (
    <section 
      className="agents-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="agents-grid">
        
        {/* Left Column: Accordion / List */}
        <div className="agents-list-col">
          <h2>Roll out specialized<br/>agents in minutes</h2>
          <ul className="agent-list">
            {agents.map((agent, i) => {
              const isActive = i === activeIndex;
              const progressWidth = isActive ? Math.min(100, (elapsed / CYCLE_MS) * 100) : 0;
              
              return (
                <li key={agent.id} className={`agent-item ${isActive ? 'active' : ''}`}>
                  <button className="agent-toggle" onClick={() => handleManualClick(i)}>
                    <span className="agent-icon" style={{ backgroundColor: agent.color }}>
                      {agent.icon}
                    </span>
                    <span className="agent-name">{agent.name}</span>
                  </button>
                  
                  <div className="agent-details">
                    <p className="agent-desc">{agent.desc}</p>
                    <div className="agent-meta">
                      <div className="avatar-stack">
                        {agent.integrations.map((integration, idx) => {
                          const brand = getBrandIcon(integration, { size: 12, color: '#ffffff' });
                          return (
                            <span 
                              key={idx} 
                              style={{ background: brand ? brand.color : '#888' }}
                              title={integration}
                            >
                              {brand ? brand.component : integration.charAt(0)}
                            </span>
                          );
                        })}
                      </div>
                      <span className="agent-credit">
                        {agent.teamLabel} · Integrates with {agent.integrations.join(', ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="progress-track">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${progressWidth}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Column: Animated Demo Preview */}
        <div className="demo-col">
          <div className="demo-glow"></div>
          
          {/* Chat Card */}
          <div className={`chat-card ${isSwitching ? 'switching' : ''}`}>
            
            <div className={`reveal user-msg-row ${!isSwitching ? 'show' : ''}`} style={getDelay(0)}>
              <div className="user-bubble">{activeAgent.question}</div>
              <div className="user-avatar">
                <FaUserCircle size={26} color="#ffffff" />
              </div>
            </div>

            <div className={`reveal assistant-header ${!isSwitching ? 'show' : ''}`} style={getDelay(1)}>
              <span className="assistant-logo">F</span>
              <span className="assistant-name">FlowMitra</span>
            </div>

            <div className={`reveal steps-toggle ${!isSwitching ? 'show' : ''}`} style={getDelay(1)}>
              ⌄ &nbsp;{activeAgent.callouts.length + activeAgent.table.rows.length} Steps
            </div>

            <div className="assistant-response">
              <p className={`reveal response-lead ${!isSwitching ? 'show' : ''}`} style={getDelay(2)}>
                {activeAgent.lead}
              </p>
              
              {activeAgent.callouts.map((c, i) => (
                <div key={i} className={`reveal callout ${!isSwitching ? 'show' : ''}`} style={getDelay(3 + i)}>
                  {c.icon && <span className="callout-icon">{c.icon}</span>}
                  <p><strong>{c.strong}</strong> {c.text}</p>
                </div>
              ))}
              
              <div className={`reveal table-wrap ${!isSwitching ? 'show' : ''}`} style={getDelay(3 + activeAgent.callouts.length)}>
                <table>
                  <thead>
                    <tr>
                      {activeAgent.table.headers.map((h, i) => <th key={i}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {activeAgent.table.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => <td key={j}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="table-fade"></div>
              </div>
            </div>
            
          </div>

          {/* Floating Stat Card */}
          <div className={`wau-card ${isSwitching ? 'switching' : ''}`}>
            <p className="wau-title">{activeAgent.stat.title}</p>
            <div className="wau-bars">
              {activeAgent.stat.data.map((val, i) => (
                <div 
                  key={i} 
                  className={`bar ${i === activeAgent.stat.peak ? 'peak' : ''}`}
                  style={{ 
                    height: !isSwitching ? `${val}%` : '0%',
                    transitionDelay: !isSwitching ? `${150 + (i * 20)}ms` : '0ms' 
                  }}
                />
              ))}
            </div>
            <div className="wau-axis">
              <span>W1</span><span>W5</span><span>W12</span><span>W18</span><span>W24</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
