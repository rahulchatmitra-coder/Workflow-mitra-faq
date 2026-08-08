import * as React from "react";
import { motion } from "framer-motion";
import { ClipboardList, ChevronRight, KeyRound, Bot, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTextColor } from "@/context/TextColorContext";

export function OnboardingSection() {
  const { currentColor } = useTextColor();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 space-y-8"
    >
      <div className="text-center space-y-2">
        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-extrabold border uppercase tracking-wider bg-zinc-100 dark:bg-zinc-900 ${currentColor.textClass} ${currentColor.borderClass}`}>
          <Sparkles className="h-3.5 w-3.5" /> Documentation Hub
        </div>
        <h2 className={`text-3xl font-black tracking-tight sm:text-4xl ${currentColor.textClass}`}>
          Getting Started & Integration Guides
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
          Explore complete walkthroughs for account setup, 10+ third-party credentials vault, and AI automation nodes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* BOX 1: ONBOARDING CATEGORY BOX */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
        >
          <div>
            {/* Header */}
            <div className="flex items-start gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">
                <ClipboardList className="h-5.5 w-5.5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Step-by-Step Onboarding
                </h3>
                <p className={`text-xs font-semibold mt-0.5 ${currentColor.textClass}`}>
                  (Must Complete)
                </p>
              </div>
            </div>

            {/* Article Count */}
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider mt-4">
              2 articles in this category
            </p>

            {/* Article Links */}
            <div className="mt-3 space-y-1">
              <Link
                to="/create-account"
                className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer group"
              >
                <span>How to create account in Workflow Mitra?</span>
                <ChevronRight className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/create-account"
                className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer group"
              >
                <span>How to login to Workflow Mitra?</span>
                <ChevronRight className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Show All Link */}
            <Link
            to="/create-account"
            className={`mt-6 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider hover:underline cursor-pointer pt-4 border-t border-zinc-100 dark:border-zinc-800 ${currentColor.textClass}`}
          >
            <span>View Account Guide</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* BOX 2: 10+ CREDENTIALS & INTEGRATIONS BOX */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 transition-all duration-300 hover:shadow-xl flex flex-col justify-between relative overflow-hidden"
        >
          {/* Featured Badge Pill */}
          <div className={`absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black shadow-md ${currentColor.bgClass}`}>
            10+ Integrations
          </div>

          <div>
            {/* Header */}
            <div className="flex items-start gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">
                <KeyRound className="h-5.5 w-5.5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Integrations & Credentials
                </h3>
                <p className={`text-xs font-semibold mt-0.5 ${currentColor.textClass}`}>
                  (10+ Supported Apps)
                </p>
              </div>
            </div>

            {/* Article Count */}
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider mt-4">
              10+ Credentials Integrations
            </p>

            {/* Article Links */}
            <div className="mt-3 space-y-1">
              <Link
                to="/credentials"
                className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer group"
              >
                <span>How to create & manage credentials in Workflow Mitra?</span>
                <ChevronRight className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/credentials"
                className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer group"
              >
                <span>How to connect OpenAI, Claude & Telegram bots?</span>
                <ChevronRight className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/credentials"
                className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer group"
              >
                <span>How to pair Slack, Zoho CRM, Shopify & Zoom keys?</span>
                <ChevronRight className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Show All Link */}
          <Link
            to="/credentials"
            className={`mt-6 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider hover:underline cursor-pointer pt-4 border-t border-zinc-100 dark:border-zinc-800 ${currentColor.textClass}`}
          >
            <span>Explore 10+ Integrations Guide</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* BOX 3: AI AUTOMATION PIPELINES BOX */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
        >
          <div>
            {/* Header */}
            <div className="flex items-start gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">
                <Bot className="h-5.5 w-5.5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  AI Agents & Workflows
                </h3>
                <p className={`text-xs font-semibold mt-0.5 ${currentColor.textClass}`}>
                  (Autonomous Execution)
                </p>
              </div>
            </div>

            {/* Article Count */}
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider mt-4">
              4 articles in this category
            </p>

            {/* Article Links */}
            <div className="mt-3 space-y-1">
              <a
                href="#ai-agents-guide"
                className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer group"
              >
                <span>Guide to OpenAI GPT-4o Autonomous AI Agents</span>
                <ChevronRight className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#ai-lead-routing"
                className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer group"
              >
                <span>How to Automate AI Lead Routing & Gmail</span>
                <ChevronRight className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Show All Link */}
          <a
            href="#popular-guides"
            className={`mt-6 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider hover:underline cursor-pointer pt-4 border-t border-zinc-100 dark:border-zinc-800 ${currentColor.textClass}`}
          >
            <span>Show all AI Guides</span>
            <ChevronRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

