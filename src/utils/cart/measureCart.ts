import { ProductWithCartOptions } from "../../hooks/useCart";

interface CartMeasurement {
  cartSize: number;
  totalCartValue: number;
}

const measureCart = (cartProducts: ProductWithCartOptions[]) => {
  return cartProducts?.length
    ? cartProducts.reduce(
        (prev: CartMeasurement, curr: ProductWithCartOptions) => ({
          cartSize: curr.qty + prev.cartSize,
          totalCartValue: curr.qty * curr.price + prev.totalCartValue,
        }),
        { cartSize: 0, totalCartValue: 0 }
      )
    : { cartSize: 0, totalCartValue: 0 };
};

export default measureCart;
