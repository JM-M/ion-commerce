import { IonIcon, IonSpinner } from '@ionic/react';
import { heartOutline, heart } from 'ionicons/icons';
import useWishlist, { WishlistItem } from '../hooks/useWishlist';
import { ProductAlgoliaRecord } from '../constants/schemas/product';

interface Props {
  product: ProductAlgoliaRecord;
  [x: string]: any;
}

const WishlistIcon = ({ product, ...props }: Props) => {
  const { objectID, name, price, image } = product;

  const { addWishlistItem, removeWishlistItem, isInWishlist, isLoading } =
    useWishlist({ productId: objectID! });

  const onClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const toggle = (e: any) => {
    onClick(e);
    const wishlistItem: WishlistItem = { id: objectID!, name, price, image };
    if (isInWishlist) return removeWishlistItem();
    addWishlistItem(wishlistItem);
  };

  if (isLoading)
    return (
      <IonSpinner
        name='crescent'
        color='primary'
        {...props}
        onClick={onClick}
      />
    );

  return (
    <IonIcon
      id='wishlist-icon'
      color='primary'
      icon={isInWishlist ? heart : heartOutline}
      onClick={toggle}
      {...props}
    />
  );
};

export default WishlistIcon;
