import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface DocPaginationProps {
  prev?: { title: string; slug: string };
  next?: { title: string; slug: string };
}

export function DocPagination({ prev, next }: DocPaginationProps) {
  if (!prev && !next) return null;

  return (
    <div className="my-12 flex flex-col gap-4 border-t border-slate-200/80 pt-8 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800/80">
      {prev ? (
        <Link
          href={prev.slug}
          className="group flex flex-1 items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 transition-all hover:border-[#2563EB] hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-50 group-hover:text-[#2563EB] dark:bg-slate-800 dark:text-slate-400">
            <ArrowLeft className="h-4 w-4" />
          </div>
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Previous Article
            </span>
            <span className="text-sm font-semibold text-slate-900 group-hover:text-[#2563EB] dark:text-slate-100 dark:group-hover:text-blue-400">
              {prev.title}
            </span>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={next.slug}
          className="group flex flex-1 items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 text-right transition-all hover:border-[#2563EB] hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900"
        >
          <div className="text-right">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Next Article
            </span>
            <span className="text-sm font-semibold text-slate-900 group-hover:text-[#2563EB] dark:text-slate-100 dark:group-hover:text-blue-400">
              {next.title}
            </span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-50 group-hover:text-[#2563EB] dark:bg-slate-800 dark:text-slate-400">
            <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
