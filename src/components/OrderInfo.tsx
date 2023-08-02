import OrderAddress from "./OrderAddress";
import {
  CheckoutAddress,
  CheckoutContact,
} from "../constants/schemas/checkout";

interface Props {
  email: string;
  contact: CheckoutContact;
  address: CheckoutAddress;
}

const OrderInfo = ({ contact, email, address }: Props) => {
  const { firstName, lastName, phoneNumber } = contact;
  const fullName = `${firstName} ${lastName}`;

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <h5 className="font-medium mb-1 text-[var(--ion-color-medium)]">
            Full Name
          </h5>
          <span>{fullName}</span>
        </div>
        <div className="flex-1">
          <h5 className="font-medium mb-1 text-[var(--ion-color-medium)]">
            Phone Number
          </h5>
          <span>+{phoneNumber}</span>
        </div>
      </div>
      <div className="mt-5">
        <h5 className="font-medium mb-1 text-[var(--ion-color-medium)]">
          Email
        </h5>
        <span>{email}</span>
      </div>
      <div className="mt-5 mb-16">
        <h5 className="font-medium mb-1 text-[var(--ion-color-medium)]">
          Address
        </h5>
        <OrderAddress address={address} />
      </div>
    </>
  );
};

export default OrderInfo;
