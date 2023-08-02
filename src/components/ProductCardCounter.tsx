import { IonSpinner, IonIcon } from "@ionic/react";
import { add, remove } from "ionicons/icons";

interface Props {
  addProduct: Function;
  adding: boolean;
  removeProduct: Function;
  removing: boolean;
  qty: number;
}

const ProductCardCounter = ({
  addProduct,
  adding,
  removeProduct,
  removing,
  qty,
}: Props) => {
  return (
    <span className="flex items-center gap-2">
      <span
        className="flex items-center justify-center h-[26px] w-[26px] ml-auto !px-0 rounded-[8px] bg-[var(--ion-color-secondary)]"
        onClick={() => removeProduct()}
      >
        {removing ? (
          <IonSpinner
            name="crescent"
            color="secondary-contrast"
            className="inline-block h-[16px] w-[16px]"
          />
        ) : (
          <IonIcon
            color="secondary-contrast"
            icon={remove}
            className="text-white h-[16px] w-[16px]"
          />
        )}
      </span>
      <span className="text-lg font-medium">{qty}</span>
      <span
        className="flex items-center justify-center h-[26px] w-[26px] ml-auto !px-0 rounded-[8px] bg-[var(--ion-color-primary)]"
        onClick={() => addProduct()}
      >
        {adding ? (
          <IonSpinner
            name="crescent"
            color="light"
            className="inline-block h-[16px] w-[16px]"
          />
        ) : (
          <IonIcon icon={add} className="text-white h-[16px] w-[16px]" />
        )}
      </span>
    </span>
  );
};

export default ProductCardCounter;
