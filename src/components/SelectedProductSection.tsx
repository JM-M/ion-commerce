import ProductGrid from './ProductGrid';
import Button from './Button';
import useSelectedProductSection from '../hooks/useSelectedProductSection';

interface Props {
  id: string;
  numProducts?: number;
}

const SelectedProductSection = ({ id, numProducts = 10 }: Props) => {
  const {
    data = { allDocs: [] },
    isFetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useSelectedProductSection({ id, pageSize: numProducts });
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

export default SelectedProductSection;
