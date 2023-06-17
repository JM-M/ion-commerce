import { IonIcon, useIonRouter } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';

import OrderItems from '../components/OrderItems';
import OrderStatus from '../components/OrderStatus';
import OrderInfo from '../components/OrderInfo';

const Order = () => {
  const ionRouter = useIonRouter();
  const { canGoBack, goBack, push } = ionRouter;

  return (
    <div className='container mb-12'>
      <IonIcon
        icon={arrowBackOutline}
        color='dark'
        className='h-[20px] w-[20px] block mb-3'
        onClick={() => (canGoBack() ? goBack() : push('/orders', 'back'))}
      />
      <div className='flex justify-between mb-5 mt-3'>
        <h2 className='font-medium text-lg'>Order #3662557</h2>
        <span className='text-[var(--ion-color-success-shade)]'>Delivered</span>
      </div>
      <h3 className='font-medium mt-6 mb-2 text-lg text-[var(--ion-color-medium)]'>
        Items
      </h3>
      <OrderItems />
      <h3 className='font-medium mt-6 mb-2 text-lg text-[var(--ion-color-medium)]'>
        Track
      </h3>
      <OrderStatus />
      <h3 className='font-medium mt-6 mb-2 text-lg text-[var(--ion-color-medium)]'>
        Details
      </h3>
      <OrderInfo />
    </div>
  );
};

export default Order;
