import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { authApi } from '../api';
import { IUser } from '../types';

type AuthState = {
  user: IUser | null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.getCurrentUser.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const authReducer = authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
