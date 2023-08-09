import { IonIcon, IonSpinner } from "@ionic/react";
import { heartOutline, heart } from "ionicons/icons";
import useWishlist, { WishlistItem } from "../hooks/useWishlist";
import { Product } from "../constants/schemas/product";
import useProductImages from "../hooks/useProductImages";

interface Props {
  product: Product;
  [x: string]: any;
}

const WishlistIcon = ({ product, ...props }: Props) => {
  const { id, name, price } = product;
  const images = useProductImages(product);
  const image = images.length ? images[0] : "";

  const { addWishlistItem, removeWishlistItem, isInWishlist, isLoading } =
    useWishlist({ productId: id! });

  const onClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const toggle = (e: any) => {
    onClick(e);
    const wishlistItem: WishlistItem = { id: id!, name, price, image };
    if (isInWishlist) return removeWishlistItem();
    addWishlistItem(wishlistItem);
  };

  if (isLoading)
    return <IonSpinner name="crescent" {...props} onClick={onClick} />;

  return (
    <IonIcon
      id="wishlist-icon"
      icon={isInWishlist ? heart : heartOutline}
      onClick={toggle}
      {...props}
    />
  );
};

export default WishlistIcon;
