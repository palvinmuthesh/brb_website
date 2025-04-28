// src/api/booking.ts
import axios from "./index";

// Types
export interface CreateBookingDto {
  userId: string;
  vendorId: string;
  date: string;
  time: string;
}

export const createBooking = async (data: CreateBookingDto) => {
  const response = await axios.post("/bookings", data);
  return response.data;
};

export const getAllBookings = async () => {
  const response = await axios.get("/bookings");
  return response.data;
};

export const getBookingById = async (id: string) => {
  const response = await axios.get(`/bookings/${id}`);
  return response.data;
};

export const getUserBooking = async (id: string) => {
  const response = await axios.get(`/bookings/userBooking/${id}`);
  return response.data;
};
