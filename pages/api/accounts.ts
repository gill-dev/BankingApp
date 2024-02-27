import bankClient from '@common/bankClient';
import { BANKAPI } from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import { IAccount } from 'sections/account';
import nc, { RequestHandler } from 'next-connect';
import { Amount } from 'types';

const handler = nc<NextApiRequest, NextApiResponse>();

const getAccounts: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res, next) => {
  try {
    const {
      data: { accounts },
    } = await bankClient.get<{ accounts: IAccount[] }>(BANKAPI.ACCOUNTS.accounts);

    let response = await Promise.all(
      accounts.map(async (account) => {
        const response = await bankClient.get<{ amount: Amount }>(
          BANKAPI.ACCOUNTS.balance.replace('$accountUid', account.accountUid)
        );

        return {
          ...account,
          amount: response.data.amount,
        };
      })
    );

    return res.status(200).json({ accounts: response });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

handler.get(getAccounts);

export default handler;
