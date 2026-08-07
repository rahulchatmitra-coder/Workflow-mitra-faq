"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";
import { DOCS_NAV_GROUPS } from "./Sidebar";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();

  React.useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm lg:hidden"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-80 flex-col overflow-y-auto border-r border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
              <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563EB] text-white">
                  <Zap className="h-5 w-5 fill-current" />
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  Workflow Mitra
                </span>
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close sidebar navigation menu"
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6 space-y-6 flex-1">
              {DOCS_NAV_GROUPS.map((group) => (
                <div key={group.title} className="space-y-2">
                  <h4 className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                    {group.title}
                  </h4>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-[#2563EB] text-white font-semibold shadow-sm"
                              : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                          )}
                        >
                          <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-slate-400")} />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
