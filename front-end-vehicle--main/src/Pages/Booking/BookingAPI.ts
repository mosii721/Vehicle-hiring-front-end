import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prodUrl } from '../../utils/utils';

export interface BookingData {
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string;
  return_date: string;
  total_amount: number;
  booking_status: 'Pending' | 'Confirmed' | 'Cancelled';
}

export const BookingpaymentApim = createApi({
  reducerPath: 'BookingpaymentApim',
  baseQuery: fetchBaseQuery({ baseUrl: prodUrl }),
  endpoints: (builder) => ({
    fetchRentalRate: builder.query<{ rental_rate: number }, string>({
      query: (vehicleId) => `/vehicles/${vehicleId}`,
    }),
    createBooking: builder.mutation<any, BookingData>({
      query: (bookingData) => ({
        url: 'bookings',
        method: 'POST',
        body: bookingData,
      }),
    }),
    createPaymentIntent: builder.mutation<{ client_secret: string }, { booking_id: number; amount: number }>({
      query: (paymentData) => ({
        url: 'payments',
        method: 'POST',
        body: paymentData,
      }),
    }),
  }),
});

export const { useFetchRentalRateQuery,
     useCreateBookingMutation,
     useCreatePaymentMutation,
      useCreatePaymentIntentMutation
     } :any= BookingpaymentApim;
