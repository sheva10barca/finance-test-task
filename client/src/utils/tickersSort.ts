import { SortTypes } from '../types/SortTypes';
import { Ticker } from '../types/Ticker';

export const tickersSort = (
  tickers: Ticker[],
  sortType: string,
  sortDirections: Record<string, boolean>
) => {
  let sortedTickers = [...tickers];

  if (sortType) {
    sortedTickers = sortedTickers.sort((t1, t2) => {
      switch (sortType) {
        case SortTypes.NAME:
          return sortDirections.ticker
            ? t1[sortType].localeCompare(t2[sortType])
            : t2[sortType].localeCompare(t1[sortType]);

        case SortTypes.PRICE:
          return sortDirections.price
            ? t1[sortType] - t2[sortType]
            : t2[sortType] - t1[sortType];

        default:
          return 0;
      }
    });
  }

  return sortedTickers;
};
