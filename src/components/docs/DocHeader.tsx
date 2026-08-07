import * as React from "react";
import { Clock, Calendar, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DriverTourButton } from "./DriverTourButton";
import { DocStep } from "@/types/docs";

interface DocHeaderProps {
  title: string;
  description: string;
  category: string;
  readingTime: string;
  lastUpdated: string;
  prerequisites: string[];
  steps?: DocStep[];
}

export function DocHeader({
  title,
  description,
  category,
  readingTime,
  lastUpdated,
  prerequisites,
  steps,
}: DocHeaderProps) {
  return (
    <div className="mb-10 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-6 dark:border-slate-800/80">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-xs uppercase font-bold tracking-wider">
              {category}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              <span>{readingTime}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>Updated {lastUpdated}</span>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            {title}
          </h1>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {description}
          </p>
        </div>

        <DriverTourButton steps={steps} title={title} className="shrink-0" />
      </div>

      <div
        id="tour-overview"
        className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 dark:border-blue-950/60 dark:bg-blue-950/20"
      >
        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-blue-400">
          <ShieldCheck className="h-4 w-4" /> Prerequisites & Requirements
        </h4>
        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm text-slate-700 dark:text-slate-300">
          {prerequisites.map((req, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
