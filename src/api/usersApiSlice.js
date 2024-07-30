/**
 * Get all users at Admin panel.
 * Delete users at Admin panel.
 */

import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const userAdapter = createEntityAdapter({
  selectId: (user) => user?._id,
});
const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users with admin role
    getUsers: builder.query({
      query: () => ({
        url: `/user/all-user`,
        validateStatus: (res, result) => {
          return res.status === 200 && !result.isError;
        },
      }),
      transformResponse: (res, meta, arg) => {
        const loadProducts = res.map((user) => user);
        return userAdapter.setAll(initialState, loadProducts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result?.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),

    // Delete user with admin role
    deleteUser: builder.mutation({
      query: (body) => {
        return {
          url: "/user/delete-user",
          method: "DELETE",
          body: body,
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg?._id }],
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = userApiSlice;
export const selectOrderResult = userApiSlice.endpoints.getUsers.select();
const selectUserData = createSelector(selectOrderResult, (orderResult) => {
  return orderResult.data;
});

// Select get all users.
export const { selectAll: selectAllOrder } = userAdapter.getSelectors(
  (state) => selectUserData(state) ?? initialState
);
