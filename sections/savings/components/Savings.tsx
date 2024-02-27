

import { useAccount } from '@sections/account/hooks/useAccount';
import { useCreateGoalMutation, useGetSavingsQuery } from '../api';
import { useSavings } from '../hooks/useSavings';
import { SavingsList } from './SavingsList';
import { Button } from '@components/ui/button';

export const Savings = () => {
  const { selectedAccount } = useAccount();
  const { data, isLoading, isUninitialized } = useGetSavingsQuery(selectedAccount?.accountUid, {
    refetchOnMountOrArgChange: true,
    skip: !selectedAccount?.accountUid,
  });
  const { setSelectedSavings, selectedSavings } = useSavings();
  const [createGoal, result] = useCreateGoalMutation();

  return (
    <section className='profile'>
      <div className="flex siz-full flex-col gap-4 p-4">
        <h2 className="text-lg leading-6 font-medium text-gray-900 text-active-500 gap-4">Savings Goals</h2>
      </div>
      {data && (
        <SavingsList
    
          selecteddGoalUid={selectedSavings?.savingsGoalUid}
          savingsList={data}
        />
      )}
      <div className="flex justify-between items-center gap-4 p-4">
        <Button
          onClick={() =>
            selectedAccount &&
            createGoal({
              accountUid: selectedAccount.accountUid,
              name: 'Harley Davidson',
              currency: selectedAccount.currency,
              target: {
                minorUnits: 50000,
                currency: selectedAccount.currency,
              },
            })
          }
        >
          Generate a goal
        </Button>
      </div>
    </section>

  );
};
