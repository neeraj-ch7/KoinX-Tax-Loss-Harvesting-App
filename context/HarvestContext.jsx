"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCapitalGains } from "@/data/mockCapitalGains";
import { getHoldings } from "@/data/mockHoldings";

const HarvestContext = createContext(undefined);

export const HarvestProvider = ({ children }) => {
  const [selectedHoldings, setSelectedHoldings] = useState([]);
  const [currency, setCurrency] = useState("INR");
  const [theme, setTheme] = useState("dark");

  const [capitalGainsData, setCapitalGainsData] = useState(null);
  const [loadingGains, setLoadingGains] = useState(true);
  const [errorGains, setErrorGains] = useState(null);

  const [holdingsData, setHoldingsData] = useState([]);
  const [loadingHoldings, setLoadingHoldings] = useState(true);
  const [errorHoldings, setErrorHoldings] = useState(null);

  // Fetch Capital Gains
  useEffect(() => {
    const fetchGains = async () => {
      try {
        setLoadingGains(true);
        const data = await getCapitalGains();
        setCapitalGainsData(data.capitalGains);
      } catch (err) {
        console.error("Error fetching capital gains:", err);
        setErrorGains("Failed to load capital gains data.");
      } finally {
        setLoadingGains(false);
      }
    };
    fetchGains();
  }, []);

  // Fetch Holdings
  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        setLoadingHoldings(true);
        const data = await getHoldings();
        setHoldingsData(data);
      } catch (err) {
        console.error("Error fetching holdings:", err);
        setErrorHoldings("Failed to load holdings data.");
      } finally {
        setLoadingHoldings(false);
      }
    };
    fetchHoldings();
  }, []);

  // Apply dark/light theme to document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, [theme]);

  // Toggle selection for a holding
  const toggleHolding = (holding) => {
    setSelectedHoldings((prev) => {
      const exists = prev.some((h) => h.coin === holding.coin);
      if (exists) {
        return prev.filter((h) => h.coin !== holding.coin);
      } else {
        return [...prev, holding];
      }
    });
  };

  // Select all holdings
  const selectAll = (holdings) => {
    setSelectedHoldings(holdings);
  };

  // Deselect all holdings
  const deselectAll = () => {
    setSelectedHoldings([]);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "INR" ? "USD" : "INR"));
  };

  return (
    <HarvestContext.Provider
      value={{
        selectedHoldings,
        setSelectedHoldings,
        toggleHolding,
        selectAll,
        deselectAll,
        currency,
        setCurrency,
        toggleCurrency,
        theme,
        setTheme,
        toggleTheme,
        capitalGains: capitalGainsData,
        loadingGains,
        errorGains,
        holdings: holdingsData,
        loadingHoldings,
        errorHoldings,
      }}
    >
      {children}
    </HarvestContext.Provider>
  );
};

export const useHarvest = () => {
  const context = useContext(HarvestContext);
  if (context === undefined) {
    throw new Error("useHarvest must be used within a HarvestProvider");
  }
  return context;
};
