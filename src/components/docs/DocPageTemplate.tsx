import * as React from "react";
import { DocArticle } from "@/types/docs";
import { DocHeader } from "./DocHeader";
import { StepCard } from "./StepCard";
import { Callout } from "./Callout";
import { FAQSection } from "./FAQSection";
import { RelatedArticles } from "./RelatedArticles";
import { DocPagination } from "./DocPagination";
import { SEOJsonLd } from "@/components/common/SEOJsonLd";
import { CheckCircle2, AlertOctagon } from "lucide-react";

interface DocPageTemplateProps {
  article: DocArticle;
}

export function DocPageTemplate({ article }: DocPageTemplateProps) {
  return (
    <>
      <SEOJsonLd
        title={article.title}
        description={article.description}
        url={`https://workflowmitra-docs.vercel.app${article.slug}`}
      />

      <article className="space-y-8">
        <DocHeader
          title={article.title}
          description={article.description}
          category={article.category}
          readingTime={article.readingTime}
          lastUpdated={article.lastUpdated}
          prerequisites={article.prerequisites}
          steps={article.steps}
        />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Overview
          </h2>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {article.overview}
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Step-by-Step Configuration Guide
          </h2>
          {article.steps.map((step) => (
            <StepCard
              key={step.number}
              step={step}
              totalSteps={article.steps.length}
            />
          ))}
        </section>

        <div
          id="tour-success"
          className="my-8 flex items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 shadow-md dark:border-emerald-900/60 dark:bg-emerald-950/40"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
              Integration Verified & Ready
            </h4>
            <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-300">
              {article.successMessage}
            </p>
          </div>
        </div>

        {article.commonErrors && article.commonErrors.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <AlertOctagon className="h-5 w-5 text-amber-500" />
              Common Errors & Resolutions
            </h3>
            <div className="space-y-3">
              {article.commonErrors.map((err, idx) => (
                <Callout key={idx} type="warning" title={err.error}>
                  {err.resolution}
                </Callout>
              ))}
            </div>
          </section>
        )}

        {article.faqs && <FAQSection faqs={article.faqs} />}

        {article.relatedArticles && <RelatedArticles articles={article.relatedArticles} />}

        <DocPagination prev={article.prevArticle} next={article.nextArticle} />
      </article>
    </>
  );
}
