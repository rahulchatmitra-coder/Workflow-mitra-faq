import {
  SiHubspot, SiGmail, SiGooglesheets, 
  SiDiscord, SiNotion, SiStripe, SiGithub, SiJira, SiAirtable, 
  SiZendesk, SiAsana, SiMailchimp, SiMeta, 
  SiTypeform, SiCalendly, SiZapier, SiTrello, 
  SiAtlassian, SiVercel, SiSentry, SiCircleci, SiIntercom, 
  SiHelpscout, SiOkta, SiAuth0, SiDatadog, SiPagerduty, 
  SiSplunk, SiGoogle, SiGooglecalendar, SiGooglemeet, SiLinear,
  SiDropbox, SiFigma,
  SiShopify, SiWoo, SiMailgun, SiMixpanel, SiZoom,
  SiSnowflake, SiMiro,
  SiWebflow, SiApollographql
} from 'react-icons/si';

import { 
  FaSalesforce, FaAws, FaSlack, FaLinkedin, FaMicrosoft, 
  FaCommentAlt, FaEnvelope, FaPhoneAlt 
} from 'react-icons/fa';

import { TbBrandOpenai } from 'react-icons/tb';

import { OpenAI, DeepSeek } from '@lobehub/icons';

const BRAND_ICONS = {
  hubspot: { icon: SiHubspot, color: '#FF7A59' },
  hubspotcrm: { icon: SiHubspot, color: '#FF7A59' },
  salesforce: { icon: FaSalesforce, color: '#00A1E0' },
  slack: { icon: FaSlack, color: '#4A154B' },
  gmail: { icon: SiGmail, color: '#EA4335' },
  googlesheets: { icon: SiGooglesheets, color: '#0F9D58' },
  'google sheets': { icon: SiGooglesheets, color: '#0F9D58' },
  discord: { icon: SiDiscord, color: '#5865F2' },
  notion: { icon: SiNotion, color: '#000000' },
  stripe: { icon: SiStripe, color: '#635BFF' },
  github: { icon: SiGithub, color: '#181717' },
  jira: { icon: SiJira, color: '#0052CC' },
  airtable: { icon: SiAirtable, color: '#18BFFF' },
  zendesk: { icon: SiZendesk, color: '#03363D' },
  asana: { icon: SiAsana, color: '#273347' },
  mailchimp: { icon: SiMailchimp, color: '#FFE01B' },
  meta: { icon: SiMeta, color: '#0668E1' },
  linkedin: { icon: FaLinkedin, color: '#0A66C2' },
  typeform: { icon: SiTypeform, color: '#262627' },
  calendly: { icon: SiCalendly, color: '#006BFF' },
  zapier: { icon: SiZapier, color: '#FF4A00' },
  trello: { icon: SiTrello, color: '#0052CC' },
  atlassian: { icon: SiAtlassian, color: '#0052CC' },
  vercel: { icon: SiVercel, color: '#000000' },
  sentry: { icon: SiSentry, color: '#362D59' },
  circleci: { icon: SiCircleci, color: '#343434' },
  intercom: { icon: SiIntercom, color: '#0058FF' },
  helpscout: { icon: SiHelpscout, color: '#1292EE' },
  okta: { icon: SiOkta, color: '#007DC1' },
  auth0: { icon: SiAuth0, color: '#EB5424' },
  datadog: { icon: SiDatadog, color: '#632CA6' },
  pagerduty: { icon: SiPagerduty, color: '#06C167' },
  splunk: { icon: SiSplunk, color: '#000000' },
  aws: { icon: FaAws, color: '#FF9900' },
  google: { icon: SiGoogle, color: '#4285F4' },
  googleads: { icon: SiGoogle, color: '#4285F4' },
  webflow: { icon: SiWebflow, color: '#4353FF' },
  'google calendar': { icon: SiGooglecalendar, color: '#4285F4' },
  'google meet': { icon: SiGooglemeet, color: '#00897B' },
  openai: { icon: OpenAI, color: OpenAI.colorPrimary || '#10A37F' },
  openaichatgpt: { icon: OpenAI, color: OpenAI.colorPrimary || '#10A37F' },
  deepseek: { icon: DeepSeek.Color, color: DeepSeek.colorPrimary || '#4D6BFE' },
  deepseekai: { icon: DeepSeek.Color, color: DeepSeek.colorPrimary || '#4D6BFE' },
  linear: { icon: SiLinear, color: '#5E6AD2' },
  twilio: { icon: FaCommentAlt, color: '#F22F46' },
  sendgrid: { icon: FaEnvelope, color: '#009DD9' },
  dropbox: { icon: SiDropbox, color: '#0061FE' },
  figma: { icon: SiFigma, color: '#F24E1E' },
  shopify: { icon: SiShopify, color: '#7AB55C' },
  woocommerce: { icon: SiWoo, color: '#96588A' },
  mailgun: { icon: SiMailgun, color: '#DD382D' },
  mixpanel: { icon: SiMixpanel, color: '#7856FF' },
  zoom: { icon: SiZoom, color: '#2D8CFF' },
  msteams: { icon: FaMicrosoft, color: '#6264A7' },
  'microsoft 365': { icon: FaMicrosoft, color: '#D83B01' },
  snowflake: { icon: SiSnowflake, color: '#29B5E8' },
  miro: { icon: SiMiro, color: '#050038' },
  apollo: { icon: SiApollographql, color: '#311C87' },
  gong: { icon: FaPhoneAlt, color: '#FF4F79' }
};

export function getBrandIcon(name, props = {}) {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const data = BRAND_ICONS[normalized];
  if (!data) return null;
  const IconComponent = data.icon;
  return {
    component: <IconComponent {...props} color={props.color || data.color} />,
    color: data.color
  };
}
