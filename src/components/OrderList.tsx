import { Link } from 'react-router-dom';
import { IonButton, IonIcon, useIonRouter } from '@ionic/react';
import { formatDistance } from 'date-fns';
import StatusText from './StatusText';
import OrderListSkeleton from './skeletons/OrderListSkeleton';
import { arrowForward } from 'ionicons/icons';
import { NAIRA } from '../constants/unicode';
import useCart, { ProductWithCartOptions } from '../hooks/useCart';
import useOrders from '../hooks/useOrders';

const OrderList = () => {
  const ionRouter = useIonRouter();

  const { orders, ordersQuery } = useOrders();
  const { measureCart } = useCart();

  const { data, fetchNextPage, isLoading, isError } = ordersQuery;
  const { hasNextPage } = data || {};

  if (isLoading) return <OrderListSkeleton />;
  if (isError) return <>An Error occurred</>;
  if (!orders) return <>No orders data</>;

  const goToOrder = (orderId: string) => {
    ionRouter.push(`/orders/${orderId}`);
  };

  return (
    <>
      <ul className='container'>
        {orders.map((order, i: number) => {
          const { id, statusEvents = [], cart, createdAt } = order;
          const lastStatus =
            !!statusEvents.length &&
            statusEvents[statusEvents?.length - 1].status;
          const { totalCartValue } = measureCart(
            cart.products as ProductWithCartOptions[]
          );

          return (
            <li key={i}>
              <div
                className='flex justify-between items-stretch mb-5 p-3 bg-[var(--ion-color-light)] rounded-lg'
                onClick={() => goToOrder(id!)}
              >
                <div>
                  <h4 className='font-medium text-[var(--ion-color-dark)]'>
                    #{id}
                  </h4>
                  <span className='block text-[var(--ion-color-medium)] capitalize'>
                    {createdAt &&
                      formatDistance(createdAt!.toDate(), new Date(), {
                        addSuffix: true,
                      })}
                  </span>
                  <span className='flex gap-2'>
                    <span className='text-gray-700 text-sm whitespace-nowrap'>
                      {NAIRA} {totalCartValue}
                    </span>
                  </span>
                </div>
                <div className='flex flex-col justify-between items-end gap-2'>
                  <span>
                    {lastStatus && <StatusText status={lastStatus} />}
                  </span>
                  <Link to='/orders/1'>
                    <IonButton
                      fill='clear'
                      className='ion-no-padding h-[20px] font-medium'
                    >
                      <IonIcon icon={arrowForward} color='medium' />
                    </IonButton>
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {hasNextPage && (
        <IonButton
          color='secondary'
          className='block !h-30 w-fit mx-auto mt-[30px] font-medium rounded-[8px]'
          onClick={() => fetchNextPage()}
        >
          Load more
        </IonButton>
      )}
    </>
  );
};

export default OrderList;
