import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prodUrl } from '../../utils/utils';


export const supportApi = createApi({
  reducerPath: 'supportApi',
  baseQuery: fetchBaseQuery({ baseUrl: prodUrl }),
  endpoints: (builder) => ({
    fetchTickets: builder.query<Ticket[], void>({
      query: () => '/customer-support',
    }),
    deleteTicket: builder.mutation<void, number>({
      query: (ticketId) => ({
        url: `/customer-support/${ticketId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useFetchTicketsQuery,
     useDeleteTicketMutation } : any= supportApi;

interface Ticket {
  ticket_id: number;
  user_id: number;
  subject: string;
  description: string;
  status: string;
  created_at: string;
}
