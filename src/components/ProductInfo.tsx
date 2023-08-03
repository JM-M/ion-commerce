import { string } from "yup";
import { NAIRA } from "../constants/unicode";
import ProductStars from "./ProductStars";
import Rating from "./Rating";

interface Props {
  name: string;
  price: number;
  rating: number;
}

const ProductInfo = ({ name, price, rating }: Props) => {
  return (
    <div className="container pt-4 flex flex-col gap-[10px]">
      <h3 className="font-medium">{name}</h3>
      <span>
        {NAIRA} {price}
      </span>
      <ProductStars max={5} value={rating} />
    </div>
  );
};

export default ProductInfo;
