import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { RelatedArticle } from "@/types/docs";
import { Badge } from "@/components/ui/badge";

interface RelatedArticlesProps {
  articles?: RelatedArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div id="tour-related" className="my-12 space-y-4">
      <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-[#2563EB]" />
        Related Documentation Topics
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((art) => (
          <Link
            key={art.slug}
            to={art.slug}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-[#2563EB] hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-[10px]">
                  {art.category}
                </Badge>
                <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#2563EB]" />
              </div>
              <h4 className="font-bold text-slate-900 group-hover:text-[#2563EB] dark:text-slate-100 dark:group-hover:text-blue-400">
                {art.title}
              </h4>
              <p className="text-xs leading-relaxed text-slate-500 line-clamp-2 dark:text-slate-400">
                {art.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
