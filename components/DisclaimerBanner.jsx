"use client";

import React, { useState } from "react";

export default function DisclaimerBanner() {
  const [isOpen, setIsOpen] = useState(false);

  const disclaimers = [
    "Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.",
    "Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.",
    "Price and market values data is fetched from CoinGecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.",
    "Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.",
    "Only realised losses are considered for harvesting. Unrealised losses in held assets are not counted."
  ];

  return (
    <div className="w-full rounded-xl border border-amber-200 bg-amber-50/50 p-4 transition-all duration-300 dark:border-amber-900/40 dark:bg-amber-950/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-3 text-left font-medium text-amber-800 dark:text-amber-300/90"
        aria-expanded={isOpen}
        id="disclaimer-toggle"
      >
        <div className="flex items-center gap-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <span className="text-sm font-bold tracking-wide">
            Important Notes & Disclaimers
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className={`h-4 w-4 text-amber-600 transition-transform duration-300 dark:text-amber-400 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Expandable Content */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] mt-3 opacity-100" : "grid-rows-[0fr] opacity-0 overflow-hidden"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-2.5 pl-7 text-xs leading-relaxed text-amber-700/90 dark:text-amber-400/70 list-disc">
            {disclaimers.map((item, index) => (
              <li key={index} className="pl-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
