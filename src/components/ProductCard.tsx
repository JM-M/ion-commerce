import { Link } from 'react-router-dom';
import { IonImg } from '@ionic/react';
import WishlistIcon from './WishlistIcon';
import { NAIRA } from '../constants/unicode';
import { Product } from '../constants/schemas/product';
import useCategories from '../hooks/useCategories';
import useProductImages from '../hooks/useProductImages';
import useAuth from '../hooks/useAuth';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { isLoggedIn } = useAuth();

  const { name, category, price, id, stocks } = product;
  const { getCategoryFromValue } = useCategories();
  const categoryName = getCategoryFromValue(category)?.name;

  const images = useProductImages(product);
  const image = !!images.length && images[0];

  return (
    <div>
      <Link to={`/store/products/${id}`} className='block'>
        <div className='relative w-full aspect-[5/6] mb-[10px] bg-gray-100 rounded-lg overflow-hidden'>
          {image && (
            <IonImg
              src={image}
              alt={name}
              className='h-full w-full bg-gray-200 object-cover'
            />
          )}
          {product && isLoggedIn && (
            <WishlistIcon
              className='absolute bottom-3 right-3 h-[24px] w-[24px]'
              product={product}
            />
          )}
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
            {price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
