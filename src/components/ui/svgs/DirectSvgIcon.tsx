import React from "react";

export const DIRECT_SVG_MAP: Record<string, string> = {
  groq: "/svg/groq.svg",
  hubspot: "/svg/hubspot-icon.svg",
  shopify: "/svg/shopify.svg",
  zoho: "/svg/zoho.svg",
  zohocrm: "/svg/zoho.svg",
  zohobooks: "/svg/zoho.svg",
  zohodesk: "/svg/zoho.svg",
  zohobookings: "/svg/zoho.svg",
  woocommerce: "/svg/woocommerce-icon.svg",
  shiprocket: "/svg/shiprocket-icon.svg",
  zoom: "/svg/zoom-meetings-icon.svg",
  calcom: "/svg/cal-com-icon.svg",
  calendly: "/svg/calendly-icon.svg",
  msteams: "/svg/microsoft-teams-icon.svg",
  teams: "/svg/microsoft-teams-icon.svg",
  jitsimeet: "/svg/jitsi-icon.svg",
  jitsi: "/svg/jitsi-icon.svg",
  webex: "/svg/Webex--Streamline-Simple-Icons.svg",
  ciscowebex: "/svg/Webex--Streamline-Simple-Icons.svg",
  zendesk: "/svg/Zendesk-Icon--Streamline-Svg-Logos.svg",
  freshdesk: "/svg/freshdesk-icon.svg",
  intercom: "/svg/intercom-icon-svgrepo-com.svg",
  mysql: "/svg/mysql-icon.svg",
  ollama: "/svg/ollama-icon.svg",
  gmail: "/svg/gmail.svg",
  smtp: "/svg/gmail.svg",
  email: "/svg/gmail.svg",
  googlesheets: "/svg/icons8-google-sheets.svg",
  googleserviceaccount: "/svg/icons8-google-sheets.svg",
};

interface DirectSvgIconProps {
  providerId: string;
  className?: string;
  alt?: string;
}

export function DirectSvgIcon({ providerId, className = "h-6 w-6", alt = "" }: DirectSvgIconProps) {
  const src = DIRECT_SVG_MAP[providerId.toLowerCase()];
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt || providerId}
      className={`${className} object-contain shrink-0`}
      loading="eager"
    />
  );
}
