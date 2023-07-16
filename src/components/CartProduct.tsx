import { IonIcon, IonSpinner } from '@ionic/react';
import { remove, add } from 'ionicons/icons';
import { NAIRA } from '../constants/unicode';
import { Product } from '../constants/schemas/product';
import useCart from '../hooks/useCart';

interface Props {
  product: Product;
  qty: number;
}

const CartProduct = ({ product, qty = 1 }: Props) => {
  const { name, price } = product || {};

  const {
    addProductToCart,
    removeProductFromCart,
    adding,
    removing,
    editingCart,
  } = useCart();

  const addProduct = () => {
    if (editingCart || !product?.id) return;
    addProductToCart(product.id);
  };

  const removeProduct = () => {
    if (editingCart || !product?.id) return;
    removeProductFromCart(product.id);
  };

  return (
    <div className='flex items-stretch gap-4 mb-5'>
      <div className='h-[75px] w-[72px] bg-gray-200 rounded-xl'></div>
      <div className='flex flex-col justify-between text-gray-500'>
        <h4 className='text-gray-900 font-medium'>{name}</h4>
        <div className='flex gap-[10px]'>
          <span>{qty} pcs</span>
          <span>Black</span>
          <span>M</span>
        </div>
        <span>
          {NAIRA} {price} per unit
        </span>
      </div>
      <div className='flex flex-col justify-between ml-auto'>
        <span className='font-medium text-right'>
          {NAIRA} {price * qty}
        </span>
        <span className='flex items-center gap-2'>
          <span
            className='flex items-center justify-center h-[26px] w-[26px] ml-auto !px-0 rounded-[8px] bg-[var(--ion-color-secondary)]'
            onClick={removeProduct}
          >
            {removing ? (
              <IonSpinner
                name='crescent'
                color='secondary-contrast'
                className='inline-block h-[16px] w-[16px]'
              />
            ) : (
              <IonIcon
                color='secondary-contrast'
                icon={remove}
                className='text-white h-[16px] w-[16px]'
              />
            )}
          </span>
          <span className='text-lg font-medium'>{qty}</span>
          <span
            className='flex items-center justify-center h-[26px] w-[26px] ml-auto !px-0 rounded-[8px] bg-[var(--ion-color-primary)]'
            onClick={addProduct}
          >
            {adding ? (
              <IonSpinner
                name='crescent'
                color='light'
                className='inline-block h-[16px] w-[16px]'
              />
            ) : (
              <IonIcon icon={add} className='text-white h-[16px] w-[16px]' />
            )}
          </span>
        </span>
      </div>
    </div>
  );
};

export default CartProduct;
