"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, ArrowRight, CornerDownLeft } from "lucide-react";
import { useFuseSearch } from "@/hooks/use-fuse-search";
import { Badge } from "@/components/ui/badge";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const { query, setQuery, results, allDocs } = useFuseSearch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const displayList = query.trim() ? results : allDocs.slice(0, 5);

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen, setQuery]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (slug: string) => {
    router.push(slug);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % displayList.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + displayList.length) % displayList.length);
    } else if (e.key === "Enter" && displayList[selectedIndex]) {
      e.preventDefault();
      handleSelect(displayList[selectedIndex].slug);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/70 p-4 pt-16 sm:pt-24 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl dark:border-slate-800/80 dark:bg-slate-900"
          >
            <div className="relative flex items-center border-b border-slate-200 px-4 dark:border-slate-800">
              <Search className="h-5 w-5 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search Workflow Mitra docs (e.g. OpenAI, HubSpot, Webhooks)..."
                className="h-14 w-full bg-transparent px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {displayList.length === 0 ? (
                <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                  No matching documentation articles found for &quot;{query}&quot;.
                </div>
              ) : (
                <div className="space-y-1">
                  {!query.trim() && (
                    <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Popular Search Suggestions
                    </div>
                  )}
                  {displayList.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={item.slug}
                        onClick={() => handleSelect(item.slug)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex cursor-pointer items-start justify-between rounded-xl p-3 text-sm transition-colors ${
                          isSelected
                            ? "bg-blue-50/80 dark:bg-slate-800/80 text-[#2563EB] dark:text-blue-400"
                            : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/40"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <FileText className={`mt-0.5 h-4 w-4 shrink-0 ${isSelected ? "text-[#2563EB] dark:text-blue-400" : "text-slate-400"}`} />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{item.title}</span>
                              <Badge variant="secondary" className="text-[10px] py-0 px-2">
                                {item.category}
                              </Badge>
                            </div>
                            <p className="mt-1 text-xs text-slate-500 line-clamp-1 dark:text-slate-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <CornerDownLeft className="h-4 w-4 shrink-0 text-[#2563EB] dark:text-blue-400" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] dark:border-slate-700 dark:bg-slate-800">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] dark:border-slate-700 dark:bg-slate-800">↵</kbd> Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] dark:border-slate-700 dark:bg-slate-800">ESC</kbd> Close
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-400">Fuse.js Static Search</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
