import { IonIcon, IonImg, IonSpinner } from '@ionic/react';
import { NAIRA } from '../constants/unicode';
import useWishlist, {
  WishlistItem as WishlistItemType,
} from '../hooks/useWishlist';
import { close } from 'ionicons/icons';

const WishlistItem = ({ name, price, image, id }: WishlistItemType) => {
  const { removeWishlistItem, removeWishlistItemMutation } = useWishlist({
    productId: id,
  });
  return (
    <div className='flex items-stretch gap-4 mb-5'>
      <div className='relative w-[72px] aspect-[5/6] bg-gray-200 rounded-xl overflow-hidden'>
        <IonImg
          src={image}
          alt={name}
          className='h-full w-full bg-gray-200 object-cover'
        />
      </div>
      <div className='flex flex-col gap-3 mr-auto text-gray-500'>
        <h4 className='text-gray-900 font-medium'>{name}</h4>
        <span className=''>
          {NAIRA} {price.toLocaleString()}
        </span>
      </div>
      <div>
        {removeWishlistItemMutation.isLoading ? (
          <IonSpinner name='crescent' className='h-[24px] w-[24px]' />
        ) : (
          <IonIcon
            icon={close}
            className='h-[24px] w-[24px]'
            onClick={removeWishlistItem}
          />
        )}
      </div>
    </div>
  );
};

export default WishlistItem;
