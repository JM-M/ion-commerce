import { useState } from 'react';
import { IonButton } from '@ionic/react';
import { NAIRA } from '../constants/unicode';
import CartProduct from './CartProduct';
import PageLoader from './PageLoader';
import useCart, { ProductWithCartOptions } from '../hooks/useCart';

const DEFAULT_SUMMARY_SIZE = 2;

const OrderSummary = () => {
  const [expanded, setExpanded] = useState<boolean | Function>(false);

  const { cart, totalCartValue, cartQuery, cartSize } = useCart();
  let products = cart.products;

  const toggleExpanded = () => setExpanded((v) => !v);

  if (cartQuery.isLoading) return <PageLoader />;

  const numProducts = products.length;
  const expandable = numProducts > DEFAULT_SUMMARY_SIZE;

  return (
    <div className='container'>
      <h3 className='font-medium mb-5 text-lg'>
        Order Summary ({cartSize} items)
      </h3>
      <ul>
        {products
          .slice(0, expanded ? numProducts : DEFAULT_SUMMARY_SIZE)
          .map(
            (
              product: ProductWithCartOptions & { qty: number },
              index: number
            ) => {
              const { qty } = product;
              return (
                <li key={index}>
                  <CartProduct product={product} qty={qty} />
                </li>
              );
            }
          )}
      </ul>
      {expandable && (
        <div className='text-center'>
          <IonButton
            fill='clear'
            className='ion-no-margin'
            onClick={toggleExpanded}
          >
            {expanded ? 'See less items' : `See all ${products.length} items`}
          </IonButton>
        </div>
      )}
      <div className='flex justify-between font-medium mt-10'>
        <span>Subtotal</span>
        <span className='text-lg'>
          {NAIRA} {totalCartValue?.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;
