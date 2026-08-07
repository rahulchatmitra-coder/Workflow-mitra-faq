# ⚡ Workflow Mitra Help Center & AI Automation Builder

A state-of-the-art, ultra-responsive Help Center & Visual Automation Canvas documentation website built for **Workflow Mitra**.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **Driver.js**, **Lucide Icons**, and **Next-Themes**.

---

## ✨ Features Overview

- **🎨 Spinning Text Accent Color Picker (`🎨`)**:
  - Located at the **bottom-right corner** with continuous 360° rotation animation.
  - Switch between 6 live accent color themes: *Default Zinc*, *Electric Violet*, *Cyber Blue*, *Neon Emerald*, *Crimson Rose*, and *Amber Gold*.
  - Persists selection in `localStorage`.

- **🤖 4 AI Automation FAQ Cards & Reader Modal (`Workflow Mitra FAQ Guide`)**:
  - **OpenAI GPT-4o Autonomous AI Agents**: Configuration, JSON schema enforcement, zero-data-retention security, and sub-team API key scoping.
  - **AI Lead Routing Pipelines**: Under-500ms intent classification, Gmail AI drafts, round-robin owner queueing, and Slack alerts.
  - **AI PDF Invoice Vision Parser**: Multi-page PDF line-item extraction, handwritten OCR, PO number validation, and Google Sheets sync.
  - **Self-Healing Workflows**: Automatic error traceback diagnosis, malformed payload auto-repair, and 429/503 rate-limit backoff.
  - Includes clean breadcrumb navigation (`Home › Article Title`), step-by-step migration guides, FAQs, **Start Building Now** action links, and interactive helpful feedback widgets (`[👍 Yes]` `[👎 No]`).

- **⚡ Interactive Workflow Canvas Carousel Slider**:
  - **Flow 1**: Facebook Lead Ads ➔ Email Filter ➔ HubSpot CRM ➔ Round-Robin Sales Assignment ➔ Gmail, Slack & Sheets Alerts.
  - **Flow 2**: Shopify New Order ➔ Zoho Books Invoice PDF ➔ WhatsApp Customer Alert ➔ Shiprocket Dispatch ➔ Google Sheets Log.
  - **Flow 3**: RSS Feed Blog Post ➔ Anthropic AI Rewrite ➔ Human Slack Approval ➔ Auto-post to LinkedIn, Facebook, Telegram & Discord.
  - **Interactive Controls**: `[Prev]` and `[Next →]` slider navigation, `▶ Run` live execution simulation, zoom scale controls (`+`, `-`, Reset `[⤢]`), and real-time zoom percentage badge (`100%`).
  - **Real Flow Connections**: Directional SVG connectors with animated dashes and crisp arrowheads.

- **🎉 Driver.js Guided Tour & Pet Celebration Modal**:
  - Interactive step-by-step canvas tour triggered by **`Start Guide`**.
  - Automatically launches an animated celebration modal featuring 🐶 **Party Dog**, 🐱 **Smart Cat**, and 🎉 **Party Emojis** when the tour finishes.

- **⭕ Circular WM Logo Badge & Spacious Navbar**:
  - Perfectly rounded circle **`WM`** emblem badge (`rounded-full`) with generous `h-20` Navbar height.
  - Single-click **Dark/Light Theme Switcher** supporting pure high-contrast black (`#000000`) and white (`#FFFFFF`) modes.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16.3 (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS v4, Lucide React icons, `clsx`, `tailwind-merge`
- **Animations**: Framer Motion
- **Guided Tour**: Driver.js
- **Dark Mode**: `next-themes`

---

## 📂 Project Directory Structure

```text
Faq-workflow_mitra/
 ┣ 📂 src/                                 # Main Source Code Directory
 ┃ ┣ 📂 app/                              # Next.js App Router Pages & Layouts
 ┃ ┃ ┣ 📄 page.tsx                        # Main Home Page Layout
 ┃ ┃ ┣ 📄 layout.tsx                      # Root HTML Shell & Theme/Color Providers
 ┃ ┃ ┣ 📄 globals.css                     # Tailwind CSS, Color Variables & Smooth Scroll
 ┃ ┃ ┣ 📄 robots.ts                       # SEO Engine Robots rules
 ┃ ┃ ┗ 📄 sitemap.ts                      # SEO Dynamic Sitemap Generator
 ┃ ┣ 📂 components/                       # Modular UI Components
 ┃ ┃ ┣ 📂 docs/                           # Core Feature Components
 ┃ ┃ ┃ ┣ 📄 PopularCategoryGrid.tsx       # 4 AI FAQ Cards & Reader Modal
 ┃ ┃ ┃ ┣ 📄 WorkflowCanvas.tsx            # 3-Workflow Carousel Canvas & Zoom Controls
 ┃ ┃ ┃ ┗ 📄 DriverTourButton.tsx          # Guided Tour Launcher Button
 ┃ ┃ ┣ 📂 common/                         # Interactive Widgets
 ┃ ┃ ┃ ┣ 📄 TextColorPicker.tsx           # Bottom-Right Spinning Color Picker (🎨)
 ┃ ┃ ┃ ┣ 📄 CelebrationModal.tsx          # Driver.js Tour Finish Celebration Popup
 ┃ ┃ ┃ ┣ 📄 SearchModal.tsx               # Quick Search Dialog (Ctrl+K)
 ┃ ┃ ┃ ┣ 📄 ThemeToggle.tsx               # Light/Dark Theme Switcher
 ┃ ┃ ┃ ┗ 📄 ThemeProvider.tsx              # Next-Themes Wrapper
 ┃ ┃ ┣ 📂 layout/                         # Structural Layout
 ┃ ┃ ┃ ┣ 📄 Navbar.tsx                    # Header with Circular WM Logo Badge
 ┃ ┃ ┃ ┗ 📄 Footer.tsx                    # Footer with External Links
 ┃ ┃ ┗ 📂 ui/                             # Primitive UI Components
 ┃ ┃   ┣ 📄 accordion.tsx                 # FAQ Accordion
 ┃ ┃   ┗ 📄 badge.tsx                     # Category Badges
 ┃ ┣ 📂 context/                          # State Context
 ┃ ┃ ┗ 📄 TextColorContext.tsx            # Accent Color State Management
 ┃ ┗ 📂 hooks/                            # Custom React Hooks
 ┃   ┗ 📄 use-driver-tour.ts              # Driver.js Tour Hook & Callbacks
 ┣ 📄 next.config.ts                      # Next.js Config (allowedDevOrigins for LAN IP)
 ┣ 📄 package.json                        # Dependencies & Scripts
 ┣ 📄 tsconfig.json                       # TypeScript Compiler Config
 ┗ 📄 README.md                           # Documentation Overview
```

---

## 💻 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

To access from mobile or local Wi-Fi network:
Open **`http://<YOUR_IP_ADDRESS>:3000`** (e.g. `http://192.168.1.46:3000`).

### 3. Production Build
```bash
npm run build
```

---

## 🔗 External Application Link

All primary call-to-action buttons (`Start Building Now`, `Visit workflowmitra.com`) open **[https://app.workflowmitra.com/](https://app.workflowmitra.com/)** in a new browser tab (`target="_blank" rel="noreferrer"`).

---

## 📝 License
MIT License © 2026 Workflow Mitra.
