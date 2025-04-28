import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bookingReducer from './slices/bookingSlice';
import vendorReducer from './slices/vendorSlice';
import serviceReducer from './slices/serviceSlice';
import reportingReducer from './slices/reportingSlice';
import locationReducer from './slices/locationSlices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    vendor: vendorReducer,
    service: serviceReducer,
    reporting: reportingReducer,
    locations: locationReducer
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in dev
});

// Inferred types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
