import { configureStore } from '@reduxjs/toolkit';

import tickerReducer from '../features/tickerSlice';

export const store = configureStore({
  reducer: {
    ticker: tickerReducer,
  },
});
