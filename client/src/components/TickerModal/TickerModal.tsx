import React from 'react';
import classnames from 'classnames';

import { useAppDispatch } from '../../app/hooks';
import { removeCurrentTicker } from '../../features/tickerSlice';
import { normalizedName } from '../../utils/normalizedName';
import { normalizedDate } from '../../utils/normalizedDate';
import { getLogo } from '../../utils/getLogo';
import { Ticker } from '../../types/Ticker';

import './TickerModal.scss';

type Props = {
  currentTicker: Ticker;
};

export const TickerModal: React.FC<Props> = ({ currentTicker }) => {
  const dispatch = useAppDispatch();

  const { 
    ticker, 
    change,
    price,
    dividend,
    last_trade_time,
    change_percent,
   } = currentTicker;

  const handleCloseModal = () => {
    dispatch(removeCurrentTicker());
  };

  return (
    <div className="TickerModal">
      <div className="TickerModal__card">
        <header className="TickerModal__head">
          <div className="TickerModal__title">{normalizedName(ticker)}</div>

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
              src={getLogo(ticker)}
              alt="company logo"
            />
          </div>

          <div className="TickerModal__row">
            <div className="TickerModal__row-name">Price:</div>
            <div
              className={classnames('TickerModal__row-data', {
                'data-up': change > price,
                'data-down': change < price,
              })}
            >
              {price}
            </div>
          </div>
          <div className="TickerModal__row">
            <div className="TickerModal__row-name">Dividend:</div>
            <div className="TickerModal__row-data">{dividend}</div>
          </div>
          <div className="TickerModal__row">
            <div className="TickerModal__row-name">Last trade time:</div>
            <div className="TickerModal__row-data">
              {normalizedDate(last_trade_time)}
            </div>
          </div>
          <div className="TickerModal__row">
            <div className="TickerModal__row-name">Change percent:</div>
            <div className="TickerModal__row-data">{change_percent}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
