"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { DriverTourButton } from "@/components/docs/DriverTourButton";
import { WorkflowCanvas } from "@/components/docs/WorkflowCanvas";

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
        <DriverTourButton title="Interactive Workflow Demo" size="lg" className="shrink-0" />
      </div>

      {/* VISUAL WORKFLOW CANVAS COMPONENT */}
      <WorkflowCanvas />
    </motion.section>
  );
}
