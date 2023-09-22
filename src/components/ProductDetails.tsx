import { useState, useMemo } from 'react';
import ProductCarousel from './ProductCarousel';
import ProductInfo from './ProductInfo';
import ProductVariations from './ProductVariations';
import AddToCartButton from './AddToCartButton';
import ProductDescription from './ProductDescription';
import ProductReviews from './ProductReviews';
import PageLoader from './PageLoader';
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

  const { name, price, description, variations = {}, rating } = product;

  const setProductVariant = (key: string, name: string) =>
    setVariant((v: any) => ({ ...v, [key]: name }));

  const variantKeys = Object.keys(variant);

  // has the user selected all necessary variantions
  const variantValid = useMemo(() => {
    const variationKeys = Object.keys(variations);
    let variantValid = true;
    for (let index = 0; index < variationKeys.length; index++) {
      const key = variationKeys[index];
      const variationOptions = (variations as any)[key];
      if (!!variationOptions?.length && !variant[key]) {
        variantValid = false;
        break;
      }
    }
    return variantValid;
  }, [variations, variant]);

  if (isLoading) return <PageLoader />;
  if (isError) return <>An error occurred</>;
  if (!product) return <>No product</>;

  return (
    <>
      <ProductCarousel product={product} hasVariant={!!variantKeys.length} />
      <ProductInfo name={name} price={price} rating={rating} />
      <ProductVariations
        variant={variant}
        variations={variations}
        setProductVariant={setProductVariant}
      />
      <AddToCartButton
        product={product}
        variant={variant}
        variantValid={variantValid}
      />
      <ProductDescription description={description} />
      <ProductReviews />
    </>
  );
};

export default ProductDetails;
