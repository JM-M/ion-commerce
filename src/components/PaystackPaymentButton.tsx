import { ReactNode, useMemo } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { v4 as uuidv4 } from 'uuid';
import Button from './Button';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import useOrders from '../hooks/useOrders';

const PAYSTACK_PUBLIC_KEY = 'pk_test_7ac0ace64e4a39a3012939b6a7431051372af3e6';

const PaystackPaymentButton: React.FC<{
  children: ReactNode;
  [x: string]: any;
}> = ({ children, ...props }) => {
  const { user } = useAuth();
  const email = user?.email;

  const { totalCartValue, cart } = useCart();
  const { createOrder, createOrderMutation } = useOrders();

  const config = useMemo(() => {
    return {
      reference: uuidv4(),
      email,
      amount: Math.round(totalCartValue * 100),
      publicKey: PAYSTACK_PUBLIC_KEY,
    };
  }, [email, totalCartValue]);

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference: any) => {
    const data = {
      paymentReference: reference,
      cart,
    };
    createOrder(data);
  };

  const onClose = () => {
    console.log('closed');
  };

  return (
    <Button
      {...props}
      onClick={(e: any) => {
        e.preventDefault();
        initializePayment(onSuccess as any, onClose);
      }}
      loading={createOrderMutation.isLoading}
    >
      {children}
    </Button>
  );
};

export default PaystackPaymentButton;
