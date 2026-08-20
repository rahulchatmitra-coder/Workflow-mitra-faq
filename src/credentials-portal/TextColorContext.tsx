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

export const MONOCHROME_THEME: ColorThemeOption = {
  id: "default",
  name: "Default (Black & White Monochrome)",
  badgeHex: "#18181b",
  textClass: "text-zinc-900 dark:text-white",
  bgClass: "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900",
  borderClass: "border-zinc-300 dark:border-zinc-700",
  ringClass: "ring-zinc-500",
};

export const COLOR_OPTIONS: ColorThemeOption[] = [MONOCHROME_THEME];

interface TextColorContextType {
  currentColor: ColorThemeOption;
  setColor: (color: ColorThemeOption) => void;
}

const TextColorContext = React.createContext<TextColorContextType>({
  currentColor: MONOCHROME_THEME,
  setColor: () => {},
});

export function TextColorProvider({ children }: { children: React.ReactNode }) {
  const [currentColor] = React.useState<ColorThemeOption>(MONOCHROME_THEME);

  React.useEffect(() => {
    // Clear any previous color overrides to enforce clean black & white theme
    try {
      localStorage.removeItem("wm_text_color_id");
    } catch {
      // ignore
    }
  }, []);

  const setColor = () => {
    // No-op to preserve strict black & white theme
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
