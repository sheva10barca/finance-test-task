import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import { chooseCurrentTicker } from '../../features/tickerSlice';
import { getLogo } from '../../utils/getLogo';
import { normalizedName } from '../../utils/normalizedName';
import { normalizedDate } from '../../utils/normalizedDate';

import './TickerItem.scss';

export const TickerItem = ({
  ticker,
  addToWatchlistHandler,
  removeFromWatchlistHandler,
}) => {
  const dispatch = useDispatch();

  const isOnWatchlist = useSelector((state) =>
    state.ticker.watchlist.includes(ticker.ticker),
  );

  const handleCurrentTicker = (ticker) => {
    dispatch(chooseCurrentTicker(ticker));
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();

    if (isOnWatchlist) {
      removeFromWatchlistHandler(ticker.ticker);
    } else {
      addToWatchlistHandler(ticker.ticker);
    }
  };

  return (
    <div className="TickerItem" onClick={() => handleCurrentTicker(ticker)}>
      <img
        className="TickerItem__logo"
        src={getLogo(ticker.ticker)}
        alt="logo"
      />
      <div className="TickerItem__name">{normalizedName(ticker.ticker)}</div>
      <div
        className={classnames('TickerItem__price', {
          'price-up': ticker.change > ticker.price,
          'price-down': ticker.change < ticker.price,
        })}
      >
        {ticker.price}
      </div>
      <div className="TickerItem__date">
        {normalizedDate(ticker.last_trade_time)}
      </div>
      <button className="TickerItem__btn" onClick={handleButtonClick}>
        {isOnWatchlist ? 'Remove' : 'Add'}
      </button>
    </div>
  );
};
