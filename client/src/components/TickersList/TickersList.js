import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addToWatchlist,
  removeFromWatchlist,
} from '../../features/tickerSlice.js';
import { TickerItem } from '../TickerItem/TickerItem.js';
import { normalizedName } from '../../utils/normalizedName.js';

import './TickersList.scss';

export const TickersList = () => {
  const tickers = useSelector((state) => state.ticker.tickers);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const addToWatchlistHandler = (ticker) => {
    dispatch(addToWatchlist(ticker));
  };

  const removeFromWatchlistHandler = (ticker) => {
    dispatch(removeFromWatchlist(ticker));
  };

  const handleQuery = (value) => {
    const normalizedQuery = value.trim().toLowerCase();
    setQuery(normalizedQuery);
  };

  const getPreparedTickers = (tickers, query) => {
    if (!query) {
      return tickers;
    }

    return tickers.filter((ticker) => {
      const name = normalizedName(ticker.ticker).toLowerCase();

      return name.includes(query);
    });
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
          {visibleTickers.map((ticker) => (
            <li key={ticker.ticker}>
              <TickerItem
                ticker={ticker}
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
