import { useState, useMemo } from 'react';
import ProductCarousel from './ProductCarousel';
import ProductInfo from './ProductInfo';
import ProductVariations from './ProductVariations';
import AddToCartButton from './AddToCartButton';
import ProductDescription from './ProductDescription';
import ProductReviews from './ProductReviews';
import useProducts from '../hooks/useProducts';
import { Product } from '../constants/schemas/product';

interface Props {
  id: string;
}

const ProductDetails = ({ id }: Props) => {
  const [variant, setVariant] = useState<any>({});

  const { productQuery } = useProducts({ productId: id });
  const { isLoading, isError } = productQuery;
  const product: Product = productQuery.data || {};

  const {
    name,
    price,
    description,
    discount,
    stocks = [],
    variations = {},
  } = product;

  const setProductVariant = (key: string, name: string) =>
    setVariant((v: any) => ({ ...v, [key]: name }));

  const variantKeys = Object.keys(variant);
  const images = useMemo(() => {
    return stocks.reduce((images: any[], stock: any) => {
      const { variationCombination } = stock;
      for (let i = 0; i < variantKeys.length; i++) {
        const key = variantKeys[i];
        const value = variant[key];
        if (value !== variationCombination[key]) {
          return images;
        }
      }
      return [...images, ...stock.images];
    }, []);
  }, [stocks, variant, variantKeys]);

  if (isLoading) return 'Loading...';
  if (isError) return 'An error occurred';
  if (!product) return 'No product';

  return (
    <>
      <ProductCarousel images={images} hasVariant={!!variantKeys.length} />
      <ProductInfo name={name} price={price} />
      <ProductVariations
        variations={variations}
        setProductVariant={setProductVariant}
      />
      <AddToCartButton product={product} />
      <ProductDescription description={description} />
      <ProductReviews />
    </>
  );
};

export default ProductDetails;
