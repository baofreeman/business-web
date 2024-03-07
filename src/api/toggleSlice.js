import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: { isSibarRight: true, isSibarLeft: true, category: "áo" },
  reducers: {
    setSibarRight: (state, action) => {
      state.isSibarRight = action.payload;
    },
    setSibarLeft: (state, action) => {
      state.isSibarLeft = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setSibarRight, setSibarLeft, setCategory } = toggleSlice.actions;
export const selectSibarRight = (state) => state.toggle.isSibarRight;
export const selectSibarLeft = (state) => state.toggle.isSibarLeft;
export const selectCategory = (state) => state.toggle.category;

export default toggleSlice.reducer;
