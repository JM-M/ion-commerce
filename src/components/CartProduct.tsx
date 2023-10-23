import { useIonRouter, IonImg } from '@ionic/react';
import cx from 'classnames';
import { NAIRA } from '../constants/unicode';
import useCart, { ProductWithCartOptions } from '../hooks/useCart';
import ProductCardCounter from './ProductCardCounter';
import ErrorText from './ErrorText';
import useProductImages from '../hooks/useProductImages';

interface Props {
  product: ProductWithCartOptions;
  qty: number;
  hideCounter?: boolean;
}

const CartProduct = ({ product, qty = 1, hideCounter = false }: Props) => {
  const { name, price, id, variant = {}, discount, error } = product || {};

  const ionRouter = useIonRouter();

  const images = useProductImages(product);
  const image = images.length && images[0];

  const {
    addProductToCart,
    removeProductFromCart,
    adding,
    removing,
    editingCart,
  } = useCart();

  const productOptions = { id, variant };

  const addProduct = () => {
    if (editingCart || !product?.id || hideCounter) return;
    addProductToCart(productOptions);
  };

  const removeProduct = () => {
    if (editingCart || !product?.id || hideCounter) return;
    removeProductFromCart(productOptions);
  };

  const goToProduct = () => ionRouter.push(`/store/products/${id}`);

  const variantKeys: string[] = Object.keys(variant).sort();

  const discountedPrice = discount && price - price * (discount / 100);
  const totalPriceForProduct = (
    (discountedPrice || price) * qty
  ).toLocaleString();

  return (
    <div className='mb-6'>
      <div className='flex items-stretch gap-4'>
        <div className='h-[75px] w-[72px] bg-gray-200 dark:bg-neutral-700 rounded-[10px] overflow-hidden'>
          {image && (
            <IonImg
              src={image}
              alt={name}
              className='h-full w-full bg-gray-200 object-cover'
              onClick={goToProduct}
            />
          )}
        </div>
        <div className='flex flex-col justify-between text-gray-500'>
          <h4 className='text-gray-900 dark:text-neutral-300 font-medium'>
            {name}
          </h4>
          <div className='flex gap-x-3 flex-wrap items-center dark:text-neutral-200'>
            {variantKeys.map((key: string, i: number) => {
              const value = variant[key];
              return <span key={i}>{value}</span>;
            })}
          </div>
          <div className='flex flex-wrap gap-2 text-black'>
            <span
              className={cx('inline-block -mb-[2px] text-base', {
                'line-through text-gray-700': discountedPrice,
              })}
            >
              {NAIRA}
              {price.toLocaleString()}
            </span>
            {discountedPrice && (
              <span className='inline-block -mb-[2px] text-base'>
                {NAIRA}
                {discountedPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        <div className='flex flex-col justify-between ml-auto'>
          <span className='font-medium text-right whitespace-nowrap'>
            {NAIRA} {totalPriceForProduct}
          </span>
          {!hideCounter && (
            <ProductCardCounter
              addProduct={addProduct}
              adding={adding}
              removeProduct={removeProduct}
              removing={removing}
              qty={qty}
            />
          )}
        </div>
      </div>
      {error && (
        <ErrorText
          className='ml-0'
          text={error as string}
          hideHorizontalBar={true}
        />
      )}
    </div>
  );
};

export default CartProduct;
