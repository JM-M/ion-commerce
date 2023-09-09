import OrderList from '../components/OrderList';
import PageHeader from '../components/PageHeader';

const Orders = () => {
  return (
    <>
      <PageHeader noBackButton>Orders</PageHeader>
      <OrderList />
    </>
  );
};

export default Orders;
