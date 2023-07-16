import { IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import { Controller } from 'react-hook-form';

interface Props {
  name: string;
  label?: string;
  control: any;
  options: { text: string; value: string }[];
}

const Selectbox = ({ name = '', label = '', control, options = [] }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <IonItem className='ion-no-padding'>
            <IonSelect
              label={label}
              labelPlacement='floating'
              aria-label={label}
              placeholder='Select'
              {...field}
            >
              {options.map((option: any, i: number) => {
                const { text, value } = option;
                return (
                  <IonSelectOption key={value} value={value}>
                    <IonItem>{text}</IonItem>
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>
        );
      }}
    />
  );
};

export default Selectbox;
