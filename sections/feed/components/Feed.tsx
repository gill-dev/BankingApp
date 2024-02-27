import { useAccount } from '@sections/account/hooks/useAccount';
import { FC } from 'react';
import { TransactionFeedList } from './FeedList';
import { useGetAccountsQuery } from "@sections/account";

export const TransactionFeed: FC = () => {
  const { data } = useGetAccountsQuery();

  return (

    <>
      <div className="mt-8 flex justify-between items-center mb-4">
        <h2 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h2>
      </div>
      {data &&
        <TransactionFeedList selected={data} />
      }
    </>

  );
};
