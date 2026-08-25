/**
 * Zoho CRM Token Refresh Script
 * This script refreshes your Zoho CRM access token using the refresh token
 */

const https = require('https');

// Your Zoho CRM Credentials
const CLIENT_ID = '1000.ZU3U0BE1L7HX204R7VQBG4JX6XEPCD';
const CLIENT_SECRET = '1a9780906923b3596d7887db8376d788bd6106d455';
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN_HERE'; // You need to add your refresh token

/**
 * Refresh Zoho CRM Access Token
 */
async function refreshZohoToken() {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      refresh_token: REFRESH_TOKEN,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'refresh_token'
    }).toString();

    const options = {
      hostname: 'accounts.zoho.com',
      path: '/oauth/v2/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          
          if (response.access_token) {
            console.log('✅ Token refreshed successfully!');
            console.log('\n📋 New Access Token:');
            console.log(response.access_token);
            console.log('\n⏱️ Expires in:', response.expires_in, 'seconds');
            console.log('\n🔄 API Domain:', response.api_domain);
            
            resolve(response);
          } else {
            console.error('❌ Error refreshing token:', response);
            reject(response);
          }
        } catch (error) {
          console.error('❌ Error parsing response:', error);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request failed:', error);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Run the refresh
console.log('🔄 Refreshing Zoho CRM token...\n');
refreshZohoToken()
  .then(() => {
    console.log('\n✅ Done!');
  })
  .catch((error) => {
    console.error('\n❌ Failed to refresh token');
    process.exit(1);
  });
