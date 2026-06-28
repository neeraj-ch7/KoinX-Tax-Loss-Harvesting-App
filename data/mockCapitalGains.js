/**
 * Mock Capital Gains API
 * Returns starting capital gains with an 800ms delay.
 */
export const getCapitalGains = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        capitalGains: {
          stcg: { profits: 70200.88, losses: 1548.53 },
          ltcg: { profits: 5020.00, losses: 3050.00 }
        }
      });
    }, 800);
  });
};
