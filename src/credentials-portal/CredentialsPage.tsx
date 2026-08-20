import React, { useEffect } from "react";
import CredentialsOverviewClient from "./CredentialsOverviewClient";

export default function CredentialsPage() {
  useEffect(() => {
    document.title = "Credential Configuration Guides | Workflow Mitra Documentation";
    window.scrollTo(0, 0);
  }, []);

  return <CredentialsOverviewClient />;
}
