import React, { useEffect } from 'react';
import io from 'socket.io-client';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { updateTickers, updateWatchlist } from './features/tickerSlice';
import { Header } from './components/Header/Header';
import { TickersList } from './components/TickersList/TickersList';
import { WatchList } from './components/WatchList/WatchList';
import { TickerModal } from './components/TickerModal/TickerModal';
import { Ticker } from './types/Ticker';

import './App.scss';

const socket = io('http://localhost:4000');

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTicker = useAppSelector((state) => state.ticker.currentTicker);

  useEffect(() => {
    socket.emit('start');

    socket.on('ticker', (data: Ticker[]) => {
      dispatch(updateTickers(data));
      dispatch(updateWatchlist(data));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <TickersList />
      <WatchList />
      {currentTicker && <TickerModal currentTicker={currentTicker} />}
    </div>
  );
}
