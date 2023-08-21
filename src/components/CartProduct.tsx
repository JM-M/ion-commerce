import { IonImg, IonSpinner } from "@ionic/react";
import { remove, add } from "ionicons/icons";
import { NAIRA } from "../constants/unicode";
import useCart, { ProductWithCartOptions } from "../hooks/useCart";
import ProductCardCounter from "./ProductCardCounter";
import useProductImages from "../hooks/useProductImages";

interface Props {
  product: ProductWithCartOptions;
  qty: number;
  hideCounter?: boolean;
}

const CartProduct = ({ product, qty = 1, hideCounter = false }: Props) => {
  const { name, price, id, variant = {}, stocks } = product || {};

  const images = useProductImages(product);
  const image = images.length && images[0];

  const {
    addProductToCart,
    removeProductFromCart,
    adding,
    removing,
    editingCart,
  } = useCart();

  const productOptions = { id, variant };

  const addProduct = () => {
    if (editingCart || !product?.id || hideCounter) return;
    addProductToCart(productOptions);
  };

  const removeProduct = () => {
    if (editingCart || !product?.id || hideCounter) return;
    removeProductFromCart(productOptions);
  };

  const variantValues: string[] = Object.values(variant);

  return (
    <div className="flex items-stretch gap-4 mb-5">
      <div className="h-[75px] w-[72px] bg-gray-200 dark:bg-neutral-700 rounded-xl overflow-hidden">
        {image && (
          <IonImg
            src={image}
            alt={name}
            className="h-full w-full bg-gray-200 object-cover"
          />
        )}
      </div>
      <div className="flex flex-col justify-between text-gray-500">
        <h4 className="text-gray-900 dark:text-neutral-300 font-medium">
          {name}
        </h4>
        <div className="flex gap-[10px] dark:text-neutral-200">
          <span>{qty} pcs</span>
          {variantValues.map((value: string, i: number) => {
            return <span key={i}>{value}</span>;
          })}
        </div>
        <span className="dark:text-neutral-200">
          {NAIRA} {price} per unit
        </span>
      </div>
      <div className="flex flex-col justify-between ml-auto">
        <span className="font-medium text-right">
          {NAIRA} {price * qty}
        </span>
        {!hideCounter && (
          <ProductCardCounter
            addProduct={addProduct}
            adding={adding}
            removeProduct={removeProduct}
            removing={removing}
            qty={qty}
          />
        )}
      </div>
    </div>
  );
};

export default CartProduct;
