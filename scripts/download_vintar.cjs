const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const html = await fetch('https://vintar.webflow.io/');
  fs.writeFileSync('vintar.html', html);
  console.log('HTML length:', html.length);
  
  // Extract CSS links
  const cssMatches = html.match(/href="([^"]+\.css)"/g) || [];
  console.log('CSS files:', cssMatches);
  
  for (const match of cssMatches) {
    const cssUrl = match.replace('href="', '').replace('"', '');
    try {
      const css = await fetch(cssUrl);
      fs.writeFileSync('vintar.css', css);
      console.log('Saved CSS, length:', css.length);
      break;
    } catch(e) {
      console.error(e);
    }
  }
}
run();
