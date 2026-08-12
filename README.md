# ⚡ Workflow Mitra Help Center & 30+ Credentials Integration Portal

An ultra-responsive, state-of-the-art Help Center, Interactive Onboarding Tour & Credentials Integration Portal built for **Workflow Mitra**.

Built using **Vite 6**, **React 19**, **React Router 7**, **TypeScript 5**, **Tailwind CSS v4**, **Framer Motion**, **Driver.js**, **Lucide Icons**, and **Next-Themes**.

---

## ✨ Key Features & Capabilities

### 1. 📺 Interactive TV Screen Onboarding Player (`InteractivePlayer.tsx`)
- **Browser/TV Frame UI**: High-definition browser screen mockup with URL bar and lock icon.
- **Audio Voice Assistant**: Natural text-to-speech narration with `[Listen Step]` / `[Stop Voice]` buttons.
- **Visual Progress Bar**: Real-time progress bar and step percentage (`Step X of Y`).
- **Interactive Hotspot Pins**: Animated glowing hotspot dots positioned at exact target coordinates.
- **TV Screen Completion Overlay**: Sleek dark mode completion screen with:
  - 🔄 **Start Tour Again**: Replay the onboarding tour from Step 1.
  - 🔐 **Explore Credentials**: Smooth scroll to the 30+ Credentials Provider grid.
  - 🚀 **Launch App**: Direct link to open `https://app.workflowmitra.com`.

### 2. 🔐 30+ Supported Credentials & Service Providers
Interactive step-by-step API Key, Access Token, and OAuth 2.0 configuration guides for:
- **AI Models**: OpenAI (GPT-4o), Anthropic (Claude AI), Google Gemini, Groq, Ollama
- **Communication & Meetings**: WhatsApp Cloud API, Slack, Telegram, Gmail / SMTP Mail, Microsoft Teams, Jitsi Meet, Cisco Webex, Zoom, Cal.com, Whereby, Calendly
- **CRM & Customer Support**: HubSpot, Zoho CRM, Pipedrive, Zoho Books, Zoho Desk, Zoho Bookings, Zendesk, Freshdesk, Intercom
- **E-Commerce & Social Media**: Shopify, WooCommerce, Shiprocket, Facebook Page, LinkedIn
- **Databases**: PostgreSQL, MySQL, MongoDB Atlas, Redis Cloud

### 3. 🎨 6 Dynamic Accent Color Themes (`TextColorPicker.tsx`)
- Continuously rotating 360° color picker fixed at the **bottom-right corner**.
- Live accent color themes: *Default Zinc*, *Electric Violet*, *Cyber Blue*, *Neon Emerald*, *Crimson Rose*, and *Amber Gold*.
- Persists user preferences seamlessly in `localStorage`.

### 4. ⚡ Visual Automation Canvas Carousel (`WorkflowCanvas.tsx`)
- **Flow 1**: Facebook Lead Ads ➔ Email Filter ➔ HubSpot CRM ➔ Round-Robin Sales Assignment ➔ Slack & Sheets Alerts.
- **Flow 2**: Shopify Order ➔ Zoho Books Invoice ➔ WhatsApp Customer Alert ➔ Shiprocket Dispatch ➔ Sheets Log.
- **Flow 3**: RSS Feed ➔ Anthropic AI Rewrite ➔ Human Slack Approval ➔ Auto-post to LinkedIn, Facebook, Telegram & Discord.
- Directional SVG flow connectors with animated dash lines and live execution simulation (`▶ Run`).

### 5. 🖼️ 100% WebP Image Optimization
- All 223+ onboarding step screenshots converted to high-performance WebP format.
- Over **70% file size reduction** (51 MB ➔ 15 MB) for ultra-fast initial page loads.

---

## 🛠️ Technology Stack

| Component | Technology Used |
| :--- | :--- |
| **Framework** | Vite 6.4 + React 19.2 + React Router 7.6 |
| **Language** | TypeScript 5.0 |
| **Styling** | Tailwind CSS v4.0 + Lucide React Icons |
| **Animations** | Framer Motion 13.0 |
| **Interactive Tour** | Driver.js 1.8 |
| **Search Engine** | Fuse.js 7.5 (Client-side instant search) |
| **Theme System** | next-themes 0.4 (Dark/Light mode switcher) |
| **SEO & Head** | react-helmet-async 3.0 |

---

## 📂 Project Structure

```text
Workflow-mitra-faq/
 ┣ 📂 src/
 ┃ ┣ 📂 pages/                             # Application Pages
 ┃ ┃ ┣ 📄 HomePage.tsx                     # Help Center Home Page
 ┃ ┃ ┣ 📄 CredentialsPage.tsx              # All Credentials Overview Page
 ┃ ┃ ┣ 📄 CredentialProviderPage.tsx       # Individual Provider Guide Page
 ┃ ┃ ┣ 📄 CreateAccountPage.tsx            # Account Registration Guide Page
 ┃ ┃ ┗ 📄 NotFoundPage.tsx                 # 404 Error Page
 ┃ ┣ 📂 components/                        # React UI Components
 ┃ ┃ ┣ 📂 credentials/                     # Integration Credentials Components
 ┃ ┃ ┃ ┣ 📄 InteractivePlayer.tsx          # TV Screen Onboarding Player
 ┃ ┃ ┃ ┣ 📄 ProviderCardGrid.tsx           # 30+ Provider Cards Grid & Search Filter
 ┃ ┃ ┃ ┣ 📄 ProviderGuideClient.tsx        # Provider Dedicated Walkthrough Component
 ┃ ┃ ┃ ┗ 📄 CredentialsOverviewClient.tsx   # Credentials Overview Page Client
 ┃ ┃ ┣ 📂 common/                          # Global Components
 ┃ ┃ ┃ ┣ 📄 TextColorPicker.tsx            # Spinning Color Accent Picker
 ┃ ┃ ┃ ┣ 📄 SearchModal.tsx                # Ctrl+K Instant Search Modal
 ┃ ┃ ┃ ┗ 📄 ThemeToggle.tsx                # Light/Dark Theme Switcher
 ┃ ┃ ┣ 📂 docs/                            # Automation & FAQ Components
 ┃ ┃ ┃ ┣ 📄 WorkflowCanvas.tsx             # Interactive Automation Canvas Slider
 ┃ ┃ ┃ ┗ 📄 PopularCategoryGrid.tsx        # AI FAQ Reader Modal & Cards
 ┃ ┃ ┣ 📂 layout/                          # Layout Components
 ┃ ┃ ┃ ┣ 📄 Navbar.tsx                     # Header with Circular WM Emblem
 ┃ ┃ ┃ ┗ 📄 Footer.tsx                     # Ecosystem Footer & Smooth Scroll Links
 ┃ ┃ ┗ 📂 ui/                              # SVG Logos & Primitive Elements
 ┃ ┃   ┣ 📂 svgs/                          # Brand Logos & DirectSvgIcon Mapper
 ┃ ┃   ┗ 📄 customLogos.tsx               # Embedded SVG Components
 ┃ ┣ 📂 data/                              # Static Data Stores
 ┃ ┃ ┗ 📄 credentials-data.ts              # 30+ Provider Configurations & WebP Paths
 ┃ ┣ 📄 App.tsx                            # App Router & Theme Provider Entry
 ┃ ┗ 📄 index.css                          # Tailwind v4 Directives & Dark Mode Rules
 ┣ 📂 public/                              # Static WebP Assets & SVGs
 ┃ ┣ 📂 credentials/                      # WebP Onboarding Screenshots
 ┃ ┗ 📂 svg/                              # Official Brand SVG Assets
 ┣ 📄 vite.config.ts                       # Vite Configuration & Optimization Rules
 ┣ 📄 package.json                         # Dependencies & NPM Scripts
 ┗ 📄 README.md                            # Documentation Overview
```

---

## 💻 Quick Start & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

To access from mobile or local Wi-Fi:
Open **`http://<YOUR_IP_ADDRESS>:3000`** (e.g., `http://192.168.1.46:3000`).

### 3. Production Build & Typecheck
```bash
# Verify TypeScript types
npx tsc --noEmit

# Build production bundle
npm run build
```

---

## 🔗 Live Application Links

- **Help Center Portal**: `http://localhost:3000`
- **Credentials Directory**: `http://localhost:3000/credentials`
- **Official App Portal**: [https://app.workflowmitra.com/](https://app.workflowmitra.com/)

---

## 📝 License

MIT License © 2026 Workflow Mitra. All rights reserved.
