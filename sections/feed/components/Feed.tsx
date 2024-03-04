
import { useAccount } from '@sections/account/hooks/useAccount';
import { FC } from 'react';
import { useGetFeedItemsQuery } from '../api';
import { useFeed } from '../hooks/useFeed';
import { TransactionFeedList } from './FeedList';
import { Profile } from './FeedSelector';

export const TransactionFeed: FC = () => {
  const { selectedAccount } = useAccount();
  const {
    feedState: { changesSince },
  } = useFeed();
  const { data, isError, isLoading, isFetching } = useGetFeedItemsQuery(
    {
      accountUid: selectedAccount?.accountUid,
      categoryUid: selectedAccount?.defaultCategory,
      changesSince
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !(selectedAccount?.accountUid && selectedAccount?.defaultCategory && changesSince),
    }
  );

  const displayMessage = (): string | undefined => {
    if (isError) {
      return 'Looks Like an Error occurred.';
    }
    if (!selectedAccount?.accountUid) {
      return 'Select an account.';
    }
    if (!changesSince) {
      return 'Select a date';
    }
    return undefined;
  };

  if (!selectedAccount) {
    return <div>Select a user account</div>;
  }

  return (
    <section className='profile'>
  
      <TransactionFeedList displayMessage={displayMessage()} isLoading={isLoading || isFetching} feed={data} />
    </section>
  );
};