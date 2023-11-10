import { Link } from 'react-router-dom';
import { IonImg } from '@ionic/react';
import cx from 'classnames';
import ToggleWishlistIcon from './ToggleWishlistIcon';
import { NAIRA } from '../constants/unicode';
import { ProductAlgoliaRecord } from '../constants/schemas/product';
import useCategories from '../hooks/useCategories';
import useAuth from '../hooks/useAuth';

interface Props {
  product: ProductAlgoliaRecord;
}

const ProductCard = ({ product }: Props) => {
  const { isLoggedIn } = useAuth();

  const { name, category, price, objectID, image, discount } = product;
  const { getCategoryFromId } = useCategories();
  const categoryName = getCategoryFromId(category)?.name;

  const discountedPrice = discount && price - price * (discount / 100);

  return (
    <div>
      <Link to={`/store/products/${objectID}`} className='block'>
        <div className='relative w-full aspect-[5/6] mb-[10px] bg-gray-100 rounded-lg overflow-hidden'>
          {image && (
            <IonImg
              src={image}
              alt={name}
              className='h-full w-full bg-gray-200 object-cover'
            />
          )}
          {product && isLoggedIn && <ToggleWishlistIcon product={product} />}
        </div>
      </Link>
      <div>
        <div>
          <span className='block font-medium'>{name}</span>
        </div>
        <div>
          <span className='text-xs text-gray-500'>{categoryName}</span>
        </div>
        <div className='flex gap-2'>
          <span
            className={cx('inline-block -mb-[2px] text-base', {
              'line-through text-gray-700': discountedPrice,
            })}
          >
            {NAIRA}
            {price.toLocaleString()}
          </span>
          {!!discount && (
            <span className='inline-block -mb-[2px] text-base'>
              {NAIRA}
              {discountedPrice!.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
