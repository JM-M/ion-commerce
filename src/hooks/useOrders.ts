import { useIonRouter } from "@ionic/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Timestamp } from "@firebase/firestore";
import axios from "axios";
import useFirestoreDocumentQuery from "./useFirestoreDocumentQuery";
import useFirestoreCollectionQuery from "./useFirestoreCollectionQuery";
import useAuth, { UserFirestoreDocument } from "./useAuth";
import useCart, { Cart } from "./useCart";

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

const collectionName = "orders";

const useOrders = (props: Props = {}) => {
  const { orderId } = props;

  const queryClient = useQueryClient();

  const ionRouter = useIonRouter();

  const { user } = useAuth();

  const { clearCart } = useCart();

  const ordersQuery = useFirestoreCollectionQuery({
    collectionName,
    orderByField: "createdAt",
    match: { userId: user?.uid },
    options: {
      pageSize: 10,
    },
  });

  const orderQuery = useFirestoreDocumentQuery({
    collectionName,
    documentId: orderId,
  });

  const createOrder = async (data: Order) => {
    const { data: order } = await axios.post(
      "https://cubejkiddies-admin-nextjs.vercel.app/api/orders",
      data
    );
    await clearCart();
    return order;
  };

  const onOrderCreation = (order: Order) => {
    const { id } = order;
    ionRouter.push(`/store/orders/${id}`);
    queryClient.invalidateQueries(["collection", collectionName]);
  };

  const createOrderMutation = useMutation({
    mutationKey: ["create-order"],
    mutationFn: createOrder,
    onSuccess: onOrderCreation,
  });

  return {
    createOrder: createOrderMutation.mutate,
    createOrderMutation,
    order: orderQuery.data,
    orderQuery,
    orders: ordersQuery.data,
    ordersQuery,
  };
};

export default useOrders;
