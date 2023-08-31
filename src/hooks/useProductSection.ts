import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import useFirestoreCollectionQuery from './useFirestoreCollectionQuery';
import { DatabaseProductSection } from './useProductSections';
import useProducts from './useProducts';

const useProductSection = (section: DatabaseProductSection) => {
  const { category, id } = section;
  const pageSize = 10;
  const collectionName = `productSections/${id}/products`;

  const fetchProducts = async (productIds: string[]) => {
    const products = [];
    for (const productId of productIds) {
      const docRef = doc(db, 'products', productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const product = { ...docSnap.data(), id: productId } as any;
        products.push(product);
      }
    }
    return products;
  };

  const productsQuery = useFirestoreCollectionQuery({
    collectionName,
    orderByField: 'createdAt',
    options: {
      pageSize,
    },
    transformDocuments: fetchProducts,
  });

  const { productsQuery: categoryProductsQuery } = useProducts({ category });

  return {
    productsQuery: category ? categoryProductsQuery : productsQuery,
  };
};

export default useProductSection;
