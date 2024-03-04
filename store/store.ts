import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authReducer } from '@sections/auth';
import { accountReducer } from '@sections/account';
import { savingsReducer } from '@sections/savings';
import { baseApi } from './baseApi';
import { feedReducer } from '@sections/feed';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    account: accountReducer,
    savings: savingsReducer,
    feed: feedReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
