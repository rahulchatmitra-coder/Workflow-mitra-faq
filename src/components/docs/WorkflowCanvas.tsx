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
  Mail,
  FileSpreadsheet,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Truck,
  Rss,
  Bot,
  Clock,
  Send,
  Layers,
} from "lucide-react";

// Brand SVG Icons
function FacebookLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function ShopifyLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
      <path d="M15.337 2.378c-.287 0-.577.086-.807.258a1.218 1.218 0 0 0-.448.667l-.234 1.13c-.302-.047-.63-.075-.98-.075-2.096 0-3.528.895-4.225 2.641l-.738-.456c-.347-.216-.8-.124-1.041.21L4.85 9.87c-.242.334-.176.8.148 1.054l.794.622c-.443.916-.763 2.062-.843 3.32L3.1 14.53c-.352.02-.63.308-.63.66l.044.593C2.868 20.354 6.84 24 11.848 24c5.184 0 9.405-3.92 9.664-8.835l.088-1.67a.64.64 0 0 0-.585-.675l-1.846-.14c.032-.516.036-1.04-.002-1.572 0-2.483-1.688-4.236-3.83-4.236-.37 0-.726.052-1.062.15l.394-1.927c.07-.33-.122-.656-.442-.746zm-2.012 4.417c.22-.058.455-.088.704-.088.948 0 1.62.778 1.62 1.94 0 .398-.066.837-.184 1.294l-2.14-1.32.001-.002a2.02 2.02 0 0 1 0-.005l.001-.004c.002-.007.006-.018.012-.033.013-.031.034-.078.067-.138.067-.123.172-.275.333-.42.316-.285.83-.585 1.586-.585z" />
    </svg>
  );
}

function HubSpotLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M18.8 10.325V6.666a2.6 2.6 0 1 0-2.001 0v3.659a4.832 4.832 0 0 0-2.8 1.94l-5.698-3.799a2.535 2.535 0 0 0 .199-.974A2.592 2.592 0 1 0 5.9 10.084l5.449 3.633a4.782 4.782 0 0 0-.25 1.523 4.833 4.833 0 1 0 7.701-4.915zm-2.001-6.259a1.001 1.001 0 1 1 0 2 1.001 1.001 0 0 1 0-2zm-10.899 5.5a1.001 1.001 0 1 1 0-2 1.001 1.001 0 0 1 0 2zm9.9 8.274a2.833 2.833 0 1 1 0-5.666 2.833 2.833 0 0 1 0 5.666z" />
    </svg>
  );
}

function SlackLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
    </svg>
  );
}

function LinkedInLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function WorkflowCanvas() {
  const [activeFlowIndex, setActiveFlowIndex] = React.useState<number>(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState<number | null>(null);
  const [executionMessage, setExecutionMessage] = React.useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = React.useState<number>(1);

  const workflows = [
    {
      id: "flow-1",
      title: "Facebook lead → CRM → team alert",
      category: "Lead Routing Automation",
      totalSteps: 7,
    },
    {
      id: "flow-2",
      title: "Shopify order → invoice → WhatsApp + shipping",
      category: "E-Commerce Fulfillment Automation",
      totalSteps: 6,
    },
    {
      id: "flow-3",
      title: "New blog post → AI rewrite → social",
      category: "AI Content & Social Distribution",
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
      setTimeout(() => { setActiveStep(2); setExecutionMessage("Step 2: Anthropic AI Agent Rewriting Content..."); }, 900);
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
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 rounded-xl cursor-pointer"
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
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-xl cursor-pointer"
              title="Next Workflow"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* DOTTED CANVAS GRID AREA WITH SEPARATE ZOOM CONTAINER AND ANIMATE PRESENCE SLIDE TRANSITION */}
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

                  {/* Nodes 1 to 7 for Flow 1 */}
                  <div id="tour-node-facebook" style={{ left: "68px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 1 ? "scale-110 ring-4 ring-blue-500 rounded-3xl" : ""}`}>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-xl hover:scale-105 transition-transform cursor-pointer">
                      <FacebookLogo />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900 dark:border-zinc-900">1</span>
                    </div>
                    <div className="text-center w-28"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">On webhook call</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">from Lead Ads</span></div>
                  </div>

                  <div id="tour-node-if" style={{ left: "228px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 2 ? "scale-110 ring-4 ring-amber-500 rounded-3xl" : ""}`}>
                    <div className="absolute -top-7 text-[10px] font-mono font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-2.5 py-0.5 rounded-full text-zinc-700 dark:text-zinc-300 shadow-sm whitespace-nowrap">1st Has an email</div>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#FF6B00] text-white shadow-xl hover:scale-105 transition-transform cursor-pointer">
                      <span className="text-lg font-black tracking-tight">IF</span>
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900 dark:border-zinc-900">2</span>
                    </div>
                    <div className="text-center w-28"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">IF</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">1 route - first match</span></div>
                  </div>

                  <div id="tour-node-hubspot" style={{ left: "388px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 3 ? "scale-110 ring-4 ring-orange-500 rounded-3xl" : ""}`}>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#FF6B00] text-white shadow-xl hover:scale-105 transition-transform cursor-pointer">
                      <HubSpotLogo />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900 dark:border-zinc-900">3</span>
                    </div>
                    <div className="text-center w-32"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">App Request</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">hubspot - POST /crm/v3/obj...</span></div>
                  </div>

                  <div id="tour-node-assign" style={{ left: "548px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 4 ? "scale-110 ring-4 ring-zinc-900 rounded-3xl" : ""}`}>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xl hover:scale-105 transition-transform cursor-pointer">
                      <UserCheck className="h-7 w-7" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900 dark:border-zinc-900">4</span>
                    </div>
                    <div className="text-center w-36"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">Assign to next person</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">click to set up</span></div>
                  </div>

                  <div style={{ left: "792px", top: "32px" }} className={`absolute flex items-center gap-3 z-10 transition-all ${activeStep === 5 ? "scale-105" : ""}`}>
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#EA4335] text-white shadow-lg cursor-pointer"><Mail className="h-6 w-6" /><span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white border border-white dark:bg-white dark:text-zinc-900">5</span></div>
                    <div className="flex flex-col"><span className="text-xs font-extrabold text-zinc-900 dark:text-white">Gmail</span><span className="text-[10px] text-zinc-500 dark:text-zinc-400">send &#123;&#123; email &#125;&#125;</span></div>
                  </div>

                  <div style={{ left: "792px", top: "152px" }} className={`absolute flex items-center gap-3 z-10 transition-all ${activeStep === 5 ? "scale-105" : ""}`}>
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#4A154B] text-white shadow-lg cursor-pointer"><SlackLogo /><span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white border border-white dark:bg-white dark:text-zinc-900">6</span></div>
                    <div className="flex flex-col"><span className="text-xs font-extrabold text-zinc-900 dark:text-white">Slack</span><span className="text-[10px] text-zinc-500 dark:text-zinc-400">post to Slack</span></div>
                  </div>

                  <div style={{ left: "792px", top: "272px" }} className={`absolute flex items-center gap-3 z-10 transition-all ${activeStep === 5 ? "scale-105" : ""}`}>
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#34A853] text-white shadow-lg cursor-pointer"><FileSpreadsheet className="h-6 w-6" /><span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white border border-white dark:bg-white dark:text-zinc-900">7</span></div>
                    <div className="flex flex-col"><span className="text-xs font-extrabold text-zinc-900 dark:text-white">Google Sheets</span><span className="text-[10px] text-zinc-500 dark:text-zinc-400">click to set up</span></div>
                  </div>
                </>
              )}

              {/* FLOW 2: Shopify order -> invoice -> WhatsApp + shipping (IMAGE 2) */}
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
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#95BF47] text-white shadow-xl hover:scale-105 transition-transform cursor-pointer">
                      <ShopifyLogo />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900">1</span>
                    </div>
                    <div className="text-center w-28"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">On webhook call</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">from Shopify</span></div>
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
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#EA4335] text-white shadow-xl hover:scale-105 transition-transform cursor-pointer">
                      <Layers className="h-7 w-7" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900">3</span>
                    </div>
                    <div className="text-center w-32"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">App Request</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">zoho-books - POST /books/v...</span></div>
                  </div>

                  {/* Node 4: WhatsApp */}
                  <div style={{ left: "548px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 4 ? "scale-110 ring-4 ring-emerald-500 rounded-3xl" : ""}`}>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 transition-transform cursor-pointer">
                      <MessageSquare className="h-7 w-7" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900">4</span>
                    </div>
                    <div className="text-center w-28"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">WhatsApp</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">send WhatsApp</span></div>
                  </div>

                  {/* Node 5: Shiprocket */}
                  <div style={{ left: "708px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 5 ? "scale-110 ring-4 ring-zinc-900 rounded-3xl" : ""}`}>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xl hover:scale-105 transition-transform cursor-pointer">
                      <Truck className="h-7 w-7" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900">5</span>
                    </div>
                    <div className="text-center w-36"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">App Request</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">shiprocket - POST /v1/external</span></div>
                  </div>

                  {/* Node 6: Google Sheets (below) */}
                  <div style={{ left: "792px", top: "262px" }} className={`absolute flex items-center gap-3 z-10 transition-all ${activeStep === 5 ? "scale-105" : ""}`}>
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#34A853] text-white shadow-lg cursor-pointer"><FileSpreadsheet className="h-6 w-6" /><span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white border border-white dark:bg-white dark:text-zinc-900">6</span></div>
                    <div className="flex flex-col"><span className="text-xs font-extrabold text-zinc-900 dark:text-white">Google Sheets</span><span className="text-[10px] text-zinc-500 dark:text-zinc-400">click to set up</span></div>
                  </div>
                </>
              )}

              {/* FLOW 3: New blog post -> AI rewrite -> social (IMAGE 3) */}
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
                      <Rss className="h-7 w-7" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900">1</span>
                    </div>
                    <div className="text-center w-32"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">When a blog posts</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">click to set up</span></div>
                  </div>

                  {/* Node 2: AI Rewrite */}
                  <div style={{ left: "228px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 2 ? "scale-110 ring-4 ring-blue-500 rounded-3xl" : ""}`}>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xl hover:scale-105 transition-transform cursor-pointer">
                      <Bot className="h-7 w-7 text-blue-400" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900">2</span>
                    </div>
                    <div className="text-center w-28"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">AI</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">anthropic - default</span></div>
                  </div>

                  {/* Node 3: Wait for Approval */}
                  <div style={{ left: "388px", top: "148px" }} className={`absolute flex flex-col items-center gap-2 z-10 transition-all ${activeStep === 3 ? "scale-110 ring-4 ring-amber-500 rounded-3xl" : ""}`}>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#FF6B00] text-white shadow-xl hover:scale-105 transition-transform cursor-pointer">
                      <Clock className="h-7 w-7" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white border-2 border-white dark:bg-white dark:text-zinc-900">3</span>
                    </div>
                    <div className="text-center w-32"><span className="text-xs font-extrabold text-zinc-900 dark:text-white block">Wait for approval</span><span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">ask a person - 24h</span></div>
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

                  {/* Social Channels 5-8 */}
                  <div style={{ left: "792px", top: "12px" }} className={`absolute flex items-center gap-3 z-10 transition-all ${activeStep === 5 ? "scale-105" : ""}`}>
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0A66C2] text-white shadow-lg cursor-pointer"><LinkedInLogo /><span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[9px] font-bold text-white border border-white dark:bg-white dark:text-zinc-900">5</span></div>
                    <div className="flex flex-col"><span className="text-xs font-extrabold text-zinc-900 dark:text-white">LinkedIn</span><span className="text-[9px] text-zinc-500 dark:text-zinc-400">POST /v2/ugcPosts</span></div>
                  </div>

                  <div style={{ left: "792px", top: "102px" }} className={`absolute flex items-center gap-3 z-10 transition-all ${activeStep === 5 ? "scale-105" : ""}`}>
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-lg cursor-pointer"><FacebookLogo /><span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[9px] font-bold text-white border border-white dark:bg-white dark:text-zinc-900">6</span></div>
                    <div className="flex flex-col"><span className="text-xs font-extrabold text-zinc-900 dark:text-white">Facebook</span><span className="text-[9px] text-zinc-500 dark:text-zinc-400">POST /v21...</span></div>
                  </div>

                  <div style={{ left: "792px", top: "192px" }} className={`absolute flex items-center gap-3 z-10 transition-all ${activeStep === 5 ? "scale-105" : ""}`}>
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#24A1DE] text-white shadow-lg cursor-pointer"><Send className="h-5 w-5" /><span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[9px] font-bold text-white border border-white dark:bg-white dark:text-zinc-900">7</span></div>
                    <div className="flex flex-col"><span className="text-xs font-extrabold text-zinc-900 dark:text-white">Telegram</span><span className="text-[9px] text-zinc-500 dark:text-zinc-400">send via Telegram</span></div>
                  </div>

                  <div style={{ left: "792px", top: "282px" }} className={`absolute flex items-center gap-3 z-10 transition-all ${activeStep === 5 ? "scale-105" : ""}`}>
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#5865F2] text-white shadow-lg cursor-pointer"><MessageSquare className="h-5 w-5" /><span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[9px] font-bold text-white border border-white dark:bg-white dark:text-zinc-900">8</span></div>
                    <div className="flex flex-col"><span className="text-xs font-extrabold text-zinc-900 dark:text-white">Discord</span><span className="text-[9px] text-zinc-500 dark:text-zinc-400">post to Discord</span></div>
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
