import './TemplateFilterChips.css';

const TemplateFilterChips = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="chips" role="group" aria-label="Filter by category">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            className={`chip ${isActive ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat)}
            aria-pressed={isActive}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default TemplateFilterChips;
