import { Helmet } from "react-helmet-async";
import CredentialsOverviewClient from "@/components/credentials/CredentialsOverviewClient";

export default function CredentialsPage() {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Credential Configuration Guides | Workflow Mitra Documentation</title>
        <meta
          name="description"
          content="Step-by-step guides for configuring API credentials for HubSpot, OpenAI, Slack, WhatsApp, and 30+ integrations in Workflow Mitra."
        />
        <link rel="canonical" href="https://workflowmitra-docs.vercel.app/credentials" />
        <meta property="og:url" content="https://workflowmitra-docs.vercel.app/credentials" />
        <meta property="og:title" content="Credential Configuration Guides | Workflow Mitra" />
        <meta property="og:type" content="website" />
      </Helmet>
      <CredentialsOverviewClient />
    </>
  );
}
