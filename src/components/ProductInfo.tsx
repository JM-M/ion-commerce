import cx from 'classnames';
import { NAIRA } from '../constants/unicode';
import ProductStars from './ProductStars';
import Rating from './Rating';

interface Props {
  name: string;
  price: number;
  rating: {
    count: number;
    numUserReviews: number;
    ranking: number;
  } | null;
  discount?: number;
}

const ProductInfo = ({ name, price, rating, discount }: Props) => {
  const avgRating = rating ? rating.count / rating.numUserReviews : null;
  const discountedPrice = discount && price - price * (discount / 100);
  return (
    <div className='pt-4 flex flex-col gap-[10px] md:pt-0'>
      <h3 className='font-medium text-lg'>{name}</h3>
      <div className='flex gap-2 text-lg'>
        <span
          className={cx('inline-block -mb-[2px]', {
            'line-through text-gray-700': discountedPrice,
          })}
        >
          {NAIRA}
          {price.toLocaleString()}
        </span>
        {discountedPrice && (
          <span className='inline-block -mb-[2px]'>
            {NAIRA}
            {discountedPrice.toLocaleString()}
          </span>
        )}
      </div>
      {avgRating && (
        <span className='flex gap-1 text-gray-500'>
          <ProductStars max={5} value={avgRating} /> ({rating?.numUserReviews})
        </span>
      )}
    </div>
  );
};

export default ProductInfo;
