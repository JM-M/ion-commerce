import { RouteComponentProps } from "react-router";
import { IonIcon, useIonRouter } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

import OrderItems from "../components/OrderItems";
import OrderStatus from "../components/OrderStatus";
import OrderInfo from "../components/OrderInfo";
import PageLoader from "../components/PageLoader";

import useOrders from "../hooks/useOrders";
import StatusText from "../components/StatusText";

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

  if (orderQuery.isLoading) return <PageLoader />;
  if (orderQuery.isError) return <>An error occurred.</>;
  if (!order) return <>No order data</>;

  const { cart, user, statusEvents = [], id } = order;
  const statusEventsLength = statusEvents.length;
  const latestStatus =
    !!statusEventsLength && statusEvents[statusEventsLength - 1];

  return (
    <div className="container mb-12">
      <IonIcon
        icon={arrowBackOutline}
        color="dark"
        className="h-[20px] w-[20px] block mb-3"
        onClick={() =>
          canGoBack() ? goBack() : push(`/${lastPathname}`, "back")
        }
      />
      <div className="flex justify-between mb-5 mt-3">
        <h2 className="font-medium text-lg">Order #{id}</h2>
        {!!latestStatus && <StatusText status={latestStatus.status} />}
      </div>
      <h3 className="font-medium mt-6 mb-2 text-lg text-[var(--ion-color-medium)]">
        Items
      </h3>
      <OrderItems items={cart.products} />
      <h3 className="font-medium mt-6 mb-2 text-lg text-[var(--ion-color-medium)]">
        Track
      </h3>
      <OrderStatus events={statusEvents} />
      <h3 className="font-medium mt-6 mb-2 text-lg text-[var(--ion-color-medium)]">
        Details
      </h3>
      <OrderInfo
        email={user.email}
        contact={cart.checkout?.contact}
        address={cart.checkout?.address}
      />
    </div>
  );
};

export default Order;
