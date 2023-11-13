import { ReactNode, useMemo } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { v4 as uuidv4 } from 'uuid';
import Button from './Button';
import useAuth from '../hooks/useAuth';

interface Props {
  children: ReactNode;
  paymentValue: number;
  onSuccess: Function;
  onClose?: () => void;
  loading: Boolean;
  [x: string]: any;
}

const PaystackPaymentButton = ({
  children,
  paymentValue,
  onSuccess = () => null,
  onClose = () => null,
  loading = false,
  ...props
}: Props) => {
  const { user } = useAuth();
  const email = user?.email;

  const config = useMemo(() => {
    return {
      reference: uuidv4(),
      email,
      amount: Math.round(paymentValue * 100),
      publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    };
  }, [email, paymentValue]);

  const initializePayment = usePaystackPayment(config);

  return (
    <Button
      color='primary'
      {...props}
      onClick={(e: any) => {
        e.preventDefault();
        initializePayment(onSuccess as any, onClose);
      }}
      loading={loading}
    >
      {children}
    </Button>
  );
};

export default PaystackPaymentButton;
