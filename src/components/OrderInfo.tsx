import OrderAddress from './OrderAddress';

const OrderInfo = () => {
  return (
    <>
      <div className='flex'>
        <div className='flex-1'>
          <h5 className='font-medium mb-1 text-[var(--ion-color-medium)]'>
            Full Name
          </h5>
          <span>Jane Doe</span>
        </div>
        <div className='flex-1'>
          <h5 className='font-medium mb-1 text-[var(--ion-color-medium)]'>
            Phone Number
          </h5>
          <span>+2347031969518</span>
        </div>
      </div>
      <div className='mt-5'>
        <h5 className='font-medium mb-1 text-[var(--ion-color-medium)]'>
          Email
        </h5>
        <span>jolamoses@gmail.com</span>
      </div>
      <div className='mt-5'>
        <h5 className='font-medium mb-1 text-[var(--ion-color-medium)]'>
          Address
        </h5>
        <OrderAddress />
      </div>
    </>
  );
};

export default OrderInfo;
