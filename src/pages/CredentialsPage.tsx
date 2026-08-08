import { Helmet } from "react-helmet-async";
import CredentialsOverviewClient from "@/components/credentials/CredentialsOverviewClient";

export default function CredentialsPage() {
  return (
    <>
      <Helmet>
        <title>Credentials Vault | Workflow Mitra Help Center</title>
        <meta
          name="description"
          content="Step-by-step guides to set up and connect credentials in Workflow Mitra. Connect HubSpot, OpenAI, Slack, and 10+ integrations securely."
        />
        <meta property="og:url" content="https://workflowmitra-docs.vercel.app/credentials" />
        <meta property="og:title" content="Credentials Vault | Workflow Mitra Help Center" />
      </Helmet>
      <CredentialsOverviewClient />
    </>
  );
}
