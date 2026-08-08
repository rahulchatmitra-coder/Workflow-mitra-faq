import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  KeyRound,
  Layers,
  Zap,
  HelpCircle,
  ChevronRight,
  MessageSquare,
  Bot,
  Globe,
  Mail,
  Send,
  Hash,
  Share2,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const DOCS_NAV_GROUPS = [
  {
    title: "Getting Started",
    items: [
      { href: "/docs", label: "Documentation Overview", icon: BookOpen },
      { href: "/docs/workflows", label: "Visual Workflows", icon: Layers },
      { href: "/docs/webhooks", label: "Webhooks Integration", icon: Zap },
      { href: "/docs/faq", label: "Frequently Asked Questions", icon: HelpCircle },
    ],
  },
  {
    title: "Credentials & Integrations",
    items: [
      { href: "/docs/credentials/hubspot", label: "HubSpot CRM", icon: Share2 },
      { href: "/docs/credentials/openai", label: "OpenAI Platform", icon: Bot },
      { href: "/docs/credentials/slack", label: "Slack Workspace", icon: Hash },
      { href: "/docs/credentials/google", label: "Google Cloud", icon: Globe },
      { href: "/docs/credentials/whatsapp", label: "WhatsApp Cloud API", icon: MessageSquare },
      { href: "/docs/credentials/discord", label: "Discord Bot", icon: Share2 },
      { href: "/docs/credentials/telegram", label: "Telegram Bot", icon: Send },
      { href: "/docs/credentials/smtp", label: "SMTP Mailer", icon: Mail },
      { href: "/docs/credentials/http-request", label: "HTTP Request / Custom Auth", icon: Code2 },
    ],
  },
];

export function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800/80 dark:bg-slate-950/40 hidden lg:block">
      <div className="space-y-6">
        {DOCS_NAV_GROUPS.map((group) => (
          <div key={group.title} className="space-y-2">
            <h4 className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {group.title}
            </h4>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-[#2563EB] text-white shadow-sm font-semibold shadow-blue-500/20"
                        : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-colors",
                          isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200"
                        )}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="h-3.5 w-3.5 text-white/80 shrink-0" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
