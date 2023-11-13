import { RouteComponentProps } from 'react-router';
import { IonSkeletonText, useIonRouter } from '@ionic/react';

import OrderItems from '../components/OrderItems';
import OrderStatus from '../components/OrderStatus';
import OrderInfo from '../components/OrderInfo';

import useOrders from '../hooks/useOrders';
import StatusText from '../components/StatusText';
import PageHeader from '../components/PageHeader';

interface Props
  extends RouteComponentProps<{
    orderId: string;
  }> {}

const Order: React.FC<Props> = ({ match }) => {
  const ionRouter = useIonRouter();
  const {
    canGoBack,
    goBack,
    push,
    routeInfo: { lastPathname },
  } = ionRouter;

  const { orderId } = match.params;
  const { order, orderQuery } = useOrders({ orderId });
  const { isLoading, isError } = orderQuery;

  if (isError) return <>An error occurred.</>;

  const { cart, user, statusEvents = [], id } = order || {};
  const statusEventsLength = statusEvents.length;
  const latestStatus =
    !!statusEventsLength && statusEvents[statusEventsLength - 1];

  return (
    <>
      <PageHeader backHref={lastPathname}>
        {isLoading ? (
          <IonSkeletonText
            animated={true}
            className='inline-block h-full w-full mb-3 ion-no-padding ion-no-margin rounded-md'
          ></IonSkeletonText>
        ) : (
          `#${id}`
        )}
      </PageHeader>
      <div className='container mb-12'>
        <div className='max-w-[500px]'>
          <h3 className='font-medium mb-5 text-lg text-[var(--ion-color-medium)]'>
            {isLoading ? (
              <IonSkeletonText
                animated={true}
                className='block h-full w-1/5 mb-5 ion-no-padding ion-no-margin rounded-md'
              ></IonSkeletonText>
            ) : (
              'Status'
            )}
          </h3>
          {!!latestStatus && (
            <StatusText status={latestStatus.status} loading={isLoading} />
          )}
          <h3 className='font-medium mt-6 mb-2 text-lg text-[var(--ion-color-medium)]'>
            {isLoading ? (
              <IonSkeletonText
                animated={true}
                className='block h-full w-1/5 mb-5 ion-no-padding ion-no-margin rounded-md'
              ></IonSkeletonText>
            ) : (
              'Items'
            )}
          </h3>
          <OrderItems items={cart?.products || []} loading={isLoading} />
          <h3 className='font-medium mt-6 mb-2 text-lg text-[var(--ion-color-medium)]'>
            {isLoading ? (
              <IonSkeletonText
                animated={true}
                className='block h-full w-1/5 mb-5 ion-no-padding ion-no-margin rounded-md'
              ></IonSkeletonText>
            ) : (
              'Track'
            )}
          </h3>
          <OrderStatus events={statusEvents} loading={isLoading} />
          <h3 className='font-medium mt-6 mb-2 text-lg text-[var(--ion-color-medium)]'>
            {isLoading ? (
              <IonSkeletonText
                animated={true}
                className='block h-full w-1/3 mb-5 ion-no-padding ion-no-margin rounded-md'
              ></IonSkeletonText>
            ) : (
              'Details'
            )}
          </h3>
          <OrderInfo
            email={user?.email}
            contact={cart?.checkout?.contact}
            address={cart?.checkout?.address}
            loading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Order;
