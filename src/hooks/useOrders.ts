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
import useCollectionInfiniteQuery from './useCollectionInfiniteQuery';
import useFirestoreDocumentMutation from './useFirestoreDocumentMutation';
import generateOrderId from '../utils/cart/orders/generateOrderId';

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

  const ordersQuery = useCollectionInfiniteQuery({
    collectionName,
    orderByField: 'createdAt',
    pageSize: 10,
    filter: { userId: ['==', user?.uid] },
  });
  const { allDocs: orders } = ordersQuery.data || {};

  const orderQuery = useFirestoreDocumentQuery({
    collectionName,
    documentId: orderId,
  });

  for (let i = 0; i < 100; i++) {
    generateOrderId();
  }
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

  const { firestoreDocumentMutation: createOrderDocumentMutation } =
    useFirestoreDocumentMutation({ collectionName });

  const createOrder = async (data: Order) => {
    if (!isLoggedIn) return;
    const products = data?.cart?.products;
    const orderId = generateOrderId();
    const res = await createOrderDocumentMutation.mutateAsync({
      document: {
        ...data,
        statusEvents: [
          { status: 'confirmed', time: Timestamp.fromDate(new Date()) },
        ],
      },
      documentId: orderId,
      addTimestamp: true, // important, orderQuery doesn't work without createdAt field
    });
    const responseData = res.data;
    await updateBuyerLists(products);
    await clearCart();
    ionRouter.push(`/store/orders/${orderId}`);
    queryClient.invalidateQueries(['collection', collectionName]);
    return responseData;
  };

  const createOrderMutation = useMutation({
    mutationKey: ['create-order'],
    mutationFn: createOrder,
  });

  return {
    createOrder: createOrderMutation.mutate,
    createOrderMutation,
    order: orderQuery.data,
    orderQuery,
    orders: orders as Order[],
    ordersQuery,
  };
};

export default useOrders;
