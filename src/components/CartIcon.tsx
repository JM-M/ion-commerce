import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';

interface Props {
  cartSize: number;
}

const CartIcon = ({ cartSize }: Props) => {
  return (
    <Link
      to='/store/checkout'
      className='relative h-[24px] w-[30px]'
      slot='end'
    >
      <IonIcon
        icon={cartOutline}
        className='relative top-0 right-1/4 h-[24px] w-[24px]'
      />
      <span className='absolute top-0 right-0 h-4 w-fit min-w-[16px] inline-flex items-center justify-center rounded-lg bg-[var(--ion-color-primary)] text-white text-[9px] font-medium'>
        <span className='relative -bottom-[1px] text-center'>{cartSize}</span>
      </span>
    </Link>
  );
};

export default CartIcon;
