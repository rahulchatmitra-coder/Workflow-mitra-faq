"use client";

import * as React from "react";
import { AlignLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items?: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>("");

  const defaultItems: TOCItem[] = items || [
    { id: "tour-overview", text: "Overview & Prerequisites", level: 2 },
    { id: "tour-step-1", text: "Step 1: Obtain Credentials", level: 2 },
    { id: "tour-step-2", text: "Step 2: Configure Node", level: 2 },
    { id: "tour-step-3", text: "Step 3: Test Connection", level: 2 },
    { id: "tour-step-4", text: "Step 4: Save & Activate", level: 2 },
    { id: "tour-success", text: "Result & Success Banner", level: 2 },
    { id: "tour-faq", text: "Frequently Asked Questions", level: 2 },
    { id: "tour-related", text: "Related Articles", level: 2 },
  ];

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -40% 0px" }
    );

    defaultItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [defaultItems]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  return (
    <div className="sticky top-20 hidden xl:block w-56 shrink-0 space-y-3 p-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        <AlignLeft className="h-3.5 w-3.5" />
        <span>On This Page</span>
      </div>
      <nav className="space-y-1 text-xs">
        {defaultItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={cn(
                "block w-full text-left py-1 px-2.5 rounded-lg transition-colors border-l-2",
                isActive
                  ? "border-[#2563EB] font-semibold text-[#2563EB] bg-blue-50/60 dark:bg-slate-800/60 dark:text-blue-400"
                  : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/60 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/30"
              )}
            >
              {item.text}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
