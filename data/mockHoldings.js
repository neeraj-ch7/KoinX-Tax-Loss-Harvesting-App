/**
 * Mock Holdings API
 * Returns list of 25 crypto holdings with an 800ms delay.
 */
export const getHoldings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          coin: "BTC",
          coinName: "Bitcoin",
          currentPrice: 62450.00,
          totalHolding: 0.83778,
          averageBuyPrice: 59300.00,
          stcg: { balance: 0.35, gain: -1200.00 },
          ltcg: { balance: 0.48778, gain: 3838.00 }
        },
        {
          coin: "ETH",
          coinName: "Ethereum",
          currentPrice: 3450.00,
          totalHolding: 5.6738,
          averageBuyPrice: 3820.00,
          stcg: { balance: 2.15, gain: -1540.00 },
          ltcg: { balance: 3.5238, gain: 4500.00 }
        },
        {
          coin: "SOL",
          coinName: "Solana",
          currentPrice: 142.50,
          totalHolding: 35.5,
          averageBuyPrice: 165.00,
          stcg: { balance: 15.0, gain: -820.00 },
          ltcg: { balance: 20.5, gain: -450.00 }
        },
        {
          coin: "MATIC",
          coinName: "Polygon",
          currentPrice: 0.58,
          totalHolding: 2250.0,
          averageBuyPrice: 0.85,
          stcg: { balance: 1000.0, gain: -310.00 },
          ltcg: { balance: 1250.0, gain: -480.00 }
        },
        {
          coin: "USDT",
          coinName: "Tether",
          currentPrice: 1.00,
          totalHolding: 3896.54,
          averageBuyPrice: 1.00,
          stcg: { balance: 2000.0, gain: 0.00 },
          ltcg: { balance: 1896.54, gain: 0.00 }
        },
        {
          coin: "USDC",
          coinName: "USD Coin",
          currentPrice: 1.00,
          totalHolding: 1250.00,
          averageBuyPrice: 1.00,
          stcg: { balance: 750.0, gain: 0.00 },
          ltcg: { balance: 500.0, gain: 0.00 }
        },
        {
          coin: "WETH",
          coinName: "Wrapped Ethereum",
          currentPrice: 3452.10,
          totalHolding: 1.5,
          averageBuyPrice: 3600.00,
          stcg: { balance: 0.5, gain: -180.00 },
          ltcg: { balance: 1.0, gain: -220.00 }
        },
        {
          coin: "WPOL",
          coinName: "Wrapped Polygon",
          currentPrice: 0.58,
          totalHolding: 1500.0,
          averageBuyPrice: 0.90,
          stcg: { balance: 500.0, gain: -150.00 },
          ltcg: { balance: 1000.0, gain: -330.00 }
        },
        {
          coin: "GONE",
          coinName: "Gone Token",
          currentPrice: 0.000028,
          totalHolding: 120000000.0,
          averageBuyPrice: 0.000035,
          stcg: { balance: 50000000.0, gain: -350.00 },
          ltcg: { balance: 70000000.0, gain: -490.00 }
        },
        {
          coin: "SLN",
          coinName: "Smart Layer Network",
          currentPrice: 1.15,
          totalHolding: 420.0,
          averageBuyPrice: 2.10,
          stcg: { balance: 150.0, gain: -200.00 },
          ltcg: { balance: 270.0, gain: -380.00 }
        },
        {
          coin: "OX",
          coinName: "OPX Token",
          currentPrice: 0.012,
          totalHolding: 45000.0,
          averageBuyPrice: 0.018,
          stcg: { balance: 20000.0, gain: -120.00 },
          ltcg: { balance: 25000.0, gain: -150.00 }
        },
        {
          coin: "FLAME",
          coinName: "FireFlame",
          currentPrice: 0.045,
          totalHolding: 8000.0,
          averageBuyPrice: 0.075,
          stcg: { balance: 3000.0, gain: -100.00 },
          ltcg: { balance: 5000.0, gain: -140.00 }
        },
        {
          coin: "PIG",
          coinName: "Pig Coin",
          currentPrice: 0.000015,
          totalHolding: 85000000.0,
          averageBuyPrice: 0.000012,
          stcg: { balance: 35000000.0, gain: 110.00 },
          ltcg: { balance: 50000000.0, gain: 145.00 }
        },
        {
          coin: "$CULO",
          coinName: "Culo",
          currentPrice: 0.000045,
          totalHolding: 65000000.0,
          averageBuyPrice: 0.000068,
          stcg: { balance: 25000000.0, gain: -570.00 },
          ltcg: { balance: 40000000.0, gain: -925.00 }
        },
        {
          coin: "QUICK",
          coinName: "Quickswap",
          currentPrice: 0.052,
          totalHolding: 12500.0,
          averageBuyPrice: 0.078,
          stcg: { balance: 4500.0, gain: -150.00 },
          ltcg: { balance: 8000.0, gain: -175.00 }
        },
        {
          coin: "DFYN",
          coinName: "Dfyn Network",
          currentPrice: 0.018,
          totalHolding: 35000.0,
          averageBuyPrice: 0.028,
          stcg: { balance: 15000.0, gain: -150.00 },
          ltcg: { balance: 20000.0, gain: -200.00 }
        },
        {
          coin: "LINK",
          coinName: "Chainlink",
          currentPrice: 15.20,
          totalHolding: 85.0,
          averageBuyPrice: 13.50,
          stcg: { balance: 35.0, gain: 120.00 },
          ltcg: { balance: 50.0, gain: 140.00 }
        },
        {
          coin: "BLOK",
          coinName: "Bloktopia",
          currentPrice: 0.0012,
          totalHolding: 850000.0,
          averageBuyPrice: 0.0018,
          stcg: { balance: 350000.0, gain: -210.00 },
          ltcg: { balance: 500000.0, gain: -300.00 }
        },
        {
          coin: "SPHERE",
          coinName: "Sphere",
          currentPrice: 0.0085,
          totalHolding: 120000.0,
          averageBuyPrice: 0.012,
          stcg: { balance: 40000.0, gain: -140.00 },
          ltcg: { balance: 80000.0, gain: -280.00 }
        },
        {
          coin: "TRADE",
          coinName: "Polytrade",
          currentPrice: 0.72,
          totalHolding: 850.0,
          averageBuyPrice: 0.95,
          stcg: { balance: 350.0, gain: -80.00 },
          ltcg: { balance: 500.0, gain: -115.00 }
        },
        {
          coin: "WELT",
          coinName: "Welt",
          currentPrice: 0.0075,
          totalHolding: 250000.0,
          averageBuyPrice: 0.011,
          stcg: { balance: 100000.0, gain: -350.00 },
          ltcg: { balance: 150000.0, gain: -525.00 }
        },
        {
          coin: "FTM",
          coinName: "Fantom",
          currentPrice: 0.64,
          totalHolding: 1200.0,
          averageBuyPrice: 0.82,
          stcg: { balance: 500.0, gain: -90.00 },
          ltcg: { balance: 700.0, gain: -126.00 }
        },
        {
          coin: "EZ",
          coinName: "Renzo",
          currentPrice: 0.11,
          totalHolding: 4800.0,
          averageBuyPrice: 0.18,
          stcg: { balance: 1800.0, gain: -126.00 },
          ltcg: { balance: 3000.0, gain: -210.00 }
        },
        {
          coin: "FRM",
          coinName: "Ferrum Network",
          currentPrice: 0.038,
          totalHolding: 28000.0,
          averageBuyPrice: 0.052,
          stcg: { balance: 10000.0, gain: -140.00 },
          ltcg: { balance: 18000.0, gain: -252.00 }
        },
        {
          coin: "TITAN",
          coinName: "Titan Swap",
          currentPrice: 0.0055,
          totalHolding: 150000.0,
          averageBuyPrice: 0.0085,
          stcg: { balance: 50000.0, gain: -150.00 },
          ltcg: { balance: 100000.0, gain: -300.00 }
        }
      ]);
    }, 800);
  });
};
