"use client";

import * as React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { PopularCategoryGrid } from "@/components/docs/PopularCategoryGrid";
import { WorkflowDemoSection } from "@/components/home/WorkflowDemoSection";
import { OnboardingSection } from "@/components/home/OnboardingSection";
import { FaqSection } from "@/components/home/FaqSection";
import { SearchModal } from "@/components/common/SearchModal";

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  // Global Keyboard Shortcut (Ctrl+K or Cmd+K) to open search modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="min-h-screen pb-20 bg-white dark:bg-black transition-colors duration-200">
      {/* 1. HERO SEARCH SECTION */}
      <HeroSection onOpenSearch={() => setIsSearchOpen(true)} />

      {/* 2. POPULAR ARTICLE CARDS GRID (WORKFLOW MITRA FAQ GUIDE) */}
      <PopularCategoryGrid />

      {/* 3. INTERACTIVE WORKFLOW CANVAS DEMO */}
      <WorkflowDemoSection />

      {/* 4. STEP-BY-STEP ONBOARDING SECTION */}
      <OnboardingSection />

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <FaqSection />

      {/* SEARCH MODAL */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </main>
  );
}
