import { useHarvest } from "@/context/HarvestContext";

/**
 * Custom hook to get starting capital gains and their loading/error states
 */
export const useCapitalGains = () => {
  const {
    capitalGains,
    loadingGains,
    errorGains
  } = useHarvest();

  return {
    capitalGains,
    loading: loadingGains,
    error: errorGains
  };
};
