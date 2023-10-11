import { useMemo } from 'react';
import algoliasearch from 'algoliasearch';
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

const client = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APPLICATION_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_ONLY_API_KEY
);

// type AlgoliaRecord = { [key: string]: any };

interface Props {
  index: string;
  pageSize: number;
  options?: any;
  facets?: any;
  transformRecords?: Function;
}

export type QueryData = {
  docs: any[];
  pages: any;
  pagesData: any[];
  totalDocs: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type QueryFn = (arg: any) => any;

const useAlgoliaSearch = (props: Props) => {
  const { pageSize, transformRecords } = props;
  const indexName = encodeURIComponent(props.index);
  const index = useMemo(() => client.initIndex(indexName), [indexName]);
  const noIndex = !indexName;

  const browseFn: QueryFn = async ({ pageParam = 0 }: any) => {
    if (noIndex) return null;
    const options: any = {
      analytics: false,
      hitsPerPage: pageSize,
      page: pageParam,
      ...(props.options || {}),
    };

    const res = await index.search('', options);

    const {
      hits,
      nbHits,
      nbPages,
      page, // page index
    } = res;

    const nextCursor = page < nbPages - 1 ? page + 1 : undefined;

    let docs = hits;
    if (transformRecords) docs = await transformRecords(hits);

    return { ...res, docs, page, nextCursor, totalDocs: nbHits };
  };

  const getNextPageParam = (lastPage: any, allPages: [][]) =>
    lastPage.nextCursor;

  const browseQuery = useInfiniteQuery({
    queryKey: ['algolia-query', props],
    queryFn: browseFn,
    getNextPageParam,
    select: (data) => ({
      ...data,
      allDocs: Object.values(data.pages)
        .map((page) => page?.docs)
        .flat(),
    }),
  });

  return browseQuery as UseInfiniteQueryResult<any, unknown> & {
    data: { allDocs: any[]; pageParams: any[]; pages: any[] };
  };
};

export default useAlgoliaSearch;
