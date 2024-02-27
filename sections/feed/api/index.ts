import { NEXTAPI } from 'config';
import { baseApi } from 'store/baseApi';
import { FeedItem } from '../types';

type QueryParams = {
  accountUid?: string;
  categoryUid?: string;
  changesSince?: string;
};

export const feedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedItems: builder.query<FeedItem[], QueryParams>({
      query: ({ accountUid, categoryUid, changesSince }) => ({
        url: NEXTAPI.FEED.items,
        params: {
          accountUid,
          categoryUid,
          changesSince
        },
      }),
      transformResponse: (response: { feed: FeedItem[] }, meta, arg) => response.feed,
      providesTags: ['GetFeedItems'],
    }),
  }),
});

export const { useGetFeedItemsQuery } = feedApi;
