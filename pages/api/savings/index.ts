import bankClient from '@common/bankClient';
import { BANKAPI } from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import nc, { RequestHandler } from 'next-connect';
import { IPutSavingsGoalResponse, ISavingsGoal } from '@sections/savings';

const handler = nc<NextApiRequest, NextApiResponse>();

const getSavings: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res, next) => {
  const { accountUid } = req.query;
  try {
    const {
      data: { savingsGoalList },
    } = await bankClient.get<{ savingsGoalList: ISavingsGoal[] }>(
      BANKAPI.SAVINGS.goals.replace('$accountUid', accountUid as string)
    );
    return res.status(200).json({ savingsGoalList });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const createGoal: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res, next) => {
  const { accountUid } = req.query;
  const goal = req.body;

  try {
    const { data } = await bankClient.put<IPutSavingsGoalResponse>(
      BANKAPI.SAVINGS.goals.replace('$accountUid', accountUid as string),
      goal
    );

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

handler.get(getSavings).put(createGoal);

export default handler;
