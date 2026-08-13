"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  RotateCw,
  Plus,
  Minus,
  Maximize2,
  Save,
  UserCheck,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Rss,
  Clock,
} from "lucide-react";

import {
  FacebookLogo,
  Shopify as ShopifyLogo,
  HubSpotLogo,
  Slack as SlackLogo,
  Linkedin as LinkedInLogo,
  GeminiLogo,
  Telegram,
  Discord,
  WhatsappIcon,
  ZohoBooksLogo,
  ZohoLogo,
  ShiprocketLogo,
  Google,
  GmailLogo,
} from "@/components/ui/svgs";

export function WorkflowCanvas() {
  const [activeFlowIndex, setActiveFlowIndex] = React.useState<number>(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState<number | null>(null);
  const [executionMessage, setExecutionMessage] = React.useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = React.useState<number>(1);

  const workflows = [
    {
      id: "flow-1",
      title: "Facebook lead → HubSpot CRM → Slack & Gmail Alert",
      category: "Lead Routing Automation",
      totalSteps: 7,
    },
    {
      id: "flow-2",
      title: "Shopify order → Zoho Books invoice → WhatsApp & Shiprocket",
      category: "E-Commerce Fulfillment Automation",
      totalSteps: 6,
    },
    {
      id: "flow-3",
      title: "New blog post → Google Gemini AI rewrite → LinkedIn, Facebook, Telegram & Discord",
      category: "AI Agents & Social Distribution",
      totalSteps: 8,
    },
  ];

  const handleNextFlow = () => {
    setActiveFlowIndex((prev) => (prev + 1) % workflows.length);
    setActiveStep(null);
    setExecutionMessage(null);
  };

  const handlePrevFlow = () => {
    setActiveFlowIndex((prev) => (prev - 1 + workflows.length) % workflows.length);
    setActiveStep(null);
    setExecutionMessage(null);
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.6));
  const handleResetZoom = () => setZoomLevel(1);

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(1);

    if (activeFlowIndex === 0) {
      setExecutionMessage("Step 1: Receiving Facebook Lead Ads Webhook...");
      setTimeout(() => { setActiveStep(2); setExecutionMessage("Step 2: Evaluating IF Condition (Has email)..."); }, 900);
      setTimeout(() => { setActiveStep(3); setExecutionMessage("Step 3: Creating HubSpot CRM Contact..."); }, 1800);
      setTimeout(() => { setActiveStep(4); setExecutionMessage("Step 4: Assigning Sales Representative..."); }, 2700);
      setTimeout(() => { setActiveStep(5); setExecutionMessage("Step 5-7: Fanning out to Gmail, Slack & Google Sheets!"); }, 3600);
      setTimeout(() => { setActiveStep(null); setIsRunning(false); setExecutionMessage("✓ Run finished successfully in 1.4s!"); }, 4600);
    } else if (activeFlowIndex === 1) {
      setExecutionMessage("Step 1: Capturing Shopify New Order Webhook...");
      setTimeout(() => { setActiveStep(2); setExecutionMessage("Step 2: Checking IF Order is Paid..."); }, 900);
      setTimeout(() => { setActiveStep(3); setExecutionMessage("Step 3: Generating Zoho Books Invoice..."); }, 1800);
      setTimeout(() => { setActiveStep(4); setExecutionMessage("Step 4: Sending WhatsApp Confirmation Message..."); }, 2700);
      setTimeout(() => { setActiveStep(5); setExecutionMessage("Step 5-6: Triggering Shiprocket & Logging to Google Sheets!"); }, 3600);
      setTimeout(() => { setActiveStep(null); setIsRunning(false); setExecutionMessage("✓ Run finished successfully in 1.2s!"); }, 4600);
    } else {
      setExecutionMessage("Step 1: RSS Trigger: New Blog Post Published...");
      setTimeout(() => { setActiveStep(2); setExecutionMessage("Step 2: Google Gemini AI Agent Rewriting Content..."); }, 900);
      setTimeout(() => { setActiveStep(3); setExecutionMessage("Step 3: Awaiting Human Manager Approval..."); }, 1800);
      setTimeout(() => { setActiveStep(4); setExecutionMessage("Step 4: Evaluating IF Manager Approved..."); }, 2700);
      setTimeout(() => { setActiveStep(5); setExecutionMessage("Step 5-8: Publishing to LinkedIn, Facebook, Telegram & Discord!"); }, 3600);
      setTimeout(() => { setActiveStep(null); setIsRunning(false); setExecutionMessage("✓ Run finished successfully in 1.8s!"); }, 4600);
    }
  };

  return (
    <div
      id="tour-canvas"
      className="relative w-full rounded-3xl border border-zinc-200 bg-slate-50/70 dark:border-zinc-800 dark:bg-[#07090E] shadow-2xl overflow-hidden transition-colors duration-200"
    >
      {/* TOP HEADER WITH WORKFLOW SLIDER TITLE & NAVIGATION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950 z-20 relative gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-black text-sm shadow-md shrink-0 border border-zinc-800 dark:border-zinc-200 select-none">
            WM
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                {workflows[activeFlowIndex].category} ({activeFlowIndex + 1}/3)
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {workflows[activeFlowIndex].title}
            </h3>
          </div>
        </div>

        {/* WORKFLOW SLIDER CONTROLS (PREV / NEXT) */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {executionMessage && (
            <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 animate-spin" />
              <span>{executionMessage}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 border border-zinc-200 bg-zinc-50 p-1 rounded-2xl dark:border-zinc-800 dark:bg-zinc-900">
            <button
              onClick={handlePrevFlow}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 rounded-xl cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              title="Previous Workflow"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Prev</span>
            </button>
            <span className="text-xs font-mono font-bold px-1 text-zinc-500 dark:text-zinc-400">
              {activeFlowIndex + 1}/{workflows.length}
            </span>
            <button
              onClick={handleNextFlow}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
              title="Next Workflow"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* DOTTED CANVAS GRID AREA WITH SEPARATE ZOOM CONTAINER */}
      <div className="relative min-h-[520px] w-full overflow-hidden flex items-center justify-center bg-[radial-gradient(#cbd5e1_1.2px,transparent_1.2px)] dark:bg-[radial-gradient(#1e293b_1.2px,transparent_1.2px)] [background-size:24px_24px]">
        
        {/* OUTER ZOOM CONTAINER */}
        <div
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
          className="relative w-[1000px] h-[380px] transition-transform duration-300 ease-out shrink-0 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFlowIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full h-full"
            >

              {/* FLOW 1: Facebook Lead -> CRM -> Team Alert */}
              {activeFlowIndex === 0 && (
                <>
                  <svg className="absolute inset-0 h-full w-full pointer-events-none z-0">
                    <defs>
                      <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1877F2" />
                      </marker>
                      <marker id="arrow-orange" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#FF6B00" />
                      </marker>
                      <marker id="arrow-dark" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#71717A" />
                      </marker>
                      <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#EA4335" />
                      </marker>
                      <marker id="arrow-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#4A154B" />
                      </marker>
                      <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#34A853" />
                      </marker>
                    </defs>

                    <line x1="135" y1="180" x2="222" y2="180" stroke="#1877F2" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-blue)" />
                    <line x1="295" y1="180" x2="382" y2="180" stroke="#FF6B00" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-orange)" />
                    <line x1="455" y1="180" x2="542" y2="180" stroke="#FF6B00" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-dark)" />

                    <path d="M 615 180 C 700 180, 720 60, 788 60" fill="none" stroke="#EA4335" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-red)" />
                    <line x1="615" y1="180" x2="788" y2="180" stroke="#4A154B" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-purple)" />
                    <path d="M 615 180 C 700 180, 720 300, 788 300" fill="none" stroke="#34A853" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-green)" />
                  </svg>

                  {/* Node 1: Facebook Leads */}
                  <div id="tour-node-facebook" style={{ left: "68px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 1 ? "scale-110 ring-4 ring-blue-500 rounded-3xl" : ""}`}>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-xl hover:scale-105 transition-transform cursor-pointer p-3">
                      <FacebookLogo className="h-full w-full" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900 dark:border-zinc-900">1</span>
                    </div>
                    <div className="text-center w-28"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">On webhook call</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">from Lead Ads</span></div>
                  </div>

                  {/* Node 2: IF Condition */}
                  <div id="tour-node-if" style={{ left: "228px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 2 ? "scale-110 ring-4 ring-amber-500 rounded-3xl" : ""}`}>
                    <div className="absolute -top-7 text-[10px] font-mono font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-2.5 py-0.5 rounded-full text-zinc-700 dark:text-zinc-300 shadow-sm whitespace-nowrap">1st Has an email</div>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#FF6B00] text-white shadow-xl hover:scale-105 transition-transform cursor-pointer">
                      <span className="text-lg font-black tracking-tight">IF</span>
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900 dark:border-zinc-900">2</span>
                    </div>
                    <div className="text-center w-28"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">IF</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">1 route - first match</span></div>
                  </div>

                  {/* Node 3: HubSpot CRM */}
                  <div id="tour-node-hubspot" style={{ left: "388px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 3 ? "scale-110 ring-4 ring-orange-500 rounded-3xl" : ""}`}>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl hover:scale-105 transition-transform cursor-pointer p-3.5">
                      <HubSpotLogo className="h-full w-full" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900 dark:border-zinc-900">3</span>
                    </div>
                    <div className="text-center w-32"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">HubSpot CRM</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">POST /crm/v3/contacts</span></div>
                  </div>

                  {/* Node 4: Assign Sales Rep */}
                  <div id="tour-node-assign" style={{ left: "548px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 4 ? "scale-110 ring-4 ring-zinc-900 rounded-3xl" : ""}`}>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xl hover:scale-105 transition-transform cursor-pointer">
                      <UserCheck className="h-7 w-7" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900 dark:border-zinc-900">4</span>
                    </div>
                    <div className="text-center w-36"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">Assign to next person</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Round Robin Queue</span></div>
                  </div>

                  {/* Node 5: Gmail Alert */}
                  <div style={{ left: "792px", top: "32px" }} className={`absolute flex items-center gap-3 z-10 transition-all ${activeStep === 5 ? "scale-105" : ""}`}>
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg cursor-pointer p-3.5">
                      <GmailLogo className="h-full w-full" />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white border border-white dark:bg-white dark:text-zinc-900">5</span>
                    </div>
                    <div className="flex flex-col"><span className="text-xs font-extrabold text-zinc-900 dark:text-white">Gmail Alert</span><span className="text-[10px] text-zinc-500 dark:text-zinc-400">send &#123;&#123; lead_email &#125;&#125;</span></div>
                  </div>

                  {/* Node 6: Slack */}
                  <div style={{ left: "792px", top: "152px" }} className={`absolute flex items-center gap-3 z-10 transition-all ${activeStep === 5 ? "scale-105" : ""}`}>
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg cursor-pointer p-3.5">
                      <SlackLogo className="h-full w-full" />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white border border-white dark:bg-white dark:text-zinc-900">6</span>
                    </div>
                    <div className="flex flex-col"><span className="text-xs font-extrabold text-zinc-900 dark:text-white">Slack Channel</span><span className="text-[10px] text-zinc-500 dark:text-zinc-400">post to #sales-leads</span></div>
                  </div>

                  {/* Node 7: Google Sheets */}
                  <div style={{ left: "792px", top: "272px" }} className={`absolute flex items-center gap-3 z-10 transition-all ${activeStep === 5 ? "scale-105" : ""}`}>
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg cursor-pointer p-3.5">
                      <Google className="h-full w-full" />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white border border-white dark:bg-white dark:text-zinc-900">7</span>
                    </div>
                    <div className="flex flex-col"><span className="text-xs font-extrabold text-zinc-900 dark:text-white">Google Sheets</span><span className="text-[10px] text-zinc-500 dark:text-zinc-400">append Lead row</span></div>
                  </div>
                </>
              )}

              {/* FLOW 2: Shopify order -> invoice -> WhatsApp + shipping */}
              {activeFlowIndex === 1 && (
                <>
                  <svg className="absolute inset-0 h-full w-full pointer-events-none z-0">
                    <line x1="135" y1="180" x2="222" y2="180" stroke="#95BF47" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-green)" />
                    <line x1="295" y1="180" x2="382" y2="180" stroke="#FF6B00" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-orange)" />
                    <line x1="455" y1="180" x2="542" y2="180" stroke="#EA4335" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-red)" />
                    <line x1="615" y1="180" x2="702" y2="180" stroke="#25D366" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-green)" />
                    <path d="M 735 180 C 780 180, 780 290, 788 290" fill="none" stroke="#18181B" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-dark)" />
                  </svg>

                  {/* Node 1: Shopify */}
                  <div style={{ left: "68px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 1 ? "scale-110 ring-4 ring-emerald-500 rounded-3xl" : ""}`}>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl hover:scale-105 transition-transform cursor-pointer p-3.5">
                      <ShopifyLogo className="h-full w-full" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900">1</span>
                    </div>
                    <div className="text-center w-28"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">On webhook call</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">from Shopify Orders</span></div>
                  </div>

                  {/* Node 2: IF Paid */}
                  <div style={{ left: "228px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 2 ? "scale-110 ring-4 ring-amber-500 rounded-3xl" : ""}`}>
                    <div className="absolute -top-7 text-[10px] font-mono font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-2.5 py-0.5 rounded-full text-zinc-700 dark:text-zinc-300 shadow-sm whitespace-nowrap">1st Paid</div>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#FF6B00] text-white shadow-xl hover:scale-105 transition-transform cursor-pointer">
                      <span className="text-lg font-black tracking-tight">IF</span>
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900">2</span>
                    </div>
                    <div className="text-center w-28"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">IF</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">1 route - first match</span></div>
                  </div>

                  {/* Node 3: Zoho Books */}
                  <div style={{ left: "388px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 3 ? "scale-110 ring-4 ring-rose-500 rounded-3xl" : ""}`}>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl hover:scale-105 transition-transform cursor-pointer p-3.5">
                      <ZohoLogo className="h-full w-full" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900">3</span>
                    </div>
                    <div className="text-center w-32"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">Zoho Books</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">POST /books/invoices</span></div>
                  </div>

                  {/* Node 4: WhatsApp */}
                  <div style={{ left: "548px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 4 ? "scale-110 ring-4 ring-emerald-500 rounded-3xl" : ""}`}>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl hover:scale-105 transition-transform cursor-pointer p-2.5">
                      <WhatsappIcon className="h-full w-full" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900">4</span>
                    </div>
                    <div className="text-center w-28"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">WhatsApp</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Send Cloud Order PDF</span></div>
                  </div>

                  {/* Node 5: Shiprocket */}
                  <div style={{ left: "708px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 5 ? "scale-110 ring-4 ring-purple-500 rounded-3xl" : ""}`}>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl hover:scale-105 transition-transform cursor-pointer p-3">
                      <ShiprocketLogo className="h-full w-full" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900">5</span>
                    </div>
                    <div className="text-center w-36"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">Shiprocket API</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">POST /v1/orders/create</span></div>
                  </div>

                  {/* Node 6: Google Sheets (below) */}
                  <div style={{ left: "792px", top: "262px" }} className={`absolute flex items-center gap-3 z-10 transition-all ${activeStep === 5 ? "scale-105" : ""}`}>
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg cursor-pointer p-3.5">
                      <Google className="h-full w-full" />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white border border-white dark:bg-white dark:text-zinc-900">6</span>
                    </div>
                    <div className="flex flex-col"><span className="text-xs font-extrabold text-zinc-900 dark:text-white">Google Sheets</span><span className="text-[10px] text-zinc-500 dark:text-zinc-400">Log Order Row</span></div>
                  </div>
                </>
              )}

              {/* FLOW 3: New blog post -> Google Gemini AI rewrite -> Social Channels */}
              {activeFlowIndex === 2 && (
                <>
                  <svg className="absolute inset-0 h-full w-full pointer-events-none z-0">
                    <line x1="135" y1="180" x2="222" y2="180" stroke="#18181B" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-dark)" />
                    <line x1="295" y1="180" x2="382" y2="180" stroke="#18181B" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-dark)" />
                    <line x1="455" y1="180" x2="542" y2="180" stroke="#FF6B00" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-orange)" />

                    <path d="M 615 180 C 700 180, 720 40, 788 40" fill="none" stroke="#0A66C2" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-blue)" />
                    <path d="M 615 180 C 700 180, 720 130, 788 130" fill="none" stroke="#1877F2" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-blue)" />
                    <path d="M 615 180 C 700 180, 720 220, 788 220" fill="none" stroke="#24A1DE" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-blue)" />
                    <path d="M 615 180 C 700 180, 720 310, 788 310" fill="none" stroke="#5865F2" strokeWidth="2.5" strokeDasharray="6 4" className="animate-[dash_2s_linear_infinite]" markerEnd="url(#arrow-purple)" />
                  </svg>

                  {/* Node 1: RSS Blog Trigger */}
                  <div style={{ left: "68px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 1 ? "scale-110 ring-4 ring-zinc-900 rounded-3xl" : ""}`}>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xl hover:scale-105 transition-transform cursor-pointer">
                      <Rss className="h-7 w-7 text-amber-400" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900">1</span>
                    </div>
                    <div className="text-center w-32"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">When a blog posts</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">RSS / WordPress Trigger</span></div>
                  </div>

                  {/* Node 2: Google Gemini Official 2025 AI Rewrite Node */}
                  <div style={{ left: "228px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 2 ? "scale-110 ring-4 ring-blue-500 rounded-3xl" : ""}`}>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#090D16] border-2 border-blue-500/40 shadow-[0_0_18px_rgba(49,134,255,0.35)] hover:scale-105 transition-transform cursor-pointer p-3">
                      <GeminiLogo className="h-full w-full" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900">2</span>
                    </div>
                    <div className="text-center w-28"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">Google Gemini AI</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Gemini 2.0 Content Rewrite</span></div>
                  </div>

                  {/* Node 3: Wait for Approval */}
                  <div style={{ left: "388px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 3 ? "scale-110 ring-4 ring-amber-500 rounded-3xl" : ""}`}>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#FF6B00] text-white shadow-xl hover:scale-105 transition-transform cursor-pointer">
                      <Clock className="h-7 w-7" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900">3</span>
                    </div>
                    <div className="text-center w-32"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">Wait for approval</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Editor Review Queue</span></div>
                  </div>

                  {/* Node 4: IF Approved */}
                  <div style={{ left: "548px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 4 ? "scale-110 ring-4 ring-amber-500 rounded-3xl" : ""}`}>
                    <div className="absolute -top-7 text-[10px] font-mono font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-2.5 py-0.5 rounded-full text-zinc-700 dark:text-zinc-300 shadow-sm whitespace-nowrap">1st Approved</div>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#FF6B00] text-white shadow-xl hover:scale-105 transition-transform cursor-pointer">
                      <span className="text-lg font-black tracking-tight">IF</span>
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900">4</span>
                    </div>
                    <div className="text-center w-28"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">IF</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">1 route - first match</span></div>
                  </div>

                  {/* Node 5: LinkedIn */}
                  <div style={{ left: "792px", top: "12px" }} className={`absolute flex items-center gap-3 z-10 transition-all ${activeStep === 5 ? "scale-105" : ""}`}>
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg cursor-pointer p-2">
                      <LinkedInLogo className="h-full w-full" />
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[9px] font-bold text-white border border-white dark:bg-white dark:text-zinc-900">5</span>
                    </div>
                    <div className="flex flex-col"><span className="text-xs font-extrabold text-zinc-900 dark:text-white">LinkedIn</span><span className="text-[9px] text-zinc-500 dark:text-zinc-400">POST /v2/ugcPosts</span></div>
                  </div>

                  {/* Node 6: Facebook */}
                  <div style={{ left: "792px", top: "102px" }} className={`absolute flex items-center gap-3 z-10 transition-all ${activeStep === 5 ? "scale-105" : ""}`}>
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg cursor-pointer p-2">
                      <FacebookLogo className="h-full w-full" />
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[9px] font-bold text-white border border-white dark:bg-white dark:text-zinc-900">6</span>
                    </div>
                    <div className="flex flex-col"><span className="text-xs font-extrabold text-zinc-900 dark:text-white">Facebook</span><span className="text-[9px] text-zinc-500 dark:text-zinc-400">POST /v21/feed</span></div>
                  </div>

                  {/* Node 7: Telegram Real SVG */}
                  <div style={{ left: "792px", top: "192px" }} className={`absolute flex items-center gap-3 z-10 transition-all ${activeStep === 5 ? "scale-105" : ""}`}>
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg cursor-pointer p-1.5">
                      <Telegram className="h-full w-full" />
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[9px] font-bold text-white border border-white dark:bg-white dark:text-zinc-900">7</span>
                    </div>
                    <div className="flex flex-col"><span className="text-xs font-extrabold text-zinc-900 dark:text-white">Telegram Channel</span><span className="text-[9px] text-zinc-500 dark:text-zinc-400">sendMessage broadcast</span></div>
                  </div>

                  {/* Node 8: Discord Real SVG */}
                  <div style={{ left: "792px", top: "282px" }} className={`absolute flex items-center gap-3 z-10 transition-all ${activeStep === 5 ? "scale-105" : ""}`}>
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg cursor-pointer p-2">
                      <Discord className="h-full w-full" />
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[9px] font-bold text-white border border-white dark:bg-white dark:text-zinc-900">8</span>
                    </div>
                    <div className="flex flex-col"><span className="text-xs font-extrabold text-zinc-900 dark:text-white">Discord Community</span><span className="text-[9px] text-zinc-500 dark:text-zinc-400">post to #announcements</span></div>
                  </div>
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM FLOATING TOOLBAR */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-4 py-2 shadow-2xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90">
          <button
            id="tour-run-btn"
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2 text-xs font-extrabold text-white shadow-md hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition-all cursor-pointer disabled:opacity-50"
          >
            <Play className={`h-3.5 w-3.5 fill-current ${isRunning ? "animate-pulse" : ""}`} />
            <span>{isRunning ? "Running..." : "Run Flow"}</span>
          </button>

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 my-auto" />

          <button className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors" title="Undo">
            <RotateCcw className="h-4 w-4" />
          </button>
          <button className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors" title="Redo">
            <RotateCw className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 my-auto" />

          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 px-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Saved</span>
          </div>

          <button className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-bold text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white transition-all">
            <Save className="h-3.5 w-3.5" />
            <span>Save</span>
          </button>
        </div>

        {/* BOTTOM LEFT REAL INTERACTIVE ZOOM CONTROLS WITH ZOOM PERCENTAGE BADGE */}
        <div className="absolute bottom-4 left-4 z-30 flex items-center gap-1 rounded-xl border border-zinc-200 bg-white/90 p-1 shadow-lg backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300">
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            title="Zoom In (+)"
          >
            <Plus className="h-4 w-4" />
          </button>
          <span className="text-[10px] font-mono font-bold px-1 text-zinc-500 dark:text-zinc-400 min-w-[36px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            title="Zoom Out (-)"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            title="Reset Zoom (100%)"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>

        {/* BOTTOM RIGHT MINIMAP OVERLAY */}
        <div className="absolute bottom-4 right-4 z-30 hidden sm:flex h-20 w-32 items-center justify-center rounded-xl border border-zinc-200 bg-white/90 p-2 shadow-lg backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90">
          <div className="grid grid-cols-4 gap-1.5">
            <div className="h-2 w-2 rounded-sm bg-blue-500" />
            <div className="h-2 w-2 rounded-sm bg-orange-500" />
            <div className="h-2 w-2 rounded-sm bg-orange-500" />
            <div className="h-2 w-2 rounded-sm bg-zinc-900 dark:bg-white" />
            <div className="h-2 w-2 rounded-sm bg-red-500" />
            <div className="h-2 w-2 rounded-sm bg-purple-500" />
            <div className="h-2 w-2 rounded-sm bg-emerald-500" />
          </div>
        </div>

      </div>
    </div>
  );
}
