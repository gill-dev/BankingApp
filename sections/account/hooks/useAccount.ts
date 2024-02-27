import { useMemo } from 'react';
import { selectedCurrentAccount, setSelectedAccount as _setSelectedAccount } from '../slice';
import { IAccount } from '../types';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from 'store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAccount = () => {
  const selectedAccount = useAppSelector(selectedCurrentAccount);
  const dispatch = useAppDispatch();

  return useMemo(() => {
    const setSelectedAccount = (account: IAccount) => dispatch(_setSelectedAccount(account));

    return { selectedAccount, setSelectedAccount };
  }, [selectedAccount, dispatch]);
};
