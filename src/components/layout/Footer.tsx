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
  Database,
  MessageSquare,
  Building2,
  Bot,
} from "lucide-react";
import { useTextColor } from "@/context/TextColorContext";
import { DIRECT_SVG_MAP } from "@/components/ui/svgs/DirectSvgIcon";
import {
  Openai,
  Claude,
  GeminiLogo,
  GroqLogo,
  OllamaLogo,
  HubSpotLogo,
  ZohoLogo,
  PipedriveLogo,
  ShopifyLogo,
  WooCommerceLogo,
  Slack,
  Discord,
  Telegram,
  WhatsappIcon,
  MSTeamsLogo,
  Linkedin,
  CiscoWebexLogo,
  ZendeskLogo,
  GmailLogo,
  GoogleSheetsLogo,
  Postgresql,
  Mongodb,
  Mysql,
} from "@/components/ui/svgs";

// Helper component for crisp provider icon rendering
function FooterProviderIcon({ id, name, fallback }: { id: string; name: string; fallback?: React.ReactNode }) {
  const directSrc = DIRECT_SVG_MAP[id.toLowerCase()];
  if (directSrc) {
    return (
      <img
        src={directSrc}
        alt={name}
        width="18"
        height="18"
        className="h-4.5 w-4.5 object-contain shrink-0 transition-transform duration-200 group-hover:scale-110"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    );
  }
  return fallback ? <>{fallback}</> : <Building2 className="h-4.5 w-4.5 shrink-0 text-zinc-400" />;
}

export function Footer() {
  const { currentColor } = useTextColor();

  // Scroll to top helper on navigation click
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
                Connect 10+ integrations including Google Sheets, HubSpot, Cisco Webex, Zendesk, Shopify, Discord, and Slack in under 2 minutes.
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
                onClick={handleNavClick}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-xs"
              >
                <KeyRound className="h-3.5 w-3.5" />
                <span>Credentials Vault</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SUPPORTED LOGOS SHOWCASE STRIP */}
      <div className="border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-100/50 dark:bg-zinc-900/40 py-4 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-none py-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 shrink-0 mr-2">
              Supported Ecosystem:
            </span>
            <div className="flex items-center gap-6 shrink-0 opacity-80 hover:opacity-100 transition-opacity">
              <FooterProviderIcon id="googleserviceaccount" name="Google Sheets" fallback={<GoogleSheetsLogo className="h-4.5 w-4.5" />} />
              <FooterProviderIcon id="ciscowebex" name="Cisco Webex" fallback={<CiscoWebexLogo className="h-4.5 w-4.5" />} />
              <FooterProviderIcon id="zendesk" name="Zendesk" fallback={<ZendeskLogo className="h-4.5 w-4.5" />} />
              <FooterProviderIcon id="woocommerce" name="WooCommerce" fallback={<WooCommerceLogo className="h-4.5 w-4.5" />} />
              <FooterProviderIcon id="shiprocket" name="Shiprocket" />
              <FooterProviderIcon id="calcom" name="Cal.com" />
              <FooterProviderIcon id="jitsimeet" name="Jitsi Meet" />
              <FooterProviderIcon id="hubspot" name="HubSpot" fallback={<HubSpotLogo className="h-4.5 w-4.5" />} />
              <FooterProviderIcon id="shopify" name="Shopify" fallback={<ShopifyLogo className="h-4.5 w-4.5" />} />
              <FooterProviderIcon id="zoho" name="Zoho" fallback={<ZohoLogo className="h-4.5 w-4.5" />} />
              <FooterProviderIcon id="openai" name="OpenAI" fallback={<Openai className="h-4.5 w-4.5" />} />
              <FooterProviderIcon id="claude" name="Anthropic Claude" fallback={<Claude className="h-4.5 w-4.5" />} />
              <FooterProviderIcon id="slack" name="Slack" fallback={<Slack className="h-4.5 w-4.5" />} />
              <FooterProviderIcon id="discord" name="Discord" fallback={<Discord className="h-4.5 w-4.5" />} />
              <FooterProviderIcon id="smtp" name="Gmail SMTP" fallback={<GmailLogo className="h-4.5 w-4.5" />} />
              <FooterProviderIcon id="postgresql" name="PostgreSQL" fallback={<Postgresql className="h-4.5 w-4.5" />} />
              <FooterProviderIcon id="mongodb" name="MongoDB" fallback={<Mongodb className="h-4.5 w-4.5" />} />
              <FooterProviderIcon id="mysql" name="MySQL" fallback={<Mysql className="h-4.5 w-4.5" />} />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER 5-COLUMN NAVIGATION GRID */}
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">

          {/* COLUMN 1: BRAND LOGO & COMMUNITY SOCIALS */}
          <div className="space-y-4 lg:col-span-1 pr-0 lg:pr-2">
            <Link to="/" onClick={handleNavClick} className="flex items-center gap-3 cursor-pointer group" title="Workflow Mitra Home">
              <img
                src="/images/logo.webp"
                alt="Workflow Mitra Logo"
                width="40"
                height="40"
                className="h-10 w-10 rounded-2xl object-cover shadow-md border border-zinc-200 dark:border-zinc-800 transition-transform group-hover:scale-105"
                onError={(e) => {
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

            {/* REAL SVG SOCIAL / PORTAL LINKS (GITHUB REMOVED AS REQUESTED) */}
            <div className="pt-2 flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <a
                href="https://app.workflowmitra.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-xs"
                title="Official Web Portal"
                aria-label="Official Web Portal"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-xs"
                title="Discord Community"
                aria-label="Discord Community"
              >
                <Discord className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/BotFather"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-xs"
                title="Telegram Channel"
                aria-label="Telegram Channel"
              >
                <Telegram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-xs"
                title="LinkedIn Page"
                aria-label="LinkedIn Page"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: AI MODELS & LLMs */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Bot className={`h-4 w-4 ${currentColor.textClass}`} />
              <span>AI Models &amp; LLMs</span>
            </h4>
            <ul className="space-y-3 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              <li>
                <Link to="/credentials/openai" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="openai" name="OpenAI" fallback={<Openai className="h-4.5 w-4.5" />} />
                    <span>OpenAI GPT-4o</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/gemini" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="gemini" name="Gemini" fallback={<GeminiLogo className="h-4.5 w-4.5" />} />
                    <span>Google Gemini 1.5</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/groq" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="groq" name="Groq" fallback={<GroqLogo className="h-4.5 w-4.5" />} />
                    <span>Groq Fast Inference</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/claude" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="claude" name="Claude" fallback={<Claude className="h-4.5 w-4.5" />} />
                    <span>Anthropic Claude 3.5</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/ollama" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="ollama" name="Ollama" fallback={<OllamaLogo className="h-4.5 w-4.5" />} />
                    <span>Ollama Local AI</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: CRM & E-COMMERCE */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Building2 className={`h-4 w-4 ${currentColor.textClass}`} />
              <span>CRM &amp; Sales</span>
            </h4>
            <ul className="space-y-3 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              <li>
                <Link to="/credentials/hubspot" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="hubspot" name="HubSpot" fallback={<HubSpotLogo className="h-4.5 w-4.5" />} />
                    <span>HubSpot CRM Token</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/zoho" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="zoho" name="Zoho" fallback={<ZohoLogo className="h-4.5 w-4.5" />} />
                    <span>Zoho Suite OAuth</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/pipedrive" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="pipedrive" name="Pipedrive" fallback={<PipedriveLogo className="h-4.5 w-4.5" />} />
                    <span>Pipedrive API Key</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/shopify" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="shopify" name="Shopify" fallback={<ShopifyLogo className="h-4.5 w-4.5" />} />
                    <span>Shopify Admin Store</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/woocommerce" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="woocommerce" name="WooCommerce" fallback={<WooCommerceLogo className="h-4.5 w-4.5" />} />
                    <span>WooCommerce REST</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/shiprocket" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="shiprocket" name="Shiprocket" />
                    <span>Shiprocket Shipping</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: COMMUNICATION & MEETINGS */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <MessageSquare className={`h-4 w-4 ${currentColor.textClass}`} />
              <span>Communication</span>
            </h4>
            <ul className="space-y-3 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              <li>
                <Link to="/credentials/ciscowebex" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="ciscowebex" name="Cisco Webex" fallback={<CiscoWebexLogo className="h-4.5 w-4.5" />} />
                    <span>Cisco Webex Bot</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/zendesk" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="zendesk" name="Zendesk" fallback={<ZendeskLogo className="h-4.5 w-4.5" />} />
                    <span>Zendesk Support</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/slack" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="slack" name="Slack" fallback={<Slack className="h-4.5 w-4.5" />} />
                    <span>Slack Webhooks</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/discord" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="discord" name="Discord" fallback={<Discord className="h-4.5 w-4.5" />} />
                    <span>Discord Bot Token</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/telegram" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="telegram" name="Telegram" fallback={<Telegram className="h-4.5 w-4.5" />} />
                    <span>Telegram Bot Token</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/calcom" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="calcom" name="Cal.com" />
                    <span>Cal.com Scheduling</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 5: DATABASES & GOOGLE SUITE */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Database className={`h-4 w-4 ${currentColor.textClass}`} />
              <span>Databases &amp; Google</span>
            </h4>
            <ul className="space-y-3 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              <li>
                <Link to="/credentials/googleserviceaccount" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="googleserviceaccount" name="Google Sheets" fallback={<GoogleSheetsLogo className="h-4.5 w-4.5" />} />
                    <span>Google Sheets Service</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/smtp" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="smtp" name="Gmail SMTP" fallback={<GmailLogo className="h-4.5 w-4.5" />} />
                    <span>Real Gmail (SMTP)</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/postgresql" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="postgresql" name="PostgreSQL" fallback={<Postgresql className="h-4.5 w-4.5 shrink-0" />} />
                    <span>PostgreSQL Database</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/mongodb" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="mongodb" name="MongoDB" fallback={<Mongodb className="h-4.5 w-4.5 shrink-0" />} />
                    <span>MongoDB Cloud Atlas</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
              <li>
                <Link to="/credentials/mysql" onClick={handleNavClick} className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2.5">
                    <FooterProviderIcon id="mysql" name="MySQL" fallback={<Mysql className="h-4.5 w-4.5 shrink-0" />} />
                    <span>MySQL Database</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* SECURITY & TRUST BADGES FOOTER BAR */}
        <div className="mt-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-zinc-600 dark:text-zinc-400 shadow-2xs">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <span className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-amber-500 shrink-0" />
              <span>AES-256 Key Encryption</span>
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>SOC2 &amp; GDPR Compliant</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0" />
              <span>Zero Plaintext Storage</span>
            </span>
          </div>

          <Link
            to="/credentials"
            onClick={handleNavClick}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-extrabold text-white shadow-xs transition-all ${currentColor.bgClass}`}
          >
            <span>Explore 10+ Vault Providers</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* BOTTOM COPYRIGHT & LEGAL LINKS */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/80 pt-8 sm:flex-row dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
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
