import { configureStore } from '@reduxjs/toolkit';
import packingListReducer from './packing-list-slice';

export const createStore = () =>
  configureStore({
    reducer: {
      packingList: packingListReducer,
    },
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
