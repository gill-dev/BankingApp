import { converMinorUnits, currencySmybols } from '@common/helpers';
import { Table, TableColumn } from '@components/shared/Table';
import { format, parseISO } from 'date-fns';
import { FC } from 'react';
import { FeedItem } from '../types';

const columns: TableColumn<FeedItem>[] = [
  {
    title: 'Transaction',
    field: 'counterPartyName',
  },
  {
    title: 'Amount',
    field: 'amount',
    textAlign: 'right',
    Cell({ entry: { amount, direction } }) {
      return (
        <span>
          {`${direction === 'IN' ? '+' : ''}${currencySmybols[amount.currency]}${converMinorUnits(
            amount.minorUnits
          ).toFixed(2)} `}
          <span className="font-bold">{amount.currency}</span>
        </span>
      );
    },
  },
  {
    title: 'Status',
    field: 'status',
    textAlign: 'right',
    Cell({ entry: { status } }) {
      return (
        // In a prod app I'd have this in its own component and and status as a prop
        // The prop value is used to apply the appriopriate styles such as color eg. yellow for PENDING
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
          {status}
        </span>
      );
    },
  },
  {
    title: 'Direction',
    field: 'direction',
    textAlign: 'center',
    Cell({ entry: { direction } }) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 capitalize">
          {direction}
        </span>
      );
    },
  },
  {
    title: 'Created At',
    field: 'transactionTime',
    textAlign: 'right',
    Cell({ entry: { transactionTime } }) {
      //TODO: format date here
      // In a real world app, I'd use the the date-fns library to formate the date to a better radable format
      return <span>{format(parseISO(transactionTime), "do MMMM yyyy 'at' p")}</span>;
    },
  },
];

interface FeedListProps {
  feed: FeedItem[] | undefined;
  isLoading?: boolean;
  displayMessage?: string;
}
export const TransactionFeedList: FC<FeedListProps> = ({ feed, isLoading, displayMessage }) => {
  return (
    <Table<FeedItem>
      isLoading={isLoading}
      data={feed}
      displayMessage={displayMessage}
      idField="feedItemUid"
      columns={columns}
    />
  );
};