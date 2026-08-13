import {
  SiFacebook, SiGooglegemini, SiHubspot, SiWhatsapp, SiGooglesheets,
  SiTelegram, SiShopify, SiRazorpay, SiZoho, SiStripe, SiWoo,
  SiGmail, SiAnthropic, SiZendesk, SiDiscord, SiCalendly,
  SiZoom, SiMongodb, SiGooglemeet,
} from 'react-icons/si'
import { FaSlack } from 'react-icons/fa'

const HERO_BRAND_ICONS = {
  facebook: { icon: SiFacebook, color: '#0866FF' },
  googlegemini: { icon: SiGooglegemini, color: '#8E75B2' },
  hubspot: { icon: SiHubspot, color: '#FF7A59' },
  whatsapp: { icon: SiWhatsapp, color: '#25D366' },
  googlesheets: { icon: SiGooglesheets, color: '#0F9D58' },
  telegram: { icon: SiTelegram, color: '#26A5E4' },
  shopify: { icon: SiShopify, color: '#7AB55C' },
  razorpay: { icon: SiRazorpay, color: '#0C2451' },
  zoho: { icon: SiZoho, color: '#E42527' },
  stripe: { icon: SiStripe, color: '#635BFF' },
  woocommerce: { icon: SiWoo, color: '#96588A' },
  gmail: { icon: SiGmail, color: '#EA4335' },
  anthropic: { icon: SiAnthropic, color: '#191919' },
  slack: { icon: FaSlack, color: '#4A154B' },
  zendesk: { icon: SiZendesk, color: '#03363D' },
  discord: { icon: SiDiscord, color: '#5865F2' },
  calendly: { icon: SiCalendly, color: '#006BFF' },
  zoom: { icon: SiZoom, color: '#2D8CFF' },
  mongodb: { icon: SiMongodb, color: '#47A248' },
  googlemeet: { icon: SiGooglemeet, color: '#00897B' },
}

export function getHeroBrandIcon(name, props = {}) {
  const data = HERO_BRAND_ICONS[name.toLowerCase().replace(/[^a-z0-9]/g, '')]
  if (!data) return null

  const IconComponent = data.icon
  return {
    component: <IconComponent {...props} color={props.color || data.color} />,
    color: data.color,
  }
}
