import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-[#2563EB] transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </Link>

      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        const title = segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

        return (
          <React.Fragment key={href}>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            {isLast ? (
              <span className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                {title}
              </span>
            ) : (
              <Link
                to={href}
                className="hover:text-[#2563EB] transition-colors truncate"
              >
                {title}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
