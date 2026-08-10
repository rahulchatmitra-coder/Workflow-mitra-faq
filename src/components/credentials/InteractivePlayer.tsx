import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Lock,
  X,
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
  const [isFullscreen, setIsFullscreen] = React.useState<boolean>(false);
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

  // Esc key listener to exit fullscreen
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

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
    <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-3.5 sm:p-5 shadow-lg dark:border-zinc-800 dark:bg-zinc-950 transition-all">
      {/* HEADER BAR: PREV/NEXT NAVIGATOR & ANIMATED PROGRESS BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
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

      {/* BROWSER FRAME & SCREENSHOT */}
      <div id="onboarding-browser-frame" className="mt-3">
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
              onClick={() => setIsTourActive(true)}
              className={`relative flex items-center justify-center rounded-full bg-zinc-950 px-4 py-1.5 text-xs font-mono text-zinc-200 min-w-[260px] sm:min-w-[360px] max-w-full border transition-all duration-300 cursor-pointer ${
                (currentStep.hotspot.target as string) === "url-bar"
                  ? `${currentColor.borderClass} ring-2 ring-zinc-500/40 shadow-md`
                  : "border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <Lock className="h-3 w-3 mr-1.5 text-zinc-400 shrink-0" />
              <span className="truncate font-semibold text-zinc-200 tracking-wide select-none">
                {addressBarUrl}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div
                className="flex items-center gap-0.5 rounded-lg border border-zinc-800 bg-zinc-950 p-0.5 text-xs text-zinc-300 shadow-inner"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 80}
                  aria-label="Zoom Out"
                  className="flex h-5 w-5 items-center justify-center rounded bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer font-bold text-xs"
                  title="Zoom Out (-)"
                >
                  <ZoomOut className="h-3 w-3" />
                </button>

                <button
                  onClick={() => setZoomLevel(100)}
                  aria-label="Reset Zoom to 100%"
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-extrabold ${currentColor.textClass} hover:opacity-80 transition-colors cursor-pointer`}
                  title="Reset Zoom (100%)"
                >
                  {zoomLevel}%
                </button>

                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 200}
                  aria-label="Zoom In"
                  className="flex h-5 w-5 items-center justify-center rounded bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer font-bold text-xs"
                  title="Zoom In (+)"
                >
                  <ZoomIn className="h-3 w-3" />
                </button>
              </div>

              <button
                onClick={() => setIsFullscreen(true)}
                aria-label="Toggle Fullscreen Lightbox"
                className="flex items-center gap-1 rounded-lg bg-zinc-800 px-2.5 py-1 text-xs font-bold text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer"
                title="Click for Fullscreen"
              >
                <Maximize2 className="h-3 w-3" />
                <span className="hidden sm:inline text-[11px]">Fullscreen</span>
              </button>
            </div>
          </div>

          {/* SCREENSHOT CONTAINER WITH HOTSPOT */}
          <div
            className="relative w-full aspect-[16/9] max-h-[520px] bg-zinc-950 flex items-center justify-center overflow-hidden cursor-pointer group"
            onClick={() => setIsFullscreen(true)}
          >
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

            {/* HOTSPOT PIN ON SCREENSHOT */}
            {currentStep.hotspot.target === "image" && currentStep.hotspot.top && currentStep.hotspot.left && (
              <div
                id={`hotspot-step-${currentStepIndex + 1}`}
                style={{ top: currentStep.hotspot.top, left: currentStep.hotspot.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group/hotspot cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onStepChange(currentStepIndex);
                  setIsTourActive(true);
                }}
              >
                <span className="absolute -inset-1.5 rounded-full bg-zinc-400 opacity-80 animate-ping" />
                <span className="absolute -inset-0.5 rounded-full bg-zinc-500/50 animate-pulse" />

                <span className={`relative flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full text-white font-black text-[11px] sm:text-xs shadow-lg border-2 border-white dark:border-zinc-950 transition-transform group-hover/hotspot:scale-110 ${currentColor.bgClass}`}>
                  {currentStepIndex + 1}
                </span>
              </div>
            )}

            {/* SAFE BOUNDARY-CONTAINED STEP POPOVER CARD */}
            <AnimatePresence>
              {isTourActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    top: safePopoverStyle.top,
                    left: safePopoverStyle.left,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-40 w-[90%] max-w-[330px] sm:max-w-[380px] rounded-3xl border-2 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl p-4 sm:p-4.5 shadow-2xl text-left text-zinc-900 dark:text-zinc-100 pointer-events-auto ${currentColor.borderClass}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full animate-pulse ${currentColor.bgClass}`} />
                      <h3 className={`text-xs sm:text-sm font-black leading-tight ${currentColor.textClass}`}>
                        {currentStep.hotspot.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={handleSpeakStep}
                        aria-label={isSpeaking ? "Stop voiceover" : "Listen to step voiceover"}
                        className={`rounded-full p-1 transition-colors cursor-pointer ${
                          isSpeaking
                            ? `${currentColor.bgClass} text-white animate-pulse shadow-md`
                            : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white"
                        }`}
                        title={isSpeaking ? "Stop Voiceover" : "Listen to Step Voiceover"}
                      >
                        {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                      </button>

                      <button
                        onClick={() => setIsTourActive(false)}
                        aria-label="Close step popover"
                        className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white transition-colors cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="py-2.5 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line max-h-48 sm:max-h-56 overflow-y-auto scrollbar-thin pr-1">
                    {currentStep.description}
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-zinc-100 dark:border-zinc-800">
                    <span className="text-[11px] font-mono font-extrabold text-zinc-400">
                      {currentStepIndex + 1} / {totalSteps}
                    </span>

                    <div className="flex items-center gap-2">
                      {currentStepIndex > 0 && (
                        <button
                          onClick={onPrev}
                          className="rounded-xl border border-zinc-300 bg-zinc-100 px-3 py-1 text-[11px] font-extrabold text-zinc-800 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
                        >
                          ← Prev
                        </button>
                      )}

                      {currentStepIndex < totalSteps - 1 ? (
                        <button
                          onClick={onNext}
                          className={`flex items-center gap-1 rounded-xl text-white px-3.5 py-1 text-[11px] font-black shadow-md transition-all cursor-pointer ${currentColor.bgClass}`}
                        >
                          <span>Next →</span>
                        </button>
                      ) : onCompleteAction ? (
                        <button
                          onClick={() => {
                            setIsTourActive(false);
                            onCompleteAction();
                          }}
                          className={`flex items-center gap-1.5 rounded-xl text-white px-3.5 py-1 text-[11px] font-black shadow-md transition-all cursor-pointer animate-pulse ${currentColor.bgClass}`}
                        >
                          <span>{customButtonText || "Create Credential 🚀"}</span>
                        </button>
                      ) : externalAppUrl ? (
                        <a
                          href={externalAppUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`flex items-center gap-1.5 rounded-xl text-white px-3.5 py-1 text-[11px] font-black shadow-md transition-all cursor-pointer animate-pulse ${currentColor.bgClass}`}
                        >
                          <span>
                            {customButtonText ||
                              `Open ${
                                providerName
                                  ? providerName.split(',')[0].replace(/\s*\([^)]*\)/g, '').trim()
                                  : "App"
                              } API`}
                          </span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <button
                          onClick={() => setIsTourActive(false)}
                          className={`flex items-center gap-1.5 rounded-xl text-white px-3.5 py-1 text-[11px] font-black shadow-md transition-all cursor-pointer ${currentColor.bgClass}`}
                        >
                          <span>Done 🎉</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ULTRA-SAFE FULLSCREEN LIGHTBOX MODAL WITH FLOATING CONTROL PANEL */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 p-3 sm:p-6 backdrop-blur-xl"
            onClick={() => setIsFullscreen(false)}
          >
            {/* LIGHTBOX HEADER */}
            <div className="w-full max-w-7xl flex items-center justify-between z-50 text-white pb-2">
              <div className="flex items-center gap-3">
                <span className={`flex h-7 w-7 items-center justify-center rounded-xl font-black text-xs shadow-md ${currentColor.bgClass}`}>
                  {currentStepIndex + 1}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    {currentStep.hotspot.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    Step {currentStepIndex + 1} of {totalSteps} • {addressBarUrl}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsFullscreen(false)}
                className="rounded-full bg-zinc-800/90 p-2 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer border border-zinc-700 shadow-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* LIGHTBOX SCREENSHOT - CLEAN VIEW WITHOUT PIN OVERLAY */}
            <div className="relative flex-1 w-full max-w-7xl my-2 flex items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
              <img
                src={currentStep.image}
                alt={currentStep.title}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>

            {/* FLOATING BOTTOM STEPS CONTROLLER PANEL (NEVER CLIPS OFF SCREEN) */}
            <div
              className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900/95 backdrop-blur-2xl p-4 shadow-2xl text-white z-50 flex flex-col sm:flex-row items-center justify-between gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-1 text-left flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${currentColor.bgClass}`} />
                  <span className="text-xs font-bold text-zinc-300 truncate">
                    {currentStep.title}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-medium line-clamp-2">
                  {currentStep.description || currentStep.hotspot.detail}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={onPrev}
                  disabled={currentStepIndex === 0}
                  className="rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-1.5 text-xs font-bold text-zinc-200 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  ← Prev
                </button>

                <div className="flex items-center gap-1 px-1">
                  {steps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => onStepChange(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === currentStepIndex
                          ? `w-4 ${currentColor.bgClass}`
                          : "w-2 bg-zinc-700 hover:bg-zinc-600"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={onNext}
                  className={`rounded-xl px-4 py-1.5 text-xs font-black text-white shadow-md transition-all cursor-pointer ${currentColor.bgClass}`}
                >
                  {currentStepIndex === totalSteps - 1 ? "Done 🎉" : "Next Step →"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
