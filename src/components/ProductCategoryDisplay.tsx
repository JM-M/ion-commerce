import React, { useMemo } from 'react';
import useAlgoliaSearch from '../hooks/useAlgoliaSearch';
import ProductGrid from './ProductGrid';
import Button from './Button';
import useCategories from '../hooks/useCategories';

interface Props {
  category: string;
}

const ProductCategoryDisplay = ({ category }: Props) => {
  const { categoriesQuery } = useCategories();
  const categories = categoriesQuery.data?.docs;

  const filters = useMemo(() => {
    if (!categories?.length || !category || category === '/') return '';
    return `category:${category}`;
  }, [category, categories]);

  const {
    data = { allDocs: [] },
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useAlgoliaSearch({
    index: 'products',
    pageSize: 10,
    options: { filters },
  });

  const { allDocs: products } = data;

  return (
    <>
      <ProductGrid
        products={products}
        initialLoading={isLoading && !products?.length}
        loadingMore={isFetching}
        onLoadMore={fetchNextPage}
      />
      {hasNextPage && (
        <Button
          color='secondary'
          className='block !h-30 w-fit mx-auto mt-[30px] font-medium rounded-[8px]'
          onClick={fetchNextPage}
          loading={isFetching}
        >
          Load more
        </Button>
      )}
    </>
  );
};

export default ProductCategoryDisplay;
