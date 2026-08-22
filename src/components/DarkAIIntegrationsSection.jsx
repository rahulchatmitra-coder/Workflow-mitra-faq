import React from 'react';
import { Link } from 'react-router-dom';
import { getBrandIcon } from '../utils/brandIcons';
import RollButton from './RollButton';
import './DarkAIIntegrationsSection.css';

const ROW_1_APPS = [
  'hubspot',
  'zendesk',
  'asana',
  'salesforce',
  'slack',
  'gmail',
  'telegram',
  'chatgpt',
  'googlesheets',
  'discord',
  'notion',
  'claude',
  'github',
];

const ROW_2_APPS = [
  'whatsapp',
  'hubspot',
  'zendesk',
  'asana',
  'salesforce',
  'slack',
  'googlesheets',
  'discord',
  'notion',
  'chatgpt',
  'claude',
  'github',
  'airtable',
  'googledrive',
];

export default function DarkAIIntegrationsSection() {
  // Duplicate arrays to create a seamless infinite loop
  const row1List = [...ROW_1_APPS, ...ROW_1_APPS, ...ROW_1_APPS];
  const row2List = [...ROW_2_APPS, ...ROW_2_APPS, ...ROW_2_APPS];

  return (
    <section className="dark-ai-integrations-section" id="ai-integrations">
      <div className="dark-ai-container">
        {/* Heading & Subtitle matching the reference screenshot */}
        <div className="dark-ai-header">
          <h2 className="dark-ai-heading">
            Plug AI into your own data &amp; connect your favourite apps
          </h2>
          <p className="dark-ai-desc">
            Use pre-built nodes for common apps. Custom API connections for everything else.
          </p>
        </div>

        {/* Infinite Automated Scrolling Marquee with Left & Right Gradient Fades */}
        <div className="dark-ai-marquee-wrapper">
          <div className="dark-ai-marquee-fade-left" aria-hidden="true" />
          <div className="dark-ai-marquee-fade-right" aria-hidden="true" />

          {/* Row 1: Scrolling Left */}
          <div className="dark-ai-marquee-row">
            <div className="dark-ai-track scroll-left">
              {row1List.map((app, idx) => {
                const iconObj = getBrandIcon(app, { size: 28 });
                return (
                  <div key={`${app}-${idx}`} className="dark-ai-tile" title={app}>
                    {iconObj?.component}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 2: Scrolling Right (or offset left) */}
          <div className="dark-ai-marquee-row">
            <div className="dark-ai-track scroll-right">
              {row2List.map((app, idx) => {
                const iconObj = getBrandIcon(app, { size: 28 });
                return (
                  <div key={`${app}-${idx}`} className="dark-ai-tile" title={app}>
                    {iconObj?.component}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Black Pill CTA Button matching screenshot */}
        <div className="dark-ai-cta-wrap">
          <RollButton
            to="/integrations"
            variant="dark"
            size="md"
            showArrow={true}
          >
            Browse all integrations
          </RollButton>
        </div>
      </div>
    </section>
  );
}
