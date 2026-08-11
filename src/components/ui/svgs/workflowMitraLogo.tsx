import * as React from "react";
import type { SVGProps } from "react";

export function WorkflowMitraLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id="wmBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="50%" stopColor="#020617" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <linearGradient id="wmBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
        <linearGradient id="wmTextGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1F5F9" />
        </linearGradient>
        <linearGradient id="wmSparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <filter id="wmGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <rect
        x="20"
        y="20"
        width="472"
        height="472"
        rx="124"
        fill="url(#wmBgGrad)"
        stroke="url(#wmBorderGrad)"
        strokeWidth="18"
      />

      <circle cx="110" cy="110" r="7" fill="#38BDF8" opacity="0.5" />
      <circle cx="402" cy="110" r="7" fill="#818CF8" opacity="0.5" />
      <path
        d="M 110 110 L 256 70 L 402 110"
        stroke="#38BDF8"
        strokeWidth="3"
        strokeDasharray="6 6"
        opacity="0.3"
        fill="none"
      />

      <path
        d="M 96 172 L 136 340 L 176 228 L 216 340 L 256 172"
        stroke="url(#wmTextGrad)"
        strokeWidth="34"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <path
        d="M 256 340 L 296 172 L 336 284 L 376 172 L 416 340"
        stroke="url(#wmTextGrad)"
        strokeWidth="34"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <circle cx="256" cy="172" r="18" fill="url(#wmSparkGrad)" filter="url(#wmGlow)" />
      <circle cx="256" cy="172" r="8" fill="#FFFFFF" />
      <circle cx="96" cy="172" r="12" fill="#38BDF8" />
      <circle cx="416" cy="340" r="12" fill="#C084FC" />
    </svg>
  );
}
