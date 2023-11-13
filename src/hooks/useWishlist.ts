import { useQueryClient } from '@tanstack/react-query';
import useFirestoreCollectionQuery from './useFirestoreCollectionQuery';
import useFirestoreDocumentMutation from './useFirestoreDocumentMutation';
import useFirestoreDocumentDeletion from './useFirestoreDocumentDeletion';
import useAuth from './useAuth';
import useCollectionInfiniteQuery from './useCollectionInfiniteQuery';
import useFirestoreDocumentQuery from './useFirestoreDocumentQuery';
import useCollectionCount from './useCollectionCount';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image?: string;
}

interface Props {
  productId: string;
}

const useWishlist = (props: Props = { productId: '' }) => {
  const { productId } = props;
  const { uid, isLoggedIn } = useAuth();

  const queryClient = useQueryClient();

  const collectionName = `users/${uid}/wishlist`;

  const wishlistCountQuery = useCollectionCount({
    collectionName,
  });

  const wishlistQuery = useCollectionInfiniteQuery({
    collectionName,
    pageSize: 10,
    orderByField: 'createdAt',
  });
  const { allDocs: wishlist } = wishlistQuery.data || {};

  const wishlistItemQuery = useFirestoreDocumentQuery({
    collectionName,
    documentId: productId,
    keys: [uid],
    retry: false,
  });
  if (productId === '389ff1f3-e3d5-4068-a5e9-809bdc36ee94')
    console.log({
      collectionName,
      documentId: productId,
      keys: [uid],
      retry: false,
    });

  const onWishlistItemAdd = (wishlistItem: WishlistItem) => {
    queryClient.setQueriesData(
      { queryKey: ['document', { collectionName, documentId: productId }] },
      wishlistItem
    );
  };

  const { firestoreDocumentMutation: addWishlistItemMutation } =
    useFirestoreDocumentMutation({
      collectionName,
      invalidateDocumentQuery: true,
      invalidateCollectionQuery: true,
      onSuccess: onWishlistItemAdd,
    });

  const addWishlistItem = (wishlistItem: WishlistItem) => {
    if (!isLoggedIn) return;
    addWishlistItemMutation.mutate({
      document: wishlistItem,
      documentId: productId!,
      addTimestamp: true,
    });
  };

  const onWishlistItemRemove = () => {
    queryClient.setQueriesData(
      { queryKey: ['document', { collectionName, documentId: productId }] },
      null
    );
  };

  const { firestoreDocumentDeletion: removeWishlistItemMutation } =
    useFirestoreDocumentDeletion({
      collectionName,
      documentIds: [productId!],
      onSuccess: onWishlistItemRemove,
    });

  const removeWishlistItem = () => {
    removeWishlistItemMutation.mutate();
  };

  return {
    wishlist,
    wishlistQuery,
    wishlistItemQuery,
    addWishlistItemMutation,
    addWishlistItem,
    removeWishlistItemMutation,
    removeWishlistItem,
    wishlistCountQuery,
  };
};

export default useWishlist;
