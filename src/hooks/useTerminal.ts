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
      const error = countries.errorMessage;
      if (error) throw new Error(error);
      return countries;
    },
    staleTime: Infinity,
    retryOnMount: true,
  });

  const statesQuery = useQuery({
    queryKey: ['states', countryIsoCode],
    queryFn: async () => {
      if (!countryIsoCode) return [];
      const states = await getStates({ country_code: countryIsoCode });
      const error = states.errorMessage;
      if (error) throw new Error(error);
      return states;
    },
    staleTime: Infinity,
    retryOnMount: true,
  });

  const citiesQuery = useQuery({
    queryKey: ['cities', countryIsoCode, stateIsoCode],
    queryFn: async () => {
      const cities = await getCities({
        country_code: countryIsoCode,
        state_code: stateIsoCode,
      });
      const error = cities.errorMessage;
      if (error) throw new Error(error);
      return cities;
    },
    staleTime: Infinity,
    retryOnMount: true,
  });

  const shipmentRatesQuery = useQuery({
    queryKey: ['shipment-rates', order],
    queryFn: async () => {
      if (!order || !isLoggedIn) return [];
      const rates = await getTerminalShipmentRates(order);
      return rates;
    },
    staleTime: 1000 * 60 * 5,
    retryOnMount: true,
  });

  const getCountryFromIsoCode = (isoCode: string) => {
    const countries = countriesQuery.data;
    if (countriesQuery.isLoading || !countries.length) return false;
    return countries.find((country: Country) => country.isoCode === isoCode);
  };

  const getStateFromIsoCode = (isoCode: string) => {
    const states = statesQuery.data;
    if (statesQuery.isLoading || !states.length) return false;
    return states.find((state: Country) => state.isoCode === isoCode);
  };

  const getStateFromName = (name: string) => {
    const states = statesQuery.data;
    if (statesQuery.isLoading || !states.length) return false;
    return states.find((state: Country) => state.name === name);
  };

  return {
    countriesQuery,
    statesQuery,
    citiesQuery,
    shipmentRatesQuery,
    getCountryFromIsoCode,
    getStateFromIsoCode,
    getStateFromName,
  };
};

export default useTerminal;
