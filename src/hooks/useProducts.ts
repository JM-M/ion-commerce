import { useQueryClient } from '@tanstack/react-query';
import useFirestoreDocumentMutation from './useFirestoreDocumentMutation';
import useFirestoreCollectionQuery, {
  QueryFilter,
} from './useFirestoreCollectionQuery';
import useFirestoreDocumentQuery from './useFirestoreDocumentQuery';
import useFirestoreDocumentDeletion from './useFirestoreDocumentDeletion';
import { Review } from '../constants/schemas/review';
import useAuth from './useAuth';
import useAlgoliaSearch from './useAlgoliaSearch';
import useCollectionInfiniteQuery from './useCollectionInfiniteQuery';

export interface SortOption {
  field: string;
  reverse?: boolean;
}

export interface FilterOption {
  field: string;
}

interface Props {
  productId?: string;
  productIds?: string[];
  sortBy?: SortOption;
  productFilters?: object;
  category?: string;
  onCreateReview?: Function;
}

const collectionName = 'products';

const useProducts = (props: Props = {}) => {
  const {
    productId,
    sortBy = { field: 'name', reverse: false },
    productIds,
    category,
    onCreateReview = () => null,
    productFilters = {},
  } = props;

  const queryClient = useQueryClient();

  const { isLoggedIn, uid } = useAuth();

  const filter = {
    category: category ? ['==', category] : undefined,
    ...productFilters,
  } as QueryFilter;

  const productsQuery = useAlgoliaSearch({
    index: collectionName,
    pageSize: 2,
  });

  const productQuery = useFirestoreDocumentQuery({
    collectionName,
    documentId: productId,
  });
  const product = productQuery.data;

  const { firestoreDocumentMutation: productMutation } =
    useFirestoreDocumentMutation({
      collectionName: 'products',
      invalidateDocumentQuery: true,
    });

  const reviewsCollectionName = `products/${productId}/reviews`;

  const reviewsQuery = useCollectionInfiniteQuery({
    collectionName: reviewsCollectionName,
    orderByField: 'createdAt',
    pageSize: 10,
  });

  const { allDocs = [] } = reviewsQuery.data || {};
  const reviews = allDocs.filter(({ userId }: Review) => userId !== uid);

  const reviewQuery = useFirestoreDocumentQuery({
    collectionName: reviewsCollectionName,
    documentId: uid,
  });

  const updateProductRating = async (userRating: number) => {
    const oldReview = reviewQuery.data;

    let count = product?.rating?.count || 0;
    let numUserReviews = product?.rating?.numUserReviews || 0;
    if (oldReview) {
      const countDifference = userRating - oldReview.rating;
      count = count + countDifference;
    } else {
      count += userRating;
      numUserReviews += 1;
    }
    const ranking = Math.round(((count + 5) / (count + 10)) * 100000);
    const newProductRating = { count, numUserReviews };
    productMutation.mutate({
      documentId: productId!,
      document: { ...product, rating: newProductRating, ranking },
    });
  };

  const { firestoreDocumentMutation: reviewMutation } =
    useFirestoreDocumentMutation({
      collectionName: reviewsCollectionName,
      invalidateDocumentQuery: true,
      onSuccess: (review: Review) => {
        updateProductRating(review.rating);
        onCreateReview();
        queryClient.setQueryData(
          [
            'document',
            { collectionName: reviewsCollectionName, documentId: uid },
          ],
          review
        );
      },
    });

  const addReview = async (newReview: Review & { userId: string }) => {
    if (!product || !productId || !isLoggedIn) return;

    reviewMutation.mutate({
      document: newReview,
      documentId: uid!,
      addTimestamp: true,
    });
  };

  const { firestoreDocumentDeletion: deleteReviewMutation } =
    useFirestoreDocumentDeletion({
      collectionName: reviewsCollectionName,
      documentIds: [uid!],
      onSuccess: () => {
        queryClient.setQueryData(
          [
            'document',
            { collectionName: reviewsCollectionName, documentId: uid },
          ],
          null
        );
      },
    });
  const deleteReview = deleteReviewMutation.mutate;

  const hasBoughtProductQuery = useFirestoreDocumentQuery({
    collectionName: `products/${product?.id}/buyers`,
    documentId: uid,
  });
  console.log(hasBoughtProductQuery.data);

  return {
    productsQuery,
    productQuery,
    reviewQuery,
    review: reviewQuery.data,
    reviewsQuery,
    reviews,
    reviewMutation,
    addReview,
    deleteReview,
    deleteReviewMutation,
    hasBoughtProduct: !!hasBoughtProductQuery.data,
  };
};

export default useProducts;
