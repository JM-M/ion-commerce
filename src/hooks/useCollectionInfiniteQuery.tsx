import {
  useQuery,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import {
  collection,
  query,
  orderBy,
  startAfter,
  endBefore,
  limit,
  limitToLast,
  getDocs,
  getCountFromServer,
  where,
  documentId,
} from 'firebase/firestore';
import { db } from '../../firebase';

type QueryOperator = '==' | '!=' | '<' | '<=' | '>' | '>=';
export type QueryFilter = { [key: string]: [QueryOperator, any] | undefined };

interface FirestoreInfiniteQuery {
  collectionName: string;
  match?: object;
  filter?: QueryFilter;
  orderByField?: string;
  reverseOrder?: boolean;
  pageSize: number;
  ids?: string[];
  transformDocuments?: (docs: any[]) => Promise<any[]>;
}

type QueryData = {
  docs: any[];
  totalDocs: number;
  pageNum: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type QueryFn = (arg: any) => any;

const useCollectionInfiniteQuery = (props: FirestoreInfiniteQuery) => {
  const {
    collectionName,
    orderByField,
    match,
    filter,
    reverseOrder = false,
    pageSize,
    ids = [],
    transformDocuments,
  } = props;
  const collectionRef = collection(db, collectionName);

  const countFn = async () => {
    const countSnapshot = await getCountFromServer(collectionRef);
    const count = countSnapshot.data().count;
    return count;
  };

  const countQueryState = useQuery({
    queryKey: ['firebase-collection-size', collectionName],
    queryFn: countFn,
  });

  const getQueries = ({ lastSnapshot }: { lastSnapshot?: any }) => {
    return [];
  };

  const queryFn: QueryFn = async ({ pageParam }: any) => {
    const queries = getQueries(pageParam ? { lastSnapshot: pageParam } : {});

    const snapshot = await getDocs(
      query(collectionRef, orderBy('price'), limit(2))
    );
    let docs = snapshot?.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    if (transformDocuments) docs = await transformDocuments(docs);
    return { snapshot, docs };
  };

  const getNextPageParam = (lastPage: any) => {
    const { snapshot } = lastPage;
    return snapshot.docs[snapshot.docs.length - 1];
  };

  const queryState = useInfiniteQuery({
    queryKey: ['firebase-collection', props],
    queryFn,
    getNextPageParam,
    select: (data) => ({
      ...data,
      allDocs: Object.values(data.pages)
        .map((page) => page?.docs)
        .flat(),
    }),
  });

  const isLoading = countQueryState.isLoading || queryState.isLoading;

  return {
    ...queryState,
    isLoading,
  } as UseInfiniteQueryResult<any, unknown> & {
    data: { allDocs: any[]; pageParams: any[]; pages: any[] };
  };
};

export default useCollectionInfiniteQuery;
