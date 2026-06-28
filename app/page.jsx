"use client";

import React, { useState } from "react";
import { useHarvest } from "@/context/HarvestContext";
import { calculatePreHarvest, calculatePostHarvest } from "@/utils/calculations";
import Navbar from "@/components/Navbar";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import CapitalGainsCard from "@/components/CapitalGainsCard";
import HoldingsTable from "@/components/HoldingsTable";

export default function TaxHarvestingPage() {
  const {
    capitalGains,
    loadingGains,
    errorGains,
    holdings,
    loadingHoldings,
    errorHoldings,
    selectedHoldings,
  } = useHarvest();

  const [showGuide, setShowGuide] = useState(false);

  // Compute values
  const preGains = calculatePreHarvest(capitalGains);
  const postGains = calculatePostHarvest(capitalGains, selectedHoldings);

  const isLoading = loadingGains || loadingHoldings;
  const isError = errorGains || errorHoldings;

  return (
    <div className="min-h-screen pb-16 transition-colors duration-300 bg-slate-50 text-slate-800 dark:bg-[#0B0E11] dark:text-slate-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white" id="main-title">
              Tax Harvesting
            </h1>
            <p className="mt-1.5 text-sm font-medium text-slate-500 dark:text-slate-400">
              Offset your capital gains tax liabilities by harvesting your crypto losses.{" "}
              <button
                onClick={() => setShowGuide(true)}
                className="font-semibold text-[#1877F2] underline hover:text-blue-500 focus:outline-none"
                id="how-it-works-link"
              >
                How it works?
              </button>
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <SkeletonLoader />}

        {/* Error State */}
        {!isLoading && isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/40 dark:bg-red-950/10">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
              Data Loading Failed
            </h3>
            <p className="mt-2 text-sm text-red-700 dark:text-red-400">
              {errorGains || errorHoldings}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-[#1877F2] px-4 py-2 text-sm font-bold text-white shadow-md hover:bg-blue-600 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Normal Loaded State */}
        {!isLoading && !isError && (
          <div className="space-y-8">
            {/* Disclaimer Banner */}
            <DisclaimerBanner />

            {/* Side-by-Side Capital Gains Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              <CapitalGainsCard type="pre" data={preGains} />
              <CapitalGainsCard type="after" data={postGains} />
            </div>

            {/* Holdings Table */}
            <HoldingsTable />
          </div>
        )}
      </main>

      {/* "How it works?" Modal Guide */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-all dark:border-slate-800 dark:bg-[#0F1923]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800/40">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                How Tax Loss Harvesting Works
              </h3>
              <button
                onClick={() => setShowGuide(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                id="close-guide-modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-350">
              <div>
                <h4 className="font-bold text-[#1877F2] dark:text-blue-400">1. What is Tax Loss Harvesting?</h4>
                <p className="mt-1">
                  It&apos;s the process of selling crypto assets currently trading at a loss to offset your capital gains tax liability on profitable trades.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1877F2] dark:text-blue-400">2. How to use this tool?</h4>
                <p className="mt-1">
                  Review the <strong>Holdings</strong> table below. Select assets with negative short-term or long-term gains by checking their rows. When selected, the asset&apos;s total holding is simulated as &quot;sold&quot;.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1877F2] dark:text-blue-400">3. Live Tax Updates</h4>
                <p className="mt-1">
                  Once checked, notice how the **After Harvesting** card updates in real time. It calculates your new effective gains and displays your estimated savings (based on 30% STCG and 20% LTCG tax rates).
                </p>
              </div>

              <div className="rounded-lg bg-blue-50/50 p-3 text-xs text-[#1877F2] dark:bg-blue-950/20 dark:text-blue-300">
                <strong>Pro-Tip:</strong> Harvest losses before the end of the financial year to claim offsets on your upcoming tax return.
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowGuide(false)}
                className="rounded-lg bg-[#1877F2] px-4.5 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-600 transition"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Premium Skeleton Loader for fetching state
function SkeletonLoader() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Disclaimer Banner Skeleton */}
      <div className="h-14 w-full rounded-xl bg-slate-200 dark:bg-slate-800/50" />

      {/* Cards Skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-[250px] rounded-2xl bg-slate-200 dark:bg-slate-800/50" />
        <div className="h-[250px] rounded-2xl bg-slate-200 dark:bg-slate-800/50" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800/80 dark:bg-[#0F1923]">
        <div className="mb-4 h-6 w-32 rounded bg-slate-200 dark:bg-slate-800/50" />
        <div className="space-y-4.5">
          <div className="h-10 w-full rounded bg-slate-100 dark:bg-slate-900/40" />
          <div className="h-12 w-full rounded bg-slate-100/50 dark:bg-slate-900/20" />
          <div className="h-12 w-full rounded bg-slate-100/50 dark:bg-slate-900/20" />
          <div className="h-12 w-full rounded bg-slate-100/50 dark:bg-slate-900/20" />
          <div className="h-12 w-full rounded bg-slate-100/50 dark:bg-slate-900/20" />
        </div>
      </div>
    </div>
  );
}
