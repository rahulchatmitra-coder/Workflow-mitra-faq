import Link from "next/link";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100 text-[#2563EB] shadow-lg dark:bg-blue-950/80 dark:text-blue-400">
        <FileQuestion className="h-10 w-10" />
      </div>
      <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">
        404 - Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
        The documentation page or credential setup guide you are looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <Link href="/docs">
          <Button variant="default" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Go to Documentation Overview
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" /> Return Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
