import * as React from "react";
import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { HeroSection } from "@/components/home/HeroSection";
import { PopularCategoryGrid } from "@/components/docs/PopularCategoryGrid";

// Lazy load heavy components below the fold
const WorkflowDemoSection = lazy(() => import("@/components/home/WorkflowDemoSection").then(m => ({ default: m.WorkflowDemoSection })));
const OnboardingSection = lazy(() => import("@/components/home/OnboardingSection").then(m => ({ default: m.OnboardingSection })));
const FaqSection = lazy(() => import("@/components/home/FaqSection").then(m => ({ default: m.FaqSection })));
const SearchModal = lazy(() => import("@/components/common/SearchModal").then(m => ({ default: m.SearchModal })));

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
        <html lang="en" />
        <title>Workflow Mitra Documentation | No-Code Automation Help Center</title>
        <meta
          name="description"
          content="Official production documentation for Workflow Mitra. Learn how to configure credentials, visual workflow nodes, webhooks, and AI integrations."
        />
        <meta
          name="keywords"
          content="Workflow Mitra, Documentation, No-Code, Automation, OpenAI, HubSpot, Slack, Webhooks"
        />
        <link rel="canonical" href="https://workflowmitra-docs.vercel.app/" />
        <meta property="og:url" content="https://workflowmitra-docs.vercel.app/" />
        <meta property="og:title" content="Workflow Mitra Documentation | No-Code Automation Help Center" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://workflowmitra-docs.vercel.app/images/logo.webp" />
      </Helmet>

      <main id="main-content" className="min-h-screen pb-20 bg-white dark:bg-black transition-colors duration-200">
        {/* 1. HERO SEARCH SECTION */}
        <HeroSection onOpenSearch={() => setIsSearchOpen(true)} />

        {/* 2. POPULAR ARTICLE CARDS GRID (WORKFLOW MITRA FAQ GUIDE) */}
        <PopularCategoryGrid />

        {/* 3. INTERACTIVE WORKFLOW CANVAS DEMO - LAZY LOADED */}
        <Suspense fallback={<div className="mx-auto max-w-6xl px-4 pt-8 h-96" />}>
          <WorkflowDemoSection />
        </Suspense>

        {/* 4. STEP-BY-STEP ONBOARDING SECTION - LAZY LOADED */}
        <Suspense fallback={<div className="mx-auto max-w-6xl px-4 pt-8 h-96" />}>
          <OnboardingSection />
        </Suspense>

        {/* 5. FREQUENTLY ASKED QUESTIONS - LAZY LOADED */}
        <Suspense fallback={<div className="mx-auto max-w-6xl px-4 pt-8 h-96" />}>
          <FaqSection />
        </Suspense>

        {/* SEARCH MODAL - LAZY LOADED */}
        {isSearchOpen && (
          <Suspense fallback={null}>
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          </Suspense>
        )}
      </main>
    </>
  );
}
