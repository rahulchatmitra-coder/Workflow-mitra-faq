import * as React from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Calendar,
  ArrowLeft,
  Maximize2,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  ExternalLink,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTextColor } from "@/context/TextColorContext";

export interface StepHotspot {
  target: "url-bar" | "image";
  top?: string;
  left?: string;
  popoverTop?: string;
  popoverLeft?: string;
  title: string;
  detail: string;
}

export interface OnboardingStep {
  image: string;
  title: string;
  description: string;
  hotspot: StepHotspot;
}

export const onboardingGuide: OnboardingStep[] = [
  {
    image: "/onboarding/step1.png",
    title: "Open Workflow Mitra",
    description:
      "Open your preferred web browser (Chrome, Safari, Edge, Firefox).\n\nType https://app.workflowmitra.com into the address bar and press Enter.",
    hotspot: {
      target: "image",
      top: "4.2%",
      left: "24.5%",
      popoverTop: "38%",
      popoverLeft: "50%",
      title: "Step 1: Open Address Bar 🌐",
      detail: "Type https://app.workflowmitra.com into your browser address bar and press Enter.",
    },
  },
  {
    image: "/onboarding/step2.png",
    title: "Welcome to Workflow Mitra",
    description:
      "You are on the official Login page.\n\n• New users: Click 'Create Account' at the bottom of the sign-in form.\n• Existing users: Enter Email & Password and click Sign In.",
    hotspot: {
      target: "image",
      top: "84%",
      left: "72%",
      popoverTop: "45%",
      popoverLeft: "35%",
      title: "Step 2: Click 'Create Account' 👤",
      detail: "New users click the 'Create Account' link located at the bottom of the sign-in form.",
    },
  },
  {
    image: "/onboarding/step3.png",
    title: "Create Your Account",
    description:
      "Complete the registration form:\n\n• Full Name: Enter the user's full name.\n• Email Address: Enter the user's email address.\n• Password: Create a strong password.\n• Confirm Password: Re-enter the same password.\n• Account Name: Enter a unique workspace name (e.g., 'myautomation123'). If unavailable, try another unique name by adding numbers.\n\nThen click Create Account",
    hotspot: {
      target: "image",
      top: "48%",
      left: "64%",
      popoverTop: "42%",
      popoverLeft: "26%",
      title: "Step 3: Registration Form 📝",
      detail: "Fill in your Email Address and Password.",
    },
  },
  {
    image: "/onboarding/step4.png",
    title: "Verify Your Email",
    description:
      "Open your email inbox.\n\nClick the verification link sent by Workflow Mitra, then return to the Login screen.",
    hotspot: {
      target: "image",
      top: "88%",
      left: "85%",
      popoverTop: "45%",
      popoverLeft: "50%",
      title: "Step 4: Verify Email Inbox ✉️",
      detail: "Open your email inbox and click the verification link sent by Workflow Mitra.",
    },
  },
 
  {
    image: "/onboarding/step6.png",
    title: "Welcome Dashboard",
    description:
      "Congratulations! You have successfully logged in.\n\nNow you can create workflows, connect apps, and build AI automations!",
    hotspot: {
      target: "image",
      top: "35%",
      left: "25%",
      popoverTop: "45%",
      popoverLeft: "50%",
      title: "Step 5: Welcome Dashboard 🎉",
      detail: "Congratulations! You are inside Workflow Mitra. Click '+ New Workflow' to start automating.",
    },
  },
];

export default function CreateAccountPage() {
  const { currentColor } = useTextColor();
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [feedbackGiven, setFeedbackGiven] = React.useState(false);
  const [imageVersion, setImageVersion] = React.useState<number>(0);
  const [zoomScale, setZoomScale] = React.useState<number>(1);
  const [isTourActive, setIsTourActive] = React.useState(false);

  const totalSteps = onboardingGuide.length;
  const currentStep = onboardingGuide[currentStepIndex];

  const handleNextStep = () => {
    setCurrentStepIndex((prev) => (prev < totalSteps - 1 ? prev + 1 : prev));
  };

  const handlePrevStep = () => {
    setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomScale((prev) => Math.min(2.2, +(prev + 0.15).toFixed(2)));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomScale((prev) => Math.max(0.8, +(prev - 0.15).toFixed(2)));
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomScale(1);
  };

  const handleStartTour = (stepIdx: number = 0) => {
    setCurrentStepIndex(stepIdx);
    setIsTourActive(true);
  };

  const handleFinishTour = () => {
    setIsTourActive(false);
    window.open("https://app.workflowmitra.com", "_blank");
  };

  React.useEffect(() => {
    setZoomScale(1);
  }, [currentStepIndex]);

  // ESCAPE KEY LISTENER TO CLOSE FULLSCREEN MODAL & TOUR
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
        setIsTourActive(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
        <div className="mx-auto max-w-5xl px-4 pt-4 pb-8 sm:px-6 lg:px-8">

          {/* TOP SECTION HEADER: BADGE + TITLE + START GUIDE PILL BUTTON */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-zinc-100 px-3 py-0.5 text-xs font-bold text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
                <Sparkles className={`h-3.5 w-3.5 ${currentColor.textClass}`} /> Interactive Onboarding
              </span>
              <h1 className="mt-1.5 text-xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                How to Create Account in Workflow Mitra
              </h1>
            </div>

            <button
              onClick={() => handleStartTour(0)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-extrabold shadow-lg transition-all cursor-pointer border border-zinc-800 dark:border-zinc-200 shrink-0 ${currentColor.bgClass}`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Start Guide</span>
              <Play className="h-3 w-3 fill-current ml-0.5" />
            </button>
          </div>

          {/* CANVAS OUTER CARD */}
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-3.5 sm:p-5 shadow-lg dark:border-zinc-800 dark:bg-zinc-950 transition-all">

            {/* CARD INNER TOP HEADER BAR: PREV/NEXT NAVIGATOR & ANIMATED PROGRESS BAR */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
              {/* VISUAL PROGRESS BAR & STEP COUNTER */}
              <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-xs font-mono font-black ${currentColor.textClass}`}>
                    Step {currentStepIndex + 1} of {totalSteps}
                  </span>
                  <span className="text-[11px] font-bold text-zinc-400">
                    ({Math.round(((currentStepIndex + 1) / totalSteps) * 100)}%)
                  </span>
                </div>

                {/* ANIMATED PROGRESS BAR LINE */}
                <div className="relative h-2.5 flex-1 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden border border-zinc-200 dark:border-zinc-700/60">
                  <motion.div
                    className={`h-full rounded-full shadow-md ${currentColor.bgClass}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* STEP NAVIGATOR & DASHBOARD BUTTON */}
              <div className="flex items-center gap-2 shrink-0 justify-end">
                {currentStepIndex === totalSteps - 1 ? (
                  <a
                    href="https://app.workflowmitra.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 rounded-full text-white px-4 py-1 text-xs font-black shadow-md transition-all cursor-pointer animate-pulse ${currentColor.bgClass}`}
                  >
                    <span>Go to Dashboard 🚀</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}

                <div className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-900 shrink-0">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStepIndex === 0}
                    className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-zinc-700 hover:bg-white hover:shadow-xs disabled:opacity-30 disabled:cursor-not-allowed dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span>Prev</span>
                  </button>

                  {/* 6 INTERACTIVE STEP PILLS */}
                  <div className="flex items-center gap-1 px-1">
                    {onboardingGuide.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentStepIndex(idx)}
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
                    onClick={handleNextStep}
                    disabled={currentStepIndex === totalSteps - 1}
                    className="flex items-center gap-1 rounded-full bg-zinc-900 text-white px-3 py-1 text-xs font-bold hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed dark:bg-white dark:text-zinc-900 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Next</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* CENTER INTERACTIVE BROWSER FRAME & SCREENSHOT */}
            <div id="onboarding-browser-frame" className="mt-3">
              <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-900 shadow-md dark:border-zinc-800">

                {/* BROWSER TOP ADDRESS BAR */}
                <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block" />
                  </div>

                  {/* ADDRESS BAR WITH CLICK TO START STEP 1 TOUR */}
                  <div
                    id="url-address-bar"
                    onClick={() => handleStartTour(0)}
                    className={`relative flex items-center justify-center rounded-full bg-zinc-950 px-4 py-1.5 text-xs font-mono text-zinc-200 min-w-[280px] sm:min-w-[340px] max-w-full border transition-all duration-300 cursor-pointer ${
                      currentStepIndex === 0 || currentStep.hotspot.target === "url-bar"
                        ? `${currentColor.borderClass} ring-2 ring-zinc-500/40 shadow-md`
                        : "border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    {(currentStepIndex === 0 || currentStep.hotspot.target === "url-bar") && (
                      <span className={`absolute -left-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-white font-black text-[11px] shadow-lg border border-white dark:border-zinc-950 ${currentColor.bgClass}`}>
                        1
                      </span>
                    )}
                    <span className="truncate font-semibold text-zinc-200 tracking-wide select-none">
                      https://app.workflowmitra.com
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* ZOOM IN (+) / ZOOM OUT (-) CONTROL PILL */}
                    <div
                      className="flex items-center gap-0.5 rounded-lg border border-zinc-800 bg-zinc-950 p-0.5 text-xs text-zinc-300 shadow-inner"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={handleZoomOut}
                        disabled={zoomScale <= 0.8}
                        className="flex h-5 w-5 items-center justify-center rounded bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer font-bold text-xs"
                        title="Zoom Out (-)"
                      >
                        <ZoomOut className="h-3 w-3" />
                      </button>

                      <button
                        onClick={handleResetZoom}
                        className={`px-1.5 py-0.5 text-[10px] font-mono font-extrabold ${currentColor.textClass} hover:opacity-80 transition-colors cursor-pointer`}
                        title="Reset Zoom (100%)"
                      >
                        {Math.round(zoomScale * 100)}%
                      </button>

                      <button
                        onClick={handleZoomIn}
                        disabled={zoomScale >= 2.2}
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

                {/* SEAMLESS SCREENSHOT CONTAINER WITH NATIVE STEP POPOVER */}
                <div
                  className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] bg-zinc-950 flex items-center justify-center overflow-hidden cursor-pointer group"
                  onClick={() => setIsFullscreen(true)}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentStepIndex}-${imageVersion}`}
                      initial={{ opacity: 0, scale: zoomScale }}
                      animate={{ opacity: 1, scale: zoomScale }}
                      exit={{ opacity: 0, scale: zoomScale }}
                      transition={{ duration: 0.2 }}
                      className="relative h-full w-full origin-top transition-transform duration-200"
                    >
                      {/* Replaced next/image with <img> - unoptimized equivalent */}
                      <img
                        src={imageVersion ? `${currentStep.image}?v=${imageVersion}` : currentStep.image}
                        alt={currentStep.title}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        loading="eager"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* PULSING STEP HOTSPOT OVERLAY ON SCREENSHOT */}
                  {currentStep.hotspot.target === "image" && currentStep.hotspot.top && currentStep.hotspot.left && (
                    <div
                      id={`hotspot-step-${currentStepIndex + 1}`}
                      style={{ top: currentStep.hotspot.top, left: currentStep.hotspot.left }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group/hotspot cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartTour(currentStepIndex);
                      }}
                    >
                      <span className="absolute -inset-1.5 rounded-full bg-zinc-400 opacity-80 animate-ping" />
                      <span className="absolute -inset-0.5 rounded-full bg-zinc-500/50 animate-pulse" />

                      <span className={`relative flex h-6 w-6 items-center justify-center rounded-full text-white font-black text-[11px] shadow-lg border border-white dark:border-zinc-950 transition-transform group-hover/hotspot:scale-110 ${currentColor.bgClass}`}>
                        {currentStepIndex + 1}
                      </span>
                    </div>
                  )}

                  {/* NATIVE HIGH-QUALITY REACT STEP POPOVER CARD */}
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
                        {/* POPOVER HEADER: STEP TITLE + CLOSE BUTTON */}
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

                        {/* POPOVER DESCRIPTION BODY */}
                        <div className="py-3 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                          {currentStep.description}
                        </div>

                        {/* POPOVER FOOTER: STEP INDICATOR + PREV/NEXT BUTTONS */}
                        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                          <span className="text-xs font-mono font-extrabold text-zinc-400">
                            {currentStepIndex + 1} of {totalSteps}
                          </span>

                          <div className="flex items-center gap-2">
                            {currentStepIndex > 0 && (
                              <button
                                onClick={handlePrevStep}
                                className="rounded-xl border border-zinc-300 bg-zinc-100 px-3 py-1.5 text-xs font-extrabold text-zinc-800 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
                              >
                                ← Prev
                              </button>
                            )}

                            {currentStepIndex < totalSteps - 1 ? (
                              <button
                                onClick={handleNextStep}
                                className={`flex items-center gap-1 rounded-xl text-white px-4 py-1.5 text-xs font-black shadow-md transition-all cursor-pointer ${currentColor.bgClass}`}
                              >
                                <span>Next Step →</span>
                              </button>
                            ) : (
                              <button
                                onClick={handleFinishTour}
                                className={`flex items-center gap-1.5 rounded-xl text-white px-4 py-1.5 text-xs font-black shadow-md transition-all cursor-pointer animate-pulse ${currentColor.bgClass}`}
                              >
                                <span>Go to Dashboard 🚀</span>
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

          </div>

          {/* COMPREHENSIVE POINT-WISE STEP-BY-STEP GUIDE (STEPS 1 TO 5) */}
          <section className="mt-14 space-y-8">
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <div className={`flex items-center gap-2 font-extrabold text-xs tracking-wider uppercase ${currentColor.textClass}`}>
                <Sparkles className="h-4 w-4" /> Visual Walkthrough
              </div>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Step-by-Step Registration Guide
              </h2>
              <p className="mt-1 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Follow these clear, point-wise instructions to complete your Workflow Mitra account creation.
              </p>
            </div>

            {/* STEP 1 */}
            <div className="group rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-all hover:shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-center">
                {/* SLIGHTLY LARGER SCREENSHOT PANEL (7 COLUMNS / 58% WIDTH) */}
                <div
                  className="lg:col-span-7 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-md cursor-pointer relative group/img"
                  onClick={() => {
                    setCurrentStepIndex(0);
                    setIsFullscreen(true);
                  }}
                >
                  <div className="relative aspect-[16/10] w-full">
                    <img
                      src="/onboarding/step1.png"
                      alt="Step 1: Navigate to Workflow Mitra Signup Page"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-300 group-hover/img:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="flex items-center gap-1.5 rounded-full bg-zinc-900/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-white border border-zinc-700 shadow-lg">
                        <Maximize2 className="h-3.5 w-3.5" /> Click to Expand
                      </span>
                    </div>
                  </div>
                </div>

                {/* POINT-WISE DETAILED GUIDE PANEL (5 COLUMNS) */}
                <div className="lg:col-span-5 space-y-3.5">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-xl font-black text-sm shadow-md shrink-0 ${currentColor.bgClass}`}>
                      1
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white leading-tight">
                      Step 1. Navigate to the Workflow Mitra Signup Page
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800/80 space-y-3">
                    <p className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                      Open your web browser and navigate to the official Workflow Mitra portal:
                    </p>

                    <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span>Open your preferred web browser (Google Chrome, Safari, Firefox, Edge).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span>Click on the address bar at the top of your browser.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span>Type <code className={`px-1.5 py-0.5 rounded-md font-mono text-xs font-bold border bg-zinc-100 dark:bg-zinc-900 ${currentColor.textClass} ${currentColor.borderClass}`}>https://app.workflowmitra.com</code> and press <strong>Enter</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span>Verify that the secure SSL lock icon is displayed in your browser address bar.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="group rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-all hover:shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-center">
                <div
                  className="lg:col-span-7 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-md cursor-pointer relative group/img"
                  onClick={() => {
                    setCurrentStepIndex(1);
                    setIsFullscreen(true);
                  }}
                >
                  <div className="relative aspect-[16/10] w-full">
                    <img
                      src="/onboarding/step2.png"
                      alt="Step 2: Access Registration Form"
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
                  <div className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-xl font-black text-sm shadow-md shrink-0 ${currentColor.bgClass}`}>
                      2
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white leading-tight">
                      Step 2. Access the Registration Form
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800/80 space-y-3">
                    <p className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                      From the portal login screen, switch to the new account registration form:
                    </p>

                    <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span>You will see the official Workflow Mitra Login Portal screen.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span>Locate the <strong>"Create Account"</strong> link at the bottom of the sign-in card.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span>Click on <strong>Create Account</strong> to open the new user registration form.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="group rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-all hover:shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-center">
                <div
                  className="lg:col-span-7 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-md cursor-pointer relative group/img"
                  onClick={() => {
                    setCurrentStepIndex(2);
                    setIsFullscreen(true);
                  }}
                >
                  <div className="relative aspect-[16/10] w-full">
                    <img
                      src="/onboarding/step3.png"
                      alt="Step 3: Fill in Account Information"
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
                  <div className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-xl font-black text-sm shadow-md shrink-0 ${currentColor.bgClass}`}>
                      3
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white leading-tight">
                      Step 3. Fill in Account Details
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800/80 space-y-3">
                    <p className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                      Complete the signup form fields with your details:
                    </p>

                    <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span><strong>Full Name & Email:</strong> Enter your user's full name and valid email address.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span><strong>Password:</strong> Create a strong password (at least 8 characters) and confirm it.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span><strong>Account Name:</strong> Enter a unique workspace name (e.g., <code className={`px-1.5 py-0.5 rounded font-mono text-xs font-bold border bg-zinc-100 dark:bg-zinc-900 ${currentColor.textClass} ${currentColor.borderClass}`}>'myautomation123'</code>). If unavailable, try another unique name by adding numbers.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span>Then click the <strong>"Create Account"</strong> button to complete signup.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 4 */}
            <div className="group rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-all hover:shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-center">
                <div
                  className="lg:col-span-7 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-md cursor-pointer relative group/img"
                  onClick={() => {
                    setCurrentStepIndex(3);
                    setIsFullscreen(true);
                  }}
                >
                  <div className="relative aspect-[16/10] w-full">
                    <img
                      src="/onboarding/step4.png"
                      alt="Step 4: Email Verification"
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
                  <div className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-xl font-black text-sm shadow-md shrink-0 ${currentColor.bgClass}`}>
                      4
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white leading-tight">
                      Step 4. Verify Your Email Address
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800/80 space-y-3">
                    <p className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                      Confirm your email ownership to activate your account:
                    </p>

                    <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span>Open your email inbox (Gmail, Outlook, Yahoo, etc.).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span>Locate the verification email sent by <strong>Workflow Mitra</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span>Click the <strong>"Verify Email Link"</strong> to confirm your registration.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 5 */}
            <div className="group rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-all hover:shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-center">
                <div
                  className="lg:col-span-7 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-md cursor-pointer relative group/img"
                  onClick={() => {
                    setCurrentStepIndex(4);
                    setIsFullscreen(true);
                  }}
                >
                  <div className="relative aspect-[16/10] w-full">
                    <img
                      src="/onboarding/step6.png"
                      alt="Step 5: Sign In & Go to Dashboard"
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
                  <div className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-xl font-black text-sm shadow-md shrink-0 ${currentColor.bgClass}`}>
                      5
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white leading-tight">
                      Step 5. Sign In & Go to Dashboard
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800/80 space-y-4">
                    <p className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                      Log in with your newly created credentials to access your dashboard:
                    </p>

                    <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span>Return to the Workflow Mitra Sign In page.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span>Enter your registered <strong>Email Address</strong> and <strong>Password</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span>Click <strong>"Sign In"</strong> to access your main automation dashboard!</span>
                      </li>
                    </ul>

                    {/* GO TO DASHBOARD BUTTON */}
                    <div className="pt-2">
                      <a
                        href="https://app.workflowmitra.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black shadow-lg transition-all ${currentColor.bgClass} hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]`}
                      >
                        Go to Dashboard 🚀 <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* HELPFUL FEEDBACK WIDGET */}
        <section className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/60">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
              Was this article helpful?
            </h4>

            {feedbackGiven ? (
              <div className={`mt-3 flex items-center gap-2 text-xs font-extrabold ${currentColor.textClass}`}>
                <Sparkles className="h-4 w-4" />
                <span>Thank you for your feedback! 🎉</span>
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => setFeedbackGiven(true)}
                  className="flex items-center gap-2 rounded-2xl border border-zinc-300 bg-white px-5 py-2.5 text-xs font-bold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Yes</span>
                </button>
                <button
                  onClick={() => setFeedbackGiven(true)}
                  className="flex items-center gap-2 rounded-2xl border border-zinc-300 bg-white px-5 py-2.5 text-xs font-bold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>No</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* FULLSCREEN LIGHTBOX MODAL WITH NATIVE STEP POPOVER */}
        <AnimatePresence>
          {isFullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col bg-zinc-950/95 backdrop-blur-md p-4 sm:p-6 select-none"
            >
              {/* TOP HEADER CONTROLS */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 shrink-0">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${currentColor.bgClass}`}>
                    <Sparkles className="h-3.5 w-3.5" /> Fullscreen View
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight truncate max-w-[300px] sm:max-w-[500px]">
                    Step {currentStepIndex + 1}: {currentStep.title}
                  </h3>
                </div>

                {/* RIGHT CONTROLS: STEP NAVIGATOR + ZOOM + CLOSE (ESC) */}
                <div className="flex items-center gap-3">
                  {/* STEP NAVIGATOR */}
                  <div className="flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900 p-1">
                    <button
                      onClick={handlePrevStep}
                      disabled={currentStepIndex === 0}
                      className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 disabled:opacity-30 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      <span>Prev</span>
                    </button>
                    <span className="px-2 text-xs font-mono font-bold text-zinc-400">
                      {currentStepIndex + 1}/{totalSteps}
                    </span>
                    <button
                      onClick={handleNextStep}
                      disabled={currentStepIndex === totalSteps - 1}
                      className={`flex items-center gap-1 rounded-full text-white px-2.5 py-0.5 text-xs font-semibold disabled:opacity-30 transition-all cursor-pointer ${currentColor.bgClass}`}
                    >
                      <span>Next</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* ZOOM CONTROLS */}
                  <div className="flex items-center gap-0.5 rounded-lg border border-zinc-800 bg-zinc-900 p-0.5 text-xs text-zinc-300">
                    <button
                      onClick={handleZoomOut}
                      disabled={zoomScale <= 0.8}
                      className="flex h-6 w-6 items-center justify-center rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white disabled:opacity-30 transition-all cursor-pointer font-bold text-xs"
                      title="Zoom Out (-)"
                    >
                      <ZoomOut className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={handleResetZoom}
                      className={`px-2 py-0.5 text-xs font-mono font-extrabold ${currentColor.textClass} hover:opacity-80 transition-colors cursor-pointer`}
                      title="Reset Zoom (100%)"
                    >
                      {Math.round(zoomScale * 100)}%
                    </button>
                    <button
                      onClick={handleZoomIn}
                      disabled={zoomScale >= 2.2}
                      className="flex h-6 w-6 items-center justify-center rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white disabled:opacity-30 transition-all cursor-pointer font-bold text-xs"
                      title="Zoom In (+)"
                    >
                      <ZoomIn className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* CLOSE / ESC BUTTON */}
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="flex items-center gap-1.5 rounded-full bg-zinc-800 px-3.5 py-1.5 text-xs font-bold text-zinc-200 hover:bg-rose-600 hover:text-white transition-all cursor-pointer shadow-md"
                    title="Close Fullscreen (Esc)"
                  >
                    <X className="h-4 w-4" />
                    <span>Esc</span>
                  </button>
                </div>
              </div>

              {/* MAIN FULLSCREEN SCREENSHOT DISPLAY AREA */}
              <div className="relative flex-1 w-full mt-4 bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 flex items-center justify-center">
                <motion.div
                  key={`fullscreen-${currentStepIndex}-${imageVersion}`}
                  initial={{ opacity: 0, scale: zoomScale }}
                  animate={{ opacity: 1, scale: zoomScale }}
                  exit={{ opacity: 0, scale: zoomScale }}
                  transition={{ duration: 0.2 }}
                  className="relative h-full w-full origin-top transition-transform duration-200"
                >
                  <img
                    src={imageVersion ? `${currentStep.image}?v=${imageVersion}` : currentStep.image}
                    alt={currentStep.title}
                    className="absolute inset-0 w-full h-full object-contain object-top"
                  />
                </motion.div>

                {/* PULSING STEP HOTSPOT OVERLAY INSIDE FULLSCREEN */}
                {currentStep.hotspot.target === "image" && currentStep.hotspot.top && currentStep.hotspot.left && (
                  <div
                    id={`fullscreen-hotspot-step-${currentStepIndex + 1}`}
                    style={{ top: currentStep.hotspot.top, left: currentStep.hotspot.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartTour(currentStepIndex);
                    }}
                  >
                    <span className="absolute -inset-2 rounded-full bg-zinc-400 opacity-80 animate-ping" />
                    <span className="absolute -inset-1 rounded-full bg-zinc-500/50 animate-pulse" />

                    <span className={`relative flex h-8 w-8 items-center justify-center rounded-full text-white font-black text-xs shadow-2xl border-2 border-white transition-transform hover:scale-110 ${currentColor.bgClass}`}>
                      {currentStepIndex + 1}
                    </span>
                  </div>
                )}

                {/* NATIVE HIGH-QUALITY REACT STEP POPOVER CARD IN FULLSCREEN */}
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
                      {/* POPOVER HEADER: STEP TITLE + CLOSE BUTTON */}
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

                      {/* POPOVER DESCRIPTION BODY */}
                      <div className="py-3 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                        {currentStep.description}
                      </div>

                      {/* POPOVER FOOTER: STEP INDICATOR + PREV/NEXT BUTTONS */}
                      <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                        <span className="text-xs font-mono font-extrabold text-zinc-400">
                          {currentStepIndex + 1} of {totalSteps}
                        </span>

                        <div className="flex items-center gap-2">
                          {currentStepIndex > 0 && (
                            <button
                              onClick={handlePrevStep}
                              className="rounded-xl border border-zinc-300 bg-zinc-100 px-3 py-1.5 text-xs font-extrabold text-zinc-800 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
                            >
                              ← Prev
                            </button>
                          )}

                          {currentStepIndex < totalSteps - 1 ? (
                            <button
                              onClick={handleNextStep}
                              className={`flex items-center gap-1 rounded-xl text-white px-4 py-1.5 text-xs font-black shadow-md transition-all cursor-pointer ${currentColor.bgClass}`}
                            >
                              <span>Next Step →</span>
                            </button>
                          ) : (
                            <button
                              onClick={handleFinishTour}
                              className={`flex items-center gap-1.5 rounded-xl text-white px-4 py-1.5 text-xs font-black shadow-md transition-all cursor-pointer animate-pulse ${currentColor.bgClass}`}
                            >
                              <span>Go to Dashboard 🚀</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
