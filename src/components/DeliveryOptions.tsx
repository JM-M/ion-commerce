import { IonImg } from '@ionic/react';
import { Control } from 'react-hook-form/dist/types/form';
import cx from 'classnames';
import { NAIRA } from '../constants/unicode';
import { CheckoutDelivery } from '../constants/schemas/checkout';

export interface Props {
  control: Control<CheckoutDelivery, any>;
  setValue: Function;
  selectedOptionId: string;
  options: CheckoutDelivery[];
}

const DeliveryOptions = ({
  control,
  setValue,
  selectedOptionId,
  options = [],
}: Props) => {
  return (
    <ul className='pt-5'>
      {options.map((deliveryOption, i) => {
        const { carrier, estimatedDeliveryTime, price, logo, id } =
          deliveryOption;
        const selected = id === selectedOptionId;
        return (
          <li key={i}>
            <div
              className={cx(
                'flex justify-between items-stretch mb-5 p-3 bg-[var(--ion-color-light)] border-2 rounded-lg',
                {
                  'border-[var(--ion-color-primary)]': selected,
                  'border-transparent': !selected,
                }
              )}
              onClick={() => setValue(deliveryOption)}
            >
              <div className='flex gap-3'>
                <div className='flex items-center justify-center h-12 w-12 rounded-lg bg-gray-200 overflow-hidden'>
                  <IonImg src={logo} />
                </div>
                <div className='flex flex-col'>
                  <h5>{carrier}</h5>
                  <span className='mt-auto text-[var(--ion-color-medium)]'>
                    {estimatedDeliveryTime}
                  </span>
                </div>
              </div>
              <span className='h-fit font-medium whitespace-nowrap'>
                {NAIRA} {price.toLocaleString()}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default DeliveryOptions;
