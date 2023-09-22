import { Link } from 'react-router-dom';
import { IonImg } from '@ionic/react';
import WishlistIcon from './WishlistIcon';
import { NAIRA } from '../constants/unicode';
import { ProductAlgoliaRecord } from '../constants/schemas/product';
import useCategories from '../hooks/useCategories';
import useAuth from '../hooks/useAuth';

interface Props {
  product: ProductAlgoliaRecord;
}

const ProductCard = ({ product }: Props) => {
  const { isLoggedIn } = useAuth();

  const { name, category, price, objectID, image } = product;
  const { getCategoryFromValue } = useCategories();
  const categoryName = getCategoryFromValue(category)?.name;

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
          {product && isLoggedIn && <WishlistIcon product={product} />}
        </div>
      </Link>
      <div>
        <div>
          <span className='block font-medium'>{name}</span>
        </div>
        <div className='flex justify-between items-end'>
          <span className='text-xs text-gray-500'>{categoryName}</span>
          <span className='inline-block -mb-[2px] text-base'>
            {NAIRA}
            {price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
