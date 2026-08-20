const fs = require('fs');

const html = fs.readFileSync('vintar.html', 'utf8');

const match = html.match(/Student Success Stories[\s\S]{0,10000}?<\/section>/i);
if (match) {
  console.log('Found section match!');
  fs.writeFileSync('vintar_stories.html', match[0]);
} else {
  console.log('No direct regex match, searching keywords...');
}

// Search surrounding html
const idx = html.indexOf('Student Success Stories');
if (idx !== -1) {
  const start = html.lastIndexOf('<section', idx);
  const end = html.indexOf('</section>', idx) + 10;
  const sectionHtml = html.substring(start, end);
  fs.writeFileSync('vintar_section.html', sectionHtml);
  console.log('Extracted section length:', sectionHtml.length);
}
