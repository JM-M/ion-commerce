import { Dispatch, SetStateAction, createContext } from 'react';
import { ProductWithCartOptions } from '../hooks/useCart';

type CartProducts = ProductWithCartOptions[];

interface ContextInterface {
  cartProducts: CartProducts;
  setCartProducts: Dispatch<SetStateAction<CartProducts>> | Function;
}
const CartProductsContext = createContext<ContextInterface>({
  cartProducts: [],
  setCartProducts: () => null,
});

export default CartProductsContext;
