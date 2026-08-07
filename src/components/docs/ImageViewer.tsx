"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageViewerProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  id?: string;
}

export function ImageViewer({ src, alt, caption, className, id }: ImageViewerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div
        id={id}
        className={cn(
          "group relative my-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 shadow-md transition-all hover:border-[#2563EB]/50 hover:shadow-lg dark:border-slate-800/80 dark:bg-slate-900/60",
          className
        )}
      >
        <div className="relative aspect-video w-full overflow-hidden cursor-zoom-in" onClick={() => setIsOpen(true)}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1200px) 100vw, 800px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-slate-900/10 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md shadow-lg">
              <Maximize2 className="h-3.5 w-3.5" /> Click to Zoom
            </span>
          </div>
        </div>

        {caption && (
          <div className="border-t border-slate-200/60 bg-white/80 px-4 py-2.5 text-center text-xs font-medium text-slate-600 backdrop-blur-sm dark:border-slate-800/60 dark:bg-slate-900/80 dark:text-slate-400">
            {caption}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
                className="absolute right-4 top-4 z-10 rounded-full bg-slate-900/90 p-2 text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative aspect-video w-full min-w-[320px] sm:min-w-[600px] md:min-w-[800px] lg:min-w-[1000px]">
                <Image src={src} alt={alt} fill className="object-contain" priority />
              </div>

              {caption && (
                <div className="bg-slate-900 p-4 text-center text-sm font-medium text-slate-300 border-t border-slate-800">
                  {caption}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
