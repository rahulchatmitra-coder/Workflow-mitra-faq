const fs = require('fs');

const css = fs.readFileSync('vintar.css', 'utf8');

// Find all css rules matching testimonial or tester
const lines = css.split('}');
const matched = lines.filter(l => l.includes('testimonial') || l.includes('tester'));
console.log('Matched rules count:', matched.length);
fs.writeFileSync('vintar_testi.css', matched.join('}\n') + '}');
