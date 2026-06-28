"use client";

import React, { useState, useMemo } from "react";
import { useHarvest } from "@/context/HarvestContext";
import HoldingRow from "./HoldingRow";

export default function HoldingsTable() {
  const { holdings, selectedHoldings, selectAll, deselectAll } = useHarvest();
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortField, setSortField] = useState("absolute_gain");
  const [sortAsc, setSortAsc] = useState(false); // Default descending

  // Handle header checkbox change
  const isAllSelected = useMemo(() => {
    if (!holdings.length) return false;
    return holdings.every((h) => selectedHoldings.some((sh) => sh.coin === h.coin));
  }, [holdings, selectedHoldings]);

  const handleSelectAllChange = () => {
    if (isAllSelected) {
      deselectAll();
    } else {
      selectAll(holdings);
    }
  };

  // Sort and process holdings
  const sortedHoldings = useMemo(() => {
    if (!holdings.length) return [];

    const list = [...holdings];
    list.sort((a, b) => {
      let valA = 0;
      let valB = 0;

      switch (sortField) {
        case "asset":
          return sortAsc
            ? a.coinName.localeCompare(b.coinName)
            : b.coinName.localeCompare(a.coinName);
        case "holdings":
          valA = a.totalHolding * a.currentPrice;
          valB = b.totalHolding * b.currentPrice;
          break;
        case "current_price":
          valA = a.currentPrice;
          valB = b.currentPrice;
          break;
        case "stcg":
          valA = a.stcg.gain;
          valB = b.stcg.gain;
          break;
        case "ltcg":
          valA = a.ltcg.gain;
          valB = b.ltcg.gain;
          break;
        case "absolute_gain":
        default:
          valA = Math.abs((a.stcg.gain || 0) + (a.ltcg.gain || 0));
          valB = Math.abs((b.stcg.gain || 0) + (b.ltcg.gain || 0));
          break;
      }

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return list;
  }, [holdings, sortField, sortAsc]);

  // Determine which rows to display
  const displayedHoldings = useMemo(() => {
    if (isExpanded) return sortedHoldings;
    return sortedHoldings.slice(0, 5);
  }, [sortedHoldings, isExpanded]);

  // Toggle sort field/direction
  const requestSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false); // Reset to descending on new field
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3 opacity-30">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      );
    }
    return sortAsc ? (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3 w-3 text-[#1877F2]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3 w-3 text-[#1877F2]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 dark:border-slate-800/80 dark:bg-[#0F1923]">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800/40">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Holdings</h3>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 dark:border-slate-800/40 dark:bg-slate-900/10">
              {/* Checkbox Header */}
              <th className="w-14 pl-6 py-4">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAllChange}
                  className="h-4 w-4 cursor-pointer rounded border-slate-300 text-[#1877F2] transition focus:ring-[#1877F2] dark:border-slate-700 dark:bg-slate-900"
                  id="select-all-checkbox"
                />
              </th>

              {/* Columns */}
              <th
                onClick={() => requestSort("asset")}
                className="py-4 pr-4 font-semibold cursor-pointer select-none text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
              >
                <div className="flex items-center gap-1.5">
                  Asset {getSortIcon("asset")}
                </div>
              </th>

              <th
                onClick={() => requestSort("holdings")}
                className="py-4 px-4 font-semibold cursor-pointer select-none text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
              >
                <div className="flex items-center gap-1.5">
                  Holdings + Avg Buy Price {getSortIcon("holdings")}
                </div>
              </th>

              <th
                onClick={() => requestSort("current_price")}
                className="py-4 px-4 font-semibold cursor-pointer select-none text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
              >
                <div className="flex items-center gap-1.5">
                  Current Price {getSortIcon("current_price")}
                </div>
              </th>

              <th className="py-4 px-4 font-semibold text-slate-500 dark:text-slate-400">
                Total Current Value
              </th>

              <th
                onClick={() => requestSort("stcg")}
                className="py-4 px-4 font-semibold cursor-pointer select-none text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
              >
                <div className="flex items-center gap-1.5">
                  Short-Term Gain (STCG) {getSortIcon("stcg")}
                </div>
              </th>

              <th
                onClick={() => requestSort("ltcg")}
                className="py-4 px-4 font-semibold cursor-pointer select-none text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
              >
                <div className="flex items-center gap-1.5">
                  Long-Term Gain (LTCG) {getSortIcon("ltcg")}
                </div>
              </th>

              <th className="py-4 px-6 text-right font-semibold text-slate-500 dark:text-slate-400">
                Amount to Sell
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
            {displayedHoldings.map((holding) => (
              <HoldingRow key={holding.coin} holding={holding} />
            ))}
          </tbody>
        </table>
      </div>

      {/* View All Button */}
      {holdings.length > 5 && (
        <div className="flex justify-center border-t border-slate-100 p-4 dark:border-slate-800/40">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-800 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            id="view-all-toggle"
          >
            <span>{isExpanded ? "View Less" : `View All (${holdings.length} Assets)`}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className={`h-3 w-3 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
