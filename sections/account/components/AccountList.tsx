import { converMinorUnits, currencySmybols } from '@common/helpers';
import clsx from 'clsx';
import { FC } from 'react';
import { IAccount } from '../types';

interface Props {
  accounts: IAccount[];
  selectedAccountId?: string;
}

export const AccountList: FC<Props> = ({ accounts, selectedAccountId }) => {
  return (
    <section className="profile">
      <div className="flex siz-full flex-col gap-4 p-4">
        {accounts.map((account) => (
          <div key={account.accountUid} className="max-w-2xl mx-auto mt-24">
            <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <p className="text-sm text-grey-dark flex items-center">{account.accountType}</p>
              </div>

              <div className="flex flex-col justify-between flex-grow pr-10">
                <h3 className="text-lg font-medium text-gray-900">
                  {' '}
                  {currencySmybols[account.currency]} {converMinorUnits(account.amount.minorUnits).toFixed(2)}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
