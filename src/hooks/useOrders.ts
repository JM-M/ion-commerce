import { useIonRouter } from '@ionic/react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Timestamp } from '@firebase/firestore';
import axios from 'axios';
import useFirestoreDocumentQuery from './useFirestoreDocumentQuery';
import useFirestoreCollectionQuery from './useFirestoreCollectionQuery';
import useMultipleFirebaseDocumentsMutation from './useMultipleFirebaseDocumentsMutation';
import useAuth, { UserFirestoreDocument } from './useAuth';
import useCart, { Cart } from './useCart';
import { Product } from '../constants/schemas/product';

export type StatusEvent = { status: string; time: Timestamp };

export interface Order {
  paymentReference: string;
  cart: Cart;
  user: UserFirestoreDocument;
  userId: string;
  id?: string;
  statusEvents?: StatusEvent[];
  createdAt?: Timestamp;
}

interface Props {
  orderId?: string;
}

const collectionName = 'orders';

const useOrders = (props: Props = {}) => {
  const { orderId } = props;

  const queryClient = useQueryClient();

  const ionRouter = useIonRouter();

  const { user, uid, isLoggedIn } = useAuth();

  const { clearCart } = useCart();

  const ordersQuery = useFirestoreCollectionQuery({
    collectionName,
    orderByField: 'createdAt',
    filter: { userId: ['==', user?.uid] },
    options: {
      pageSize: 10,
    },
  });

  const orderQuery = useFirestoreDocumentQuery({
    collectionName,
    documentId: orderId,
  });

  const { multipleFirestoreDocumentsMutation: orderProductBuyersMutation } =
    useMultipleFirebaseDocumentsMutation({
      mutationKey: ['update-order-products-buyers-subcollection'],
    });

  const updateBuyerLists = async (products: Product[]) => {
    const collections = products.map((product) => {
      return {
        name: `products/${product.id}/buyers`,
        documents: [{ id: uid! }],
      };
    });
    await orderProductBuyersMutation.mutateAsync({ collections });
  };

  const createOrder = async (data: Order) => {
    if (!isLoggedIn) return;
    const products = data?.cart?.products;
    await updateBuyerLists(products);
    const { data: order } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/orders`,
      data
    );
    await clearCart();
    return order;
  };

  const onOrderCreation = (order: Order) => {
    if (!order) return;
    const { id } = order;
    ionRouter.push(`/store/orders/${id}`);
    queryClient.invalidateQueries(['collection', collectionName]);
  };

  const createOrderMutation = useMutation({
    mutationKey: ['create-order'],
    mutationFn: createOrder,
    onSuccess: onOrderCreation,
  });

  return {
    createOrder: createOrderMutation.mutate,
    createOrderMutation,
    order: orderQuery.data,
    orderQuery,
    orders: ordersQuery.data as Order[],
    ordersQuery,
  };
};

export default useOrders;
