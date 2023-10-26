import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addToWatchlist,
  removeFromWatchlist,
} from '../../features/tickerSlice';
import { TickerItem } from '../TickerItem/TickerItem';
import { Ticker } from '../../types/Ticker';
import { getPreparedTickers } from '../../utils/getPreparedTickers';

import './TickersList.scss';

export const TickersList: React.FC = () => {
  const tickers = useAppSelector((state) => state.ticker.tickers);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');

  const addToWatchlistHandler = (ticker: Ticker) => {
    dispatch(addToWatchlist(ticker));
  };

  const removeFromWatchlistHandler = (ticker: Ticker) => {
    dispatch(removeFromWatchlist(ticker));
  };

  const handleQuery = (value: string) => {
    const normalizedQuery = value.trim().toLowerCase();
    setQuery(normalizedQuery);
  };

  const visibleTickers = getPreparedTickers(tickers, query);

  return (
    <section className="TickersList">
      <input
        className="TickersList__search"
        type="search"
        value={query}
        placeholder="Search ticker by name"
        onChange={(e) => handleQuery(e.target.value)}
      />
      {visibleTickers.length ? (
        <ul className="TickersList__list">
          {visibleTickers.map((tickerItem) => (
            <li key={tickerItem.ticker}>
              <TickerItem
                tickerItem={tickerItem}
                addToWatchlistHandler={addToWatchlistHandler}
                removeFromWatchlistHandler={removeFromWatchlistHandler}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="TickersList__empty">No search results</p>
      )}
    </section>
  );
};
