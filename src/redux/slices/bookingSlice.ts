import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBookings, createBooking, getBookingById, getUserBooking } from "../../api/booking";

export const fetchBookings = createAsyncThunk("booking/fetchBookings", async () => {
  const response = await getAllBookings();
  return response;
});

export const addBooking = createAsyncThunk("bookings", async (payload: any) => {
  const response = await createBooking(payload);
  return response;
});

export const fetchBookingById = createAsyncThunk(
  "booking/fetchBookingById",
  async (id: string) => {
    const response = await getBookingById(id);
    return response;
  }
);

export const fetchUserBooking = createAsyncThunk(
  "bookings/userBooking/id",
  async (id: string) => {
    const response = await getUserBooking(id);
    return response;
  }
);

interface BookingState {
  data: any[];
  selectedBooking: any | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BookingState = {
  data: [],
  selectedBooking: null,
  status: "idle",
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearSelectedBooking: (state) => {
      state.selectedBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })

      .addCase(addBooking.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      .addCase(fetchBookingById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedBooking = action.payload;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch booking";
      })

      .addCase(fetchUserBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUserBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
  },
});

export const { clearSelectedBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
