/**
 * Used createAsyncThunk and Axios.
 * Call API Province.
 * Find District based on provinceId params.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Call API Provinces.
export const fetchProvince = createAsyncThunk(`country/province`, async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/country/provinces`
    );
    return res.data; // result
  } catch (error) {
    return error.message;
  }
});

// Call API Districts based on provinceId.
export const fetchDistrict = createAsyncThunk(
  `country/district`,
  async (provinceId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/country/districts/${provinceId}`,
        {
          data: {
            provinceId: provinceId,
          },
        }
      );
      return res.data; // result
    } catch (error) {
      return error.message;
    }
  }
);

// CreateSlice
const countrySlice = createSlice({
  name: "country",
  initialState: { province: [], district: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProvince.fulfilled, (state, action) => {
      state.province = action.payload.results; // Update state province
    });
    builder.addCase(fetchDistrict.fulfilled, (state, action) => {
      state.district = action.payload.results; // Update state district
    });
  },
});

const getProvince = (state) => state?.country?.province; // Get Pronvice
const getDistrict = (state) => state?.country?.district; // Get Distrist
export { getProvince, getDistrict };
export default countrySlice.reducer;
