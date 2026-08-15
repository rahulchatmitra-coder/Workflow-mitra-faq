import * as React from "react";
import { motion } from "framer-motion";
import { ClipboardList, ChevronRight, KeyRound, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTextColor } from "@/context/TextColorContext";
import { PROVIDER_LIST } from "@/data/credentials-data";

export function OnboardingSection() {
  const { currentColor } = useTextColor();
  const providerCount = PROVIDER_LIST.length; // 37

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 space-y-8"
    >
      {/* SECTION HEADER */}
      <div className="text-center space-y-2">
        <div className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-extrabold border uppercase tracking-wider bg-zinc-100 dark:bg-zinc-900 ${currentColor.textClass} ${currentColor.borderClass}`}>
          <Sparkles className="h-3.5 w-3.5" /> Documentation Hub
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          Getting Started & Integration Guides
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
          Explore complete walkthroughs for account setup and the {providerCount}+ third-party credentials vault.
        </p>
      </div>

      {/* 2 CLEAN GRID BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        
        {/* BOX 1: ONBOARDING CATEGORY BOX */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            {/* Header */}
            <div className="flex items-start gap-3.5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                <ClipboardList className={`h-6 w-6 ${currentColor.textClass}`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Account Setup & Tour
                </h3>
                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Essential First Steps
                </p>
              </div>
            </div>

            {/* Sub-label */}
            <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider mt-4">
              2 Interactive Setup Steps
            </p>

            {/* Clean Links List */}
            <div className="mt-3 space-y-1.5">
              <Link
                to="/create-account"
                className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer group"
              >
                <span className="leading-snug">How to create your account & workspace?</span>
                <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/create-account"
                className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer group"
              >
                <span className="leading-snug">How to log in & navigate the dashboard?</span>
                <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bottom Action Link */}
          <Link
            to="/create-account"
            className={`mt-6 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider hover:underline cursor-pointer pt-4 border-t border-zinc-100 dark:border-zinc-800 ${currentColor.textClass}`}
          >
            <span>Open Account Setup Guide</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* BOX 2: 37+ CREDENTIALS & INTEGRATIONS BOX */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
        >
          {/* Top-Right Badge */}
          <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs">
            {providerCount}+ Providers
          </div>

          <div>
            {/* Header */}
            <div className="flex items-start gap-3.5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                <KeyRound className={`h-6 w-6 ${currentColor.textClass}`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Integrations & Credentials
                </h3>
                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Secure API Key Vault
                </p>
              </div>
            </div>

            {/* Sub-label */}
            <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider mt-4">
              {providerCount}+ Connected Services
            </p>

            {/* Clean Links List */}
            <div className="mt-3 space-y-1.5">
              <Link
                to="/credentials"
                className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer group"
              >
                <span className="leading-snug">How to connect & manage API credentials?</span>
                <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/credentials/whatsapp"
                className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer group"
              >
                <span className="leading-snug">WhatsApp (Meta, ChatMitra, AiSensy, WATI)</span>
                <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/credentials"
                className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer group"
              >
                <span className="leading-snug">OpenAI, Claude, HubSpot, Shopify & Zoom</span>
                <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bottom Action Link */}
          <Link
            to="/credentials"
            className={`mt-6 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider hover:underline cursor-pointer pt-4 border-t border-zinc-100 dark:border-zinc-800 ${currentColor.textClass}`}
          >
            <span>Explore {providerCount}+ Integrations Guide</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
