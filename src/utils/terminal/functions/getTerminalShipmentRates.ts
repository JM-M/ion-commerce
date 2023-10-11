import { terminalAPIInstance } from '../api';
import { OrderWithoutPaymentReference } from '../../../hooks/useTerminal';

const getTerminalShipmentRates = async (
  order: OrderWithoutPaymentReference
) => {
  const { data: shipmentRates } = await terminalAPIInstance.post(
    'shipment-rates',
    order
  );
  return shipmentRates;
};

export default getTerminalShipmentRates;
