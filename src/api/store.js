/**
 * Create Store cart, auth, country, toggle, ApiSlice products, orders, users.
 */

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice, productSlice } from "./apiSlice";
import toggleSlice from "./toggleSlice";
import cartSlice from "./cartSlice";
import countrySlice from "./countrySlice";

const store = configureStore({
  reducer: {
    [productSlice.reducerPath]: productSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    toggle: toggleSlice,
    cart: cartSlice,
    country: countrySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiSlice.middleware,
      productSlice.middleware,
    ]),
  devTools: true,
});

export default store;
