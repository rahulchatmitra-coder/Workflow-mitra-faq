"use client";

import * as React from "react";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Lazy load DriverTourButton - only loads when visible
const DriverTourButton = lazy(() => import("@/components/docs/DriverTourButton").then(m => ({ default: m.DriverTourButton })));

// Lazy load WorkflowCanvas - heavy component with animations
const WorkflowCanvas = lazy(() => import("@/components/docs/WorkflowCanvas").then(m => ({ default: m.WorkflowCanvas })));

export function WorkflowDemoSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8"
    >
      <div className="flex items-center justify-between pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-zinc-100 px-3.5 py-1 text-xs font-bold text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
            <Sparkles className="h-3.5 w-3.5" /> Interactive Flow Demo
          </span>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
            Workflow Automation Builder
          </h3>
        </div>
        <Suspense fallback={<div className="h-10 w-24 bg-zinc-100 dark:bg-zinc-900 rounded-xl animate-pulse" />}>
          <DriverTourButton title="Interactive Workflow Demo" size="lg" className="shrink-0" />
        </Suspense>
      </div>

      {/* VISUAL WORKFLOW CANVAS COMPONENT - LAZY LOADED */}
      <Suspense fallback={<div className="w-full rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-slate-50/70 dark:bg-[#07090E] h-[520px] animate-pulse" />}>
        <WorkflowCanvas />
      </Suspense>
    </motion.section>
  );
}
