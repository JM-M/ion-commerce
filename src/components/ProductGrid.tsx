import { Product } from '../constants/schemas/product';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}

const ProductGrid = ({ products = [] }: Props) => {
  return (
    <ul className='grid grid-cols-2 gap-5'>
      {products.map((product: Product, index: number) => (
        <ProductCard key={index} product={product} />
      ))}
    </ul>
  );
};

export default ProductGrid;
