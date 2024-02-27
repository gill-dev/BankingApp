import { useMemo } from 'react';
import { selectedCurrentSavings, setSelectedSavings as _setSelectedSavings } from '../slice';
import { ISavingsGoal } from '../types';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from 'store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSavings = () => {
  const selectedSavings = useAppSelector(selectedCurrentSavings);
  const dispatch = useAppDispatch();

  return useMemo(() => {
    const setSelectedSavings = (goal: ISavingsGoal) => dispatch(_setSelectedSavings(goal));

    return { selectedSavings, setSelectedSavings };
  }, [selectedSavings, dispatch]);
};
