import { IonIcon } from '@ionic/react';
import { checkmark } from 'ionicons/icons';

const STATUS_STEPS = ['confirmed', 'en-route', 'delivered'];

const OrderStatus = () => {
  return (
    <div>
      <ul className='flex gap-5 flex-wrap'>
        {STATUS_STEPS.map((status, i) => {
          return (
            <li key={i}>
              <div className='flex items-center gap-3'>
                <span className='h-[30px] w-[30px] mx-auto flex items-center justify-center bg-[var(--ion-color-primary)] rounded-lg'>
                  <IonIcon icon={checkmark} color='light' />
                </span>
                <div>
                  <span className='capitalize'>
                    {status.replaceAll('-', ' ')}
                  </span>
                  <span className='block text-[var(--ion-color-medium)]'>
                    10:30 AM, May 24, 2023
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderStatus;
