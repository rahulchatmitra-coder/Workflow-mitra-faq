import { useState, useEffect } from 'react';
import { getBrandIcon } from '../utils/brandIcons';
import {
  MODELS, MODEL_PROVIDERS, INTEGRATIONS, INTEGRATION_COUNT,
  TASKS, TIMELINE_STOPS, AXIS_LABELS,
  AGENTS, BRANCH_LABELS, CANVAS_CAPTIONS,
} from '../data/aiSectionData';
import './AIAgentsFeatureSection.css';

/** How long a row waits before its first run, and between runs after that. */
const FIRST_RUN_MS = 700;
const STAGGER_MS = 1500;
const INTERVAL_MS = 5200;
const INTERVAL_STEP_MS = 1300;
const OUTCOME_HOLD_MS = 2600;

/**
 * One recurring schedule.
 *
 * Each tick walks the position one stop along the day, names what the run
 * produced, and banks it on the counter. The outcome holds for a moment and
 * then falls back to "Watching…" — the point being that the row is doing
 * something between runs, not that it is idle.
 */
function TimelineRow({ task }) {
  const [position, setPosition] = useState(-1);
  const [firing, setFiring] = useState(false);
  // Starts at -1 so the first tick lands on outcomes[0]. React applies the
  // increment before this renders, so starting at 0 would skip the first line.
  const [cycle, setCycle] = useState(-1);
  const [runs, setRuns] = useState(task.live.runs);
  const [stillMotion, setStillMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setStillMotion(query.matches);
    const onChange = (e) => setStillMotion(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (stillMotion) return undefined;

    let interval;
    let hold;

    const tick = () => {
      setPosition((p) => (p + 1) % TIMELINE_STOPS.length);
      setCycle((c) => c + 1);
      setRuns((r) => r + 1);
      setFiring(true);
      hold = setTimeout(() => setFiring(false), OUTCOME_HOLD_MS);
    };

    const start = setTimeout(() => {
      tick();
      interval = setInterval(tick, INTERVAL_MS + task.index * INTERVAL_STEP_MS);
    }, FIRST_RUN_MS + task.index * STAGGER_MS);

    return () => {
      clearTimeout(start);
      clearTimeout(hold);
      clearInterval(interval);
    };
  }, [stillMotion, task.index]);

  const at = Math.max(position, 0);
  const badge = getBrandIcon(task.brand, { size: 13, color: '#ffffff' });
  const label = firing ? task.outcomes[cycle % task.outcomes.length] : 'Watching…';

  return (
    <div className="task-row">
      <div className="task-id">
        <span className="task-icon" style={{ background: task.badgeBg }}>
          {badge?.component}
        </span>
        <span className="task-text">
          <span className="name">{task.name}</span>
          <span className="schedule">{task.schedule}</span>
        </span>
      </div>

      <div className="timeline">
        <div className="track" />
        <div
          className="fill"
          style={{ width: `${TIMELINE_STOPS[at]}%`, background: task.color }}
        />

        {TIMELINE_STOPS.map((left, i) => {
          const state = i < position ? ' done' : i === position && firing ? ' now' : '';
          return (
            <span
              key={left}
              className={`dot${state}`}
              style={{
                left: `${left}%`,
                ...(state === ' now'
                  ? { background: task.color, boxShadow: `0 0 0 4px ${task.color}2e` }
                  : {}),
              }}
            />
          );
        })}

        <span
          className="tag"
          style={{
            left: `${TIMELINE_STOPS[at]}%`,
            opacity: position < 0 ? 0 : 1,
            color: firing ? task.color : undefined,
            borderColor: firing ? `${task.color}55` : undefined,
            background: firing ? `${task.color}10` : undefined,
          }}
        >
          {label}
        </span>
      </div>

      <div className="runs">
        <b>{runs.toLocaleString('en-IN')}</b>
        <span>{task.live.unit}</span>
      </div>
    </div>
  );
}

export default function AIAgentsFeatureSection() {
  return (
    <section className="ai-agents-section">
      <div className="wrap">
        <h1 className="title">Everything you need to make AI work</h1>
        <p className="section-sub">
          Your models, your apps, your data — wired into flows that keep running
          after you close the tab.
        </p>

        <div className="grid">

          {/* CARD 1 — every provider the AI node can dial, plus what they serve */}
          <div className="card gradient">
            <h2>Every model out of the box<br />no vendor lock-in</h2>
            <p className="h2sub">Switch provider on any AI node. Nothing else in the flow changes.</p>

            <div className="logo-arc">
              {MODELS.map(({ key, Icon, color, share }) => {
                const lift = Math.round(share * 22);
                return (
                  <span
                    key={key}
                    className="logo-token"
                    style={{
                      width: `calc(var(--tok) * ${share})`,
                      height: `calc(var(--tok) * ${share})`,
                      zIndex: Math.round(share * 100),
                      boxShadow: `0 2px 4px rgba(20,20,30,.06), 0 ${lift}px ${lift + 10}px -${Math.round(lift * 0.6)}px rgba(20,20,30,.26)`,
                    }}
                  >
                    <span
                      className="logo-glyph"
                      style={{ color, fontSize: `calc(var(--tok) * ${(share * 0.46).toFixed(3)})` }}
                    >
                      <Icon />
                    </span>
                  </span>
                );
              })}
            </div>

            <p className="model-caption">
              <b>{MODEL_PROVIDERS.length} providers</b> · {MODEL_PROVIDERS.join(', ')}
            </p>
          </div>

          {/* CARD 2 — integrations, bleeding past both edges under a fade */}
          <div className="card">
            <h2>Connect to internal<br />and external data</h2>
            <p className="h2sub">Native nodes for the apps Indian businesses actually run on.</p>

            <div className="field-mask">
              <div className="icon-field">
                {INTEGRATIONS.map((name, i) => {
                  if (!name) return <span key={`ghost-${i}`} className="tile ghost" />;
                  // getBrandIcon fails open — a missing key would render an
                  // empty white tile that reads as a deliberate blank. The data
                  // module's test asserts every key here resolves.
                  const icon = getBrandIcon(name, { size: 21 });
                  return (
                    <span key={name} className="tile" title={name}>
                      {icon?.component}
                    </span>
                  );
                })}
              </div>
            </div>

            <p className="field-foot">
              <b>{INTEGRATION_COUNT} apps out of the box</b> · plus any REST API
            </p>
          </div>

          {/* CARD 3 — the schedules a business turns on first */}
          <div className="card">
            <h2>Recurring tasks to keep your agents<br />running in the background</h2>
            <p className="h2sub">Live, and named by what each run actually produced.</p>

            <div className="tasks">
              {TASKS.map((task, index) => (
                <TimelineRow key={task.id} task={{ ...task, index }} />
              ))}
            </div>

            <div className="axis">
              <div className="labels">
                {AXIS_LABELS.map((l) => <span key={l}>{l}</span>)}
              </div>
            </div>
          </div>

          {/* CARD 4 — one inbox, three agents, a rule that decides who answers.
              All motion is CSS so the page keeps three timers, not four. */}
          <div className="card gradient">
            <h2>A canvas to orchestrate<br />multi-agent workflows</h2>
            <p className="h2sub">One inbox, three agents, and a rule that decides who answers.</p>

            <div className="canvas">
              <svg className="paths" viewBox="0 0 460 258" preserveAspectRatio="none" aria-hidden="true">
                <path className="flow" d="M230 34 L230 96 Q230 104 222 104 L96 104 Q88 104 88 112 L88 176" />
                <path className="flow" d="M230 34 L230 128 Q230 136 238 136 L364 136 Q372 136 372 144 L372 226" />
              </svg>

              <span className="packet a" aria-hidden="true" />
              <span className="packet b" aria-hidden="true" />

              {AGENTS.map((agent, i) => {
                const avatar = getBrandIcon(agent.brand, { size: 13, color: '#ffffff' });
                return (
                  <span key={agent.id} className={`node n${i + 1}`}>
                    <span className="avatar" style={{ background: agent.badgeBg }}>
                      {avatar?.component}
                    </span>
                    <span className="node-label">{agent.label}</span>
                    <span className="mini">
                      {agent.minis.map((m) => (
                        <i key={m}>{getBrandIcon(m, { size: 11 })?.component}</i>
                      ))}
                    </span>
                  </span>
                );
              })}

              {BRANCH_LABELS.map((label, i) => (
                <span key={label} className={`tag-float t${i + 1}`}>{label}</span>
              ))}

              <span className="canvas-foot">
                <span className="pulse" aria-hidden="true" />
                {CANVAS_CAPTIONS.map((caption, i) => (
                  <span key={caption} className="cap" style={{ animationDelay: `${i * 2.333}s` }}>
                    {caption}
                  </span>
                ))}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
