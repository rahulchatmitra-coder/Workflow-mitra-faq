import * as React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProviderGuideClient from "./ProviderGuideClient";
import { CREDENTIAL_PROVIDERS } from "@/data/credentials-data";

interface PageProps {
  params: Promise<{
    providerId: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { providerId } = await params;
  const provider = CREDENTIAL_PROVIDERS[providerId.toLowerCase()];

  if (!provider) {
    return {
      title: "Credential Provider Not Found | Workflow Mitra",
      description: "The requested integration credential guide could not be found.",
    };
  }

  return {
    title: `How to Create & Connect ${provider.name} Credentials | Workflow Mitra`,
    description: `Step-by-step interactive guide to set up and connect ${provider.name} (${provider.badge}) in Workflow Mitra. AES-256 encrypted vault integration.`,
    keywords: [
      provider.name,
      `${provider.name} API Key`,
      `${provider.name} Credentials`,
      "Workflow Mitra Credentials",
      provider.badge,
      "Third-party integrations",
    ],
    openGraph: {
      title: `How to Create ${provider.name} Credentials in Workflow Mitra`,
      description: provider.description,
      type: "article",
      url: `https://app.workflowmitra.com/credentials/${provider.id}`,
    },
  };
}

export default async function ProviderGuidePage({ params }: PageProps) {
  const { providerId } = await params;
  const provider = CREDENTIAL_PROVIDERS[providerId.toLowerCase()];

  if (!provider) {
    notFound();
  }

  return <ProviderGuideClient provider={provider} />;
}
