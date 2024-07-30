import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import queryString from "query-string";

const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    paramsSerializer: (params) => {
      console.log(params);
      if (params !== "") {
        return queryString.stringify(params);
      }
    },
    credentials: "include",
  }),
  tagTypes: ["Auth", "User", "Order", "UNKNOWN_ERROR", "UNAUTHORIZED"],
  endpoints: () => ({}),
});

const productSlice = createApi({
  reducerPath: "productSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    paramsSerializer: (params) => {
      // if (params !== "" && params.search && params.page) {
      //   return queryString.stringify(params.search, params.page);
      // }
      // if (params !== "" && params.page) {
      //   return queryString.stringify(params.page);
      // }
      if (params !== "") {
        return queryString.stringify({
          search: params.search,
          page: params.page,
        });
      }
    },
    credentials: "include",
  }),
  tagTypes: ["Product", "Search", "Variant"],
  endpoints: () => ({}),
});

export { apiSlice, productSlice };
