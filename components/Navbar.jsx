"use client";

import React from "react";
import { useHarvest } from "@/context/HarvestContext";

export default function Navbar() {
  const { theme, toggleTheme, currency, toggleCurrency } = useHarvest();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#E2E8F0] bg-white/80 py-4 px-6 backdrop-blur-md transition-colors duration-300 dark:border-[#1E293B] dark:bg-[#0B0E11]/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* KoinX Logo */}
        <div className="flex items-center gap-2">
          <svg
            className="h-8 w-auto text-[#1877F2]"
            viewBox="0 0 120 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
              fill="currentColor"
            />
            <path
              d="M12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8Z"
              fill="#10B981"
            />
            <text
              x="32"
              y="20"
              fill="currentColor"
              className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              Koin
            </text>
            <text
              x="76"
              y="20"
              fill="#1877F2"
              className="text-lg font-black tracking-tight"
            >
              X
            </text>
          </svg>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Currency Toggle */}
          <button
            onClick={toggleCurrency}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Toggle Currency"
            id="currency-toggle"
          >
            <span>Currency:</span>
            <span className="font-bold text-[#1877F2]">
              {currency === "INR" ? "₹ INR" : "$ USD"}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Toggle Theme"
            id="theme-toggle"
          >
            {theme === "dark" ? (
              // Sun Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 animate-pulse"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m0 13.5V21M9.75 12l-.75-.75m11.25 0l-.75.75M12 9.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM21 12h-2.25M5.25 12H3m3.75 6.75l-.75-.75M19.5 4.5l-.75.75m-14.1 0l.75-.75m11.25 14.1l.75.75"
                />
              </svg>
            ) : (
              // Moon Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 rotate-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
