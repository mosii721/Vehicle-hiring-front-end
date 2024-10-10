import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prodUrl } from '../../utils/utils';

export interface RegisterData {
  full_name: string;
  email: string;
  role: 'admin' | 'user';
  address: string;
  password: string;
  contact_phone: number;
}

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: fetchBaseQuery({ baseUrl: prodUrl }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<void, RegisterData>({
      query: (newUser) => ({
        url: 'register',
        method: 'POST',
        body: newUser,
      }),
    }),
  }),
});

export const { 
    useFetchRegisterQuery, 
    useRegisterUserMutation
   
  }: any = registerApi;
