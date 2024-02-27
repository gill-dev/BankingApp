import { NextPage } from 'next';
import Layout from '@components/shared/Layout';
import { Accounts } from '@sections/account';

const AccountsPage: NextPage = () => {
  return (
    <Layout>
      <Accounts />
    </Layout>
  );
};

export default Accounts;