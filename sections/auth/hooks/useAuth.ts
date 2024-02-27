import { selectCurrentUser } from '@sections/auth';
import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from 'store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);
  return useMemo(() => ({ user }), [user]);
};
