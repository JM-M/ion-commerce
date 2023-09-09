import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const usePaystack = () => {
  const getCountries = async () => {
    // console.log('in get paystack countries');
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/paystack/countries`
    );
    // console.log(data);
    return data;
  };

  const countriesQuery = useQuery({
    queryKey: ['paystack', 'countries'],
    queryFn: getCountries,
  });

  const supportedCountries = countriesQuery.data;

  return { supportedCountries };
};

export default usePaystack;
