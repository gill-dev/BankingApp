import bankClient from '@common/bankClient';
import { BANKAPI } from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import nc, { RequestHandler } from 'next-connect';
import { FeedItem } from '@sections/feed';

const handler = nc<NextApiRequest, NextApiResponse>();


const getTransactionFeed: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res, next) => {

  try {
    const { accountUid, categoryUid, minDate, maxDate } = req.query;
    console.log(accountUid)
    const { data: { feedItems }, } = await bankClient.get<{ feedItems: FeedItem[] }>(
      BANKAPI.FEED.items.replace('$accountUid', accountUid as string).replace('$categoryUid', categoryUid as string),
      {
        params: {
          minTransactionTimestamp: minDate,
          maxTransactionTimestamp: maxDate,
        },
      }
    );
console.log()
    return res.status(200).json({ feed: feedItems });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

handler.get(getTransactionFeed);

export default handler;
