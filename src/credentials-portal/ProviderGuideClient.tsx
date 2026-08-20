import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Maximize2,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Volume2,
  VolumeX,
  X,
  Building2,
  Bot,
  MessageSquare,
  ShoppingCart,
  Send,
  Calendar,
  CreditCard,
  Package,
  Mail,
  Zap,
  Cpu,
  Globe,
  Rocket,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CredentialProvider, PROVIDER_LIST } from "./credentials-data";
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
} from "@/components/ui/svgs";
import { DIRECT_SVG_MAP, DirectSvgIcon } from "@/components/ui/svgs/DirectSvgIcon";
import InteractivePlayer from "./InteractivePlayer";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Bot,
  MessageSquare,
  ShoppingCart,
  Send,
  Calendar,
  CreditCard,
  Package,
  Mail,
  Zap,
  Sparkles,
  Cpu,
};

const BRAND_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  whatsapp: WhatsappIcon,
  smtp: SmtpLogo,
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
  gmail: GmailLogo,
  github: GithubDark,
  supabase: Supabase,
  vercel: VercelDark,
  sanity: SanityDark,
  postgresql: Postgresql,
  mysql: Mysql,
  mysqldatabase: Mysql,
  mongodb: Mongodb,
  redis: Redis,
  linkedin: Linkedin,
  hubspot: HubSpotLogo,
  zohocrm: ZohoLogo,
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
  zohobookings: ZohoBookingsLogo,
  jitsimeet: JitsiMeetLogo,
  webex: CiscoWebexLogo,
  zendesk: ZendeskLogo,
  freshdesk: FreshdeskLogo,
  intercom: IntercomLogo,
  zohodesk: ZohoDeskLogo,
  facebookpage: FacebookLogo,
};

interface ProviderGuideClientProps {
  provider: CredentialProvider;
}

export default function ProviderGuideClient({ provider }: ProviderGuideClientProps) {
  const navigate = useNavigate();
  const [activeSubProviderId, setActiveSubProviderId] = useState<string>(
    provider.subProviders && provider.subProviders.length > 0 ? provider.subProviders[0].id : ""
  );
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isFullscreenModal, setIsFullscreenModal] = useState<boolean>(false);
  const [selectedImageModal, setSelectedImageModal] = useState<string>("");
  const [feedbackGiven, setFeedbackGiven] = useState<boolean>(false);
  const [activeSpeakingIndex, setActiveSpeakingIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [provider.id, activeSubProviderId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreenModal(false);
      }
    };
    if (isFullscreenModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreenModal]);

  const activeSubProvider = provider.subProviders?.find((s) => s.id === activeSubProviderId);
  const steps = activeSubProvider ? activeSubProvider.steps : provider.steps;
  const effectiveName = activeSubProvider ? `${provider.name} (${activeSubProvider.name})` : provider.name;
  const effectiveBadge = activeSubProvider ? activeSubProvider.badge : provider.badge;
  const effectiveDescription = activeSubProvider ? activeSubProvider.description : provider.description;
  const effectiveAppUrl = activeSubProvider ? activeSubProvider.appUrl : provider.appUrl;

  const totalSteps = steps.length;

  const handleNextStep = () => {
    setCurrentStepIndex((prev) => (prev + 1) % totalSteps);
  };

  const handlePrevStep = () => {
    setCurrentStepIndex((prev) => (prev - 1 + totalSteps) % totalSteps);
  };

  const handleBackToCredentials = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/credentials");
  };

  const BrandIconComp = BRAND_ICON_MAP[provider.id.toLowerCase()];
  const LucideIconComp = ICON_MAP[provider.iconName] || Building2;

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#09090b", fontFamily: "'Geist Sans', 'Inter', sans-serif" }}>
      
      {/* TOP NAVIGATION BACK BAR */}
      <div style={{ borderBottom: "1px solid #e4e4e7", background: "#fafafa", position: "sticky", top: 0, zIndex: 30 }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link
            to="/credentials"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              fontWeight: 750,
              color: "#3f3f46",
              textDecoration: "none",
              cursor: "pointer",
              padding: 0,
            }}
            className="hover:text-black"
          >
            <ArrowLeft size={16} />
            <span>Back to All Credentials</span>
          </Link>

          {effectiveAppUrl && (
            <a
              href={effectiveAppUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                borderRadius: "9999px",
                padding: "5px 14px",
                fontSize: "12px",
                fontWeight: 700,
                background: "#09090b",
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              <span>Open {activeSubProvider ? activeSubProvider.name : provider.name} Console</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "36px 24px", display: "flex", flexDirection: "column", gap: "40px" }}>
        
        {/* HEADER SECTION */}
        <div style={{ borderBottom: "1px solid #e4e4e7", paddingBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                borderRadius: "9999px",
                border: "1px solid #d4d4d8",
                background: "#f4f4f5",
                padding: "4px 14px",
                fontSize: "11.5px",
                fontWeight: 800,
                color: "#09090b",
              }}
            >
              {DIRECT_SVG_MAP[provider.id.toLowerCase()] ? (
                <DirectSvgIcon providerId={provider.id} className="h-4 w-4 shrink-0" />
              ) : BrandIconComp ? (
                <BrandIconComp className="h-4 w-4 shrink-0" />
              ) : (
                <LucideIconComp className="h-4 w-4 shrink-0 text-zinc-900" />
              )}
              <span>{effectiveBadge}</span>
            </span>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#71717a" }}>
              • {provider.category}
            </span>
          </div>

          <h1 style={{ fontSize: "32px", fontWeight: 900, letterSpacing: "-0.025em", color: "#09090b", margin: "10px 0 6px" }}>
            How to Create &amp; Connect {effectiveName} Credentials
          </h1>

          <p style={{ fontSize: "15px", color: "#71717a", margin: 0, fontWeight: 500 }}>
            {effectiveDescription}
          </p>

          {/* SUB PROVIDER SELECTOR (FOR WHATSAPP) */}
          {provider.subProviders && provider.subProviders.length > 0 && (
            <div
              style={{
                marginTop: "20px",
                borderRadius: "16px",
                border: "1px solid #e4e4e7",
                background: "#f8fafc",
                padding: "16px",
              }}
            >
              <label style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#71717a", display: "block", marginBottom: "10px" }}>
                Choose your {provider.name} Provider / Gateway:
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "10px" }}>
                {provider.subProviders.map((sub) => {
                  const isSelected = (activeSubProvider?.id || provider.subProviders![0].id) === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setActiveSubProviderId(sub.id);
                        setCurrentStepIndex(0);
                      }}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "12px",
                        border: isSelected ? "1.5px solid #09090b" : "1px solid #e4e4e7",
                        background: isSelected ? "#09090b" : "#ffffff",
                        color: isSelected ? "#ffffff" : "#09090b",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: "2px",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span style={{ fontSize: "13px", fontWeight: 800 }}>{sub.name}</span>
                      <span style={{ fontSize: "10px", opacity: 0.8 }}>{sub.badge.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* INTERACTIVE PLAYER */}
        <InteractivePlayer
          steps={steps}
          currentStepIndex={currentStepIndex}
          onStepChange={(idx) => setCurrentStepIndex(idx)}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          defaultAddressUrl={effectiveAppUrl}
          providerName={effectiveName}
        />

        {/* DETAILED STEPS INSTRUCTIONS */}
        <section style={{ display: "flex", flexDirection: "column", gap: "28px", paddingTop: "20px", borderTop: "1px solid #e4e4e7" }}>
          <div>
            <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#09090b", display: "flex", alignItems: "center", gap: "6px" }}>
              <Sparkles size={13} color="#09090b" />
              Detailed Walkthrough
            </span>
            <h2 style={{ fontSize: "26px", fontWeight: 900, color: "#09090b", margin: "8px 0 4px", letterSpacing: "-0.025em" }}>
              Step-by-Step {effectiveName} Connection Instructions
            </h2>
            <p style={{ fontSize: "14.5px", color: "#71717a", margin: 0, fontWeight: 500 }}>
              Follow these steps to generate and connect your secret keys securely.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {steps.map((s, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: "28px",
                  border: "1.5px solid #e4e4e7",
                  background: "#ffffff",
                  padding: "26px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)",
                    gap: "32px",
                    alignItems: "center",
                  }}
                  className="wm-step-card-grid"
                >
                  {/* LEFT: SCREENSHOT THUMBNAIL */}
                  <div
                    style={{
                      borderRadius: "18px",
                      overflow: "hidden",
                      border: "1.5px solid #d4d4d8",
                      background: "#09090b",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onClick={() => {
                      setSelectedImageModal(s.image);
                      setIsFullscreenModal(true);
                    }}
                    className="wm-thumbnail-hover-box"
                  >
                    <div style={{ position: "relative", width: "100%", aspectRatio: "16/10" }}>
                      <img
                        src={s.image}
                        alt={`Step ${idx + 1}: ${s.title}`}
                        loading="lazy"
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "top",
                          transition: "transform 0.35s ease",
                        }}
                        className="wm-thumbnail-image"
                      />
                      
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(0, 0, 0, 0.35)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0,
                          transition: "opacity 0.25s ease",
                        }}
                        className="wm-expand-overlay"
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "7px",
                            borderRadius: "9999px",
                            background: "rgba(9, 9, 11, 0.95)",
                            padding: "8px 18px",
                            fontSize: "12px",
                            fontWeight: 800,
                            color: "#ffffff",
                            border: "1px solid #3f3f46",
                            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                          }}
                        >
                          <Maximize2 size={14} /> Click to Expand
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: INFO */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "10px",
                          background: "#09090b",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          fontWeight: 900,
                          flexShrink: 0,
                        }}
                      >
                        {idx + 1}
                      </span>
                      <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#09090b", margin: 0, lineHeight: 1.35, letterSpacing: "-0.015em" }}>
                        {s.title}
                      </h3>
                    </div>

                    <div
                      style={{
                        borderRadius: "18px",
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        padding: "20px 22px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px",
                      }}
                    >
                      <div style={{ fontSize: "14.5px", color: "#18181b", lineHeight: 1.7, margin: 0, whiteSpace: "pre-line", fontWeight: 500 }}>
                        {s.description}
                      </div>

                      {s.hotspot?.detail && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "8px",
                            fontSize: "13.5px",
                            fontWeight: 600,
                            color: "#09090b",
                            paddingTop: "12px",
                            borderTop: "1px solid #e2e8f0",
                            lineHeight: 1.55,
                          }}
                        >
                          <CheckCircle2 size={16} color="#09090b" style={{ flexShrink: 0, marginTop: "2px" }} />
                          <span>{s.hotspot.detail}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEEDBACK WIDGET */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "24px",
            border: "1px solid #e4e4e7",
            background: "#f8fafc",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#09090b", margin: 0 }}>
            Was this {effectiveName} Guide helpful?
          </h4>

          {feedbackGiven ? (
            <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 800, color: "#059669" }}>
              <Sparkles size={16} />
              <span>Thank you for your feedback! 🎉</span>
            </div>
          ) : (
            <div style={{ marginTop: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                type="button"
                onClick={() => setFeedbackGiven(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 18px",
                  borderRadius: "12px",
                  border: "1px solid #d4d4d8",
                  background: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#09090b",
                  cursor: "pointer",
                }}
              >
                <ThumbsUp size={14} />
                <span>Yes</span>
              </button>
              <button
                type="button"
                onClick={() => setFeedbackGiven(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 18px",
                  borderRadius: "12px",
                  border: "1px solid #d4d4d8",
                  background: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#09090b",
                  cursor: "pointer",
                }}
              >
                <ThumbsDown size={14} />
                <span>No</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isFullscreenModal && selectedImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(0, 0, 0, 0.96)",
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px",
            }}
            onClick={() => setIsFullscreenModal(false)}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "1240px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#ffffff",
                paddingBottom: "12px",
                zIndex: 101,
              }}
            >
              <button
                onClick={() => setIsFullscreenModal(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#27272a",
                  border: "1px solid #3f3f46",
                  color: "#ffffff",
                  padding: "7px 16px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <button
                onClick={() => setIsFullscreenModal(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#27272a",
                  border: "1.5px solid #52525b",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div
              style={{
                position: "relative",
                flex: 1,
                width: "100%",
                maxWidth: "1240px",
                margin: "8px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                borderRadius: "18px",
                border: "1.5px solid #27272a",
                background: "#09090b",
                padding: "8px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImageModal}
                alt="Credential Screenshot Preview"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
