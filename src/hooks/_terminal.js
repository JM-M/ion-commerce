import axios from 'axios';

export const terminalAPIInstance = axios.create({
  baseURL: 'https://api.terminal.africa/v1/',
  headers: {
    Authorization: `Bearer ${process.env.TERMINAL_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const enableCarriers = async (carriersData) => {
  const { data } = await terminalAPIInstance.post(
    'carriers/multiple/enable',
    carriersData
  );
  if (data.status) return data.data;
};

export const getCarriers = async () => {
  const { data } = await terminalAPIInstance.get('carriers');
  if (data.status) return data.data;
};

export const createPackage = async (packageData) => {
  const { data } = await terminalAPIInstance.post('packaging', packageData);
  if (data.status) return data.data;
};

export const getPackages = async () => {
  const { data } = await terminalAPIInstance.get('packaging');
  if (data.status) return data.data;
};

export const getAddresses = async () => {
  const { data } = await terminalAPIInstance.get('addresses');
  if (data.status) return data.data;
};

export const validateAddress = async (addressValidationData) => {
  const { data } = await terminalAPIInstance.post(
    'addresses/validate',
    addressValidationData
  );
  if (data.status) return data.data;
};

export const createAddress = async (addressData) => {
  const { data } = await terminalAPIInstance.post('addresses', addressData);
  if (data.status) return data.data;
};

export const updateAddress = async ({ data, id }) => {
  const res = await terminalAPIInstance.put(`addresses/${id}`, data);
  if (res.data.status) return res.data.data;
};

export const createParcel = async (parcelData) => {
  const { data } = await terminalAPIInstance.post('parcels', parcelData);
  if (data.status) return data.data;
};

export const getShipmentRates = async (shipmentData) => {
  const { data } = await terminalAPIInstance.get('rates/shipment', {
    params: shipmentData,
  });
  if (data.status) return data.data;
};

export const createShipment = async (shipmentData) => {
  const { data } = await terminalAPIInstance.post('shipments', shipmentData);
  if (data.status) return data.data;
};

export const trackShipment = async (shipmentId) => {
  const { data } = await terminalAPIInstance.get(
    `shipments/track/${shipmentId}`
  );
  if (data.status) return data.data;
};

export const arrangePickupAndDelivery = async (pickupData) => {
  const { data } = await terminalAPIInstance.post(
    'shipments/pickup',
    pickupData
  );
  if (data.status) return data.data;
};

export const getCountries = async () => {
  const { data } = await terminalAPIInstance.get('countries');
  if (data.status) return data.data;
};

export const getCities = async ({ state_code }) => {
  const { data } = await terminalAPIInstance.get('cities', {
    params: {
      country_code: 'NG',
      state_code,
    },
  });
  if (data.status) return data.data;
};

export const getStates = async () => {
  const { data } = await terminalAPIInstance.get('states', {
    params: {
      country_code: 'NG',
    },
  });
  if (data.status) return data.data;
};

export const getWebhooks = async () => {
  const { data } = await terminalAPIInstance.get('webhooks');
  if (data.status) return data.data;
};

export const createWebhook = async (webhookData) => {
  const { data } = await terminalAPIInstance.post('webhooks', webhookData);
  if (data.status) return data.data;
};

export const deleteWebhook = async (webhookId) => {
  const { data } = await terminalAPIInstance.delete(`webhooks/${webhookId}`);
  if (data.status) return data.data;
};
