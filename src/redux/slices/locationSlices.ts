import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllLocations } from "../../api/locations";

export const fetchLocations = createAsyncThunk("locations", async () => {
  const response = await getAllLocations();
  return response;
});

interface LocationState {
  data: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: LocationState = {
  data: [],
  status: "idle",
  error: null,
};

const serviceSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch services";
      });
  },
});

export default serviceSlice.reducer;
