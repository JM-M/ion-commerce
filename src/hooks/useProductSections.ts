import useFirestoreCollectionQuery from './useFirestoreCollectionQuery';
import useFirestoreDocumentQuery from './useFirestoreDocumentQuery';
import { ProductSection } from '../constants/schemas/productSection';

export interface DatabaseProductSection
  extends Omit<ProductSection, 'products'> {
  products: string[];
}

interface Props {
  productSectionId?: string;
}

const collectionName = 'productSections';

const useProductSections = (props: Props | undefined = {}) => {
  const { productSectionId } = props;

  const productSectionsQuery = useFirestoreCollectionQuery({
    collectionName,
    orderByField: 'title',
    reverseOrder: false,
    options: {
      pageSize: 100,
    },
  });

  const productSectionQuery = useFirestoreDocumentQuery({
    collectionName,
    documentId: productSectionId,
  });

  return {
    productSectionQuery,
    productSectionsQuery,
  };
};

export default useProductSections;
