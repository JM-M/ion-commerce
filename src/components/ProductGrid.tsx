import ProductCard from './ProductCard';
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
    <ul className='grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4'>
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
