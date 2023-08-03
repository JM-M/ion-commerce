import useFirestoreCollectionQuery from "./useFirestoreCollectionQuery";
import useFirestoreDocumentMutation from "./useFirestoreDocumentMutation";
import useFirestoreDocumentDeletion from "./useFirestoreDocumentDeletion";
import useAuth from "./useAuth";

export interface WishlistItem {}

const useWishlist = () => {
  const { uid, isLoggedIn } = useAuth();

  const collectionName = `users/${uid}/wishlist`;

  const wishlistQuery = useFirestoreCollectionQuery({
    collectionName,
    options: { pageSize: 10 },
  });
  const wishlist = wishlistQuery.data;

  const { firestoreDocumentMutation: wishlistMutation } =
    useFirestoreDocumentMutation({
      collectionName,
      invalidateDocumentQuery: true,
      // onSuccess: (wish: Review) => {
      //   queryClient.setQueryData(
      //     [
      //       "document",
      //       { collectionName: reviewsCollectionName, documentId: uid },
      //     ],
      //     review
      //   );
      // },
    });

  const addWishlistItem = async (wishlistItem: WishlistItem) => {
    if (!isLoggedIn) return;
    wishlistMutation.mutate({
      document: wishlistItem,
      documentId: uid!,
      addTimestamp: true,
    });
  };

  return {
    wishlist,
    wishlistQuery,
  };
};

export default useWishlist;
