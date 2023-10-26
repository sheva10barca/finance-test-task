import { Ticker } from '../types/Ticker';
import { normalizedName } from './normalizedName';

export const getPreparedTickers = (tickers: Ticker[], query: string) => {
  if (!query) {
    return tickers;
  }

  return tickers.filter((ticker) => {
    const name = normalizedName(ticker.ticker).toLowerCase();

    return name.includes(query);
  });
};
