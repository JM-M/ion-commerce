import useFirestoreDocumentMutation from "./useFirestoreDocumentMutation";
import useFirestoreCollectionQuery from "./useFirestoreCollectionQuery";
import useFirestoreDocumentQuery from "./useFirestoreDocumentQuery";

export interface SortOption {
  field: string;
  reverse?: boolean;
}

interface Props {
  productId?: string;
  productIds?: string[];
  sortBy?: SortOption;
  category?: string;
}

const collectionName = "products";

const useProducts = (props: Props = {}) => {
  const {
    productId,
    sortBy = { field: "name", reverse: false },
    productIds,
    category,
  } = props;

  const { firestoreDocumentMutation } = useFirestoreDocumentMutation({
    collectionName,
  });

  const match = category ? { category } : {};
  const productsQuery = useFirestoreCollectionQuery({
    collectionName,
    match,
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
