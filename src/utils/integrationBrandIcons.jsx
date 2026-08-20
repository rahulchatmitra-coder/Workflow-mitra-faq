import {
  SiDeepseek, SiHubspot, SiZendesk, SiAsana, SiGmail, SiGooglesheets,
  SiDiscord, SiNotion, SiStripe, SiGithub, SiJira, SiAirtable, SiWhatsapp, SiMake, SiZapier,
} from 'react-icons/si'
import { FaSalesforce, FaSlack } from 'react-icons/fa'

function OpenAIIcon({ size = 32, color = '#10A37F' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073z" />
    </svg>
  )
}

const INTEGRATION_ICONS = {
  deepseekai: { icon: SiDeepseek, color: '#4d6bfe' },
  openaichatgpt: { icon: OpenAIIcon, color: '#10A37F' },
  openai: { icon: OpenAIIcon, color: '#10A37F' },
  hubspotcrm: { icon: SiHubspot, color: '#FF7A59' },
  hubspot: { icon: SiHubspot, color: '#FF7A59' },
  zendesk: { icon: SiZendesk, color: '#03363D' },
  asana: { icon: SiAsana, color: '#273347' },
  salesforce: { icon: FaSalesforce, color: '#00A1E0' },
  slack: { icon: FaSlack, color: '#4A154B' },
  gmail: { icon: SiGmail, color: '#EA4335' },
  googlesheets: { icon: SiGooglesheets, color: '#0F9D58' },
  discord: { icon: SiDiscord, color: '#5865F2' },
  notion: { icon: SiNotion, color: '#000000' },
  stripe: { icon: SiStripe, color: '#635BFF' },
  github: { icon: SiGithub, color: '#181717' },
  jira: { icon: SiJira, color: '#0052CC' },
  airtable: { icon: SiAirtable, color: '#18BFFF' },
  whatsapp: { icon: SiWhatsapp, color: '#25D366' },
  make: { icon: SiMake, color: '#6F2CFF' },
  zapier: { icon: SiZapier, color: '#FF4A00' },
}

export function getIntegrationBrandIcon(name, props = {}) {
  const data = INTEGRATION_ICONS[name.toLowerCase().replace(/[^a-z0-9]/g, '')]
  if (!data) return null

  const IconComponent = data.icon
  return {
    component: <IconComponent {...props} color={props.color || data.color} />,
    color: data.color,
  }
}
