import * as React from "react";
import {
  ArrowLeft,
  Sparkles,
  Play,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTextColor } from "@/context/TextColorContext";
import InteractivePlayer from "./InteractivePlayer";
import ProviderCardGrid from "./ProviderCardGrid";
import { OnboardingStep } from "@/data/credentials-data";

const credentialsSteps: OnboardingStep[] = [
 
  {
    image: "/credentials/step2.webp",
    title: "Select Service Provider",
    description:
      "Choose your target integration provider from the 35+ supported credentials modal list:\n\n• CRM & Sales: HubSpot, Zoho CRM, Pipedrive, Zoho Books\n• AI Models: OpenAI GPT-4o, Claude, Google Gemini, Groq, Ollama\n• Communication: WhatsApp Cloud API, Slack, Telegram, SMTP Mail\n• E-Commerce: Shopify, WooCommerce, Shiprocket\n• Meetings: Zoom, Cal.com, Whereby, Calendly, MS Teams\n• Databases & Support: PostgreSQL, MySQL, MongoDB, Redis, Zendesk, Intercom",
    addressUrl: "https://app.workflowmitra.com/credentials",
    hotspot: {
      target: "image" as const,
      top: "50%",
      left: "18%",
      popoverTop: "65%",
      popoverLeft: "45%",
      title: "Step 3: Select Service Provider (35+)",
      detail:
        "Scroll through the 35+ supported integrations modal list and click your desired service provider to generate API keys.",
    },
  },
  {
    image: "/credentials/step3.webp",
    title: "Enter API Key & Save",
    description:
      "Enter your API key or secret token. All credentials are encrypted at rest using AES-256.",
    addressUrl: "https://app.workflowmitra.com/credentials",
    hotspot: {
      target: "image" as const,
      top: "21%",
      left: "92%",
      popoverTop: "50%",
      popoverLeft: "18%",
      title: "Step 2: Select New Credential",
      detail: "Input your token and click 'Save Credential'.",
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
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-200 text-zinc-900 dark:text-zinc-100 pb-20">
      {/* BACK NAVIGATION BAR */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Help Center</span>
          </Link>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="mx-auto max-w-5xl px-4 pt-4 pb-8 sm:px-6 lg:px-8 space-y-10">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-zinc-100 px-3 py-0.5 text-xs font-bold text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
              <Sparkles className={`h-3.5 w-3.5 ${currentColor.textClass}`} /> 10+ Third-Party Integrations Guide
            </span>
            <h1 className="mt-1.5 text-xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              How to Create &amp; Manage <span className={currentColor.textClass}>Credentials</span> in Workflow Mitra
            </h1>
            <p className="mt-1 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Connect HubSpot, OpenAI, Claude, Slack, Telegram, Zoho CRM, Shopify, and 10+ integrations securely.
            </p>
          </div>

          <button
            onClick={() => setCurrentStepIndex(0)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-extrabold shadow-lg transition-all cursor-pointer border border-zinc-800 dark:border-zinc-200 shrink-0 ${currentColor.bgClass}`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Start Overview Guide</span>
            <Play className="h-3 w-3 fill-current ml-0.5" />
          </button>
        </div>

        {/* REUSABLE INTERACTIVE PLAYER */}
        <InteractivePlayer
          steps={credentialsSteps}
          currentStepIndex={currentStepIndex}
          onStepChange={(idx) => setCurrentStepIndex(idx)}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          defaultAddressUrl="https://app.workflowmitra.com/credentials"
          customButtonText="Create Credential 🚀"
          onCompleteAction={() => {
            document.getElementById("providers-grid")?.scrollIntoView({ behavior: "smooth" });
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
                <span>Thank you for your feedback! 🎉</span>
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
