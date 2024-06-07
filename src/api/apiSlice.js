import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SERVER_URL,
  // baseUrl: "http://localhost:8000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

//refresh token basequery
const baseQueryWithReAuth = async (args, api, extraOpitons) => {
  let result = await baseQuery(args, api, extraOpitons);
  if (result?.error?.status === 403) {
    console.log("sending refresh token");
    const refreshResult = await baseQuery("/auth/refresh", api, extraOpitons);
    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult?.data }));
      result = await baseQuery(args, api, extraOpitons);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "You login has expire";
      }
      return refreshResult;
    }
  }
  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Product", "User", "Order"],
  endpoints: () => ({}),
});

export { apiSlice };
