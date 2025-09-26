import { configureStore } from '@reduxjs/toolkit';
import packingListReducer from './packing-list-slice';
export const store = configureStore({
  reducer: {
    packingList: packingListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
