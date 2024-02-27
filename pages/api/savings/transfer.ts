import bankClient from '@common/bankClient';
import { BANKAPI } from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import nc, { RequestHandler } from 'next-connect';
import { ISavingsGoalTransferResponse } from '@sections/savings';
import { randomUUID } from 'crypto';
import { Amount } from 'types';

const handler = nc<NextApiRequest, NextApiResponse>();

const transferToGoal: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res, next) => {
  const { accountUid, savingsGoalUid } = req.query;
  const amount: Amount = req.body;
  try {
    const { data } = await bankClient.put<ISavingsGoalTransferResponse>(
      BANKAPI.SAVINGS.transferToGoal
        .replace('$accountUid', accountUid as string)
        .replace('$savingsGoalUid', savingsGoalUid as string)
        .replace('$transferUid', randomUUID()),
      { amount }
    );

    return res.status(200).json(data);
  } catch (error) {
    // In a prod app error handling would be done differently
    return res.status(500).json({ error });
  }
};

handler.put(transferToGoal);

export default handler;
