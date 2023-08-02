import { object, string, number, InferType } from "yup";

export const contactSchema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  phoneNumber: string().required("Phone number is required"),
  // test for validity of phone number here
});

export type CheckoutContact = InferType<typeof contactSchema>;

export const addressSchema = object({
  country: string().required("Please select a country"),
  state: string().required("State is required"),
  city: string().required("City is required"),
  streetAddress: string().required("Street address is required"),
  additionalDetails: string(),
  zipCode: string().required("Postal/Zip code is required"),
});

export type CheckoutAddress = InferType<typeof addressSchema>;

export const deliverySchema = object({
  carrier: string().required(),
  estimatedDeliveryTime: string().required(),
  price: number().required(),
  logo: string().required(),
  id: string().required(),
});

export type CheckoutDelivery = InferType<typeof deliverySchema>;

const checkoutSchema = object({
  contact: contactSchema,
  address: addressSchema,
  delivery: deliverySchema,
});

export type Checkout = InferType<typeof checkoutSchema>;

export default checkoutSchema;
