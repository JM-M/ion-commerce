import OrderList from '../components/OrderList';

const Orders = () => {
  return (
    <div className='container mb-12'>
      <h2 className='font-medium mb-5 mt-3 text-lg'>Orders</h2>
      <OrderList />
    </div>
  );
};

export default Orders;
