import { NEXTAPI } from 'config';
import { baseApi } from 'store/baseApi';
import { IAccount } from '../types';

export const accountsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query<IAccount[], void>({
      query: () => NEXTAPI.ACCOUNTS.accounts,
      transformResponse: (response: { accounts: IAccount[] }, meta, arg) => response.accounts,
      providesTags: ['GetAccounts'],
    }),
  }),
});

export const { useGetAccountsQuery } = accountsApi;
