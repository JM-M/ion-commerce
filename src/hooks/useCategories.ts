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
    orderByField: 'createdAt',
    options: {
      pageSize: 1000,
    },
  });

  const getChildCategories = (value: string) => {
    if (!categoriesQuery.data?.length) return [];
    return categoriesQuery.data.filter((category: Category) => {
      const { parent } = category;
      return parent === value;
    });
  };

  const getCategoryNameFromValue = (value: string) =>
    categoriesQuery.data?.find((c: Category) => c.value === value)?.name;

  return {
    categoriesQuery,
    getChildCategories,
    getCategoryNameFromValue,
  };
};

export default useCategories;
