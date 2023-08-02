import { Link } from "react-router-dom";
import { IonImg } from "@ionic/react";
import { NAIRA } from "../constants/unicode";
import { Product } from "../constants/schemas/product";
import useCategories from "../hooks/useCategories";
import useProductImages from "../hooks/useProductImages";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { name, category, price, id, stocks } = product;
  const { getCategoryFromValue } = useCategories();
  const categoryName = getCategoryFromValue(category)?.name;

  const images = useProductImages(product);
  const image = !!images.length && images[0];

  return (
    <div>
      <Link to={`/store/products/${id}`} className="block">
        <div className="w-full aspect-[5/6] mb-[10px] bg-gray-100 rounded-lg overflow-hidden">
          {image && <IonImg src={image} alt={name} className="bg-gray-200" />}
        </div>
      </Link>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="block font-medium">{name}</span>
          <span className="text-xs text-gray-500">{categoryName}</span>
        </div>
        <span className="text-base">
          {NAIRA}
          {price}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
