import { IonIcon, IonSpinner } from '@ionic/react';
import { heartOutline, heart } from 'ionicons/icons';
import cx from 'classnames';
import useWishlist, { WishlistItem } from '../hooks/useWishlist';
import useAuth from '../hooks/useAuth';

interface Props {
  product: { objectID: string; name: string; price: number; image?: string };
  className?: any;
  [x: string]: any;
}

const ToggleWishlistIcon = ({ product, className = {}, ...props }: Props) => {
  const { isLoggedIn } = useAuth();

  const { objectID, name, price, image } = product;

  const {
    addWishlistItem,
    removeWishlistItem,
    wishlistItemQuery,
    addWishlistItemMutation,
    removeWishlistItemMutation,
  } = useWishlist({ productId: objectID! });

  const { isLoading, isFetching, data } = wishlistItemQuery;
  const isInWishlist = !!data;

  const disableEvent = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const toggle = (e: any) => {
    disableEvent(e);
    const wishlistItem: WishlistItem = { id: objectID!, name, price, image };
    if (isInWishlist) return removeWishlistItem();
    addWishlistItem(wishlistItem);
  };

  if (!isLoggedIn) return null;

  const iconClassName = 'h-[20px] w-[20px] mt-[2px]';

  let iconDisplayed = (
    <IonIcon
      id='wishlist-icon'
      color='primary'
      icon={isInWishlist ? heart : heartOutline}
      onClick={toggle}
      className={iconClassName}
      {...props}
    />
  );

  if (
    isFetching ||
    addWishlistItemMutation.isLoading ||
    removeWishlistItemMutation.isLoading
  )
    iconDisplayed = (
      <IonSpinner
        name='crescent'
        color='primary'
        {...props}
        className={iconClassName}
        onClick={disableEvent}
      />
    );

  return (
    <span
      className={cx(
        'absolute bottom-3 right-3 inline-flex items-center justify-center h-[30px] w-[30px] bg-white rounded-[50%]',
        className,
        { 'pointer-events-none': isLoading }
      )}
    >
      {iconDisplayed}
    </span>
  );
};

export default ToggleWishlistIcon;
