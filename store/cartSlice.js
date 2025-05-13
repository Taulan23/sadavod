import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    addItem(state, action) {
      const existingItem = state.items.find(
        (item) =>
          item.itemId === action.payload.itemId &&
          item.itemSize === action.payload.itemSize
      );

      if (existingItem) {
        existingItem.itemQuantity = (
          parseInt(existingItem.itemQuantity) + 1
        ).toString();
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
