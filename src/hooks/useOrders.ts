import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Cart } from './useCart';

const useOrders = () => {
  const createOrder = (data: { paymentReference: any; cart: Cart }) => {
    return axios.post('http://localhost:5000/orders', data);
  };

  const onOrderCreation = () => {};

  const createOrderMutation = useMutation({
    mutationKey: ['create-order'],
    mutationFn: createOrder,
    onSuccess: onOrderCreation,
  });

  return { createOrder: createOrderMutation.mutate, createOrderMutation };
};

export default useOrders;
