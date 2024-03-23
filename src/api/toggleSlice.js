import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: { isSibarRight: true, isSibarLeft: true },
  reducers: {
    setSibarRight: (state, action) => {
      state.isSibarRight = action.payload;
    },
    setSibarLeft: (state, action) => {
      state.isSibarLeft = action.payload;
    },
  },
});

export const { setSibarRight, setSibarLeft, showSB } = toggleSlice.actions;
export const selectSibarRight = (state) => state.toggle.isSibarRight;
export const selectSibarLeft = (state) => state.toggle.isSibarLeft;

export default toggleSlice.reducer;
