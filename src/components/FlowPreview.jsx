import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FlowDiagram from './FlowDiagram';
import { docsPathForApp } from '../utils/docs/appLinkable';
import integrationRegistry from '../data/integrationRegistry';
import './FlowPreview.css';

const APP_ALIAS_MAP = { sheets: 'google-sheets', zoho: 'zoho-books', truck: 'shiprocket' };

// Inlined SVG icon renderer — reuses same symbols from Templates.jsx sprite sheet
const NodeIcon = ({ app, size = 28 }) => (
  <svg width={size} height={size} aria-hidden="true">
    <use href={`#i-${app}`} />
  </svg>
);

const kindLabel = { trigger: 'Trigger', condition: 'Condition', action: 'Action' };
const kindClass = { trigger: 'kind-trigger', condition: 'kind-condition', action: 'kind-action' };

const FlowPreview = ({ flow, template, onBack }) => {
  const sectionRef = useRef(null);
  const [animated, setAnimated] = useState(false);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Trigger entrance animation each time flow changes
  useEffect(() => {
    setAnimated(false);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimated(true));
    });
    return () => cancelAnimationFrame(raf);
  }, [flow]);

  // Smooth scroll into view when opened
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [flow]);

  if (!flow) return null;

  const getCategoryClass = (cat) => {
    const map = {
      'LEAD CAPTURE': 'cat-lead', 'E-COMMERCE': 'cat-commerce',
      'CUSTOMER SUPPORT': 'cat-support', 'AI': 'cat-ai',
      'SOCIAL': 'cat-social', 'NOTIFICATIONS': 'cat-notif',
      'REPORTING': 'cat-report', 'DATA SYNC': 'cat-sync',
    };
    return map[cat?.toUpperCase()] || 'cat-default';
  };

  return (
    <section
      id="flow-preview"
      className="fp-section"
      ref={sectionRef}
      aria-label={`Flow preview for: ${template?.title}`}
    >
      {/* ── Back control ── */}
      <button
        className="fp-back"
        onClick={onBack}
        aria-label="Back to templates"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to templates
      </button>

      {/* ── Header ── */}
      <div className="fp-header">
        <span className={`fp-cat-pill ${getCategoryClass(template?.category)}`}>
          {template?.category}
        </span>
        <h2 className="fp-title">
          {template?.title.split('→').map((part, i, arr) => (
            <span key={i}>
              {part.trim()}
              {i < arr.length - 1 && <span className="fp-arrow"> → </span>}
            </span>
          ))}
        </h2>
        <p className="fp-desc">{template?.description}</p>
        <div className="fp-facts">
          <span className="fp-fact">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
            Runs within seconds
          </span>
          <span className="fp-fact">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 12h6M9 15h4" /></svg>
            {flow.nodes.length} nodes
          </span>
          <span className="fp-fact">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
            {[...new Set(flow.nodes.map(n => n.app))].length} apps connected
          </span>
        </div>
      </div>

      {/* ── Flow diagram ── */}
      <div className="fp-diagram-outer">
        <FlowDiagram flow={flow} animated={animated} />
      </div>

      {/* ── Step by step ── */}
      <div className="fp-body">
        <div className="fp-steps-section">
          <h3 className="fp-section-title">Step by step</h3>
          <ol className="fp-steps-list">
            {flow.steps.map((step, i) => {
              const node = flow.nodes.find(n => n.id === step.nodeId);
              const docsPath = node ? docsPathForApp(node.app, { registry: integrationRegistry, aliasMap: APP_ALIAS_MAP }) : null;
              const nodeLabel = node && (
                <div className="fp-step-node-label">
                  <span
                    className="fp-step-dot"
                    style={{ background: node.bg || '#111318' }}
                  ></span>
                  <span className="fp-step-name">{node.title}</span>
                  <code className="fp-step-sub">{node.subtitle}</code>
                </div>
              );
              return (
                <li key={step.nodeId} className="fp-step-item">
                  <div className="fp-step-num">{i + 1}</div>
                  <div className="fp-step-content">
                    {docsPath ? <Link to={docsPath} className="fp-step-node-link">{nodeLabel}</Link> : nodeLabel}
                    <p className="fp-step-body">{step.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="fp-side-sections">
          {/* Why teams build this */}
          <div className="fp-info-card">
            <h3 className="fp-section-title">Why teams build this</h3>
            {flow.why.map((para, i) => (
              <p key={i} className="fp-info-para">{para}</p>
            ))}
          </div>

          {/* What changes once it's on */}
          <div className="fp-info-card fp-benefit-card">
            <div className="fp-benefit-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h3 className="fp-section-title">What changes once it's on</h3>
            {flow.benefit.map((para, i) => (
              <p key={i} className="fp-info-para">{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Individual node component
const FlowNode = ({ node, delay, animated }) => {
  return (
    <div
      className={`fp-node fp-node-${node.kind} ${animated ? 'fp-node-visible' : ''}`}
      style={{ transitionDelay: animated ? `${delay}ms` : '0ms' }}
    >
      <div
        className="fp-node-circle"
        style={{ background: node.bg || '#111318' }}
      >
        <svg width="26" height="26" aria-hidden="true">
          <use href={`#i-${node.app}`} />
        </svg>
        <span className="fp-node-badge">{node.order}</span>
      </div>
      <div className="fp-node-label">
        <span className="fp-node-title">{node.title}</span>
        <code className="fp-node-sub">{node.subtitle}</code>
      </div>
    </div>
  );
};

export default FlowPreview;
