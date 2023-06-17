import { IonButton } from '@ionic/react';
import { NAIRA } from '../constants/unicode';

const WishlistItems = () => {
  return (
    <>
      <ul className='mt-5'>
        {[...Array(10)].map((_, i) => {
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

export default WishlistItems;
