import { useHarvest } from "@/context/HarvestContext";

/**
 * Custom hook to get holdings and their associated selection/loading states
 */
export const useHoldings = () => {
  const {
    holdings,
    loadingHoldings,
    errorHoldings,
    selectedHoldings,
    toggleHolding,
    selectAll,
    deselectAll
  } = useHarvest();

  return {
    holdings,
    loading: loadingHoldings,
    error: errorHoldings,
    selectedHoldings,
    toggleHolding,
    selectAll,
    deselectAll
  };
};
