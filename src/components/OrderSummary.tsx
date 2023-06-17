import { IonButton, IonIcon } from '@ionic/react';
import { add, remove } from 'ionicons/icons';
import { NAIRA } from '../constants/unicode';

const OrderSummary: React.FC<{ numItems: number }> = ({ numItems }) => {
  return (
    <div className='container'>
      <h3 className='font-medium mb-5 mt-3 text-lg'>
        Order Summary ({numItems} items)
      </h3>
      <ul>
        {[...Array(2)].map((_, i) => {
          return (
            <li key={i}>
              <div className='flex items-stretch gap-4 mb-5'>
                <div className='h-[75px] w-[72px] bg-gray-200 rounded-xl'></div>
                <div className='flex flex-col justify-between text-gray-500'>
                  <h4 className='text-gray-900 font-medium'>Boy's Shoe</h4>
                  <div className='flex gap-[10px]'>
                    <span>Black</span>
                    <span>M</span>
                  </div>
                  <span className=''>{NAIRA} 6,000 per unit</span>
                </div>
                <div className='flex flex-col justify-between ml-auto'>
                  <span className='text-lg font-medium'>{NAIRA} 6,000</span>
                  <span className='flex items-center gap-2'>
                    <span className='flex items-center justify-center h-[26px] w-[26px] ml-auto !px-0 rounded-[8px] bg-[var(--ion-color-secondary)]'>
                      <IonIcon
                        color='secondary-contrast'
                        icon={remove}
                        className='text-white h-[16px] w-[16px]'
                      />
                    </span>
                    <span>1</span>
                    <span className='flex items-center justify-center h-[26px] w-[26px] ml-auto !px-0 rounded-[8px] bg-[var(--ion-color-primary)]'>
                      <IonIcon
                        icon={add}
                        className='text-white h-[16px] w-[16px]'
                      />
                    </span>
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className='text-center'>
        <IonButton fill='clear' className='ion-no-margin'>
          See all items
        </IonButton>
      </div>
      <div className='flex justify-between font-medium mt-5'>
        <span>Subtotal</span>
        <span className='text-lg'>{NAIRA} 12,000</span>
      </div>
    </div>
  );
};

export default OrderSummary;
