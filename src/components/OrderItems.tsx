import { IonIcon } from '@ionic/react';

import { NAIRA } from '../constants/unicode';

const OrderItems = () => {
  return (
    <div>
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
                  <span className='font-medium'>5 units</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderItems;
