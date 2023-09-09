import CartProduct from './CartProduct';
import OrderItemsSkeleton from './skeletons/OrderItemsSkeleton';
import { ProductWithCartOptions } from '../hooks/useCart';

interface Props {
  items: ProductWithCartOptions[];
  loading?: boolean;
}

const OrderItems = ({ items = [], loading = false }: Props) => {
  if (loading) return <OrderItemsSkeleton />;

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
