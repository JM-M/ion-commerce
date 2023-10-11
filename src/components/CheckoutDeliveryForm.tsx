import { IonButton } from '@ionic/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DeliveryOptions from './DeliveryOptions';
import PaystackPaymentButton from './PaystackPaymentButton';
import PageLoader from './PageLoader';
import ErrorText from './ErrorText';
import { NAIRA } from '../constants/unicode';
import {
  CheckoutDelivery,
  deliverySchema,
} from '../constants/schemas/checkout';
import useAuth from '../hooks/useAuth';
import useTerminal from '../hooks/useTerminal';
import useCart from '../hooks/useCart';
import useOrders from '../hooks/useOrders';

type FieldKeys = keyof CheckoutDelivery;

interface TerminalDeliveryRate {
  carrier_name: string;
  carrier_logo: string;
  amount: number;
  delivery_time: string;
  id: string;
  rate_id: string;
  parcel: string;
  includes_insurance: boolean;
}

const CheckoutDeliveryForm = () => {
  const { isLoggedIn, user } = useAuth();
  const { cart, totalCartValue, cartHasError } = useCart();
  const { createOrder, createOrderMutation } = useOrders();
  const orderCreationError: any = createOrderMutation.error;

  const { shipmentRatesQuery } = useTerminal({
    order: {
      cart,
      user,
      userId: user?.uid,
    },
  });

  const { watch, control, setValue } = useForm({
    resolver: yupResolver(deliverySchema),
  });
  const selectedOptionId = watch('id');

  if (!isLoggedIn) return null;
  if (shipmentRatesQuery.isLoading) return <PageLoader />;
  if (!shipmentRatesQuery.data?.length)
    return <div className='text-center'>Unable to fetch delivery options</div>;

  const deliveryOptions: CheckoutDelivery[] = shipmentRatesQuery.data?.map(
    ({
      carrier_name: carrier,
      carrier_logo: logo,
      amount: price,
      delivery_time: estimatedDeliveryTime,
      id,
      rate_id,
      parcel,
      includes_insurance,
    }: TerminalDeliveryRate) => ({
      carrier,
      logo,
      price,
      estimatedDeliveryTime,
      id,
      rateId: rate_id,
      parcel,
      includesInsurance: includes_insurance,
    })
  );

  const deliveryPrice = +watch('price');

  const paymentValue = Math.round((totalCartValue + deliveryPrice) * 100) / 100;

  const selectedOption =
    selectedOptionId &&
    deliveryOptions.find((option) => option?.id === selectedOptionId);

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
        options={deliveryOptions}
      />
      <PaystackPaymentButton
        id='checkoutFormButton'
        className='h-[50px] mt-[30px]'
        type='submit'
        expand='block'
        disabled={!deliveryPrice || cartHasError || orderCreationError}
        paymentValue={+paymentValue}
        onSuccess={(referenceData: any) => {
          const data = {
            paymentReference: referenceData.reference,
            cart: {
              ...cart,
              checkout: { ...(cart?.checkout || {}), delivery: selectedOption },
            },
            user,
            userId: user.uid,
          };
          createOrder(data);
        }}
        onClose={() => null}
        loading={createOrderMutation.isLoading}
      >
        Pay with Paystack{'\u2800'}
        {!!deliveryPrice && (
          <span className='font-medium'>
            ({NAIRA} {paymentValue})
          </span>
        )}
      </PaystackPaymentButton>
      {cartHasError && (
        <ErrorText
          className='ml-0 mt-5 text-center'
          text='There are errors in the cart. Please check the products in your cart above'
          hideHorizontalBar={true}
        />
      )}
      {orderCreationError && (
        <ErrorText
          className='ml-0 mt-5 text-center'
          text={orderCreationError.message}
          hideHorizontalBar={true}
        />
      )}
    </form>
  );
};

export default CheckoutDeliveryForm;
