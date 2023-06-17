import { Link } from 'react-router-dom';
import { IonButton } from '@ionic/react';

import { NAIRA } from '../constants/unicode';

const OrderList = () => {
  return (
    <>
      <ul>
        {[...Array(8)].map((_, i) => {
          return (
            <li key={i}>
              <div className='flex justify-between items-stretch mb-5 p-3 bg-[var(--ion-color-light)] rounded-lg'>
                <div>
                  <h4 className='font-medium text-[var(--ion-color-dark)]'>
                    #3662557 (3)
                  </h4>
                  <span className='block text-[var(--ion-color-medium)]'>
                    10:30 AM, May 24, 2023
                  </span>
                  <span className='block mt-2 text-[var(--ion-color-success-shade)]'>
                    Delivered
                  </span>
                </div>
                <div className='flex flex-col justify-between items-end gap-2'>
                  <span className='font-medium'>{NAIRA} 1,500</span>
                  <Link to='/orders/1'>
                    <IonButton
                      fill='clear'
                      className='ion-no-padding h-[20px] font-medium'
                    >
                      View
                    </IonButton>
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <IonButton
        color='secondary'
        className='block !h-30 w-fit mx-auto mt-[30px] font-medium rounded-[8px]'
      >
        Load more
      </IonButton>
    </>
  );
};

export default OrderList;
