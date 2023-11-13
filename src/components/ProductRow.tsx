import ProductCard from './ProductCard';
import { ProductAlgoliaRecord } from '../constants/schemas/product';
import ProductGridSkeleton from './skeletons/ProductGridSkeleton';

interface Props {
  products?: ProductAlgoliaRecord[];
  initialLoading?: boolean;
  onLoadMore?: Function;
  loadingMore?: boolean;
}

const ProductRow = ({ products = [], initialLoading = false }: Props) => {
  if (initialLoading) return <ProductGridSkeleton />;

  return (
    <ul className='flex gap-5 overflow-x-auto scrollbar-hide'>
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

export default ProductRow;
