import { NEXTAPI } from 'config';
import { baseApi } from 'store/baseApi';
import { IUser } from '../types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<IUser, void>({
      query: () => NEXTAPI.USER.user,
      transformResponse: (response: { user: IUser }, meta, arg) => response.user,
    }),
  }),
});

export const { useGetCurrentUserQuery } = authApi;
