import React, { useEffect, useState } from 'react';
import { FaFacebook, FaSlack, FaLinkedin, FaWhatsapp, FaRss, FaTruck, FaUsers, FaUser, FaShopify } from 'react-icons/fa';
import { SiHubspot, SiGmail } from 'react-icons/si';
import { BsStars, BsLightningChargeFill } from 'react-icons/bs';
import './FlowDiagram.css';

const R = 36;  // node circle radius
const ICON = 28; // icon size

/* ── White SVG icon for each app ── */
const SheetsSVG = () => (
  <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="white">
    <path d="M14 2H6C4.9 2 4 2.9 4 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm0 2 4 4h-4V4zM7 11h10v2H7zm0 4h10v2H7zm0 4h6v2H7z"/>
  </svg>
);
const ZohoSVG = () => (
  <svg width={38} height={22} viewBox="0 0 38 22">
    <text x="19" y="16" fill="white" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="bold" textAnchor="middle">ZOHO</text>
  </svg>
);
const ZendeskSVG = () => (
  <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="white">
    <path d="M12 12l8-8v16z"/><path d="M12 12L4 20V4z" fillOpacity="0.6"/>
  </svg>
);
const IfSVG = () => (
  <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h6m0 0l4-4m-4 4 4 4M21 18h-6m0 0-4-4m4 4-4 4M12 10v4"/>
  </svg>
);

const AppIcon = ({ app }) => {
  const white = { color: 'white' };
  switch (app) {
    case 'facebook':      return <FaFacebook size={ICON} style={white}/>;
    case 'webhook':       return <IfSVG />;
    case 'hubspot':       return <SiHubspot size={ICON} style={white}/>;
    case 'users':         return <FaUsers size={ICON} style={white}/>;
    case 'gmail':         return <SiGmail size={ICON} style={white}/>;
    case 'slack':         return <FaSlack size={ICON} style={white}/>;
    case 'sheets':        return <SheetsSVG />;
    case 'shopify':       return <FaShopify size={ICON} style={white}/>;
    case 'zoho':          return <ZohoSVG />;
    case 'whatsapp':      return <FaWhatsapp size={ICON} style={white}/>;
    case 'truck':         return <FaTruck size={ICON} style={white}/>;
    case 'zendesk':       return <ZendeskSVG />;
    case 'sparkles':      return <BsStars size={ICON} style={white}/>;
    case 'rss':           return <FaRss size={ICON} style={white}/>;
    case 'linkedin':      return <FaLinkedin size={ICON} style={white}/>;
    case 'zap':           return <BsLightningChargeFill size={ICON} style={white}/>;
    case 'user-orange':   return <FaUser size={ICON} style={white}/>;
    default:              return <BsLightningChargeFill size={ICON} style={white}/>;
  }
};

/* ── Path builder ── */
function makePath(x1, y1, x2, y2) {
  if (Math.abs(y1 - y2) < 6) return `M ${x1} ${y1} L ${x2} ${y2}`;
  const cx = x1 + (x2 - x1) * 0.55;
  return `M ${x1} ${y1} C ${cx} ${y1} ${cx} ${y2} ${x2} ${y2}`;
}

const FlowDiagram = ({ flow, animated }) => {
  const { nodes, edges, elsePlaceholder, canvas = { w: 920, h: 340 } } = flow;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const show = animated || prefersReduced;

  const hasOutgoing = new Set(edges.map(e => e.from));

  return (
    <div className="fd-wrap">
      <div
        className="fd-canvas"
        style={{ width: canvas.w, height: canvas.h, minHeight: canvas.h }}
      >
        {/* ── SVG layer: edges, connector dots, else placeholder ── */}
        <svg
          viewBox={`0 0 ${canvas.w} ${canvas.h}`}
          className="fd-svg"
          aria-hidden="true"
        >
          {/* Edges */}
          {edges.map((edge, i) => {
            const from = nodes.find(n => n.id === edge.from);
            if (!from?.pos) return null;
            let tx, ty;
            const isElse = edge.to === 'n_else' || edge.to === 'n_archive';
            if (isElse) {
              if (!elsePlaceholder) return null;
              tx = elsePlaceholder.x - 24;
              ty = elsePlaceholder.y;
            } else {
              const to = nodes.find(n => n.id === edge.to);
              if (!to?.pos) return null;
              tx = to.pos.x - R;
              ty = to.pos.y;
            }
            const x1 = from.pos.x + R;
            const y1 = from.pos.y;
            const path = makePath(x1, y1, tx, ty);
            const lx = (x1 + tx) / 2;
            const ly = Math.abs(y1 - ty) < 6 ? y1 - 22 : (y1 + ty) / 2;
            return (
              <g key={i}>
                <path d={path} className="fd-edge" />
                {edge.label && (
                  <foreignObject x={lx - 65} y={ly - 13} width="130" height="26" overflow="visible">
                    <div className="fd-edge-label">{edge.label}</div>
                  </foreignObject>
                )}
              </g>
            );
          })}

          {/* Right-side connector dot on source nodes */}
          {nodes.map(n => n.pos && hasOutgoing.has(n.id) ? (
            <circle key={`rc-${n.id}`} cx={n.pos.x + R} cy={n.pos.y} r={6}
              fill="white" stroke="#c8ccd4" strokeWidth="1.5"/>
          ) : null)}

          {/* "+" circle on right of terminal action nodes */}
          {nodes.map(n => {
            if (!n.pos || hasOutgoing.has(n.id) || n.kind === 'trigger') return null;
            const cx = n.pos.x + R + 18;
            return (
              <g key={`plus-${n.id}`}>
                <circle cx={cx} cy={n.pos.y} r={9} fill="white" stroke="#c8ccd4" strokeWidth="1.5"/>
                <text x={cx} y={n.pos.y + 4} textAnchor="middle" fill="#9aa0ab" fontSize="13" fontWeight="400">+</text>
              </g>
            );
          })}

          {/* Else placeholder circle */}
          {elsePlaceholder && (
            <g>
              <circle cx={elsePlaceholder.x} cy={elsePlaceholder.y} r={24}
                fill="white" stroke="#c8ccd4" strokeWidth="2" strokeDasharray="5 4"/>
              <text x={elsePlaceholder.x} y={elsePlaceholder.y + 6}
                textAnchor="middle" fill="#9aa0ab" fontSize="20" fontWeight="300">+</text>
            </g>
          )}
        </svg>

        {/* ── HTML node circles ── */}
        {nodes.map((node, idx) => {
          if (!node.pos) return null;
          const bg = node.bg || '#111318';
          return (
            <div
              key={node.id}
              className={`fd-node ${show ? 'fd-node-in' : ''}`}
              style={{
                left: node.pos.x - R,
                top: node.pos.y - R,
                transitionDelay: show && !prefersReduced ? `${idx * 110}ms` : '0ms',
              }}
            >
              <div className="fd-circle" style={{ background: bg }}>
                <AppIcon app={node.app} />
                <span className="fd-badge">{node.order}</span>
              </div>
              <div className="fd-label">
                <span className="fd-title">{node.title}</span>
                <code className="fd-sub">{node.subtitle}</code>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlowDiagram;
