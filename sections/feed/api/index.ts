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
      query: ({ accountUid, categoryUid, changesSince }) => {
                const baseUrl = NEXTAPI.FEED.items;
        const hasQueryParams = baseUrl.includes('?');
                const queryParams = [
          accountUid ? `accountUid=${accountUid}` : '',
          categoryUid ? `categoryUid=${categoryUid}` : '',
          changesSince ? `changesSince=${changesSince}` : ''
        ].filter(Boolean).join('&'); 
        const url = `${baseUrl}${hasQueryParams ? '&' : '?'}${queryParams}`;

        return { url };
      },
      transformResponse: (response: { feed: FeedItem[] }, meta, arg) => response.feed,
      providesTags: ['GetFeedItems'],
    }),
  }),
});

export const { useGetFeedItemsQuery } = feedApi;
