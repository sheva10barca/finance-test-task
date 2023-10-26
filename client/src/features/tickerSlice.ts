import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Ticker } from '../types/Ticker';

interface TickerState {
  tickers: Ticker[];
  watchlist: Ticker[];
  currentTicker: Ticker | null;
}

const initialState: TickerState = {
  tickers: [],
  watchlist: [],
  currentTicker: null,
};

const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: {
    updateTickers: (state, action: PayloadAction<Ticker[]>) => {
      state.tickers = action.payload;
      state.currentTicker = action.payload.find(ticker => ticker.ticker === state.currentTicker?.ticker) || null;
    },
    addToWatchlist: (state, action: PayloadAction<Ticker>) => {
      state.watchlist.push(action.payload);
    },
    removeFromWatchlist: (state, action: PayloadAction<Ticker>) => {
      state.watchlist = state.watchlist.filter((ticker) => ticker.ticker !== action.payload.ticker);
    },
    chooseCurrentTicker: (state, action: PayloadAction<Ticker>) => {
      state.currentTicker = state.tickers.find((ticker) => ticker.ticker === action.payload.ticker)
      || null;
    },
    removeCurrentTicker: (state) => {
      state.currentTicker = null;
    },
    updateWatchlist: (state, action: PayloadAction<Ticker[]>) => {
      action.payload.forEach((updatedTicker) => {
        const existingTicker = state.watchlist.find((existingTicker) => existingTicker.ticker === updatedTicker.ticker);

        if (existingTicker) {
          Object.assign(existingTicker, updatedTicker);
        }
      });
    },
  },
});

export const {
  updateTickers,
  addToWatchlist,
  removeFromWatchlist,
  chooseCurrentTicker,
  removeCurrentTicker,
  updateWatchlist
} = tickerSlice.actions;
export default tickerSlice.reducer;
