import { IonButton, IonSpinner, IonIcon } from "@ionic/react";
import { addOutline, add, remove } from "ionicons/icons";
import cx from "classnames";
import useCart from "../hooks/useCart";
import { Product } from "../constants/schemas/product";

interface Props {
  product: Product;
  variant: any;
  variantValid: boolean;
}

const AddToCartButton = ({ product, variant, variantValid = false }: Props) => {
  const {
    addProductToCart,
    removeProductFromCart,
    findProductQty,
    adding,
    removing,
    editingCart,
  } = useCart();

  const productOptions = { id: product.id!, variant };

  const addProduct = () => {
    if (editingCart || !product?.id || !variantValid) return;
    addProductToCart(productOptions);
  };

  const removeProduct = () => {
    if (editingCart || !product?.id || !variantValid) return;
    removeProductFromCart(productOptions);
  };

  const qty = findProductQty(productOptions);

  const addButton = (
    <IonButton
      className="flex items-center justify-center gap-[10px] h-[40px] w-full text-white font-medium rounded-[8px]"
      onClick={addProduct}
      disabled={editingCart || !variantValid}
    >
      {editingCart ? (
        <IonSpinner name="dots" className="inline-block mr-3" />
      ) : (
        <IonIcon icon={addOutline} slot="start" className="h-[24px] w-[24px]" />
      )}
      Add to Cart
    </IonButton>
  );

  const counter = (
    <span
      className={cx("flex justify-between items-center gap-2", {
        "pointer-events-none": editingCart,
      })}
    >
      <span
        className="flex items-center justify-center h-[40px] w-[40px] !px-0 rounded-[8px] bg-[var(--ion-color-secondary)]"
        onClick={removeProduct}
      >
        {removing ? (
          <IonSpinner
            name="crescent"
            color="secondary-contrast"
            className="inline-block h-[20px] w-[20px]"
          />
        ) : (
          <IonIcon
            color="secondary-contrast"
            icon={remove}
            className="text-white h-[24px] w-[24px]"
          />
        )}
      </span>
      <span className="text-lg font-medium">{qty}</span>
      <span
        className="flex items-center justify-center h-[40px] w-[40px] !px-0 rounded-[8px] bg-[var(--ion-color-primary)]"
        onClick={addProduct}
      >
        {adding ? (
          <IonSpinner
            name="crescent"
            color="light"
            className="inline-block h-[20px] w-[20px]"
          />
        ) : (
          <IonIcon icon={add} className="text-white h-[24px] w-[24px]" />
        )}
      </span>
    </span>
  );

  return <div className="container pt-10">{!!qty ? counter : addButton}</div>;
};

export default AddToCartButton;
