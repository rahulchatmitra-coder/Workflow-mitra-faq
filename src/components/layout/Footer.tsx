import * as React from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Heart,
  ShieldCheck,
  Sparkles,
  Lock,
  ExternalLink,
  ArrowUpRight,
  Globe,
  KeyRound,
  Workflow,
  CheckCircle2,
} from "lucide-react";
import { useTextColor } from "@/context/TextColorContext";
import {
  Openai,
  Claude,
  GeminiLogo,
  GroqLogo,
  OllamaLogo,
  HubSpotLogo,
  ZohoLogo,
  PipedriveLogo,
  Shopify,
  WooCommerceLogo,
  Slack,
  Discord,
  Telegram,
  WhatsappIcon,
  MSTeamsLogo,
  GithubDark,
  GithubLight,
  Linkedin,
} from "@/components/ui/svgs";

export function Footer() {
  const { currentColor } = useTextColor();

  return (
    <footer className="relative mt-24 border-t border-zinc-200 bg-zinc-50/90 dark:border-zinc-800/80 dark:bg-zinc-950 transition-colors duration-200">
      {/* TOP CALL TO ACTION BANNER */}
      <div className="border-b border-zinc-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-gradient-to-r from-zinc-100/90 via-white to-zinc-50/90 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 p-6 sm:p-8 shadow-sm">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Workflow Mitra v2.4 Live • All Systems Operational
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                Ready to Automate Your Visual Workflows?
              </h3>
              <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 max-w-2xl">
                Connect 10+ integrations including HubSpot, OpenAI GPT-4o, Zoho CRM, Pipedrive, Shopify, Discord, and Slack in under 2 minutes.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="https://app.workflowmitra.com"
                target="_blank"
                rel="noreferrer"
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-xs font-black text-white shadow-lg transition-all cursor-pointer hover:opacity-95 ${currentColor.bgClass}`}
              >
                <span>Launch Workflow Mitra</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <Link
                to="/credentials"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-xs"
              >
                <KeyRound className="h-3.5 w-3.5" />
                <span>Credentials Vault</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER 5-COLUMN NAVIGATION GRID */}
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">

          {/* COLUMN 1: BRAND LOGO & COMMUNITY SOCIALS */}
          <div className="space-y-4 lg:col-span-1 pr-0 lg:pr-2">
            <Link to="/" className="flex items-center gap-3 cursor-pointer group" title="Workflow Mitra Home">
              <img
                src="/images/logo.webp"
                alt="Workflow Mitra Logo"
                className="h-10 w-10 rounded-2xl object-cover shadow-md border border-zinc-200 dark:border-zinc-800 transition-transform group-hover:scale-105"
                onError={(e) => {
                  // Fallback if image not found
                  e.currentTarget.style.display = "none";
                }}
              />
              <div>
                <span className="text-base font-black tracking-tight text-zinc-900 dark:text-white block leading-none">
                  Workflow Mitra
                </span>
                <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 font-mono">
                  Documentation Hub
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
              Enterprise visual workflow automation, AI agents, and credential vault. Step-by-step interactive onboarding for 10+ cloud integrations.
            </p>

            {/* REAL SVG SOCIAL / PORTAL LINKS */}
            <div className="pt-2 flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <a
                href="https://app.workflowmitra.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8.5 w-8.5 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-2xs"
                title="Official Web Portal"
                aria-label="Official Web Portal"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8.5 w-8.5 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-2xs"
                title="GitHub Repository"
                aria-label="GitHub Repository"
              >
                <span className="dark:hidden"><GithubDark className="h-4 w-4" /></span>
                <span className="hidden dark:inline"><GithubLight className="h-4 w-4" /></span>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8.5 w-8.5 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-2xs"
                title="Discord Community"
                aria-label="Discord Community"
              >
                <Discord className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/BotFather"
                target="_blank"
                rel="noreferrer"
                className="flex h-8.5 w-8.5 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-2xs"
                title="Telegram Channel"
                aria-label="Telegram Channel"
              >
                <Telegram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8.5 w-8.5 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-2xs"
                title="LinkedIn Page"
                aria-label="LinkedIn Page"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: AI MODELS & LLMs (WITH REAL SVGS) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Sparkles className={`h-3.5 w-3.5 ${currentColor.textClass}`} />
              <span>AI Models &amp; LLMs</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              <li>
                <Link to="/credentials/openai" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Openai className="h-4 w-4 shrink-0 text-zinc-800 dark:text-zinc-200" />
                    <span>OpenAI GPT-4o</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/gemini" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <GeminiLogo className="h-4 w-4 shrink-0" />
                    <span>Google Gemini 1.5</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/groq" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <GroqLogo className="h-4 w-4 shrink-0" />
                    <span>Groq Fast Inference</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/claude" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Claude className="h-4 w-4 shrink-0" />
                    <span>Anthropic Claude 3.5</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/ollama" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <OllamaLogo className="h-4 w-4 shrink-0" />
                    <span>Ollama Local AI</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: CRM & SALES (WITH REAL SVGS) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <KeyRound className={`h-3.5 w-3.5 ${currentColor.textClass}`} />
              <span>CRM &amp; Sales Vault</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              <li>
                <Link to="/credentials/hubspot" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <HubSpotLogo className="h-4 w-4 shrink-0" />
                    <span>HubSpot CRM</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/zohocrm" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <ZohoLogo className="h-4 w-4 shrink-0" />
                    <span>Zoho CRM OAuth</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/pipedrive" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <PipedriveLogo className="h-4 w-4 shrink-0" />
                    <span>Pipedrive Personal API</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/shopify" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Shopify className="h-4 w-4 shrink-0" />
                    <span>Shopify Admin Store</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/woocommerce" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <WooCommerceLogo className="h-4 w-4 shrink-0" />
                    <span>WooCommerce REST</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: COMMUNICATION & MESSAGING (WITH REAL SVGS) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Zap className={`h-3.5 w-3.5 ${currentColor.textClass}`} />
              <span>Communication</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              <li>
                <Link to="/credentials/slack" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Slack className="h-4 w-4 shrink-0" />
                    <span>Slack Incoming Webhook</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/discord" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Discord className="h-4 w-4 shrink-0" />
                    <span>Discord Webhook Bot</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/telegram" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Telegram className="h-4 w-4 shrink-0" />
                    <span>Telegram Bot Token</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/whatsapp" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <WhatsappIcon className="h-4 w-4 shrink-0" />
                    <span>WhatsApp Cloud API</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/msteams" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <MSTeamsLogo className="h-4 w-4 shrink-0" />
                    <span>Microsoft Teams</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 5: SECURITY & DOCUMENTATION */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <ShieldCheck className={`h-3.5 w-3.5 ${currentColor.textClass}`} />
              <span>Security &amp; Guides</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              <li>
                <Link to="/create-account" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group font-semibold">
                  <span className="flex items-center gap-2">
                    <Workflow className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Account Setup Tour</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/credentials" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group font-semibold">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0" />
                    <span>All Credentials (10+)</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li className="flex items-center gap-2 pt-1">
                <Lock className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                <span>AES-256 Key Encryption</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                <span>SOC2 &amp; GDPR Compliant</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                <span>Zero Server Key Logging</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & STATUS BAR */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/80 pt-8 sm:flex-row dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
            <p>© {new Date().getFullYear()} Workflow Mitra. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            <a href="https://app.workflowmitra.com/privacy" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="https://app.workflowmitra.com/terms" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="https://app.workflowmitra.com/security" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Security Vault
            </a>
          </div>

          <div className="flex items-center gap-1.5 font-semibold text-[11px] text-zinc-400 dark:text-zinc-500">
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline" />
            <span>Workflow Mitra Automation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
