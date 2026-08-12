import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Lock,
  CheckCircle2,
  Volume2,
  VolumeX,
  RotateCcw,
  Rocket,
  Eye,
  KeyRound,
} from "lucide-react";
import { useTextColor } from "@/context/TextColorContext";
import { OnboardingStep } from "@/data/credentials-data";

interface InteractivePlayerProps {
  steps: OnboardingStep[];
  currentStepIndex: number;
  onStepChange: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  defaultAddressUrl?: string;
  externalAppUrl?: string;
  providerName?: string;
  customButtonText?: string;
  onCompleteAction?: () => void;
}

export default function InteractivePlayer({
  steps,
  currentStepIndex,
  onStepChange,
  onNext,
  onPrev,
  defaultAddressUrl = "https://app.workflowmitra.com/credentials",
  externalAppUrl,
  providerName = "Integration",
  customButtonText,
  onCompleteAction,
}: InteractivePlayerProps) {
  const { currentColor } = useTextColor();
  const navigate = useNavigate();
  const [zoomLevel, setZoomLevel] = React.useState<number>(100);
  const [showCompletionOverlay, setShowCompletionOverlay] = React.useState<boolean>(false);

  const currentStep = steps[currentStepIndex] || steps[0];
  const totalSteps = steps.length;
  const addressBarUrl = currentStep.addressUrl || defaultAddressUrl;

  // Reset completion overlay when user changes steps manually
  React.useEffect(() => {
    if (currentStepIndex !== totalSteps - 1) {
      setShowCompletionOverlay(false);
    }
  }, [currentStepIndex, totalSteps]);

  const handleNextOrFinish = () => {
    if (currentStepIndex < totalSteps - 1) {
      onNext();
    } else {
      setShowCompletionOverlay(true);
      if (onCompleteAction) {
        onCompleteAction();
      }
    }
  };

  const handleRestartTour = () => {
    setShowCompletionOverlay(false);
    setZoomLevel(100);
    onStepChange(0);
  };

  const handleExploreCredentials = () => {
    setShowCompletionOverlay(false);
    const el = document.getElementById("providers-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/credentials#providers-grid");
      setTimeout(() => {
        const targetEl = document.getElementById("providers-grid");
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 800, behavior: "smooth" });
        }
      }, 150);
    }
  };

  const [isSpeaking, setIsSpeaking] = React.useState<boolean>(false);

  // Stop speech synthesis on step change or unmount
  React.useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentStepIndex]);

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
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/https?:\/\/(www\.)?/gi, "")
      .replace(/\.com/gi, " dot com")
      .replace(/\.org/gi, " dot org")
      .replace(/api/gi, "A P I")
      .replace(/crm/gi, "C R M")
      .replace(/oauth/gi, "O Auth")
      .replace(/aes-256/gi, "A E S 256")
      .replace(/•/g, ". ")
      .replace(/[\n\r]+/g, ". ")
      .replace(/[^\w\s.,'-]/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const renderFormattedDescription = (text: string) => {
    if (!text) return null;
    const parts: React.ReactNode[] = [];
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s,\)]+)/g;
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      if (match[1] && match[2]) {
        parts.push(
          <a
            key={`md-link-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer bg-indigo-50 dark:bg-indigo-950/70 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800 shadow-2xs mx-1 transition-all my-1 hover:scale-[1.02] align-baseline break-all"
            onClick={(e) => e.stopPropagation()}
          >
            <span>{match[1]}</span>
            <ExternalLink className="h-3.5 w-3.5 inline text-indigo-500 shrink-0" />
          </a>
        );
      } else if (match[3]) {
        const url = match[3];
        parts.push(
          <a
            key={`raw-link-${match.index}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer break-all align-baseline"
            onClick={(e) => e.stopPropagation()}
          >
            {url}
          </a>
        );
      }
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  const handleSpeakStep = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const rawTitle = (currentStep.hotspot.title || currentStep.title || "").replace(/Step \d+:/i, "");
    const rawDesc = currentStep.description || "";
    const rawDetail = currentStep.hotspot.detail || "";

    const textToRead = formatTextForSpeech(`Step ${currentStepIndex + 1}. ${rawTitle}. ${rawDesc}. ${rawDetail}`);

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.96;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const selectedVoice = getBestVoice();
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 20, 200));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 20, 80));

  const progressPercentage = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  return (
    <div className="w-full space-y-4">
      {/* 2-COLUMN MAIN PLAYER CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT SIDE: STEP CONTROLS & DESCRIPTION CARD (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full min-h-[440px] rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 transition-all">
          
          <div className="space-y-4">
            {/* TOP HEADER & PROGRESS BAR */}
            <div className="space-y-2.5 border-b border-zinc-100 pb-3.5 dark:border-zinc-800">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-mono tabular-nums">
                  <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-black text-white ${currentColor.bgClass}`}>
                    Step {currentStepIndex + 1} of {totalSteps}
                  </span>
                  <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                    ({progressPercentage}%)
                  </span>
                </div>

                {/* AUDIO VOICE ASSISTANT BUTTON */}
                <button
                  onClick={handleSpeakStep}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer border shrink-0 ${
                    isSpeaking
                      ? "bg-rose-500 text-white border-rose-600 animate-pulse"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 border-zinc-200 dark:border-zinc-700"
                  }`}
                  title={isSpeaking ? "Click to stop voice assistant" : "Click to listen to step instructions"}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="h-3.5 w-3.5 shrink-0" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                      <span>Listen</span>
                    </>
                  )}
                </button>
              </div>

              {/* VISUAL PROGRESS BAR LINE */}
              <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden border border-zinc-200/60 dark:border-zinc-700/60">
                <div
                  className={`h-full ${currentColor.bgClass} transition-all duration-300 rounded-full`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* STEP TITLE */}
            <div>
              <h3 className="text-lg font-black text-zinc-900 dark:text-white leading-snug tracking-tight">
                {currentStep.title}
              </h3>
            </div>

            {/* STEP DESCRIPTION WITH RICH LINK PARSING & NO HORIZONTAL SCROLLBAR */}
            <div className="text-xs sm:text-sm leading-relaxed font-medium text-zinc-700 dark:text-zinc-200 space-y-3 max-h-[220px] overflow-y-auto pr-1">
              <div className="whitespace-pre-line font-medium leading-normal break-words">
                {renderFormattedDescription(currentStep.description)}
              </div>
              {currentStep.hotspot.detail && (
                <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 flex items-start gap-2 shadow-2xs break-words">
                  <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span className="font-bold text-xs leading-snug break-words">
                    {currentStep.hotspot.detail}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* STEP NAVIGATION BUTTONS (CLEAN & SPACIOUS WITHOUT BOTTOM CONSOLE BUTTON) */}
          <div className="pt-3.5 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <button
                onClick={onPrev}
                disabled={currentStepIndex === 0}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-xs font-bold text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-all cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Prev Step</span>
              </button>

              <button
                onClick={handleNextOrFinish}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-xs font-black text-white shadow-md transition-all cursor-pointer hover:opacity-95 ${
                  currentStepIndex === totalSteps - 1
                    ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30 ring-2 ring-emerald-500/40"
                    : currentColor.bgClass
                }`}
              >
                <span>
                  {currentStepIndex === totalSteps - 1
                    ? "Complete Setup"
                    : "Next Step"}
                </span>
                {currentStepIndex === totalSteps - 1 ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: COMPACT TV SCREEN / BROWSER FRAME (8 Cols) */}
        <div id="onboarding-browser-frame" className="lg:col-span-8 w-full">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-900 shadow-md dark:border-zinc-800">

            {/* BROWSER TOP ADDRESS BAR */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3.5 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block" />
              </div>

              <div
                id="url-address-bar"
                className={`relative flex items-center justify-center rounded-full bg-zinc-950 px-4 py-1 text-xs font-mono text-zinc-200 min-w-[200px] sm:min-w-[320px] max-w-full border transition-all duration-300 cursor-pointer ${
                  (currentStep.hotspot.target as string) === "url-bar"
                    ? `${currentColor.borderClass} ring-2 ring-zinc-500/40 shadow-md`
                    : "border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <Lock className="h-3 w-3 mr-1.5 text-zinc-400 shrink-0" />
                <span className="truncate font-semibold text-zinc-200 tracking-wide select-none text-[11px]">
                  {addressBarUrl}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* HIGH-CONTRAST ZOOM CONTROLS */}
                <div className="flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-800/90 px-1 py-0.5 text-xs shadow-inner">
                  <button
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 80 || showCompletionOverlay}
                    aria-label="Zoom Out"
                    className="flex h-5.5 w-5.5 items-center justify-center rounded bg-zinc-700 text-zinc-200 hover:bg-zinc-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer font-bold text-xs"
                    title="Zoom Out (-)"
                  >
                    <ZoomOut className="h-3 w-3" />
                  </button>

                  <button
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 200 || showCompletionOverlay}
                    aria-label="Zoom In"
                    className="flex h-5.5 w-5.5 items-center justify-center rounded bg-zinc-700 text-zinc-200 hover:bg-zinc-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer font-bold text-xs"
                    title="Zoom In (+)"
                  >
                    <ZoomIn className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* SCREENSHOT CONTAINER WITH TV COMPLETION OVERLAY */}
            <div className="relative w-full aspect-[16/9] max-h-[470px] bg-zinc-950 flex items-center justify-center overflow-hidden">
              
              {/* NORMAL SCREENSHOT STEP VIEW */}
              <AnimatePresence mode="wait">
                {!showCompletionOverlay ? (
                  <motion.div
                    key={`${currentStepIndex}-${currentStep.image}`}
                    initial={{ opacity: 0, scale: zoomLevel / 100 }}
                    animate={{ opacity: 1, scale: zoomLevel / 100 }}
                    exit={{ opacity: 0, scale: zoomLevel / 100 }}
                    transition={{ duration: 0.2 }}
                    className="relative h-full w-full origin-top transition-transform duration-200"
                  >
                    <img
                      src={currentStep.image}
                      alt={currentStep.title}
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  </motion.div>
                ) : (
                  /* GORGEOUS TV SCREEN COMPLETION OVERLAY */
                  <motion.div
                    key="completion-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 z-40 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-6 sm:p-8 flex flex-col items-center justify-center text-center overflow-y-auto"
                  >
                    {/* AMBIENT BACKGROUND GLOW RINGS */}
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

                    {/* ANIMATED SUCCESS CHECKMARK BADGE */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.25, 1] }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                    >
                      <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                      <span className="animate-ping absolute inset-0 rounded-3xl border border-emerald-400/40" />
                    </motion.div>

                    {/* TITLE & DESCRIPTION */}
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                      Integration Setup Completed!
                    </h2>
                    <p className="text-xs sm:text-sm font-medium text-zinc-300 max-w-md mb-6 leading-relaxed">
                      You have successfully completed all <span className="text-emerald-400 font-bold">{totalSteps} steps</span> for <span className="text-white font-bold">{providerName}</span>. Your credentials are ready to be used in Workflow Mitra.
                    </p>

                    {/* INTERACTIVE TV SCREEN ACTION BUTTONS */}
                    <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-lg">
                      {/* START AGAIN BUTTON */}
                      <button
                        onClick={handleRestartTour}
                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/90 px-4 py-2.5 text-xs font-bold text-zinc-200 hover:bg-zinc-700 hover:text-white transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <RotateCcw className="h-3.5 w-3.5 text-indigo-400" />
                        <span>Start Tour Again</span>
                      </button>

                      {/* EXPLORE ALL CREDENTIALS BUTTON (SCROLLS DOWN SMOOTHLY TO PROVIDERS GRID) */}
                      <button
                        onClick={handleExploreCredentials}
                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs font-bold text-zinc-200 hover:bg-zinc-800 hover:text-white transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <KeyRound className="h-3.5 w-3.5 text-amber-400" />
                        <span>Explore Credentials</span>
                      </button>

                      {/* LAUNCH APP BUTTON */}
                      <a
                        href="https://app.workflowmitra.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-black text-white hover:bg-emerald-500 transition-all cursor-pointer shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Rocket className="h-3.5 w-3.5" />
                        <span>Launch App</span>
                      </a>
                    </div>

                    {/* VIEW FINAL SCREENSHOT LINK */}
                    <button
                      onClick={() => setShowCompletionOverlay(false)}
                      className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View Step {totalSteps} Screenshot</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* PRETTY, SLEEK & AESTHETIC INTERACTIVE HOTSPOT PIN WITH ROUND-ROUND ORBIT */}
              {!showCompletionOverlay && currentStep.hotspot.target === "image" && currentStep.hotspot.top && currentStep.hotspot.left && (
                <motion.div
                  id={`hotspot-step-${currentStepIndex + 1}`}
                  style={{ top: currentStep.hotspot.top, left: currentStep.hotspot.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group/hotspot cursor-pointer select-none"
                  whileHover={{ scale: 1.3, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.82 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextOrFinish();
                  }}
                  title={`Click here to proceed (${currentStep.hotspot.title || currentStep.title})`}
                >
                  {/* 1. DREAMY SOFT AMBIENT GLOW AURA */}
                  <motion.span
                    className="absolute -inset-2.5 rounded-full bg-indigo-500/25 blur-sm pointer-events-none"
                    animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  />

                  {/* 2. SILKY EXPANDING RIPPLE WAVE */}
                  <motion.span
                    className="absolute -inset-3 rounded-full border border-indigo-400/60 shadow-[0_0_10px_rgba(99,102,241,0.4)] pointer-events-none"
                    animate={{ scale: [1, 1.65, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  />

                  {/* 3. SMOOTH ROTATING ROUND-ROUND ORBIT RING & GLISTENING SATELLITE PARTICLE */}
                  <motion.div
                    className="absolute -inset-2 rounded-full border border-indigo-300/40 pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
                  >
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                  </motion.div>

                  {/* 4. GORGEOUS LUMINOUS GLASS PEARL PIN */}
                  <motion.span
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="relative flex h-4.5 w-4.5 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-indigo-600 border-2 border-white dark:border-zinc-950 shadow-[0_0_14px_rgba(99,102,241,0.9),0_4px_8px_rgba(0,0,0,0.5)] ring-2 ring-indigo-500/30"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                  </motion.span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
