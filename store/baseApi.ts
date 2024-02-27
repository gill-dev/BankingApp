import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { NEXTAPI } from 'config';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['GetAccounts', 'GetSavings', 'GetFeedItems'],
  baseQuery: fetchBaseQuery({ baseUrl: NEXTAPI.BASE_URL }),
  endpoints: () => ({}),
});
