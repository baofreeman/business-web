import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.subCategory.model.skus._id ===
            action.payload.subCategory.model.skus._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].qty += 1;
        state.cartItems = [...state.cartItems];
        state.cartTotalQuantity += 1;
        state.cartTotalAmount += action.payload.subCategory.model.skus.price;
      } else {
        let newItem = { ...action.payload, qty: 1 };
        state.cartItems = [...state.cartItems, newItem];
        state.cartTotalAmount += action.payload.subCategory.model.skus.price;
        state.cartTotalQuantity += 1;
      }
    },
    decrToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.subCategory.model.skus._id ===
            action.payload.subCategory.model.skus._id
      );
      if (itemIndex >= 0 && state.cartItems[itemIndex].qty > 1) {
        state.cartItems[itemIndex].qty -= 1;
        state.cartTotalQuantity -= 1;
        state.cartTotalAmount -=
          state.cartItems[itemIndex].subCategory.model.skus.price;
      }
    },

    deleteCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.subCategory.model.skus._id ===
            action.payload.subCategory.model.skus._id
      );
      if (itemIndex >= 0) {
        state.cartTotalQuantity -= state.cartItems[itemIndex].qty;
        state.cartTotalAmount -=
          state.cartItems[itemIndex].subCategory.model.skus.price *
          state.cartItems[itemIndex].qty;
        state.cartItems.splice(itemIndex, 1);
      }
    },
    resetCart: (state, action) => {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
    },
  },
});
export const { addToCart, decrToCart, deleteCart, resetCart } =
  cartSlice.actions;
export const selectCartItem = (state) => state.cart.cartItems;
export const selectTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectTotalQuatity = (state) => state.cart.cartTotalQuantity;
export default cartSlice.reducer;
