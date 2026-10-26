import { createSlice } from "@reduxjs/toolkit";

// We are creating our own state like(useState)
export const counterSlice = createSlice({
  name: "counter",
  initialState: 10,
  reducers: {
    increaseby1: (state) => state + 1,
    increaseby10: (state) => state + 10,
    decreaseby1: (state) => state - 1,
    decreaseby10: (state) => state - 10,

    // increase by value
    increasebyvalue: (state, action) => (state += action.payload),
  },
});

export const { increaseby1, increaseby10, decreaseby1, decreaseby10 , increasebyvalue } =
  counterSlice.actions;

export default counterSlice.reducer;
