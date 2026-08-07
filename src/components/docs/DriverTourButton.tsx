"use client";

import * as React from "react";
import { PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDriverTour } from "@/hooks/use-driver-tour";
import { DocStep } from "@/types/docs";

interface DriverTourButtonProps {
  steps?: DocStep[];
  title?: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function DriverTourButton({ steps, title, className, size = "default" }: DriverTourButtonProps) {
  const { startTour } = useDriverTour(steps, title);

  return (
    <Button
      variant="default"
      size={size}
      onClick={startTour}
      className={`group relative overflow-hidden bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold shadow-lg cursor-pointer ${className}`}
    >
      <Sparkles className="h-4 w-4 text-zinc-300 dark:text-zinc-700" />
      <span className="font-extrabold">Start Guide</span>
      <PlayCircle className="h-4 w-4 ml-1" />
    </Button>
  );
}
