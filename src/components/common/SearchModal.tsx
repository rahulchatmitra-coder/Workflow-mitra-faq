import * as React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, CornerDownLeft, Sparkles, ExternalLink, KeyRound, Zap, ShieldCheck } from "lucide-react";
import { useFuseSearch } from "@/hooks/use-fuse-search";
import { Badge } from "@/components/ui/badge";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const POPULAR_SEARCH_TAGS = [
  "OpenAI",
  "WhatsApp",
  "Slack",
  "HubSpot",
  "Webhooks",
  "Google",
  "Calendly",
  "Zoom",
  "Claude",
  "Shopify",
];

export function SearchModal({ isOpen, onClose, initialQuery = "" }: SearchModalProps) {
  const navigate = useNavigate();
  const { query, setQuery, results, allDocs } = useFuseSearch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const displayList = query.trim() ? results : allDocs.slice(0, 8);

  React.useEffect(() => {
    if (isOpen) {
      if (initialQuery) {
        setQuery(initialQuery);
      }
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    } else {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen, initialQuery, setQuery]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (slug: string) => {
    if (slug.startsWith("http://") || slug.startsWith("https://")) {
      window.open(slug, "_blank", "noopener,noreferrer");
    } else if (slug.includes("#")) {
      const [path, hash] = slug.split("#");
      navigate(path || "/");
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(slug);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, displayList.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + displayList.length) % Math.max(1, displayList.length));
    } else if (e.key === "Enter" && displayList[selectedIndex]) {
      e.preventDefault();
      handleSelect(displayList[selectedIndex].slug);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "ai models":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "communication":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "crms & sales":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "databases":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "e-commerce":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800";
      case "webhooks":
        return "bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 border-orange-200 dark:border-orange-800";
      case "security":
        return "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800";
      default:
        return "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-950/70 p-4 pt-12 sm:pt-20 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: -12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            {/* SEARCH INPUT BAR */}
            <div className="relative flex items-center border-b border-zinc-200 px-4 py-1 dark:border-zinc-800">
              <Search className="h-5 w-5 text-zinc-400 shrink-0 mr-2" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search Workflow Mitra docs (e.g. OpenAI, WhatsApp, HubSpot, Webhooks)..."
                className="h-14 w-full bg-transparent text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100 dark:placeholder:text-zinc-500"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <span className="hidden sm:inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                  ESC
                </span>
              )}
            </div>

            {/* QUICK POPULAR PILLS WHEN SEARCH IS EMPTY */}
            {!query.trim() && (
              <div className="border-b border-zinc-100 bg-zinc-50/70 px-4 py-2.5 dark:border-zinc-800/80 dark:bg-zinc-950/50">
                <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  <span>Popular Search Topics:</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {POPULAR_SEARCH_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-semibold text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all cursor-pointer shadow-2xs"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* RESULTS LIST */}
            <div className="max-h-[55vh] overflow-y-auto p-2">
              {displayList.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                    No matching documentation found for &quot;{query}&quot;
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">
                    Try searching for provider names like &quot;OpenAI&quot;, &quot;WhatsApp&quot;, &quot;HubSpot&quot;, or &quot;Claude&quot;.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {!query.trim() && (
                    <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Suggested Guides & Documentation
                    </div>
                  )}
                  {displayList.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={item.slug + index}
                        onClick={() => handleSelect(item.slug)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex cursor-pointer items-start justify-between rounded-xl p-3 text-sm transition-all ${
                          isSelected
                            ? "bg-indigo-50/90 dark:bg-zinc-800 text-indigo-700 dark:text-indigo-300 shadow-2xs"
                            : "text-zinc-800 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800/50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg border shrink-0 transition-colors ${
                              isSelected
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                                : "bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                            }`}
                          >
                            {item.slug.includes("/credentials") ? (
                              <KeyRound className="h-4 w-4" />
                            ) : item.slug.includes("webhook") ? (
                              <Zap className="h-4 w-4" />
                            ) : item.category === "Security" ? (
                              <ShieldCheck className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                          </div>

                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-extrabold text-zinc-900 dark:text-white leading-tight">
                                {item.title}
                              </span>
                              <span
                                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold ${getCategoryColor(
                                  item.category
                                )}`}
                              >
                                {item.category}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-1 font-medium">
                              {item.description}
                            </p>
                            {item.snippet && (
                              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 line-clamp-1 font-mono">
                                {item.snippet}
                              </p>
                            )}
                          </div>
                        </div>

                        {isSelected && (
                          <div className="flex items-center gap-1 shrink-0 text-indigo-600 dark:text-indigo-400 self-center">
                            <span className="text-[11px] font-bold hidden sm:inline">Open</span>
                            <CornerDownLeft className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}
            <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50 px-4 py-2.5 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-medium">
                  <kbd className="rounded border border-zinc-300 bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold dark:border-zinc-700 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    ↑↓
                  </kbd>{" "}
                  Navigate
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <kbd className="rounded border border-zinc-300 bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold dark:border-zinc-700 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    ↵
                  </kbd>{" "}
                  Select
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <kbd className="rounded border border-zinc-300 bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold dark:border-zinc-700 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    ESC
                  </kbd>{" "}
                  Close
                </span>
              </div>
              <span className="text-[11px] font-bold text-zinc-400">
                {results.length > 0 ? `${results.length} results` : "Fast Fuzzy Search"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
