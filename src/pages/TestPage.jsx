import React from 'react';
import { SiHubspot, SiNotion } from 'react-icons/si';
import { FaSlack } from 'react-icons/fa';

const TestPage = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Icon Test</h1>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
        <div style={{ width: '44px', height: '44px', border: '1px solid #eaeaea', borderRadius: '10px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SiHubspot size={22} color="#FF7A59" />
        </div>
        <div style={{ width: '44px', height: '44px', border: '1px solid #eaeaea', borderRadius: '10px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FaSlack size={22} color="#4A154B" />
        </div>
        <div style={{ width: '44px', height: '44px', border: '1px solid #eaeaea', borderRadius: '10px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SiNotion size={22} color="#000000" />
        </div>
      </div>
      <p style={{ marginTop: '20px' }}>If you see 3 colored icons above, react-icons is working!</p>
    </div>
  );
};

export default TestPage;
