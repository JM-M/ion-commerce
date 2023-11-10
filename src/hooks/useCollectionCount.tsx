import { useQuery } from '@tanstack/react-query';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../../firebase';

interface Props {
  collectionName: string;
}

const useCollectionCount = ({ collectionName }: Props) => {
  const collectionRef = collection(db, collectionName);

  const countFn = async () => {
    const countSnapshot = await getCountFromServer(collectionRef);
    const count = countSnapshot.data().count;
    return count;
  };

  const countQuery = useQuery({
    queryKey: ['collection-count', collectionName],
    queryFn: countFn,
  });

  return countQuery;
};

export default useCollectionCount;
