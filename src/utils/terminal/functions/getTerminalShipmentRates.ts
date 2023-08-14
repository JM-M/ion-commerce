import {
  createAddress,
  createParcel,
  getShipmentRates,
  getStates,
} from "../api";
import measureCart from "../../cart/measureCart";
import { ProductWithCartOptions } from "../../../hooks/useCart";
import { OrderWithoutPaymentReference } from "../../../hooks/useTerminal";

const defaultPackaging = {
  _id: "6427d308e595a770e83ac8e6",
  height: 1,
  length: 47,
  name: "DHL Express Large Flyer",
  size_unit: "cm",
  type: "box",
  user: "USER-90739243738",
  weight: 0.2,
  weight_unit: "kg",
  width: 38,
  packaging_id: "PA-12587974161",
  created_at: "2023-04-01T06:45:28.628Z",
  updated_at: "2023-04-01T06:45:28.628Z",
  __v: 0,
  id: "6427d308e595a770e83ac8e6",
};

const pickupAddress = {
  user: "USER-90739243738",
  city: "Ikeja",
  coordinates: [Object],
  country: "NG",
  email: "mikejolamoses@gmail.com",
  first_name: "Michael",
  is_residential: true,
  last_name: "Jola-Moses",
  line1: "Some place in Ikeja",
  line2: "",
  metadata: [Object],
  phone: "+2348115058726",
  place_id: "ChIJmTkq-iiSOxAR8KG73UsyqNc",
  state: "Lagos",
  shop_ship: "",
  zip: "19756",
  address_id: "AD-53508871955",
  created_at: "2023-04-08T14:31:23.772Z",
  updated_at: "2023-04-08T14:31:23.772Z",
  __v: 0,
};

const getParcelItems = (cartProducts: ProductWithCartOptions[]) => {
  return cartProducts.map(({ name, qty, variant, price, weight = 100 }) => {
    const variantKeys = Object.keys(variant);
    const properties = !!variantKeys.length
      ? `with the following properties: ${variantKeys
          .map((key) => `${key}: ${variant[key]}`)
          .join(", ")}`
      : "";
    const description = `${qty} pc${qty ? "s" : ""} of ${name} ${properties}`;
    return {
      description,
      name,
      type: "parcel",
      currency: "NGN",
      value: price, // validate this before calling this controller
      quantity: qty,
      weight: weight / 1000, // add this to the admin form
    };
  });
};

const getTerminalShipmentRates = async (
  order: OrderWithoutPaymentReference
) => {
  const { cart, user } = order;
  const { checkout } = cart;
  const { email } = user;
  const {
    country,
    city,
    streetAddress: line1,
    additionalDetails: line2,
    zipCode: zip,
  } = checkout?.address || {};
  const {
    firstName: first_name,
    lastName: last_name,
    phoneNumber: phone,
  } = checkout?.contact || {};

  const states = await getStates({ country_code: country });
  const state = states.find(
    ({ isoCode }: any) => isoCode === checkout?.address?.state
  )?.name;

  const deliveryAddress = await createAddress({
    first_name,
    last_name,
    email,
    phone: `+${phone}`,
    country,
    state,
    city,
    line1,
    line2,
    zip,
  });

  const cartProducts = cart.products;
  const { totalCartValue, cartSize } = measureCart(cartProducts);
  const cartDescription = `${cartSize} item${
    cartSize > 1 ? "s" : ""
  } in total valued at NGN${totalCartValue}`;

  const parcel = await createParcel({
    description: cartDescription,
    items: getParcelItems(cartProducts),
    packaging: defaultPackaging.packaging_id,
    weight_unit: "kg",
  });

  const shipmentRates = await getShipmentRates({
    pickup_address: pickupAddress.address_id,
    delivery_address: deliveryAddress.address_id,
    parcel_id: parcel.parcel_id,
  });

  return shipmentRates;
};

export default getTerminalShipmentRates;
