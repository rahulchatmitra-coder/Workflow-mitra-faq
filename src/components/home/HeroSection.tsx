import * as React from "react";
import { motion } from "framer-motion";
import { HelpCircle, MessageCircleQuestion, Sparkles, Search, ClipboardList, Zap, Building2 } from "lucide-react";
import { Openai, Slack, WhatsappIcon, Google } from "@/components/ui/svgs";

interface HeroSectionProps {
  onOpenSearch: () => void;
}

const HERO_TAG_ICONS: Record<string, React.ReactNode> = {
  OpenAI: <Openai className="h-4 w-4 shrink-0" />,
  Webhooks: <Zap className="h-4 w-4 shrink-0 text-amber-500" />,
  HubSpot: <Building2 className="h-4 w-4 shrink-0 text-orange-500" />,
  Slack: <Slack className="h-4 w-4 shrink-0" />,
  WhatsApp: <WhatsappIcon className="h-4 w-4 shrink-0" />,
  Google: <Google className="h-4 w-4 shrink-0" />,
};

const HERO_TAG_LABELS: Record<string, string> = {
  OpenAI: "AI Agents & OpenAI",
  Webhooks: "Webhook Triggers",
  HubSpot: "HubSpot CRM",
  Slack: "Slack Alerts",
  WhatsApp: "WhatsApp Cloud API",
  Google: "Google Sheets",
};

export function HeroSection({ onOpenSearch }: HeroSectionProps) {
  return (
    <motion.section
      id="tour-overview"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50/50 py-16 dark:from-black dark:via-zinc-950 dark:to-black border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200"
    >
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 relative">
        {/* Floating Question Mark Left Bubble */}
        <div className="hidden sm:flex absolute left-4 top-4 h-12 w-12 items-center justify-center rounded-full bg-white text-zinc-900 shadow-xl border border-zinc-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-800 animate-bounce">
          <HelpCircle className="h-6 w-6" />
        </div>

        {/* Floating Speech Bubble Right */}
        <div className="hidden sm:flex absolute right-4 top-8 h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl border border-zinc-800 dark:bg-white dark:text-zinc-900 dark:border-zinc-200">
          <MessageCircleQuestion className="h-6 w-6" />
        </div>

        {/* Value Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-xs font-bold text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-white mb-6"
        >
          <Sparkles className="h-4 w-4" /> Workflow Mitra Automation Help Center
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white"
        >
          Hi, how can we help?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-normal"
        >
          Search 100+ automation guides, AI agent nodes, webhook triggers, API credentials, and execution troubleshooting FAQs.
        </motion.p>

        {/* SLEEK MEDIUM COOL SEARCH BAR */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mx-auto mt-7 max-w-2xl"
        >
          <button
            onClick={onOpenSearch}
            className="group relative flex w-full items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-zinc-50/80 px-4.5 py-3 shadow-sm backdrop-blur-xs transition-all duration-200 hover:border-zinc-400 hover:bg-white hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:shadow-zinc-950/50 cursor-pointer"
          >
            <div className="flex items-center gap-3 text-zinc-400 dark:text-zinc-500 overflow-hidden">
              <Search className="h-4.5 w-4.5 shrink-0 text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-200" />
              <span className="text-sm font-normal text-zinc-500 truncate group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-200">
                Search guides, API keys, webhooks, or ask a question...
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-[11px] font-semibold text-zinc-500 shadow-2xs group-hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:group-hover:border-zinc-700">
                <span className="text-[10px]">Ctrl</span> K
              </kbd>
            </div>
          </button>

          {/* Quick Category Badges with REAL SVG Logos */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2">
            {Object.keys(HERO_TAG_ICONS).map((key) => (
              <button
                key={key}
                onClick={onOpenSearch}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800/80 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white transition-all cursor-pointer shadow-xs"
              >
                {HERO_TAG_ICONS[key]}
                <span>{HERO_TAG_LABELS[key]}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Floating Clipboard Icon */}
        <div className="mt-8 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-zinc-900 shadow-md border border-zinc-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-800">
            <ClipboardList className="h-6 w-6" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
