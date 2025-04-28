import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getReportingData } from "../../api/reporting";

export const fetchReporting = createAsyncThunk("reportings", async () => {
  const response = await getReportingData();
  return response;
});

interface ReportingState {
  data: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ReportingState = {
  data: null,
  status: "idle",
  error: null,
};

const reportingSlice = createSlice({
  name: "reporting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReporting.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReporting.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchReporting.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch reports";
      });
  },
});

export default reportingSlice.reducer;
