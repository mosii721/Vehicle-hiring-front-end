import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prodUrl } from '../../utils/utils';

export interface Booking {
  booking_id: number;
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string;
  return_date: string;
  total_amount: number;
  booking_status: string;
  created_at: string;
  updated_at: string;
}

export const HistoryApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({ baseUrl: prodUrl }),
  endpoints: (builder) => ({
    fetchBookings: builder.query<Booking[], void>({
      query: () => 'bookings',
    }),
    fetchBookingById: builder.query<Booking, number>({
      query: (id) => `bookings/${id}`,
    }),
    addBooking: builder.mutation<Booking, Partial<Booking>>({
      query: (booking) => ({
        url: 'bookings',
        method: 'POST',
        body: booking,
      }),
    }),
    updateBooking: builder.mutation<Booking, Partial<Booking>>({
      query: ({ booking_id, ...patch }) => ({
        url: `bookings/${booking_id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
    deleteBooking: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `bookings/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { 
  useFetchBookingsQuery, 
  useFetchBookingByIdQuery, 
  useAddBookingMutation, 
  useUpdateBookingMutation, 
  useDeleteBookingMutation 
}: any = HistoryApi;
