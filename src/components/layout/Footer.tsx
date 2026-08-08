"use client";

import * as React from "react";
import Link from "next/link";
import {
  Zap,
  Heart,
  ShieldCheck,
  Sparkles,
  Lock,
  Code2,
  ExternalLink,
  ArrowUpRight,
  Globe,
  KeyRound,
  Workflow,
  HelpCircle,
  FileText,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useTextColor } from "@/context/TextColorContext";

export function Footer() {
  const { currentColor } = useTextColor();

  return (
    <footer className="relative mt-24 border-t border-zinc-200 bg-zinc-50/80 dark:border-zinc-800/80 dark:bg-zinc-950 transition-colors duration-200">
      {/* TOP CALL TO ACTION BANNER */}
      <div className="border-b border-zinc-200 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-gradient-to-r from-zinc-100 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 p-6 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Workflow Mitra v2.4 Live
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white">
                Ready to Automate Your Visual Workflows?
              </h3>
              <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Connect 10+ integrations including HubSpot, OpenAI, Pipedrive, Shopify, and Slack in under 2 minutes.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="https://app.workflowmitra.com"
                target="_blank"
                rel="noreferrer"
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-black text-white shadow-lg transition-all cursor-pointer hover:opacity-95 ${currentColor.bgClass}`}
              >
                <span>Launch Workflow Mitra App</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <Link
                href="/credentials"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <KeyRound className="h-3.5 w-3.5" />
                <span>Credentials Vault</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER NAVIGATION GRID */}
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">

          {/* COLUMN 1: BRAND LOGO & OVERVIEW */}
          <div className="space-y-4 lg:col-span-2 pr-0 lg:pr-8">
            <Link href="/" className="flex items-center gap-3 cursor-pointer group" title="Workflow Mitra Home">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white font-black text-lg tracking-tight shadow-md border border-white/20 transition-transform group-hover:scale-105 ${currentColor.bgClass}`}>
                WM
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-zinc-900 dark:text-white block leading-none">
                  Workflow Mitra
                </span>
                <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 font-mono">
                  Documentation &amp; Help Center
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
              Interactive visual automation guides and API credential vault. Step-by-step onboarding walkthroughs for HubSpot CRM, OpenAI GPT-4o, Pipedrive, Shopify, Slack, and 10+ cloud integrations.
            </p>

            <div className="pt-2 flex items-center gap-3 text-zinc-400 dark:text-zinc-500">
              <a
                href="https://app.workflowmitra.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                title="Official App Portal"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="https://app.workflowmitra.com/credentials"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                title="Developer API & Code"
              >
                <Code2 className="h-4 w-4" />
              </a>
              <a
                href="https://app.workflowmitra.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                title="Community Chat"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
              <a
                href="mailto:support@workflowmitra.com"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                title="Support Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: INTEGRATIONS & CREDENTIALS */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <KeyRound className={`h-3.5 w-3.5 ${currentColor.textClass}`} />
              <span>Credentials (10+)</span>
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/credentials/hubspot" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span>HubSpot CRM Guide</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/credentials/pipedrive" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span>Pipedrive Setup</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/credentials/zohocrm" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span>Zoho CRM OAuth</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/credentials/shopify" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span>Shopify Store API</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/credentials/openai" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span>OpenAI GPT-4o Token</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/credentials/slack" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span>Slack Webhook URL</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: HELP & DOCUMENTATION */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <FileText className={`h-3.5 w-3.5 ${currentColor.textClass}`} />
              <span>Documentation</span>
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/credentials" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span>Credentials Vault</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/docs/credentials/hubspot" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span>HubSpot Private Apps</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/create-account" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span>Account Setup Tour</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <a href="https://app.workflowmitra.com/faq" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span>Frequently Asked Questions</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: SECURITY & INFRASTRUCTURE */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <ShieldCheck className={`h-3.5 w-3.5 ${currentColor.textClass}`} />
              <span>Security Vault</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                <span>AES-256 Encryption at Rest</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                <span>Zero Server Key Logging</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                <span>SOC2 &amp; GDPR Compliant</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                <span>Interactive Visual Tours</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/80 pt-8 sm:flex-row dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          <p>© {new Date().getFullYear()} Workflow Mitra Documentation. All rights reserved.</p>
          <div className="flex items-center gap-1.5 font-semibold">
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline" />
            <span>Next.js 16, React 19 &amp; Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
