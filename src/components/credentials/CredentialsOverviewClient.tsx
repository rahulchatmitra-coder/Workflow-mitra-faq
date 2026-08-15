import * as React from "react";
import {
  ArrowLeft,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTextColor } from "@/context/TextColorContext";
import InteractivePlayer from "./InteractivePlayer";
import ProviderCardGrid from "./ProviderCardGrid";
import { OnboardingStep, PROVIDER_LIST } from "@/data/credentials-data";

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
  const { currentColor } = useTextColor();
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0);
  const [feedbackGiven, setFeedbackGiven] = React.useState<boolean>(false);

  const handleNextStep = () => {
    setCurrentStepIndex((prev) => (prev + 1) % credentialsSteps.length);
  };

  const handlePrevStep = () => {
    setCurrentStepIndex((prev) => (prev - 1 + credentialsSteps.length) % credentialsSteps.length);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-200 text-zinc-900 dark:text-zinc-100 pb-20">
      {/* BACK NAVIGATION BAR */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 sticky top-0 z-30 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Help Center</span>
          </Link>
        </div>
      </div>

      {/* MAIN CONTAINER - WIDESCREEN MAX-W-7XL */}
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-8 sm:px-6 lg:px-8 space-y-10">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
              <Sparkles className={`h-3.5 w-3.5 ${currentColor.textClass}`} /> {PROVIDER_LIST.length}+ Third-Party Integrations Guide
            </span>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
              How to Create &amp; Manage <span className={currentColor.textClass}>Credentials</span> in Workflow Mitra
            </h1>
            <p className="mt-1 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Connect HubSpot, OpenAI, Claude, Slack, Telegram, Zoho CRM, Shopify, and {PROVIDER_LIST.length}+ integrations securely.
            </p>
          </div>
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
          customButtonText="Create Credential 🚀"
          onCompleteAction={() => {
            const el = document.getElementById("providers-grid");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />

        {/* REUSABLE PROVIDER CARD GRID */}
        <ProviderCardGrid />

        {/* FEEDBACK WIDGET */}
        <section className="pt-4">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-950 shadow-sm">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
              Was this Credentials Overview Guide helpful?
            </h4>

            {feedbackGiven ? (
              <div className="mt-3 flex items-center gap-2 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                <Sparkles className="h-4 w-4" />
                <span>Thank you for your feedback!</span>
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => setFeedbackGiven(true)}
                  className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-bold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Yes</span>
                </button>
                <button
                  onClick={() => setFeedbackGiven(true)}
                  className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-bold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>No</span>
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
