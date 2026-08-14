import * as React from "react";
import { motion } from "framer-motion";
import {
  KeyRound,
  Search,
  ChevronRight,
  ChevronLeft,
  Building2,
  Bot,
  MessageSquare,
  ShoppingCart,
  Video,
  Send,
  Calendar,
  CreditCard,
  Package,
  X,
  Sparkles,
  ShieldCheck,
  Layers,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTextColor } from "@/context/TextColorContext";
import { CredentialProvider, PROVIDER_LIST } from "@/data/credentials-data";
import {
  Openai,
  Slack,
  WhatsappIcon,
  Shopify,
  Telegram,
  Discord,
  Google,
  GithubDark,
  Supabase,
  VercelDark,
  SanityDark,
  Postgresql,
  Mysql,
  Mongodb,
  Redis,
  Claude,
  Linkedin,
  HubSpotLogo,
  ZohoLogo,
  PipedriveLogo,
  WooCommerceLogo,
  ZohoBooksLogo,
  ShiprocketLogo,
  ZoomLogo,
  CalComLogo,
  WherebyLogo,
  CalendlyLogo,
  MSTeamsLogo,
  ZohoBookingsLogo,
  JitsiMeetLogo,
  CiscoWebexLogo,
  ZendeskLogo,
  FreshdeskLogo,
  FacebookLogo,
  SmtpLogo,
  GroqLogo,
  GeminiLogo,
  OllamaLogo,
  IntercomLogo,
  ZohoDeskLogo,
  GoogleSheetsLogo,
  GmailLogo,
  MySqlLogo,
} from "@/components/ui/svgs";
import { DIRECT_SVG_MAP, DirectSvgIcon } from "@/components/ui/svgs/DirectSvgIcon";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Bot,
  MessageSquare,
  ShoppingCart,
  Video,
  Send,
  Calendar,
  CreditCard,
  Package,
};

const BRAND_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  whatsapp: WhatsappIcon,
  whatsappmeta: WhatsappIcon,
  whatsappchatmitra: WhatsappIcon,
  whatsappaisensy: WhatsappIcon,
  whatsappwati: WhatsappIcon,
  whatsappinterakt: WhatsappIcon,
  whatsappgallabox: WhatsappIcon,
  smtp: SmtpLogo,
  groq: GroqLogo,
  gemini: GeminiLogo,
  claude: Claude,
  openai: Openai,
  ollama: OllamaLogo,
  slack: Slack,
  discord: Discord,
  telegram: Telegram,
  email: SmtpLogo,
  hubspot: HubSpotLogo,
  zohocrm: ZohoLogo,
  pipedrive: PipedriveLogo,
  shopify: Shopify,
  woocommerce: WooCommerceLogo,
  zohobooks: ZohoBooksLogo,
  shiprocket: ShiprocketLogo,
  zoom: ZoomLogo,
  calcom: CalComLogo,
  whereby: WherebyLogo,
  calendly: CalendlyLogo,
  msteams: MSTeamsLogo,
  teams: MSTeamsLogo,
  zohobookings: ZohoBookingsLogo,
  jitsimeet: JitsiMeetLogo,
  webex: CiscoWebexLogo,
  ciscowebex: CiscoWebexLogo,
  zendesk: ZendeskLogo,
  freshdesk: FreshdeskLogo,
  intercom: IntercomLogo,
  zohodesk: ZohoDeskLogo,
  linkedin: Linkedin,
  facebookpage: FacebookLogo,
  facebook: FacebookLogo,
  anthropic: Claude,
  postgresql: Postgresql,
  postgres: Postgresql,
  mysql: MySqlLogo,
  mongodb: Mongodb,
  mongo: Mongodb,
  redis: Redis,
  gmail: GmailLogo,
  googleoauth: Google,
  googleserviceaccount: GoogleSheetsLogo,
  googlesheets: GoogleSheetsLogo,
  google: Google,
  github: GithubDark,
  supabase: Supabase,
  vercel: VercelDark,
  sanity: SanityDark,
};

interface ProviderCardGridProps {
  providers?: CredentialProvider[];
  title?: string;
  subtitle?: string;
}

export default function ProviderCardGrid({
  providers = PROVIDER_LIST,
  title,
  subtitle = "Select any integration below to open its dedicated step-by-step visual onboarding guide.",
}: ProviderCardGridProps) {
  const { currentColor } = useTextColor();
  const navigate = useNavigate();

  const displayTitle = title || `Supported Credentials & Service Providers (${providers.length}+)`;

  const [searchFilter, setSearchFilter] = React.useState<string>("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const tabsRef = React.useRef<HTMLDivElement>(null);

  // Extract all unique categories dynamically
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    providers.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [providers]);

  const filteredProviders = React.useMemo(() => {
    return providers.filter((p) => {
      const query = searchFilter.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.badge.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query);
      const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [providers, searchFilter, selectedCategory]);

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return providers.length;
    return providers.filter((p) => p.category === cat).length;
  };

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="providers-grid" className="space-y-8 sm:space-y-10 pt-10 border-t border-zinc-200 dark:border-zinc-800/80 scroll-mt-20">
      
      {/* HEADER BAR WITH TITLE & ADVANCED SEARCH */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700/80 bg-zinc-100 dark:bg-zinc-900 px-3.5 py-1.5 text-xs font-extrabold text-zinc-900 dark:text-white shadow-2xs">
              <KeyRound className={`h-4 w-4 ${currentColor.textClass}`} />
              <span>{providers.length}+ Integrations Available</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 dark:text-zinc-400">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> AES-256 Encrypted
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-900 dark:text-white pt-1">
            {displayTitle}
          </h2>
          <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        {/* SEARCH INPUT BOX */}
        <div className="relative w-full lg:w-96 shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search provider (e.g. WhatsApp, OpenAI, HubSpot)..."
            aria-label="Search integration provider"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full rounded-2xl border-2 border-zinc-300/80 bg-zinc-50/80 pl-11 pr-10 py-3 text-xs sm:text-sm font-bold text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-white dark:focus:bg-zinc-950 transition-all shadow-inner"
          />
          {searchFilter ? (
            <button
              onClick={() => setSearchFilter("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-extrabold text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-0.5 bg-white dark:bg-zinc-800 shadow-2xs">
              /
            </span>
          )}
        </div>
      </div>

      {/* CATEGORY FILTER TABS WITH SCROLL BUTTONS */}
      <div className="relative flex items-center group/scroll">
        <button
          onClick={() => scrollTabs("left")}
          aria-label="Scroll categories left"
          className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white shadow-md backdrop-blur-md shrink-0 mr-3 z-10 transition-transform active:scale-95 cursor-pointer"
          title="Scroll Left"
        >
          <ChevronLeft className="h-4.5 w-4.5" />
        </button>

        <div
          ref={tabsRef}
          className="flex items-center gap-3 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth w-full select-none"
        >
          {categories.map((cat) => {
            const count = getCategoryCount(cat);
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={(e) => {
                  setSelectedCategory(cat);
                  e.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                  });
                }}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-extrabold transition-all cursor-pointer shrink-0 border-2 ${
                  isSelected
                    ? `${currentColor.bgClass} text-white shadow-md border-transparent scale-[1.02]`
                    : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:border-zinc-700"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    isSelected
                      ? "bg-white/25 text-white"
                      : "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scrollTabs("right")}
          aria-label="Scroll categories right"
          className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white shadow-md backdrop-blur-md shrink-0 ml-3 z-10 transition-transform active:scale-95 cursor-pointer"
          title="Scroll Right"
        >
          <ChevronRight className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* CARDS GRID (PRO REAL WEBSITE WIDE 3-COLUMN BOX CARDS) */}
      {filteredProviders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {filteredProviders.map((p) => {
            const directSvg = DIRECT_SVG_MAP[p.id.toLowerCase()];
            const BrandIcon = BRAND_ICON_MAP[p.id.toLowerCase()];
            const LucideIconComp = ICON_MAP[p.iconName] || Building2;
            const hasSubProviders = p.subProviders && p.subProviders.length > 0;

            return (
              <motion.div
                key={p.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.18 }}
                onClick={() => navigate(`/credentials/${p.id}`)}
                className="group relative rounded-2xl border-2 border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 flex flex-col justify-between cursor-pointer overflow-hidden ring-1 ring-black/5 dark:ring-white/5"
              >
                {/* TOP CORNER ACCENT HOVER HIGHLIGHT LINE */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity ${currentColor.bgClass}`} />

                <div className="space-y-4">
                  {/* CARD HEADER: CRISP BRAND LOGO & BADGES */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 group-hover:scale-105 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-all p-3 shadow-2xs shrink-0">
                      {directSvg ? (
                        <img src={directSvg} alt={p.name} className="h-7 w-7 object-contain shrink-0" />
                      ) : BrandIcon ? (
                        <BrandIcon className="h-7 w-7" />
                      ) : (
                        <LucideIconComp className={`h-7 w-7 ${currentColor.textClass}`} />
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {p.popular && (
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full text-white shadow-2xs ${currentColor.bgClass}`}>
                          Popular
                        </span>
                      )}

                      <span className="text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
                        {p.badge}
                      </span>
                    </div>
                  </div>

                  {/* TITLE & DESCRIPTION */}
                  <div className="pt-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white transition-colors group-hover:text-zinc-900 dark:group-hover:text-white">
                        {p.name}
                      </h3>
                      {hasSubProviders && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                          {p.subProviders!.length} Gateways
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium mt-2 line-clamp-3 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>

                {/* REAL WEBSITE CARD FOOTER BOX BAR (-MX-6 -MB-6) */}
                <div className="-mx-6 -mb-6 mt-6 px-6 py-3.5 bg-zinc-50 dark:bg-zinc-900/60 border-t-2 border-zinc-200/90 dark:border-zinc-800/90 flex items-center justify-between rounded-b-xl group-hover:bg-zinc-100/80 dark:group-hover:bg-zinc-900 transition-colors">
                  <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{hasSubProviders ? `${p.subProviders!.length} Sub-Providers` : `${p.steps.length} Steps`}</span>
                  </span>

                  <span className={`inline-flex items-center gap-1 text-xs font-black transition-all group-hover:translate-x-1 ${currentColor.textClass}`}>
                    <span>View Guide</span>
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* EMPTY SEARCH STATE */
        <div className="rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 p-14 text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-500">
            <Search className="h-7 w-7" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white">
              No Providers Found Matching &quot;{searchFilter}&quot;
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              Try searching with a different term like &quot;WhatsApp&quot;, &quot;OpenAI&quot;, or select another category above.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchFilter("");
              setSelectedCategory("All");
            }}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-extrabold text-white shadow-md transition-all cursor-pointer ${currentColor.bgClass}`}
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </section>
  );
}
