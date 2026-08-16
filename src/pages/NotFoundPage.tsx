import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Home, KeyRound, Search, Sparkles, Compass } from "lucide-react";
import { Openai, Slack, WhatsappIcon, Google, Claude, HubSpotLogo } from "@/components/ui/svgs";

const POPULAR_404_PROVIDERS = [
  { name: "OpenAI", id: "openai", icon: <Openai className="h-4 w-4 shrink-0" /> },
  { name: "WhatsApp", id: "whatsapp", icon: <WhatsappIcon className="h-4 w-4 shrink-0" /> },
  { name: "Slack", id: "slack", icon: <Slack className="h-4 w-4 shrink-0" /> },
  { name: "HubSpot", id: "hubspot", icon: <HubSpotLogo className="h-4 w-4 shrink-0 text-orange-500" /> },
  { name: "Google", id: "googleoauth", icon: <Google className="h-4 w-4 shrink-0" /> },
  { name: "Claude", id: "claude", icon: <Claude className="h-4 w-4 shrink-0" /> },
];

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Workflow Mitra Documentation</title>
        <meta
          name="description"
          content="The documentation page or credential setup guide you are looking for doesn't exist. Return to Workflow Mitra documentation or browse active integrations."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <main className="relative min-h-[82vh] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-zinc-50 via-white to-zinc-50/50 dark:from-zinc-950 dark:via-black dark:to-zinc-950 transition-colors duration-200 overflow-hidden">
        {/* AMBIENT BACKGROUND GLOW RINGS */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none dark:bg-indigo-500/15" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none dark:bg-amber-500/10" />

        <div className="relative max-w-xl mx-auto space-y-6">
          {/* ANIMATED 404 BADGE */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-black text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/60 dark:text-indigo-300 shadow-sm"
          >
            <Compass className="h-4 w-4 text-indigo-500 animate-spin" style={{ animationDuration: "12s" }} />
            <span>ERROR 404 • ROUTE NOT FOUND</span>
          </motion.div>

          {/* MAIN 404 HEADING */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-zinc-900 dark:text-white">
              404 - Page Not Found
            </h1>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium max-w-md mx-auto">
              The documentation page or credential guide you are looking for doesn&apos;t exist or may have been updated.
            </p>
          </motion.div>

          {/* ACTION BUTTONS */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-black text-white hover:bg-indigo-500 transition-all cursor-pointer shadow-md shadow-indigo-600/20 active:scale-95"
            >
              <Home className="h-4 w-4" />
              <span>Return Home</span>
            </Link>

            <Link
              to="/credentials"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-xs font-bold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <KeyRound className="h-4 w-4 text-amber-500" />
              <span>Explore Credentials</span>
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-100/80 px-4 py-3 text-xs font-bold text-zinc-600 hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-all cursor-pointer active:scale-95"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Go Back</span>
            </button>
          </motion.div>

          {/* POPULAR ACTIVE CONNECTOR QUICK CHIPS */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="pt-6 border-t border-zinc-200 dark:border-zinc-800"
          >
            <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
              Or browse popular integration guides:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {POPULAR_404_PROVIDERS.map((p) => (
                <Link
                  key={p.id}
                  to={`/credentials/${p.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white transition-all shadow-2xs"
                >
                  {p.icon}
                  <span>{p.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
