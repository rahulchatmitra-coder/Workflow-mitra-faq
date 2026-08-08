import * as React from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CREDENTIAL_PROVIDERS } from "@/data/credentials-data";
import ProviderGuideClient from "@/components/credentials/ProviderGuideClient";

export default function CredentialProviderPage() {
  const { providerId } = useParams<{ providerId: string }>();
  const provider = CREDENTIAL_PROVIDERS[(providerId ?? "").toLowerCase()];

  // If provider doesn't exist, redirect to 404 (equivalent to Next.js notFound())
  if (!provider) {
    return <Navigate to="/404" replace />;
  }

  const pageTitle = `How to Create & Connect ${provider.name} Credentials | Workflow Mitra`;
  const pageDescription = `Step-by-step interactive guide to set up and connect ${provider.name} (${provider.badge}) in Workflow Mitra. AES-256 encrypted vault integration.`;
  const canonicalUrl = `https://app.workflowmitra.com/credentials/${provider.id}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={[
            provider.name,
            `${provider.name} API Key`,
            `${provider.name} Credentials`,
            "Workflow Mitra Credentials",
            provider.badge,
            "Third-party integrations",
          ].join(", ")}
        />
        <meta property="og:title" content={`How to Create ${provider.name} Credentials in Workflow Mitra`} />
        <meta property="og:description" content={provider.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>
      <ProviderGuideClient provider={provider} />
    </>
  );
}
