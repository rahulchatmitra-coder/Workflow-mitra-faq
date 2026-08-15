import * as React from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export function Navbar() {
  return (
    <header className="w-full border-b border-zinc-200 bg-white/95 dark:border-zinc-800 dark:bg-zinc-950/95 backdrop-blur-md sticky top-0 z-40 transition-colors duration-200">
      <nav className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-6 lg:px-8" aria-label="Main navigation">
        {/* Logo "WM" inside a perfectly rounded circle - Clicking navigates to Home (/) with no hover scaling */}
        <Link to="/" className="flex items-center cursor-pointer" title="Workflow Mitra Home" aria-label="Workflow Mitra Home">
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-black text-lg sm:text-xl tracking-tight shadow-md border border-zinc-800 dark:border-zinc-200 select-none">
            WM
          </div>
        </Link>

        {/* Right Navigation aligned cleanly */}
        <div className="flex items-center gap-6 sm:gap-8 text-sm font-semibold">
          <Link
            to="/"
            className="flex items-center gap-2 text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
            aria-label="Go to Help Center"
          >
            <HelpCircle className="h-4 w-4 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
            <span>Help Center</span>
          </Link>

          <a
            href="https://app.workflowmitra.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="hidden sm:flex items-center gap-2 text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
            aria-label="Visit workflowmitra.com (opens in new tab)"
          >
            <span>Visit workflowmitra.com</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
          </a>

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
