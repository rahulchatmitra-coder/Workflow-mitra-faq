import './TemplateSearchBox.css';

const TemplateSearchBox = ({ value, onChange }) => {
  return (
    <div className="search-box">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <path d="M21 21l-4.4-4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
      <input 
        type="text" 
        placeholder="Search templates…" 
        aria-label="Search templates" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TemplateSearchBox;
