import { useMemo } from 'react';
import { feedStateSelector, setFeedDateRange as _setFeedDateRange } from '../slice';
import { endOfWeek, startOfWeek } from 'date-fns';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from 'store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFeed = () => {
  const feedState = useAppSelector(feedStateSelector);
  const dispatch = useAppDispatch();

  return useMemo(() => {
    const setFeedDateRange = (date: Date) => {
      const min = startOfWeek(date);

      dispatch(_setFeedDateRange({ changesSince: min.toISOString() }));
    };

    return { feedState, setFeedDateRange };
  }, [feedState, dispatch]);
};
