import { configureStore } from '@reduxjs/toolkit';
import { poketmonSlice } from './slice';

export const store = configureStore({
  reducer: {
    poketmon: poketmonSlice.reducer,
  },
});
