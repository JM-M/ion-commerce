import { string } from "yup";
import { NAIRA } from "../constants/unicode";
import ProductStars from "./ProductStars";
import Rating from "./Rating";

interface Props {
  name: string;
  price: number;
  rating: {
    count: number,
    numUserReviews: number,
    ranking: number
  } | null;
}

const ProductInfo = ({ name, price, rating }: Props) => {
  const avgRating = rating ? rating.count / rating.numUserReviews : null
  if (!avgRating) return null
  return (
    <div className="container pt-4 flex flex-col gap-[10px]">
      <h3 className="font-medium">{name}</h3>
      <span>
        {NAIRA} {price}
      </span>
      <span className="flex gap-1 text-gray-500"><ProductStars max={5} value={avgRating} /> ({rating?.numUserReviews})</span>
    </div>
  );
};

export default ProductInfo;
