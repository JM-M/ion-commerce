import { IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import cx from "classnames";

const CustomProductVariations: React.FC<{
  variant: any;
  variations: any;
  setProductVariant: Function;
}> = ({ variant = {}, variations = {}, setProductVariant = () => null }) => {
  const keys = Object.keys(variations);

  if (!keys.length) return null;

  return (
    <>
      {keys.map((key, index) => {
        const options = variations[key];
        return (
          <div key={index}>
            <IonItem>
              <IonSelect
                interface="action-sheet"
                label={key}
                labelPlacement="floating"
                aria-label={key}
                placeholder="Select"
                onIonChange={(ev) => setProductVariant(key, ev.detail.value)}
              >
                {options.map((option: any, i: number) => {
                  const { name } = option;
                  const selected = name === variant[key];
                  return (
                    <IonSelectOption
                      key={i}
                      value={name}
                      className={cx({
                        "!text-[var(--ion-color-primary)] !bg-gray-200 dark:!bg-neutral-900":
                          selected,
                      })}
                    >
                      <IonItem>{name}</IonItem>
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
            </IonItem>
          </div>
        );
      })}
    </>
  );
};

export default CustomProductVariations;
