import { useMemo } from "react";
import { Product } from "../constants/schemas/product";


const useProductImages = (product: Product) => {
  const {stocks} = product
  const images = useMemo(() => {
    return stocks.reduce((images: any[], stock: any) => {
      return [...images, ...stock.images];
    }, []);
  }, [stocks]);

  return images
};

export default useProductImages;
