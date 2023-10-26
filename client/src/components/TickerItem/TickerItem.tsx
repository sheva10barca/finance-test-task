import React from 'react';
import classnames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { chooseCurrentTicker } from '../../features/tickerSlice';
import { getLogo } from '../../utils/getLogo';
import { normalizedName } from '../../utils/normalizedName';
import { normalizedDate } from '../../utils/normalizedDate';
import { Ticker } from '../../types/Ticker';

import './TickerItem.scss';

type Props = {
  tickerItem: Ticker;
  addToWatchlistHandler?: (tickerItem: Ticker) => void;
  removeFromWatchlistHandler: (tickerItem: Ticker) => void;
};

export const TickerItem: React.FC<Props> = ({
  tickerItem,
  addToWatchlistHandler,
  removeFromWatchlistHandler,
}) => {
  const dispatch = useAppDispatch();
  const watchlist = useAppSelector((state) => state.ticker.watchlist);

  const { ticker, price, change, last_trade_time } = tickerItem;

  const isOnWatchlist = (tickerName: string) => {
    return watchlist.find((ticker) => ticker.ticker === tickerName);
  };

  const handleCurrentTicker = (tickerItem: Ticker) => {
    dispatch(chooseCurrentTicker(tickerItem));
  };

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tickerName: string,
  ) => {
    e.stopPropagation();

    if (isOnWatchlist(tickerName)) {
      removeFromWatchlistHandler(tickerItem);
    } else if (addToWatchlistHandler) {
      addToWatchlistHandler(tickerItem);
    }
  };

  return (
    <div className="TickerItem" onClick={() => handleCurrentTicker(tickerItem)}>
      <img
        className="TickerItem__logo"
        src={getLogo(ticker)}
        alt="logo"
      />
      <div className="TickerItem__name">{normalizedName(ticker)}</div>
      <div
        className={classnames('TickerItem__price', {
          'price-up': change > price,
          'price-down': change < price,
        })}
      >
        {price}
      </div>
      <div className="TickerItem__date">
        {normalizedDate(last_trade_time)}
      </div>
      <button
        className="TickerItem__btn"
        onClick={(e) => handleButtonClick(e, ticker)}
      >
        {isOnWatchlist(ticker) ? 'Remove' : 'Add'}
      </button>
    </div>
  );
};
