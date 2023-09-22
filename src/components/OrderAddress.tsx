import OrderAddressSkeleton from './skeletons/OrderAddressSkeleton';
import { CheckoutAddress } from '../constants/schemas/checkout';
import useTerminal from '../hooks/useTerminal';

interface Props {
  address: CheckoutAddress;
  loading?: boolean;
}

const OrderAddress = ({ address, loading = false }: Props) => {
  const { getStateFromIsoCode, statesQuery } = useTerminal();
  if (loading || statesQuery.isLoading) return <OrderAddressSkeleton />;
  const { streetAddress, additionalDetails, city, state } = address;
  return (
    <div>
      <div>{streetAddress}</div>
      <div>{additionalDetails}</div>
      <div>{city}</div>
      <div>{getStateFromIsoCode(state)?.name || null}</div>
    </div>
  );
};

export default OrderAddress;
