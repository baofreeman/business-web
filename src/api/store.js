import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import toggleSlice from "./toggleSlice";
import cartSlice from "./cartSlice";
import countrySlice from "./countrySlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    toggle: toggleSlice,
    cart: cartSlice,
    auth: authSlice,
    country: countrySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
