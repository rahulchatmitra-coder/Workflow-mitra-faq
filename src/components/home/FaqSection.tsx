"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/accordion";
import { HOME_FAQS } from "@/data/home-data";

export function FaqSection() {
  const formattedFaqs = HOME_FAQS.map((faq) => ({
    id: faq.id,
    title: faq.title,
    content: <p>{faq.content}</p>,
  }));

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="text-center pb-8">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
          Frequently Asked Questions
        </h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
          Everything you need to know about Workflow Mitra automations.
        </p>
      </div>
      <Accordion items={formattedFaqs} allowMultiple={true} />
    </motion.section>
  );
}
