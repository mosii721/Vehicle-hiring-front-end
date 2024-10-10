import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prodUrl } from '../../utils/utils';


interface Ticket {
  id: number;
  user_id: number;
  subject: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const ticketsApi = createApi({
  reducerPath: 'ticketsApi',
  baseQuery: fetchBaseQuery({ baseUrl: prodUrl }),
  endpoints: (builder) => ({
    fetchTickets: builder.query<Ticket[], void>({
      query: () => '/customer-support',
    }),
    createTicket: builder.mutation<Ticket, Omit<Ticket, 'id'>>({
      query: (newTicket) => ({
        url: '/customer-support',
        method: 'POST',
        body: newTicket,
      }),
    }),
  }),
});

export const { useFetchTicketsQuery,
   useCreateTicketMutation }:any = ticketsApi;


