"use client";

import React from "react";
import { useHarvest } from "@/context/HarvestContext";
import { formatCurrency } from "@/utils/calculations";

// Color mappings for coin logos to create a premium, brand-aligned visual style
const BRAND_COLORS = {
  BTC: { bg: "bg-amber-500/10 text-amber-500 border-amber-500/20", char: "₿" },
  ETH: { bg: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20", char: "Ξ" },
  SOL: { bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", char: "S" },
  MATIC: { bg: "bg-violet-500/10 text-violet-500 border-violet-500/20", char: "M" },
  USDT: { bg: "bg-teal-500/10 text-teal-500 border-teal-500/20", char: "₮" },
  USDC: { bg: "bg-blue-500/10 text-blue-500 border-blue-500/20", char: "C" },
  WETH: { bg: "bg-pink-500/10 text-pink-500 border-pink-500/20", char: "W" },
  WPOL: { bg: "bg-purple-500/10 text-purple-500 border-purple-500/20", char: "P" },
  GONE: { bg: "bg-rose-500/10 text-rose-500 border-rose-500/20", char: "G" },
  SLN: { bg: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20", char: "L" },
  OX: { bg: "bg-indigo-600/10 text-indigo-400 border-indigo-600/20", char: "O" },
  FLAME: { bg: "bg-red-500/10 text-red-500 border-red-500/20", char: "F" },
  PIG: { bg: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20", char: "P" },
  "$CULO": { bg: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", char: "$" },
  QUICK: { bg: "bg-blue-600/10 text-blue-400 border-blue-600/20", char: "Q" },
  DFYN: { bg: "bg-purple-600/10 text-purple-400 border-purple-600/20", char: "D" },
  LINK: { bg: "bg-blue-700/10 text-blue-500 border-blue-700/20", char: "L" },
  BLOK: { bg: "bg-emerald-600/10 text-emerald-400 border-emerald-600/20", char: "B" },
  SPHERE: { bg: "bg-sky-500/10 text-sky-500 border-sky-500/20", char: "S" },
  TRADE: { bg: "bg-teal-600/10 text-teal-400 border-teal-600/20", char: "T" },
  WELT: { bg: "bg-amber-600/10 text-amber-500 border-amber-600/20", char: "W" },
  FTM: { bg: "bg-blue-500/10 text-blue-400 border-blue-500/20", char: "F" },
  EZ: { bg: "bg-lime-500/10 text-lime-500 border-lime-500/20", char: "E" },
  FRM: { bg: "bg-red-600/10 text-red-400 border-red-600/20", char: "F" },
  TITAN: { bg: "bg-cyan-600/10 text-cyan-400 border-cyan-600/20", char: "T" },
};

function CoinLogo({ coin }) {
  const brand = BRAND_COLORS[coin] || { bg: "bg-slate-500/10 text-slate-500 border-slate-500/20", char: coin?.[0] || "?" };
  return (
    <div className={`flex h-8 w-8 items-center justify-center rounded-full border font-bold text-sm ${brand.bg}`}>
      {brand.char}
    </div>
  );
}

export default function HoldingRow({ holding }) {
  const { selectedHoldings, toggleHolding, currency } = useHarvest();

  const isSelected = selectedHoldings.some((h) => h.coin === holding.coin);
  const totalValue = holding.totalHolding * holding.currentPrice;

  // Formatting helpers
  const formatVal = (val) => formatCurrency(val, currency);

  const getGainColor = (gain) => {
    if (gain > 0) return "text-emerald-600 dark:text-emerald-400";
    if (gain < 0) return "text-red-500 dark:text-red-400";
    return "text-slate-500 dark:text-slate-400";
  };

  const getGainPrefix = (gain) => (gain > 0 ? "+" : "");

  return (
    <tr
      onClick={() => toggleHolding(holding)}
      className={`group border-b border-slate-100 cursor-pointer transition-colors duration-150 hover:bg-slate-50/50 dark:border-slate-800/40 dark:hover:bg-slate-900/20 ${
        isSelected ? "bg-blue-50/20 dark:bg-blue-950/10" : ""
      }`}
    >
      {/* Checkbox */}
      <td className="pl-6 py-4" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleHolding(holding)}
          className="h-4 w-4 cursor-pointer rounded border-slate-300 text-[#1877F2] transition focus:ring-[#1877F2] dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-offset-slate-900"
          id={`checkbox-${holding.coin}`}
        />
      </td>

      {/* Asset */}
      <td className="py-4 pr-4">
        <div className="flex items-center gap-3">
          <CoinLogo coin={holding.coin} />
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-200">
              {holding.coinName}
            </div>
            <div className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              {holding.coin}
            </div>
          </div>
        </div>
      </td>

      {/* Holdings & Average Buy Price */}
      <td className="py-4 px-4">
        <div>
          <div className="font-bold text-slate-700 dark:text-slate-300">
            {holding.totalHolding.toLocaleString(undefined, { maximumFractionDigits: 5 })} {holding.coin}
          </div>
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            Avg: {formatVal(holding.averageBuyPrice)}
          </div>
        </div>
      </td>

      {/* Current Price */}
      <td className="py-4 px-4 font-bold text-slate-700 dark:text-slate-300">
        {formatVal(holding.currentPrice)}
      </td>

      {/* Total Current Value */}
      <td className="py-4 px-4 font-bold text-slate-700 dark:text-slate-300">
        {formatVal(totalValue)}
      </td>

      {/* Short-Term Gain / Loss */}
      <td className="py-4 px-4">
        <div>
          <div className={`font-bold ${getGainColor(holding.stcg.gain)}`}>
            {getGainPrefix(holding.stcg.gain)}
            {formatVal(holding.stcg.gain)}
          </div>
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            {holding.stcg.balance} {holding.coin}
          </div>
        </div>
      </td>

      {/* Long-Term Gain / Loss */}
      <td className="py-4 px-4">
        <div>
          <div className={`font-bold ${getGainColor(holding.ltcg.gain)}`}>
            {getGainPrefix(holding.ltcg.gain)}
            {formatVal(holding.ltcg.gain)}
          </div>
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            {holding.ltcg.balance} {holding.coin}
          </div>
        </div>
      </td>

      {/* Amount to Sell */}
      <td className="py-4 px-6 text-right font-bold text-slate-600 dark:text-slate-400">
        {isSelected ? (
          <span className="text-[#1877F2] font-extrabold animate-fade-in">
            {holding.totalHolding.toLocaleString(undefined, { maximumFractionDigits: 5 })} {holding.coin}
          </span>
        ) : (
          <span className="text-slate-300 dark:text-slate-700">-</span>
        )}
      </td>
    </tr>
  );
}
