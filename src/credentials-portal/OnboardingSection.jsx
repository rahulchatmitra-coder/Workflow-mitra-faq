import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  KeyRound,
  UserPlus,
  Zap,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  BookOpen,
} from 'lucide-react'
import { PROVIDER_LIST } from './credentials-data'

export default function OnboardingSection() {
  const providerCount = PROVIDER_LIST?.length || 37

  return (
    <section className="wm-faq-portal py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-100 bg-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-zinc-100 text-zinc-900 border border-zinc-200">
            <Sparkles className="h-3.5 w-3.5 text-zinc-900" />
            Documentation Hub
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
            Learn Workflow Mitra in Minutes
          </h2>
          <p className="text-sm text-zinc-600 font-medium">
            Explore our interactive visual guides to create your account, connect API credentials, and automate workflows.
          </p>
        </div>

        {/* 3-COLUMN DOCUMENTATION CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* BOX 1: ACCOUNT SETUP & REGISTRATION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border-2 border-zinc-200 bg-white p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-zinc-900 text-white">
              5 Steps Guide
            </div>
            <div>
              <div className="flex items-start gap-3.5 pb-4 border-b border-zinc-100">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200">
                  <UserPlus className="h-6 w-6 text-zinc-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">
                    Account Registration
                  </h3>
                  <p className="text-xs font-semibold text-zinc-500 mt-0.5">
                    Step-by-step Setup
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider mt-4">
                Getting Started
              </p>

              <div className="mt-3 space-y-1.5">
                <Link
                  to="/how-to-create-account-workflowmitra"
                  className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors group"
                >
                  <span className="leading-snug">How to create an account in Workflow Mitra?</span>
                  <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/how-to-create-account-workflowmitra"
                  className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors group"
                >
                  <span className="leading-snug">Email verification & Workspace setup</span>
                  <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/how-to-create-account-workflowmitra"
                  className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors group"
                >
                  <span className="leading-snug">Access your automation dashboard</span>
                  <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <Link
              to="/how-to-create-account-workflowmitra"
              className="mt-6 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider hover:underline pt-4 border-t border-zinc-100 text-zinc-900"
            >
              <span>Start Account Setup Guide</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* BOX 2: 37+ CREDENTIALS & INTEGRATIONS BOX */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border-2 border-zinc-200 bg-white p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top-Right Badge */}
            <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-zinc-900 text-white">
              {providerCount}+ Providers
            </div>
            <div>
              {/* Header Icon + Title */}
              <div className="flex items-start gap-3.5 pb-4 border-b border-zinc-100">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200">
                  <KeyRound className="h-6 w-6 text-zinc-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">
                    Integrations &amp; Credentials
                  </h3>
                  <p className="text-xs font-semibold text-zinc-500 mt-0.5">
                    Secure API Key Vault
                  </p>
                </div>
              </div>

              {/* Sub-label: 37+ Connected Services */}
              <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider mt-4">
                {providerCount}+ Connected Services
              </p>

              {/* Links List */}
              <div className="mt-3 space-y-1.5">
                {/* Link 1 */}
                <Link
                  to="/credentials"
                  className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors group"
                >
                  <span className="leading-snug">How to connect &amp; manage API credentials?</span>
                  <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                {/* Link 2 */}
                <Link
                  to="/credentials/whatsapp"
                  className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors group"
                >
                  <span className="leading-snug">WhatsApp (Meta, ChatMitra, AiSensy, WATI)</span>
                  <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                {/* Link 3 */}
                <Link
                  to="/credentials"
                  className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors group"
                >
                  <span className="leading-snug">OpenAI, Claude, HubSpot, Shopify &amp; Zoom</span>
                  <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Bottom Action Link */}
            <Link
              to="/credentials"
              className="mt-6 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider hover:underline pt-4 border-t border-zinc-100 text-zinc-900"
            >
              <span>Explore {providerCount}+ Integrations Guide</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* BOX 3: WORKFLOW AUTOMATION & HELP CENTER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl border-2 border-zinc-200 bg-white p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-zinc-900 text-white">
              Instant Help
            </div>
            <div>
              <div className="flex items-start gap-3.5 pb-4 border-b border-zinc-100">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200">
                  <Zap className="h-6 w-6 text-zinc-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">
                    Workflow Mitra Support
                  </h3>
                  <p className="text-xs font-semibold text-zinc-500 mt-0.5">
                    Automation &amp; AI Assistance
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider mt-4">
                Resources &amp; Support
              </p>

              <div className="mt-3 space-y-1.5">
                <Link
                  to="/templates"
                  className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors group"
                >
                  <span className="leading-snug">Browse 100+ pre-built workflow templates</span>
                  <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/solutions"
                  className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors group"
                >
                  <span className="leading-snug">Solutions for Sales, Marketing &amp; Support</span>
                  <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors group"
                >
                  <span className="leading-snug">Need custom workflow setup? Talk to an expert</span>
                  <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <Link
              to="/templates"
              className="mt-6 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider hover:underline pt-4 border-t border-zinc-100 text-zinc-900"
            >
              <span>Explore All Templates</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
