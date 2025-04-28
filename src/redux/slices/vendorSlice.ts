import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllVendors } from "../../api/vendor";

export const fetchVendors = createAsyncThunk("vendor/allVendors", async () => {
  const response = await getAllVendors();
  return response;
});

interface VendorState {
  data: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: VendorState = {
  data: [],
  status: "idle",
  error: null
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch vendors";
      });
  },
});

export default vendorSlice.reducer;
