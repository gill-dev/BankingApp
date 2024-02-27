import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { savingsApi } from '../api';
import { ISavingsGoal } from '../types';

type SavingsState = {
  selectedSavings: ISavingsGoal | null;
};

export const savingsSlice = createSlice({
  name: 'savings',
  initialState: { selectedSavings: null } as SavingsState,
  reducers: {
    setSelectedSavings(state, action: PayloadAction<ISavingsGoal>) {
      state.selectedSavings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(savingsApi.endpoints.getSavings.matchPending, (state, { payload }) => {
      state.selectedSavings = null;
    });
  },
});

export const savingsReducer = savingsSlice.reducer;
export const { setSelectedSavings } = savingsSlice.actions;
export const selectedCurrentSavings = (state: RootState) => state.savings.selectedSavings;
