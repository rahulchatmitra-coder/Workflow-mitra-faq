const fs = require('fs');

const html = fs.readFileSync('vintar.html', 'utf8');

// Find all headings
const headings = html.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi) || [];
console.log('Headings found:');
headings.forEach(h => console.log(h.replace(/<[^>]+>/g, '').trim()));

// Find all section class names
const sections = html.match(/<section[^>]*class="([^"]*)"[^>]*>/gi) || [];
console.log('\nSections:');
sections.forEach(s => console.log(s));
