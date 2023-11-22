import { getExchangeCombinationCount } from '../src/algorithm/coin';

describe('Coin Exchange', () => {
  it('should return correct combination count', () => {
    const coins = [1, 2, 5];
    const amountToGather = 20;

    const result = getExchangeCombinationCount(coins, amountToGather);

    expect(result).toBe(29);
  });
});
