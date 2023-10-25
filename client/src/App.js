import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { updateTickers } from './features/tickerSlice';
import { Header } from './components/Header/Header.js';
import { TickersList } from './components/TickersList/TickersList';
import { WatchList } from './components/WatchList/WatchList';
import { TickerModal } from './components/TickerModal/TickerModal';

import './App.scss';

const socket = io('http://localhost:4000');

function App() {
  const dispatch = useDispatch();
  const currentTicker = useSelector((state) => state.ticker.currentTicker);

  useEffect(() => {
    socket.emit('start');

    socket.on('ticker', (data) => {
      dispatch(updateTickers(data));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  console.log(currentTicker);

  return (
    <div className="App">
      <Header />
      <TickersList />
      <WatchList />
      {currentTicker.ticker && <TickerModal />}
    </div>
  );
}

export default App;
