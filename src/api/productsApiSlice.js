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
      query: ({ category, tag, color, size }) => ({
        url:
          !category && !tag && !color && !size
            ? `/product`
            : category && !tag && !color && !size
            ? `/product/trait?category=${category}`
            : category && tag && !color && !size
            ? `/product/trait?category=${category}&tag=${tag}`
            : category && tag && color && !size
            ? `/product/trait?category=${category}&tag=${tag}&color=${color}`
            : !category && tag && color && !size
            ? `product/trait?tag=${tag}&color=${color}`
            : !category && !tag && color && !size
            ? `product/trait?color=${color}`
            : category && !tag && color && size
            ? `product/trait?category=${category}&color=${color}&size=${size}`
            : category && !tag && color && !size
            ? `product/trait?category=${category}&color=${color}`
            : !category && !tag && !color && size
            ? `product/trait?size=${size}`
            : !category && !tag && color && size
            ? `product/trait?color=${color}&size=${size}`
            : !category && tag && color && size
            ? `product/trait?tag=${tag}&color=${color}&size=${size}`
            : !category && tag && !color && size
            ? `product/trait?tag=${tag}&size=${size}`
            : category && tag && color && size
            ? `product/trait?category=${category}&tag=${tag}&color=${color}&size=${size}`
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

    updateProduct: builder.mutation({
      query: (body) => {
        return {
          url: `/product`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg?._id },
      ],
    }),

    deleteProduct: builder.mutation({
      query: ({ productId }) => {
        return {
          url: `/product`,
          method: "DELETE",
          body: { productId },
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
  useDeleteProductMutation,
  useUpdateProductMutation,
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
