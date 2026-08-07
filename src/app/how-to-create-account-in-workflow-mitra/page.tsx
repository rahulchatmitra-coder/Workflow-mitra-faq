"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Calendar,
  ArrowLeft,
  Maximize2,
  Minimize2,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  ExternalLink,
  HelpCircle,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { driver, Driver, DriveStep } from "driver.js";
import "driver.js/dist/driver.css";
import { useTextColor } from "@/context/TextColorContext";
import { Accordion } from "@/components/ui/accordion";

export interface OnboardingStep {
  image: string;
  title: string;
  description: string;
}

export const onboardingGuide: OnboardingStep[] = [
  {
    image: "/onboarding/step1.png",
    title: "Open Workflow Mitra",
    description:
      "Open your preferred web browser.\nType the following URL into the address bar:\n\nhttps://app.workflowmitra.com\n\nPress Enter.",
  },
  {
    image: "/onboarding/step2.png",
    title: "Welcome to Workflow Mitra",
    description:
      "You are now on the Login page.\n\nIf you are a new user, click \"Create Account\".\n\nIf you already have an account, enter your Email and Password and click Sign In.",
  },
  {
    image: "/onboarding/step3.png",
    title: "Create Your Account",
    description:
      "Complete the registration form.\n\nFill in:\n• Full Name\n• Business Name\n• Email Address\n• Mobile Number\n• Password\n\nThen click Create Account.",
  },
  {
    image: "/onboarding/step4.png",
    title: "Verify Your Email",
    description:
      "Open your email inbox.\n\nClick the verification link sent by Workflow Mitra.\n\nAfter verification return to the Login page.",
  },
  {
    image: "/onboarding/step5.png",
    title: "Login",
    description:
      "Enter:\n• Email Address\n• Password\n\nComplete the CAPTCHA if shown.\n\nClick Sign In.",
  },
  {
    image: "/onboarding/step6.png",
    title: "Welcome Dashboard",
    description:
      "Congratulations!\n\nYou have successfully logged in.\n\nNow you can:\n• Create Workflows\n• Connect Apps\n• Build AI Automations\n• Manage Teams",
  },
];

export default function HowToCreateAccountPage() {
  const { currentColor } = useTextColor();
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [feedbackGiven, setFeedbackGiven] = React.useState(false);

  const totalSteps = onboardingGuide.length;
  const currentStep = onboardingGuide[currentStepIndex];

  const handleNextStep = () => {
    setCurrentStepIndex((prev) => (prev < totalSteps - 1 ? prev + 1 : prev));
  };

  const handlePrevStep = () => {
    setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // DRIVER.JS GUIDED TOUR DIRECTLY STEPPING THROUGH SCREENSHOTS WITH NON-OVERLAPPING POPOVERS
  const startDriverTour = React.useCallback(() => {
    setCurrentStepIndex(0);

    const steps: DriveStep[] = [
      {
        element: "#onboarding-browser-frame",
        onHighlightStarted: () => setCurrentStepIndex(0),
        popover: {
          title: "Step 1 of 6: Open Workflow Mitra",
          description: "Open your web browser (Chrome, Safari, Firefox, Edge). Type https://app.workflowmitra.com into the URL address bar and press Enter.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#onboarding-browser-frame",
        onHighlightStarted: () => setCurrentStepIndex(1),
        popover: {
          title: "Step 2 of 6: Welcome & Sign In Screen",
          description: "You are on the official login page.\n• New users: Click 'Create Account'\n• Existing users: Enter Email & Password and click 'Sign In'",
          side: "top",
          align: "center",
        },
      },
      {
        element: "#onboarding-browser-frame",
        onHighlightStarted: () => setCurrentStepIndex(2),
        popover: {
          title: "Step 3 of 6: Fill Registration Form",
          description: "Fill in:\n• Full Name & Business Name\n• Email Address & Mobile Number\n• Password\nThen click 'Create Account'.",
          side: "bottom",
          align: "end",
        },
      },
      {
        element: "#onboarding-browser-frame",
        onHighlightStarted: () => setCurrentStepIndex(3),
        popover: {
          title: "Step 4 of 6: Verify Email Inbox",
          description: "Open your email inbox and click the verification link sent by Workflow Mitra, then return to the Login screen.",
          side: "top",
          align: "start",
        },
      },
      {
        element: "#onboarding-browser-frame",
        onHighlightStarted: () => setCurrentStepIndex(4),
        popover: {
          title: "Step 5 of 6: Login",
          description: "Enter your verified Email Address and Password. Complete security CAPTCHA if shown and click 'Sign In'.",
          side: "bottom",
          align: "center",
        },
      },
      {
        element: "#onboarding-browser-frame",
        onHighlightStarted: () => setCurrentStepIndex(5),
        popover: {
          title: "Step 6 of 6: Welcome Dashboard 🎉",
          description: "Congratulations! You have logged in and are ready to create workflows, connect apps, and build AI automations!",
          side: "top",
          align: "end",
        },
      },
      {
        element: "#onboarding-cta",
        popover: {
          title: "Start Building Automations Now ⚡",
          description: "Click 'Start Building Now' to open https://app.workflowmitra.com in a new tab and start building!",
          side: "top",
          align: "center",
        },
      },
    ];

    const driverObj: Driver = driver({
      showProgress: true,
      popoverClass: "workflow-mitra-popover",
      steps: steps,
      nextBtnText: "Next Step →",
      prevBtnText: "← Previous",
      doneBtnText: "Finish Guide 🎉",
    });

    driverObj.drive();
  }, []);

  const faqItems = [
    {
      id: "faq-acc-1",
      title: "How do I create an account?",
      content: (
        <p>
          Visit{" "}
          <a
            href="https://app.workflowmitra.com"
            target="_blank"
            rel="noreferrer"
            className="underline font-bold"
          >
            https://app.workflowmitra.com
          </a>
          , click on &quot;Create Account&quot;, fill in your Full Name, Business Name, Email Address, Mobile Number, and Password, then click &quot;Create Account&quot; to complete registration.
        </p>
      ),
    },
    {
      id: "faq-acc-2",
      title: "I forgot my password.",
      content: (
        <p>
          On the Login page, click the &quot;Forgot Password?&quot; link below the password input field. Enter your registered email address to receive a secure password reset link.
        </p>
      ),
    },
    {
      id: "faq-acc-3",
      title: "I didn't receive the verification email.",
      content: (
        <p>
          First, check your Spam or Junk mail folders. If you still cannot find it, return to the Login page and click &quot;Resend Verification Email&quot;. Make sure your email address was typed correctly.
        </p>
      ),
    },
    {
      id: "faq-acc-4",
      title: "How do I log in?",
      content: (
        <p>
          Navigate to{" "}
          <a
            href="https://app.workflowmitra.com"
            target="_blank"
            rel="noreferrer"
            className="underline font-bold"
          >
            https://app.workflowmitra.com
          </a>
          , enter your registered Email Address and Password, solve CAPTCHA if prompted, and click &quot;Sign In&quot;.
        </p>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-200 text-zinc-900 dark:text-zinc-100 pb-20">
      {/* BACK NAVIGATION BAR */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Help Center</span>
          </Link>
        </div>
      </div>

      {/* ARTICLE HEADER */}
      <motion.div
        id="onboarding-header"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl px-4 pt-8 pb-4 sm:px-6 lg:px-8"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3.5 py-1 text-xs font-bold text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 mb-3 shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Onboarding Player</span>
          </div>

          <h1 className={`text-3xl sm:text-5xl font-black tracking-tight ${currentColor.textClass}`}>
            How to Create Account in Workflow Mitra
          </h1>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>3 min read</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>Last updated: 11.02.2025</span>
          </div>
        </div>
      </motion.div>

      {/* PREMIUM INTERACTIVE ONBOARDING PLAYER */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
          
          {/* PROGRESS BAR */}
          <div id="onboarding-progress" className="pb-4">
            <div className="flex items-center justify-between text-xs font-extrabold text-zinc-700 dark:text-zinc-300 mb-2">
              <span className="uppercase tracking-wider">Onboarding Progress</span>
              <span>{Math.round(((currentStepIndex + 1) / totalSteps) * 100)}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <motion.div
                className="h-full bg-zinc-900 dark:bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* ELEGANT BROWSER-STYLE WINDOW FRAME */}
          <div id="onboarding-browser-frame" className="mt-1">
            <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-900 shadow-2xl dark:border-zinc-800">
              
              {/* Browser Top Window Bar */}
              <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-amber-500 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
                </div>

                <div className="flex items-center justify-center rounded-xl bg-zinc-950 px-6 py-1 text-xs font-mono text-zinc-300 w-80 truncate border border-zinc-800">
                  https://app.workflowmitra.com
                </div>

                <button
                  onClick={() => setIsFullscreen(true)}
                  className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1 text-xs text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer"
                  title="Click to Zoom Fullscreen"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline font-bold">Zoom</span>
                </button>
              </div>

              {/* SEAMLESS HIGH-DEFINITION SCREENSHOT CONTAINER */}
              <div
                className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] bg-zinc-950 flex items-center justify-center overflow-hidden cursor-pointer group"
                onClick={() => setIsFullscreen(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStepIndex}
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.25 }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={currentStep.image}
                      alt={currentStep.title}
                      fill
                      unoptimized
                      className="object-contain object-top"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Subtle Hover Zoom Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 border border-zinc-700 shadow-xl">
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>Click to Zoom HD</span>
                  </div>
                </div>
              </div>

              {/* DEDICATED SLICK PLAYER CONTROL BAR (LOCATED NATIVELY BELOW SCREENSHOT - NO OVERLAP) */}
              <div className="border-t border-zinc-800 bg-zinc-900 px-4 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Step Info */}
                <div className="flex items-center gap-3 text-left w-full sm:w-auto">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-black text-white border border-zinc-700 shrink-0">
                    {currentStepIndex + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug truncate max-w-[240px] sm:max-w-[320px]">
                      {currentStep.title}
                    </h4>
                    <p className="text-xs text-zinc-400 font-medium">
                      Step {currentStepIndex + 1} of {totalSteps}
                    </p>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="flex items-center justify-center gap-3 w-full sm:w-auto">
                  {/* Step Nav Prev */}
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStepIndex === 0}
                    className="flex items-center gap-1 rounded-xl bg-zinc-800 px-3 py-2 text-xs font-bold text-zinc-200 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer border border-zinc-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  {/* START GUIDED TOUR BUTTON */}
                  <button
                    onClick={startDriverTour}
                    className="flex items-center gap-2 rounded-full bg-white text-zinc-950 px-5 py-2.5 text-xs sm:text-sm font-extrabold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border border-zinc-200"
                  >
                    <Play className="h-4 w-4 fill-current text-emerald-600" />
                    <span>Start Guided Tour</span>
                  </button>

                  {/* Step Nav Next */}
                  <button
                    onClick={handleNextStep}
                    disabled={currentStepIndex === totalSteps - 1}
                    className="flex items-center gap-1 rounded-xl bg-zinc-800 px-3 py-2 text-xs font-bold text-zinc-200 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer border border-zinc-700"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* HELPFUL FEEDBACK WIDGET */}
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center rounded-3xl border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/60">
          <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
            Was this article helpful?
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

      {/* FAQ ACCORDION */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="pb-6">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <HelpCircle className="h-4 w-4 text-zinc-900 dark:text-white" />
            <span>Onboarding Help</span>
          </div>
          <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white mt-1">
            Frequently Asked Questions
          </h3>
        </div>
        <Accordion items={faqItems} allowMultiple={true} />
      </section>

      {/* CTA SECTION */}
      <section id="onboarding-cta" className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-900 bg-zinc-900 p-8 sm:p-12 text-center text-white dark:border-zinc-700 dark:bg-zinc-900 shadow-2xl">
          <Sparkles className="mx-auto h-10 w-10 text-white mb-3" />
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
            Ready to Transform Your Workflow Automations?
          </h3>
          <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-xl mx-auto font-normal">
            Get started with Workflow Mitra visual AI nodes today and build powerful automated pipelines.
          </p>
          <a
            href="https://app.workflowmitra.com"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-sm font-extrabold text-zinc-900 shadow-xl hover:bg-zinc-100 transition-all cursor-pointer"
          >
            <span>Start Building Now</span>
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </div>
      </section>

      {/* FULLSCREEN PREVIEW MODAL */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-7xl max-h-[95vh] flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors cursor-pointer"
              >
                <Minimize2 className="h-5 w-5" />
              </button>

              <div className="relative aspect-video w-full max-h-[85vh] overflow-hidden rounded-2xl">
                <Image
                  src={currentStep.image}
                  alt={currentStep.title}
                  fill
                  unoptimized
                  className="object-contain"
                  priority
                />
              </div>

              <div className="mt-4 text-center text-white">
                <h4 className="text-xl font-bold">{currentStep.title}</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Step {currentStepIndex + 1} of {totalSteps}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
