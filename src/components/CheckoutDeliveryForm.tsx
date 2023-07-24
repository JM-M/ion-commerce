import { IonButton } from '@ionic/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DeliveryOptions from './DeliveryOptions';
import PaystackPaymentButton from './PaystackPaymentButton';
import { NAIRA } from '../constants/unicode';
import {
  CheckoutDelivery,
  deliverySchema,
} from '../constants/schemas/checkout';
import useAuth from '../hooks/useAuth';

type FieldKeys = keyof CheckoutDelivery;

const CheckoutDeliveryForm = () => {
  const { isLoggedIn } = useAuth();

  const { watch, control, setValue } = useForm({
    resolver: yupResolver(deliverySchema),
  });
  const selectedOptionId = watch('id');

  if (!isLoggedIn) return null;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <DeliveryOptions
        control={control}
        setValue={(value: CheckoutDelivery) => {
          for (const key in value) {
            const field = key as FieldKeys;
            if (Object.prototype.hasOwnProperty.call(value, field)) {
              const fieldValue = value[field];
              setValue(field, fieldValue);
            }
          }
        }}
        selectedOptionId={selectedOptionId}
      />
      <PaystackPaymentButton
        id='checkoutFormButton'
        className='h-[50px] mt-[30px]'
        type='submit'
        expand='block'
      >
        Pay with Paystack{'\u2800'}
        <span className='font-medium'>({NAIRA} 13,500)</span>
      </PaystackPaymentButton>
    </form>
  );
};

export default CheckoutDeliveryForm;
