import { IonButton } from "@ionic/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DeliveryOptions from "./DeliveryOptions";
import PaystackPaymentButton from "./PaystackPaymentButton";
import PageLoader from "./PageLoader";
import { NAIRA } from "../constants/unicode";
import {
  CheckoutDelivery,
  deliverySchema,
} from "../constants/schemas/checkout";
import useAuth from "../hooks/useAuth";
import useTerminal from "../hooks/useTerminal";
import useCart from "../hooks/useCart";
import useOrders from "../hooks/useOrders";

type FieldKeys = keyof CheckoutDelivery;

interface TerminalDeliveryRate {
  carrier_name: string;
  carrier_logo: string;
  amount: number;
  delivery_time: string;
  id: string;
}

const CheckoutDeliveryForm = () => {
  const { isLoggedIn, user } = useAuth();
  const { cart, totalCartValue } = useCart();
  const { createOrder, createOrderMutation } = useOrders();

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
  const selectedOptionId = watch("id");

  if (!isLoggedIn) return null;
  if (shipmentRatesQuery.isLoading) return <PageLoader />;
  if (!shipmentRatesQuery.data) return <>Rates data does not exist</>;

  const deliveryOptions: CheckoutDelivery[] = shipmentRatesQuery.data.map(
    ({
      carrier_name: carrier,
      carrier_logo: logo,
      amount: price,
      delivery_time: estimatedDeliveryTime,
      id,
    }: TerminalDeliveryRate) => ({
      carrier,
      logo,
      price,
      estimatedDeliveryTime,
      id,
    })
  );

  const deliveryPrice = +watch("price");

  const paymentValue = Math.round((totalCartValue + deliveryPrice) * 100) / 100;

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
        id="checkoutFormButton"
        className="h-[50px] mt-[30px]"
        type="submit"
        expand="block"
        disabled={!deliveryPrice}
        paymentValue={+paymentValue}
        onSuccess={(referenceData: any) => {
          const data = {
            paymentReference: referenceData.reference,
            cart,
            user,
            userId: user.uid,
          };
          createOrder(data);
        }}
        onClose={() => console.log("close")}
        loading={createOrderMutation.isLoading}
      >
        Pay with Paystack{"\u2800"}
        {!!deliveryPrice && (
          <span className="font-medium">
            ({NAIRA} {paymentValue})
          </span>
        )}
      </PaystackPaymentButton>
    </form>
  );
};

export default CheckoutDeliveryForm;
