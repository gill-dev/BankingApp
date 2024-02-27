import { converMinorUnits, currencySmybols } from '@common/helpers';
import { format, parseISO } from 'date-fns';
import { FC } from 'react';
import { useGetFeedItemsQuery } from '../api';

interface FeedListProps {
  selected: IAccount;
}

export const TransactionFeedList: FC<FeedListProps> = ({ selected }) => {
 
  const min = new Date().toISOString(); 

  const { data: feedItems, error, isLoading  } = useGetFeedItemsQuery(
    {
      accountUid: selected[0].accountUid,
      categoryUid: selected[0].defaultCategory,
    },
    {
      refetchOnMountOrArgChange: true,

    }
  );
console.log(error)
  return (
    <div>
    {feedItems?.map((item) => (
      <div key={item.feedItemUid}></div>
    ))}
  </div>
  );
};
