"use client";

import React from "react";
import { useHarvest } from "@/context/HarvestContext";
import { formatCurrency } from "@/utils/calculations";

export default function CapitalGainsCard({ type, data }) {
  const { currency } = useHarvest();
  
  if (!data) return null;

  const isPre = type === "pre";
  const { stcg, ltcg, realised, taxSavings } = data;

  // Formatting helpers
  const formatVal = (val) => formatCurrency(val, currency);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 shadow-lg ${
        isPre
          ? "border border-slate-200 bg-white dark:border-[#1E293B] dark:bg-[#0F1923]"
          : "bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-blue-500/10 dark:from-blue-700 dark:to-indigo-900"
      }`}
    >
      {/* Decorative Glow */}
      {!isPre && (
        <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
      )}

      {/* Card Title */}
      <h3
        className={`text-lg font-bold ${
          isPre ? "text-slate-800 dark:text-slate-200" : "text-white"
        }`}
      >
        {isPre ? "Pre Harvesting" : "After Harvesting"}
      </h3>

      {/* Gains Grid */}
      <div className="mt-5 space-y-4">
        {/* Table Header */}
        <div className="grid grid-cols-3 text-right text-xs font-bold uppercase tracking-wider">
          <div /> {/* Empty for row labels */}
          <div className={isPre ? "text-slate-500 dark:text-slate-400" : "text-blue-100"}>
            Short-term
          </div>
          <div className={isPre ? "text-slate-500 dark:text-slate-400" : "text-blue-100"}>
            Long-term
          </div>
        </div>

        {/* Profits Row */}
        <div className="grid grid-cols-3 items-center border-b border-slate-100 py-1.5 text-sm dark:border-slate-800/40">
          <span className={`font-semibold ${isPre ? "text-slate-500 dark:text-slate-400" : "text-blue-100"}`}>
            Profits
          </span>
          <span className="text-right font-medium">{formatVal(stcg.profits)}</span>
          <span className="text-right font-medium">{formatVal(ltcg.profits)}</span>
        </div>

        {/* Losses Row */}
        <div className="grid grid-cols-3 items-center border-b border-slate-100 py-1.5 text-sm dark:border-slate-800/40">
          <span className={`font-semibold ${isPre ? "text-slate-500 dark:text-slate-400" : "text-blue-100"}`}>
            Losses
          </span>
          {/* Format losses as negative in Pre-harvest, or standard negative in display */}
          <span className={`text-right font-medium ${isPre ? "text-red-500 dark:text-red-400" : "text-red-200"}`}>
            -{formatCurrency(Math.abs(stcg.losses), currency)}
          </span>
          <span className={`text-right font-medium ${isPre ? "text-red-500 dark:text-red-400" : "text-red-200"}`}>
            -{formatCurrency(Math.abs(ltcg.losses), currency)}
          </span>
        </div>

        {/* Net Gains Row */}
        <div className="grid grid-cols-3 items-center py-1.5 text-sm font-semibold">
          <span className={isPre ? "text-slate-700 dark:text-slate-300" : "text-white"}>
            Net Capital Gains
          </span>
          <span
            className={`text-right ${
              stcg.net >= 0
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-500 dark:text-red-400"
            } ${!isPre && (stcg.net >= 0 ? "!text-emerald-300" : "!text-red-200")}`}
          >
            {formatVal(stcg.net)}
          </span>
          <span
            className={`text-right ${
              ltcg.net >= 0
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-500 dark:text-red-400"
            } ${!isPre && (ltcg.net >= 0 ? "!text-emerald-300" : "!text-red-200")}`}
          >
            {formatVal(ltcg.net)}
          </span>
        </div>
      </div>

      {/* Totals Section */}
      <div
        className={`mt-6 border-t pt-4 ${
          isPre ? "border-slate-100 dark:border-slate-800" : "border-white/15"
        }`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`text-sm font-bold ${
              isPre ? "text-slate-500 dark:text-slate-400" : "text-blue-100"
            }`}
          >
            {isPre ? "Realised Capital Gains" : "Effective Capital Gains"}
          </span>
          <span className="text-xl font-black">{formatVal(realised)}</span>
        </div>

        {/* Savings Badge */}
        {!isPre && taxSavings > 0 && (
          <div className="mt-3.5 flex items-center gap-2 rounded-lg bg-emerald-500/20 px-3 py-2 text-xs font-bold text-emerald-300 border border-emerald-500/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4.5 w-4.5 shrink-0 text-emerald-400"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            <span>You are going to save {formatVal(taxSavings)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
