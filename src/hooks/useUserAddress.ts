import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from './useAuth';
import useFirestoreDocumentMutation from './useFirestoreDocumentMutation';

const useUserAddress = () => {
  const queryClient = useQueryClient();

  const { user = {}, uid } = useAuth();
  const { id: userId, addressId } = user || ({} as any);

  const userAddressQuery = useQuery({
    queryKey: ['user-address', addressId],
    queryFn: async () => {
      if (!addressId) return null;
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/address`,
        {
          params: { addressId: addressId },
        }
      );
      return data;
    },
    staleTime: Infinity,
  });
  const userAddress = userAddressQuery.data;

  const { firestoreDocumentMutation: userAddressMutation } =
    useFirestoreDocumentMutation({ collectionName: 'users' });

  const setUserAddressMutation = useMutation({
    mutationKey: ['user-address'],
    mutationFn: async (address: any) => {
      if (!userId) throw new Error('No user id provided');
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/address`,
        address
      );
      const updatedUser = { ...user, addressId: data.address_id };
      await userAddressMutation.mutateAsync({
        document: updatedUser,
        documentId: uid as string,
      });
      const userQueryKey = [
        'document',
        { collectionName: 'users', documentId: uid as string },
      ];
      queryClient.setQueryData(userQueryKey, updatedUser);
      queryClient.invalidateQueries([userQueryKey]);
      queryClient.invalidateQueries(['user-address']);
      return data;
    },
  });
  const setUserAddress = setUserAddressMutation.mutate;

  return {
    userAddressQuery,
    userAddress,
    setUserAddressMutation,
    setUserAddress,
  };
};

export default useUserAddress;
