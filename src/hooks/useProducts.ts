import useFirestoreDocumentMutation from './useFirestoreDocumentMutation';
import useFirestoreCollectionQuery from './useFirestoreCollectionQuery';
import useFirestoreDocumentQuery from './useFirestoreDocumentQuery';

export interface SortOption {
  field: string;
  reverse?: boolean;
}

interface Props {
  productId?: string;
  productIds?: string[];
  sortBy?: SortOption;
}

const collectionName = 'products';

const useProducts = (props: Props = {}) => {
  const {
    productId,
    sortBy = { field: 'name', reverse: false },
    productIds,
  } = props;

  const { firestoreDocumentMutation } = useFirestoreDocumentMutation({
    collectionName,
  });

  const productsQuery = useFirestoreCollectionQuery({
    collectionName,
    orderByField: sortBy.field,
    reverseOrder: sortBy.reverse,
    options: {
      pageSize: 10,
    },
    ids: productIds,
  });

  const productQuery = useFirestoreDocumentQuery({
    collectionName,
    documentId: productId,
  });

  return {
    productsQuery,
    productQuery,
    productMutation: firestoreDocumentMutation,
  };
};

export default useProducts;
