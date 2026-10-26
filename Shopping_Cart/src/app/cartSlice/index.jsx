import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      name: "MacBook Pro 16\"",
      category: "Laptops",
      price: 149999,
      originalPrice: 169999,
      rating: 4.9,
      reviewsCount: 320,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
      description: "Apple M3 Pro chip, 18GB Unified Memory, 512GB SSD, Liquid Retina XDR display.",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Sony Alpha 7 IV Camera",
      category: "Cameras",
      price: 89999,
      originalPrice: 99999,
      rating: 4.8,
      reviewsCount: 185,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
      description: "33MP Full-Frame Exmor R CMOS sensor, 4K 60p, real-time Eye AF.",
      badge: "Pro Choice",
    },
    {
      id: 3,
      name: "iPhone 15 Pro",
      category: "Smartphones",
      price: 79999,
      originalPrice: 89999,
      rating: 4.8,
      reviewsCount: 540,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
      description: "Aerospace-grade titanium, A17 Pro chip, 48MP camera system with 5x zoom.",
      badge: "Popular",
    },
    {
      id: 4,
      name: "Sony WH-1000XM5 Headphones",
      category: "Audio",
      price: 26999,
      originalPrice: 32999,
      rating: 4.9,
      reviewsCount: 420,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      description: "Industry-leading noise cancellation, dual processors, 30hr battery life.",
      badge: "Top Rated",
    },
    {
      id: 5,
      name: "Apple Watch Ultra 2",
      category: "Wearables",
      price: 49999,
      originalPrice: 54999,
      rating: 4.7,
      reviewsCount: 210,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      description: "Rugged 49mm titanium case, precision dual-frequency GPS, 100m water resistance.",
      badge: "Adventure",
    },
    {
      id: 6,
      name: "Keychron Q1 Pro Wireless",
      category: "Accessories",
      price: 14999,
      originalPrice: 17999,
      rating: 4.6,
      reviewsCount: 95,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
      description: "QMK/VIA wireless custom mechanical keyboard with CNC aluminum chassis.",
      badge: "Hot",
    },
  ],
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter((i) => i.id !== action.payload);
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;