import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { TextColorProvider } from "@/context/TextColorContext";
import { TextColorPicker } from "@/components/common/TextColorPicker";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import HomePage from "@/pages/HomePage";
import CredentialsPage from "@/pages/CredentialsPage";
import CredentialProviderPage from "@/pages/CredentialProviderPage";
import CreateAccountPage from "@/pages/CreateAccountPage";
import NotFoundPage from "@/pages/NotFoundPage";

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
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/credentials" element={<CredentialsPage />} />
              <Route path="/credentials/:providerId" element={<CredentialProviderPage />} />
              <Route path="/create-account" element={<CreateAccountPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </TextColorProvider>
    </ThemeProvider>
  );
}
