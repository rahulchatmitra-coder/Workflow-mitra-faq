"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  KeyRound,
  Search,
  ChevronRight,
  Building2,
  Bot,
  MessageSquare,
  ShoppingCart,
  Video,
  Send,
  Calendar,
  CreditCard,
  Package,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTextColor } from "@/context/TextColorContext";
import { CredentialProvider, PROVIDER_LIST } from "@/data/credentials-data";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Bot,
  MessageSquare,
  ShoppingCart,
  Video,
  Send,
  Calendar,
  CreditCard,
  Package,
};

interface ProviderCardGridProps {
  providers?: CredentialProvider[];
  title?: string;
  subtitle?: string;
}

export default function ProviderCardGrid({
  providers = PROVIDER_LIST,
  title = "Supported Credentials & Service Providers (10+)",
  subtitle = "Click any provider below to open its dedicated step-by-step interactive onboarding guide.",
}: ProviderCardGridProps) {
  const { currentColor } = useTextColor();
  const router = useRouter();

  const [searchFilter, setSearchFilter] = React.useState<string>("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const categories = ["All", "CRM & Sales", "AI Models", "Communication", "E-Commerce"];

  const filteredProviders = providers.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.badge.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <section id="providers-grid" className="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-20">
      {/* SECTION HEADER & SEARCH */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <KeyRound className={`h-5 w-5 ${currentColor.textClass}`} />
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
              {title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            {subtitle}
          </p>
        </div>

        {/* SEARCH INPUT */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search provider (e.g. HubSpot, OpenAI)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 pl-9 pr-4 py-2 text-xs font-semibold text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white transition-all shadow-inner"
          />
        </div>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
              selectedCategory === cat
                ? `${currentColor.bgClass} text-white shadow-md`
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProviders.map((p) => {
          const IconComponent = ICON_MAP[p.iconName] || Building2;
          return (
            <motion.div
              key={p.id}
              whileHover={{ y: -4, scale: 1.01 }}
              onClick={() => router.push(`/credentials/${p.id}`)}
              className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 group-hover:scale-105 transition-transform">
                    <IconComponent className={`h-6 w-6 ${currentColor.textClass}`} />
                  </div>

                  <span className="text-[10px] font-extrabold font-mono px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
                    {p.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-zinc-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors flex items-center justify-between">
                    <span>{p.name}</span>
                    {p.popular && (
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full text-white ${currentColor.bgClass}`}>
                        Popular
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-400">
                  {p.steps.length} Interactive Steps
                </span>

                <span className={`inline-flex items-center gap-1 text-xs font-black transition-transform group-hover:translate-x-1 ${currentColor.textClass}`}>
                  <span>View Guide</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
