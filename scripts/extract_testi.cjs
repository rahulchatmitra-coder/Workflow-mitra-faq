const fs = require('fs');

const html = fs.readFileSync('vintar.html', 'utf8');

const start = html.indexOf('<section class="section testimonial">');
const end = html.indexOf('</section>', start) + 10;
const sectionHtml = html.substring(start, end);
fs.writeFileSync('vintar_testimonial.html', sectionHtml);
console.log('Saved testimonial section, length:', sectionHtml.length);
