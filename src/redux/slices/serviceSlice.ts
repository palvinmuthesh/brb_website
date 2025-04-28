import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllServices } from "../../api/service";

export const fetchServices = createAsyncThunk("services", async () => {
  const response = await getAllServices();
  return response;
});

interface ServiceState {
  data: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ServiceState = {
  data: [],
  status: "idle",
  error: null,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch services";
      });
  },
});

export default serviceSlice.reducer;
