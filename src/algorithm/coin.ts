/**
 * Get the solution count of coint exchange， TODO: cache calculator result if the amount is large
 * @param coins array sorted by value, from low to high, e.g. [1,2], [1,2,5]
 * @param amount the amount need to exchange, e.g. 11
 * @return {number} solution count
 */
export const getExchangeCombinationCount = (
  coins: number[],
  amount: number
): number => {
  let count = 0;
  if (amount < 0 || coins.length < 1 || amount < coins[0]) {
    return count;
  }

  const biggest = coins[coins.length - 1];
  const newCoins = coins.slice(0, -1);
  if (biggest !== undefined) {
    const maximumBiggestCount = Math.floor(amount / biggest);
    if (amount % biggest === 0) {
      count++;
    }
    for (let i = 0; i <= maximumBiggestCount; i++) {
      const solutions = getExchangeCombinationCount(
        newCoins,
        amount - i * biggest
      );
      count += solutions;
    }
  }

  return count;
};
