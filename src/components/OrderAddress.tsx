import { IonSkeletonText } from '@ionic/react';
import { CheckoutAddress } from '../constants/schemas/checkout';
import OrderAddressSkeleton from './skeletons/OrderAddressSkeleton';

interface Props {
  address: CheckoutAddress;
  loading?: boolean;
}

const OrderAddress = ({ address, loading = false }: Props) => {
  if (loading) return <OrderAddressSkeleton />;
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
