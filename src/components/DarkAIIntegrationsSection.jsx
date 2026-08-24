import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
        <motion.div 
          className="dark-ai-header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="dark-ai-heading">
            Plug AI into your own data &amp; connect your favourite apps
          </h2>
          <p className="dark-ai-desc">
            Use pre-built nodes for common apps. Custom API connections for everything else.
          </p>
        </motion.div>

        {/* Infinite Automated Scrolling Marquee with Left & Right Gradient Fades */}
        <motion.div 
          className="dark-ai-marquee-wrapper"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
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
        </motion.div>

        {/* Black Pill CTA Button matching screenshot */}
        <motion.div 
          className="dark-ai-cta-wrap"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RollButton
            to="/integrations"
            variant="dark"
            size="md"
            showArrow={true}
            className="dark-ai-btn"
          >
            Browse all integrations
          </RollButton>
        </motion.div>
      </div>
    </section>
  );
}
