# 🔐 Workflow Mitra - Integrations, Credentials & Onboarding Module Architecture

Welcome to the central documentation for Workflow Mitra's interactive guides, API credential vaults, and step-by-step onboarding walkthroughs.

---

## 📂 Folder & Module Structure

```text
src/
├── components/
│   ├── credentials/
│   │   ├── CredentialsOverviewClient.tsx   # All 37+ Providers Catalog View (/credentials)
│   │   ├── InteractivePlayer.jsx           # Widescreen TV Mockup with 4-Layer Orbit Hotspot
│   │   ├── ProviderCardGrid.tsx            # 37+ Cards Grid with Search & Category Filters
│   │   ├── ProviderGuideClient.tsx         # Single Provider Interactive Guide (/credentials/:id)
│   │   └── README.md                       # Module Documentation
│   ├── home/
│   │   └── OnboardingSection.jsx           # Home Page Documentation Hub (Boxes 1, 2, 3)
│   └── ui/
│       └── svgs/                           # All 54 Official Brand SVG Icons & DirectSvgIcon
├── context/
│   └── TextColorContext.tsx                # Monochrome Black & White Theme Provider
├── data/
│   └── credentials-data.ts                 # 37+ Connected Providers Data, Hotspots & Steps
├── pages/
│   ├── CreateAccountPage.jsx               # 5-Step Account Registration Guide (/how-to-create-account-workflowmitra)
│   ├── CredentialsPage.tsx                 # Full Catalog Route (/credentials)
│   └── CredentialProviderPage.tsx          # Dynamic Provider Route (/credentials/:providerId)
└── faq-portal/
    └── faq-portal.css                      # Self-Contained Design System & Scrollbar Tokens

public/
├── credentials/                            # Step-by-step Screenshots for 37+ Providers
├── onboarding/                             # Registration 5-Step Screenshots
└── svg/                                    # 24 High-Res Official Brand SVG Vectors
```

---

## 🚀 Active Routes & Pages

1. **Account Registration Guide:**
   * **Route:** `/how-to-create-account-workflowmitra` (and `/create-account` redirect)
   * **Component:** `CreateAccountPage.jsx`
   * **Features:** 5-Step Interactive Player, Audio Voice Reader (`Listen`), Sub-step Cards, Lightbox Modal with Back button.

2. **All 37+ Credentials Catalog:**
   * **Route:** `/credentials`
   * **Component:** `CredentialsPage.tsx` -> `CredentialsOverviewClient.tsx`
   * **Features:** Widescreen Overview TV Frame, Fast Real-Time Search, Category Tabs, AES-256 Badges.

3. **Single Integration Step-by-Step Guide:**
   * **Route:** `/credentials/:providerId` (e.g. `/credentials/whatsapp`, `/credentials/openai`, `/credentials/shopify`)
   * **Component:** `CredentialProviderPage.tsx` -> `ProviderGuideClient.tsx`
   * **Features:** Sub-provider Tabs (Meta, ChatMitra, AiSensy, WATI), Interactive Hotspot Pins, Direct Console App Links.

4. **Home Page Documentation Hub:**
   * **Route:** `/`
   * **Component:** `Home.jsx` -> `OnboardingSection.jsx`
   * **Features:** Box 1 (Account Setup), Box 2 (37+ Credentials), Box 3 (Support & Templates).
