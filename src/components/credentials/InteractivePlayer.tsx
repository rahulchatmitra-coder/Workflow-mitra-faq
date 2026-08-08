"use client";

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
} from "lucide-react";
import Image from "next/image";
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
}: InteractivePlayerProps) {
  const { currentColor } = useTextColor();
  const [zoomLevel, setZoomLevel] = React.useState<number>(100);
  const [isFullscreen, setIsFullscreen] = React.useState<boolean>(false);
  const [isTourActive, setIsTourActive] = React.useState<boolean>(true);

  const currentStep = steps[currentStepIndex] || steps[0];
  const totalSteps = steps.length;
  const addressBarUrl = currentStep.addressUrl || defaultAddressUrl;

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
              className={`relative flex items-center justify-center rounded-full bg-zinc-950 px-4 py-1.5 text-xs font-mono text-zinc-200 min-w-[280px] sm:min-w-[360px] max-w-full border transition-all duration-300 cursor-pointer ${
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
                  className="flex h-5 w-5 items-center justify-center rounded bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer font-bold text-xs"
                  title="Zoom Out (-)"
                >
                  <ZoomOut className="h-3 w-3" />
                </button>

                <button
                  onClick={() => setZoomLevel(100)}
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-extrabold ${currentColor.textClass} hover:opacity-80 transition-colors cursor-pointer`}
                  title="Reset Zoom (100%)"
                >
                  {zoomLevel}%
                </button>

                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 200}
                  className="flex h-5 w-5 items-center justify-center rounded bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer font-bold text-xs"
                  title="Zoom In (+)"
                >
                  <ZoomIn className="h-3 w-3" />
                </button>
              </div>

              <button
                onClick={() => setIsFullscreen(true)}
                className="flex items-center gap-1 rounded-lg bg-zinc-800 px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer"
                title="Click for Fullscreen"
              >
                <Maximize2 className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* SCREENSHOT CONTAINER WITH HOTSPOT */}
          <div
            className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] bg-zinc-950 flex items-center justify-center overflow-hidden cursor-pointer group"
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
                <Image
                  src={currentStep.image}
                  alt={currentStep.title}
                  fill
                  unoptimized
                  priority
                  loading="eager"
                  className="object-cover object-top"
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

                <span className={`relative flex h-6 w-6 items-center justify-center rounded-full text-white font-black text-[11px] shadow-lg border border-white dark:border-zinc-950 transition-transform group-hover/hotspot:scale-110 ${currentColor.bgClass}`}>
                  {currentStepIndex + 1}
                </span>
              </div>
            )}

            {/* STEP POPOVER CARD */}
            <AnimatePresence>
              {isTourActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    top: currentStep.hotspot.popoverTop || "45%",
                    left: currentStep.hotspot.popoverLeft || "50%",
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-40 w-80 sm:w-[380px] rounded-3xl border-2 bg-white p-5 shadow-2xl dark:bg-zinc-950 text-left text-zinc-900 dark:text-zinc-100 pointer-events-auto ${currentColor.borderClass}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full animate-pulse ${currentColor.bgClass}`} />
                      <h3 className={`text-sm sm:text-base font-black leading-tight ${currentColor.textClass}`}>
                        {currentStep.hotspot.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsTourActive(false)}
                      className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="py-3 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                    {currentStep.description}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    <span className="text-xs font-mono font-extrabold text-zinc-400">
                      {currentStepIndex + 1} of {totalSteps}
                    </span>

                    <div className="flex items-center gap-2">
                      {currentStepIndex > 0 && (
                        <button
                          onClick={onPrev}
                          className="rounded-xl border border-zinc-300 bg-zinc-100 px-3 py-1.5 text-xs font-extrabold text-zinc-800 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
                        >
                          ← Prev
                        </button>
                      )}

                      {currentStepIndex < totalSteps - 1 ? (
                        <button
                          onClick={onNext}
                          className={`flex items-center gap-1 rounded-xl text-white px-4 py-1.5 text-xs font-black shadow-md transition-all cursor-pointer ${currentColor.bgClass}`}
                        >
                          <span>Next Step →</span>
                        </button>
                      ) : externalAppUrl ? (
                        <a
                          href={externalAppUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`flex items-center gap-1.5 rounded-xl text-white px-4 py-1.5 text-xs font-black shadow-md transition-all cursor-pointer animate-pulse ${currentColor.bgClass}`}
                        >
                          <span>Open {providerName || "App"} 🚀</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <button
                          onClick={() => setIsTourActive(false)}
                          className={`flex items-center gap-1.5 rounded-xl text-white px-4 py-1.5 text-xs font-black shadow-md transition-all cursor-pointer ${currentColor.bgClass}`}
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

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setIsFullscreen(false)}
          >
            <div className="relative max-h-[92vh] max-w-[95vw] overflow-auto rounded-2xl bg-zinc-900 border border-zinc-800 p-2">
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute right-4 top-4 z-50 rounded-full bg-zinc-800/90 p-2 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer border border-zinc-700"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative">
                <Image
                  src={currentStep.image}
                  alt={currentStep.title}
                  width={1600}
                  height={900}
                  unoptimized
                  className="rounded-xl object-contain max-h-[85vh] w-auto"
                />

                {currentStep.hotspot.target === "image" && currentStep.hotspot.top && currentStep.hotspot.left && (
                  <div
                    className="absolute z-30 transition-all duration-500"
                    style={{
                      top: currentStep.hotspot.top,
                      left: currentStep.hotspot.left,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute inline-flex h-12 w-12 animate-ping rounded-full bg-zinc-400 opacity-80" />
                      <span className={`relative flex h-9 w-9 items-center justify-center rounded-full font-black text-xs shadow-2xl border-2 border-white ring-4 ring-zinc-500/40 ${currentColor.bgClass}`}>
                        {currentStepIndex + 1}
                      </span>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`absolute z-40 w-80 rounded-2xl border bg-zinc-900/95 backdrop-blur-xl p-5 shadow-2xl text-white ${currentColor.borderClass}`}
                      style={{
                        top: "130%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                        <span className={`text-xs font-black ${currentColor.textClass}`}>
                          {currentStep.hotspot.title}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full">
                          {currentStepIndex + 1}/{totalSteps}
                        </span>
                      </div>

                      <p className="mt-2 text-xs font-medium text-zinc-300 leading-relaxed">
                        {currentStep.hotspot.detail}
                      </p>

                      <div className="mt-4 flex items-center justify-between pt-2 border-t border-zinc-800">
                        <button
                          onClick={onPrev}
                          disabled={currentStepIndex === 0}
                          className="text-xs font-bold text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        >
                          Prev
                        </button>
                        <button
                          onClick={onNext}
                          className={`rounded-lg px-4 py-1.5 text-xs font-extrabold shadow-md transition-all cursor-pointer ${currentColor.bgClass}`}
                        >
                          {currentStepIndex === totalSteps - 1 ? "Replay 🔄" : "Next Step ➔"}
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
