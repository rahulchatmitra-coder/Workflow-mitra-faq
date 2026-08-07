import * as React from "react";
import Link from "next/link";
import { Zap, Heart, ShieldCheck, Sparkles, Lock, Code2, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center cursor-pointer" title="Workflow Mitra Home">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-black text-lg tracking-tight shadow-md border border-zinc-800 dark:border-zinc-200 select-none">
                WM
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 font-normal">
              Interactive single-page automation documentation portal. Guided Driver.js visual tours, high-contrast monochrome theme, and 100% static Jamstack speed.
            </p>
            <a
              href="https://app.workflowmitra.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 hover:underline dark:text-white"
            >
              <span>Go to App (app.workflowmitra.com)</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Guided Interactive Tour
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-zinc-900 dark:text-white" /> Driver.js Visual Walkthrough</li>
              <li className="flex items-center gap-2"><Code2 className="h-3.5 w-3.5 text-zinc-900 dark:text-white" /> Step-by-Step Credentials Input</li>
              <li className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-zinc-900 dark:text-white" /> Verification &amp; Success Banner</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Key Capabilities
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              <li>Monochrome Light &amp; Deep Black Theme</li>
              <li>Client-side Fuse.js Search</li>
              <li>WCAG AA Accessible Focus States</li>
              <li>SEO Optimized Structured Data</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Security &amp; Infrastructure
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-zinc-900 dark:text-white" /> Client-Side Encryption</li>
              <li className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-zinc-900 dark:text-white" /> 100% Static Pre-rendered</li>
              <li className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-zinc-900 dark:text-white" /> Zero Backend Dependency</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-100 pt-8 sm:flex-row dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} Workflow Mitra Documentation. Inspired by ChatMitra Help Center.</p>
          <div className="flex items-center gap-1.5 font-semibold">
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 text-zinc-900 fill-zinc-900 dark:text-white dark:fill-white inline" />
            <span>Next.js 15, React 19 &amp; Tailwind CSS v4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
