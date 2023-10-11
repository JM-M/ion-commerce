import { useMemo } from 'react';
import algoliasearch from 'algoliasearch';
import useAlgoliaSearch from './useAlgoliaSearch';

const client = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APPLICATION_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_ONLY_API_KEY
);

const useSelectedProductSection = (section: { id: string }) => {
  const { id } = section || {};
  const collectionName = `productSections/${id}/products`;
  const productsAlgoliaIndex = useMemo(() => client.initIndex('products'), []);

  const fetchProductRecords = async (records: { id: string }[]) => {
    if (!records?.length) return [];
    const products = [];
    for (let i = 0; i < records.length; i++) {
      const { id } = records[i];
      const res = await productsAlgoliaIndex.search('', {
        filters: `objectID:${id}`,
      });
      const { hits = [] } = res || {};
      if (hits.length) products.push(hits[0]);
    }
    return products;
  };

  const productsQuery = useAlgoliaSearch({
    index: collectionName,
    pageSize: 10,
    transformRecords: fetchProductRecords,
  });

  return productsQuery;
};

export default useSelectedProductSection;
