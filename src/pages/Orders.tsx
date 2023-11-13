import OrderList from '../components/OrderList';
import PageHeader from '../components/PageHeader';

const Orders = () => {
  return (
    <>
      <PageHeader noBackButton>Orders</PageHeader>
      <div className='container'>
        <div className='max-w-[500px]'>
          <OrderList />
        </div>
      </div>
    </>
  );
};

export default Orders;
