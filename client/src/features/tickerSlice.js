import { createSlice } from '@reduxjs/toolkit';

const tickerSlice = createSlice({
  name: 'ticker',
  initialState: { tickers: [], watchlist: [], currentTicker: {} },
  reducers: {
    addTicker: (state, action) => {
      state.tickers.push(action.payload);
    },
    removeTicker: (state, action) => {
      state.tickers = state.tickers.filter(
        (ticker) => ticker !== action.payload,
      );
    },
    updateTickers: (state, action) => {
      state.tickers = action.payload;
    },
    addToWatchlist: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (ticker) => ticker !== action.payload,
      );
    },
    chooseCurrentTicker: (state, action) => {
      state.currentTicker = state.tickers.find(
        (ticker) => ticker.ticker === action.payload.ticker,
      );
    },
    removeCurrentTicker: (state) => {
      state.currentTicker = {};
    },
  },
});

export const {
  addTicker,
  removeTicker,
  updateTickers,
  addToWatchlist,
  removeFromWatchlist,
  chooseCurrentTicker,
  removeCurrentTicker,
} = tickerSlice.actions;
export default tickerSlice.reducer;
