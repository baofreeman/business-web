import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const productAdapter = createEntityAdapter({
  selectId: (product) => product?._id,
});
const initialState = productAdapter.getInitialState();

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET All product and filter product
    getProducts: builder.query({
      query: ({ tag, color, size }) => ({
        url:
          !tag && !color && !size
            ? `/product`
            : tag && !color && !size
            ? `/product/trait?tag=${tag}`
            : !tag && color && !size
            ? `/product/trait?color=${color}`
            : !tag && !color && size
            ? `/product/trait?size=${size}`
            : tag && color && !size
            ? `product/trait?tag=${tag}&color=${color}`
            : tag && !color && size
            ? `product/trait?tag=${tag}&size=${size}`
            : !tag && color && size
            ? `product/trait?color=${color}&size=${size}`
            : tag && color && size
            ? `product/trait?tag=${tag}&color=${color}&size=${size}`
            : `/product`,
        validateStatus: (res, result) => {
          return res.status === 200 && !result.isError;
        },
      }),
      keepUnusedDataFor: 5,
      serializeQueryArgs: ({ queryArgs }) => queryArgs,
      transformResponse: (res, meta, arg) => {
        const loadProducts = res.map((product) => product);
        return productAdapter.setAll(initialState, loadProducts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Product", id: "LIST" },
            ...result?.ids.map((id) => ({ type: "Product", id })),
          ];
        } else return [{ type: "Product", id: "LIST" }];
      },
    }),

    // POST product
    addProduct: builder.mutation({
      query: (body) => {
        return {
          url: "/product",
          method: "POST",
          body: body,
          formData: true,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg?._id },
      ],
    }),

    // POST item in product
    getItem: builder.query({
      query: (itemId) => ({
        url: `/product/${itemId}`,
      }),
      keepUnusedDataFor: 2,
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    seachProduct: builder.query({
      query: (key) => ({
        url: `/product/search/${key}`,
      }),
      keepUnusedDataFor: 2,
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetItemQuery,
  useAddProductMutation,
  useSeachProductQuery,
} = productsApiSlice;

export const selectProductResult =
  productsApiSlice.endpoints.getProducts.select();

const selectProductData = createSelector(
  selectProductResult,
  (productResult) => {
    return productResult.data;
  }
);

export const { selectAll: selectAllProducts } = productAdapter.getSelectors(
  (state) => selectProductData(state) ?? initialState
);
