import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { heartOutline } from 'ionicons/icons';
import useWishlist from '../hooks/useWishlist';

const WishlistIcon = () => {
  const { wishlistCountQuery } = useWishlist();
  const { isLoading, data } = wishlistCountQuery;

  if (isLoading || (!data && typeof data !== 'number')) return null;

  return (
    <Link to='/wishlist' className='relative h-[24px] w-[30px]' slot='end'>
      <IonIcon
        icon={heartOutline}
        className='relative top-0 right-1/4 h-[24px] w-[24px]'
      />
      <span className='absolute top-0 right-0 h-4 w-fit min-w-[16px] inline-flex items-center justify-center rounded-lg bg-[var(--ion-color-primary)] text-white text-[9px] font-medium'>
        <span className='relative -bottom-[1px] text-center'>{data}</span>
      </span>
    </Link>
  );
};

export default WishlistIcon;
