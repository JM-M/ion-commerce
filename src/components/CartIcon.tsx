import { IonIcon } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';

const CartIcon = ({ cartSize = 0, ...rest }) => {
  return (
    <span className='relative h-[24px] w-[24px]'>
      <IonIcon icon={cartOutline} className='h-[24px] w-[24px]' {...rest} />
      {!!cartSize && (
        <span className='absolute top-0 -right-1/4 h-4 w-4 inline-flex items-center justify-center rounded-lg bg-blue-600 text-white text-[7px] font-medium'>
          <span className='relative bottom-[1px]'>{cartSize}</span>
        </span>
      )}
    </span>
  );
};

export default CartIcon;
