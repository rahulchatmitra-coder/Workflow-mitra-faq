import * as React from "react";
import { Info, AlertTriangle, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalloutType = "info" | "warning" | "success" | "danger" | "tip";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const calloutConfig = {
  info: {
    icon: Info,
    wrapperClass: "bg-blue-50/80 border-blue-200 text-blue-900 dark:bg-blue-950/40 dark:border-blue-900/60 dark:text-blue-200",
    iconClass: "text-[#2563EB] dark:text-blue-400",
    defaultTitle: "Note",
  },
  warning: {
    icon: AlertTriangle,
    wrapperClass: "bg-amber-50/80 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-900/60 dark:text-amber-200",
    iconClass: "text-amber-600 dark:text-amber-400",
    defaultTitle: "Warning",
  },
  success: {
    icon: CheckCircle2,
    wrapperClass: "bg-emerald-50/80 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-200",
    iconClass: "text-emerald-600 dark:text-emerald-400",
    defaultTitle: "Success",
  },
  danger: {
    icon: XCircle,
    wrapperClass: "bg-rose-50/80 border-rose-200 text-rose-900 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-200",
    iconClass: "text-rose-600 dark:text-rose-400",
    defaultTitle: "Important",
  },
  tip: {
    icon: Lightbulb,
    wrapperClass: "bg-indigo-50/80 border-indigo-200 text-indigo-900 dark:bg-indigo-950/40 dark:border-indigo-900/60 dark:text-indigo-200",
    iconClass: "text-indigo-600 dark:text-indigo-400",
    defaultTitle: "Pro Tip",
  },
};

export function Callout({
  type = "info",
  title,
  children,
  className,
  id,
}: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      id={id}
      className={cn(
        "my-6 flex gap-4 rounded-2xl border p-4.5 text-sm leading-relaxed shadow-sm transition-all",
        config.wrapperClass,
        className
      )}
    >
      <div className="shrink-0 pt-0.5">
        <Icon className={cn("h-5 w-5", config.iconClass)} />
      </div>
      <div className="flex-1 space-y-1">
        <h5 className="font-semibold tracking-wide uppercase text-xs opacity-90">
          {title || config.defaultTitle}
        </h5>
        <div className="text-sm opacity-95">{children}</div>
      </div>
    </div>
  );
}
