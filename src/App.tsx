import * as React from "react";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { TextColorProvider } from "@/context/TextColorContext";
import { TextColorPicker } from "@/components/common/TextColorPicker";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Lazy load routes for code splitting
const HomePage = lazy(() => import("@/pages/HomePage"));
const CredentialsPage = lazy(() => import("@/pages/CredentialsPage"));
const CredentialProviderPage = lazy(() => import("@/pages/CredentialProviderPage"));
const CreateAccountPage = lazy(() => import("@/pages/CreateAccountPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900 dark:border-zinc-800 dark:border-t-zinc-100" />
  </div>
);

export default function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <TextColorProvider>
        <div className="antialiased min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 transition-colors duration-200">
          <Navbar />
          <TextColorPicker />
          <div className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/credentials" element={<CredentialsPage />} />
                <Route path="/credentials/:providerId" element={<CredentialProviderPage />} />
                <Route path="/create-account" element={<CreateAccountPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </TextColorProvider>
    </ThemeProvider>
  );
}
