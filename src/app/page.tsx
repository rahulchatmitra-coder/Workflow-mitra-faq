"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  MessageCircleQuestion,
  ClipboardList,
  Search,
  Sparkles,
} from "lucide-react";
import { DriverTourButton } from "@/components/docs/DriverTourButton";
import { WorkflowCanvas } from "@/components/docs/WorkflowCanvas";
import { PopularCategoryGrid } from "@/components/docs/PopularCategoryGrid";
import { SearchModal } from "@/components/common/SearchModal";
import { Accordion } from "@/components/ui/accordion";

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const heroTags = [
    { label: "🤖 AI Agents & OpenAI", keyword: "OpenAI" },
    { label: "⚡ Webhook Triggers", keyword: "Webhooks" },
    { label: "💼 HubSpot CRM", keyword: "HubSpot" },
    { label: "💬 Slack Alerts", keyword: "Slack" },
    { label: "📲 WhatsApp Cloud API", keyword: "WhatsApp" },
    { label: "📊 Google Sheets", keyword: "Google" },
  ];

  const homeFaqs = [
    {
      id: "faq-1",
      title: "How does Workflow Mitra route Facebook leads to HubSpot, Slack & Google Sheets?",
      content: (
        <p>
          Workflow Mitra captures incoming webhooks from Facebook Lead Ads, evaluates email filter logic (`IF 1st Has an email`), posts data to HubSpot CRM, assigns sales owners round-robin, and dispatches multi-channel alerts to Gmail, Slack, and Google Sheets simultaneously.
        </p>
      ),
    },
    {
      id: "faq-2",
      title: "How does the Driver.js interactive guided tour work?",
      content: (
        <p>
          Clicking &quot;Start Guide&quot; launches Driver.js, which smoothly highlights each step on the visual canvas—from Facebook Webhook, IF filter, HubSpot App Request, Team Assignment, to Gmail, Slack, and Sheets actions—with step-by-step visual popovers.
        </p>
      ),
    },
    {
      id: "faq-3",
      title: "Can I simulate live execution on the canvas?",
      content: (
        <p>
          Yes! Click the &quot;▶ Run&quot; button on the bottom canvas control bar to launch a live visual simulation of the lead routing pipeline in real time.
        </p>
      ),
    },
  ];

  return (
    <main className="min-h-screen pb-20 bg-white dark:bg-black transition-colors duration-200">
      {/* ULTRA-PREMIUM HERO SECTION WITH SMOOTH SCROLL REVEAL ANIMATIONS */}
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

          {/* Headline matching ChatMitra / Workflow Mitra Hero */}
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

          {/* ULTRA-PREMIUM SEARCH BAR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto mt-8 max-w-2xl"
          >
            <button
              onClick={() => setIsSearchOpen(true)}
              className="group relative flex w-full items-center justify-between rounded-full border border-zinc-300/90 bg-white px-6 py-4 shadow-2xl transition-all duration-300 hover:border-zinc-900 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:border-zinc-700/80 dark:bg-zinc-900/90 dark:hover:border-zinc-300 dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer"
            >
              <div className="flex items-center gap-3.5 text-zinc-400 dark:text-zinc-500">
                <Search className="h-5 w-5 text-zinc-900 transition-transform duration-300 group-hover:scale-110 dark:text-white" />
                <span className="text-sm sm:text-base font-medium text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white">
                  Search guides, API keys, webhooks, or ask a question...
                </span>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold transition-transform duration-300 group-hover:scale-105 shadow-md">
                <Search className="h-4 w-4" />
              </div>
            </button>

            {/* Quick Automation Category Badges */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {heroTags.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => setIsSearchOpen(true)}
                  className="rounded-full border border-zinc-200 bg-white px-3.5 py-1 text-xs font-semibold text-zinc-700 hover:border-zinc-900 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-400 transition-all shadow-sm cursor-pointer"
                >
                  {tag.label}
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

      {/* 4 POPULAR ARTICLE CARDS GRID WITH SECTION TITLE "Workflow Mitra FAQ Guide" */}
      <PopularCategoryGrid />

      {/* VISUAL WORKFLOW CANVAS SHOWCASE */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between pb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-zinc-100 px-3.5 py-1 text-xs font-bold text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
              <Sparkles className="h-3.5 w-3.5" /> Interactive Flow Demo
            </span>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Workflow Automation Builder
            </h3>
          </div>
          <DriverTourButton title="Interactive Workflow Demo" size="lg" className="shrink-0" />
        </div>

        {/* AUTHENTIC WORKFLOW MITRA VISUAL CANVAS COMPONENT */}
        <WorkflowCanvas />
      </motion.section>

      {/* STEP-BY-STEP ONBOARDING SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* ONBOARDING CATEGORY BOX */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 transition-colors duration-200"
          >
            {/* Header */}
            <div className="flex items-start gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Step-by-Step Onboarding
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  (Must Complete)
                </p>
              </div>
            </div>

            {/* Article Count */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-semibold mt-4">
              2 articles in this category
            </p>

            {/* Article Links with Arrows */}
            <div className="mt-4 space-y-1">
              <a
                href="/how-to-create-account-in-workflow-mitra"
                className="flex items-center justify-between py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer group"
              >
                <span>How to create account in Workflow Mitra?</span>
                <svg className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="/how-to-create-account-in-workflow-mitra"
                className="flex items-center justify-between py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer group"
              >
                <span>How to login to Workflow Mitra?</span>
                <svg className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Show All Button */}
            <a 
              href="/how-to-create-account-in-workflow-mitra"
              className="mt-6 flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white cursor-pointer"
            >
              Show all
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="text-center pb-8">
          <h3 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
            Frequently Asked Questions
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
            Everything you need to know about Workflow Mitra automations.
          </p>
        </div>
        <Accordion items={homeFaqs} allowMultiple={true} />
      </motion.section>

      {/* SEARCH MODAL */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </main>
  );
}
