import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProvince = createAsyncThunk(`country/province`, async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/country/provinces`
    );
    return res.data;
  } catch (error) {
    return error.message;
  }
});

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
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

const countrySlice = createSlice({
  name: "country",
  initialState: { province: [], district: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProvince.fulfilled, (state, action) => {
      state.province = action.payload.results;
    });
    builder.addCase(fetchDistrict.fulfilled, (state, action) => {
      state.district = action.payload.results;
    });
  },
});

const getProvince = (state) => state?.country?.province;
const getDistrict = (state) => state?.country?.district;
export { getProvince, getDistrict };
export default countrySlice.reducer;
