"use client";

import * as React from "react";
import Link from "next/link";
import { HelpCircle, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-black/90 transition-colors duration-200">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo "WM" inside a perfectly rounded circle - Clicking navigates to Home (/) with no hover scaling */}
        <Link href="/" className="flex items-center cursor-pointer" title="Workflow Mitra Home">
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-black text-lg sm:text-xl tracking-tight shadow-md border border-zinc-800 dark:border-zinc-200 select-none">
            WM
          </div>
        </Link>

        {/* Right Navigation aligned cleanly */}
        <div className="flex items-center gap-6 sm:gap-8 text-sm font-semibold">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
          >
            <HelpCircle className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <span>Help Center</span>
          </Link>

          <a
            href="https://app.workflowmitra.com/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-2 text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
          >
            <span>Visit workflowmitra.com</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
