import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  providerName,
  customButtonText,
  onCompleteAction,
}: InteractivePlayerProps) {
  const { currentColor } = useTextColor();
  const [zoomLevel, setZoomLevel] = React.useState<number>(100);
  const [isTourActive, setIsTourActive] = React.useState<boolean>(true);

  const currentStep = steps[currentStepIndex] || steps[0];
  const totalSteps = steps.length;
  const addressBarUrl = currentStep.addressUrl || defaultAddressUrl;

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

    // Priority 1: High-Quality English Male Voices (Microsoft Guy, Apple Daniel, Google Male, etc.)
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
    const bestVoice = getBestVoice();
    if (bestVoice) {
      utterance.voice = bestVoice;
    }
    utterance.rate = 0.92; // Slightly calmer, ultra-readable pace
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };


  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 25, 80));
  };

  // Compute safe popover position so it NEVER overflows off-screen on big monitors
  const getSafePopoverPosition = () => {
    const rawLeft = parseFloat(currentStep.hotspot.popoverLeft || currentStep.hotspot.left || "50%");
    const rawTop = parseFloat(currentStep.hotspot.popoverTop || currentStep.hotspot.top || "50%");

    // Clamp left position between 24% and 76% to prevent horizontal clipping
    const safeLeft = Math.max(24, Math.min(76, rawLeft));
    // Clamp top position between 25% and 75%
    const safeTop = Math.max(25, Math.min(75, rawTop));

    return {
      top: `${safeTop}%`,
      left: `${safeLeft}%`,
    };
  };

  const safePopoverStyle = getSafePopoverPosition();
  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-3.5 sm:p-5 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 transition-all">
      {/* HEADER BAR: PREV/NEXT NAVIGATOR & ANIMATED PROGRESS BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3.5 border-b border-zinc-100 dark:border-zinc-800/80">
        {/* STEP COUNTER & PROGRESS BAR */}
        <div className="flex items-center gap-3 flex-1 min-w-[200px]">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`text-xs font-mono font-black ${currentColor.textClass}`}>
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
            <span className="text-[11px] font-bold text-zinc-400">
              ({Math.round(((currentStepIndex + 1) / totalSteps) * 100)}%)
            </span>
          </div>

          <div className="relative h-2.5 flex-1 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden border border-zinc-200 dark:border-zinc-700/60">
            <motion.div
              className={`h-full rounded-full shadow-md ${currentColor.bgClass}`}
              initial={{ width: 0 }}
              animate={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* STEP NAVIGATOR */}
        <div className="flex items-center gap-2 shrink-0 justify-end">
          <button
            onClick={handleSpeakStep}
            aria-label={isSpeaking ? "Stop voiceover" : "Listen to step voiceover"}
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-all cursor-pointer border ${
              isSpeaking
                ? `${currentColor.bgClass} text-white shadow-md border-transparent animate-pulse`
                : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
            title={isSpeaking ? "Stop Voiceover" : "Listen to Step Voiceover"}
          >
            {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{isSpeaking ? "Stop" : "Listen"}</span>
          </button>

          <div className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-900 shrink-0">
            <button
              onClick={onPrev}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-zinc-700 hover:bg-white hover:shadow-xs disabled:opacity-30 disabled:cursor-not-allowed dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Prev</span>
            </button>

            {/* STEP PILLS */}
            <div className="flex items-center gap-1 px-1">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => onStepChange(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentStepIndex
                      ? `w-5 shadow-sm ${currentColor.bgClass}`
                      : idx < currentStepIndex
                      ? `w-2 opacity-60 ${currentColor.bgClass}`
                      : "w-2 bg-zinc-300 dark:bg-zinc-700"
                  }`}
                  title={`Go to Step ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={onNext}
              disabled={currentStepIndex === totalSteps - 1}
              className="flex items-center gap-1 rounded-full bg-zinc-900 text-white px-3 py-1 text-xs font-bold hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed dark:bg-white dark:text-zinc-900 transition-all cursor-pointer shadow-xs"
            >
              <span>Next</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN 2-COLUMN LAYOUT: LEFT DETAILS PANEL + RIGHT TV SCREEN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start mt-3">
        
        {/* LEFT SIDE PANEL: STEP DETAILS CARD (4 Cols) */}
        <motion.div
          key={`details-${currentStepIndex}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="lg:col-span-4 flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-zinc-50/80 p-4 sm:p-5 dark:border-zinc-800/90 dark:bg-zinc-900/60 shadow-sm space-y-4"
        >
          {/* STEP HEADER */}
          <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2.5 dark:border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full animate-pulse ${currentColor.bgClass}`} />
              <span className={`text-xs font-black uppercase tracking-wider ${currentColor.textClass}`}>
                Step {currentStepIndex + 1} of {totalSteps}
              </span>
            </div>

            <button
              onClick={handleSpeakStep}
              aria-label={isSpeaking ? "Stop voiceover" : "Listen to step voiceover"}
              className={`rounded-full p-1.5 transition-colors cursor-pointer ${
                isSpeaking
                  ? `${currentColor.bgClass} text-white animate-pulse shadow-md`
                  : "text-zinc-500 hover:bg-zinc-200/70 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
              title={isSpeaking ? "Stop Voiceover" : "Listen Voiceover"}
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>

          {/* STEP TITLE */}
          <div className="space-y-1">
            <h3 className={`text-sm sm:text-base font-black leading-snug tracking-tight ${currentColor.textClass}`}>
              {currentStep.hotspot.title || currentStep.title}
            </h3>
            {currentStep.hotspot.detail && (
              <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                {currentStep.hotspot.detail}
              </p>
            )}
          </div>

          {/* STEP DESCRIPTION */}
          <div className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line bg-white dark:bg-zinc-950 p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs max-h-48 overflow-y-auto scrollbar-thin">
            {currentStep.description}
          </div>

          {/* CELEBRATORY COMPLETION BANNER ON LAST STEP */}
          {currentStepIndex === totalSteps - 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border-2 border-emerald-500/40 bg-emerald-500/10 p-3.5 space-y-1.5 text-left shadow-sm"
            >
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-xs sm:text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 animate-bounce" />
                <span>Guide 100% Completed!</span>
              </div>
              <p className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 leading-snug">
                You have finished all {totalSteps} steps! You're all set to connect{" "}
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {providerName ? providerName.split(',')[0].replace(/\s*\([^)]*\)/g, '').trim() : "this service"}
                </span>{" "}
                with Workflow Mitra.
              </p>
            </motion.div>
          )}

          {/* STEP ACTION CONTROLS */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80 gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {currentStepIndex > 0 && (
                <button
                  onClick={onPrev}
                  className="rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-xs font-extrabold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer shadow-xs"
                >
                  ← Prev
                </button>
              )}

              {currentStepIndex < totalSteps - 1 ? (
                <button
                  onClick={onNext}
                  className={`flex items-center gap-1 rounded-xl text-white px-4 py-1.5 text-xs font-black shadow-md transition-all cursor-pointer ${currentColor.bgClass}`}
                >
                  <span>Next →</span>
                </button>
              ) : (
                <>
                  {externalAppUrl && (
                    <a
                      href={externalAppUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-1.5 rounded-xl text-white px-3.5 py-1.5 text-xs font-black shadow-md transition-all cursor-pointer animate-pulse ${currentColor.bgClass}`}
                    >
                      <span>
                        {customButtonText ||
                          `Open ${
                            providerName
                              ? providerName.split(',')[0].replace(/\s*\([^)]*\)/g, '').trim()
                              : "App"
                          } API`}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => onStepChange(0)}
                    className="flex items-center gap-1 rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-xs font-extrabold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-all cursor-pointer shadow-xs"
                    title="Restart Guide from Step 1"
                  >
                    <span>Restart</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>

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
                    disabled={zoomLevel <= 80}
                    aria-label="Zoom Out"
                    className="flex h-5.5 w-5.5 items-center justify-center rounded bg-zinc-700 text-zinc-200 hover:bg-zinc-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer font-bold text-xs"
                    title="Zoom Out (-)"
                  >
                    <ZoomOut className="h-3 w-3" />
                  </button>

                  <button
                    onClick={() => setZoomLevel(100)}
                    aria-label="Reset Zoom to 100%"
                    className="px-2 py-0.5 text-xs font-mono font-bold text-white hover:text-zinc-200 transition-colors cursor-pointer bg-zinc-900/80 rounded border border-zinc-700"
                    title="Click to Reset Zoom (100%)"
                  >
                    {zoomLevel}%
                  </button>

                  <button
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 200}
                    aria-label="Zoom In"
                    className="flex h-5.5 w-5.5 items-center justify-center rounded bg-zinc-700 text-zinc-200 hover:bg-zinc-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer font-bold text-xs"
                    title="Zoom In (+)"
                  >
                    <ZoomIn className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* SCREENSHOT CONTAINER WITH IN-PLACE ZOOM & PIN (NO FULLSCREEN POPUP) */}
            <div className="relative w-full aspect-[16/9] max-h-[470px] bg-zinc-950 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
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
              </AnimatePresence>

              {/* PRETTY, SLEEK & AESTHETIC INTERACTIVE HOTSPOT PIN WITH ROUND-ROUND ORBIT */}
              {currentStep.hotspot.target === "image" && currentStep.hotspot.top && currentStep.hotspot.left && (
                <motion.div
                  id={`hotspot-step-${currentStepIndex + 1}`}
                  style={{ top: currentStep.hotspot.top, left: currentStep.hotspot.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group/hotspot cursor-pointer select-none"
                  whileHover={{ scale: 1.3, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.82 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentStepIndex < totalSteps - 1) {
                      onNext();
                    } else {
                      onStepChange(0);
                    }
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
