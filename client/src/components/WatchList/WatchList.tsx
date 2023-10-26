import React from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeFromWatchlist } from '../../features/tickerSlice';
import { Ticker } from '../../types/Ticker';
import { TickerItem } from '../TickerItem/TickerItem';

import './WatchList.scss';

export const WatchList: React.FC = () => {
  const watchlist = useAppSelector((state) => state.ticker.watchlist);
  const dispatch = useAppDispatch();

  const removeFromWatchlistHandler = (tickerItem: Ticker) => {
    dispatch(removeFromWatchlist(tickerItem));
  };

  return (
    <section className="WatchList">
      <h2 className="WatchList__title">Watchlist</h2>
      {watchlist.length > 0 ? (
        <ul className="WatchList__list">
          {watchlist.map((tickerItem) => (
            <li key={tickerItem.ticker}>
              <TickerItem
                tickerItem={tickerItem}
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
