import { useMemo } from 'react';
import algoliasearch from 'algoliasearch';
import { useQuery } from '@tanstack/react-query';

const client = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APPLICATION_ID,
  import.meta.env.VITE_ALGOLIA_ADMIN_API_KEY
);

type AlgoliaRecord = { [key: string]: any };

interface Props {
  index: string;
}

const useAlgoliaBrowse = (props: Props) => {
  const index = useMemo(() => client.initIndex(props.index), [props.index]);
  const noIndex = !props.index;

  const browseFn = async () => {
    if (noIndex) return null;
    await index.browseObjects({
      batch: (hit) => console.log(hit),
    });

    return [];
  };

  const browseQuery = useQuery({
    queryKey: ['algolia-browse', props?.index],
    queryFn: browseFn,
  });

  return browseQuery;
};

export default useAlgoliaBrowse;
