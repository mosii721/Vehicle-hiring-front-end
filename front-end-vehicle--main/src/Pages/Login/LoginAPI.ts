import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prodUrl } from '../../utils/utils';

interface logInUser {
    email: string;
    password: string;
    token: string;
}
export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({ baseUrl: prodUrl }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<logInUser, Partial<logInUser>>({
            query: (user) => ({
                url: 'login',
                method: 'POST',
                body: user,
                
            }),
        }),
        logout: builder.mutation<logInUser, Partial<logInUser>>({
            query: (user) => ({
                url: 'logout',
                method: 'POST',
                body: user,
            }),
            
        })
    }),
});


 export default loginAPI;