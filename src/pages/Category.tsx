import { useState } from 'react';
import { useIonRouter, IonContent } from '@ionic/react';
import { CategoryHeader } from '../components/CategoryHeader';
import ProductCategoryDisplay from '../components/ProductCategoryDisplay';
import { SortOption } from '../hooks/useProducts';

const SORT_OPTIONS: { [option: string]: SortOption } = {
  'Most popular': { field: 'ranking', reverse: false },
  'Least popular': { field: 'ranking', reverse: true },
  Newest: { field: 'createdAt', reverse: false },
  Oldest: { field: 'createdAt', reverse: true },
};

const Category = () => {
  const [sortOption, setSortOption] = useState<string>();
  const [productFilters, setProductFilters] = useState<object>({});

  const ionRouter = useIonRouter();
  const {
    routeInfo: { pathname },
  } = ionRouter;
  const baseUrlPath = '/store/category';
  let category = pathname.replace(baseUrlPath, '');

  const sortBy = sortOption ? SORT_OPTIONS[sortOption] : undefined;

  return (
    <>
      <CategoryHeader
        sortOptions={SORT_OPTIONS}
        setSortOption={setSortOption}
      />
      <IonContent>
        <div className='container pb-[30px]'>
          <ProductCategoryDisplay category={category} />
        </div>
      </IonContent>
    </>
  );
};

export default Category;
