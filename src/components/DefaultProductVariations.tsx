import { IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import cx from "classnames";

const DefaultProductVariations: React.FC<{
  color: string;
  colors: any[];
  size: string;
  sizes: any[];
  setProductVariant: Function;
}> = ({ color, colors, size, sizes, setProductVariant = () => null }) => {
  return (
    <div className="flex">
      {!!colors.length && (
        <div className="flex-1 max-w-[50%]">
          <IonItem>
            <IonSelect
              interface="action-sheet"
              label="Colors"
              labelPlacement="floating"
              aria-label="Colors"
              placeholder="Select"
              onIonChange={(ev) => setProductVariant("colors", ev.detail.value)}
            >
              {colors.map((colorOption: any, i: number) => {
                const { name, hex } = colorOption;
                const selected = name === color;
                return (
                  <IonSelectOption
                    key={name}
                    value={name}
                    className={cx({
                      "!text-[var(--ion-color-primary)] !bg-gray-200": selected,
                    })}
                  >
                    <IonItem>
                      <span
                        className="inline-block h-5 w-5 mr-3 rounded-xl"
                        style={{ backgroundColor: hex }}
                      ></span>
                      {name}
                    </IonItem>
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>
        </div>
      )}
      {!!sizes.length && (
        <div className="flex-1 max-w-[50%]">
          <IonItem>
            <IonSelect
              interface="action-sheet"
              label="Sizes"
              labelPlacement="floating"
              aria-label="Sizes"
              placeholder="Select"
              onIonChange={(ev) => setProductVariant("sizes", ev.detail.value)}
            >
              {sizes.map((sizeOption: any, i: number) => {
                const { name } = sizeOption;
                const selected = name === size;
                return (
                  <IonSelectOption
                    key={name}
                    value={name}
                    className={cx({
                      "!text-[var(--ion-color-primary)] !bg-gray-200": selected,
                    })}
                  >
                    {name}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>
        </div>
      )}
    </div>
  );
};

export default DefaultProductVariations;
