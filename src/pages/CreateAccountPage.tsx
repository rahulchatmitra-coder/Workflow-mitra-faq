import * as React from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Maximize2,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  CheckCircle2,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTextColor } from "@/context/TextColorContext";
import InteractivePlayer from "@/components/credentials/InteractivePlayer";
import { OnboardingStep } from "@/data/credentials-data";

export const onboardingGuide: OnboardingStep[] = [
  {
    image: "/onboarding/step1.webp",
    title: "Step 1: Open Workflow Mitra Portal",
    description:
      "Open your preferred web browser (Google Chrome, Safari, Firefox, Edge).\n\nType https://app.workflowmitra.com into the address bar and press Enter.",
    addressUrl: "https://app.workflowmitra.com",
    hotspot: {
      target: "image",
      top: "4.2%",
      left: "24.5%",
      popoverTop: "38%",
      popoverLeft: "50%",
      title: "Step 1: Open Address Bar",
      detail: "Type https://app.workflowmitra.com into your browser address bar and press Enter.",
    },
  },
  {
    image: "/onboarding/step2.webp",
    title: "Step 2: Click 'Create Account' Link",
    description:
      "You are on the official Sign In page.\n\n• New users: Click 'Create Account' at the bottom of the sign-in form.\n• Existing users: Enter Email & Password and click Sign In.",
    addressUrl: "https://app.workflowmitra.com/login",
    hotspot: {
      target: "image",
      top: "81%",
      left: "83%",
      popoverTop: "45%",
      popoverLeft: "35%",
      title: "Step 2: Click Create Account",
      detail: "Click the 'Create Account' link located at the bottom of the sign-in form.",
    },
  },
  {
    image: "/onboarding/step3.webp",
    title: "Step 3: Complete Registration Form",
    description:
      "Fill in your registration details:\n\n• Full Name: Enter your full name.\n• Email Address: Enter your work email address.\n• Password: Create a strong password.\n• Confirm Password: Re-enter the same password.\n• Account Name: Enter a unique workspace handle (e.g. 'mycompany123').\n\nClick the dark 'Create Account' button to submit.",
    addressUrl: "https://app.workflowmitra.com/signup",
    hotspot: {
      target: "image",
      top: "48%",
      left: "64%",
      popoverTop: "42%",
      popoverLeft: "26%",
      title: "Step 3: Registration Form",
      detail: "Fill in your Name, Email, Password, and Workspace Name, then click Create Account.",
    },
  },
  {
    image: "/onboarding/step4.webp",
    title: "Step 4: Verify Email Inbox",
    description:
      "Open your email inbox (Gmail, Outlook, Yahoo, Work Mail).\n\nLocate the verification email sent by Workflow Mitra and click the confirmation link to activate your account.",
    addressUrl: "https://app.workflowmitra.com/verify",
    hotspot: {
      target: "image",
      top: "83%",
      left: "82%",
      popoverTop: "45%",
      popoverLeft: "50%",
      title: "Step 4: Verify Email Inbox",
      detail: "Open your email inbox and click the verification link sent by Workflow Mitra.",
    },
  },
  {
    image: "/onboarding/step6.webp",
    title: "Step 5: Access Welcome Dashboard",
    description:
      "Congratulations! Your account is verified and ready.\n\nLog in to access your Workflow Mitra dashboard, create AI workflows, and automate your business processes!",
    addressUrl: "https://app.workflowmitra.com/dashboard",
    hotspot: {
      target: "image",
      top: "35%",
      left: "25%",
      popoverTop: "45%",
      popoverLeft: "50%",
      title: "Step 5: Welcome Dashboard",
      detail: "Congratulations! You are inside Workflow Mitra. Click '+ New Workflow' to start automating.",
    },
  },
];

export default function CreateAccountPage() {
  const { currentColor } = useTextColor();
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0);
  const [isFullscreenModal, setIsFullscreenModal] = React.useState<boolean>(false);
  const [selectedImageModal, setSelectedImageModal] = React.useState<string>("");
  const [feedbackGiven, setFeedbackGiven] = React.useState<boolean>(false);
  const [activeSpeakingIndex, setActiveSpeakingIndex] = React.useState<number | null>(null);

  const totalSteps = onboardingGuide.length;

  const handleNextStep = () => {
    setCurrentStepIndex((prev) => (prev + 1) % totalSteps);
  };

  const handlePrevStep = () => {
    setCurrentStepIndex((prev) => (prev - 1 + totalSteps) % totalSteps);
  };

  // TTS VOICE HELPERS
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

  return (
    <>
      <Helmet>
        <title>How to Create Account in Workflow Mitra | Step-by-Step Guide</title>
        <meta
          name="description"
          content="Step-by-step interactive guide to create your Workflow Mitra account. Visual onboarding tour with screenshots."
        />
        <meta property="og:url" content="https://workflowmitra-docs.vercel.app/create-account" />
        <meta property="og:title" content="How to Create Account in Workflow Mitra" />
      </Helmet>

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

          {/* TOP SECTION HEADER */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
                <Sparkles className={`h-3.5 w-3.5 ${currentColor.textClass}`} /> Interactive Account Registration Guide
              </span>
              <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                How to Create an Account in <span className={currentColor.textClass}>Workflow Mitra</span>
              </h1>
              <p className="mt-1 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Follow this 5-step visual guide to register, verify your email, and access your automation dashboard.
              </p>
            </div>
          </div>

          {/* REUSABLE INTERACTIVE PLAYER (HD WIDESCREEN TV FRAME) */}
          <InteractivePlayer
            steps={onboardingGuide}
            currentStepIndex={currentStepIndex}
            onStepChange={(idx) => setCurrentStepIndex(idx)}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            defaultAddressUrl="https://app.workflowmitra.com/signup"
            providerName="Workflow Mitra Account"
            externalAppUrl="https://app.workflowmitra.com"
          />

          {/* COMPREHENSIVE POINT-WISE STEP-BY-STEP GUIDE */}
          <section className="space-y-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <div className={`flex items-center gap-2 font-extrabold text-xs tracking-wider uppercase ${currentColor.textClass}`}>
                <Sparkles className="h-4 w-4" /> Visual Walkthrough
              </div>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Step-by-Step Registration Instructions
              </h2>
              <p className="mt-1 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Follow these detailed steps to complete your account registration.
              </p>
            </div>

            <div className="space-y-6">
              {onboardingGuide.map((s, idx) => (
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
                Was this Create Account Guide helpful?
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
                    Workflow Mitra Registration Screenshot Preview
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
                  alt="Registration Step Screenshot"
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
