import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: intialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload?.items || [];
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
