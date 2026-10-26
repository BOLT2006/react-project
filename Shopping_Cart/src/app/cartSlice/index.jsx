import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    { id: 1, name: "Laptop", price: 60000 },
    { id: 2, name: "Camera", price: 45000 },
    { id: 3, name: "Phone", price: 30000 },
  ],
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;