import ProductGrid from './ProductGrid';
import useProducts, { SortOption } from '../hooks/useProducts';

interface Props {
  sortBy?: SortOption;
  category: string;
}

const ProductCategoryDisplay: React.FC<Props> = ({ category, sortBy }) => {
  const { productsQuery } = useProducts({
    category: category === '/' ? '' : category,
    sortBy: sortBy,
  });

  return (
    <div className='p-5'>
      <ProductGrid
        products={productsQuery.data}
        initialLoading={productsQuery.isLoading}
      />
    </div>
  );
};

export default ProductCategoryDisplay;
