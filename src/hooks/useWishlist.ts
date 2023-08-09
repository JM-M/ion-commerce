import { useQueryClient } from "@tanstack/react-query";
import useFirestoreCollectionQuery from "./useFirestoreCollectionQuery";
import useFirestoreDocumentMutation from "./useFirestoreDocumentMutation";
import useFirestoreDocumentDeletion from "./useFirestoreDocumentDeletion";
import useAuth from "./useAuth";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image?: string;
}

interface Props {
  productId: string;
}

const useWishlist = (props: Props = { productId: "" }) => {
  const { productId } = props;
  const { uid, isLoggedIn } = useAuth();

  const queryClient = useQueryClient();

  const collectionName = `users/${uid}/wishlist`;

  const wishlistQuery = useFirestoreCollectionQuery({
    collectionName,
    options: { pageSize: 10 },
  });
  const wishlist = wishlistQuery.data;

  const onWishlistChange = () => {
    queryClient.invalidateQueries(["collection", collectionName]);
  };

  const onWishlistItemAdd = (wishlistItem: WishlistItem) => {
    queryClient.setQueriesData({ queryKey: ["collection", collectionName] }, [
      ...(wishlist || []),
      wishlistItem,
    ]);
    onWishlistChange();
  };

  const { firestoreDocumentMutation: addWishlistItemMutation } =
    useFirestoreDocumentMutation({
      collectionName,
      invalidateDocumentQuery: true,
      onSuccess: onWishlistItemAdd,
    });

  const addWishlistItem = (wishlistItem: WishlistItem) => {
    if (!isLoggedIn || !wishlist) return;
    addWishlistItemMutation.mutate({
      document: wishlistItem,
      documentId: productId!,
      addTimestamp: true,
    });
  };

  const onWishlistItemRemove = () => {
    queryClient.setQueriesData(
      { queryKey: ["collection", collectionName] },
      () => {
        if (wishlist)
          return wishlist.filter(({ id }: WishlistItem) => id !== productId);
        return undefined;
      }
    );
    onWishlistChange();
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

  const isLoading =
    addWishlistItemMutation.isLoading || removeWishlistItemMutation.isLoading;

  const isInWishlist = !!wishlist?.find(
    ({ id }: WishlistItem) => id === productId
  );

  return {
    wishlist,
    wishlistQuery,
    addWishlistItemMutation,
    addWishlistItem,
    removeWishlistItemMutation,
    removeWishlistItem,
    isLoading,
    isInWishlist,
  };
};

export default useWishlist;
