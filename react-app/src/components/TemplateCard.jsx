import { useNavigate } from 'react-router-dom';
import './TemplateCard.css';

// Map specific categories to color themes
const getCategoryTheme = (category) => {
  const normalized = category.toUpperCase();
  switch (normalized) {
    case 'NOTIFICATIONS': return 'cat-notif';
    case 'REPORTING': return 'cat-report';
    case 'DATA SYNC': return 'cat-sync';
    case 'AI': return 'cat-ai';
    case 'SOCIAL': return 'cat-social';
    case 'LEAD CAPTURE': return 'cat-lead';
    case 'E-COMMERCE': return 'cat-commerce';
    case 'CUSTOMER SUPPORT': return 'cat-support';
    default: return 'cat-default';
  }
};

const TemplateCard = ({ template, index }) => {
  const navigate = useNavigate();
  // Cap nodes at 5
  const MAX_NODES = 5;
  const nodes = template.icons.slice(0, MAX_NODES);
  const remainingCount = template.icons.length - MAX_NODES;

  return (
    <div className="card">
      <div className="icon-strip">
        {nodes.map((icon, i) => {
          return (
            <div key={i} className="step-icon">
              <svg width="15" height="15"><use href={`#i-${icon}`} /></svg>
            </div>
          );
        })}
        {remainingCount > 0 && (
          <div className="step-icon" style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', fontWeight: '700' }}>
            +{remainingCount}
          </div>
        )}
      </div>
      <div className="badge">{template.category}</div>
      <h3>
        {template.title.split('→').map((part, i, arr) => (
          <span key={i}>
            {part.trim()}
            {i < arr.length - 1 && <span style={{color: 'var(--color-text-tertiary)'}}> → </span>}
          </span>
        ))}
      </h3>
      <p>{template.description}</p>
      <div className="card-footer">
        <span className="meta">{template.steps}</span>
        <button
          className="use-btn"
          onClick={() => navigate(`/template/${template.id}`)}
          aria-label={`Use template: ${template.title}`}
        >Use</button>
      </div>
    </div>
  );
};

export default TemplateCard;
