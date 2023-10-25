import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import { removeCurrentTicker } from '../../features/tickerSlice';
import { normalizedName } from '../../utils/normalizedName';
import { normalizedDate } from '../../utils/normalizedDate';
import { getLogo } from '../../utils/getLogo';

import './TickerModal.scss';

export const TickerModal = () => {
  const currentTicker = useSelector((state) => state.ticker.currentTicker);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(removeCurrentTicker());
  };

  return (
    <div className="TickerModal">
      <div className="TickerModal__card">
        <header className="TickerModal__head">
          <div className="TickerModal__title">
            {normalizedName(currentTicker.ticker)}
          </div>

          <button
            type="button"
            className="TickerModal__close"
            onClick={handleCloseModal}
          />
        </header>

        <div className="TickerModal__body">
          <div className="TickerModal__company">
            <img
              className="TickerModal__company-logo"
              src={getLogo(currentTicker.ticker)}
              alt="company logo"
            />
          </div>

          <div className="TickerModal__row">
            <div className="TickerModal__row-name">Price:</div>
            <div
              className={classnames('TickerModal__row-data', {
                'data-up': currentTicker.change > currentTicker.price,
                'data-down': currentTicker.change < currentTicker.price,
              })}
            >
              {currentTicker.price}
            </div>
          </div>
          <div className="TickerModal__row">
            <div className="TickerModal__row-name">Dividend:</div>
            <div className="TickerModal__row-data">
              {currentTicker.dividend}
            </div>
          </div>
          <div className="TickerModal__row">
            <div className="TickerModal__row-name">Last trade time:</div>
            <div className="TickerModal__row-data">
              {normalizedDate(currentTicker.last_trade_time)}
            </div>
          </div>
          <div className="TickerModal__row">
            <div className="TickerModal__row-name">Change percent:</div>
            <div className="TickerModal__row-data">
              {currentTicker.change_percent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
