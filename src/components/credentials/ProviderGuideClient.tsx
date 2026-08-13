import * as React from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Maximize2,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Volume2,
  VolumeX,
  X,
  Building2,
  Bot,
  MessageSquare,
  ShoppingCart,
  Send,
  Calendar,
  CreditCard,
  Package,
  Mail,
  Zap,
  Cpu,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTextColor } from "@/context/TextColorContext";
import { CredentialProvider, PROVIDER_LIST } from "@/data/credentials-data";
import {
  Openai,
  Slack,
  WhatsappIcon,
  Shopify,
  Telegram,
  Discord,
  Google,
  GithubDark,
  Supabase,
  VercelDark,
  SanityDark,
  Postgresql,
  Mysql,
  Mongodb,
  Redis,
  Claude,
  Linkedin,
  HubSpotLogo,
  ZohoLogo,
  PipedriveLogo,
  WooCommerceLogo,
  ZohoBooksLogo,
  ShiprocketLogo,
  ZoomLogo,
  CalComLogo,
  WherebyLogo,
  CalendlyLogo,
  MSTeamsLogo,
  ZohoBookingsLogo,
  JitsiMeetLogo,
  CiscoWebexLogo,
  ZendeskLogo,
  FreshdeskLogo,
  FacebookLogo,
  SmtpLogo,
  GroqLogo,
  GeminiLogo,
  OllamaLogo,
  IntercomLogo,
  ZohoDeskLogo,
  GoogleSheetsLogo,
  GmailLogo,
} from "@/components/ui/svgs";
import { DIRECT_SVG_MAP, DirectSvgIcon } from "@/components/ui/svgs/DirectSvgIcon";
import InteractivePlayer from "./InteractivePlayer";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Bot,
  MessageSquare,
  ShoppingCart,
  Send,
  Calendar,
  CreditCard,
  Package,
  Mail,
  Zap,
  Sparkles,
  Cpu,
};

const BRAND_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  whatsapp: WhatsappIcon,
  smtp: SmtpLogo,
  groq: GroqLogo,
  gemini: GeminiLogo,
  claude: Claude,
  openai: Openai,
  ollama: OllamaLogo,
  slack: Slack,
  discord: Discord,
  telegram: Telegram,
  email: SmtpLogo,
  hubspot: HubSpotLogo,
  zohocrm: ZohoLogo,
  pipedrive: PipedriveLogo,
  shopify: Shopify,
  woocommerce: WooCommerceLogo,
  zohobooks: ZohoBooksLogo,
  shiprocket: ShiprocketLogo,
  zoom: ZoomLogo,
  calcom: CalComLogo,
  whereby: WherebyLogo,
  calendly: CalendlyLogo,
  msteams: MSTeamsLogo,
  teams: MSTeamsLogo,
  zohobookings: ZohoBookingsLogo,
  jitsimeet: JitsiMeetLogo,
  webex: CiscoWebexLogo,
  ciscowebex: CiscoWebexLogo,
  zendesk: ZendeskLogo,
  freshdesk: FreshdeskLogo,
  intercom: IntercomLogo,
  zohodesk: ZohoDeskLogo,
  linkedin: Linkedin,
  facebookpage: FacebookLogo,
  facebook: FacebookLogo,
  anthropic: Claude,
  postgresql: Postgresql,
  mysql: Mysql,
  mongo: Mongodb,
  redis: Redis,
  gmail: GmailLogo,
  googleoauth: Google,
  googleserviceaccount: GoogleSheetsLogo,
  googlesheets: GoogleSheetsLogo,
  google: Google,
  github: GithubDark,
  supabase: Supabase,
  vercel: VercelDark,
  sanity: SanityDark,
};

interface ProviderGuideClientProps {
  provider: CredentialProvider;
}

export default function ProviderGuideClient({ provider }: ProviderGuideClientProps) {
  const { currentColor } = useTextColor();
  const navigate = useNavigate();

  const [activeSubProviderId, setActiveSubProviderId] = React.useState<string>(
    provider.subProviders?.[0]?.id || ""
  );
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0);
  const [feedbackGiven, setFeedbackGiven] = React.useState<boolean>(false);
  const [isFullscreenModal, setIsFullscreenModal] = React.useState<boolean>(false);
  const [selectedImageModal, setSelectedImageModal] = React.useState<string>("");
  const [activeSpeakingIndex, setActiveSpeakingIndex] = React.useState<number | null>(null);

  const activeSubProvider = provider.subProviders?.find((s) => s.id === activeSubProviderId) || provider.subProviders?.[0];

  const effectiveName = activeSubProvider ? `${provider.name} (${activeSubProvider.name})` : provider.name;
  const effectiveBadge = activeSubProvider ? activeSubProvider.badge : provider.badge;
  const effectiveDescription = activeSubProvider ? activeSubProvider.description : provider.description;
  const effectiveAppUrl = activeSubProvider ? activeSubProvider.appUrl : provider.appUrl;
  const steps = activeSubProvider ? activeSubProvider.steps : provider.steps;

  React.useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setActiveSpeakingIndex(null);
    }
  }, [provider.id, activeSubProviderId]);

  const getBestVoice = (): SpeechSynthesisVoice | null => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const englishVoices = voices.filter((v) => v.lang.startsWith("en"));
    if (englishVoices.length === 0) return voices[0];

    const maleKeywords = [
      "Guy",
      "Daniel",
      "George",
      "Ryan",
      "Christopher",
      "James",
      "David",
      "Mark",
      "Oliver",
      "Arthur",
      "Brian",
      "Steffan",
      "Male",
      "Microsoft Guy",
      "Google US English",
    ];

    const preferredMaleVoice = englishVoices.find((v) =>
      maleKeywords.some((keyword) => v.name.toLowerCase().includes(keyword.toLowerCase()))
    );

    if (preferredMaleVoice) return preferredMaleVoice;

    const naturalVoice = englishVoices.find(
      (v) => v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Online")
    );
    if (naturalVoice) return naturalVoice;

    return (
      englishVoices.find((v) => v.lang === "en-US" || v.lang === "en-GB") ||
      englishVoices[0]
    );
  };

  const formatTextForSpeech = (text: string): string => {
    if (!text) return "";
    return text
      .replace(/https?:\/\/(www\.)?/gi, "")
      .replace(/\.com/gi, " dot com")
      .replace(/api/gi, "A P I")
      .replace(/crm/gi, "C R M")
      .replace(/•/g, ". ")
      .replace(/[\n\r]+/g, ". ")
      .replace(/[^\w\s.,'-]/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const handleSpeakCard = (stepIndex: number, stepTitle: string, stepDesc: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (activeSpeakingIndex === stepIndex) {
      window.speechSynthesis.cancel();
      setActiveSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = formatTextForSpeech(`${stepTitle}. ${stepDesc}`);

    const utterance = new SpeechSynthesisUtterance(textToRead);
    const bestVoice = getBestVoice();
    if (bestVoice) {
      utterance.voice = bestVoice;
    }
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.onend = () => setActiveSpeakingIndex(null);
    utterance.onerror = () => setActiveSpeakingIndex(null);

    setActiveSpeakingIndex(stepIndex);
    window.speechSynthesis.speak(utterance);
  };

  const handleNextStep = () => {
    setCurrentStepIndex((prev) => (prev + 1) % steps.length);
  };

  const handlePrevStep = () => {
    setCurrentStepIndex((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const ProviderIcon = DIRECT_SVG_MAP[provider.id.toLowerCase()]
    ? () => <DirectSvgIcon providerId={provider.id} className="h-5 w-5" />
    : BRAND_ICON_MAP[provider.id.toLowerCase()] || ICON_MAP[provider.iconName] || Send;

  return (
    <>
      <Helmet>
        <title>How to Connect {effectiveName} Credentials | Workflow Mitra Help Center</title>
        <meta
          name="description"
          content={`Step-by-step interactive guide to create and manage ${effectiveName} credentials in Workflow Mitra.`}
        />
        <meta property="og:url" content={`https://workflowmitra-docs.vercel.app/credentials/${provider.id}`} />
        <meta property="og:title" content={`How to Connect ${effectiveName} Credentials`} />
      </Helmet>

      <main className="min-h-screen bg-white dark:bg-black transition-colors duration-200 text-zinc-900 dark:text-zinc-100 pb-20">
        {/* BACK NAVIGATION BAR */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 sticky top-0 z-30 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link
              to="/credentials"
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to All Credentials</span>
            </Link>

            <a
              href={effectiveAppUrl}
              target="_blank"
              rel="noreferrer"
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm transition-all cursor-pointer ${currentColor.bgClass}`}
            >
              <span>Open {provider.name} Console</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* MAIN CONTAINER */}
        <div className="mx-auto max-w-7xl px-4 pt-6 pb-8 sm:px-6 lg:px-8 space-y-8">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="w-full">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
                  {DIRECT_SVG_MAP[provider.id.toLowerCase()] ? (
                    <DirectSvgIcon providerId={provider.id} className="h-4 w-4 shrink-0" />
                  ) : (
                    <ProviderIcon className={`h-4 w-4 shrink-0 ${currentColor.textClass}`} />
                  )}
                  {effectiveBadge}
                </span>
                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500">
                  • {provider.category}
                </span>
              </div>
              <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                How to Create &amp; Connect <span className={currentColor.textClass}>{effectiveName}</span> Credentials
              </h1>
              <p className="mt-1 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {effectiveDescription}
              </p>

              {/* INSIDE PROVIDER SELECTOR BOXES FOR WHATSAPP */}
              {provider.subProviders && provider.subProviders.length > 0 && (
                <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-xs">
                  <label className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-2.5">
                    Choose your {provider.name} Provider / Gateway:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                    {provider.subProviders.map((sub) => {
                      const isSelected = (activeSubProvider?.id || provider.subProviders![0].id) === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setActiveSubProviderId(sub.id);
                            setCurrentStepIndex(0);
                          }}
                          className={`flex flex-col items-center justify-center text-center p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? `${currentColor.bgClass} text-white border-transparent shadow-md ring-2 ring-zinc-500/30 scale-[1.02]`
                              : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800"
                          }`}
                        >
                          <span className="font-extrabold text-sm">{sub.name}</span>
                          <span className={`text-[10px] mt-0.5 opacity-80 ${isSelected ? "text-white" : "text-zinc-500 dark:text-zinc-400"}`}>
                            {sub.badge.split(" ")[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* REUSABLE INTERACTIVE PLAYER */}
          <InteractivePlayer
            steps={steps}
            currentStepIndex={currentStepIndex}
            onStepChange={(idx) => setCurrentStepIndex(idx)}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            defaultAddressUrl={effectiveAppUrl}
            externalAppUrl={effectiveAppUrl}
            providerName={effectiveName}
          />

          {/* POINT-BY-POINT INSTRUCTION CARDS */}
          <section className="space-y-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Detailed Step-by-Step Instructions (<span className={currentColor.textClass}>{effectiveName}</span>)
              </h2>
              <p className="mt-1 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Follow these exact steps to connect {effectiveName} with Workflow Mitra.
              </p>
            </div>

            <div className="space-y-6">
              {steps.map((s, idx) => (
                <div
                  key={idx}
                  className="group rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-all hover:shadow-lg"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-center">
                    <div
                      className="lg:col-span-7 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-md cursor-pointer relative group/img"
                      onClick={() => {
                        setSelectedImageModal(s.image);
                        setIsFullscreenModal(true);
                      }}
                    >
                      <div className="relative aspect-[16/10] w-full">
                        <img
                          src={s.image}
                          alt={`Step ${idx + 1}: ${s.title}`}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-300 group-hover/img:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="flex items-center gap-1.5 rounded-full bg-zinc-900/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-white border border-zinc-700 shadow-lg">
                            <Maximize2 className="h-3.5 w-3.5" /> Click to Expand
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 space-y-3.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`flex h-8 w-8 items-center justify-center rounded-xl font-black text-sm shadow-md shrink-0 text-white ${currentColor.bgClass}`}>
                            {idx + 1}
                          </span>
                          <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white leading-tight">
                            {s.title}
                          </h3>
                        </div>

                        <button
                          onClick={() => handleSpeakCard(idx, s.title, s.description)}
                          aria-label={activeSpeakingIndex === idx ? "Stop step voiceover" : "Listen to step voiceover"}
                          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all cursor-pointer border shrink-0 ${
                            activeSpeakingIndex === idx
                              ? `${currentColor.bgClass} text-white shadow-md border-transparent animate-pulse`
                              : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                          }`}
                          title={activeSpeakingIndex === idx ? "Stop Voiceover" : "Listen to Step Voiceover"}
                        >
                          {activeSpeakingIndex === idx ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                          <span className="hidden sm:inline">{activeSpeakingIndex === idx ? "Stop" : "Listen"}</span>
                        </button>
                      </div>

                      <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800/80 space-y-3">
                        <div className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                          {s.description}
                        </div>

                        {s.hotspot.detail && (
                          <div className="pt-2 flex items-center gap-2">
                            <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 ${currentColor.textClass}`} />
                            <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                              {s.hotspot.detail}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FEEDBACK WIDGET */}
          <section className="pt-4">
            <div className="flex flex-col items-center justify-center rounded-3xl border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-950 shadow-sm">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                Was this {effectiveName} Guide helpful?
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

        {/* FULLSCREEN LIGHTBOX MODAL */}
        <AnimatePresence>
          {isFullscreenModal && selectedImageModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 p-4 sm:p-6 backdrop-blur-xl"
              onClick={() => setIsFullscreenModal(false)}
            >
              <div className="w-full max-w-7xl flex items-center justify-between z-50 text-white pb-2">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${currentColor.bgClass}`} />
                  <span className="text-sm sm:text-base font-black text-white">
                    {effectiveName} Step Screenshot Preview
                  </span>
                </div>

                <button
                  onClick={() => setIsFullscreenModal(false)}
                  className="rounded-full bg-zinc-800/90 p-2 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer border border-zinc-700 shadow-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative flex-1 w-full max-w-7xl my-2 flex items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-2">
                <img
                  src={selectedImageModal}
                  alt={`${effectiveName} Screenshot`}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
