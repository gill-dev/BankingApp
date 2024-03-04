import { useGetAccountsQuery } from '../api';
import { useAccount } from '../hooks/useAccount';
import { AccountList } from './AccountList';

export const Accounts = () => {
  const { data } = useGetAccountsQuery();
  const { selectedAccount, setSelectedAccount } = useAccount();

  return (
    <section className="collection-heading">
      {data && <AccountList selectedAccountId={selectedAccount?.accountUid} accounts={data} />}
    </section>
  );
};
