import { Amount } from 'types';

export interface IAccount {
  accountUid: string;
  defaultCategory: string;
  currency: 'GBP' | 'EUR';
  createdAt: string;
  accountType: string;
  name: string;
  amount: Amount;
}
