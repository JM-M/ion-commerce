import { object, string, number, InferType } from 'yup';

export const contactSchema = object({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  phoneNumber: string().required('Phone number is required'),
  // test for validity of phone number here
});

export type CheckoutContact = InferType<typeof contactSchema>;

export const addressSchema = object({
  country: string().required(),
  state: string().required(),
  city: string().required(),
  streetAddress: string().required(),
  additionalDetails: string(),
});

export type CheckoutAddress = InferType<typeof addressSchema>;

export const deliverySchema = object({
  carrier: string().required(),
  estimatedDeliveryDate: string().required(),
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
