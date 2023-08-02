import { NAIRA } from "../constants/unicode";
import { ProductWithCartOptions } from "../hooks/useCart";
import CartProduct from "./CartProduct";

interface Props {
  items: ProductWithCartOptions[];
}

const OrderItems = ({ items = [] }: Props) => {
  return (
    <div>
      <ul>
        {items.map((item, i) => {
          const { qty } = item;
          return (
            <li key={i}>
              <CartProduct product={item} qty={qty} hideCounter />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderItems;
