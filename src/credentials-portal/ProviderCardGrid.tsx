import React, { useState, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
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
} from 'lucide-react'
import { CredentialProvider, PROVIDER_LIST } from './credentials-data'
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
} from '@/components/ui/svgs'
import { DIRECT_SVG_MAP } from '@/components/ui/svgs/DirectSvgIcon'

const BRAND_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  whatsapp: WhatsappIcon,
  whatsappmeta: WhatsappIcon,
  whatsappchatmitra: WhatsappIcon,
  whatsappaisensy: WhatsappIcon,
  whatsappwati: WhatsappIcon,
  whatsappinterakt: WhatsappIcon,
  whatsappgallabox: WhatsappIcon,
  smtp: SmtpLogo,
  email: SmtpLogo,
  groq: GroqLogo,
  gemini: GeminiLogo,
  claude: Claude,
  anthropic: Claude,
  anthropicclaude: Claude,
  claudeai: Claude,
  openai: Openai,
  ollama: OllamaLogo,
  slack: Slack,
  discord: Discord,
  telegram: Telegram,
  googleoauth: Google,
  googleserviceaccount: GoogleSheetsLogo,
  sheets: GoogleSheetsLogo,
  gmail: GmailLogo,
  github: GithubDark,
  supabase: Supabase,
  vercel: VercelDark,
  sanity: SanityDark,
  postgresql: Postgresql,
  mysql: Mysql,
  mysqldatabase: Mysql,
  mongodb: Mongodb,
  mongo: Mongodb,
  redis: Redis,
  linkedin: Linkedin,
  hubspot: HubSpotLogo,
  zohocrm: ZohoLogo,
  zoho: ZohoLogo,
  pipedrive: PipedriveLogo,
  woocommerce: WooCommerceLogo,
  shopify: Shopify,
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
  facebookpage: FacebookLogo,
  facebook: FacebookLogo,
}

const FALLBACK_ICON_MAP: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Building2,
  Bot,
  MessageSquare,
  ShoppingCart,
  Video,
  Send,
  Calendar,
  CreditCard,
  Package,
}

interface ProviderCardGridProps {
  providers?: CredentialProvider[]
  title?: string
  subtitle?: string
}

export default function ProviderCardGrid({
  providers = PROVIDER_LIST,
  title,
  subtitle = 'Select any integration below to open its dedicated step-by-step visual onboarding guide.',
}: ProviderCardGridProps) {
  const navigate = useNavigate()
  const [searchFilter, setSearchFilter] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const tabsRef = useRef<HTMLDivElement>(null)

  const categories = useMemo(() => {
    const cats = new Set<string>()
    providers.forEach((p) => {
      if (p.category) cats.add(p.category)
    })
    return ['All', ...Array.from(cats)]
  }, [providers])

  const getCategoryCount = (category: string) => {
    if (category === 'All') return providers.length
    return providers.filter((p) => p.category === category).length
  }

  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        p.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
        p.badge.toLowerCase().includes(searchFilter.toLowerCase()) ||
        p.category.toLowerCase().includes(searchFilter.toLowerCase())

      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [providers, searchFilter, selectedCategory])

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const displayTitle = title || `Supported Credentials & Service Providers (${providers.length}+)`

  return (
    <section
      id="providers-grid"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        paddingTop: '20px',
        borderTop: '1px solid #e4e4e7',
      }}
    >
      {/* TOP BAR: TITLE + ADVANCED SEARCH BOX (PERFECTLY BALANCED ALIGNMENT) */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 500px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '9999px',
                border: '1px solid #d4d4d8',
                background: '#f4f4f5',
                padding: '4px 14px',
                fontSize: '11.5px',
                fontWeight: 800,
                color: '#09090b',
              }}
            >
              <KeyRound size={13} color="#09090b" />
              <span>{providers.length}+ Integrations Available</span>
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#059669',
              }}
            >
              <ShieldCheck size={14} color="#059669" />
              <span>AES-256 Encrypted</span>
            </span>
          </div>

          <h2 style={{ fontSize: '30px', fontWeight: 900, color: '#09090b', margin: '4px 0 0', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
            {displayTitle}
          </h2>

          <p style={{ fontSize: '14.5px', color: '#71717a', margin: '2px 0 0', fontWeight: 500, lineHeight: 1.5 }}>
            {subtitle}
          </p>
        </div>

        {/* PROMINENT SEARCH INPUT */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '360px', flexShrink: 0 }}>
          <Search
            size={17}
            color="#71717a"
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          />
          <input
            type="text"
            placeholder="Search provider (e.g. WhatsApp, OpenAI)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{
              width: '100%',
              height: '46px',
              borderRadius: '14px',
              border: '1.5px solid #d4d4d8',
              background: '#f8fafc',
              padding: '0 40px 0 42px',
              fontSize: '13.5px',
              fontWeight: 600,
              color: '#09090b',
              outline: 'none',
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
            }}
            className="focus:border-zinc-900 focus:bg-white focus:shadow-md"
          />
          {searchFilter && (
            <button
              onClick={() => setSearchFilter('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                color: '#71717a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* CATEGORY TABS BAR */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
        <button
          onClick={() => scrollTabs('left')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid #e4e4e7',
            background: '#ffffff',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          title="Scroll Left"
        >
          <ChevronLeft size={16} />
        </button>

        <div
          ref={tabsRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            padding: '4px 0',
            scrollbarWidth: 'none',
          }}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat
            const count = getCategoryCount(cat)
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: isSelected ? '1.5px solid #09090b' : '1px solid #e4e4e7',
                  background: isSelected ? '#09090b' : '#f8fafc',
                  color: isSelected ? '#ffffff' : '#3f3f46',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{cat}</span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '1px 6px',
                    borderRadius: '9999px',
                    background: isSelected ? 'rgba(255, 255, 255, 0.2)' : '#e4e4e7',
                    color: isSelected ? '#ffffff' : '#71717a',
                  }}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <button
          onClick={() => scrollTabs('right')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid #e4e4e7',
            background: '#ffffff',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          title="Scroll Right"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* PROVIDERS 3-COLUMN CARDS GRID */}
      {filteredProviders.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredProviders.map((p) => {
            const directSvg = DIRECT_SVG_MAP[p.id.toLowerCase()]
            const BrandLogo = BRAND_ICON_MAP[p.id.toLowerCase()]
            const FallbackIcon = FALLBACK_ICON_MAP[p.iconName] || Building2
            const stepsCount = p.subProviders && p.subProviders.length > 0 ? `${p.subProviders.length} Gateways` : `${p.steps.length} Steps`

            return (
              <div
                key={p.id}
                onClick={() => navigate(`/credentials/${p.id}`)}
                style={{
                  borderRadius: '22px',
                  border: '1.5px solid #e4e4e7',
                  background: '#ffffff',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                  minHeight: '220px',
                }}
                className="wm-provider-card"
              >
                <div>
                  {/* CARD HEADER: LOGO + BADGES */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '14px',
                        background: '#f8fafc',
                        border: '1px solid #e4e4e7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        padding: '8px',
                      }}
                    >
                      {directSvg ? (
                        <img
                          src={directSvg}
                          alt={p.name}
                          style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                          loading="eager"
                        />
                      ) : BrandLogo ? (
                        <BrandLogo className="h-7 w-7" />
                      ) : (
                        <FallbackIcon size={24} color="#09090b" />
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      {p.popular && (
                        <span
                          style={{
                            fontSize: '11.5px',
                            fontWeight: 800,
                            padding: '3px 9px',
                            borderRadius: '9999px',
                            background: '#09090b',
                            color: '#ffffff',
                          }}
                        >
                          Popular
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 700,
                          padding: '3px 9px',
                          borderRadius: '9999px',
                          background: '#f4f4f5',
                          color: '#3f3f46',
                          border: '1px solid #e4e4e7',
                        }}
                      >
                        {p.badge.split('(')[0].trim()}
                      </span>
                    </div>
                  </div>

                  {/* TITLE & DESCRIPTION */}
                  <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#09090b', margin: '14px 0 7px', letterSpacing: '-0.015em' }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#3f3f46', margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                    {p.description}
                  </p>
                </div>

                {/* CARD FOOTER */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid #f4f4f5',
                    fontSize: '13px',
                    fontWeight: 700,
                  }}
                >
                  <span style={{ color: '#52525b' }}>{stepsCount}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#09090b', fontWeight: 800, fontSize: '13px' }}>
                    <span>View Guide</span>
                    <ChevronRight size={15} />
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div
          style={{
            borderRadius: '20px',
            border: '1.5px dashed #d4d4d8',
            background: '#f8fafc',
            padding: '48px 24px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '15px', fontWeight: 700, color: '#09090b', margin: 0 }}>
            No providers found matching &ldquo;{searchFilter}&rdquo;
          </p>
          <button
            onClick={() => {
              setSearchFilter('')
              setSelectedCategory('All')
            }}
            style={{
              marginTop: '12px',
              padding: '6px 16px',
              borderRadius: '9999px',
              border: '1px solid #09090b',
              background: '#09090b',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  )
}
