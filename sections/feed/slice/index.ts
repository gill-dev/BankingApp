import { converMinorUnits } from '@common/helpers';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { feedApi } from '../api';
import { SetFeedDateRange } from '../types';

type FeedState = {
  roundUp: number;
} & SetFeedDateRange;

export const feedSlice = createSlice({
  name: 'account',
  initialState: { minDate: null, maxDate: null, roundUp: 0 } as FeedState,
  reducers: {
    setFeedDateRange(state, action: PayloadAction<SetFeedDateRange>) {
      state.minDate = action.payload.minDate;
      state.maxDate = action.payload.maxDate;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(feedApi.endpoints.getFeedItems.matchFulfilled, (state, { payload }) => {
        state.roundUp = payload.reduce((prev, curr) => {
          if (curr.direction === 'OUT' && curr.source !== 'INTERNAL_TRANSFER') {
            const roundUp = converMinorUnits(curr.amount.minorUnits);
            return prev + (Math.ceil(roundUp) - roundUp);
          }
          return prev;
        }, 0);
      })
      .addMatcher(feedApi.endpoints.getFeedItems.matchPending, (state, { payload }) => {
        state.roundUp = 0;
      });
  },
});

export const feedReducer = feedSlice.reducer;
export const { setFeedDateRange } = feedSlice.actions;
export const feedStateSelector = (state: RootState) => state.feed;
