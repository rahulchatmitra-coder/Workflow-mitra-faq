"use client";

import * as React from "react";

export interface ColorThemeOption {
  id: string;
  name: string;
  badgeHex: string;
  textClass: string;
  bgClass: string;
  borderClass: string;
  ringClass: string;
}

export const COLOR_OPTIONS: ColorThemeOption[] = [
  {
    id: "default",
    name: "Default (Zinc/Monochrome)",
    badgeHex: "#18181b",
    textClass: "text-zinc-900 dark:text-white",
    bgClass: "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900",
    borderClass: "border-zinc-300 dark:border-zinc-700",
    ringClass: "ring-zinc-500",
  },
  {
    id: "violet",
    name: "Electric Violet",
    badgeHex: "#8b5cf6",
    textClass: "text-violet-600 dark:text-violet-400",
    bgClass: "bg-violet-600 dark:bg-violet-500 text-white",
    borderClass: "border-violet-500/50",
    ringClass: "ring-violet-500",
  },
  {
    id: "blue",
    name: "Cyber Blue",
    badgeHex: "#0284c7",
    textClass: "text-sky-600 dark:text-sky-400",
    bgClass: "bg-sky-600 dark:bg-sky-500 text-white",
    borderClass: "border-sky-500/50",
    ringClass: "ring-sky-500",
  },
  {
    id: "emerald",
    name: "Neon Emerald",
    badgeHex: "#059669",
    textClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-600 dark:bg-emerald-500 text-white",
    borderClass: "border-emerald-500/50",
    ringClass: "ring-emerald-500",
  },
  {
    id: "rose",
    name: "Crimson Rose",
    badgeHex: "#e11d48",
    textClass: "text-rose-600 dark:text-rose-400",
    bgClass: "bg-rose-600 dark:bg-rose-500 text-white",
    borderClass: "border-rose-500/50",
    ringClass: "ring-rose-500",
  },
  {
    id: "amber",
    name: "Amber Gold",
    badgeHex: "#d97706",
    textClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-600 dark:bg-amber-500 text-white",
    borderClass: "border-amber-500/50",
    ringClass: "ring-amber-500",
  },
];

interface TextColorContextType {
  currentColor: ColorThemeOption;
  setColor: (color: ColorThemeOption) => void;
}

const TextColorContext = React.createContext<TextColorContextType>({
  currentColor: COLOR_OPTIONS[0],
  setColor: () => {},
});

export function TextColorProvider({ children }: { children: React.ReactNode }) {
  const [currentColor, setCurrentColorState] = React.useState<ColorThemeOption>(COLOR_OPTIONS[0]);

  React.useEffect(() => {
    const saved = localStorage.getItem("wm_text_color_id");
    if (saved) {
      const found = COLOR_OPTIONS.find((c) => c.id === saved);
      if (found) setCurrentColorState(found);
    }
  }, []);

  const setColor = (color: ColorThemeOption) => {
    setCurrentColorState(color);
    localStorage.setItem("wm_text_color_id", color.id);
  };

  return (
    <TextColorContext.Provider value={{ currentColor, setColor }}>
      {children}
    </TextColorContext.Provider>
  );
}

export function useTextColor() {
  return React.useContext(TextColorContext);
}
