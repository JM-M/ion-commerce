import { IonButton, IonSpinner } from '@ionic/react';
import ProductCard from './ProductCard';
import PageLoader from './PageLoader';
import { SortOption } from '../hooks/useProducts';
import { ProductAlgoliaRecord } from '../constants/schemas/product';
import ProductGridSkeleton from './skeletons/ProductGridSkeleton';

interface Props {
  products?: ProductAlgoliaRecord[];
  initialLoading?: boolean;
  onLoadMore?: Function;
  loadingMore?: boolean;
}

const ProductGrid = ({ products = [], initialLoading = false }: Props) => {
  if (initialLoading) return <ProductGridSkeleton />;

  return (
    <ul className='grid grid-cols-2 gap-5'>
      {products.map((product: ProductAlgoliaRecord, i: number) => {
        return (
          <li key={i}>
            <ProductCard product={product} />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductGrid;
