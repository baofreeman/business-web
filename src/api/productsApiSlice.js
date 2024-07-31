/**
 * Add new product at Admin panel, includes name, desc, image, variants, color, price, sku.
 * Update products.
 * Delete products.
 * Get all products.
 * Get Variants of product.
 * Search, filter products based on query params.
 */

import { createSelector, createEntityAdapter, current } from "@reduxjs/toolkit";
import { productSlice } from "./apiSlice";
import queryString from "query-string";

// Product Apdapter
export const productAdapter = createEntityAdapter({
  selectId: (product) => product?._id,
});

// InitState Product
export const initialState = productAdapter.getInitialState();
let preArgs;
export const productsApiSlice = productSlice.injectEndpoints({
  endpoints: (builder) => ({
    //GET All product and filter product based on query params.
    getProducts: builder.query({
      query: ({ page }) => {
        console.log(page);
        return {
          url: page ? `/product?page=${page}` : "/product",
          method: "GET",
          params: { page },
        };
      },

      transformResponse: (res) => {
        const loadProducts = res.map((product) => product);
        return productAdapter.setAll(initialState, loadProducts);
      },
      keepUnusedDataFor: 5,
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        if (Object.keys(queryArgs).length === 0) return endpointName;
        if (queryArgs) return `ScrollingPage`;
      },
      merge: (cached, newItems, { arg }) => {
        const { page } = arg;
        if (page >= 1) {
          const select = productAdapter.getSelectors().selectAll(newItems);
          console.log(select);
          const currentCached = productAdapter.getSelectors().selectAll(cached);
          return productAdapter.setAll(initialState, [
            ...currentCached,
            ...select,
          ]);
        }
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Product", id: "LIST" },
            ...result?.ids.map((id) => ({ type: "Product", id })),
          ];
        } else return [{ type: "Product", id: "LIST" }];
      },
    }),

    getFilterProducts: builder.query({
      query: ({ category, search, page }) => {
        console.log(category, search, page);
        const parser = queryString.stringify(search);
        const url = `/product/${category}?${parser}&page=${page}`;
        if (page === 1) {
          preArgs = { category, page };
        }
        return {
          url: url,
          method: "GET",
          params: { search, page },
        };
      },
      transformResponse: (res) => {
        const loadProducts = res.map((product) => product);
        return productAdapter.setAll(initialState, loadProducts);
      },
      keepUnusedDataFor: 5,
      serializeQueryArgs: ({ endpointName, queryArgs }) => endpointName,
      merge: (cached, newItems, { arg }) => {
        const { page, category } = arg;
        const select = productAdapter.getSelectors().selectAll(newItems);
        if (category !== preArgs.category || page === 1) {
          preArgs = arg;
          return productAdapter.setAll(initialState, [...select]);
        }
        const currentCached = productAdapter.getSelectors().selectAll(cached);
        return productAdapter.setAll(initialState, [
          ...currentCached,
          ...select,
        ]);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Product", id: "LIST" },
            ...result?.ids.map((id) => ({ type: "Product", id })),
          ];
        } else return [{ type: "Product", id: "LIST" }];
      },
    }),

    addProduct: builder.mutation({
      query: (body) => {
        return {
          url: "/product/create-product",
          method: "POST",
          body: body,
          formData: true,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg?._id },
      ],
    }),

    // Update product based on form at Admin panel.
    updateProduct: builder.mutation({
      query: (body) => {
        return {
          url: `/product/update-product`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg?._id },
      ],
    }),

    // Delete product bases on productId.
    deleteProduct: builder.mutation({
      query: ({ productId }) => {
        return {
          url: `/product/delete-product`,
          method: "DELETE",
          body: { productId },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg?._id },
      ],
    }),

    // Get Variants of Product bases on productId.
    getVariants: builder.query({
      query: (itemId) => ({
        url: `/product/variants/${itemId}`,
      }),
      keepUnusedDataFor: 5,
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: (result, error, id) => [{ type: "Variant", id }],
    }),

    // Search product based on name.
    seachProduct: builder.query({
      query: (key) => ({
        url: `/product/search/${key}`,
      }),
      keepUnusedDataFor: 2,
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: (result, error, id) => [{ type: "Search", id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductsCategoryQuery,
  useGetFilterProductsQuery,
  useLazyGetFilterProductsQuery,
  useAddProductMutation,
  useLazySeachProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useLazyGetVariantsQuery,
} = productsApiSlice;

export const selectProductResult =
  productsApiSlice.endpoints.getProducts.select({});

export const selectProductData = createSelector(
  selectProductResult,
  (productResult) => productResult.data
);

// Select get all product.
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductsIds,
} = productAdapter.getSelectors(
  (state) => selectProductData(state) ?? initialState
);

export const getSelectors = (query) => {
  const selectSetup = productsApiSlice.endpoints.getProducts.select(query);
  const adapterSelectors = createSelector(selectSetup, (result) =>
    productAdapter.getSelectors(() => result?.data ?? initialState)
  );
  return {
    selectAll: createSelector(adapterSelectors, (state) =>
      state.selectAll(undefined)
    ),
    selectEntities: createSelector(adapterSelectors, (state) =>
      state.selectEntities(undefined)
    ),
    selectIds: createSelector(adapterSelectors, (state) =>
      state.selectIds(undefined)
    ),
    selectTotal: createSelector(adapterSelectors, (state) =>
      state.selectTotal(undefined)
    ),
    selectById: (id) =>
      createSelector(adapterSelectors, (state) => state.selectById(state, id)),
  };
};

export const getFilterSelectors = (query) => {
  const selectSetup =
    productsApiSlice.endpoints.getProductsCategory.select(query);
  const adapterSelectors = createSelector(selectSetup, (result) =>
    productAdapter.getSelectors(() => result?.data ?? initialState)
  );
  return {
    selectAll: createSelector(adapterSelectors, (state) =>
      state.selectAll(undefined)
    ),
    selectEntities: createSelector(adapterSelectors, (state) =>
      state.selectEntities(undefined)
    ),
    selectIds: createSelector(adapterSelectors, (state) =>
      state.selectIds(undefined)
    ),
    selectTotal: createSelector(adapterSelectors, (state) =>
      state.selectTotal(undefined)
    ),
    selectById: (id) =>
      createSelector(adapterSelectors, (state) => state.selectById(state, id)),
  };
};
