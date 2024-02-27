import bankClient from '@common/bankClient';
import { IUser } from 'sections/auth';
import { BANKAPI } from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import nc, { RequestHandler } from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>();

const getUser: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res, next) => {
  try {
    const { data } = await bankClient.get<IUser>(BANKAPI.USER.identity);

    return res.status(200).json({ user: data });
  } catch (error: any) {
    const err = error?.response?.data;

    if (err && err.error === 'invalid_token') {
      return res.status(403).json({ error: err });
    }

    return res.status(500).json({ error });
  }
};

handler.get(getUser);

export default handler;
