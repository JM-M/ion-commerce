import OrderList from "../components/OrderList";
import PageLoader from "../components/PageLoader";
import useOrders from "../hooks/useOrders";

const Orders = () => {
  const { orders, ordersQuery } = useOrders();
  if (ordersQuery.isLoading) return <PageLoader />;
  if (ordersQuery.isError) return <>An Error occurred</>;
  if (!orders) return <>No orders data</>;

  return (
    <div className="container mb-12">
      <h2 className="font-medium mb-5 mt-3 text-lg">Orders</h2>
      <OrderList
        orders={orders}
        hasNextPage={ordersQuery.hasNextPage}
        fetchNextPage={ordersQuery.fetchNextPage}
      />
    </div>
  );
};

export default Orders;
