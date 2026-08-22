import {
  SiHubspot, SiGmail, SiGooglesheets, SiGoogledrive,
  SiDiscord, SiNotion, SiStripe, SiGithub, SiJira, SiAirtable,
  SiZendesk, SiAsana, SiMailchimp, SiMeta,
  SiTypeform, SiCalendly, SiZapier, SiTrello,
  SiAtlassian, SiVercel, SiSentry, SiCircleci, SiIntercom,
  SiHelpscout, SiOkta, SiAuth0, SiDatadog, SiPagerduty,
  SiSplunk, SiGoogle, SiGooglecalendar, SiGooglemeet, SiLinear,
  SiDropbox, SiFigma,
  SiShopify, SiWoo, SiMailgun, SiMixpanel, SiZoom,
  SiSnowflake, SiMiro,
  SiWebflow, SiApollographql,
  SiTelegram, SiWhatsapp,
  SiRazorpay, SiZoho, SiMongodb, SiGooglegemini, SiAnthropic, SiFacebook,
  SiPostgresql, SiMysql, SiRedis
} from 'react-icons/si';

import { 
  FaSalesforce, FaAws, FaSlack, FaLinkedin, FaMicrosoft, 
  FaCommentAlt, FaEnvelope, FaPhoneAlt 
} from 'react-icons/fa';

import { TbBrandOpenai } from 'react-icons/tb';

import { OpenAI, Claude, DeepSeek } from '@lobehub/icons';

export const AsanaIcon = ({ size = 28, color = '#F06A6A', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ color }}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="12" cy="6.5" r="3.6" />
    <circle cx="6.2" cy="16.5" r="3.6" />
    <circle cx="17.8" cy="16.5" r="3.6" />
  </svg>
);

export const ChatGPTIcon = ({ size = 28, color = '#000000', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ color }}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.98 4.182a5.985 5.985 0 0 0-3.997 2.9 6.046 6.046 0 0 0 .742 7.097 5.98 5.98 0 0 0 .511 4.91 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.998-2.9 6.056 6.056 0 0 0-.748-7.073zM13.26 22.43a4.475 4.475 0 0 1-2.876-1.04l.141-.08 4.779-2.76a.795.795 0 0 0 .393-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.505 4.505 0 0 1-4.495 4.495zm-9.66-4.125a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.758a.771.771 0 0 0 .78 0l5.843-3.368v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.814 3.354-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387 2.015-1.164a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.104v-5.677a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.41 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zM8.307 12.863l-2.02-1.163a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.376-3.454l-.142.08-4.78 2.758a.795.795 0 0 0-.392.682zm1.097-2.365l2.602-1.5 2.607 1.5v3l-2.597 1.5-2.607-1.5z" />
  </svg>
);

export const ClaudeIcon = ({ size = 28, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 509.64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    {...props}
  >
    <path
      fill="#D77655"
      d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.612-115.613 115.612H115.612C52.026 509.639 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"
    />
    <path
      fill="#FCF2EE"
      fillRule="nonzero"
      d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474-.101.102.024.101z"
    />
  </svg>
);

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
  asana: { icon: AsanaIcon, color: '#F06A6A' },
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
  googledrive: { icon: SiGoogledrive, color: '#4285F4' },
  'google drive': { icon: SiGoogledrive, color: '#4285F4' },
  googlecalendar: { icon: SiGooglecalendar, color: '#4285F4' },
  'google calendar': { icon: SiGooglecalendar, color: '#4285F4' },
  'google meet': { icon: SiGooglemeet, color: '#00897B' },
  outlook: { icon: FaMicrosoft, color: '#0078D4' },
  openai: { icon: ChatGPTIcon, color: '#000000' },
  openaichatgpt: { icon: ChatGPTIcon, color: '#000000' },
  chatgpt: { icon: ChatGPTIcon, color: '#000000' },
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
  gong: { icon: FaPhoneAlt, color: '#FF4F79' },
  telegram: { icon: SiTelegram, color: '#26A5E4' },
  whatsapp: { icon: SiWhatsapp, color: '#25D366' },

  // Hero clusters. Colours are the product's own, verbatim from the editor's
  // node registry — WhatsApp green, Zoho red, Slack aubergine and so on.
  razorpay: { icon: SiRazorpay, color: '#0C2451' },
  zoho: { icon: SiZoho, color: '#E42527' },
  zohocrm: { icon: SiZoho, color: '#E42527' },
  zohobooks: { icon: SiZoho, color: '#E42527' },
  mongodb: { icon: SiMongodb, color: '#47A248' },
  googlegemini: { icon: SiGooglegemini, color: '#8E75B2' },
  gemini: { icon: SiGooglegemini, color: '#8E75B2' },
  anthropic: { icon: ClaudeIcon, color: '#CC785C' },
  claude: { icon: ClaudeIcon, color: '#CC785C' },
  facebook: { icon: SiFacebook, color: '#0866FF' },
  googlemeet: { icon: SiGooglemeet, color: '#00897B' },

  // Database nodes. The engine ships one for each of these, so the AI
  // section's integration grid can claim them honestly.
  postgresql: { icon: SiPostgresql, color: '#4169E1' },
  postgres: { icon: SiPostgresql, color: '#4169E1' },
  mysql: { icon: SiMysql, color: '#4479A1' },
  redis: { icon: SiRedis, color: '#DC382D' }
};

export function getBrandIcon(name, props = {}) {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const data = BRAND_ICONS[normalized];
  if (!data) return null;
  const IconComponent = data.icon;
  const iconColor = props.color || data.color;
  return {
    component: <IconComponent {...props} color={iconColor} style={{ color: iconColor, ...props.style }} />,
    color: iconColor
  };
}
