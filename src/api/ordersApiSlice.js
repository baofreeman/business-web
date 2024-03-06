import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const orderAdapter = createEntityAdapter({
  selectId: (order) => order?._id,
});
const initialState = orderAdapter.getInitialState();

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => ({
        url: `/order`,
        validateStatus: (res, result) => {
          return res.status === 200 && !result.isError;
        },
      }),
      transformResponse: (res, meta, arg) => {
        const loadOrders = res.map((order) => order);
        return orderAdapter.setAll(initialState, loadOrders);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Order", id: "LIST" },
            ...result?.ids.map((id) => ({ type: "Order", id })),
          ];
        } else return [{ type: "Order", id: "LIST" }];
      },
    }),

    addOrder: builder.mutation({
      query: (body) => {
        return {
          url: "/order",
          method: "POST",
          body: body,
          formData: true,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Order", id: arg?._id },
      ],
    }),
  }),
});

export const { useGetOrderQuery, useAddOrderMutation } = ordersApiSlice;
export const selectOrderResult = ordersApiSlice.endpoints.getOrder.select();
const selectOrderData = createSelector(selectOrderResult, (orderResult) => {
  return orderResult.data;
});
export const { selectAll: selectAllOrder } = orderAdapter.getSelectors(
  (state) => selectOrderData(state) ?? initialState
);
