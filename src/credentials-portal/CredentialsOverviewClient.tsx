import React, { useState } from "react";
import {
  ArrowLeft,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import InteractivePlayer from "./InteractivePlayer";
import ProviderCardGrid from "./ProviderCardGrid";
import { OnboardingStep, PROVIDER_LIST } from "./credentials-data";

const credentialsSteps: OnboardingStep[] = [
  {
    image: "/credentials/step2.webp",
    title: "Step 1: Select Integration Provider",
    description:
      `Navigate to Workflow Mitra Credentials Vault at https://app.workflowmitra.com/credentials and click '+ New credential'. Scroll through the ${PROVIDER_LIST.length}+ supported integration providers modal and select your target service:\n\n• CRM & Sales: HubSpot, Zoho CRM, Pipedrive, Zoho Books\n• AI Models: OpenAI GPT-4o, Anthropic Claude, Google Gemini, Groq, Ollama\n• Communication: WhatsApp Cloud API, Slack, Telegram, SMTP Mail\n• E-Commerce: Shopify, WooCommerce, Shiprocket\n• Meetings: Zoom, Cal.com, Whereby, Calendly, MS Teams, Jitsi\n• Databases & Support: PostgreSQL, MySQL, MongoDB, Redis, Zendesk, Intercom`,
    addressUrl: "https://app.workflowmitra.com/credentials",
    hotspot: {
      target: "image" as const,
      top: "47%",
      left: "13%",
      popoverTop: "65%",
      popoverLeft: "45%",
      title: "Step 1: Select Provider (30+)",
      detail:
        `Click your desired integration provider from the ${PROVIDER_LIST.length}+ supported services modal list.`,
    },
  },
  {
    image: "/credentials/step3.webp",
    title: "Step 2: Enter API Key & Save Credential",
    description:
      "In the credential setup modal, enter a memorable Credential Name (e.g. 'Production OpenAI Key') and paste your secret API Key, Access Token, or OAuth credentials. All keys are encrypted at rest using enterprise AES-256 encryption. Click the black 'Save credential' button to finish.",
    addressUrl: "https://app.workflowmitra.com/credentials",
    hotspot: {
      target: "image" as const,
      top: "21%",
      left: "92%",
      popoverTop: "50%",
      popoverLeft: "18%",
      title: "Step 2: Save Credential 🔐",
      detail: "Enter your API key or secret token and click 'Save credential'.",
    },
  },
];

export default function CredentialsOverviewClient() {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [feedbackGiven, setFeedbackGiven] = useState<boolean>(false);

  const handleNextStep = () => {
    setCurrentStepIndex((prev) => (prev + 1) % credentialsSteps.length);
  };

  const handlePrevStep = () => {
    setCurrentStepIndex((prev) => (prev - 1 + credentialsSteps.length) % credentialsSteps.length);
  };

  const handleBackToHelpCenter = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#09090b", fontFamily: "'Geist Sans', 'Inter', sans-serif" }}>
      {/* BACK NAVIGATION BAR */}
      <div style={{ borderBottom: "1px solid #e4e4e7", background: "#fafafa", position: "sticky", top: 0, zIndex: 30 }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "12px 24px" }}>
          <button
            onClick={handleBackToHelpCenter}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#3f3f46",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            className="hover:text-black"
          >
            <ArrowLeft size={16} />
            <span>Back to Help Center</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "36px 24px", display: "flex", flexDirection: "column", gap: "40px" }}>
        
        {/* HEADER */}
        <div style={{ borderBottom: "1px solid #e4e4e7", paddingBottom: "24px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              borderRadius: "9999px",
              border: "1px solid #d4d4d8",
              background: "#f4f4f5",
              padding: "4px 14px",
              fontSize: "11.5px",
              fontWeight: 800,
              color: "#09090b",
            }}
          >
            <Sparkles size={13} color="#09090b" />
            <span>{PROVIDER_LIST.length}+ Third-Party Integrations Guide</span>
          </span>

          <h1 style={{ fontSize: "32px", fontWeight: 900, letterSpacing: "-0.025em", color: "#09090b", margin: "12px 0 6px" }}>
            How to Create &amp; Manage Credentials in Workflow Mitra
          </h1>

          <p style={{ fontSize: "15px", color: "#71717a", margin: 0, fontWeight: 500 }}>
            Connect HubSpot, OpenAI, Claude, Slack, Telegram, Zoho CRM, Shopify, and {PROVIDER_LIST.length}+ integrations securely.
          </p>
        </div>

        {/* REUSABLE INTERACTIVE PLAYER - FULL WIDESCREEN TV FRAME */}
        <InteractivePlayer
          steps={credentialsSteps}
          currentStepIndex={currentStepIndex}
          onStepChange={(idx) => setCurrentStepIndex(idx)}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          defaultAddressUrl="https://app.workflowmitra.com/credentials"
          providerName="Workflow Mitra"
          onCompleteAction={() => {
            const el = document.getElementById("providers-grid");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />

        {/* REUSABLE PROVIDER CARD GRID */}
        <div id="providers-grid">
          <ProviderCardGrid />
        </div>

        {/* FEEDBACK WIDGET */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "24px",
            border: "1px solid #e4e4e7",
            background: "#f8fafc",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#09090b", margin: 0 }}>
            Was this Credentials Overview Guide helpful?
          </h4>

          {feedbackGiven ? (
            <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 800, color: "#059669" }}>
              <Sparkles size={16} />
              <span>Thank you for your feedback! 🎉</span>
            </div>
          ) : (
            <div style={{ marginTop: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                type="button"
                onClick={() => setFeedbackGiven(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 18px",
                  borderRadius: "12px",
                  border: "1px solid #d4d4d8",
                  background: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#09090b",
                  cursor: "pointer",
                }}
              >
                <ThumbsUp size={14} />
                <span>Yes</span>
              </button>
              <button
                type="button"
                onClick={() => setFeedbackGiven(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 18px",
                  borderRadius: "12px",
                  border: "1px solid #d4d4d8",
                  background: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#09090b",
                  cursor: "pointer",
                }}
              >
                <ThumbsDown size={14} />
                <span>No</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
