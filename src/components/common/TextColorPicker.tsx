"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check, Sparkles, X } from "lucide-react";
import { COLOR_OPTIONS, useTextColor, ColorThemeOption } from "@/context/TextColorContext";

export function TextColorPicker() {
  const { currentColor, setColor } = useTextColor();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* FLOATING BOTTOM RIGHT SPINNING PALETTE BUTTON */}
      <div className="fixed bottom-8 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white shadow-2xl border border-zinc-700 dark:bg-white dark:text-zinc-900 dark:border-zinc-200 hover:scale-110 transition-all duration-300 cursor-pointer"
          title="Change Text & Accent Colors"
        >
          {/* SMOOTH CONTINUOUSLY SPINNING ICON */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="flex items-center justify-center"
          >
            <Palette className="h-6 w-6" />
          </motion.div>

          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] text-zinc-900 font-black dark:bg-zinc-900 dark:text-white shadow border border-zinc-300 dark:border-zinc-700">
            🎨
          </span>
        </button>
      </div>

      {/* POPUP PALETTE DRAWER OPENING ABOVE THE BUTTON */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pb-24 sm:p-6 sm:pb-24 pointer-events-none">
            {/* Backdrop for closing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs pointer-events-auto"
            />

            {/* Floating Color Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative pointer-events-auto w-72 rounded-3xl border border-zinc-200 bg-white p-5 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>Text Color Theme</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                Select your preferred accent color for headers, badges, and text highlights:
              </p>

              {/* COLOR SWATCHES LIST */}
              <div className="mt-4 space-y-2">
                {COLOR_OPTIONS.map((opt: ColorThemeOption) => {
                  const isSelected = currentColor.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setColor(opt);
                        setIsOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-2xl border px-3.5 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900 shadow-md"
                          : "border-zinc-200 bg-zinc-50/80 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-4 w-4 rounded-full border border-black/20 shadow-xs"
                          style={{ backgroundColor: opt.badgeHex }}
                        />
                        <span>{opt.name}</span>
                      </div>

                      {isSelected && <Check className="h-4 w-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
