import { useQuery } from '@tanstack/react-query';
import { Order } from './useOrders';
import useAuth from './useAuth';
import { getCities, getCountries, getStates } from '../utils/terminal/api';
import getTerminalShipmentRates from '../utils/terminal/functions/getTerminalShipmentRates';

type Country = { name: string; isoCode: string };

export interface OrderWithoutPaymentReference
  extends Omit<Order, 'paymentReference'> {}

interface Props {
  countryIsoCode?: string;
  stateIsoCode?: string;
  order?: OrderWithoutPaymentReference;
}

const useTerminal = (props: Props = {}) => {
  const { countryIsoCode = 'NG', stateIsoCode = '', order } = props;

  const { isLoggedIn } = useAuth();

  const countriesQuery = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const countries = await getCountries();
      return countries;
    },
    staleTime: Infinity,
  });

  const statesQuery = useQuery({
    queryKey: ['states', countryIsoCode],
    queryFn: async () => {
      const states = await getStates({ country_code: countryIsoCode });
      return states;
    },
    staleTime: Infinity,
  });

  const citiesQuery = useQuery({
    queryKey: ['cities', countryIsoCode, stateIsoCode],
    queryFn: async () => {
      const cities = await getCities({
        country_code: countryIsoCode,
        state_code: stateIsoCode,
      });
      return cities;
    },
    staleTime: Infinity,
  });

  const shipmentRatesQuery = useQuery({
    queryKey: ['shipment-rates', order],
    queryFn: async () => {
      if (!order || !isLoggedIn) return [];
      const rates = await getTerminalShipmentRates(order);
      return rates;
    },
    staleTime: 1000 * 60 * 5,
  });

  const getCountryNameFromIsoCode = (isoCode: string) => {
    const countries = countriesQuery.data;
    if (countriesQuery.isLoading || !countries.length) return false;
    return countries.find((country: Country) => country.isoCode === isoCode);
  };

  const getStateNameFromIsoCode = (isoCode: string) => {
    const states = statesQuery.data;
    if (statesQuery.isLoading || !states.length) return false;
    return states.find((state: Country) => state.isoCode === isoCode);
  };

  return {
    countriesQuery,
    statesQuery,
    citiesQuery,
    shipmentRatesQuery,
    getCountryNameFromIsoCode,
    getStateNameFromIsoCode,
  };
};

export default useTerminal;
