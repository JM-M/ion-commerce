import { useState, useRef, useEffect } from 'react';
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
import { useQuery } from '@tanstack/react-query';
import { db } from '../../firebase';

type QueryOperator = '==' | '!=' | '<' | '<=' | '>' | '>=';
export type QueryFilter = { [key: string]: [QueryOperator, any] | undefined };

interface FirestoreInfiniteQuery {
  collectionName: string;
  match?: object;
  filter?: QueryFilter;
  orderByField?: string;
  orderDirection?: 'desc' | 'asc';
  options: {
    pageSize: number;
  };
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

const useFirestoreCollectionQuery = ({
  collectionName,
  orderByField,
  match,
  filter,
  orderDirection = 'desc',
  options: { pageSize },
  ids = [],
  transformDocuments,
}: FirestoreInfiniteQuery) => {
  const [pageNum, setPageNum] = useState<number>(1);

  const lastPageRef = useRef<any>();
  const lastPage = lastPageRef.current;
  const lastPageNumRef = useRef<number>(1);
  const lastPageNum = lastPageNumRef.current;

  const getPrevCursor = () => {
    if (!lastPage?.length || !orderByField) return undefined;
    const firstDocument = lastPage[0];
    return firstDocument[orderByField];
  };

  const getNextCursor = () => {
    if (!lastPage || !orderByField) return undefined;
    const lastDocument = lastPage[lastPage.length - 1];
    return lastDocument[orderByField];
  };

  const getQueries = () => {
    let queries: any[] = orderByField
      ? [orderBy(orderByField, orderDirection)]
      : [];
    if (filter) {
      Object.entries(filter).forEach(([key, filterValue]) => {
        if (!filterValue) return;
        const [operator, value] = filterValue;
        if (value) queries.unshift(where(key, operator, value));
      });
    }
    if (ids.length) queries = [where(documentId(), 'in', ids)];
    let prevCursor, nextCursor;
    if (pageNum > lastPageNum) {
      nextCursor = getNextCursor();
      // get next page
      queries = [...queries, startAfter(nextCursor), limit(pageSize)];
    } else if (pageNum < lastPageNum) {
      prevCursor = getPrevCursor();
      // get previous page
      queries = [...queries, endBefore(prevCursor), limitToLast(pageSize)];
    } else {
      // get initial page
      queries = [...queries, limit(pageSize)];
    }
    return queries;
  };

  const fetchPage: (arg: any) => any = async ({ queryKey = {} }: any) => {
    const [_key] = queryKey;
    const collectionRef = collection(db, collectionName);

    const queries = getQueries();

    const documentSnapshots = await getDocs(query(collectionRef, ...queries));
    const countSnapshot = await getCountFromServer(collectionRef);
    const totalDocs = countSnapshot.data().count;

    lastPageNumRef.current = pageNum;
    let docs = documentSnapshots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    if (transformDocuments) docs = await transformDocuments(docs);
    // console.log(pageSize, totalDocs);
    const totalPages = Math.ceil(totalDocs / pageSize);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;
    return {
      docs,
      totalDocs,
      totalPages,
      hasNextPage,
      hasPrevPage,
      pageNum,
    };
  };

  const fetchNextPage = () => setPageNum((n) => n + 1); // handle hasNextPage

  const fetchPreviousPage = () => !!pageNum && setPageNum((n) => n - 1);
  const queryState = useQuery({
    queryKey: [
      'collection',
      collectionName,
      match,
      pageNum,
      orderByField,
      orderDirection,
      ids,
    ],
    queryFn: fetchPage,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!queryState.data) return;
    lastPageRef.current = queryState.data;
  }, [queryState.data]);

  return {
    ...queryState,
    data: (queryState.data as QueryData) || undefined,
    fetchNextPage,
    fetchPreviousPage,
    page: pageNum,
  };
};

export default useFirestoreCollectionQuery;
