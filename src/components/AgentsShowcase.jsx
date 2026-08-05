import React, { useState, useEffect, useRef } from 'react';
import { getBrandIcon } from '../utils/brandIcons';
import { agentsShowcaseData as agents } from '../data/agentsShowcaseData';
import FlowCanvas from './FlowCanvas';
import './AgentsShowcase.css';

const CYCLE_MS = 7000;   // how long one automation holds the stage
const TICK_MS = 100;     // progress rail + run clock resolution
const STEP_MS = 1250;    // how long each node executes for
const STEP_COUNT = 5;
const NODE_KEYS = ['n1', 'n2', 'n3', 'n4', 'n5'];

export default function AgentsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  // Track the actual displayed agent to allow for fade out before changing content
  const [displayIndex, setDisplayIndex] = useState(0);

  // The run: which node is executing, how long it has been going, and a run
  // number that increments so the card reads like a live queue.
  const [step, setStep] = useState(0);
  const [runMs, setRunMs] = useState(0);
  const [runNo, setRunNo] = useState(8841);

  // We use refs to safely access state inside the interval without recreating it
  const stateRef = useRef({ activeIndex, elapsed, isPaused, isSwitching });
  useEffect(() => {
    stateRef.current = { activeIndex, elapsed, isPaused, isSwitching };
  }, [activeIndex, elapsed, isPaused, isSwitching]);

  useEffect(() => {
    const timer = setInterval(() => {
      const { activeIndex: currentIdx, elapsed: currentElapsed, isPaused: currentPaused, isSwitching: currentSwitching } = stateRef.current;

      if (currentPaused || currentSwitching) return;

      setRunMs((ms) => ms + TICK_MS);

      const newElapsed = currentElapsed + TICK_MS;
      if (newElapsed >= CYCLE_MS) {
        handleAgentChange((currentIdx + 1) % agents.length);
      } else {
        setElapsed(newElapsed);
      }
    }, TICK_MS);

    return () => clearInterval(timer);
  }, []);

  // Walk the graph. Finishing a pass banks a run, which is what makes the
  // counter on the status card climb while someone is watching.
  useEffect(() => {
    const stepper = setInterval(() => {
      if (stateRef.current.isPaused || stateRef.current.isSwitching) return;
      setStep((s) => {
        const next = (s + 1) % STEP_COUNT;
        if (next === 0) {
          setRunNo((n) => n + 1);
          setRunMs(0);
        }
        return next;
      });
    }, STEP_MS);

    return () => clearInterval(stepper);
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
      setStep(0);
      setRunMs(0);
      setRunNo((n) => n + 1);
      setIsSwitching(false);
    }, 180);
  };

  const handleManualClick = (index) => {
    handleAgentChange(index);
  };

  const activeAgent = agents[displayIndex];
  const nodeLabels = NODE_KEYS.map((k) => activeAgent.nodes[k].label);
  const progressPct = Math.round(((step + 1) / STEP_COUNT) * 100);

  return (
    <section
      className="agents-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="agents-grid">

        {/* Left Column: Accordion / List */}
        <div className="agents-list-col">
          <h2>Popular automations,<br/>running in minutes</h2>
          <p className="agents-sub">
            Five flows teams start with. Every one is a real template — open it,
            connect your accounts, run it.
          </p>
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

        {/* Right Column: the automation running, node by node */}
        <div className="demo-col">
          <div className="demo-glow"></div>

          <div className={`flow-card ${isSwitching ? 'switching' : ''}`}>
            <div className="fcard-head">
              <span className="fcard-title">{activeAgent.cardTitle}</span>
              <span className="fcard-live"><i></i>running</span>
            </div>

            <FlowCanvas
              nodes={activeAgent.nodes}
              tags={activeAgent.tags}
              payloads={activeAgent.payloads}
              step={step}
            />

            <div className="fcard-foot">
              <span className="fcard-step">
                <b>Step {step + 1}/{STEP_COUNT}</b> · {activeAgent.steps[step]}
              </span>
              <span className="fcard-json">{activeAgent.json}</span>
            </div>
          </div>

          <div className={`stat-card ${isSwitching ? 'switching' : ''}`}>
            <div className="sc-top">
              <span className="sc-pill"><i></i>running</span>
              <span className="sc-run">#{runNo}</span>
              <span className="sc-ms">{(runMs / 1000).toFixed(1)}s</span>
            </div>

            <div className="sc-bar">
              <span style={{ width: `${progressPct}%` }} />
            </div>

            <p className="sc-now">
              Step <b>{step + 1} of {STEP_COUNT}</b> · <b>{nodeLabels[step]}</b>
            </p>

            <div className="sc-stats">
              <div className="sc-stat">
                <span className="sc-num">
                  {activeAgent.live.runs.toLocaleString('en-IN')} <em>▲</em>
                </span>
                <span className="sc-cap">{activeAgent.live.unit} this week</span>
              </div>
              <div className="sc-stat">
                <span className="sc-num">{activeAgent.live.ok}%</span>
                <span className="sc-cap">succeeded</span>
              </div>
              <div className="sc-stat">
                <span className="sc-num">{activeAgent.live.avg}s</span>
                <span className="sc-cap">avg run</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
