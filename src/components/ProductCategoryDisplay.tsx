import { useEffect, useMemo, useRef, useState } from 'react';
import {
  IonButton,
  IonHeader,
  IonModal,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonContent,
  IonTitle,
  IonRange,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import useAlgoliaSearch from '../hooks/useAlgoliaSearch';
import ProductGrid from './ProductGrid';
import ProductRow from './ProductRow';
import Button from './Button';
import ProductFilterForm from './ProductFilterForm';
import useCategories from '../hooks/useCategories';

interface Props {
  category: string;
  numProducts?: number;
  displayType?: 'row' | 'grid';
}

const ProductCategoryDisplay = ({
  category,
  numProducts = 10,
  displayType = 'grid',
}: Props) => {
  const [queryFilter, setQueryFilter] = useState<any>();
  const { categoriesQuery, getCategoryFromValue } = useCategories();
  const categories = categoriesQuery.data?.docs;
  console.log(categories);

  const filters = useMemo(() => {
    let categoryLevelIds = '';
    if (categories?.length && category && category !== '/') {
      categoryLevelIds = category
        .split('/')
        .filter((v: string) => v)
        .reduce(
          (levels: string[], curr: string) => [
            ...levels,
            (levels[levels.length - 1] || '') + '/' + curr,
          ],
          []
        )
        .map(
          (value: string, i: number) =>
            `category_level_${i + 1}:${getCategoryFromValue(value)?.id}`
        )
        .join(' AND ');
    }

    const hasPriceFilter = !isNaN(queryFilter?.price?.min);
    const queryFilterString = hasPriceFilter
      ? `${categoryLevelIds ? ' AND ' : ''}price:${queryFilter.price.min} TO ${
          queryFilter.price.max
        }${queryFilter.discounted ? ' AND discount > 0 ' : ''}`
      : '';

    return categoryLevelIds + queryFilterString;
  }, [category, categories, queryFilter]);

  const {
    data = { allDocs: [], pages: [] },
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useAlgoliaSearch({
    index: 'products',
    pageSize: numProducts,
    options: { filters, facets: 'price' },
  });

  // to get facets stats
  const facetsQuery = useAlgoliaSearch({
    index: 'products',
    pageSize: 1,
    options: { facets: 'price' },
  });

  const filterModal = useRef<HTMLIonModalElement>(null);

  const closeModal = () => {
    filterModal.current?.dismiss();
  };

  const { allDocs: products } = data;
  const { pages = [] } = facetsQuery?.data || {};
  const facetStats = !!pages.length && pages[0].facets_stats;
  const minPrice = facetStats?.price?.min;
  const maxPrice = facetStats?.price?.max;

  useEffect(() => {
    setQueryFilter({
      price: { min: minPrice, max: maxPrice },
      discounted: false,
    });
  }, [category, minPrice, maxPrice]);

  return (
    <>
      <IonModal
        ref={filterModal}
        trigger='filter-open-button'
        // initialBreakpoint={0.5}
      >
        <IonHeader className='ion-no-border'>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonButton onClick={closeModal}>
                <IonIcon icon={closeOutline} className='h-[24px] w-[24px]' />
              </IonButton>
            </IonButtons>
            <IonTitle>Filter products</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className='flex flex-col'>
            <ProductFilterForm
              minPrice={minPrice}
              maxPrice={maxPrice}
              filter={queryFilter}
              setFilter={setQueryFilter}
              close={closeModal}
              category={category}
            />
          </div>
        </IonContent>
      </IonModal>
      {displayType === 'grid' ? (
        <ProductGrid
          products={products}
          initialLoading={isLoading && !products?.length}
          loadingMore={isFetching}
          onLoadMore={fetchNextPage}
        />
      ) : displayType === 'row' ? (
        <ProductRow
          products={products}
          initialLoading={isLoading && !products?.length}
          loadingMore={isFetching}
          onLoadMore={fetchNextPage}
        />
      ) : null}
      {hasNextPage && displayType === 'grid' && (
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
