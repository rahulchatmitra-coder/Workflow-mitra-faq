import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { TextColorProvider } from "@/context/TextColorContext";
import { TextColorPicker } from "@/components/common/TextColorPicker";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workflow Mitra Documentation | No-Code Automation Help Center",
  description: "Official production documentation for Workflow Mitra. Learn how to configure credentials, visual workflow nodes, webhooks, and AI integrations.",
  keywords: ["Workflow Mitra", "Documentation", "No-Code", "Automation", "OpenAI", "HubSpot", "Slack", "Webhooks"],
  metadataBase: new URL("https://workflowmitra-docs.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 transition-colors duration-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <TextColorProvider>
            <Navbar />
            <TextColorPicker />
            <div className="flex-1">{children}</div>
            <Footer />
          </TextColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
