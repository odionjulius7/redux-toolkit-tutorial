import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice"; // reducer slice
import modalReducer from "./features/modal/modalSlice"; // modal slice
export const store = configureStore({
  reducer: {
    // store contains all the slice and the reducers that modifies the state in each slice
    cart: cartReducer,
    modal: modalReducer,
  },
});
