import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { CREDENTIAL_PROVIDERS } from "./credentials-data";
import ProviderGuideClient from "./ProviderGuideClient";

// Provider ID Aliases mapping to ensure smooth navigation without 404s
const PROVIDER_ALIASES: Record<string, string> = {
  zoho: "zohocrm",
  ciscowebex: "webex",
  email: "smtp",
  emailsmtp: "smtp",
  "email-smtp": "smtp",
  mail: "smtp",
  "smtp-mail": "smtp",
  sheets: "googleserviceaccount",
  "google-sheets": "googleserviceaccount",
  "googlesheets": "googleserviceaccount",
  "google-service-account": "googleserviceaccount",
  "google_service_account": "googleserviceaccount",
  google: "googleoauth",
  "google-auth": "googleoauth",
  "google_auth": "googleoauth",
  "googleauth": "googleoauth",
  "google-oauth": "googleoauth",
  "google_oauth": "googleoauth",
  teams: "msteams",
  facebook: "facebookpage",
  mongo: "mongodb",
};

export default function CredentialProviderPage() {
  const { providerId } = useParams<{ providerId: string }>();
  const normalizedId = (providerId ?? "").toLowerCase();
  const resolvedId = PROVIDER_ALIASES[normalizedId] || normalizedId;
  const provider = CREDENTIAL_PROVIDERS[resolvedId];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (provider) {
      document.title = `How to Create & Connect ${provider.name} Credentials | Workflow Mitra`;
    }
  }, [provider]);

  // If provider doesn't exist, redirect to /credentials
  if (!provider) {
    return <Navigate to="/credentials" replace />;
  }

  return <ProviderGuideClient provider={provider} />;
}
