import { Timestamp } from 'firebase/firestore';
import useFirestoreCollectionQuery from './useFirestoreCollectionQuery';

export interface Category {
  id?: string;
  value: string;
  name: string;
  parent: string | null;
  createdAt?: Timestamp;
}

const useCategories = () => {
  const categoriesQuery = useFirestoreCollectionQuery({
    collectionName: 'categories',
    orderByField: 'value',
    options: {
      pageSize: 1000,
    },
  });
  const categories = categoriesQuery.data?.docs;

  const getChildCategories = (value: string) => {
    if (!categories?.length) return [];
    return categories.filter((category: Category) => {
      const { parent } = category;
      return parent === value;
    });
  };

  const hasChildCategories = (value: string) => {
    const childCategories = getChildCategories(value);
    return !!childCategories.length;
  };

  const getCategoryFromValue = (value: string) =>
    categories?.find((c: Category) => c.value === value);

  const getCategoryFromId = (id: string) =>
    categories?.find((c: Category) => c.id === id);

  return {
    categoriesQuery,
    getChildCategories,
    getCategoryFromValue,
    getCategoryFromId,
    hasChildCategories,
  };
};

export default useCategories;
