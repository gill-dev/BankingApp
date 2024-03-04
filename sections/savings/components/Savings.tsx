import { useAccount } from '@sections/account/hooks/useAccount';
import { useCreateGoalMutation, useGetSavingsQuery } from '../api';
import { useSavings } from '../hooks/useSavings';
import { SavingsList } from './SavingsList';
import { Button } from '@components/ui/button';
import { Profile } from '@sections/feed/components/FeedSelector';
import { TransactionFeed } from '@sections/feed';

export const Savings = () => {
  const { selectedAccount } = useAccount();
  const { data, isLoading, isUninitialized } = useGetSavingsQuery(selectedAccount?.accountUid, {
    refetchOnMountOrArgChange: true,
    skip: !selectedAccount?.accountUid,
  });
  const { setSelectedSavings, selectedSavings } = useSavings();
  const [createGoal, result] = useCreateGoalMutation();

  if (isLoading) {
    return <div>Savings Loading...</div>;
  }

  return (
    <>
     <section className='profile'>
        <Profile/>
    </section>  
    <section className="savings">
      {data && <SavingsList onGoalSelect={setSelectedSavings} selecteddGoalUid={selectedSavings?.savingsGoalUid} savingsList={data} />}
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

    <section>
    <section className='profile'>
  
  <TransactionFeed/>
</section>
    </section>
   
    </>
  );
};
