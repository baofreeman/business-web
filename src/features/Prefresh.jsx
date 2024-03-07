import React, { useEffect } from "react";
import store from "../api/store";
import { productsApiSlice } from "../api/productsApiSlice";
import { Outlet } from "react-router-dom";
import toggleSlice, { setSibarRight } from "../api/toggleSlice";

const Prefresh = () => {
  useEffect(() => {
    store.dispatch(
      productsApiSlice.util.prefetch("getProducts", "allProduct", {
        force: true,
      })
    );
  }, []);
  return <Outlet />;
};

export default Prefresh;
