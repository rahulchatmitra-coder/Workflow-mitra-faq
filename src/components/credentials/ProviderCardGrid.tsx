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
import { DIRECT_SVG_MAP } from "@/components/ui/svgs/DirectSvgIcon";

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
  subtitle = "Click any provider below to open its dedicated step-by-step interactive onboarding guide.",
}: ProviderCardGridProps) {
  const { currentColor } = useTextColor();
  const navigate = useNavigate();

  const displayTitle = title || `Supported Credentials & Service Providers (${providers.length}+)`;

  const [searchFilter, setSearchFilter] = React.useState<string>("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const tabsRef = React.useRef<HTMLDivElement>(null);

  const categories = ["All", "CRM & Sales", "AI Models", "Communication", "E-Commerce"];

  const filteredProviders = providers.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.badge.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return providers.length;
    return providers.filter((p) => p.category === cat).length;
  };

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="providers-grid" className="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-20">
      {/* SECTION HEADER & SEARCH */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <KeyRound className={`h-5 w-5 ${currentColor.textClass}`} />
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
              {displayTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            {subtitle}
          </p>
        </div>

        {/* SEARCH INPUT */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search provider (e.g. HubSpot, OpenAI)..."
            aria-label="Search integration provider"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 pl-9 pr-4 py-2 text-xs font-semibold text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white transition-all shadow-inner"
          />
        </div>
      </div>

      {/* CATEGORY FILTER TABS WITH SMOOTH SCROLL BUTTONS */}
      <div className="relative flex items-center group/scroll">
        <button
          onClick={() => scrollTabs("left")}
          aria-label="Scroll category tabs left"
          className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white shadow-md backdrop-blur-md shrink-0 mr-2 z-10 transition-transform active:scale-95 cursor-pointer"
          title="Scroll Left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div
          ref={tabsRef}
          className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none scroll-smooth w-full select-none"
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
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-extrabold transition-all cursor-pointer shrink-0 border ${
                  isSelected
                    ? `${currentColor.bgClass} text-white shadow-sm border-transparent`
                    : "border-zinc-200/80 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:border-zinc-700"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isSelected
                      ? "bg-white/20 text-white"
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
          aria-label="Scroll category tabs right"
          className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white shadow-md backdrop-blur-md shrink-0 ml-2 z-10 transition-transform active:scale-95 cursor-pointer"
          title="Scroll Right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProviders.map((p) => {
          const directSvg = DIRECT_SVG_MAP[p.id.toLowerCase()];
          const BrandIcon = BRAND_ICON_MAP[p.id.toLowerCase()];
          const LucideIconComp = ICON_MAP[p.iconName] || Building2;
          return (
            <motion.div
              key={p.id}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              onClick={() => navigate(`/credentials/${p.id}`)}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs hover:border-zinc-400 hover:bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 group-hover:scale-105 transition-transform p-2.5">
                    {directSvg ? (
                      <img src={directSvg} alt={p.name} className="h-6 w-6 object-contain shrink-0" />
                    ) : BrandIcon ? (
                      <BrandIcon className="h-6 w-6" />
                    ) : (
                      <LucideIconComp className={`h-6 w-6 ${currentColor.textClass}`} />
                    )}
                  </div>

                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/80">
                    {p.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white transition-colors flex items-center justify-between">
                    <span>{p.name}</span>
                    {p.popular && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md text-white ${currentColor.bgClass}`}>
                        Popular
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal mt-1 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-400">
                  {p.steps.length} Interactive Steps
                </span>

                <span className={`inline-flex items-center gap-1 text-xs font-black transition-transform group-hover:translate-x-1 ${currentColor.textClass}`}>
                  <span>View Guide</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
