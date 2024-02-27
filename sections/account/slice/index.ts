import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { accountsApi } from '../api';
import { IAccount } from '../types';

type AccountState = {
  selectedAccount: IAccount | null;
};

export const accountSlice = createSlice({
  name: 'account',
  initialState: { selectedAccount: null } as AccountState,
  reducers: {
    setSelectedAccount(state, action: PayloadAction<IAccount>) {
      state.selectedAccount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(accountsApi.endpoints.getAccounts.matchFulfilled, (state, { payload }) => {
      state.selectedAccount = payload[0];
    });
  },
});

export const accountReducer = accountSlice.reducer;
export const { setSelectedAccount } = accountSlice.actions;
export const selectedCurrentAccount = (state: RootState) => state.account.selectedAccount;
