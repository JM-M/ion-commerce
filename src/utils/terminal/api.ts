import axios from 'axios';

export const terminalAPIInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL_DEV}/terminal/`,
});

export const getCountries = async () => {
  const { data } = await terminalAPIInstance.get('countries');
  return data;
};

export const getCities = async ({ country_code, state_code }: any) => {
  const { data } = await terminalAPIInstance.get('cities', {
    params: {
      country_code,
      state_code,
    },
  });
  return data;
};

export const getStates = async ({ country_code }: any) => {
  const { data } = await terminalAPIInstance.get('states', {
    params: { country_code },
  });
  return data;
};
