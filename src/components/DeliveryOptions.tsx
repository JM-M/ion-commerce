import { IonImg } from '@ionic/react';
import { Control } from 'react-hook-form/dist/types/form';
import cx from 'classnames';
import { NAIRA } from '../constants/unicode';
import { CheckoutDelivery } from '../constants/schemas/checkout';

export interface Props {
  control: Control<CheckoutDelivery, any>;
  setValue: Function;
  selectedOptionId: string;
}

const DELIVERY_OPTIONS: CheckoutDelivery[] = [
  {
    carrier: 'Carrier 1',
    estimatedDeliveryDate: 'Within 2 days',
    price: 1500,
    logo: 'https://picsum.photos/200',
    id: '1',
  },
  {
    carrier: 'Carrier 1',
    estimatedDeliveryDate: 'Within 2 days',
    price: 1500,
    logo: 'https://picsum.photos/200',
    id: '2',
  },
  {
    carrier: 'Carrier 1',
    estimatedDeliveryDate: 'Within 2 days',
    price: 1500,
    logo: 'https://picsum.photos/200',
    id: '3',
  },
  {
    carrier: 'Carrier 1',
    estimatedDeliveryDate: 'Within 2 days',
    price: 1500,
    logo: 'https://picsum.photos/200',
    id: '4',
  },
];

const DeliveryOptions = ({ control, setValue, selectedOptionId }: Props) => {
  return (
    <ul className='pt-5'>
      {DELIVERY_OPTIONS.map((deliveryOption, i) => {
        const { carrier, estimatedDeliveryDate, price, logo, id } =
          deliveryOption;
        const selected = id === selectedOptionId;
        return (
          <li key={i}>
            <div
              className={cx(
                'flex justify-between items-stretch mb-5 p-3 bg-[var(--ion-color-light)] rounded-lg',
                { 'bg-[var(--ion-color-primary)] text-white': selected }
              )}
              onClick={() => setValue(deliveryOption)}
            >
              <div className='flex gap-3'>
                <div className='h-12 w-12 rounded-lg bg-gray-200 overflow-hidden'>
                  <IonImg src={logo} />
                </div>
                <div className='flex flex-col'>
                  <h5>{carrier}</h5>
                  <span
                    className={cx('text-[var(--ion-color-medium)]', {
                      'text-[var(--ion-color-light-tint)]': selected,
                    })}
                  >
                    {estimatedDeliveryDate}
                  </span>
                </div>
              </div>
              <span className='font-medium'>
                {NAIRA} {price}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default DeliveryOptions;
