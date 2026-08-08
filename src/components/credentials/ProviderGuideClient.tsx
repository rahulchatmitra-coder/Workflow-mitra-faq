import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Play,
  CheckCircle2,
  Building2,
  Bot,
  MessageSquare,
  ShoppingCart,
  Send,
  Calendar,
  CreditCard,
  Package,
  ThumbsUp,
  ThumbsDown,
  Maximize2,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTextColor } from "@/context/TextColorContext";
import { CredentialProvider, PROVIDER_LIST } from "@/data/credentials-data";
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
};

interface ProviderGuideClientProps {
  provider: CredentialProvider;
}

export default function ProviderGuideClient({ provider }: ProviderGuideClientProps) {
  const { currentColor } = useTextColor();
  const navigate = useNavigate();

  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0);
  const [feedbackGiven, setFeedbackGiven] = React.useState<boolean>(false);
  const [isFullscreenModal, setIsFullscreenModal] = React.useState<boolean>(false);
  const [selectedImageModal, setSelectedImageModal] = React.useState<string>("");

  React.useEffect(() => {
    setCurrentStepIndex(0);
  }, [provider.id]);

  const steps = provider.steps;

  const handleNextStep = () => {
    setCurrentStepIndex((prev) => (prev + 1) % steps.length);
  };

  const handlePrevStep = () => {
    setCurrentStepIndex((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const ProviderIcon = ICON_MAP[provider.iconName] || Building2;

  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-200 text-zinc-900 dark:text-zinc-100 pb-20">
      {/* BACK NAVIGATION BAR */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 sticky top-0 z-30 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            to="/credentials"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Credentials</span>
          </Link>

          <a
            href={provider.appUrl}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-extrabold text-white shadow-sm transition-all ${currentColor.bgClass}`}
          >
            <span>Open {provider.name}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="mx-auto max-w-5xl px-4 pt-6 pb-8 sm:px-6 lg:px-8 space-y-8">
        {/* QUICK SWITCH TABS */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Select Service Provider:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {PROVIDER_LIST.map((p) => {
              const IconComp = ICON_MAP[p.iconName] || Building2;
              const isActive = p.id === provider.id;
              return (
                <button
                  key={p.id}
                  onClick={() => navigate(`/credentials/${p.id}`)}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-bold shrink-0 transition-all cursor-pointer border ${
                    isActive
                      ? `${currentColor.bgClass} text-white shadow-md border-transparent`
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:border-zinc-800"
                  }`}
                >
                  <IconComp className="h-3.5 w-3.5" />
                  <span>{p.name}</span>
                  {p.popular && (
                    <span className="text-[9px] bg-white/20 px-1.5 py-0.2 rounded-full font-extrabold">
                      Popular
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-zinc-100 px-3 py-0.5 text-xs font-bold text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
                <ProviderIcon className={`h-3.5 w-3.5 ${currentColor.textClass}`} />
                {provider.badge}
              </span>
              <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500">
                • {provider.category}
              </span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
              How to Create &amp; Connect {provider.name} Credentials
            </h1>
            <p className="mt-1 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {provider.description}
            </p>
          </div>

          <button
            onClick={() => setCurrentStepIndex(0)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-extrabold shadow-lg transition-all cursor-pointer border border-zinc-800 dark:border-zinc-200 shrink-0 ${currentColor.bgClass}`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Start Guide</span>
            <Play className="h-3 w-3 fill-current ml-0.5" />
          </button>
        </div>

        {/* REUSABLE INTERACTIVE PLAYER */}
        <InteractivePlayer
          steps={steps}
          currentStepIndex={currentStepIndex}
          onStepChange={(idx) => setCurrentStepIndex(idx)}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          defaultAddressUrl={provider.appUrl}
          externalAppUrl={provider.appUrl}
          providerName={provider.name}
        />

        {/* POINT-BY-POINT INSTRUCTION CARDS */}
        <section className="space-y-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Detailed Step-by-Step Instructions ({provider.name})
            </h2>
            <p className="mt-1 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Follow these exact steps to connect {provider.name} with Workflow Mitra.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="group rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-all hover:shadow-lg"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-center">
                  <div
                    className="lg:col-span-7 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-md cursor-pointer relative group/img"
                    onClick={() => {
                      setSelectedImageModal(s.image);
                      setIsFullscreenModal(true);
                    }}
                  >
                    <div className="relative aspect-[16/9] max-h-[380px] w-full">
                      <img
                        src={s.image}
                        alt={`Step ${idx + 1}: ${s.title}`}
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-300 group-hover/img:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="flex items-center gap-1.5 rounded-full bg-zinc-900/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-white border border-zinc-700 shadow-lg">
                          <Maximize2 className="h-3.5 w-3.5" /> Click to Expand
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-3.5">
                    <div className="flex items-center gap-3">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-xl font-black text-sm shadow-md shrink-0 ${currentColor.bgClass}`}>
                        {idx + 1}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white leading-tight">
                        Step {idx + 1}. {s.title}
                      </h3>
                    </div>

                    <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800/80 space-y-3">
                      <div className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                        {s.description}
                      </div>

                      <div className="pt-2 flex items-center gap-2">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 ${currentColor.textClass}`} />
                        <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                          {s.hotspot.detail}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEEDBACK WIDGET */}
        <section className="pt-4">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-950 shadow-sm">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
              Was this {provider.name} Guide helpful?
            </h4>

            {feedbackGiven ? (
              <div className="mt-3 flex items-center gap-2 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                <Sparkles className="h-4 w-4" />
                <span>Thank you for your feedback! 🎉</span>
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => setFeedbackGiven(true)}
                  className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-bold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Yes</span>
                </button>
                <button
                  onClick={() => setFeedbackGiven(true)}
                  className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-bold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>No</span>
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL FOR BOTTOM STEP CARDS */}
      <AnimatePresence>
        {isFullscreenModal && selectedImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 p-4 sm:p-6 backdrop-blur-xl"
            onClick={() => setIsFullscreenModal(false)}
          >
            {/* MODAL HEADER */}
            <div className="w-full max-w-7xl flex items-center justify-between z-50 text-white pb-2">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${currentColor.bgClass}`} />
                <span className="text-sm sm:text-base font-black text-white">
                  {provider.name} Screenshot Preview
                </span>
              </div>

              <button
                onClick={() => setIsFullscreenModal(false)}
                className="rounded-full bg-zinc-800/90 p-2 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer border border-zinc-700 shadow-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* FULLSCREEN IMAGE */}
            <div className="relative flex-1 w-full max-w-7xl my-2 flex items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-2">
              <img
                src={selectedImageModal}
                alt={`${provider.name} Step Screenshot`}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

