export interface DocStep {
  number: number;
  title: string;
  description: string;
  screenshotUrl?: string;
  screenshotAlt?: string;
  codeSnippet?: string;
  codeLanguage?: string;
  tip?: string;
}

export interface RelatedArticle {
  title: string;
  slug: string;
  description: string;
  category: "credentials" | "workflows" | "webhooks" | "faq";
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface DocArticle {
  slug: string;
  title: string;
  description: string;
  category: "credentials" | "workflows" | "webhooks" | "faq";
  iconName?: string;
  prerequisites: string[];
  readingTime: string;
  lastUpdated: string;
  overview: string;
  steps: DocStep[];
  successMessage: string;
  commonErrors?: { error: string; resolution: string }[];
  faqs?: FAQItem[];
  relatedArticles?: RelatedArticle[];
  prevArticle?: { title: string; slug: string };
  nextArticle?: { title: string; slug: string };
}

export interface SearchResultItem {
  title: string;
  slug: string;
  description: string;
  category: string;
  snippet?: string;
}
