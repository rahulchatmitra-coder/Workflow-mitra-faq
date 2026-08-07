"use client";

import * as React from "react";
import { HelpCircle } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { FAQItem } from "@/types/docs";

interface FAQSectionProps {
  faqs?: FAQItem[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  const accordionItems = faqs.map((faq, index) => ({
    id: `faq-${index}`,
    title: faq.question,
    content: <p>{faq.answer}</p>,
  }));

  return (
    <div id="tour-faq" className="my-12 space-y-4">
      <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-[#2563EB]" />
        Frequently Asked Questions
      </h3>
      <Accordion items={accordionItems} allowMultiple={true} />
    </div>
  );
}
