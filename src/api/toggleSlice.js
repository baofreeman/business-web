import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: { isSidebarRight: true, isSidebarleft: true },
  reducers: {
    setSidebarRight: (state, action) => {
      state.isSidebarRight = action.payload;
    },
    setSidebarLeft: (state, action) => {
      state.isSidebarleft = action.payload;
    },
  },
});

export const { setSidebarRight, setSidebarLeft } = toggleSlice.actions;
export const selectSidebarRight = (state) => state.toggle.isSidebarRight;
export const selectSidebarLeft = (state) => state.toggle.isSidebarleft;

export default toggleSlice.reducer;
