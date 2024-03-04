import { Amount } from 'types';

export type FeedItem = {
  feedItemUid: string;
  transactionTime: string;
  direction: 'IN' | 'OUT';
  source: string;
  amount: Amount;
  status: string;
  counterPartyName: string;
  roundup: {
    goalCategoryUid: string;
    amount: Amount;
  };
};

export type SetFeedDateRange = {
  changesSince: string | null;
};