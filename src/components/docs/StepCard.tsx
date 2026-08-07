import * as React from "react";
import { DocStep } from "@/types/docs";
import { ImageViewer } from "./ImageViewer";
import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import { cn } from "@/lib/utils";

interface StepCardProps {
  step: DocStep;
  totalSteps?: number;
  className?: string;
}

export function StepCard({ step, totalSteps, className }: StepCardProps) {
  const stepId = `tour-step-${step.number}`;

  return (
    <div
      id={stepId}
      className={cn(
        "relative my-8 rounded-[16px] border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-all dark:border-slate-800/80 dark:bg-slate-900/90",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] text-lg font-bold text-white shadow-md shadow-blue-500/20">
          {step.number}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {step.title}
            </h3>
            {totalSteps && (
              <span className="text-xs font-semibold text-slate-400">
                Step {step.number} of {totalSteps}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {step.description}
          </p>

          {step.codeSnippet && (
            <CodeBlock
              code={step.codeSnippet}
              language={step.codeLanguage || "javascript"}
            />
          )}

          {step.screenshotUrl && (
            <ImageViewer
              src={step.screenshotUrl}
              alt={step.screenshotAlt || step.title}
              caption={`Step ${step.number}: ${step.title}`}
            />
          )}

          {step.tip && (
            <Callout type="tip" title="Pro Tip">
              {step.tip}
            </Callout>
          )}
        </div>
      </div>
    </div>
  );
}
