import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type PackingItem = {
  id: string;
  name: string;
  packed: boolean;
};

type PackingListState = {
  items: PackingItem[];
};

const initialState: PackingListState = {
  items: [],
};

const packingListSlice = createSlice({
  name: 'packingList',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.items.push({
        id: action.payload.id,
        name: action.payload.name,
        packed: false,
      });
    },
    togglePacked: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.packed = !item.packed;
    },
    editItem: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.name = action.payload.name;
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    unpackAll: (state) => {
      state.items.forEach((i) => (i.packed = false));
    },
  },
});

export const { addItem, togglePacked, editItem, deleteItem, unpackAll } =
  packingListSlice.actions;
export default packingListSlice.reducer;
