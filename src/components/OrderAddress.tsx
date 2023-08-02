import { CheckoutAddress } from "../constants/schemas/checkout";

interface Props {
  address: CheckoutAddress;
}

const OrderAddress = ({ address }: Props) => {
  const { streetAddress, additionalDetails, city, state } = address;
  return (
    <div>
      <div>{streetAddress}</div>
      <div>{additionalDetails}</div>
      <div>{city}</div>
      <div>{state}</div>
    </div>
  );
};

export default OrderAddress;
