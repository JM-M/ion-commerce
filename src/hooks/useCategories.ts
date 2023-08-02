import { Timestamp } from "firebase/firestore";
import useFirestoreCollectionQuery from "./useFirestoreCollectionQuery";

export interface Category {
  id?: string;
  value: string;
  name: string;
  parent: string | null;
  createdAt?: Timestamp;
}

const useCategories = () => {
  const categoriesQuery = useFirestoreCollectionQuery({
    collectionName: "categories",
    orderByField: "createdAt",
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

  const getCategoryFromValue = (value: string) =>
    categoriesQuery.data?.find((c: Category) => c.value === value);

  return {
    categoriesQuery,
    getChildCategories,
    getCategoryFromValue,
  };
};

export default useCategories;
