import axios from "axios";

export const terminalAPIInstance = axios.create({
  baseURL: "https://sandbox.terminal.africa/v1/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TERMINAL_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

export const enableCarriers = async (carriersData: any) => {
  const { data } = await terminalAPIInstance.post(
    "carriers/multiple/enable",
    carriersData
  );
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};

export const getCarriers = async () => {
  const { data } = await terminalAPIInstance.get("carriers");
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};

export const createPackaging = async (packagingData: any) => {
  const { data } = await terminalAPIInstance.post("packaging", packagingData);
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};

export const getPackages = async () => {
  const { data } = await terminalAPIInstance.get("packaging");
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};

export const getAddresses = async () => {
  const { data } = await terminalAPIInstance.get("addresses");
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};

export const validateAddress = async (addressValidationData: any) => {
  const { data } = await terminalAPIInstance.post(
    "addresses/validate",
    addressValidationData
  );
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};

export const createAddress = async (addressData: any) => {
  const { data } = await terminalAPIInstance.post("addresses", addressData);
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};

export const updateAddress = async ({ data, id }: any) => {
  const res = await terminalAPIInstance.put(`addresses/${id}`, data);
  if (res.data.status) return res.data.data;
};

export const createParcel = async (parcelData: any) => {
  const { data } = await terminalAPIInstance.post("parcels", parcelData);
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};

export const getShipmentRates = async (shipmentData: any) => {
  const { data } = await terminalAPIInstance.get("rates/shipment", {
    params: shipmentData,
  });
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};

export const createShipment = async (shipmentData: any) => {
  const { data } = await terminalAPIInstance.post("shipments", shipmentData);
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};

export const trackShipment = async (shipmentId: any) => {
  const { data } = await terminalAPIInstance.get(
    `shipments/track/${shipmentId}`
  );
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};

export const arrangePickupAndDelivery = async (pickupData: any) => {
  const { data } = await terminalAPIInstance.post(
    "shipments/pickup",
    pickupData
  );
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};

export const getCountries = async () => {
  const { data } = await terminalAPIInstance.get("countries");
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};

export const getCities = async ({ country_code, state_code }: any) => {
  const { data } = await terminalAPIInstance.get("cities", {
    params: {
      country_code,
      state_code,
    },
  });
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};

export const getStates = async ({ country_code }: any) => {
  const { data } = await terminalAPIInstance.get("states", {
    params: { country_code },
  });
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};

export const getWebhooks = async () => {
  const { data } = await terminalAPIInstance.get("webhooks");
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};

export const createWebhook = async (webhookData: any) => {
  const { data } = await terminalAPIInstance.post("webhooks", webhookData);
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};

export const deleteWebhook = async (webhookId: any) => {
  const { data } = await terminalAPIInstance.delete(`webhooks/${webhookId}`);
  if (data.status) return data.data;
  throw new Error(data.message || "An error occurred");
};