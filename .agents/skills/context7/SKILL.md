---
name: context7
description: Use Context7 to fetch up-to-date documentation, API references, and code examples for popular libraries and frameworks.
---

# Context7 Documentation Retrieval

Context7 provides up-to-date, version-specific documentation for libraries and frameworks to prevent hallucinated APIs or outdated syntax.

## When to Use Context7
- When working with modern or rapidly evolving libraries (e.g., Next.js App Router, Tailwind CSS, Vite, Supabase, LangChain, etc.).
- When the user prompts with "use context7" or asks for up-to-date documentation.

## How It Works
- Uses the configured Context7 MCP server (`@upstash/context7-mcp`) to query live documentation and return targeted snippets and examples directly into context.
