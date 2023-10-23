import { useMemo } from 'react';
import { Product } from '../constants/schemas/product';

export const getProductImages = (stocks: any[]) => {
  if (!stocks) return [];
  return stocks.reduce((images: any[], stock: any) => {
    return [...images, ...stock.images];
  }, []);
};

const useProductImages = (product: Product) => {
  const { stocks } = product;
  const images = useMemo(() => getProductImages(stocks), [stocks]);
  return images;
};

export default useProductImages;
