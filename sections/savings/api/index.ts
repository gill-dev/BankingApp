import { NEXTAPI } from 'config';
import { baseApi } from 'store/baseApi';
import {
  IPutSavingsGoalRequest,
  IPutSavingsGoalResponse,
  ISavingsGoal,
  ISavingsGoalTransferRequest,
  ISavingsGoalTransferResponse,
} from '../types';

export const savingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSavings: builder.query<ISavingsGoal[], string | undefined>({
      query: (accountUid) => ({ url: NEXTAPI.SAVINGS.goals, params: { accountUid } }),
      providesTags: ['GetSavings'],
      transformResponse: (response: { savingsGoalList: ISavingsGoal[] }, meta, arg) => response.savingsGoalList,
    }),
    createGoal: builder.mutation<IPutSavingsGoalResponse, IPutSavingsGoalRequest>({
      query: ({ accountUid, ...goal }) => ({
        url: NEXTAPI.SAVINGS.goals,
        method: 'PUT',
        params: { accountUid },
        body: goal,
      }),
      invalidatesTags: ['GetSavings'],
    }),
    transferToGoal: builder.mutation<ISavingsGoalTransferResponse, ISavingsGoalTransferRequest>({
      query: ({ accountUid, savingsGoalUid, amount }) => ({
        url: NEXTAPI.SAVINGS.transferToGoal,
        method: 'PUT',
        params: { accountUid, savingsGoalUid },
        body: amount,
      }),
      invalidatesTags: ['GetSavings', 'GetAccounts', 'GetFeedItems'],
    }),
  }),
});

export const { useGetSavingsQuery, useCreateGoalMutation, useTransferToGoalMutation } = savingsApi;
