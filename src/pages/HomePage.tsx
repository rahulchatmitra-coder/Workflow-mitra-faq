import * as React from "react";
import { Helmet } from "react-helmet-async";
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
    <>
      <Helmet>
        <title>Workflow Mitra Documentation | No-Code Automation Help Center</title>
        <meta
          name="description"
          content="Official production documentation for Workflow Mitra. Learn how to configure credentials, visual workflow nodes, webhooks, and AI integrations."
        />
        <meta
          name="keywords"
          content="Workflow Mitra, Documentation, No-Code, Automation, OpenAI, HubSpot, Slack, Webhooks"
        />
        <meta property="og:url" content="https://workflowmitra-docs.vercel.app/" />
        <meta property="og:title" content="Workflow Mitra Documentation | No-Code Automation Help Center" />
      </Helmet>

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
    </>
  );
}
