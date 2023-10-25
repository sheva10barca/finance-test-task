import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWatchlist } from '../../features/tickerSlice.js';
import { TickerItem } from '../TickerItem/TickerItem.js';

import './WatchList.scss';

export const WatchList = () => {
  const tickers = useSelector((state) => state.ticker.tickers);
  const watchlist = useSelector((state) => state.ticker.watchlist);
  const dispatch = useDispatch();

  const removeFromWatchlistHandler = (ticker) => {
    dispatch(removeFromWatchlist(ticker));
  };

  const getWatchlistTickers = tickers.filter((ticker) =>
    watchlist.includes(ticker.ticker),
  );

  return (
    <section className="WatchList">
      <h2 className="WatchList__title">Watchlist</h2>
      {getWatchlistTickers.length ? (
        <ul className="WatchList__list">
          {getWatchlistTickers.map((ticker) => (
            <li key={ticker.ticker}>
              <TickerItem
                ticker={ticker}
                removeFromWatchlistHandler={removeFromWatchlistHandler}
              />
            </li>
          ))}
        </ul>
      ) : (
        <h3 className="WatchList__empty">
          You do not have tickers in your Watchlist
        </h3>
      )}
    </section>
  );
};
