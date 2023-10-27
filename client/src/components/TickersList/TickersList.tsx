import React, { useState, useMemo } from 'react';
import classnames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addToWatchlist,
  removeFromWatchlist,
} from '../../features/tickerSlice';
import { TickerItem } from '../TickerItem/TickerItem';
import { Ticker } from '../../types/Ticker';
import { getPreparedTickers } from '../../utils/getPreparedTickers';
import { tickersSort } from '../../utils/tickersSort';

import './TickersList.scss';

export const TickersList: React.FC = () => {
  const tickers = useAppSelector((state) => state.ticker.tickers);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState('');
  const [sortDirections, setSortDirections] = useState<Record<string, boolean>>(
    { ticker: false, price: false },
  );

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

  const filteredTickers = getPreparedTickers(tickers, query);

  const visibleTickers = useMemo(() => {
    return tickersSort(filteredTickers, sortType, sortDirections);
  }, [sortType, filteredTickers, sortDirections]);

  const handleSortBy = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newSortType: string,
  ) => {
    e.preventDefault();

    setSortType(newSortType);
    setSortDirections((prevDirections) => ({
      ...prevDirections,
      [newSortType]: !prevDirections[newSortType],
    }));
  };

  return (
    <section className="TickersList">
      <div className="TickersList__header">
        <div className="TickersList__sort">
          <div className="TickersList__sort-title">Sort by:</div>
          <button
            className={classnames('TickersList__sort-button', {
              'isSorting-asc': sortType === 'ticker' && sortDirections.ticker,
              'isSorting-desc': sortType === 'ticker' && !sortDirections.ticker,
            })}
            onClick={(e) => handleSortBy(e, 'ticker')}
          >
            Name
          </button>
          <button
            className={classnames('TickersList__sort-button', {
              'isSorting-asc': sortType === 'price' && sortDirections.price,
              'isSorting-desc': sortType === 'price' && !sortDirections.price,
            })}
            onClick={(e) => handleSortBy(e, 'price')}
          >
            Price
          </button>
        </div>
        <input
          className="TickersList__search"
          type="search"
          value={query}
          placeholder="Search ticker by name"
          onChange={(e) => handleQuery(e.target.value)}
        />
      </div>
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
